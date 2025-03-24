# MERN Authentication & Role-Based Access Control

This project is a MERN (MongoDB, Express, React, Node.js) stack application that includes authentication, role-based access control, and protected routes for both Admin and Customer users.

## 📌 Features
- User Registration (Admin & Customer)
- Email Verification
- Role-based Authentication
- JWT-based Secure Routes
- Protected Routes (Admin & Customer specific)
- Fully Responsive Frontend using Material-UI

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```sh
  git clone https://github.com/MehulGS/TEMP_TECHERUDITE.git
```

### 2️⃣ Install Dependencies
#### Backend (Server)
```sh
  cd server
  npm install
```
#### Frontend (Client)
```sh
  cd client
  npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file inside the `server` directory and add the following:
```env
PORT=5000
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=Your_Secret_Key
JWT_EXPIRES_IN=1d
EMAIL_SERVICE=gmail
SMTP_HOST=smtp.gmail.com
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_smtp_password
SMTP_PORT=587
PRODUCTION=false
```

### 4️⃣ Start the Application
#### Backend (Server)
```sh
  cd server
  npm start
```
#### Frontend (Client)
```sh
  cd client
  npm run dev
```

## 🔥 API Endpoints

### Authentication Routes
| Method | Endpoint           | Description               |
|--------|-------------------|---------------------------|
| POST   | /api/register     | Register a new user      |
| GET    | /api/verify/:token | Verify Email             |
| POST   | /api/admin/login  | Admin Login              |
| POST   | /api/customer/login | Customer Login          |

## 🔒 Role-Based Access & Protected Routes
- **Customers** can only access `customer-dashboard`
- **Admins** can only access `admin-dashboard`
- Unauthorized access redirects:
  - If no token: Redirect to `/customer-login` or `/admin-login`
  - If a customer tries to access `/admin-dashboard`, they are redirected to `/customer-dashboard`
  - If an admin tries to access `/customer-dashboard`, they are redirected to `/admin-dashboard`


## 🤝 Contributing
1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Push the branch and create a Pull Request

## 📜 License
This project is licensed under the MIT License.

---
**👨‍💻 Developed by Mehul Gupta**