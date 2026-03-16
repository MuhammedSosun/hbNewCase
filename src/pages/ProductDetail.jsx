import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../css/productDetail.css";
import { addToCart } from "../redux/slice/CartSlice";
function ProductDetail() {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);
  useEffect(() => {
    const newProducts = localStorage.getItem("products");
    let selectedP = null;
    if (newProducts) {
      const parsedProduct = JSON.parse(newProducts);
      selectedP = parsedProduct.find((product) => product.id === Number(id));
      setSelectedProduct(selectedP || null);
    } else {
      setSelectedProduct(null);
    }
  }, [id]);
  const isProductInCart = cartItems.some(
    (item) => item.id === selectedProduct?.id,
  );
  console.log(selectedProduct);
  const handleAddToCart = (selectedProduct) => {
    dispatch(addToCart(selectedProduct));
  };
  if (!selectedProduct) {
    return <div className="product-detail-loading">Ürün Yükleniyor</div>;
  }

  return (
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

          <p className="product-detail-price">${selectedProduct.price}</p>

          <p className="product-detail-description">
            {selectedProduct.description}
          </p>

          <button
            className={`add-to-cart-btn ${isProductInCart ? "disabled" : ""}`}
            disabled={isProductInCart}
            onClick={() => handleAddToCart(selectedProduct)}
          >
            {isProductInCart ? "Bu Ürün Sepete Eklendi" : "Sepete Ekle"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
