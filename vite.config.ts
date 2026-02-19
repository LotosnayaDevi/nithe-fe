import { resolve } from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        catalog: resolve(__dirname, "pages/catalog.html"),
        product: resolve(__dirname, "pages/product.html"),
        about: resolve(__dirname, "pages/about.html"),
        contact: resolve(__dirname, "pages/contact.html"),
        cart: resolve(__dirname, "pages/cart.html"),
        checkout: resolve(__dirname, "pages/checkout.html"),
        search: resolve(__dirname, "pages/search.html"),
        privacy: resolve(__dirname, "pages/privacy.html"),
        terms: resolve(__dirname, "pages/terms.html"),
        refund: resolve(__dirname, "pages/refund.html"),
        shipping: resolve(__dirname, "pages/shipping.html"),
      },
    },
  },
});
