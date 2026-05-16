import { createBrowserRouter } from "react-router";
import App from "../App";
import SiteLayout from "../layouts/SiteLayout";
import About from "../pages/About";
import Collections from "../pages/Collections";
import Lookbook from "../pages/Lookbook";
import ProductDetail from "../pages/ProductDetail";
import NewArrivals from "../pages/NewArrivals";

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