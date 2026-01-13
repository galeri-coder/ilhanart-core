# 🎨 İlhanArt Core - PoArt Protocol v1.0

[![Status](https://img.shields.io/badge/Status-SEALED-success?style=for-the-badge)](https://github.com/galeri-coder/ilhanart-core)
[![Date](https://img.shields.io/badge/Date-January%2013%2C%202026-blue?style=for-the-badge)](https://github.com/galeri-coder/ilhanart-core)
[![Architecture](https://img.shields.io/badge/Architecture-Triple--Layer-orange?style=for-the-badge)](https://github.com/galeri-coder/ilhanart-core)

**Civilizational-Scale Code Verification System**

> "Culture > Capital" — Don't Trust, Verify 🔒

---

## 🔐 Official SHA-512 Verification Hashes

### 1. notary_v1_0_SEALED.html
**Size:** 59,515 bytes  
**Description:** Digital Notary Widget - Multilingual (TR/EN/ZH/ES)  
**Sealed:** January 13, 2026 at 20:40 UTC

**SHA-512:**
```
b1f82a26545166aec43c97cc6c5df74bfd4f2e07850ff30fdd3d81382ea96c5da31502ab3d35aefc0fc4f267849e2495a91fc4cdca7b6f1e32db9df57ed7e2c0
```

**Features:**
- Multilingual support (Turkish, English, Chinese, Spanish)
- Three privacy modes: Private, Masked, Public
- Client-side SHA-512 hashing
- Certificate generation (PNG, JSON, PDF)
- Drag & drop file upload
- QR code verification
- Supabase integration

---

### 2. manifests_schema_v1_0_SEALED.sql
**Size:** 3,147 bytes  
**Description:** Database schema with automatic IP masking and constraints  
**Sealed:** January 13, 2026

**SHA-512:**
```
4ae066f976788859552e4a89fea71c48597b64cc5e6aaa31b3ffbfd016f254ca59145d63cac5ce098604c3374d9d195fb74aaf6f5888f44ffa4a09c93aa24da8
```

**Security Features:**
- Automatic IP masking (xxx.xxx.***.***) 
- Visibility-based access control (public/private/masked)
- SHA-512 length validation (128 characters)
- Title & creator length constraints (1-300 chars)
- Immutable timestamp recording

---

### 3. POART-25BWYT7S_Data.json
**Size:** 430 bytes  
**Description:** Example Certificate Data - Reference output format  

**SHA-512:**
```
442ee210aae3b67dde5d2fa93a8bbc97f4b56531253613155e8ee52ff8daf61226fa84e03fd1e3132d7b04930f4494ba59cf3cf853db550369b54d29734c2177
```

**Certificate Info:**
- Certificate ID: POART-25BWYT7S
- Title: NotaryHTML
- Creator: Deniz İlhan
- Visibility: Public
- Location: Istanbul, Türkiye
- IP: 176.42.***.**** (masked)
- Created: 2026-01-12

**Note:** This is a clean example output without embedded hashes to avoid self-referential paradox.

---

## ✅ How to Verify Files

### Quick Verification (macOS/Linux):
```bash
# Download file
curl -O https://raw.githubusercontent.com/galeri-coder/ilhanart-core/main/sealed/notary_v1_0_SEALED.html

# Calculate SHA-512
shasum -a 512 notary_v1_0_SEALED.html

# Compare with hash above - should match exactly!
```

**Expected output:**
```
b1f82a26545166aec43c97cc6c5df74bfd4f2e07850ff30fdd3d81382ea96c5da31502ab3d35aefc0fc4f267849e2495a91fc4cdca7b6f1e32db9df57ed7e2c0
```

### Windows PowerShell:
```powershell
# Download file
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/galeri-coder/ilhanart-core/main/sealed/notary_v1_0_SEALED.html" -OutFile "notary_v1_0_SEALED.html"

# Calculate SHA-512
Get-FileHash -Algorithm SHA512 notary_v1_0_SEALED.html

# Compare with hash above
```

---

## ⚠️ Security Warnings

### ✅ If Hash Matches:
- File is **original and unmodified**
- Safe to use in production
- Cryptographically guaranteed integrity
- Zero tampering detected

### ❌ If Hash Doesn't Match:
- **DO NOT USE THE FILE**
- File has been tampered with or corrupted
- Download fresh copy from this repository
- Report the incident immediately

### 🔒 Why SHA-512?
- **Algorithm:** NIST FIPS 180-4 standard
- **Length:** 128 hexadecimal characters (512 bits)
- **Collision Resistance:** 2^256 operations (computationally infeasible)
- **One-Way Function:** Cannot reverse hash to original
- **Avalanche Effect:** Single bit change → completely different hash
- **No Self-Reference:** Files don't contain their own hashes

---

## 📦 Repository Structure

```
ilhanart-core/sealed/
├── notary_v1_0_SEALED.html          # Digital Notary Widget (59.5 KB)
├── manifests_schema_v1_0_SEALED.sql  # Database Schema (3.1 KB)
├── POART-25BWYT7S_Data.json          # Example Certificate (430 bytes)
└── README.md                          # This file (with verification hashes)
```

**Critical Note:** Only these 3 files are cryptographically sealed. README.md contains their hashes for verification but is not itself sealed (to avoid self-referential paradox). This is standard cryptographic practice.

---

## 🎯 PoArt Protocol Philosophy

### Core Principles

**"Culture > Capital"**  
Art and cultural heritage preservation through cryptographic proof, not financial speculation.

**"Don't Trust, Verify"**  
Every claim is mathematically verifiable. No authority. No reputation. Just mathematics.

**Civilizational Timeline**  
975-year roadmap (2025-3000) for long-term cultural preservation.

### Anti-Speculation Design
- 365-day continuous cold wallet storage requirement
- No trading or speculation mechanisms
- Focus on authentication and provenance only
- Mathematical governance over social governance
- Zero financial incentives for short-term behavior

---

## 🌍 Live System

- **Gallery Website:** https://ilhanart.org
- **Digital Notary:** https://ilhanart.org/notary
- **Public Registry:** https://www.ilhanart.org/public-registry
- **GitHub Repository:** https://github.com/galeri-coder/ilhanart-core
- **Location:** Ortaköy, Istanbul, Turkey

---

## 🛠️ Technical Specifications

### Cryptographic Standards
- **Hash Algorithm:** SHA-512 (NIST FIPS 180-4)
- **Encoding:** UTF-8
- **Line Endings:** LF (Unix-style, normalized by Git)
- **Verification:** Byte-perfect integrity check
- **Self-Reference:** None (prevents circular paradox)

### Browser Compatibility (Digital Notary)
- ✅ Chrome 37+ (crypto.subtle API)
- ✅ Firefox 34+
- ✅ Safari 11+
- ✅ Edge 79+
- ❌ IE 11 (not supported)

### JavaScript Dependencies
- Supabase JS SDK v2+ (database integration)
- QRCode.js (QR code generation)
- jsPDF 2.5.1 (PDF certificates)
- html2canvas 1.4.1 (PNG screenshots)

---

## 📞 Support & Contact

### Technical Issues
Open an issue in this repository with:
- File you're trying to verify
- Hash you calculated
- Expected hash from this README
- Your operating system
- Command you used

### Security Reports
If you find a file with mismatched hash:
1. **Do not use the file**
2. Open a GitHub issue immediately
3. Include: filename, calculated hash, download source
4. We will investigate within 24 hours

### Business Inquiries
**İlhanArt Gallery**  
Ortaköy, Istanbul, Turkey  
Website: https://ilhanart.org  
Twitter/X: [@Galerilhan](https://twitter.com/Galerilhan)

---

## 🎓 Educational Use

This codebase demonstrates:
- Client-side cryptographic hashing
- Zero-knowledge proof systems
- Immutable database constraints
- Privacy-preserving design (IP masking)
- Trust-minimized architecture
- Self-referential paradox avoidance

**Free to use for educational purposes with attribution.**

---

## ⚡ Quick Start

```bash
# Clone repository
git clone https://github.com/galeri-coder/ilhanart-core.git
cd ilhanart-core/sealed

# Verify all sealed files
shasum -a 512 notary_v1_0_SEALED.html
shasum -a 512 manifests_schema_v1_0_SEALED.sql
shasum -a 512 POART-25BWYT7S_Data.json

# Compare output with hashes in this README
# All 3 must match exactly!
```

---

## 📜 License

**PoArt Protocol - Civilizational Scale Verification**

Copyright © 2026 İlhanArt Gallery  
All rights reserved.

Sealed code provided for verification purposes.  
Derivative works require attribution.  
Commercial use requires permission.

---

## 🔮 Roadmap

### Phase 1: Foundation (2025-2026) ✅
- [x] Digital notary system
- [x] Triple-layer cryptographic sealing
- [x] Public verification system
- [x] GitHub transparency
- [x] Self-paradox elimination

### Phase 2: Expansion (2026-2027)
- [ ] Blockchain integration (Ethereum/Polygon)
- [ ] IPFS decentralized storage
- [ ] Multi-signature verification
- [ ] Mobile app development
- [ ] API for third-party integration

### Phase 3: Ecosystem (2027-2030)
- [ ] Gallery network integration
- [ ] Artist collective platform
- [ ] Provenance tracking system
- [ ] International expansion
- [ ] Museum partnerships

### Phase 4: Civilization (2031-3000)
- [ ] 975-year protocol maintenance
- [ ] Generational knowledge transfer
- [ ] Cultural heritage preservation
- [ ] Long-term governance model
- [ ] Archive replication network

---

<div align="center">

### 🔒 Mathematical Proof, Not Trust

**Every file is sealed.**  
**Every claim is verifiable.**  
**Every hash is mathematical proof.**

**No authority. No reputation. No trust.**  
**Only pure mathematics.**

**"Don't Trust, Verify"**

---

**Built with 💚 by İlhanArt Gallery**  
**Ortaköy, Istanbul, Turkey • 2026**

[![Verify Now](https://img.shields.io/badge/Verify-Now-success?style=for-the-badge)](https://www.ilhanart.org/public-registry)
[![GitHub](https://img.shields.io/badge/GitHub-Source-black?style=for-the-badge&logo=github)](https://github.com/galeri-coder/ilhanart-core)

</div>
