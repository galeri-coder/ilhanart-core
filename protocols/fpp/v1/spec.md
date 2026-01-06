# [F.P.P.] Foundational Pillars Protocol — Spec (v1.0.0)

**Kanonik kaynak:** `/protocols/fpp/v1/spec.md`  
**Sürüm:** 1.0.0  
**Yayın:** 2026-01-06

## 1) Amaç
[F.P.P.], uzun vadeli katılımı ödüllendiren, kısa vadeli manipülasyonları (sybil/flash-loan) azaltan bir **skor** ve **governance** çerçevesi tanımlar.

## 2) Tanımlar
- **TWAB:** Time-Weighted Average Balance (zaman-ağırlıklı ortalama bakiye)
- **Skor:** TWAB’dan türetilen sayısal değer
- **Pencere:** TWAB ölçüm süresi (örn. 365 gün)
- **Epoch:** Kilit/kural dönemleri (örn. 10 yıl)

## 3) TWAB hesaplama (tanım)
- TWAB, seçilen pencere boyunca bakiyenin zamanla ağırlıklandırılmış ortalamasıdır.
- Örnek yorum: Her gün/periodik snapshot alınır ve zaman ağırlıklarıyla ortalama alınır.

> Detay parametreler: `/protocols/fpp/v1/params.json`

## 4) Skor formülü
Skor, aşağıdaki formülle tanımlanır:

**score = log10(TWAB + 1)**

- `+1` eklemesi: TWAB=0 durumunda log tanımsızlığını engeller.
- log tabanı 10’dur.

## 5) Sybil ve flash-loan dayanıklılığı
Bu protokol iki seviyede koruma hedefler:
1. **Zaman penceresi (TWAB window):** Kısa süreli yüksek bakiye etkisini seyreltir.
2. **Örnekleme periyodu:** Snapshot sıklığı ve pencere uzunluğu manipülasyonu zorlaştırır.

Opsiyonel ek kurallar (uygulama katmanında):
- Minimum hesap yaşı
- Minimum sürekli katılım süresi
- Anormal değişim tespiti (heuristic)

## 6) Millennium Vault (epoch kilitleri)
- Varlıklar/katılım hakları belirli epoch süreleriyle kilitlenebilir.
- Varsayılan epoch: 10 yıl (parametre dosyasında).

## 7) Governance ilkeleri (tanım)
- Oy gücü = skorun fonksiyonu (uygulama belirler: lineer/log/kaplı vs.)
- Karar pencereleri ve quorum eşikleri uygulama tarafında tanımlanır.

## 8) Veri uyumu
Registry kayıtlarında FPP ile ilişkili eser/whitepaper kayıtları:
- work_category: `Governance` veya `Official Protocol`
- token_id: sürüm/çekirdek kimliği (örn. `FPP-V1-CORE`)
- evidence_pack: repo/spec linkleri

## 9) Değişiklik kaydı
`/protocols/fpp/v1/changelog.md`
