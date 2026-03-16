import React from "react";
import "../css/productCard.css";
import { useNavigate } from "react-router-dom";
function ProductCard({ product, onAddToCart, isInCart }) {
  const navigate = useNavigate();
  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={product.imageUrl}
          alt={product.name}
          onClick={() => navigate(`/product/${product.id}`)}
        />
      </div>
      <div className="product-info">
        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>
        <div className="product-details">
          <div>
            <strong>Marka:</strong> {product.brand}
          </div>
          <div>
            <strong>Renk:</strong> {product.color}
          </div>
        </div>
        <div className="price-area">
          {product.originalPrice && (
            <div className="discount-container">
              <span className="old-price">{product.originalPrice} TL</span>
              <span className="discount-badge">%{product.discount}</span>
            </div>
          )}

          <span className="current-price">{product.price} TL</span>
        </div>
        <button
          className={`add-to-cart-btn ${isInCart ? "disabled" : ""}`}
          disabled={isInCart}
          onClick={() => {
            onAddToCart();
          }}
        >
          {isInCart ? "Bu Ürün Sepete Eklendi" : "Sepete Ekle"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
