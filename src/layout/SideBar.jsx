import React from "react";
import "../css/sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedBrand,
  setSelectedColor,
  setSortOrder,
} from "../redux/slice/ProductSlice";
import FilterGroup from "../components/FilterGroup";

function SideBar() {
  const dispatch = useDispatch();

  const { products, selectedBrand, selectedColor, sortBy, searchTerm } =
    useSelector((store) => store.products);

  const colorCounts = (products || []).reduce((acc, product) => {
    if (product.color) {
      acc[product.color] = (acc[product.color] || 0) + 1;
    }
    return acc;
  }, {});

  const brandCounts = (products || []).reduce((acc, product) => {
    if (product.brand) {
      acc[product.brand] = (acc[product.brand] || 0) + 1;
    }
    return acc;
  }, {});

  const colorOptions = Object.entries(colorCounts).map(([name, count]) => ({
    name,
    count,
  }));

  const brandOptions = Object.entries(brandCounts).map(([name, count]) => ({
    name,
    count,
  }));

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <p className="sidebar-search-text">
          Aranan Kelime: <span>{searchTerm || "yok"}</span>
        </p>
      </div>

      <FilterGroup
        title="Renk"
        items={colorOptions}
        limit={5}
        selectedValue={selectedColor}
        onSelect={(color) => dispatch(setSelectedColor(color))}
      />

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
            En Yeniye Göre
          </li>
          <li
            className={`filter-item ${sortBy === "newest-za" ? "active" : ""}`}
            onClick={() => dispatch(setSortOrder("newest-za"))}
          >
            En Eskiye Göre
          </li>
        </ul>
      </div>

      <FilterGroup
        title="Marka"
        items={brandOptions}
        limit={5}
        selectedValue={selectedBrand}
        onSelect={(brand) => dispatch(setSelectedBrand(brand))}
      />
    </aside>
  );
}

export default SideBar;
