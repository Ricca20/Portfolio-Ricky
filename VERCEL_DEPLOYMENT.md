# 🚀 Vercel Deployment Guide

## Deploy Both Frontend & Backend on Vercel

Your portfolio is now configured to deploy both frontend and backend on Vercel!

### 📋 Prerequisites

1. GitHub account with your repository pushed
2. MongoDB Atlas account with a database
3. Gmail account with App Password for email notifications

---

## 🎯 Deployment Steps

### Step 1: Prepare Environment Variables

You'll need these environment variables for Vercel:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_TO=pereraricky20@gmail.com
NODE_ENV=production
PORT=5001
```

### Step 2: Deploy to Vercel

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Sign in with your GitHub account

2. **Import Repository:**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find and select `Portfolio-Ricky`
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset:** Other
   - **Root Directory:** `./` (leave as root)
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Output Directory:** `frontend/dist`
   - **Install Command:** `npm install --prefix frontend && npm install --prefix backend`

4. **Add Environment Variables:**
   
   Click "Environment Variables" and add all the variables:
   
   | Name | Value |
   |------|-------|
   | `MONGODB_URI` | Your MongoDB Atlas connection string |
   | `EMAIL_USER` | Your Gmail address |
   | `EMAIL_PASS` | Your Gmail App Password |
   | `EMAIL_TO` | pereraricky20@gmail.com |
   | `NODE_ENV` | production |
   | `PORT` | 5001 |

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for deployment
   - Your site will be live at `https://your-project.vercel.app`

### Step 3: Test Your Deployment

Once deployed, test:

- ✅ Homepage loads correctly
- ✅ Dark/Light mode toggle works
- ✅ Projects section displays
- ✅ Contact form sends emails
- ✅ API endpoints work (`https://your-site.vercel.app/api/health`)

---

## 🔧 Configuration Files Created

1. **`vercel.json`** - Configures routing for both frontend and backend
2. **`backend/src/index.js`** - Updated to export app for serverless
3. **`frontend/package.json`** - Added `vercel-build` script

---

## 📝 API Endpoints

All API endpoints will be available at:
- `https://your-site.vercel.app/api/projects`
- `https://your-site.vercel.app/api/messages`
- `https://your-site.vercel.app/health`

---

## 🔄 Future Updates

When you make changes:

```bash
git add .
git commit -m "Your update message"
git push
```

Vercel will automatically redeploy!

---

## 🎨 Custom Domain (Optional)

1. Go to your Vercel project
2. Settings → Domains
3. Add your custom domain
4. Follow DNS configuration steps

---

## ⚠️ Important Notes

- **Cold Starts:** Serverless functions may have a 1-2 second delay on first request
- **MongoDB:** Make sure to whitelist Vercel IPs (or use `0.0.0.0/0` for all IPs)
- **Email:** Gmail App Password required (2FA must be enabled)
- **Logs:** View logs in Vercel Dashboard → Functions → Logs

---

## 🆘 Troubleshooting

### API not working:
- Check Environment Variables are set correctly
- View logs in Vercel Dashboard
- Test `/api/health` endpoint

### Email not sending:
- Verify Gmail App Password is correct
- Check EMAIL_USER, EMAIL_PASS, EMAIL_TO variables

### MongoDB connection failed:
- Verify MONGODB_URI is correct
- Check MongoDB Atlas network access (allow all IPs: `0.0.0.0/0`)

---

**Your portfolio is ready to deploy! 🎉**
