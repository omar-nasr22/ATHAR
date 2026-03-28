# ATHAR (أثر) - Digital Publishing Platform

"Because knowledge leaves an impact" (لأن العلم يترك أثرًا)

## 📋 Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Admin Panel](#admin-panel)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

ATHAR is a modern digital publishing platform designed to help authors and publishers sell digital books securely. The platform provides a complete solution from book management to secure delivery.

## 💻 Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Internationalization**: i18next
- **Payment**: Stripe (@stripe/react-stripe-js)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **File Uploads**: Multer
- **Authentication**: JWT (JSON Web Tokens)
- **Email**: Nodemailer
- **Payment**: Stripe

### Architecture
- REST API with clean MVC-like structure
- Separate frontend and backend
- Modular and scalable codebase

## ✨ Key Features

- 🌍 **Bilingual Support**: Full Arabic (RTL) and English (LTR) with instant toggle
- 📚 **Digital Store**: Dynamic catalog of digital books with search and categories
- 💳 **Secure Checkout**: Streamlined purchase flow for digital assets
- 📧 **Automated Delivery**: Instant email delivery of secure download links
- 🔒 **Secure Downloads**: Expiring links (7 days) and protected file paths
- 🛠️ **Admin Dashboard**: Full CRUD for books with secure image and PDF uploads
- 📱 **Mobile First**: Fully responsive and premium UI design
- 🔐 **Authentication**: Secure JWT-based authentication system
- 📊 **Analytics**: Track sales and downloads
- 🎨 **Customizable**: Easy to customize branding and design

## 🚀 Quick Start

### 1. Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas account)
- Git (optional, for cloning the repository)

### 2. Clone the Repository

```bash
git clone https://github.com/yourusername/athar.git
cd athar
```

### 3. Setup Environment

Create a `.env` file in the `/server` directory with the following variables:

```env
# Server Configuration
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/athar

# JWT Secret (Use a strong, random string)
JWT_SECRET=your_very_secure_jwt_secret_key_here

# Stripe (Optional - for payment processing)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here

# Email Configuration (for sending download links)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here

# Client URL
CLIENT_URL=http://localhost:5173
```

**Note**: For Gmail, you need to use an App Password instead of your regular password. Learn how to generate one [here](https://support.google.com/accounts/answer/185833).

### 4. Install Dependencies

Install dependencies for both frontend and backend:

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

Or use the convenience script from the project root:

```bash
npm run install-all
```

### 5. Seed Admin Data

Create the default admin user:

```bash
cd server
node seed.js
```

This will create an admin user with:
- **Email**: `admin@athar.ai`
- **Password**: `admin123`

⚠️ **Important**: Change these credentials after first login!

### 6. Start Development Servers

Run both frontend and backend concurrently:

```bash
# From project root
npm run dev
```

Or run them separately:

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

Access the application at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api/docs (if available)

## 📁 Project Structure

```
athar/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── i18n/          # Internationalization files
│   ├── package.json
│   └── vite.config.js
├── server/                # Backend Express application
│   ├── controllers/       # Route controllers
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── uploads/           # File upload directory
│   ├── seed.js            # Database seeding script
│   ├── index.js           # Server entry point
│   └── package.json
├── README.md
└── package.json           # Root package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create new book (admin only)
- `PUT /api/books/:id` - Update book (admin only)
- `DELETE /api/books/:id` - Delete book (admin only)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders (requires auth)
- `GET /api/orders/:id` - Get order by ID (requires auth)

### Downloads
- `GET /api/downloads/:token` - Download file (valid token required)

## 🛠️ Admin Panel

Access the admin dashboard at `http://localhost:5173/admin`.

### Features:
- **Book Management**: Add, edit, and delete books
- **Image Uploads**: Upload book cover images
- **PDF Uploads**: Upload digital book files
- **Order Management**: View and manage orders
- **Analytics**: Track sales and downloads

### Default Admin Credentials:
- **Email**: `admin@athar.ai`
- **Password**: `admin123`

⚠️ **Security Note**: Change these credentials immediately after first login!

## 🌐 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure build settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variables
5. Deploy!

### Backend (Render/Railway)

1. Push your code to GitHub
2. Import project in [Render](https://render.com) or [Railway](https://railway.app)
3. Configure build settings:
   - Build Command: `npm install`
   - Start Command: `node index.js`
4. Add environment variables
5. Deploy!

### Database (MongoDB Atlas)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add your deployment IP to the whitelist
4. Create a database user
5. Get your connection string
6. Update `MONGODB_URI` in your `.env` file

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@athar.ai or open an issue in the GitHub repository.

---

© 2026 ATHAR. All rights reserved.
