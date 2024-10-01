import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import '../assets/css/NavBar.css'
import cartIcon from "../assets/images/shopping-cart.svg";
import { Link} from "react-router-dom";
interface NavBarProps {
    onHandleSideBar: (status: boolean) => void
    quantityProducts: number
}

const NavBar: React.FC<NavBarProps> = ({ onHandleSideBar, quantityProducts,  }) => {
    const [isTop, setIsTop] = useState<boolean>(true);
    const location = useLocation();
    
  useEffect(() => {
    if (location.pathname !== '/') {
      setIsTop(false);
      return    
      
    }
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
   
      setIsTop(scrollPosition < 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);
    const handleNameStore = () => {

        if(window.location.pathname === '/'){
          window.scrollTo({top:0 , behavior: 'smooth' });
          
        }
    }

    return (
        <nav className={isTop  ? 'initial-nav' : 'scroll-nav' }>
            <Link  to={'/'} onClick={()=>handleNameStore()} id="nameStore">FakeStore</Link>
            <div id="buttons-wrapper">
                <button id="cart-button" onClick={() => onHandleSideBar(true)}><img src={cartIcon} alt="shopping cart" className="shopping-cart" /></button>
                <p>{quantityProducts}</p>
            </div>
        </nav>
    )
}
export default NavBar;