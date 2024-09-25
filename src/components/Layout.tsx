// src/components/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import SideBar from './SideBar';
import { cartProductSchema } from '../interfaces';

interface LayoutProps {
  onHandleSideBar: (status: boolean) => void;
  quantityProducts: number;
  isMainPage: boolean;
  cartProducts : cartProductSchema[]
  openSideBar: boolean,
  onChangecartProducts: (product: cartProductSchema[]) => void
}

const Layout: React.FC<LayoutProps> = ({ onHandleSideBar, quantityProducts, cartProducts, openSideBar, onChangecartProducts }) => {
  return (
    <div>
      <NavBar onHandleSideBar={onHandleSideBar} quantityProducts={quantityProducts} />
      <main>
        <Outlet />

      </main>
      {openSideBar && <SideBar products={cartProducts} onCloseSideBar={onHandleSideBar} onChangeCartProducts={onChangecartProducts} />}
    </div>
  );
};

export default Layout;