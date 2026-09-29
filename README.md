# MHS Darul Habeeb Daily Calendar Web Application
**Misbahul Huda Students Union (MHS) • Darul Habeeb Campus, Periyadukka, Kasaragod**

An authentic, responsive daily calendar generator web application designed to automatically update everyday with the present date, day names, multi-calendar dates (Gregorian, Malayalam Kollam era, Hijri), and Kasaragod prayer times.

---

## 🌟 Key Features

1. **Exact Visual Template Matching**:
   - Matches the official Darul Habeeb / MHS Daily Calendar design.
   - Clean logos for **Misbahul Huda Students Union** and **Darul Habeeb**.
   - Islamic geometric arabesque background watermark with top repeating `DARUL HABEEB` text.
   - 3 elegant rounded calendar cards with custom badges (Calendar grid, Coconut palms, Crescent moon & star).
   - 6 Mihrab prayer arches with deep navy time boxes.

2. **Automated Everyday Updates**:
   - **Day of Week**: Automatically computes and displays in English, Malayalam, and Arabic (`Friday | വെള്ളി | يوم الجمعة`).
   - **Gregorian Date**: Day, Month name (English), Year.
   - **Malayalam Date (Kolla Varsham)**: Solar calendar day, month (`ചിങ്ങം, കന്നി, തുലാം, വൃശ്ചികം, ധനു, മകരം, കുംഭം, മീനം, മേടം, ഇടവം, മിഥുനം, കർക്കടകം`), and Kollam year (e.g. `1202`).
   - **Hijri Date**: Day, Arabic month name (`ربيع الاخر`), and Islamic year (e.g. `1448`).
   - **Kasaragod Prayer Times**: Precise astronomical calculation for Kasaragod (12.5102° N, 74.9852° E, IST +5:30) for Subah, Thulu', Dhuhr, Asr, Maghrib, and Isha.

3. **Customizable Daily Insights (Mobile & PC)**:
   - Live editable **Arabic Quote / Hadith** area with:
     - Real-time text typing / pasting.
     - Font selector (`Amiri`, `Scheherazade New`, `Noto Naskh Arabic`, `Modern Sans`).
     - Color picker.
     - Boldness toggle (`Regular`, `Bold`, `Black`).
     - Alignment (`Right`, `Center`, `Left`).
     - Font size slider with live pixel readout.
   - Live editable **Malayalam Translation** area with:
     - Real-time text typing / pasting.
     - Font selector (`Noto Sans Malayalam`, `Manjari`, `Gayathri`).
     - Color picker.
     - Boldness toggle (`Regular`, `Semi`, `Bold`).
     - Alignment (`Left`, `Center`, `Right`).
     - Font size slider.
   - **1-Click Preset Library**: Preloaded with authentic Hadiths and Malayalam translations.

4. **Complete Manual Edit Option for Everything**:
   - Pick any date using the date selector to instantly preview any past or future day.
   - Direct manual inputs for every calendar field (Gregorian, Malayalam, Hijri).
   - Quick `[−1 Day]` and `[+1 Day]` buttons for Hijri moon sighting adjustments.
   - Direct time inputs for all 6 Kasaragod prayer times.
   - Editable footer details.

5. **High-Resolution Picture Download & Share**:
   - **Download Picture Button**: Generates a high-definition image (PNG) formatted for WhatsApp status, Instagram, or printing.
   - **Share Button**: Native Web Share API integration on mobile devices for 1-tap WhatsApp sharing.

---

## 🚀 How to Use

### Option 1: Direct File Open (Offline Ready)
Simply double-click `index.html` to open it in **Microsoft Edge**, **Google Chrome**, **Mozilla Firefox**, or **Safari**. No server installation is needed!

### Option 2: Mobile Access via Local Wi-Fi Network
To edit and download posters directly from your mobile phone or tablet on the same Wi-Fi network:
1. Open PowerShell in this project folder.
2. Run:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\start-server.ps1
   ```
3. It will display a mobile URL such as:
   ```
   http://192.168.1.XX:8080/
   ```
4. Open that URL on your phone's browser!

---

## 📁 Project Structure

```
mhs-daily-calendar/
├── index.html              # Main web application & calendar poster
├── start-server.ps1        # Local Wi-Fi web server script
├── README.md               # User guide & documentation
├── css/
│   └── style.css           # Styling, typography & mobile responsiveness
├── js/
│   ├── app.js              # Application controller & state management
│   ├── calendar-calc.js    # Gregorian, Malayalam, Hijri & Kasaragod prayer engines
│   └── html2canvas.min.js  # High-definition picture generation library
└── assets/
    ├── mhs-logo-raw.png          # Misbahul Huda Students Union crest
    ├── darul-habeeb-logo-raw.png # Darul Habeeb official logo
    └── template-reference.jpg    # Reference template
```
