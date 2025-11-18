# 🍬 Sweet Shop Management System

A full-stack, test-driven Sweet Shop Management System built with **Node.js, Express, PostgreSQL, React, Tailwind CSS**, Docker, and JWT authentication — following industry-standard clean coding practices, modern UI design, and TDD workflow.

---

## ⭐ Features

### 🔐 Authentication
- User registration
- User login with JWT
- Admin role support
- Protected routes

### 🍭 Sweet Management (Admin)
- Add new sweets
- Update sweets
- Delete sweets
- Restock inventory
- Dashboard with:
  - Total sweets
  - Low-stock count
  - Number of categories
  - Total estimated earnings

### 🛍 Customer Features
- View all sweets
- Search by name, category, price range
- Purchase sweets (auto stock reduction)
- Beautiful modern UI
- Fully responsive

### 🎨 Frontend
- React + Vite
- TailwindCSS
- Modern Glass-UI, gradients, animations
- Premium admin dashboard

### 🧪 Backend Testing (TDD)
- Auth tests  
- Sweet creation tests  
- Purchase tests  
- Admin-only access tests  
- Validation tests  
- ~40% coverage (extendable to 80%)

---

## 🛠 Tech Stack

### Backend
- Node.js  
- Express.js  
- PostgreSQL  
- pg / pg-pool  
- JWT  
- Bcrypt  
- Docker  
- Jest + Supertest  

### Frontend
- React  
- Vite  
- Tailwind CSS  
- Axios  
- React Router  

---

## 📂 Project Structure

sweet-shop/
│
├── backend/
│ ├── src/
│ │ ├── routes/
│ │ ├── middleware/
│ │ ├── tests/
│ │ ├── db.js
│ │ ├── index.js
│ │ └── init_db.js
│ ├── package.json
│ └── jest.config.js
│
└── frontend/
├── src/
│ ├── pages/
│ ├── components/
│ ├── App.jsx
│ ├── auth.jsx
│ ├── api.js
│ └── main.jsx
├── package.json
└── tailwind.config.js



---

## 🐳 Running via Docker

Start PostgreSQL:


docker compose up -d

Check container:

docker ps


Database details:

Host: localhost
Port: 5433
DB: sweetdb

# ▶ Running the Backend
cd backend
npm install
npm run dev


Runs at:

http://localhost:4000

# 🎨 Running the Frontend
cd frontend
npm install
npm run dev


Runs at:

http://localhost:5173

🧪 Running the Test Suite (Backend)

Run all tests:

cd backend
npx cross-env NODE_ENV=test jest --runInBand


Coverage:

npm run test:coverage

🧩 API Endpoints
🔐 Auth
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
🍭 Sweets (Protected)
Method	Endpoint	Description
POST	/api/sweets	Add sweet (Admin only)
GET	/api/sweets	Get all sweets
GET	/api/sweets/search	Search sweets
PUT	/api/sweets/:id	Update sweet
DELETE	/api/sweets/:id	Delete (Admin only)
📦 Inventory (Protected)
Method	Endpoint	Description
POST	/api/sweets/:id/purchase	Purchase sweet
POST	/api/sweets/:id/restock	Restock (Admin only)
🔍 Search Query Examples
/api/sweets/search?q=ladoo
/api/sweets/search?category=Milk
/api/sweets/search?minPrice=50&maxPrice=150

📸 Screenshots 
<img width="978" height="613" alt="image" src="https://github.com/user-attachments/assets/dfafa171-b390-44db-b1bc-16f401a89776" />


Video Submission:
https://drive.google.com/file/d/15Pal_qkK5go6D9EtkMP7i798E6CMdxUV/view?usp=sharing


🧪 Test-Driven Development (TDD)

# This project was built strictly using TDD:

## This project followed a rigorous Test-Driven Development (TDD) workflow, cycling through the core phases for robust implementation:

### 1. 🔴 RED: Define Requirements with Failing Tests

We began by writing comprehensive, failing unit and integration tests for all major components and functionalities, including:



Core Feature Tests: Dashboard, Purchase, Search, Delete, Restock, and Add/Edit Sweet logic.

Authentication & User Flow: AuthContext, AuthGuard, Login, and Registration.

### 2. 🟢 GREEN: Minimal Implementation to Pass Tests

The implementation phase focused strictly on writing the minimum amount of production code required to make the failing tests pass. This involved:



Building UI components.

Implementing API requests and data fetching logic.

Developing Context logic and state management.

Handling all buttons and state updates.

### 3. 🔵 REFACTOR: Code Cleanup and Optimization

Finally, the code was cleaned and optimized without introducing new functionality, ensuring all tests remained green. Key refactoring tasks included:



Extraction: Separating and extracting the AuthGuard component for reusability.

Simplification: Removing unnecessary checks and redundant code.

Clarity: Improving overall code readability.

Logic Clean-up: Streamlining the core dashboard logic.

Test Maintenance: Ensuring test mocks are stable and maintainable.



## 🤖 My AI Usage (Mandatory Section)

I used AI tools responsibly to enhance development and maintain code quality, while ensuring all architecture, debugging, and decisions were made by me.


ChatGPT (GPT-5.1)

GitHub Copilot

### How I used AI !

Generating boilerplate for Express routes
Generating unit tests (Jest + Supertest)
Debugging SQL + foreign key errors
Designing Tailwind-based UI components
Improving admin dashboard layout
Creating README.md content
Suggesting TDD patterns and code cleanup
Reflection

### AI significantly improved:

Development speed
Test coverage
UI quality
Error resolution
Documentation clarity
All final logic, integration, and debugging were done manually by me.


## 🧹 Clean Code Practices

This project follows:
✔ SOLID principles
✔ Modular folder structure
✔ Meaningful variable naming
✔ Stateless components
✔ Proper error handling
✔ Separation of concerns
✔ Centralized database layer
✔ Reusable UI components

## 🧭 Git Workflow (As Required)

Each commit is descriptive and meaningful.
AI-involved commits include:

Example commit:

git commit -m "feat: add sweet search API

Used ChatGPT to generate query builder logic

Co-authored-by: ChatGPT <chatgpt@openai.com>"

# Recommended platforms:

Frontend:

Vercel

Netlify

Backend:

Render

Railway

AWS

Database:

Neon

Supabase

✅ Final Notes

This project fulfills all assignment requirements:

✔ Backend Fully Implemented
✔ Frontend Fully Implemented
✔ JWT Auth
✔ Admin Role
✔ Search API
✔ Restock API
✔ TDD Tests
✔ Docker Support
✔ Clean Code
✔ AI Usage Section
✔ Complete README


# DEVELOPED BY: MEGHANA TAMRAKAR, MANIT BHOPAL


