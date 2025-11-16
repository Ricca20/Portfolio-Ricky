# Quick Start Guide

## ⚡ 5-Minute Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free)

### Step 1: MongoDB Setup (2 min)

1. Create account at [mongodb.com](https://mongodb.com)
2. Create a free cluster
3. Create database user
4. Whitelist your IP: `0.0.0.0/0` (for development)
5. Copy connection string

### Step 2: Backend Setup (1.5 min)

```bash
cd backend
npm install

# Create .env file
echo "MONGODB_URI=your_connection_string_here" > .env
echo "PORT=5000" >> .env
echo "NODE_ENV=development" >> .env
echo "FRONTEND_URL=http://localhost:3000" >> .env

# Start backend
npm run dev
```

✅ Backend running at `http://localhost:5000`

### Step 3: Frontend Setup (1.5 min)

```bash
cd frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start frontend
npm run dev
```

✅ Frontend running at `http://localhost:3000`

## 🎨 Customization (5 min)

### Update Your Information

**Hero Section** - Edit `frontend/src/components/Hero.jsx`
```javascript
// Line 37
<h1>Hi, I'm <span>YOUR NAME HERE</span></h1>

// Line 41
Your Title / Role
```

**Social Links** - Edit `frontend/src/components/Hero.jsx`
```javascript
// Update these links (around line 73)
{ icon: FiGithub, link: 'https://github.com/yourprofile' },
{ icon: FiLinkedin, link: 'https://linkedin.com/in/yourprofile' },
```

**Profile Picture** - Edit `frontend/src/components/Hero.jsx`
```javascript
// Replace placeholder with your image
<img
  src="https://your-image-url.jpg"
  alt="Profile"
  className="w-full h-full rounded-full object-cover bg-gray-700"
/>
```

**Footer Info** - Edit `frontend/src/components/Footer.jsx`
```javascript
// Update email
<a href="mailto:your.email@example.com">
  your.email@example.com
</a>
```

## 📊 Add Sample Data

### Add First Project

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Project",
    "description": "A brief description of what this project does",
    "image": "https://via.placeholder.com/400x300",
    "techStack": ["React", "Node.js", "MongoDB"],
    "githubUrl": "https://github.com/yourname/project",
    "liveUrl": "https://project-demo.com",
    "featured": true
  }'
```

### Test Contact Form

Submit a test message at `http://localhost:3000/#contact`

Check received messages:
```bash
curl http://localhost:5000/api/messages
```

## 🚀 Deploy to Production

### Backend to Render

1. Push code to GitHub
2. Go to [Render Dashboard](https://render.com)
3. Click "New Web Service"
4. Connect your repository
5. Select `backend` directory
6. Add environment variables
7. Deploy!

**Get your backend URL**: `https://your-portfolio-api.render.com`

### Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com)
2. Import your GitHub repository
3. Select `frontend` directory
4. Add `VITE_API_URL` environment variable (use Render URL)
5. Deploy!

**Your portfolio is live!** 🎉

## 📚 File Structure Quick Reference

```
backend/
├── src/
│   ├── config/db.js           ← MongoDB connection
│   ├── models/                ← Database schemas
│   ├── controllers/           ← Business logic
│   ├── routes/                ← API endpoints
│   └── index.js              ← Server entry point
└── package.json

frontend/
├── src/
│   ├── components/           ← Reusable components
│   ├── services/             ← API calls
│   ├── hooks/                ← Custom React hooks
│   ├── utils/                ← Helper functions
│   └── App.jsx              ← Main component
└── package.json
```

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| MongoDB connection fails | Check .env MONGODB_URI, verify IP whitelist |
| Frontend can't reach backend | Check VITE_API_URL, ensure backend is running |
| Port already in use | `lsof -i :5000` then kill process |
| Build fails | Delete node_modules, run `npm install` again |

## 💡 Pro Tips

- Use `nodemon` in development for auto-reload
- Keep sensitive data in .env files (never commit!)
- Test locally before deploying
- Monitor your applications after deployment

## 📖 Full Documentation

- Detailed setup: See `README.md`
- Deployment guide: See `DEPLOYMENT_GUIDE.md`
- API documentation: Check inline comments in `backend/src/routes/`

---

**Ready to showcase your work? Let's go! 🚀**
