-- public.manifests constraints hardening (idempotent)

BEGIN;

-- ---------------------------------------------------------
-- 1. VERİ TEMİZLİĞİ (Constraints eklenmeden önce veriyi düzelt)
-- ---------------------------------------------------------

-- A) Visibility Temizliği
UPDATE public.manifests
SET visibility = lower(btrim(visibility))
WHERE visibility IS NOT NULL;

UPDATE public.manifests
SET visibility = 'public'
WHERE visibility IS NULL
   OR visibility NOT IN ('public', 'private', 'masked');

-- B) Title & Creator Temizliği (Eğer NULL varsa script patlamasın diye)
UPDATE public.manifests
SET title = 'Untitled Asset'
WHERE title IS NULL OR btrim(title) = '';

UPDATE public.manifests
SET creator = 'Anonymous'
WHERE creator IS NULL OR btrim(creator) = '';

-- ---------------------------------------------------------
-- 2. KISITLAMALARIN (CONSTRAINTS) EKLENMESİ
-- ---------------------------------------------------------

-- A) Visibility Constraint
ALTER TABLE public.manifests
DROP CONSTRAINT IF EXISTS check_visibility_valid;

ALTER TABLE public.manifests
ADD CONSTRAINT check_visibility_valid
CHECK (visibility IN ('public', 'private', 'masked'));

-- B) SHA512 Constraint (Dinamik)
ALTER TABLE public.manifests
DROP CONSTRAINT IF EXISTS check_sha512_length;

DO $$
DECLARE
  col_type regtype;
BEGIN
  SELECT a.atttypid::regtype
     INTO col_type
  FROM pg_attribute a
  WHERE a.attrelid = 'public.manifests'::regclass
    AND a.attname  = 'sha512'
    AND a.attnum  > 0
    AND NOT a.attisdropped;

  IF col_type = 'bytea'::regtype THEN
    -- 64 byte = 512 bit
    EXECUTE $q$
      ALTER TABLE public.manifests
      ADD CONSTRAINT check_sha512_length
      CHECK (sha512 IS NOT NULL AND octet_length(sha512) = 64)
    $q$;
  ELSE
    -- hex string ise 128 char ve sadece hex
    EXECUTE $q$
      ALTER TABLE public.manifests
      ADD CONSTRAINT check_sha512_length
      CHECK (
        sha512 IS NOT NULL
        AND char_length(sha512) = 128
        AND sha512 ~ '^[0-9a-fA-F]{128}$'
      )
    $q$;
  END IF;
END $$;

-- C) Title Constraint
ALTER TABLE public.manifests
DROP CONSTRAINT IF EXISTS check_title_length;

ALTER TABLE public.manifests
ADD CONSTRAINT check_title_length
CHECK (title IS NOT NULL AND char_length(btrim(title)) BETWEEN 1 AND 300);

-- D) Creator Constraint
ALTER TABLE public.manifests
DROP CONSTRAINT IF EXISTS check_creator_length;

ALTER TABLE public.manifests
ADD CONSTRAINT check_creator_length
CHECK (creator IS NOT NULL AND char_length(btrim(creator)) BETWEEN 1 AND 300);

COMMIT;

-- ---------------------------------------------------------
-- 3. IP MASKING (Transaction dışı veya içi fark etmez, sonda çalışır)
-- ---------------------------------------------------------
UPDATE manifests
SET origin_ip = 
  split_part(origin_ip, '.', 1) || '.' || 
  split_part(origin_ip, '.', 2) || '.***.***'
WHERE origin_ip IS NOT NULL 
  AND origin_ip NOT LIKE '%***%'
  AND origin_ip LIKE '%.%.%.%'; -- Sadece IPv4 formatına uyanları maskele (Hata önlemek için)
