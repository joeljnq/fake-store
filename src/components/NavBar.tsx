import React, { useEffect, useState } from "react";
import '../assets/css/NavBar.css'
import cartIcon from "../assets/images/shopping-cart.svg";
import { useNavigate } from "react-router-dom";
interface NavBarProps {
    onHandleSideBar: (status: boolean) => void
    quantityProducts: number
}

const NavBar: React.FC<NavBarProps> = ({ onHandleSideBar, quantityProducts,  }) => {
    const [isTop, setIsTop] = useState<boolean>(true);
    const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsTop(scrollPosition < 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    const handleNameStore = () => {

        if(window.location.pathname === '/'){
            window.location.href = '/';
          return;
            
        }
        navigate('/',)

    }
    return (
        <nav className={isTop  ? 'initial-nav' : 'scroll-nav' }>
            <p id="nameStore" onClick={()=> handleNameStore()}>FakeStore</p>
            <div id="buttons-wrapper">
                <button id="cart-button" onClick={() => onHandleSideBar(true)}><img src={cartIcon} alt="shopping cart" className="shopping-cart" /></button>
                <p>{quantityProducts}</p>
            </div>
        </nav>
    )
}
export default NavBar;