import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import "../css/productList.css";
import { setCurrentPage, setSortOrder } from "../redux/slice/ProductSlice";
import { addToCart } from "../redux/slice/CartSlice";
import { useCallback, useMemo } from "react";

function ProductList() {
  const dispatch = useDispatch();
  const {
    products = [],
    currentPage,
    sortBy,
    selectedBrand,
    selectedColor,
    searchTerm,
  } = useSelector((store) => store.products);
  const { cartItems } = useSelector((store) => store.cart);
  const itemsPerPage = 12;

  const filteredProducts = useMemo(() => {
    let result = [...(products || [])];

    if (selectedBrand.length > 0) {
      result = result.filter((p) => selectedBrand.includes(p.brand));
    }

    if (selectedColor.length > 0) {
      result = result.filter((p) => selectedColor.includes(p.color));
    }

    if (searchTerm?.trim().length >= 2) {
      const lowerSearch = searchTerm.toLowerCase().trim();
      result = result.filter((p) => p.name.toLowerCase().includes(lowerSearch));
    }

    return result;
  }, [products, selectedBrand, selectedColor, searchTerm]);

  const sortedProducts = useMemo(() => {
    const result = [...filteredProducts];

    switch (sortBy) {
      case "lowestPrice":
        return result.sort((a, b) => a.price - b.price);
      case "highestPrice":
        return result.sort((a, b) => b.price - a.price);
      case "newest-az":
        return result.sort((a, b) => a.name.localeCompare(b.name));
      case "newest-za":
        return result.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return result;
    }
  }, [filteredProducts, sortBy]);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, currentPage]);
  const handleAddToCart = useCallback(
    (product) => {
      dispatch(addToCart(product));
    },
    [dispatch],
  );

  const isInCart = useCallback(
    (id) => {
      return cartItems.some((item) => item.id === id);
    },
    [cartItems],
  );
  return (
    <div className="product-list-container">
      <div className="list-controls">
        <select
          className="native-selectbox"
          value={sortBy}
          onChange={(e) => dispatch(setSortOrder(e.target.value))}
        >
          <option value="">Sıralama Seçiniz</option>
          <option value="lowestPrice">En Düşük Fiyat</option>
          <option value="highestPrice">En Yüksek Fiyat</option>
          <option value="newest-az">En Yeniler (A-Z)</option>
          <option value="newest-za">En Yeniler (Z-A)</option>
        </select>
      </div>

      <div className="product-grid">
        {currentItems.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isInCart={isInCart(product.id)}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-nav"
            disabled={currentPage === 1}
            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              className={`page-item ${currentPage === num ? "active" : ""}`}
              onClick={() => dispatch(setCurrentPage(num))}
            >
              {num}
            </button>
          ))}

          <button
            className="page-nav"
            disabled={currentPage === totalPages}
            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
