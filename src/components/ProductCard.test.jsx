import { render,screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
const mockNavigate = vi.fn();
vi.mock("react-router-dom",() => ({
    useNavigate: () => mockNavigate,
}));
//ürün sepete ekleniyor mu , ürün disabled oluyor mu ürün navigate düzgün çalışıyor mu
describe("ProductCard bileşeni test etme işlemi",() => {
    const mockProduct = {
    id: 122,
    name: "nike airforce special",
    brand: "nike",
    color: "airforce",
    price: 90.85,
    originalPrice: 124.0,
    discount: 12,
    imageUrl: "ayakkabi.jpg",
    
    }

    beforeEach(() => {
        vi.clearAllMocks();
    })
    it("ürün bilgilerini düzgün bir şekilde ekrana basmalı(name,brand,color)", () => {
        
        render(
            <ProductCard product={mockProduct} onAddToCart={vi.fn()} isInCart={false}/>
        );
        expect(screen.getByText("nike airforce special")).toBeInTheDocument();
        expect(screen.getByText("nike")).toBeInTheDocument();
        expect(screen.getByText("airforce")).toBeInTheDocument();
        expect(screen.getByText("90.85 TL")).toBeInTheDocument();

        const img = screen.getByRole("img", {name:"nike airforce special"});
        expect(img).toHaveAttribute("src","ayakkabi.jpg")
    })
    it("ürünün indirimi varsa eski fiyatı ve indirim oranını göstermeli", () => {
        render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} isInCart={false}/>)

        expect(screen.getByText("124 TL")).toBeInTheDocument();
        expect(screen.getByText("%12")).toBeInTheDocument();
    })



})

