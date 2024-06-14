import { motion } from 'framer-motion'
import SearchNav from "../../components/nav/SearchNav.jsx";
import Banner from "../../components/banner/Banner.jsx";
import Recommendation from '../../components/Recommendation/Recommendation.jsx';


function Cart({ setCartInventory, cartInventory, allProducts, setSearched, setAllProducts }) {
    // Main cart animation
    const cartAnimation = {
        exit: {
            opacity: 0,
            transition: {
                duration: 0.15,
            }
        }
    }

    // The carts subTotal
    let cartSubtotal = getTotal();

    // Handle adding 1 to the quantity
    function addQuantity(product) {
        setCartInventory(prevCart => prevCart.map(prevProduct =>
            prevProduct === product
                ? { ...prevProduct, quantity: prevProduct.quantity + 1 }
                : prevProduct
        ))
        cartSubtotal = getTotal();
    }

    // Handle removing 1 to the quantity
    function subTrackQuantity(product) {
        setCartInventory(prevCart => prevCart.map(prevProduct =>
            prevProduct === product
                ? { ...prevProduct, quantity: prevProduct.quantity - 1 }
                : prevProduct
        ))
        cartSubtotal = getTotal();
    }

    // Handle removing the item from cart
    function removeItem(product) {
        // Reenable the product
        setAllProducts(prevProducts => prevProducts.map(prevProduct =>
            prevProduct.name === product.name
                ? { ...prevProduct, status: "enabled" }
                : prevProduct
        ))
        setCartInventory(prevCart => prevCart.filter(prevProduct => prevProduct !== product));
        cartSubtotal = getTotal();
    }

    // Get total price
    function getTotal() {
        let currentPrice = 0.00;
        cartInventory.forEach(product => {
            currentPrice += parseFloat((product.price * product.quantity).toFixed(2))
        });
        return currentPrice.toFixed(2);
    }

    // Handled the onClick of the button to add to cart
    function handleAddToCart(product) {
        // Adding the data to cart
        setCartInventory(prev => [...prev, {
            // Only added the products required information
            name: product.name,
            price: product.price,
            section: product.section,
            image: product.image,
            // Give it a quantity value
            quantity: 1,
        }]);
        // Find the corresponding product and set its button to disabled
        setAllProducts(prevProducts => prevProducts.map(prevProduct => (
            prevProduct.name === product.name ? { ...prevProduct, status: 'disabled' } : prevProduct
        )));
    }

    return (
        <motion.section
            className="cart"
            variants={cartAnimation}
            exit="exit"
        >
            <SearchNav
                products={allProducts}
                setSearched={setSearched}
                cartAmount={cartInventory.length}
            />
            <article className="cart__content-container">
                <div className='cart__banner-container'>
                    <Banner
                        title={"You're Almost There!"}
                        subtitle={"Complete Your Purchase and Enjoy Your New Look"}
                        section={"exit"}
                    ></Banner>
                </div>
                <h2 className="cart__title"> Shopping Cart</h2>
                {cartInventory.length !== 0 ? <div className="cart__content">
                    <div className="cart__display">
                        {/* Printing out product information */}
                        {cartInventory.map(product => {
                            return (
                                <div className="cart-display__product" key={`${product.name}Cart`}>
                                    <div className="cart-product__img-container">
                                        <img
                                            src={`./productimage/${product.section}/${product.image}`}
                                            alt={product.image}
                                            className="cart-product__img" />
                                    </div>
                                    <div className="cart-product__content-container">
                                        <div className="cart-product__information">
                                            <p className="cart-product__name"> {product.name}</p>
                                            <p className="cart-product__additional"> Price: ${product.price}</p>
                                            <p className="cart-product__additional"> Color: Red</p>
                                            <p className="cart-product__additional"> Size: Medium</p>
                                        </div>
                                        <p className="cart-product__price">Subtotal: ${parseFloat((product.price * product.quantity).toFixed(2))}</p>
                                        <div className="cart-product__lower-content">
                                            <div className="cart-product__quantity-container">
                                                <button
                                                    className="cart-quantity__button"
                                                    onClick={() => { product.quantity > 1 ? subTrackQuantity(product) : null }}
                                                    data-status={product.quantity > 1 ? "enabled" : "disabled"}
                                                > - </button>
                                                <p className="cart-quantity__display"> {product.quantity} </p>
                                                <button
                                                    className="cart-quantity__button"
                                                    onClick={() => addQuantity(product)}
                                                > + </button>
                                            </div>
                                            <button
                                                className="cart-product__edit"
                                                onClick={() => removeItem(product)}
                                            > Remove </button>
                                            <button className="cart-product__edit"> Edit </button>
                                            <button className="cart-product__edit"> Move to wishlist </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {/* Summary of cart inventory */}
                    <div className="cart__summary">
                        <div className="cart-summary__title-container">
                            <p>Order Details</p>
                            <p>{cartInventory.length} Item(s)</p>
                        </div>

                        <div className="cart-summary__information-container">
                            <p>Item(s) subtotal</p>
                            <p>${cartSubtotal}</p>
                            <p>Shipping</p>
                            <p>TBD</p>
                            <p>Sales Tax</p>
                            <p>TBD</p>
                        </div>

                        <div className="cart-summary__total-container">
                            <p>Order Total</p>
                            <p>${cartSubtotal}</p>
                        </div>

                        <div className="cart-summary__promo-container">
                            <p>Have a discount code?</p>
                            <input className="cart-promo__input" type="text" />
                        </div>

                        <button className='cart-summary__checkout'>Checkout</button>
                    </div>
                </div>
                    : <div className="cart__empty-container">
                        <h3 className='cart-empty__title'> Looks like you cart is empty!</h3>
                        <p className='cart-empty__text'> Continue shopping to discover more stylish options</p>
                    </div>
                }

                <div className="cart__recommend-container">
                    <h3 className="cart__title">Recommended For You</h3>
                    <Recommendation products={allProducts} handleAddToCart = {handleAddToCart}/>
                </div>
            </article>
        </motion.section>
    )
}

export default Cart