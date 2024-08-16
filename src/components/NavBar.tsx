import React from "react";
import '../assets/css/NavBar.css'
interface NavBarProps {
    categories: string[]
    onHandleSideBar: (status: boolean) => void
    quantityProducts: number
}

const NavBar: React.FC<NavBarProps> = ({ categories, onHandleSideBar,quantityProducts }) => {
    return (
        <nav>
            <ul className="categories">
                {categories.map((catergory) => {
                    return (
                        <li key={catergory}>{catergory}</li>
                    )
                })}
            </ul>
            <p id="nameStore">FakeStore</p>
            <div id="cart-wrapper">
            <button id="cart-button" onClick={() => onHandleSideBar(true)}><img src='../../src/assets/images/shopping-cart.png' alt="shopping cart"  className="shopping-cart" /></button>
             <p>{quantityProducts}</p>
            </div>
        </nav>
    )
}
export default NavBar;