import React, { useState } from "react";
import "../css/header.css";

function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="main-header">
      <div className="container header-content">
        <div className="logo">
          <img
            src="https://kurumsal.hepsiburada.com/assets/hepsiburada-logo.svg"
            alt="Hepsiburada Logo"
            width="150"
          />
        </div>

        <div className="search-bar">
          <span className="search-icon" aria-hidden="true">
            🔍
          </span>
          <input
            type="text"
            placeholder="25 milyondan fazla ürün içerisinde ara"
          />
        </div>

        <div className="header-right">
          <div className="cart-wrapper">
            <button
              className="cart-button"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <span className="cart-label">Sepetim</span>
              <span className="cart-total">0 TL</span>
              <span className="cart-count">3</span>
              <span className={`cart-arrow ${isCartOpen ? "open" : ""}`}></span>
            </button>

            <div className={`cart-dropdown ${isCartOpen ? "active" : ""}`}>
              <div className="cart-item">
                <img className="cart-item-image" />

                <div className="cart-item-info">
                  <p className="cart-item-name"></p>
                  <button className="remove-btn">Kaldır</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
