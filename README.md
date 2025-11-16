# 🚀 Portfolio Website - Ricky Perera

A modern, responsive full-stack portfolio website built with the MERN stack, featuring a clean UI, dark mode, and contact form with email notifications.

![Portfolio Preview](frontend/public/profile.jpg)

## ✨ Features

- 🎨 **Modern UI/UX** - Clean, minimal design with smooth animations
- 🌓 **Dark/Light Mode** - Theme toggle with persistent preference
- 📱 **Fully Responsive** - Mobile-first design approach
- 🚀 **Fast & Optimized** - Code splitting, lazy loading, and SEO optimized
- 📧 **Contact Form** - Email notifications via Nodemailer
- 💼 **Project Showcase** - Paginated project gallery (4 per page)
- 🎯 **Skills Display** - Categorized tech stack with interactive UI
- 📊 **GitHub Integration** - Live contribution graph
- 🔗 **Social Links** - Direct connections to GitHub, LinkedIn, Facebook, Instagram
- 📄 **CV Download** - View and download resume functionality

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Nodemailer** - Email service
- **Cors** - Cross-origin resource sharing

## 📁 Project Structure

```
Portfolio/
├── frontend/                # React frontend
│   ├── public/             # Static assets (CV, profile image)
│   ├── src/
│   │   ├── components/     # React components (Hero, About, Projects, etc.)
│   │   ├── context/        # Theme context (dark/light mode)
│   │   ├── hooks/          # Custom hooks (useApi, useFormSubmit)
│   │   ├── services/       # API services
│   │   └── utils/          # Helper functions
│   └── package.json
│
├── backend/                # Express backend
│   ├── src/
│   │   ├── config/         # Database config
│   │   ├── controllers/    # Route controllers (message, project)
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Mongoose models (Message, Project)
│   │   ├── routes/         # API routes
│   │   └── utils/          # Utilities (email service, validation)
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Gmail account (for email notifications)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Ricca20/Portfolio.git
cd Portfolio
npm install
```

2. **Install Backend Dependencies**
```bash
cd ../backend
npm install
```

### Configuration

1. **Backend Environment Variables**

Create a `.env` file in the `backend` directory:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Server
PORT=5001
NODE_ENV=development

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
EMAIL_TO=pereraricky20@gmail.com

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

2. **Frontend Configuration**

The frontend is pre-configured to work with the backend at `http://localhost:5001`. Update `src/services/api.js` if needed.

### Running the Application

1. **Start Backend Server**
```bash
cd backend
npm start
```
Backend will run on `http://localhost:5001`

2. **Start Frontend Development Server**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:3000`

## 📧 Email Configuration

To enable contact form email notifications:

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the app password in the `EMAIL_PASS` environment variable

## 🎨 Customization

### Update Personal Information

1. **Hero Section** - `frontend/src/components/Hero.jsx`
2. **About Section** - `frontend/src/components/About.jsx`
3. **Projects** - `frontend/src/components/Projects.jsx`
4. **Skills** - `frontend/src/components/Skills.jsx`
5. **Education** - `frontend/src/components/Education.jsx`

### Theme Colors

Edit `frontend/tailwind.config.js` to customize the color scheme (default: cyan).

## 📦 Building for Production

### Frontend
```bash
cd frontend
npm run build
```

### Backend
The backend runs as-is in production with `NODE_ENV=production`.

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Update `VITE_API_URL` environment variable with production backend URL

### Backend (Heroku/Railway/Render)
1. Update environment variables
2. Set `NODE_ENV=production`
3. Deploy the backend folder

## 📝 API Endpoints

### Messages
- `POST /api/messages` - Create new message (sends email notification)
- `GET /api/messages` - Get all messages (with optional read filter)
- `GET /api/messages/:id` - Get message by ID (auto marks as read)
- `PATCH /api/messages/:id/read` - Mark message as read
- `DELETE /api/messages/:id` - Delete message

### Projects
- `GET /api/projects` - Get all projects (with optional featured filter)
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Health Check
- `GET /health` - Check server status

## 🔒 Security

- CORS configured for specific origins
- Environment variables for sensitive data
- Input validation on contact form
- MongoDB injection protection via Mongoose
- Error handling middleware

## 📈 SEO Optimization

- Meta tags for social sharing (Open Graph, Twitter Cards)
- Structured data (JSON-LD Person schema)
- Sitemap and robots.txt
- Semantic HTML with proper headings
- Optimized images and lazy loading
- Code splitting for faster load times

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is [MIT](LICENSE) licensed.

## 👤 Author

**Ricky Perera (Ricca)**

- GitHub: [@Ricca20](https://github.com/Ricca20)
- LinkedIn: [Ricky Perera](https://www.linkedin.com/in/ricky-perera-355678340/)
- Email: pereraricky20@gmail.com

## ⭐ Show your support

Give a ⭐️ if you like this project!

---

Made with ❤️ by Ricky Perera
{
  "title": "Project Name",
  "description": "Project description",
  "image": "image-url",
  "techStack": ["React", "Node.js", "MongoDB"],
  "githubUrl": "https://github.com/...",
  "liveUrl": "https://...",
  "featured": true
}
```

## 🎨 Customization

- Edit colors in `frontend/tailwind.config.js`
- Update portfolio info in component files
- Modify animations in Framer Motion props
- Adjust responsive breakpoints as needed

## 📜 License

MIT License - feel free to use for your own portfolio

## 👤 Author

Your Name - [Your Website](https://yourwebsite.com)

---

**Happy Coding! 🚀**
