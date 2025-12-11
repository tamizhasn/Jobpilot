# 🚀 JobPilot – Full Stack Job Portal

JobPilot is a modern full-stack job portal built using:

**Frontend:** React (Vite), Redux Toolkit, TailwindCSS  
**Backend:** Node.js, Express.js, PostgreSQL, JWT Authentication, Cloudinary for file uploads

---

# 📚 Table of Contents
1. [Project Overview](#project-overview)  
2. [Tech Stack](#tech-stack)  
3. [Backend Setup](#backend-setup)  
4. [Frontend Setup](#frontend-setup)  
5. [API Documentation](#api-documentation)  
6. [Postman Testing Guide](#postman-testing-guide)  
7. [Frontend Features](#frontend-features)  
8. [.gitignore](#gitignore)  
9. [Contributing](#contributing)  
10. [Security Notes](#security-notes)  
11. [Author](#author)  

---

# 📘 Project Overview

JobPilot allows employers to:

- Create an account  
- Build/manage company profile  
- Upload logos & banners  
- Access protected dashboard  
- Update company details  

This system supports **full user authentication**, **cloud uploads**, and **dynamic company management**.

---

# 🛠 Tech Stack

### 🎨 Frontend
- React (Vite)
- Redux Toolkit
- Tailwind CSS
- React Router DOM
- Axios

### 🗄 Backend
- Node.js + Express
- PostgreSQL 17
- JWT Authentication
- bcrypt password hashing
- Multer middleware
- Cloudinary image hosting

---

# 🗄️ Backend Setup

## 📌 1. Navigate to Backend Folder

cd backend
📌 2. Install Dependencies


---
📌 3. Create .env File
Create /backend/.env:

```
PORT=5000

# PostgreSQL Database
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@localhost:5432/company_db

# JWT Auth
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=90d

# Cloudinary Credentials
CLOUD_NAME=your_cloudinary_name
CLOUD_KEY=your_cloudinary_key
CLOUD_SECRET=your_cloudinary_secret
```
---

```
📌 4. Start Backend Server

npm run dev
Backend runs at:

http://localhost:5000

🎨 Frontend Setup
📌 1. Navigate to Frontend

cd ../frontend
📌 2. Install Dependencies


📌 3. Create .env File
Add:


VITE_API_URL=http://localhost:5000/api
📌 4. Start Frontend


npm run dev
Frontend URL:


http://localhost:5173
📡 API Documentation
🔐 Authentication API
Register User
POST /api/auth/register

Request Body:
json

{
  "email": "user@gmail.com",
  "password": "Pass123!",
  "full_name": "John Doe",
  "gender": "M",
  "mobile_no": "+919876543210"
}
Login User
POST /api/auth/login

Request:
json

{
  "email": "user@gmail.com",
  "password": "Pass123!"
}
Response:
json

{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "user@gmail.com",
    "role": 1
  }
}
🏢 Company Profile API
Create Company
POST /api/company/register

json
{
  "company_name": "Tech Genius Pvt Ltd",
  "about_company": "We create AI tools.",
  "organizations_type": "Private Limited",
  "industry_type": "Software Development",
  "team_size": "50-100",
  "year_of_establishment": "2019",
  "company_website": "https://example.com",
  "headquarter_phone_no": "+91-9876543210",
  "social_links": "{\"linkedin\":\"https://linkedin.com/company/techgenius\"}",
  "map_location_url": "https://maps.google.com/xyz",
  "careers_link": "https://example.com/careers",
  "headquarter_mail_id": "contact@example.com"
}
Get Company Profile
GET /api/company/profile

Update Company
PUT /api/company/update
(All fields optional)

🖼 File Upload API
Upload Logo
POST /api/company/upload-logo
Form-data:


file: <image>
Upload Banner
POST /api/company/upload-banner
Form-data:


file: <image>
Cloudinary Response:
json
Copy code
{
  "success": true,
  "url": "https://cloudinary.com/.../company_logo.jpg"
}
🧪 Postman Testing Guide
Follow these steps:

1️⃣ Register User
2️⃣ Login & Copy Token
3️⃣ Set Authorization → Bearer Token
4️⃣ Create Company
5️⃣ View Company Profile
6️⃣ Upload Logo
7️⃣ Upload Banner
8️⃣ Update Company
---
# 🎛 Frontend Features

✔ Secure Authentication Pages
✔ Protected Dashboard Routing
✔ Sidebar + Topbar UI Layout
✔ Company Registration Form
✔ Company Update Form
✔ Auto Logo & Banner Upload to Cloudinary
✔ Redux Toolkit for state management
✔ Token-based route protection
---
🧹 .gitignore
bash
Copy code
# Logs
logs
*.log

# Node Modules
node_modules/
backend/node_modules/
frontend/node_modules/

---
# Environment Files
.env
backend/.env
frontend/.env
---
# Build Output
dist/
build/
.vite/
---
# Editors
.vscode/
.DS_Store
---
# Temp Uploads
tmp/
temp/
---
# DB Dumps
*.sql
*.dump
*.tar
🤝 Contributing
Fork the repository

Create a new feature branch

Commit your changes

Create a Pull Request

🔒 Security Notes
Never commit .env files

Regenerate JWT/Cloudinary keys if leaked

Do not store secrets in frontend

Use .gitignore to protect sensitive files

👤 Author
Tamil Arasan
JobPilot – Full Stack Job Portal

⭐ Thank You!
If you like this project, please ⭐ the repository.
Enjoy building with JobPilot 🚀🔥

