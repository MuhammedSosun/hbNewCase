import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../css/productDetail.css";
import { addToCart } from "../redux/slice/CartSlice";
import Reviews from "../components/Reviews";

function ProductDetail() {
  const { id } = useParams();
  const { reviewsByProductId } = useSelector((store) => store.reviews);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [activeTab, setActiveTab] = useState("description");
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);

  useEffect(() => {
    const newProducts = localStorage.getItem("products");
    if (newProducts) {
      const parsedProducts = JSON.parse(newProducts);
      const product = parsedProducts.find((p) => p.id === Number(id));
      setSelectedProduct(product || null);
    }
  }, [id]);
  const isProductInCart = cartItems.some(
    (item) => item.id === selectedProduct?.id,
  );

  const handleAddToCart = () => {
    dispatch(addToCart(selectedProduct));
  };

  if (!selectedProduct) {
    return <div className="product-detail-loading">Ürün Yükleniyor...</div>;
  }
  const currentProductReviews = reviewsByProductId[id] || [];
  const totalComments = currentProductReviews.length;
  return (
    <div className="product-page-wrapper">
      <div className="product-detail-container">
        <div className="product-detail-card">
          <div className="product-detail-left">
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              className="product-detail-image"
            />
          </div>

          <div className="product-detail-right">
            <p className="product-detail-brand">{selectedProduct.brand}</p>
            <h1 className="product-detail-title">{selectedProduct.name}</h1>

            <p className="product-detail-color">
              <span>Renk:</span> {selectedProduct.color}
            </p>

            <div className="product-detail-price-section">
              {selectedProduct.originalPrice && (
                <div className="detail-discount-wrapper">
                  <span className="detail-old-price">
                    {selectedProduct.originalPrice} TL
                  </span>
                  <span className="detail-discount-badge">
                    %{selectedProduct.discount} indirim
                  </span>
                </div>
              )}
              <p className="product-detail-price">
                {selectedProduct.price} <span>TL</span>
              </p>
            </div>

            <button
              className={`add-to-cart-btn ${isProductInCart ? "disabled" : ""}`}
              disabled={isProductInCart}
              onClick={handleAddToCart}
            >
              {isProductInCart ? "Bu Ürün Sepete Eklendi" : "Sepete Ekle"}
            </button>
          </div>
        </div>
      </div>

      <div className="product-info-tabs-container">
        <div className="tabs-header">
          <button
            className={`tab-btn ${activeTab === "description" ? "active" : ""}`}
            onClick={() => setActiveTab("description")}
          >
            Ürün Açıklaması
          </button>
          <button
            className={`tab-btn ${activeTab === "comments" ? "active" : ""}`}
            onClick={() => setActiveTab("comments")}
          >
            Değerlendirmeler{" "}
            <span className="comment-count">{totalComments}</span>
          </button>
          <button className="tab-btn">Soru & Cevap</button>
        </div>

        <div className="tab-content">
          {activeTab === "description" && (
            <div className="description-pane">
              <h3>{selectedProduct.name} Hakkında</h3>
              <p className="main-desc-text">{selectedProduct.description}</p>
              <div className="hb-guarantee-box">
                <p>
                  <strong>Hepsiburada Güvencesi:</strong> Seçtiğiniz ürünlerin
                  tüm belgeleri siparişinizle birlikte gönderilecektir.
                </p>
              </div>
            </div>
          )}

          {activeTab === "comments" && (
            <div className="comments-pane">
              <Reviews selectedId={Number(id)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
