import { Route, Routes } from "react-router-dom";
import About from "../About/About";
import Admin from "../Admin/Admin";
import Details from "../Details/Details";
import Login from "../Login/Login";
import Order from "../Order/Order";
import Products from "../Products/Products";
import Register from "../Register/Register";
import Register2 from "../Register2/Register2";
import "./Routing.css";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/details" element={<Details />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/register2" element={<Register2/>}></Route>
        <Route path="/order" element={<Order />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
    </div>
  );
}

export default Routing;
