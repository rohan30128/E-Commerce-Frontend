import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthStyle from "../src/style/AuthStyle.css"
import CategoryProductStyle from "../src/style/CategoryProductStyle.css"
import HomePageStyle from "../src/style/HomePageStyle.css"
import ProductDetailsStyle from "../src/style/ProductDetailsStyle.css"
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/Search";
import "antd/dist/reset.css";
import { CartProvider } from "./context/Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  </BrowserRouter>
);

reportWebVitals();
