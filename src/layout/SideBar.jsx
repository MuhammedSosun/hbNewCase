import React from "react";
import "../css/sidebar.css";

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <p className="sidebar-search-text">
          Aranan Kelime: <span>iPhone 11</span>
        </p>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Renk</h3>
        <ul className="filter-list">
          <li className="filter-item active">Siyah (8)</li>
          <li className="filter-item">Sarı (7)</li>
          <li className="filter-item">Kırmızı (7)</li>
          <li className="filter-item">Beyaz (7)</li>
        </ul>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Sıralama</h3>
        <ul className="filter-list">
          <li className="filter-item active">En Düşük Fiyat</li>
          <li className="filter-item">En Yüksek Fiyat</li>
          <li className="filter-item">En Yeniler (A-Z)</li>
        </ul>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Marka</h3>
        <ul className="filter-list">
          <li className="filter-item active">Apple (9)</li>
          <li className="filter-item">Samsung (7)</li>
          <li className="filter-item">Huawei (7)</li>
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
