import React, { useEffect, useState } from "react";
import '../assets/css/NavBar.css'
interface NavBarProps {
    onHandleSideBar: (status: boolean) => void
    quantityProducts: number
}

const NavBar: React.FC<NavBarProps> = ({ onHandleSideBar, quantityProducts }) => {
    const [isTop, setIsTop] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsTop(scrollPosition < 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    const handleNameStore = () => {
        const url = window.location.origin;
        window.open(url, '_self');
    }
    return (
        <nav className={isTop ? 'initial-nav' : 'scroll-nav' }>
            <p id="nameStore" onClick={handleNameStore}>FakeStore</p>
            <div id="buttons-wrapper">
                <button id="cart-button" onClick={() => onHandleSideBar(true)}><img src='../../src/assets/images/shopping-cart.svg' alt="shopping cart" className="shopping-cart" /></button>
                <p>{quantityProducts}</p>
            </div>
        </nav>
    )
}
export default NavBar;