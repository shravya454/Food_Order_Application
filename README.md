# 🍔 Food Order Application

A full-stack **Food Ordering Web Application** that enables users to browse restaurants, explore menus, add food items to the cart, place orders, and make secure online payments. The application also includes user authentication and an AI-powered review analysis feature.

---

## 📌 Features

### 👤 User Features

* User Registration and Login
* JWT-based Authentication
* Browse Restaurants
* View Restaurant Menus
* Search Food Items
* Add Items to Cart
* Update Cart Quantity
* Place Orders
* Online Payment Integration
* View Order History
* Update User Profile

### 🍽️ Restaurant Features

* Restaurant Listing
* Menu Management
* Food Item Management

### 🎁 Additional Features

* AI Review Analysis
* Responsive User Interface
* Secure Backend APIs

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* CSS
* Redux Toolkit

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JSON Web Token (JWT)
* bcrypt.js

### Cloud Storage

* Cloudinary

### Payment

* Payment Gateway Integration

### AI

* IBM Granite AI (Review Analysis)

---

## 📂 Project Structure

```
Food_Order_Application/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── view/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🚀 Installation

### Clone the Repository

```bash
git clone https://github.com/shravya454/Food_Order_Application.git
```

### Navigate to the Project

```bash
cd Food_Order_Application
```

---

## Backend Setup

```bash
cd backend
npm install
npm start
```

---

## Frontend Setup

Open a new terminal.

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

JWT_EXPIRE=7d

COOKIE_EXPIRE=7

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_password

STRIPE_SECRET_KEY=your_payment_gateway_secret
```

---

## API Modules

* Authentication API
* Restaurant API
* Menu API
* Food Item API
* Cart API
* Order API
* Coupon API
* Payment API
* AI Review API

---

## Screens

* Home Page
* Login
* Registration
* Restaurant Listing
* Restaurant Details
* Menu
* Cart
* Checkout
* Payment
* Orders
* User Profile

---

## Internship

This project was developed during the WSA MERN Stack Internship as a full-stack web application to strengthen practical skills in the MERN (MongoDB, Express.js, React.js, Node.js) stack, RESTful API development, authentication, database integration, and modern web application development.


---

## Author

**Shravya K V**

Computer Science and Engineering Student
