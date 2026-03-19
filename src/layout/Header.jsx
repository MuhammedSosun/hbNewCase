import React, { useState } from "react";
import "../css/header.css";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../redux/slice/ProductSlice";
import { removeFromCart } from "../redux/slice/CartSlice";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((store) => store.products);
  const navigate = useNavigate();

  const { cartItems, totalAmount } = useSelector((store) => store.cart);

  const handleSearch = (e) => {
    const value = e.target.value;

    dispatch(setSearchTerm(value));
  };
  const openDeleteModal = (id) => {
    setSelectedItem(id);
    setShowModal(true);
    setIsCartOpen(false);
  };

  const confirmDelete = () => {
    dispatch(removeFromCart(selectedItem));
    setShowModal(false);
    setSelectedItem(null);
  };

  return (
    <header className="main-header">
      <div className="container header-content">
        <div className="logo">
          <img
            className="image-cursor"
            src="https://kurumsal.hepsiburada.com/assets/hepsiburada-logo.svg"
            alt="Hepsiburada Logo"
            width="150"
            onClick={() => navigate("/")}
          />
        </div>

        <div className="search-bar">
          <span className="search-icon" aria-hidden="true">
            🔍
          </span>
          <input
            type="text"
            placeholder="25 milyondan fazla ürün içerisinde ara"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="header-right">
          <div
            className="cart-wrapper"
            onMouseEnter={() => setIsCartOpen(true)}
            onMouseLeave={() => setIsCartOpen(false)}
          >
            <button
              className="cart-button"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <span className="cart-label">Sepetim</span>

              <span className="cart-total">{totalAmount.toFixed(2)} TL</span>
              <span className="cart-count">{cartItems.length}</span>
              <span className={`cart-arrow ${isCartOpen ? "open" : ""}`}></span>
            </button>

            <div className={`cart-dropdown ${isCartOpen ? "active" : ""}`}>
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{
                        cursor: "pointer",
                        position: "relative",
                        zIndex: 10,
                      }}
                      width="40"
                      onClick={() => navigate(`/product/${item.id}`)}
                    />
                    <div className="cart-item-info">
                      <p className="cart-item-name">{item.name}</p>
                      <button
                        className="remove-btn"
                        onClick={() => openDeleteModal(item.id)}
                      >
                        Kaldır
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-footer">
                <button
                  className="go-to-cart-btn"
                  onClick={() => {
                    navigate("/checkout");
                    setIsCartOpen(false);
                  }}
                >
                  Sepete Git
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        title="Ürünü silmek istediğinize emin misiniz?"
        description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere,
            distinctio qui! Velit sunt ratione iure possimus facere maxime.
            Fugiat neque consequatur aperiam quibusdam perferendis tenetur? Vel
            aspernatur itaque blanditiis totam."
        onCancel={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </header>
  );
}

export default Header;
