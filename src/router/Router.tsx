// src/AppRouter.tsx
import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../components/Home';
import NotFound from '../components/NotFound'
import { cartProductSchema } from '../interfaces';
import { UpdateLocalStorage } from '../hooks/UpdateLS'

import { lazy } from 'react';
const Checkout = lazy(()=>import('../components/CheckOut'))
const ProductInfo = lazy(()=> import('../components/ProductInfo'))
const ShoppingCart = lazy(()=> import('../components/ShoppingCart'))

const AppRouter: React.FC = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const [cartProducts, setCartProducts] = useState<cartProductSchema[]>(JSON.parse(localStorage.getItem('cart') || '[]'))
  UpdateLocalStorage({ cartProducts })


  const handleSideBar = (status: boolean) => {
    setIsSideBarOpen(status);
  };

  return (
    <Router>
        <Suspense fallback={null}>

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
          <Route index element={<Home cartProducts={cartProducts} onChangeCartProducts={setCartProducts} />} />
          <Route path="/product/:productID" element={<ProductInfo cartProducts={cartProducts} onChangeCartProducts={setCartProducts} />} />
          <Route path="/cart" element={<ShoppingCart products={cartProducts} onChangeCartProducts={setCartProducts} />} />
          <Route path="/checkout" element={<Checkout  onChangeCartProducts={setCartProducts}/>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>

    </Router>
  );
};

export default AppRouter;