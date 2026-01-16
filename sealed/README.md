# 🔒 Digital Notary Security Verification

[![PoArt Sealed](https://img.shields.io/badge/PoArt-SEALED-059669?style=for-the-badge&logo=shield&logoColor=white)](https://www.ilhanart.org/verify)
[![Hash Verified](https://img.shields.io/badge/Hash-VERIFIED-10b981?style=for-the-badge&logo=checkmark&logoColor=white)](https://github.com/galeri-coder/ilhanart-core/tree/main/sealed)
[![Certificate](https://img.shields.io/badge/Certificate-POART--6AVGE15F-047857?style=for-the-badge)](https://www.ilhanart.org/public-registry)

## 🔐 Current Deployment Status

### **Version:** v5.5 (2026-01-17)

**File:** `index.html` (Digital Notary Application - Production Build)

**GitHub Repository:** [galeri-coder/galeri-coder.github.io](https://github.com/galeri-coder/galeri-coder.github.io)

**Live URL:** https://raw.githubusercontent.com/galeri-coder/galeri-coder.github.io/main/index.html

---

## 📊 Cryptographic Hash Verification

### **SHA-256:**
```
0ea29e833a13baa046c20f30a42225206fe9bb1a18fcb2726ec1a33817260010
```

### **SHA-512:**
```
3900d29d83634049867db92f96d28f61b05f13ffc5c802824650695792fcd3ed
38d0ce222f19463d4ba2c3039965e312a88a9695d8ba30f00506b633d84a9ce4
```

---

## 🆕 Version 5.5 Changes (2026-01-17)

### **Major Updates:**
- ✅ **NEW:** `[data-multilang]` CSS system integration
- ✅ **NEW:** Fully localized certificates (all text translates)
- ✅ **FIXED:** Privacy Guarantee box layout issue
- ✅ **FIXED:** Weglot language switching compatibility
- ✅ **UPDATED:** Certificate generation with proper translations
- ✅ **VERIFIED:** Certificate POART-6AVGE15F generated

### **Certificate Localization (NEW in v5.5):**

| Element | TR | EN | ZH | ES |
|---------|----|----|----|----|
| Title | DİJİTAL NOTER SERTİFİKASI | DIGITAL NOTARY CERTIFICATE | 数字公证证书 | CERTIFICADO DE NOTARIO DIGITAL |
| Subtitle | İlhan Art Gallery tarafından verilmiştir | Issued by İlhan Art Gallery | 由伊尔汗艺术画廊颁发 | Emitido por İlhan Art Gallery |
| Info Header | Sertifika Bilgileri | Certificate Information | 证书信息 | Información del Certificado |
| Hash Header | Hash Parmak İzleri | Hash Fingerprints | 哈希指纹 | Huellas Hash |
| Location | Konum | Location | 位置 | Ubicación |
| Verified Stamp | ONAYLANDI | VERIFIED | 已验证 | VERIFICADO |

### **Preserved Features:**
- 🌍 4-language support (Turkish, English, Chinese, Spanish)
- 🔐 3 privacy modes (Private, Masked, Public)
- 🧮 SHA-256/SHA-512 browser-side calculation
- 🛡️ IP masking (always `x.x.***.***`)
- 💾 Supabase integration (for Masked/Public modes)
- 📥 Certificate downloads (PNG/JSON/PDF)
- 📱 QR code generation
- 🎨 Premium green gradient design

---

## 🔍 How to Verify

### **Method 1: Local Verification**
```bash
curl -s https://raw.githubusercontent.com/galeri-coder/galeri-coder.github.io/main/index.html | sha256sum
```

**Expected Output:**
```
0ea29e833a13baa046c20f30a42225206fe9bb1a18fcb2726ec1a33817260010
```

### **Method 2: Browser Console**
1. Visit https://www.ilhanart.org/notary
2. Open Developer Tools (F12)
3. Console → Type:
```javascript
fetch('https://raw.githubusercontent.com/galeri-coder/galeri-coder.github.io/main/index.html')
  .then(r => r.text())
  .then(async text => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    console.log('SHA-256:', hashHex);
  });
```

### **Method 3: Squarespace Loader Verification**
The Squarespace Footer Loader automatically verifies the hash on every page load:
```javascript
const expectedHash = "0ea29e833a13baa046c20f30a42225206fe9bb1a18fcb2726ec1a33817260010";
```

If hash mismatch → Red banner warning appears.

---

## 📦 Deployment Architecture

```
┌─────────────────────────────────────────────┐
│  GITHUB REPOSITORY (Source of Truth)        │
│  galeri-coder/galeri-coder.github.io        │
│                                             │
│  File: index.html (v5.5)                    │
│  Hash: 0ea29e83...17260010                  │
└──────────────────┬──────────────────────────┘
                   │
                   │ CDN Delivery (Raw)
                   ▼
┌─────────────────────────────────────────────┐
│  SQUARESPACE WEBSITE                        │
│  www.ilhanart.org/notary                    │
│                                             │
│  Footer Loader:                             │
│  1. Fetches index.html from GitHub          │
│  2. Calculates SHA-256 hash                 │
│  3. Verifies against expected hash          │
│  4. Injects content if verified             │
└─────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema (Supabase)

### **Table: `manifests`**

```sql
-- Constraints (v1.0 SEALED)
CHECK (visibility IN ('public', 'private', 'masked'))
CHECK (sha512 ~ '^[0-9a-fA-F]{128}$')
CHECK (char_length(btrim(title)) BETWEEN 1 AND 300)
CHECK (char_length(btrim(creator)) BETWEEN 1 AND 300)

-- Row Level Security
CREATE POLICY "Public ve Masked Olanları Okuma İzni"
ON public.manifests
FOR SELECT
TO anon
USING (visibility IN ('public', 'masked'));
```

### **IP Masking (Server-Side):**
```sql
UPDATE manifests
SET origin_ip = 
  split_part(origin_ip, '.', 1) || '.' || 
  split_part(origin_ip, '.', 2) || '.***.***'
WHERE origin_ip IS NOT NULL 
  AND origin_ip NOT LIKE '%***%'
  AND origin_ip LIKE '%.%.%.%';
```

---

## 🛡️ Security Features

### **3-Layer Verification System:**

| Layer | Component | Function |
|-------|-----------|----------|
| **1** | GitHub Hash | Stored in README.md, publicly auditable, version controlled |
| **2** | Footer Loader | Client-side hash calculation, real-time validation, warning banner |
| **3** | User Certificate | Browser-side SHA-256/SHA-512, no server upload, Supabase for public/masked |

### **Privacy Protection:**
- 🔒 **Private Mode:** Nothing sent to server, certificate only in browser
- 🕶️ **Masked Mode:** Anonymous record, location shows only country
- 🌍 **Public Mode:** Full transparency (IP still masked)
- 🛡️ **IP Always Masked:** `46.1.***.***` format in ALL modes

---

## 📜 Version History

| Version | Date       | Hash (SHA-256 - First 16) | Certificate | Changes |
|---------|------------|---------------------------|-------------|---------|
| **v5.5** | 2026-01-17 | `0ea29e833a13baa0` | POART-6AVGE15F | **Multilang certificates, CSS fix** |
| v5.4    | 2026-01-16 | `359996cd75f5aa9f` | POART-NNLH33XP | Production build verified |
| v5.3    | 2026-01-14 | `093743d5f1a969e0` | - | Security badge removed |
| v5.2    | 2026-01-14 | `015189d972980cd8` | - | Security link fix (/verify) |
| v5.1    | 2026-01-14 | `578e5118d58efda7` | POART-AMBZQ8RL | File selection fix + 4 languages |
| v5.0    | 2026-01-14 | `c016bd04b6eb8e91` | POART-T4TBLXMM | Multilingual edition (4 langs) |

---

## 🎯 Privacy Modes Comparison

| Mode | Server Storage | IP Address | Location | Device Info |
|------|----------------|------------|----------|-------------|
| 🔒 **Private** | ❌ No | Not recorded | Not recorded | Not recorded |
| 🕶️ **Masked** | ✅ Yes | `46.1.***.***` | `*** / Türkiye` | Hidden |
| 🌍 **Public** | ✅ Yes | `46.1.***.***` | `Istanbul, Türkiye` | Shown |

> **Critical:** IP address is **ALWAYS** masked to `x.x.***.***` format. Full IP is **NEVER** stored.

---

## 📋 Sample Certificate Data

### **Public Mode Example (POART-6AVGE15F):**
```json
{
  "cert_id": "POART-6AVGE15F",
  "title": "index-html",
  "creator": "denizilhan",
  "sha256": "0ea29e833a13baa046c20f30a42225206fe9bb1a18fcb2726ec1a33817260010",
  "sha512": "3900d29d83634049867db92f96d28f61b05f13ffc5c802824650695792fcd3ed38d0ce222f19463d4ba2c3039965e312a88a9695d8ba30f00506b633d84a9ce4",
  "visibility": "public",
  "device_info": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...",
  "location_data": "Istanbul, Türkiye",
  "origin_ip": "46.1.***.***",
  "created_at": "2026-01-16T22:23:51.900Z",
  "verification_url": "https://www.ilhanart.org/public-registry"
}
```

### **SQL Schema Certificate (POART-TO8NLF3A):**
```json
{
  "cert_id": "POART-TO8NLF3A",
  "title": "SLQ",
  "creator": "denizilhan",
  "sha256": "68b75312bac5b0ed26d16447e180e27d86e1e6bff52ad3a7ce39ab6f974b5605",
  "sha512": "417b363c4bc5792bbbd3105e332ab2a931d34517e847fa1c8e76bbd9041e1478a2869b1b5865d3eecb0f03f0741dce6fd4d9f2a4ceedf19df039b350799881d7",
  "visibility": "public",
  "created_at": "2026-01-16T22:31:18.745Z"
}
```

---

## 🔗 Related Documentation

| Document | URL |
|----------|-----|
| Security Verification Guide | https://www.ilhanart.org/verify |
| Public Registry | https://www.ilhanart.org/public-registry |
| PoArt Protocol Whitepaper | https://www.ilhanart.org/poart-protocol |
| Digital Notary App | https://www.ilhanart.org/notary |

---

## 🧪 Testing Checklist

### **Language Support:**
- [x] Turkish language displays correctly
- [x] English language displays correctly
- [x] Chinese language displays correctly
- [x] Spanish language displays correctly
- [x] Weglot language switching works
- [x] Certificate text matches selected language

### **File Operations:**
- [x] Photo upload (drag & drop + click)
- [x] Artwork upload (drag & drop + click)
- [x] PNG download works
- [x] JSON download works
- [x] PDF download works

### **Privacy Modes:**
- [x] Private mode: No Supabase call
- [x] Masked mode: Supabase with masked data
- [x] Public mode: Supabase with full data (IP masked)

### **Visual & UX:**
- [x] Privacy Guarantee box displays fully
- [x] IP masking displays correctly
- [x] QR code generates correctly
- [x] Certificate layout renders properly
- [x] Hash calculation accurate

---

## ⚠️ Important Notes

1. **Production Ready:** v5.5 is the current stable release
2. **Hash Changes:** Any modification to index.html will change the hash and trigger verification failure
3. **Supabase:** Public anon key embedded (safe for client-side use)
4. **Browser Processing:** All hash calculations done client-side, files never uploaded
5. **IP Privacy:** Full IP never stored, always masked to first two octets
6. **QR Code:** Always points to public registry, not specific certificate
7. **Weglot Integration:** Uses `[data-multilang]` CSS system for language switching
8. **Certificate Disclaimer:** Available in all 4 languages

---

## 📞 Contact

| | |
|---|---|
| **Gallery** | İlhan Art Gallery, Ortaköy, Istanbul |
| **Twitter/X** | [@Galerilhan](https://twitter.com/Galerilhan) |
| **Protocol** | PoArt (Proof of Art) |
| **Timeline** | 2025-3000 CE (975-year preservation) |

---

## 📝 Certificate Registry

| Certificate ID | Version | Date | Description |
|----------------|---------|------|-------------|
| **POART-6AVGE15F** | v5.5 | 2026-01-17 | index.html deployment verification |
| **POART-TO8NLF3A** | v5.5 | 2026-01-16 | SQL schema verification |
| POART-NNLH33XP | v5.4 | 2026-01-16 | Production build verification |
| POART-0KTUIYXE | v5.3 | 2026-01-14 | Security badge removal |
| POART-AMBZQ8RL | v5.1 | 2026-01-14 | 4-language deployment |
| POART-T4TBLXMM | v5.0 | 2026-01-14 | Initial multilingual release |

---

**Last Updated:** 2026-01-17 01:30 UTC  
**Verified By:** Deniz İlhan (@Galerilhan)  
**Current Certificate:** POART-6AVGE15F  
**Status:** ✅ Production Ready (v5.5)  
**Deployment:** GitHub → Squarespace Footer Loader  
**Hash Verification:** Automatic on page load

---

<div align="center">

### 🏛️ İlhan Art Gallery

**Culture > Capital** | **Proof of Art Protocol**

*Preserving artistic heritage for 975 years (2025-3000 CE)*

[![Website](https://img.shields.io/badge/Website-ilhanart.org-059669?style=flat-square)](https://www.ilhanart.org)
[![Twitter](https://img.shields.io/badge/Twitter-@Galerilhan-1DA1F2?style=flat-square&logo=twitter)](https://twitter.com/Galerilhan)
[![GitHub](https://img.shields.io/badge/GitHub-galeri--coder-181717?style=flat-square&logo=github)](https://github.com/galeri-coder)

</div>
