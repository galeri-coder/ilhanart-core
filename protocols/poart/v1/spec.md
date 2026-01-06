# [PoArt] Proof of Art — Spec (v1.0.0)

**Kanonik kaynak:** `/protocols/poart/v1/spec.md`  
**Sürüm:** 1.0.0  
**Yayın:** 2026-01-06

## 1) Amaç
[PoArt], bir eserin/üretimin **emeğe dayalı** şekilde üretildiğini ve kanıtlandığını açık, denetlenebilir bir standartla kayıt altına alır.

## 2) Tanımlar
- **Kayıt (Registry Entry):** Public Registry’de yayımlanan tekil kayıt.
- **Evidence Pack:** Emeği ispatlayan paket (yayın + timelapse + log).
- **Renewal:** Kayıt geçerliliğinin yıllık yenilenmesi.
- **Veto:** Topluluğun itiraz/iptal talebi mekanizması.
- **Statüler:** `verified | pending | revoked`

## 3) Zorunlu kanıtlar (Evidence Pack)
Evidence Pack, aşağıdaki bileşenleri içerir:
1. **Canlı yayın kanıtı**
   - En az bir platform linki (YouTube/Twitch vb.)
   - Yayın başlığı/playlist düzeni önerilir
2. **Timelapse**
   - Üretim sürecini kapsayan hızlandırılmış kayıt
   - Ham dosya veya yayın linki kabul edilir
3. **Log kaydı**
   - Tarih-saat damgalı çalışma notları (markdown/text/pdf olabilir)
   - İmza/kimlik doğrulama yöntemi opsiyoneldir (örn. GPG)

> Detay parametreler: `/protocols/poart/v1/params.json`

## 4) Doğrulama koşulları
Bir kaydın **verified** olabilmesi için:
- Evidence Pack linkleri erişilebilir olmalı
- Minimum kriterler tamamlanmalı
- Kayıt meta verileri eksiksiz olmalı (artist, work_title, kategori, tarih)

## 5) Cold wallet doğrulaması (365 gün)
- Protokol, eser/kimlik ilişkisine dair **kesintisiz doğrulama** konsepti tanımlar.
- Minimum gün sayısı `cold_wallet_min_days` parametresinden okunur.
- Uygulama/yorum katmanı “wallet doğrulaması” yöntemini ayrıca tanımlar (zamanla genişletilebilir).

## 6) Renewal (Yıllık yenileme)
- Her kayıt `renewal_days` sonunda yenileme ister.
- Yenileme yapılmazsa:
  - Önce “grace period” uygulanır (`grace_period_days`)
  - Süre aşılırsa kayıt **revoked** edilebilir veya “pending renewal” alt durumuna alınabilir (uygulama kararı)

## 7) Topluluk veto mekanizması
- Veto değerlendirmesi için eşik: `veto_threshold` (örn. 0.40 = %40)
- Veto penceresi: `veto_window_days`
- Veto sonucunda:
  - Kanıt yetersizliği / sahtecilik / kural ihlali tespit edilirse `revoked`
  - Yanlış ihbar/kötü niyet tespit edilirse kayıt korunur ve veto kapatılır

## 8) Revoked (iptal) koşulları
Aşağıdaki durumlar iptale yol açabilir:
- Evidence Pack’in sahte/yanıltıcı olması
- Sürekli erişilemez linkler (makul süre verilerek)
- Renewal’ın uzun süre yapılmaması (grace sonrası)
- Topluluk veto ile doğrulanmış ihlal

## 9) Veri alanları (Registry uyumu)
Registry kayıtları şu alanlarla uyumlu olmalıdır:
- artist
- artist_handle
- work_title
- work_category
- verification_status
- chain
- token_id
- evidence_pack
- last_renewal
- registered_at

## 10) SSS (kısa)
- **Evidence Pack linki özel olabilir mi?** Hayır, denetlenebilir olmalı.
- **Token ID zorunlu mu?** Zincir dışı kayıtlar için opsiyonel olabilir.

## 11) Değişiklik kaydı
`/protocols/poart/v1/changelog.md`
