const ShoppingCart = () => {
    const cart = localStorage.getItem('cartProducts')
    console.log(cart);
    
 return (
    <div>
        <h1>Shopping Cart</h1>
    </div>
 )
}

export default ShoppingCart