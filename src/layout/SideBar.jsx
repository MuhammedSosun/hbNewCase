import React from "react";
import "../css/sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedBrand,
  setSelectedColor,
  setSortOrder,
} from "../redux/slice/ProductSlice";

function SideBar() {
  const dispatch = useDispatch();
  const { products, selectedBrand, selectedColor, sortBy, searchTerm } =
    useSelector((store) => store.products);

  const colorCounts = products.reduce((acc, product) => {
    acc[product.color] = (acc[product.color] || 0) + 1;
    return acc;
  }, {});

  const brandCounts = products.reduce((acc, product) => {
    acc[product.brand] = (acc[product.brand] || 0) + 1;
    return acc;
  }, {});
  //buranın amacı normalde biz arrayle sadece map dönebiliri ve bu yüzden burası objeyi arraye dönüştürüyor
  const colorOptions = Object.entries(colorCounts);
  const brandOptions = Object.entries(brandCounts);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <p className="sidebar-search-text">
          Aranan Kelime: <span>{searchTerm || "yok"}</span>
        </p>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Renk</h3>
        <ul className="filter-list">
          {colorOptions.map(([color, count]) => (
            <li
              key={color}
              className={`filter-item ${
                selectedColor === color ? "active" : ""
              }`}
              onClick={() => dispatch(setSelectedColor(color))}
            >
              {color} ({count})
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Sıralama</h3>
        <ul className="filter-list">
          <li
            className={`filter-item ${sortBy === "lowestPrice" ? "active" : ""}`}
            onClick={() => dispatch(setSortOrder("lowestPrice"))}
          >
            En Düşük Fiyat
          </li>
          <li
            className={`filter-item ${sortBy === "highestPrice" ? "active" : ""}`}
            onClick={() => dispatch(setSortOrder("highestPrice"))}
          >
            En Yüksek Fiyat
          </li>
          <li
            className={`filter-item ${sortBy === "newest-az" ? "active" : ""}`}
            onClick={() => dispatch(setSortOrder("newest-az"))}
          >
            En Yeniler (A-Z)
          </li>
          <li
            className={`filter-item ${sortBy === "newest-za" ? "active" : ""}`}
            onClick={() => dispatch(setSortOrder("newest-za"))}
          >
            En Yeniler (Z-A)
          </li>
        </ul>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Marka</h3>
        <ul className="filter-list">
          {brandOptions.map(([brand, count]) => (
            <li
              key={brand}
              className={`filter-item ${selectedBrand === brand ? "active" : ""}`}
              onClick={() => dispatch(setSelectedBrand(brand))}
            >
              {brand} ({count})
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
