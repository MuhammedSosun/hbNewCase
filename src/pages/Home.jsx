import React from "react";
import SideBar from "../layout/SideBar";
import ProductList from "../components/ProductList";
import "../css/home.css";

function Home() {
  return (
    <main className="main-content">
      <div className="container">
        <div className="layout-grid">
          <aside className="sidebar-area">
            <SideBar />
          </aside>
          <section className="products-area">
            <ProductList />
          </section>
        </div>
      </div>
    </main>
  );
}

export default Home;
