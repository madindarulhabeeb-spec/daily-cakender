# Universal Live Deployment Guide
### MHS Darul Habeeb Daily Calendar
Easily deploy this website to **Vercel**, **GitHub Pages**, and **Firebase Hosting** to get a permanent, direct universal link accessible from any mobile phone, tablet, or PC worldwide!

---

## ⚡ 1. Vercel (Fastest & Recommended - Under 1 Minute!)

Vercel provides the cleanest, fastest permanent universal link (e.g. `https://mhs-daily-calendar.vercel.app`).

### Option A: Instant Web Upload (Zero Installation)
1. Visit **[vercel.com](https://vercel.com/)** and log in (or sign up with your Google / GitHub account).
2. Go to **[vercel.com/new](https://vercel.com/new)**.
3. Drag and drop the **`mhs-daily-calendar`** folder directly into the browser window (or import your GitHub repo).
4. Click **Deploy**.
5. In just 15 seconds, Vercel gives you your permanent live HTTPS universal link (e.g. `https://mhs-daily-calendar.vercel.app`)!

### Option B: Via Vercel CLI
If you have Node.js installed, open terminal in this folder and run:
```bash
npx vercel
```
Follow the 3 prompts, and your site will be live instantly!

---

## 🐙 2. GitHub & GitHub Pages

Host your code and get a free public website link: `https://<your-username>.github.io/mhs-daily-calendar/`.

### Steps:
1. Go to **[github.com/new](https://github.com/new)** and create a new repository named `mhs-daily-calendar` (set it to **Public**).
2. Upload the files:
   - On the new repository page, click **"uploading an existing file"**.
   - Drag all the files from `mhs-daily-calendar` into GitHub and click **Commit changes**.
3. Enable GitHub Pages:
   - In your repository, click the **Settings** tab at the top.
   - On the left sidebar, click **Pages**.
   - Under **Build and deployment**:
     - **Source**: Select **GitHub Actions** (the included `.github/workflows/deploy.yml` will automatically build and publish).
     - *Or* select **Deploy from a branch** -> Branch: **main** -> Folder: **/(root)** -> Click **Save**.
4. In about 60 seconds, your site is live at:
   `https://<your-username>.github.io/mhs-daily-calendar/`

---

## 🔥 3. Firebase Hosting

Deploy to Google's Firebase network (`https://<your-project-id>.web.app`).

The project is already pre-configured with `firebase.json` and `.firebaserc`.

### Steps:
1. Go to the **[Firebase Console](https://console.firebase.google.com/)** and click **Create a project** (e.g., `mhs-daily-calendar`).
2. Open PowerShell in `mhs-daily-calendar` and run:
   ```bash
   # Install Firebase CLI (if not installed)
   npm install -g firebase-tools

   # Login to your Google account
   firebase login

   # Link your Firebase project
   firebase use --add
   # (Select the project you created in the console)

   # Deploy your calendar site!
   firebase deploy
   ```
3. Your universal link is live at:
   - `https://<your-project-id>.web.app`
   - `https://<your-project-id>.firebaseapp.com`

---

## 📦 Ready-to-Upload Package

A pre-packaged archive is ready for you:
- **Zip Archive**: `C:\Users\User\.gemini\antigravity\scratch\mhs-daily-calendar.zip`
- **Folder**: `C:\Users\User\.gemini\antigravity\scratch\mhs-daily-calendar\`

All configuration files (`vercel.json`, `firebase.json`, `.firebaserc`, `.github/workflows/deploy.yml`, `.gitignore`) are included and configured!
