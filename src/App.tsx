import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { ProductProvider } from "./context/ProductContext"
import DashBoard from "./pages/DashBoard"
import Landing from "./pages/Landing"
import Layout from "./pages/Layout"
import AboutUs from "./pages/AboutUs"
import Contact from "./pages/Contact"
import Details from "./pages/Details"
import Checkout from "./pages/Checkout"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Shop from "./pages/Shop"
import FarmerDashboardPage from "./components/farmer/FarmerDashboard"
import BuyerDashboardPage from "./components/buyer/BuyerDashboard"
import DeliveryDashboardPage from "./components/delivery/DeliveryDashboard"
import OrdersPage from "./pages/dashboard/OrdersPage"
import AddProducts from "./components/farmer/AddProducts"
import BuyerOrdersPage from "./components/buyer/BuyerOrders"
import ProductListPage from "./components/farmer/ProductList"
import FarmerOrdersPage from "./components/farmer/FarmerOrders"
import DeliveryListPage from "./components/delivery/DeliveryList"
import ViewProductPage from "./components/farmer/ViewProductPage"
import EditProductPage from "./components/farmer/EditProductPage"

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Landing />} />
        <Route path="dashboard/" element={<DashBoard />} />
        <Route path="about/" element={<AboutUs />} />
        <Route path="contact/" element={<Contact />} />
        <Route path="details/" element={<Details />} />
        <Route path="checkout/" element={<Checkout />} />
        <Route path="login/" element={<Login />} />
        <Route path="signup/" element={<Signup />} />
        <Route path="shop/" element={<Shop />} />
        
        {/* routes for the dashboard */}
        <Route path="dashboard/orders" element={<OrdersPage />} />

        {/* Farmer Routes */}
        <Route path="dashboard/farmer" element={<FarmerDashboardPage />} />
        <Route path="dashboard/farmer/orders" element={<FarmerOrdersPage />} />
        <Route path="dashboard/farmer/products" element={<ProductListPage />} />
        <Route path="dashboard/farmer/products/:id" element={<ViewProductPage />} />
        <Route path="dashboard/farmer/products/:id/edit" element={<EditProductPage />} />

        {/* Buyer Routes */}
        <Route path="dashboard/buyer" element={<BuyerDashboardPage />} />
        <Route path="dashboard/buyer/orders" element={<BuyerOrdersPage />} />

        {/* Delivery Routes */}
        <Route path="dashboard/delivery" element={<DeliveryDashboardPage />} />
        <Route path="dashboard/delivery/deliveries" element={<DeliveryListPage />} />

        {/* Product Routes */}
        <Route path="dashboard/addproduct" element={<AddProducts />} />
        <Route path="dashboard/addproduct/:id" element={<AddProducts />} />
      </Route>
    )
  )
  
  return (

    <ProductProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ProductProvider>
  )
}

export default App