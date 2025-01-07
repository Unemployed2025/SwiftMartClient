import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRegisterPage from "./Pages/LoginRegisterPage";
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import ProductsPage from "./Pages/ProductsPage";
import ProfilePage from "./Pages/ProfilePage";
import YourCartPage from "./Pages/YourCartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import NotFoundPage from "./Pages/NotFoundPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import FurnitureStatsPage from "./Pages/FurnitureStatsPage";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<LoginRegisterPage />} />

          {/* Protected Routes */}
          <Route path="/home" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/product" element={
            <ProtectedRoute>
              <ProductPage />
            </ProtectedRoute>
          } />
          <Route path="/allproducts" element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/yourcart" element={
            <ProtectedRoute>
              <YourCartPage />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          } />
          <Route path="/profile/furniturestats" element={
            <ProtectedRoute>
              <FurnitureStatsPage />
            </ProtectedRoute>
          } />

          {/* 404 Route - Must be last */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}