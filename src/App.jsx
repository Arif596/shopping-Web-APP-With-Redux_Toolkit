import { Route, Router, Routes } from "react-router-dom";
import ProductList from "./Component/ProductList";
import Cart from "./Component/Cart";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
