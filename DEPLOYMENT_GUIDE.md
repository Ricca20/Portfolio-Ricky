# MERN Portfolio - Complete Setup & Deployment Guide

## Table of Contents
1. [Initial Setup](#initial-setup)
2. [Backend Configuration](#backend-configuration)
3. [Frontend Configuration](#frontend-configuration)
4. [Local Development](#local-development)
5. [Database Setup](#database-setup)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)

---

## Initial Setup

### 1. Clone or Initialize Git Repository

```bash
cd ~/Documents/Projects/Portfolio
git init
git add .
git commit -m "Initial commit: MERN portfolio setup"
```

### 2. Backend Installation

```bash
cd backend
npm install
```

**Dependencies installed:**
- `express`: Web framework
- `mongoose`: MongoDB ODM
- `cors`: Cross-origin requests
- `dotenv`: Environment variables
- `validator`: Input validation
- `nodemon`: Dev server auto-reload

### 3. Frontend Installation

```bash
cd ../frontend
npm install
```

**Dependencies installed:**
- `react`: UI library
- `react-dom`: React rendering
- `vite`: Build tool
- `tailwindcss`: Styling
- `framer-motion`: Animations
- `axios`: HTTP client
- `react-icons`: Icon library

---

## Backend Configuration

### 1. Environment Setup

Create `.env` file in `backend/` directory:

```bash
cp backend/.env.example backend/.env
```

Edit with your MongoDB connection:

```env
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 2. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create new cluster
4. Create database user with password
5. Whitelist IP address (0.0.0.0/0 for development)
6. Get connection string and add to `.env`

### 3. API Structure

The backend provides RESTful APIs:

**Project Management:**
- Fetch all/featured projects
- Get individual project details
- Create/update/delete projects (admin)

**Contact Messages:**
- Submit contact form
- Fetch all messages (admin)
- Mark messages as read (admin)
- Delete messages (admin)

### 4. Test Backend

```bash
cd backend
npm run dev
```

Visit `http://localhost:5000/api/health` - should return `{ status: "Server is running" }`

---

## Frontend Configuration

### 1. Environment Setup

Create `.env` file in `frontend/` directory:

```bash
cp frontend/.env.example frontend/.env
```

For local development:
```env
VITE_API_URL=http://localhost:5000/api
```

### 2. Customize Portfolio

Edit the following files to personalize:

**Hero Section** (`frontend/src/components/Hero.jsx`):
- Replace "Your Name" with your name
- Update profile picture URL
- Modify tagline and bio

**About Section** (`frontend/src/components/About.jsx`):
- Update education
- Change career goal
- Modify stats

**Skills** (`frontend/src/components/Skills.jsx`):
- Add your technologies
- Update skill categories

**Achievements** (`frontend/src/components/Achievements.jsx`):
- Add your certificates
- Update dates and issuers

**Footer** (`frontend/src/components/Footer.jsx`):
- Update contact info
- Add social links
- Change copyright name

### 3. Test Frontend

```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` - you should see your portfolio

---

## Local Development

### Running Both Services

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Using Docker Compose

```bash
docker-compose up
```

This starts:
- MongoDB: `mongodb://localhost:27017`
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`

---

## Database Setup

### Adding Sample Projects

Use MongoDB Compass or Atlas UI to add documents:

```json
{
  "_id": "ObjectId()",
  "title": "E-commerce Platform",
  "description": "Full-stack e-commerce with React frontend and Node.js backend",
  "image": "https://via.placeholder.com/300x200",
  "techStack": ["React", "Node.js", "MongoDB", "Stripe"],
  "githubUrl": "https://github.com/yourusername/ecommerce",
  "liveUrl": "https://ecommerce-demo.com",
  "featured": true,
  "createdAt": "2024-01-15",
  "updatedAt": "2024-01-15"
}
```

### Using API to Add Projects

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Project Name",
    "description": "Description",
    "image": "image-url",
    "techStack": ["React", "Node.js"],
    "githubUrl": "https://github.com/...",
    "liveUrl": "https://...",
    "featured": true
  }'
```

---

## Deployment

### Backend Deployment (Render)

#### Step 1: Prepare Backend

Create `backend/render.yaml`:
```yaml
services:
  - type: web
    name: portfolio-api
    env: node
    buildCommand: npm install
    startCommand: npm start
```

#### Step 2: Connect to Render

1. Push code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click "New +" → "Web Service"
4. Connect your GitHub repo
5. Select `backend` directory
6. Configure:
   - **Name**: portfolio-api
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

#### Step 3: Add Environment Variables

In Render dashboard, add:
```
MONGODB_URI=your_mongodb_atlas_uri
NODE_ENV=production
FRONTEND_URL=https://your-vercel-url.com
PORT=5000
```

#### Step 4: Deploy

Click "Deploy" - takes 2-3 minutes

Copy the deployed URL for frontend configuration.

### Frontend Deployment (Vercel)

#### Step 1: Connect to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository

#### Step 2: Configure Project

- **Framework**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

#### Step 3: Add Environment Variables

```
VITE_API_URL=https://your-render-backend-url.com/api
```

#### Step 4: Deploy

Click "Deploy" - takes 1-2 minutes

Your portfolio is now live!

---

## Environment Variables Checklist

### Development (.env files)

**Backend:**
- [ ] MONGODB_URI
- [ ] PORT (5000)
- [ ] NODE_ENV (development)
- [ ] FRONTEND_URL (http://localhost:3000)

**Frontend:**
- [ ] VITE_API_URL (http://localhost:5000/api)

### Production (Render/Vercel)

**Backend (Render):**
- [ ] MONGODB_URI
- [ ] NODE_ENV (production)
- [ ] FRONTEND_URL (Vercel deployment URL)

**Frontend (Vercel):**
- [ ] VITE_API_URL (Render deployment URL + /api)

---

## Troubleshooting

### Backend Issues

**MongoDB Connection Error**
```
Error: connect ECONNREFUSED
```
**Solution**: 
- Check MongoDB URI in .env
- Verify IP whitelist in Atlas
- Ensure network connection

**CORS Error**
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**:
- Update FRONTEND_URL in backend .env
- Restart backend server

### Frontend Issues

**API Calls Not Working**
```
GET http://localhost:5000/api/projects 404
```
**Solution**:
- Ensure backend is running
- Check VITE_API_URL in .env
- Verify backend server address

**Build Errors**
```
npm run build fails
```
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deployment Issues

**Backend on Render**
- Check build logs in Render dashboard
- Verify environment variables are set
- Ensure MongoDB URI is correct

**Frontend on Vercel**
- Check build output
- Verify VITE_API_URL points to correct backend
- Clear Vercel cache and redeploy

---

## Production Checklist

- [ ] MongoDB Atlas cluster created
- [ ] MongoDB user created with strong password
- [ ] IP whitelist configured (0.0.0.0/0 or specific IP)
- [ ] Backend environment variables set
- [ ] Frontend environment variables set
- [ ] GitHub repository connected to Render
- [ ] GitHub repository connected to Vercel
- [ ] Render deployment successful
- [ ] Vercel deployment successful
- [ ] Test all portfolio sections
- [ ] Test contact form
- [ ] Test API endpoints
- [ ] Mobile responsiveness verified
- [ ] Custom domain configured (optional)

---

## Next Steps

1. **Add Authentication** (optional)
   - Implement admin login for project/message management
   - Use JWT tokens

2. **Email Notifications** (optional)
   - Send email when contact form submitted
   - Use services like SendGrid or Nodemailer

3. **Analytics**
   - Add Google Analytics
   - Track portfolio visits

4. **SEO Optimization**
   - Add meta tags
   - Create sitemap.xml
   - robots.txt

5. **Performance Optimization**
   - Image optimization
   - Code splitting
   - Caching strategies

---

**Your MERN Portfolio is Ready! 🚀**
