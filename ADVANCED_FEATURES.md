# Advanced Features & Enhancements

This document outlines features and improvements you can add to your portfolio after the initial setup.

## Table of Contents
1. [Authentication & Admin Panel](#authentication--admin-panel)
2. [Email Notifications](#email-notifications)
3. [Analytics & SEO](#analytics--seo)
4. [Performance Optimization](#performance-optimization)
5. [Enhanced Features](#enhanced-features)

---

## Authentication & Admin Panel

### JWT Implementation

#### 1. Backend Setup

Install dependencies:
```bash
npm install jsonwebtoken bcryptjs
```

Create `backend/src/models/Admin.js`:
```javascript
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model('Admin', adminSchema);
```

Create `backend/src/middleware/auth.js`:
```javascript
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};
```

#### 2. Frontend Setup

Create `frontend/src/services/authService.js`:
```javascript
import axiosInstance from './api';

export const authAPI = {
  login: (email, password) =>
    axiosInstance.post('/auth/login', { email, password }),
  
  logout: () => {
    localStorage.removeItem('adminToken');
  },
  
  getToken: () => localStorage.getItem('adminToken'),
  
  setToken: (token) => localStorage.setItem('adminToken', token),
  
  isAuthenticated: () => !!localStorage.getItem('adminToken')
};
```

Create `frontend/src/pages/Login.jsx`:
```javascript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/api';
import { authAPI } from '../services/authService';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.login(
        credentials.email,
        credentials.password
      );
      authAPI.setToken(response.data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-white mb-6">Admin Login</h2>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-white mb-2">Email</label>
          <input
            type="email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-white mb-2">Password</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
```

---

## Email Notifications

### Using Nodemailer

#### 1. Installation

```bash
npm install nodemailer
```

#### 2. Email Service

Create `backend/src/services/emailService.js`:
```javascript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendContactNotification = async (message) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.YOUR_EMAIL,
      subject: `New Portfolio Message: ${message.subject}`,
      html: `
        <h2>New Message from ${message.name}</h2>
        <p><strong>Email:</strong> ${message.email}</p>
        <p><strong>Subject:</strong> ${message.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.message}</p>
      `
    });
    return true;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
};

export const sendReplyNotification = async (email, replyMessage) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reply to Your Portfolio Message',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>${replyMessage}</p>
        <p>Best regards,<br/>Your Name</p>
      `
    });
    return true;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
};
```

#### 3. Update Message Controller

```javascript
import { sendContactNotification } from '../services/emailService.js';

export const createMessage = async (req, res, next) => {
  try {
    const message = await Message.create(req.body);
    
    // Send email notification
    await sendContactNotification(message);
    
    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: message
    });
  } catch (error) {
    next(error);
  }
};
```

---

## Analytics & SEO

### Google Analytics

Add to `frontend/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Meta Tags Component

Create `frontend/src/components/SEO.jsx`:
```javascript
import { useEffect } from 'react';

const SEO = ({ title, description, image, url }) => {
  useEffect(() => {
    document.title = title;
    
    // Update meta tags
    const setMeta = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:image', image);
    setMeta('og:url', url);
  }, [title, description, image, url]);

  return null;
};

export default SEO;
```

### Robots.txt & Sitemap

Create `frontend/public/robots.txt`:
```
User-agent: *
Allow: /
Disallow: /admin

Sitemap: https://yourportfolio.com/sitemap.xml
```

---

## Performance Optimization

### Image Optimization

Use Next.js Image or lazy loading:

```javascript
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<div>Loading...</div>}>
  <HeavyComponent />
</Suspense>
```

### Code Splitting

Split routes in React:
```javascript
import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
```

### Caching Strategy

Add to `backend/src/index.js`:
```javascript
// Cache GET requests
app.use((req, res, next) => {
  if (req.method === 'GET') {
    res.set('Cache-Control', 'public, max-age=300');
  } else {
    res.set('Cache-Control', 'no-store');
  }
  next();
});
```

---

## Enhanced Features

### 1. Dark/Light Mode Toggle

Create `frontend/src/components/ThemeToggle.jsx`:
```javascript
import { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;
```

### 2. Blog Section

Add blog model:
```javascript
const blogSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  content: String,
  author: String,
  image: String,
  tags: [String],
  published: Boolean,
  createdAt: { type: Date, default: Date.now }
});
```

### 3. Comments System

Add comments to projects:
```javascript
const commentSchema = new mongoose.Schema({
  projectId: mongoose.Schema.Types.ObjectId,
  author: String,
  email: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});
```

### 4. Newsletter Subscription

Add to contact form:
```javascript
const subscriberSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  subscribedAt: { type: Date, default: Date.now }
});
```

---

## Deployment Checklist for Advanced Features

- [ ] Add authentication to backend
- [ ] Protect admin routes with JWT
- [ ] Set up email service
- [ ] Add Google Analytics
- [ ] Optimize images
- [ ] Implement caching
- [ ] Add robots.txt and sitemap
- [ ] Set up error monitoring (Sentry)
- [ ] Configure HTTPS
- [ ] Set up backups for MongoDB
- [ ] Monitor performance metrics

---

## Useful Packages

| Package | Purpose |
|---------|---------|
| `express-rate-limit` | Rate limiting |
| `helmet` | Security headers |
| `compression` | Gzip compression |
| `morgan` | Request logging |
| `dotenv-safe` | Validate env variables |
| `sentry` | Error tracking |
| `sharp` | Image processing |
| `react-query` | Data fetching |
| `zustand` | State management |

---

## Resources

- [MERN Best Practices](https://www.geeksforgeeks.org/mern-stack/)
- [Node.js Security](https://nodejs.org/en/docs/guides/nodejs-security/)
- [React Performance](https://react.dev/reference/react/useMemo)
- [MongoDB Optimization](https://docs.mongodb.com/manual/administration/analyzing-mongodb-performance/)

---

**Start with the basics, then add these advanced features gradually! 🚀**
