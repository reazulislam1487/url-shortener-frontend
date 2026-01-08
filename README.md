
# 🎨 Frontend – URL Shortener Service

This is the **frontend application** for the URL Shortener Service, built as part of a **Full-Stack Developer assignment**.  
The frontend provides a clean, simple, and user-friendly interface for authentication, URL shortening, and dashboard management.

---

## 🚀 Overview

The frontend allows users to:

- Register and log in securely
- Create short URLs from long URLs
- View and manage previously created URLs
- Track click counts for each URL
- Log out securely

The UI is designed to be **minimal, professional, and SaaS-like**, without relying on heavy UI libraries.

---

## 🧱 Tech Stack

- **Framework:** React (Vite)
- **Language:** JavaScript
- **Styling:** Plain CSS (custom design system)
- **State Management:** React Hooks
- **HTTP Communication:** Fetch API / Axios
- **Authentication:** JWT (stored in localStorage)

---

## ✨ Features

### 🔐 Authentication Pages
- Login page
- Registration page
- Client-side route protection (dashboard accessible only when logged in)

### 🔗 URL Shortening UI
- Input field to paste long URLs
- Button to generate short URL
- Auto-refresh URL list after creation

### 📊 Dashboard
- Table-based layout displaying:
  - Original URL (truncated for readability)
  - Short code
  - Full shortened URL
  - Total clicks
- Delete URL functionality
- Logout option

### 🎨 UI/UX
- Centered auth cards
- Responsive layout
- Clean spacing and typography
- Consistent color system
- Accessible form inputs

---

## 📁 Folder Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── index.js        # API request functions
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   ├── styles.css          # Custom UI design system
│   ├── index.css           # Global styles
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── index.html
├── package.json
└── vite.config.js
```

---

## ⚙️ Setup Instructions

### 1️⃣ Navigate to frontend directory
```bash
cd frontend
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Start development server
```bash
npm run dev
```

The application will run at:
👉 **http://localhost:5173**

---

## 🔌 Environment Variables

The frontend expects the backend API base URL.

Create a `.env` file in the frontend root:

```env
VITE_API_URL=http://localhost:5000
```

> Make sure the backend server is running before using the frontend.

---

## 🔁 API Integration

All API calls are centralized in:

```
src/api/index.js
```

This includes:
- `login()`
- `register()`
- `getUrls()`
- `createUrl()`
- `deleteUrl()`

This structure keeps components clean and readable.

---

## 🎨 Design Decisions

- Used **plain CSS** instead of Tailwind or UI frameworks for full control
- Centralized reusable styles (`styles.css`)
- Simple component structure for easy maintenance
- Focused on readability and assignment clarity over over-engineering

---

## ⚠️ Known Limitations

- No form validation UI (relies on backend responses)
- No loading/skeleton states
- No dark mode (can be added easily)
- Alerts used instead of toast notifications

---

## ✅ Pre-Submission Checklist (Frontend)

- [x] Runs on fresh install
- [x] No sensitive data committed
- [x] Environment variables documented
- [x] Clean UI & readable code
- [x] Matches assignment requirements

---

## 👨‍💻 Author

**Reazul Islam Reaz**  
Applied Position: **Full-Stack Developer**

---

> This frontend is designed to work seamlessly with the backend service provided in the same repository.