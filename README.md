# 🚀 Koyyada Abhigna — Portfolio

A full-stack personal portfolio with a dark neon UI, smooth animations, and a MongoDB-backed contact form.

---

## 📁 Project Structure

```
portfolio/
├── frontend/
│   ├── index.html      ← Main HTML (all sections)
│   ├── style.css       ← Dark neon styles + animations
│   └── script.js       ← Interactions + form fetch API
│
└── backend/
    ├── server.js           ← Express server + routes
    ├── models/
    │   └── Contact.js      ← Mongoose schema
    ├── package.json
    └── .env.example        ← Copy to .env and configure
```

---

## ⚙️ Setup & Run

### Prerequisites
- **Node.js** ≥ 18
- **MongoDB** (local) or a **MongoDB Atlas** URI

---

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env        # edit MONGO_URI if needed
npm run dev                 # uses nodemon (auto-reload)
# OR
npm start                   # plain node
```



---

### 2. Frontend

No build step needed. Just open the file:

```bash
# Option A — open directly
open frontend/index.html

# Option B — serve with VS Code Live Server
# Right-click index.html → "Open with Live Server"

# Option C — simple Python server
cd frontend
python3 -m http.server 3000
# visit http://localhost:3000
```

> **Important:** The backend must be running on port 5000 before submitting the contact form.

---

## 🔌 API Endpoints

| Method | Route      | Description                      |
|--------|------------|----------------------------------|
| GET    | `/`        | Health check + endpoint list     |
| POST   | `/contact` | Save a contact form submission   |
| GET    | `/contact` | Retrieve all messages (JSON)     |

### POST `/contact` — Request Body

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "message": "Hello! I'd love to work with you."
}
```

### POST `/contact` — Success Response `201`

```json
{
  "success": true,
  "message": "Thank you! Your message has been received.",
  "data": {
    "_id": "...",
    "name": "Your Name",
    "email": "you@example.com",
    "message": "Hello!",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## 🎨 Features

- **Dark neon UI** — `#00ffe0` cyan glow aesthetic
- **Custom cursor** with magnetic hover
- **Noise texture overlay** for depth
- **Scroll-triggered animations** (fade-up, slide-in)
- **Animated skill bars** (triggered on scroll)
- **Counter animation** in About stats
- **Fully responsive** — mobile hamburger nav
- **Contact form** wired to Express + MongoDB
- **Input validation** on both client and server

---

## 🌐 Deploying

### Frontend → GitHub Pages / Vercel / Netlify
Upload the `frontend/` folder. Update the fetch URL in `script.js`:
```js
const response = await fetch('https://your-api-domain.com/contact', { ... });
```

### Backend → Railway / Render / Fly.io
- Set `MONGO_URI` and `PORT` as environment variables
- Use `npm start` as the start command

---

## 📦 Dependencies

### Backend
| Package    | Purpose                  |
|------------|--------------------------|
| express    | HTTP server & routing    |
| mongoose   | MongoDB ODM              |
| cors       | Cross-origin requests    |
| dotenv     | Environment variables    |
| nodemon*   | Dev auto-reload          |

*devDependency

---

Built with ❤️ by **Koyyada Abhigna**
