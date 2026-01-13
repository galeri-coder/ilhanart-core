# Digital Notary Security Verification

## 🔐 Current Deployment Status

### **Version:** v5.0 (2026-01-14)

**File:** `index.html` (Digital Notary Application with Security Badge)

**GitHub Repository:** [galeri-coder/galeri-coder.github.io](https://github.com/galeri-coder/galeri-coder.github.io)

**Live URL:** https://raw.githubusercontent.com/galeri-coder/galeri-coder.github.io/main/index.html

---

## 📊 Cryptographic Hash Verification

### **SHA-256:**
```
c016bd04b6eb8e917e3f66423ef5acaab222cc1dc723449e5a5533014aafe897
```

### **SHA-512:**
```
075995578ae628d6336ca3859a9c71788a3da6180ddef0ef2f4282aaa6277c86
b8f8ed4cfd43e8b0ec1dcf1b212cb8efa147df677969e8554e75eaa9430ed570
```

---

## 🆕 Version 5.0 Changes (2026-01-14)

### **Bug Fixes:**
- ✅ Fixed file selection dialog not appearing on first click
- ✅ Fixed element targeting (migrated from ID-based to class-based selection)
- ✅ Fixed language-specific element initialization

### **New Features:**
- 🌍 Complete 4-language support (Turkish, English, Chinese, Spanish)
- 🔐 Integrated security verification badge
- 📱 Enhanced mobile responsiveness
- ⚡ Improved language-aware container activation

### **Technical Improvements:**
- Class-based element selection (`.photo-drop`, `.art-drop`, etc.)
- Dynamic language container detection
- Unique radio button names per language (`visibility-tr`, `visibility-en`, etc.)
- Browser-side hash calculation (SHA-256, SHA-512)

---

## 🔍 How to Verify

### **Method 1: Local Verification**
```bash
curl -s https://raw.githubusercontent.com/galeri-coder/galeri-coder.github.io/main/index.html | sha256sum
```

**Expected Output:**
```
c016bd04b6eb8e917e3f66423ef5acaab222cc1dc723449e5a5533014aafe897
```

### **Method 2: Browser Console**
1. Visit https://www.ilhanart.org/digital-notary
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
const expectedHash = "c016bd04b6eb8e917e3f66423ef5acaab222cc1dc723449e5a5533014aafe897";
```

If hash mismatch → Red banner warning appears.

---

## 📦 Deployment Architecture

```
┌─────────────────────────────────────────────┐
│  GITHUB REPOSITORY (Source of Truth)       │
│  galeri-coder/galeri-coder.github.io       │
│                                             │
│  File: index.html (v5.0)                   │
│  Hash: c016bd04...aafe897                  │
└──────────────────┬──────────────────────────┘
                   │
                   │ CDN Delivery (Raw)
                   ▼
┌─────────────────────────────────────────────┐
│  SQUARESPACE WEBSITE                        │
│  www.ilhanart.org/digital-notary            │
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
| v5.0 | 2026-01-14 | `c016bd04...aafe897` | File selection fix + 4 languages |
| v4.5 | 2026-01-13 | `[previous]` | Multilingual edition (TR/EN) |
| v4.0 | 2026-01-12 | `[previous]` | Security badge integration |

---

## 🔗 Related Documentation

- **Security Verification Guide:** `/security-verification`
- **Public Registry:** https://www.ilhanart.org/public-registry
- **PoArt Protocol:** https://www.ilhanart.org/poart-protocol

---

## 📞 Contact

**Gallery:** İlhan Art Gallery, Ortaköy, Istanbul  
**Twitter/X:** @Galerilhan  
**Protocol:** PoArt (Proof of Art)

---

**Last Updated:** 2026-01-14 01:16 UTC  
**Verified By:** Deniz İlhan (@Galerilhan)  
**Certificate ID:** POART-XS9ZWEPP (v5.0 test deployment)
