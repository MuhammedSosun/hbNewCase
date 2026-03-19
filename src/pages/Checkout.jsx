import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/slice/CartSlice";
import "../css/checkout.css";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cartItems, totalAmount } = useSelector((store) => store.cart);
  const [currentItem, setCurrentItem] = useState(null);
  const [showCheckOutModal, setShowCheckOutModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openRemoveModal = (item) => {
    setCurrentItem(item);
    setShowRemoveModal(true);
  };
  const confirmRemoveItem = () => {
    if (currentItem) {
      dispatch(removeFromCart(currentItem.id));
    }

    setShowRemoveModal(false);
    setCurrentItem(null);
  };
  const cancelRemoveItem = () => {
    setShowRemoveModal(false);
    setCurrentItem(null);
  };

  const confirmCheckout = () => {
    alert("Siparişiniz alındı!");
    setShowCheckOutModal(false);
  };

  const cancelCheckout = () => {
    setShowCheckOutModal(false);
  };
  return (
    <div>
      <div className="checkout-container container">
        <div className="checkout-left">
          <h2>Sepetim ({cartItems.length} Ürün)</h2>

          {cartItems.length === 0 ? (
            <div className="empty-cart">Sepetinizde ürün bulunmamaktadır.</div>
          ) : (
            <div className="checkout-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-item">
                  <div className="item-image">
                    <img src={item.imageUrl} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <div className="item-info-main">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-sub">
                        Marka: <strong>{item.brand}</strong> | Renk:{" "}
                        <strong>{item.color}</strong>
                      </p>
                    </div>
                    <div className="item-price-section">
                      <span className="item-price">
                        {item.price.toFixed(2)} TL
                      </span>
                      <button
                        className="item-remove-link"
                        onClick={() => openRemoveModal(item)}
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="checkout-right">
          <div className="summary-box">
            <h3>Sipariş Özeti</h3>
            <div className="summary-line">
              <span>Ürün Toplamı</span>
              <span>{totalAmount.toFixed(2)} TL</span>
            </div>
            <div className="summary-line">
              <span>Kargo Toplamı</span>
              <span className="free-shipping">Ücretsiz</span>
            </div>
            <hr />
            <div className="summary-total">
              <span>Ödenecek Tutar</span>
              <span className="total-amount">{totalAmount.toFixed(2)} TL</span>
            </div>
            <button
              className="complete-order-btn"
              onClick={() => setShowCheckOutModal(true)}
              disabled={cartItems.length === 0}
            >
              Alışverişi Tamamla
            </button>
          </div>
        </div>
        <Modal
          isOpen={showRemoveModal}
          title="Ürünü sepetten kaldır"
          description="Bu ürünü sepetinizden kaldırmak istediğinize emin misiniz?"
          onCancel={cancelRemoveItem}
          onConfirm={confirmRemoveItem}
        />

        <Modal
          isOpen={showCheckOutModal}
          title="Alışverişi Tamamla"
          description="Siparişiniz oluşturulacaktır, onaylıyor musunuz?"
          onCancel={cancelCheckout}
          onConfirm={confirmCheckout}
        />
      </div>
    </div>
  );
}

export default Checkout;
