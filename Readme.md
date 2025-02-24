# 🤖 WhatsApp AI Bot

Bot WhatsApp cerdas menggunakan Node.js, whatsapp-web.js, dan Groq API untuk respons AI cepat. Mendukung grup, tag all, dan monitoring performa.

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node.js Logo" height="80">
  &nbsp;&nbsp;&nbsp;
  <img src="[https://pbs.twimg.com/profile_images/1748477143455619072/FMnO9-MX_400x400.jpg](https://www.ciscoinvestments.com/assets/logos/groq-logo.png)" alt="Groq Logo" height="80">
</p>

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 🌟 Fitur
- 🤖 Respons AI via Groq (Mixtral/Llama3)
- 🏆 Dukungan grup & chat pribadi
- 📊 Metrik performa (response time & token usage)
- 👥 Command `!tagall` untuk mention anggota grup
- 🔒 Session auth lokal (tidak perlu scan QR berulang)

## 🛠️ Prasyarat
- 🟢 Node.js 18+
- 📦 npm 9+
- 🔑 Akun [Groq](https://console.groq.com) (API key gratis)
- 📱 Nomor WhatsApp (disarankan akun sekunder)

## 📥 Instalasi
```bash
# Clone repositori
git clone https://github.com/username/whatsapp-ai-bot.git
cd whatsapp-ai-bot

# Install dependencies
npm install

# Buat file environment
cp .env.example .env
```

## ⚙️ Konfigurasi
Edit file `.env` dengan:
```
GROQ_API_KEY=your_api_key_here
```

## 🚀 Penggunaan
```bash
# Jalankan bot
node bot.js
```
Kemudian scan QR code melalui WhatsApp Mobile:
> **Linked Devices** > **Link a Device**

### 📌 Contoh Command
**Chat Pribadi/Grup:**
```
!ai Jelaskan teori relativitas Einstein
```
**Hasil:**
```
Teori relativitas Einstein terdiri dari dua bagian...
[⏱ 680ms | 🪙 142 tokens]
```

**Tag Semua Anggota (Grup):**
```
!tagall
```

## 📁 Struktur Proyek
```
whatsapp-ai-bot/
├── node_modules/
├── .wwebjs_auth/    # Session WhatsApp
├── .env             # Konfigurasi API
├── bot.js           # Kode utama
├── package.json
└── README.md
```

## ⚠️ Catatan Penting
### 📜 Kebijakan WhatsApp:
Penggunaan bot ini mungkin melanggar Ketentuan WhatsApp. Gunakan akun sandbox/testing.

### ⏳ Rate Limit:
Groq API memiliki batas 5 RPM (Requests Per Minute) untuk pengguna gratis.

### ⚡ Optimasi:
Untuk grup besar (>50 anggota), tambahkan delay di handler pesan:
```javascript
await new Promise(resolve => setTimeout(resolve, 1000));
```

## 🤝 Kontribusi
Pull request diterima! Untuk perubahan besar, silakan buka issue terlebih dahulu.

## 📜 Lisensi
MIT © 2024 [Nama Anda]. Lihat [LICENSE](LICENSE) untuk detail lebih lanjut.
