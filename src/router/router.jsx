import { createBrowserRouter } from "react-router";
import App from "../App";
import SiteLayout from "../layouts/SiteLayout";
import About from "../pages/About";
import Collections from "../pages/Collections";
import Lookbook from "../pages/Lookbook";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import MyOrders from "../pages/MyOrders";
import ProductDetail from "../pages/ProductDetail";
import NewArrivals from "../pages/NewArrivals";
import NewArrivalDetail from "../pages/NewArrivalDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SiteLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "collections",
        element: <Collections />,
      },
      {
        path: "products/:id",
        element: <ProductDetail />,
      },
      {
        path: "new-arrivals",
        element: <NewArrivals />,
      },
      {
        path: "new-arrivals/:id",
        element: <NewArrivalDetail />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "lookbook",
        element: <Lookbook />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

export default router;