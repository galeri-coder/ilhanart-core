# Digital Notary Security Verification

## 🔐 Current Deployment Status

### **Version:** v5.1 (2026-01-14)

**File:** `index.html` (Digital Notary Application - Security Link Fix)

**GitHub Repository:** [galeri-coder/galeri-coder.github.io](https://github.com/galeri-coder/galeri-coder.github.io)

**Live URL:** https://raw.githubusercontent.com/galeri-coder/galeri-coder.github.io/main/index.html

---

## 📊 Cryptographic Hash Verification

### **SHA-256:**
```
578e5118d58efda7e4cbcf9997a9f2d0589cf2a40fa778f0fe4fd51c8264fcf6
```

### **SHA-512:**
```
315fca4d35c8e917eaa79fc0d9134e37dd1a14a506b38764c129958433e6fc75
0ef558397a0f199f18cb63232e4eb46ff7db2904bbc4874d62d38180f7dac3f8
```

---

## 🆕 Version 5.1 Changes (2026-01-14)

### **Bug Fixes:**
- ✅ Fixed security verification link: `/security-verification` → `/verify`
- ✅ Updated all internal navigation links
- ✅ Corrected security badge URL

### **Previous Features (v5.0):**
- 🌍 Complete 4-language support (Turkish, English, Chinese, Spanish)
- 🔐 Integrated security verification badge
- 📱 Enhanced mobile responsiveness
- ⚡ Class-based element selection
- 🐛 Fixed file selection dialog bug

---

## 🔍 How to Verify

### **Method 1: Local Verification**
```bash
curl -s https://raw.githubusercontent.com/galeri-coder/galeri-coder.github.io/main/index.html | sha256sum
```

**Expected Output:**
```
578e5118d58efda7e4cbcf9997a9f2d0589cf2a40fa778f0fe4fd51c8264fcf6
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
const expectedHash = "578e5118d58efda7e4cbcf9997a9f2d0589cf2a40fa778f0fe4fd51c8264fcf6";
```

If hash mismatch → Red banner warning appears.

---

## 📦 Deployment Architecture

```
┌─────────────────────────────────────────────┐
│  GITHUB REPOSITORY (Source of Truth)       │
│  galeri-coder/galeri-coder.github.io       │
│                                             │
│  File: index.html (v5.1)                   │
│  Hash: 578e5118...64fcf6                   │
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

| Version | Date | Hash (SHA-256) | Changes |
|---------|------|----------------|---------|
| v5.1 | 2026-01-14 | `578e5118...64fcf6` | Security link fix (/verify) |
| v5.0 | 2026-01-14 | `c016bd04...aafe897` | File selection fix + 4 languages |
| v4.5 | 2026-01-13 | `[previous]` | Multilingual edition (TR/EN) |
| v4.0 | 2026-01-12 | `[previous]` | Security badge integration |

---

## 🔗 Related Documentation

- **Security Verification Guide:** https://www.ilhanart.org/verify
- **Public Registry:** https://www.ilhanart.org/public-registry
- **PoArt Protocol:** https://www.ilhanart.org/poart-protocol

---

## 📞 Contact

**Gallery:** İlhan Art Gallery, Ortaköy, Istanbul  
**Twitter/X:** @Galerilhan  
**Protocol:** PoArt (Proof of Art)

---

**Last Updated:** 2026-01-14 01:51 UTC  
**Verified By:** Deniz İlhan (@Galerilhan)  
**Certificate ID:** POART-T4TBLXMM (v5.0 deployment) | TBD (v5.1 pending)
