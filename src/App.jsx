import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginRegisterPage from "./Pages/LoginRegisterPage"
import HomePage from "./Pages/HomePage"
import ProductPage from "./Pages/ProductPage";
import ProductsPage from "./Pages/ProductsPage";
import ProfilePage from "./Pages/ProfilePage";
import YourCartPage from "./Pages/YourCartPage";
import CheckoutPage from "./Pages/CheckoutPage";
export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginRegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/allproducts" element={<ProductsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/yourcart" element={<YourCartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Router>
    </div>
  )
}