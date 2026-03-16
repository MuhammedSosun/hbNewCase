import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Checkout from "../pages/Checkout";
import { useSelector } from "react-redux";

function RouterConfig() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default RouterConfig;
