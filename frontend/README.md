🎯 JobPilot — Full Stack Recruitment Platform

A modern Job & Company management platform built using React + Vite, Redux Toolkit, Node.js, Express, PostgreSQL, Cloudinary, and JWT Authentication.

🚀 This project includes company onboarding, profile management, dashboard, media upload, JWT login, and full backend API setup.

📚 Table of Contents

✨ Features

🛠️ Tech Stack

📁 Folder Structure

⚙️ Installation & Setup

🔑 Environment Variables

▶️ Running the Project

🧪 Postman Test Cases

📡 API Endpoints

📦 Deployment Notes

🤝 Contributing

📄 License

✨ Features
🔐 Authentication

JWT Login & Registration

Protected Route Handling

Auto-redirect based on auth state

🏢 Company Module

Company Profile Creation

Update Company Details

Cloudinary Logo & Banner Upload

Social Link Support

Auto-formatted establishment date

🧭 Dashboard

Sidebar navigation

Role-based layout

Quick actions

Modern UI built with TailwindCSS

🪄 Onboarding Wizard

Step 1 → Basic details

Step 2 → Company information

Step 3 → Upload logo/banner

Auto-redirect after successful setup

🛠️ Tech Stack
Frontend

⚛️ React 19

⚡ Vite

🎨 Tailwind CSS

🔄 Redux Toolkit

🌐 Axios

Backend

🟩 Node.js

🚂 Express.js

🗄 PostgreSQL (pg package)

☁ Cloudinary uploads

🔐 bcrypt + JWT

📁 Folder Structure
jobpilot/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── layouts/
    │   ├── pages/
    │   │   ├── onboarding/
    │   │   ├── company/
    │   ├── store/
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── index.html

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/yourusername/jobpilot.git
cd jobpilot

2️⃣ Backend Setup
Install dependencies
cd backend
npm install

Create PostgreSQL database
CREATE DATABASE jobpilot;

Run migrations (optional if using pgAdmin)

Ensure tables:

users
company_profile

3️⃣ Frontend Setup
cd ../frontend
npm install

🔑 Environment Variables

Create a .env file inside backend/:

PORT=5000

DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=jobpilot
DB_PASSWORD=yourpassword
DB_PORT=5432

JWT_SECRET=your_jwt_secret

CLOUD_NAME=your_cloud_name
CLOUD_KEY=your_cloud_api_key
CLOUD_SECRET=your_cloud_secret


⚠️ Cloudinary values must be copied from
👉 https://console.cloudinary.com/

▶️ Running the Project
Run Backend:
cd backend
npm run dev


Backend runs on → http://localhost:5000

Run Frontend:
cd frontend
npm run dev


Frontend runs on → http://localhost:5173

🧪 Postman Test Cases

✅ 1. Register User (POST)
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "email": "test@gmail.com",
  "password": "Pass123!",
  "full_name": "John Doe"
}

✅ 2. Login (POST)
POST http://localhost:5000/api/auth/login
Body:
{
  "email": "test@gmail.com",
  "password": "Pass123!"
}


Response contains:

token

user object

Store token in Postman:
Authorization → Bearer Token → <paste token>

🏢 Company API Tests
🟦 3. Create Company Profile
POST http://localhost:5000/api/company/register
Headers:
Authorization: Bearer <token>

Body:
{
  "company_name": "Tech Genius Pvt Ltd",
  "about_company": "Best AI company",
  "industry_type": "Software",
  "organizations_type": "Private Limited",
  "team_size": "50-100",
  "year_of_establishment": "2019",
  "company_website": "https://techgenius.com"
}

🟨 4. Get Company Profile
GET http://localhost:5000/api/company/profile
Authorization: Bearer <token>

🟧 5. Update Company Profile
PUT http://localhost:5000/api/company/update
Authorization: Bearer <token>

Body:
{ "team_size": "200-500" }

🟪 6. Upload Logo
POST http://localhost:5000/api/company/upload-logo
Form-data:
file: <your-image.jpg>

📡 API Endpoints Summary
🔐 Auth
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
🏢 Company
Method	Endpoint	Description
POST	/api/company/register	Create company profile
GET	/api/company/profile	Get current user's company
PUT	/api/company/update	Update company
POST	/api/company/upload-logo	Upload logo
POST	/api/company/upload-banner	Upload banner


📦 Deployment Notes
Frontend

Use:

npm run build


Deploy /dist folder to:

Netlify

Vercel

Cloudflare Pages

Backend

Deploy using:

Render

Railway

AWS EC2

DigitalOcean Droplet

Don't forget to set environment variables in production.

🤝 Contributing

Pull requests are welcome!
Follow these steps:

1. Fork repo  
2. Create feature branch  
3. Commit changes  
4. Open PR  

📄 License

This project is released under the MIT License.
