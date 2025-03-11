Collecting workspace information# SwiftMart - Furniture E-commerce Platform

<div align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</div>

## 🛋️ About SwiftMart

SwiftMart is a full-featured e-commerce platform specializing in furniture. The application allows users to browse, purchase, review furniture products, and even list their own furniture for sale. With a modern UI and smooth user experience, SwiftMart aims to solve the age-old problem: "Wife Complaining About Furniture!"

## ✨ Features

- **User Authentication**: Secure login/registration system
- **Product Browsing**: Browse trending and all furniture products
- **Product Details**: View comprehensive product information, specifications, and reviews
- **Shopping Cart**: Add, view, and manage items in cart
- **Checkout Process**: Smooth payment and order placement flow
- **User Profiles**: View order history and submitted reviews
- **Review System**: Leave and read reviews for products
- **Seller Dashboard**: List and manage your furniture products
- **Product Statistics**: View sales and rating statistics for your listed items
- **Newsletter Subscription**: Stay updated with the latest furniture trends

## 🛠️ Tech Stack

### Frontend
- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [React Router](https://reactrouter.com/) - Navigation
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Flowbite React](https://flowbite-react.com/) - UI components
- [Axios](https://axios-http.com/) - HTTP client

### Backend
- [Express.js](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - ODM
- [JWT](https://jwt.io/) - Authentication
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing
- [Cloudinary](https://cloudinary.com/) - Image storage
- [SendGrid](https://sendgrid.com/) - Email service

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Cloudinary account
- SendGrid account

### Client Setup

```bash
# Clone repository
git clone https://github.com/yourusername/SwiftMart.git

# Navigate to client directory
cd SwiftMart/SwiftMartClient

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

### Server Setup

```bash
# Navigate to server directory
cd ../SwiftMartServer

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

## 🔑 Environment Variables

### Client (.env)
```
VITE_API_BASE_URL=http://localhost:5050
```

### Server (.env)
```
PORT=5050
MONGO_URI=mongodb://localhost:27017/swiftmart
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
SESSION_SECURE_KEY=your_session_key
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SENDGRID_API_KEY=your_sendgrid_api_key
SWIFT_MART_EMAIL=your_email@example.com
```

## 📱 Screenshots

<div align="center">
  <p><strong>Home Page</strong></p>
  <img src="https://via.placeholder.com/800x450.png?text=SwiftMart+Home+Page" alt="Home Page" width="800" />
  
  <p><strong>Product Page</strong></p>
  <img src="https://via.placeholder.com/800x450.png?text=SwiftMart+Product+Page" alt="Product Page" width="800" />
  
  <p><strong>User Profile</strong></p>
  <img src="https://via.placeholder.com/800x450.png?text=SwiftMart+User+Profile" alt="User Profile" width="800" />
</div>

## 📦 Project Structure

```
SwiftMart/
├── SwiftMartClient/       # Frontend React application
│   ├── public/            # Static assets
│   └── src/
│       ├── api/           # API service handlers
│       ├── Components/    # Reusable UI components
│       ├── Pages/         # Page components
│       └── styles/        # CSS files
├── SwiftMartServer/       # Backend Express application
│   ├── Controllers/       # Route controllers
│   ├── Models/            # Mongoose schemas
│   ├── Routes/            # Express routes
│   └── config/            # Configuration files
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💌 Contact

Project Creators - [@your_twitter](https://twitter.com/your_twitter)

Project Link: [https://github.com/yourusername/SwiftMart](https://github.com/yourusername/SwiftMart)

---

<p align="center">
  Built with ❤️ for furniture lovers everywhere
</p>
