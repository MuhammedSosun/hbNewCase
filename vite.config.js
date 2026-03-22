import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, //expect, describe gibi komutları import etmeden kullanmayı sağlıuor
    environment: "jsdom", // hayali bir tarayıcıda çalışmayı sağlar yani bir dom'da
    setupFiles: "./src/setupTests.js", // yüklenecek ayarlar dosyası
  },
});
