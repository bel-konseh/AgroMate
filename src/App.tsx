import { createBrowserRouter,createRoutesFromElements, Route,RouterProvider } from "react-router-dom"
import DashBoard from "./pages/DashBoard"
import Landing from "./pages/Landing"
import Layout from "./pages/Layout"
import AboutUs from "./pages/AboutUs"
import Contact from "./pages/Contact"
import ProductDetails from "./pages/Details"
import Checkout from "./pages/Checkout"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import DashBoardDeliveryPerson from "./pages/DashBoardDeliveryPerson"
import Shop from "./pages/Shop"

const App = ()=>{

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element= {<Layout />}>
        <Route path="" element = {<Landing />} />
        <Route path="dashboard/" element = {<DashBoard />} />
        <Route path="about/" element = {<AboutUs />} />
        <Route path="contact/" element = {<Contact />} />
        <Route path="details/" element = {<ProductDetails />} />
        <Route path="checkout/" element = {<Checkout />} />
        <Route path="login/" element = {<Login />} />
        <Route path="signup/" element = {<Signup />} />
        <Route path="shop/" element = {<Shop />} />
        <Route path="dashboard_delivery/" element = {<DashBoardDeliveryPerson/>} />

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