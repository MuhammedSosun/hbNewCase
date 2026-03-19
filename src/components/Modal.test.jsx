import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";
import { describe, expect, it } from "vitest";

describe("Modal Bileşeni Testleri", () => {
  it("isOpen true olduğunda başlık ve açıklama görünmeli", () => {
    render(
      <Modal
        isOpen={true}
        title="Silme Onayı"
        description="Bu ürünü silmek istiyor musun?"
      />,
    );
    expect(screen.getByText("Silme Onayı")).toBeInTheDocument();
    expect(
      screen.getByText("Bu ürünü silmek istiyor musun?"),
    ).toBeInTheDocument();
  });

  it("isOpen false olduğunda model ekranda olmamamlı", () => {
    render(<Modal isOpen={false} title="Başlık" />);
    const title = screen.queryByText("Başlık");
    expect(title).not.toBeInTheDocument();
  });
  it("EVET butonuna tıklandığında onConfirm çalışmalı", () => {
    const confirMock = vi.fn();
    render(<Modal isOpen={true} title="Test" onConfirm={confirMock} />);
    const confirmBtn = screen.getByText("EVET");
    fireEvent.click(confirmBtn);
    expect(confirMock).toHaveBeenCalledTimes(1);
  });
  it("HAYIR butonuna tıklandığında onCancel çalışmalı", () => {
    const cancelMock = vi.fn();
    render(<Modal isOpen={true} title="Test" onCancel={cancelMock} />);
    const cancelBtn = screen.getByText("HAYIR");
    fireEvent.click(cancelBtn);
    expect(cancelMock).toHaveBeenCalledTimes(1);
  });
  it("Overlay çalışmalı modül dışında bir yere tıklayınca kapanmalı", () => {
    const cancelMock = vi.fn();
    render(<Modal isOpen={true} title="Test" onCancel={cancelMock}/>);
    const overlay = screen.getByTestId("modal-overlay");
    fireEvent.click(overlay);
    expect(cancelMock).toHaveBeenCalledTimes(1);
  })
});

