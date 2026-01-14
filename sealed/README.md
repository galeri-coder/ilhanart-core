# 🔒 Digital Notary Security Verification

[![PoArt Sealed](https://img.shields.io/badge/PoArt-SEALED-059669?style=for-the-badge&logo=shield&logoColor=white)](https://www.ilhanart.org/verify)
[![Hash Verified](https://img.shields.io/badge/Hash-VERIFIED-10b981?style=for-the-badge&logo=checkmark&logoColor=white)](https://github.com/galeri-coder/ilhanart-core/tree/main/sealed)
[![Certificate](https://img.shields.io/badge/Certificate-POART--AMBZQ8RL-047857?style=for-the-badge)](https://www.ilhanart.org/public-registry)

## 🔐 Current Deployment Status

### **Version:** v5.3 (2026-01-14)

**File:** `index.html` (Digital Notary Application - Security Badge Removed)

**GitHub Repository:** [galeri-coder/galeri-coder.github.io](https://github.com/galeri-coder/galeri-coder.github.io)

**Live URL:** https://raw.githubusercontent.com/galeri-coder/galeri-coder.github.io/main/index.html

---

## 📊 Cryptographic Hash Verification

### **SHA-256:**
```
093743d5f1a969e0b3f934f9ee1b661131a3336522aaa6631c1123f6a73d2d79
```

### **SHA-512:**
```
081963fa2d89371cc15692fc25c7a04db17a5cb15b9b72b43a226e94bf96ae47
2518bd9dd1859623d370388cef2fd5f09fb183cc9687f9d86a995e2ae9e79446
```

---

## 🆕 Version 5.3 Changes (2026-01-14)

### **Major Changes:**
- ❌ **REMOVED:** Security badge section ("3 Katmanlı Güvenlik Sistemi")
- ❌ **REMOVED:** Security badge HTML/CSS code
- ❌ **REMOVED:** Link to `/security-verification`
- ✅ **CLEAN:** Minimal interface without external badge component

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
093743d5f1a969e0b3f934f9ee1b661131a3336522aaa6631c1123f6a73d2d79
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
const expectedHash = "093743d5f1a969e0b3f934f9ee1b661131a3336522aaa6631c1123f6a73d2d79";
```

If hash mismatch → Red banner warning appears.

---

## 📦 Deployment Architecture

```
┌─────────────────────────────────────────────┐
│  GITHUB REPOSITORY (Source of Truth)       │
│  galeri-coder/galeri-coder.github.io       │
│                                             │
│  File: index.html (v5.3)                   │
│  Hash: 093743d5...3d2d79                   │
└──────────────────┬──────────────────────────┘
                   │
                   │ CDN Delivery (Raw)
                   ▼
┌─────────────────────────────────────────────┐
│  SQUARESPACE WEBSITE                        │
│  www.ilhanart.org/notary                    │
│                                             │
│  Footer Loader:                             │
│  1. Fetches index.html from GitHub         │
│  2. Calculates SHA-256 hash                │
│  3. Verifies against expected hash         │
│  4. Injects content if verified            │
└─────────────────────────────────────────────┘
```

---

## 🛡️ Security Features

### **3-Layer Verification System:**

1. **GitHub Hash** (Layer 1)
   - Stored in this README.md
   - Publicly auditable
   - Version controlled

2. **Footer Loader Verification** (Layer 2)
   - Client-side hash calculation
   - Real-time validation
   - Warning banner on mismatch

3. **User Certificate Generation** (Layer 3)
   - Browser-side SHA-256/SHA-512 computation
   - No server upload (privacy preserved)
   - Supabase storage for public/masked modes

---

## 📜 Version History

| Version | Date       | Hash (SHA-256 - 16 chars) | Changes                          |
|---------|------------|---------------------------|----------------------------------|
| v5.3    | 2026-01-14 | `093743d5f1a969e0`        | **Security badge removed**       |
| v5.2    | 2026-01-14 | `015189d972980cd8`        | Security link fix (/verify)      |
| v5.1    | 2026-01-14 | `578e5118d58efda7`        | File selection fix + 4 languages |
| v5.0    | 2026-01-14 | `c016bd04b6eb8e91`        | Multilingual edition (4 langs)   |
| v4.5    | 2026-01-13 | `[previous]`              | Security badge integration       |

---

## 🔗 Related Documentation

- **Security Verification Guide:** https://www.ilhanart.org/verify
- **Public Registry:** https://www.ilhanart.org/public-registry
- **PoArt Protocol:** https://www.ilhanart.org/poart-protocol

---

## 🎯 Privacy Modes Comparison

| Mode          | Server Storage | IP Address      | Location          | Device Info |
|---------------|----------------|-----------------|-------------------|-------------|
| 🔒 Private    | ❌ No          | Not recorded    | Not recorded      | Not recorded|
| 🕶️ Masked     | ✅ Yes         | `46.1.***.***`  | `*** / Turkey`    | Hidden      |
| 🌍 Public     | ✅ Yes         | `46.1.***.***`  | `Istanbul, Turkey`| Shown       |

**Critical:** IP address is **ALWAYS** masked to `x.x.***.***` format in all modes. Full IP is **NEVER** stored.

---

## 📞 Contact

**Gallery:** İlhan Art Gallery, Ortaköy, Istanbul  
**Twitter/X:** @Galerilhan  
**Protocol:** PoArt (Proof of Art)

---

**Last Updated:** 2026-01-14 04:45 UTC  
**Verified By:** Deniz İlhan (@Galerilhan)  
**Certificate ID:** POART-0KTUIYXE (v5.3 deployment verification)  
**Previous Certificates:**
- POART-AMBZQ8RL (v5.1 deployment)
- POART-T4TBLXMM (v5.0 deployment)

---

## ⚠️ Important Notes

1. **Security Badge Removed:** v5.3 intentionally removes the security badge component for cleaner interface
2. **Hash Changes:** Any modification to index.html will change the hash and trigger verification failure
3. **Supabase:** Public anon key embedded (safe for client-side use)
4. **Browser Processing:** All hash calculations done client-side, files never uploaded
5. **IP Privacy:** Full IP never stored, always masked to first two octets
6. **QR Code:** Always points to public registry, not specific certificate
7. **Certificate Disclaimer:** "This certificate [PoArt] can be used as first-stage verification. Second-stage verification is only done on-site through the Public Registry."

---

## 🧪 Testing Checklist

- [x] Turkish language displays correctly
- [x] English language displays correctly
- [x] Chinese language displays correctly
- [x] Spanish language displays correctly
- [x] Photo upload (drag & drop + click)
- [x] Artwork upload (drag & drop + click)
- [x] Private mode: No Supabase call
- [x] Masked mode: Supabase with masked data
- [x] Public mode: Supabase with full data (IP masked)
- [x] PNG download works
- [x] JSON download works
- [x] PDF download works
- [x] IP masking displays correctly
- [x] QR code generates correctly
- [x] Certificate layout renders properly
- [x] Hash calculation accurate

---

**Status:** ✅ Production Ready (v5.3)  
**Deployment:** GitHub → Squarespace Footer Loader  
**Hash Verification:** Automatic on page load
