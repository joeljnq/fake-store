import React from "react";
import '../assets/css/NavBar.css'
import Searcher from "./Searcher";
import { productSchema } from "../interfaces";
interface NavBarProps {
    categories: string[]
    onHandleSideBar: (status: boolean) => void
    quantityProducts: number
    products: productSchema[]
}

const NavBar: React.FC<NavBarProps> = ({ categories, onHandleSideBar,quantityProducts, products }) => {
    const handleNameStore = () =>{
        window.location.reload()
    }
    return (
        <nav>
            <ul className="categories">
                {categories.map((catergory) => {
                    return (
                        <li key={catergory}>{catergory}</li>
                    )
                })}
            </ul>
            <p id="nameStore" onClick={handleNameStore}>FakeStore</p>
            <Searcher products={products} />
            <div id="cart-wrapper">
            <button id="cart-button" onClick={() => onHandleSideBar(true)}><img src='../../src/assets/images/shopping-cart.png' alt="shopping cart"  className="shopping-cart" /></button>
             <p>{quantityProducts}</p>
            </div>
        </nav>
    )
}
export default NavBar;