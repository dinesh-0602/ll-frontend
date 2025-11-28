# Stalwart Human Detection - Frontend

AI-powered human detection and crowd analytics system with real-time video processing capabilities.

![React](https://img.shields.io/badge/React-18.x-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Live Demo

- **Frontend:** Coming soon on Vercel
- **Backend API:** https://ll-react.onrender.com

## ✨ Features

- 📹 **Real-time Human Detection** - Live camera feed with person detection
- 📤 **Video Upload Processing** - Upload and analyze pre-recorded videos  
- 🗺️ **Heatmap Visualization** - Geographic density analysis with interactive maps
- 🔐 **User Authentication** - Secure JWT-based login system
- 🎨 **Dark/Light Mode** - Toggle between themes
- ⌨️ **Keyboard Shortcuts** - Quick navigation and controls
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- ♿ **Accessible** - WCAG compliant with ARIA labels
- 🎯 **Analytics Integration** - Track user interactions and events

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Routing:** React Router v6
- **Styling:** CSS3 with CSS Variables
- **State Management:** React Context API
- **HTTP Client:** Fetch API
- **Video Processing:** HTML5 Video API
- **Maps:** Leaflet.js (via backend heatmap generation)

## 📦 Installation

### Prerequisites

- Node.js 16+ and npm
- Backend API running (see backend repository)

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/stalwart-frontend.git
   cd stalwart-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:8000
   ```
   
   For production:
   ```env
   REACT_APP_API_URL=https://ll-react.onrender.com
   ```

4. **Start development server:**
   ```bash
   npm start
   ```
   
   App will open at `http://localhost:3000`

## 🚀 Deployment to Vercel (Free)

### Option 1: Via Vercel Dashboard (Recommended)

1. **Go to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Sign up with GitHub (free account)

2. **Import Repository:**
   - Click "Add New..." → "Project"
   - Select this repository
   - Click "Import"

3. **Configure:**
   - Framework Preset: **Create React App**
   - Root Directory: **./** (leave as is)
   - Build Command: `npm run build`
   - Output Directory: `build`

4. **Add Environment Variable:**
   - Click "Environment Variables"
   - Name: `REACT_APP_API_URL`
   - Value: `https://ll-react.onrender.com`
   - Click "Add"

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes ⏱️
   - Your app will be live! 🎉

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## 📁 Project Structure

```
stalwart-frontend/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
│   └── favicon.ico
├── src/
│   ├── App.jsx              # Main app component
│   ├── App.css              # Global styles
│   ├── index.js             # Entry point
│   ├── config.js            # API configuration
│   ├── pages/
│   │   ├── Home.jsx         # Landing page
│   │   ├── Upload.jsx       # Video upload page
│   │   ├── Realtime.jsx     # Live detection page
│   │   ├── Heatmap.jsx      # Heatmap visualization
│   │   ├── Login.jsx        # Authentication page
│   │   └── NotFound.jsx     # 404 page
│   ├── components/
│   │   ├── Nav.jsx          # Navigation bar
│   │   ├── Footer.jsx       # Footer component
│   │   ├── ErrorBoundary.jsx
│   │   ├── Toast.jsx        # Notification system
│   │   ├── ThemeToggle.jsx  # Dark mode toggle
│   │   ├── FAQ.jsx          # FAQ section
│   │   └── Skeleton.jsx     # Skeleton loaders
│   └── theme.css            # Theme variables
├── package.json
├── vercel.json              # Vercel config
└── README.md
```

## 🎯 Available Scripts

```bash
npm start          # Start development server (port 3000)
npm run build      # Build for production
npm test           # Run tests
```

## 🔧 Configuration

### API Endpoints

Configure in `src/config.js`:

```javascript
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  upload: `${API_URL}/upload`,
  startCamera: `${API_URL}/start-camera`,
  stopCamera: `${API_URL}/stop-camera`,
  realtimeFeed: `${API_URL}/realtime-feed`,
  heatmap: `${API_URL}/heatmap`,
  register: `${API_URL}/register`,
  login: `${API_URL}/login`,
};
```

### Theme Customization

Modify theme variables in `src/theme.css`:

```css
:root {
  --primary: #6366f1;
  --secondary: #8b5cf6;
  --background: #0a0e27;
  --text: #ffffff;
}
```

## ⌨️ Keyboard Shortcuts

- `Ctrl + H` - Go to Home
- `Ctrl + U` - Upload Video
- `Ctrl + R` - Real-time Detection
- `Ctrl + M` - View Heatmap
- `Ctrl + K` - Toggle Theme
- `Ctrl + S` - Start Camera
- `Ctrl + Q` - Stop Camera
- `?` - Show Shortcuts Help

## 🐛 Troubleshooting

### API Connection Issues

**Problem:** Can't connect to backend

**Solution:**
- Verify `REACT_APP_API_URL` in `.env` or Vercel environment variables
- Check backend is running: `curl https://ll-react.onrender.com/health`
- Check browser console for CORS errors
- Ensure backend allows your Vercel domain

### Build Errors

**Problem:** Build fails

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working

**Solution:**
- Restart dev server after changing `.env`
- Variable name must start with `REACT_APP_`
- For Vercel: Check Settings → Environment Variables
- Redeploy after adding environment variables

## 📊 Performance

- **Lighthouse Score:** 95+
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Bundle Size:** ~500KB (gzipped)

## 🔒 Security

- JWT token authentication
- Input validation and sanitization
- XSS protection
- CORS configuration
- Secure token storage

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) file

## 🔗 Related Repositories

- **Backend API:** Contact for backend repository
- **Full Stack Version:** [LL-react](https://github.com/Stalwart-squad/LL-react)

## 📈 Roadmap

- [ ] PWA support with offline mode
- [ ] Advanced analytics dashboard
- [ ] Export reports as PDF
- [ ] Multi-language support
- [ ] Mobile app (React Native)

---

⭐ **Star this repository if you find it helpful!**

Made with ❤️ by [Your Name](https://github.com/YOUR_USERNAME)
