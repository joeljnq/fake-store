import { cartProductSchema } from "../interfaces";
import "../assets/css/SideBar.css";
import garbage from "../assets/images/garbage.svg";
import leave from "../assets/images/right-arrow.svg";
import { useTotalPrice } from "../hooks/TotalPrice";
import { Link, useNavigate } from "react-router-dom";

interface SideBarProps {
  products: cartProductSchema[];
  onCloseSideBar: (status: boolean) => void;
  onChangeCartProducts: (product: cartProductSchema[]) => void;
}

const SideBar: React.FC<SideBarProps> = ({
  products,
  onCloseSideBar,
  onChangeCartProducts,
}) => {
  const { subtotal } = useTotalPrice({ products });
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div id="aside-wrapper" onClick={() => onCloseSideBar(false)}>
      <aside className="aside-cart" onClick={(e) => e.stopPropagation()}>
        <div id="header-sideBar">
          <h2>My cart</h2>
          <div className="circle">
            <img
              src={leave}
              alt="leave"
              className="leave"
              onClick={() => onCloseSideBar(false)}
            />
          </div>
        </div>
        <div className="cart-sideBar">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="product-wrapperSB">
                <div className="infoSB-wrapper">
                  <Link to={`/product/${product.id}`} id="link-sidebar">
                  <img
                    src={product.image}
                    alt="product"
                    className="productImage-sidebar"
                    onClick={() => {
                      handleNavigation(`/product/${product.id}`);
                      onCloseSideBar(false);
                    }}
                  />
                  </Link>
                

                  <div className="pricing-wrapper">
                    <p>{product.title}</p>
                    <p className="pricing">{product.price}€</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
                <div className="circle">
                  <img
                    onClick={() =>
                      onChangeCartProducts(
                        products.filter((pdc) => pdc.id !== product.id)
                      )
                    }
                    src={garbage}
                    alt="delete"
                    className="garbage"
                  />
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>

        <div className="total-wrapper">
          <p>Total: {Math.round(subtotal * 100) / 100}€</p>
          {products.length > 0 && (
            <Link to={'/cart'}
              className="custom-btn btn-2"
              onClick={() => {
                onCloseSideBar(false);
              }}
            >
              Go to cart
            </Link>
          )}
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
