import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import PrivateLayout from "./layout/PrivateLayout";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PaymentPage from "./pages/PaymentPage";
import ProductPage from "./pages/ProductPage";
import RegisterPage from "./pages/RegisterPage";
import ShippingPage from "./pages/ShippingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "product/:id", element: <ProductPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "login", element: <LoginPage /> },
      {
        path: "",
        element: <PrivateLayout />,
        children: [
          { path: "shipping", element: <ShippingPage /> },
          { path: "payment", element: <PaymentPage /> },
        ],
      },
    ],
  },
]);

export default router;
