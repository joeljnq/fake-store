import React from "react";
import '../assets/css/NavBar.css'
interface NavBarProps {
    categories: string[]
    onHandleSideBar: (status: boolean) => void
}

const NavBar: React.FC<NavBarProps> = ({ categories, onHandleSideBar }) => {
    console.log(categories);

    return (
        <nav>
            <ul className="categories">
                {categories.map((catergory) => {
                    return (
                        <li key={catergory}>{catergory}</li>
                    )
                })}
            </ul>
            <p>FakeStore</p>
            <img src='../../src/assets/images/shopping-cart.png' alt="shopping cart" onClick={() => onHandleSideBar(true)} className="shopping-cart" />
        </nav>
    )
}
export default NavBar;