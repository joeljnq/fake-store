// src/AppRouter.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import App from '../components/App';
import ProductInfo from '../components/ProductInfo';
import ShoppingCart from '../components/ShoppingCart';
import CheckOut from '../components/CheckOut';
import { cartProductSchema } from '../interfaces';

const AppRouter: React.FC = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const [cartProducts, setCartProducts] = useState<cartProductSchema[]>(JSON.parse(localStorage.getItem('cart') || '[]'))


  const handleSideBar = (status: boolean) => {
    setIsSideBarOpen(status);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              onHandleSideBar={handleSideBar}
              quantityProducts={cartProducts.length}
              isMainPage={true}
              cartProducts={cartProducts}
              onChangecartProducts={setCartProducts}
              openSideBar={isSideBarOpen}

            />
          }
        >
          <Route index element={<App cartProducts={cartProducts} onChangeCartProducts={setCartProducts} />} />
          <Route path="/product/:productID" element={<ProductInfo cartProducts={cartProducts} onChangeCartProducts={setCartProducts} />} />
          <Route path="/cart" element={<ShoppingCart products={cartProducts} onChangeCartProducts={setCartProducts} />} />
          <Route path="/checkout" element={<CheckOut  onChangeCartProducts={setCartProducts}/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;