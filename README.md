# 💼 My Portfolio Web App

This is a modern, responsive developer portfolio built using **MERN Stack**, designed to showcase projects, skills, certifications, and contact details in a sleek, interactive format.

> ⚡ Live Preview (Optional): [Add Netlify/Vercel/GitHub Pages link here]

---

## 🚀 Features

- ✨ Beautiful, minimal UI with smooth transitions
- 📱 Fully responsive design for mobile, tablet, and desktop
- 🧩 Modular architecture using reusable React components
- 🎓 Certificate carousel with slider functionality
- 💡 Skills, projects, about, and contact sections
- 🌗 Optional dark/light mode toggle

---

## 🛠 Tech Stack

- **Frontend**: React + Vite
- **Styling**: SCSS + CSS Modules
- **Icons**: react-icons
- **Animation**: CSS transitions
- **Version Control**: Git & GitHub
- **Backend**: Node.js + Express, MongoDB

---

## 📂 Project Structure

```
portfolio/
├── public/
├── src/
|   ├──client/
│   |  ├── assets/             # Images and static data
│   |  ├── components/         # Reusable UI components
│   |  ├── pages/              # Route-level components (Home, About, Contact, etc.)
│   |  ├── styles/             # SCSS files and variables
│   |  ├── App.jsx
│   |  └── main.jsx
|   ├──server/                 # Backend API (Node.js + Express)
│      ├── server.js
│      ├── routes/
│      ├── config/
│      ├── models/
│      └── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── netlify.toml
├── package-lock.json
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 📦 Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/Puvanesh-007/my-portfolio-webapp.git
cd my-portfolio-webapp

# 2. Install frontend dependencies
npm install

# 3. Run frontend development server
npm run dev
```

Visit `http://localhost:5173` to view the portfolio in the browser.

---

## ⚙️ Backend Setup

> (Optional if you're integrating backend features like contact form handling or dynamic data loading)

```bash
# Navigate to backend folder
cd server

# Install backend dependencies
npm install

# Run backend server
npm start
```

Backend will run at `http://localhost:5000`.

---

## 📝 License

This project is licensed under the MIT License.

> Feel free to fork, customize, and use this template as your own portfolio starter!
