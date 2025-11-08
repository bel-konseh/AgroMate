import { createBrowserRouter,createRoutesFromElements, Route,RouterProvider } from "react-router-dom"
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

const App = ()=>{

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element= {<Layout />}>
        <Route path="" element = {<Landing />} />
        <Route path="dashboard/" element = {<DashBoard />} />
        <Route path="about/" element = {<AboutUs />} />
        <Route path="contact/" element = {<Contact />} />
        <Route path="details/" element = {<Details />} />
        <Route path="checkout/" element = {<Checkout />} />
        <Route path="login/" element = {<Login />} />
        <Route path="signup/" element = {<Signup />} />
        <Route path="shop/" element = {<Shop />} />
        
        {/* routes for the dashboard */}
        <Route path="dashboard/farmer" element={<FarmerDashboardPage />} />
        <Route path="dashboard/buyer" element={<BuyerDashboardPage />} />
        <Route path="dashboard/delivery" element={<DeliveryDashboardPage />} />
        <Route path="dashboard/orders" element={<OrdersPage />} />

        {/* routes for products */}
        <Route path="addproducts" element={<AddProducts />} />
        <Route path="addproducts/:id" element={<AddProducts />} />

      </Route>
    )
  )
  return(
    <>
      <RouterProvider  router={router}/>
    </>
  )
}

export  default App