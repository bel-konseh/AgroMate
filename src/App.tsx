import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { ProductProvider } from "./context/ProductContext"
import ProtectedRoute from "./components/ProtectedRoute"
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
import Settings from "./pages/Setting"
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
        {/* Public Routes */}
        <Route path="" element={<Landing />} />
        <Route path="about/" element={<AboutUs />} />
        <Route path="contact/" element={<Contact />} />
        <Route path="details/" element={<Details />} />
        <Route path="shop/" element={<Shop />} />
        <Route path="login/" element={<Login />} />
        <Route path="signup/" element={<Signup />} />
        
        {/* Protected Routes - Generic Dashboard */}
        <Route path="dashboard/" element={
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        } />
        <Route path="dashboard/orders" element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        } />
        <Route path="checkout/" element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } />

        {/* Farmer Protected Routes */}
        <Route path="dashboard/farmer" element={
          <ProtectedRoute allowedUserTypes={['farmer']}>
            <FarmerDashboardPage />
          </ProtectedRoute>
        } />
        <Route path="dashboard/farmer/orders" element={
          <ProtectedRoute allowedUserTypes={['farmer']}>
            <FarmerOrdersPage />
          </ProtectedRoute>
        } />
        <Route path="dashboard/farmer/products" element={
          <ProtectedRoute allowedUserTypes={['farmer']}>
            <ProductListPage />
          </ProtectedRoute>
        } />
        <Route path="dashboard/farmer/products/:id" element={
          <ProtectedRoute allowedUserTypes={['farmer']}>
            <ViewProductPage />
          </ProtectedRoute>
        } />
        <Route path="dashboard/farmer/products/:id/edit" element={
          <ProtectedRoute allowedUserTypes={['farmer']}>
            <EditProductPage />
          </ProtectedRoute>
        } />
        <Route path="dashboard/addproduct" element={
          <ProtectedRoute allowedUserTypes={['farmer']}>
            <AddProducts />
          </ProtectedRoute>
        } />
        <Route path="dashboard/addproduct/:id" element={
          <ProtectedRoute allowedUserTypes={['farmer']}>
            <AddProducts />
          </ProtectedRoute>
        } />

        {/* Buyer Protected Routes */}
        <Route path="dashboard/buyer" element={
          <ProtectedRoute allowedUserTypes={['buyer']}>
            <BuyerDashboardPage />
          </ProtectedRoute>
        } />
        <Route path="dashboard/buyer/orders" element={
          <ProtectedRoute allowedUserTypes={['buyer']}>
            <BuyerOrdersPage />
          </ProtectedRoute>
        } />

        {/* Delivery Protected Routes */}
        <Route path="dashboard/delivery" element={
          <ProtectedRoute allowedUserTypes={['delivery']}>
            <DeliveryDashboardPage />
          </ProtectedRoute>
        } />
        <Route path="dashboard/delivery/deliveries" element={
          <ProtectedRoute allowedUserTypes={['delivery']}>
            <DeliveryListPage />
          </ProtectedRoute>
        } />


       
        {/* Settings Routes - Add for each user type */}
      <Route path="dashboard/farmer/settings" element={
        <ProtectedRoute allowedUserTypes={['farmer']}>
          <Settings />
        </ProtectedRoute>
      } />
      <Route path="dashboard/buyer/settings" element={
        <ProtectedRoute allowedUserTypes={['buyer']}>
          <Settings />
        </ProtectedRoute>
      } />
      <Route path="dashboard/delivery/settings" element={
        <ProtectedRoute allowedUserTypes={['delivery']}>
          <Settings />
        </ProtectedRoute>
      } />

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