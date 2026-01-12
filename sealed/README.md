# 🎨 İlhanArt Core - PoArt Protocol v1.0

[![Status](https://img.shields.io/badge/Status-SEALED-success?style=for-the-badge)](https://github.com/galeri-coder/ilhanart-core)
[![Date](https://img.shields.io/badge/Date-January%2012%2C%202025-blue?style=for-the-badge)](https://github.com/galeri-coder/ilhanart-core)
[![Architecture](https://img.shields.io/badge/Architecture-Triple--Layer-orange?style=for-the-badge)](https://github.com/galeri-coder/ilhanart-core)

**Civilizational-Scale Code Verification System**

> "Culture > Capital" — Don't Trust, Verify 🔐

---

## 🔐 Sealed Components

### 🎨 Frontend Layer (Digital Notary Interface)

**File:** [`sealed/notary_v1.0_SEALED.html`](sealed/notary_v1.0_SEALED.html)  
**Certificate:** POART-25BWYT7S  
**Size:** ~72 KB  
**Sealed:** January 12, 2025 at 10:50 UTC

**SHA-512:**
```
A3CCF04E4406D4394F17345DD9B5F4010E916ABA868308F0E92A74F67A57C19AB5211BAA69467221BDF9B9A0C7731530B3587130D00B3FB07F4D1706173E40D4
```

**Features:**
- Drag & drop file sealing
- Client-side SHA-512 hashing
- Privacy modes (Private/Masked/Public)
- Certificate generation (PNG/JSON/PDF)
- QR code verification
- Supabase integration

**Metadata:** [`sealed/POART-25BWYT7S_Data.json`](sealed/POART-25BWYT7S_Data.json)

---

### 🗄️ Backend Layer (Database Schema)

**File:** [`sealed/manifests_schema_v1.0_SEALED.sql`](sealed/manifests_schema_v1.0_SEALED.sql)  
**Certificate:** POART-FYGRIVEU  
**Size:** ~4 KB  
**Sealed:** January 12, 2025 at 09:52 UTC

**SHA-512:**
```
4AE066F976788859552E4A89FEA71C48597B64CC5E6AAA31B3FFBFD016F254CA59145D63CAC5CE098604C3374D9D195FB74AAF6F5888F44FFA4A09C93AA24DA8
```

**Database Structure:**
```sql
CREATE TABLE manifests (
  cert_id           TEXT PRIMARY KEY,
  title             TEXT NOT NULL,
  creator           TEXT NOT NULL,
  sha256            TEXT NOT NULL,
  sha512            TEXT NOT NULL,
  visibility        TEXT CHECK(visibility IN ('public', 'private', 'masked')),
  origin_ip         TEXT,  -- Auto-masked: xxx.xxx.***.***
  location_data     TEXT,
  device_info       TEXT,
  created_at        TIMESTAMP DEFAULT NOW()
);
```

**Security Features:**
- Automatic IP masking
- Visibility-based access control
- SHA-512 length validation
- Title & creator constraints
- Immutable timestamps

**Metadata:** [`sealed/POART-FYGRIVEU_Data.json`](sealed/POART-FYGRIVEU_Data.json)

---

## 🔍 How to Verify

### Method 1: Web Interface (Recommended)

**Perfect for non-technical users:**

1. Visit **https://ilhanart.org/verify**
2. Download any file from this repository
3. Drag & drop to the verification page
4. ✅ Instant verification result

### Method 2: Terminal (Advanced)

**For developers and security auditors:**

#### macOS / Linux:
```bash
# Download file
curl -O https://raw.githubusercontent.com/galeri-coder/ilhanart-core/main/sealed/notary_v1.0_SEALED.html

# Calculate hash
shasum -a 512 notary_v1.0_SEALED.html

# Compare with official hash above
```

#### Windows (PowerShell):
```powershell
# Download file
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/galeri-coder/ilhanart-core/main/sealed/notary_v1.0_SEALED.html" -OutFile "notary_v1.0_SEALED.html"

# Calculate hash
Get-FileHash -Algorithm SHA512 notary_v1.0_SEALED.html

# Compare with official hash above
```

### Method 3: Python Script
```python
import hashlib
import requests

# Download and verify
url = "https://raw.githubusercontent.com/galeri-coder/ilhanart-core/main/sealed/notary_v1.0_SEALED.html"
response = requests.get(url)

# Calculate hash
sha512 = hashlib.sha512(response.content).hexdigest()

# Expected hash
expected = "a3ccf04e4406d4394f17345dd9b5f4010e916aba868308f0e92a74f67a57c19ab5211baa69467221bdf9b9a0c7731530b3587130d00b3fb07f4d1706173e40d4"

# Verify
if sha512 == expected:
    print("✅ VERIFIED: File is authentic!")
else:
    print("❌ FAILED: File has been modified!")
```

---

## ⚠️ Security Warnings

### ✅ If Hash Matches:
- File is **original and unmodified**
- Safe to use in production
- Cryptographically guaranteed integrity

### ❌ If Hash Doesn't Match:
- **DO NOT USE THE FILE**
- File has been tampered with or corrupted
- Download fresh copy from this repository
- Report the incident

### 🔒 Hash Properties:
- **Algorithm:** SHA-512 (NIST FIPS 180-4)
- **Length:** 128 hexadecimal characters
- **Collision Resistance:** Computationally infeasible
- **One-Way Function:** Cannot reverse hash to original
- **Avalanche Effect:** Single bit change completely alters hash

---

## 🌐 Production Deployment

### Live System
- **Website:** https://ilhanart.org
- **Digital Notary:** https://ilhanart.org/notary
- **Verification Page:** https://ilhanart.org/verify

### System Architecture
```
┌─────────────────────────────────────────┐
│         Frontend (Sealed HTML)          │
│  • User Interface                       │
│  • Client-side Hashing                  │
│  • Certificate Generation               │
└─────────────┬───────────────────────────┘
              │
              ↓
┌─────────────────────────────────────────┐
│       Backend (Sealed SQL + API)        │
│  • Supabase Database                    │
│  • Manifest Storage                     │
│  • IP Masking                           │
│  • Visibility Control                   │
└─────────────┬───────────────────────────┘
              │
              ↓
┌─────────────────────────────────────────┐
│      Verification (Triple-Layer)        │
│  • Frontend Integrity Check             │
│  • Backend Schema Validation            │
│  • Certificate Metadata Proof           │
└─────────────────────────────────────────┘
```

---

## 🎯 What Each Layer Does

### Frontend (HTML)
**Purpose:** User-facing digital notary interface

**Capabilities:**
- Upload and seal files
- Generate cryptographic hashes
- Create verifiable certificates
- QR code generation for mobile verification
- Privacy control (3 visibility modes)
- Real-time Supabase integration

**Security:**
- All hashing done client-side
- No file upload to server
- Zero-knowledge proof system

---

### Backend (SQL)
**Purpose:** Immutable manifest storage

**Capabilities:**
- Store sealed file manifests
- Automatic IP masking (xxx.xxx.***.***) 
- Visibility-based access control
- Timestamp recording (immutable)
- Certificate ID generation

**Constraints:**
- SHA-512 length validation (128 chars)
- Title length: 1-300 characters
- Creator length: 1-300 characters
- Visibility enum: public/private/masked
- No NULL values for critical fields

---

### Certificate Data (JSON)
**Purpose:** Metadata transparency

**Contents:**
```json
{
  "cert_id": "POART-25BWYT7S",
  "title": "NotaryHTML",
  "creator": "Deniz İlhan",
  "sha256": "08c913d1864ed38bbf9437b47430aea9...",
  "sha512": "a3ccf04e4406d4394f17345dd9b5f401...",
  "visibility": "public",
  "location_data": "Istanbul, Türkiye",
  "origin_ip": "176.42.***.***",
  "created_at": "2026-01-12T10:50:27.277Z",
  "verification_url": "https://ilhanart.org/verify?id=POART-25BWYT7S"
}
```

---

## 📜 PoArt Protocol Philosophy

### Core Principles

**"Culture > Capital"**  
Art and cultural heritage should be preserved through cryptographic proof, not financial speculation.

**"Don't Trust, Verify"**  
Every claim is verifiable through mathematics, not authority or reputation.

**Civilizational-Scale Timeline**  
975-year roadmap (2025-3000) for long-term cultural preservation.

### Anti-Speculation Philosophy
- 365-day continuous cold wallet storage requirement
- No trading or speculation mechanisms
- Focus on authentication and provenance
- Mathematical governance over human governance

---

## 🛠️ Technical Specifications

### Cryptographic Standards
- **Hash Algorithm:** SHA-512
- **Encoding:** UTF-8
- **Line Endings:** LF (Unix-style)
- **File Integrity:** Byte-perfect verification

### Browser Compatibility
- ✅ Chrome 37+ (crypto.subtle API)
- ✅ Firefox 34+
- ✅ Safari 11+
- ✅ Edge 79+
- ❌ IE 11 (no support)

### Dependencies
- Supabase JS SDK v2+
- QRCode.js (for QR generation)
- jsPDF (for PDF certificates)
- html2canvas (for PNG screenshots)

---

## 📦 Repository Structure
```
ilhanart-core/
├── sealed/                              # Cryptographically sealed files
│   ├── notary_v1.0_SEALED.html         # Frontend (72 KB)
│   ├── manifests_schema_v1.0_SEALED.sql # Backend (4 KB)
│   ├── POART-25BWYT7S_Data.json        # Frontend metadata (441 bytes)
│   └── POART-FYGRIVEU_Data.json        # Backend metadata (439 bytes)
├── README.md                            # This file
└── LICENSE                              # Project license (to be added)
```

---

## 🔗 Related Links

### Official Resources
- **İlhanArt Gallery:** https://ilhanart.org
- **Digital Notary System:** https://ilhanart.org/notary
- **Verification Portal:** https://ilhanart.org/verify
- **GitHub Organization:** https://github.com/galeri-coder

### Protocol Documentation
- **PoArt Protocol Overview:** Coming soon
- **Founding Patrons Protocol:** In development
- **Technical Whitepaper:** In development

### Social Media
- **Twitter/X:** [@Galerilhan](https://twitter.com/Galerilhan)
- **Location:** Ortaköy, Istanbul, Turkey

---

## 📞 Support & Contact

### Technical Issues
Open an issue in this repository with:
- File you're trying to verify
- Hash you calculated
- Expected hash
- Your operating system

### Business Inquiries
**İlhanArt Gallery**  
Ortaköy, Istanbul, Turkey  
Contact via website: https://ilhanart.org

---

## 🎓 Educational Use

This codebase demonstrates:
- Client-side cryptographic hashing
- Zero-knowledge proof systems
- Immutable database constraints
- Privacy-preserving design
- Trust-minimized architecture

**Feel free to use for educational purposes with attribution.**

---

## ⚡ Quick Start
```bash
# Clone repository
git clone https://github.com/galeri-coder/ilhanart-core.git
cd ilhanart-core/sealed

# Verify HTML
shasum -a 512 notary_v1.0_SEALED.html

# Verify SQL
shasum -a 512 manifests_schema_v1.0_SEALED.sql

# Compare with official hashes in this README
```

---

## 🏆 Version History

### v1.0 (January 12, 2025) - SEALED
- ✅ Initial triple-layer deployment
- ✅ Frontend sealed: POART-25BWYT7S
- ✅ Backend sealed: POART-FYGRIVEU
- ✅ SHA-512 cryptographic sealing
- ✅ Public verification system live
- ✅ GitHub transparency achieved

**Status:** IMMUTABLE - No further changes to v1.0 sealed files

---

## 📄 License

PoArt Protocol - Civilizational Scale Verification

**Copyright © 2025 İlhanArt Gallery**  
All rights reserved.

Sealed code is provided for verification purposes.  
Derivative works require attribution.

---

## 🔮 Roadmap

### Phase 1: Foundation (2025) ✅
- [x] Digital notary system
- [x] Triple-layer sealing
- [x] Public verification
- [x] GitHub transparency

### Phase 2: Expansion (2026)
- [ ] Blockchain integration (Ethereum/Polygon)
- [ ] IPFS decentralized storage
- [ ] Multi-signature verification
- [ ] Mobile app development

### Phase 3: Ecosystem (2027-2030)
- [ ] Gallery network integration
- [ ] Artist collective platform
- [ ] Provenance tracking system
- [ ] International expansion

### Phase 4: Civilization (2031-3000)
- [ ] 975-year protocol maintenance
- [ ] Generational knowledge transfer
- [ ] Cultural heritage preservation
- [ ] Long-term governance model

---

<div align="center">

### 🔐 Remember

**Every file is sealed. Every claim is verifiable. Every hash is mathematical proof.**

**"Don't Trust, Verify"**

---

**Built with 💚 by İlhanArt Gallery**  
**Istanbul, Turkey • 2025**

[![Verify](https://img.shields.io/badge/Verify-ilhanart.org%2Fverify-success?style=for-the-badge)](https://ilhanart.org/verify)

</div>
