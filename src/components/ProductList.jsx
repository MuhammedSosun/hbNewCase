import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import "../css/productList.css";
import { setCurrentPage, setSortOrder } from "../redux/slice/ProductSlice";

function ProductList() {
  // = [] bunun var olmasının sebebi  boş dönünce undefined dönmesin
  const {
    products = [],
    currentPage,
    sortBy,
  } = useSelector((store) => store.products);

  const dispatch = useDispatch();

  const sortedProducts = [...products];

  if (sortBy === "lowestPrice") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "highestPrice") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "newest-az") {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "newest-za") {
    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  const itemsPerPage = 12;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  return (
    <div className="product-list-container">
      <select
        className="native-selectbox"
        value={sortBy}
        onChange={(e) => dispatch(setSortOrder(e.target.value))}
      >
        <option value="lowestPrice">En Düşük Fiyat</option>
        <option value="highestPrice">En Yüksek Fiyat</option>
        <option value="newest-az">En Yeniler (A{">"}Z)</option>
        <option value="newest-za">En Yeniler (Z{">"}A)</option>
      </select>{" "}
      <div className="product-grid">
        {" "}
        {currentItems?.map((product) => (
          <ProductCard key={product.id} product={product} />
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

          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                className={`page-item ${
                  currentPage === pageNumber ? "active" : ""
                }`}
                onClick={() => dispatch(setCurrentPage(pageNumber))}
              >
                {pageNumber}
              </button>
            );
          })}

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
