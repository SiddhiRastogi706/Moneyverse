# MoneyVerse AI — Production Deployment & Quickstart Guide

## 🚀 Quickstart (VS Code / Local Machine)
Aapko lambi commands run karne ki koi zaroorat nahi hai:

### Method 1: 1-Click Launch (Recommended for Windows)
1. Zip file ko kisi bhi folder mein **Extract (Unzip)** karein.
2. Bas **`start.bat`** file par **Double-Click** karein!
3. Yeh automatically:
   - Dependencies check karega (agar pehli baar hai toh install karega).
   - Backend Server (`http://localhost:5000`) start karega.
   - Frontend Server (`http://localhost:5173`) start karega.
   - Aapke default browser mein platform open kar dega!

### Method 2: VS Code se run karna
1. VS Code mein project folder open karein: `File -> Open Folder... -> moneyverse-ai`
2. Keyboard par dabayein: **`Ctrl + Shift + B`**  
   *(Ya terminal mein sirf likhein: `start.bat`)*
3. Dono servers start ho jayenge aur platform open ho jayega.

---

## 🌐 Production Deployment Guide

### Option 1: Frontend Vercel par Deploy karna (1-Click & Free)
1. GitHub par project push karein.
2. [Vercel.com](https://vercel.com) par login karein aur **"Add New Project"** select karein.
3. Settings:
   - **Root Directory**: `client`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Environment Variables**:
   - `VITE_API_URL`: Aapke backend server ka live URL (e.g. `https://api.yourdomain.com/api` ya `http://localhost:5000/api`)
   - `VITE_GOOGLE_CLIENT_ID`: `151014022019-6375j8r88sn36fcsp42to3tdaf7i9lhi.apps.googleusercontent.com`
5. Click **Deploy** — 60 seconds mein live ho jayega!

---

### Option 2: Backend Render / Railway par Deploy karna (Free)
1. [Render.com](https://render.com) par **"New Web Service"** select karein.
2. Settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
3. **Environment Variables**:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `MONGO_URI`: Aapka MongoDB connection string (e.g. MongoDB Atlas)
   - `JWT_SECRET`: `moneyverse_super_secret_production_key_2026`
   - `FRONTEND_URL`: Aapka live frontend URL
4. Click **Create Web Service**.

---

### Option 3: VPS / Cloud Server (Ubuntu / Nginx / PM2)
```bash
# 1. Clone repository
git clone <repo-url>
cd moneyverse-ai

# 2. Install dependencies & build
npm run install:all
npm run build

# 3. Start Backend with PM2
cd server
pm2 start dist/index.js --name "moneyverse-api"

# 4. Nginx configuration points / to client/dist and /api to http://localhost:5000
```

---

## 📁 Project Structure
```
moneyverse-ai/
├── client/                 # React 18 + Vite + Tailwind CSS Frontend
│   ├── dist/               # Pre-built production files (Ready to deploy)
│   ├── src/                # Complete source code
│   └── vercel.json         # Vercel SPA routing configuration
├── server/                 # Express.js + Node.js Backend API
│   ├── dist/               # Compiled TypeScript backend
│   └── src/                # Backend routes, controllers, middleware
├── .vscode/                # VS Code one-key tasks (Ctrl+Shift+B)
├── start.bat               # 1-Click Windows Launcher
├── start.sh                # 1-Click Mac/Linux Launcher
├── DEPLOYMENT_GUIDE.md     # Deployment manual
└── README.md               # Architecture documentation
```
