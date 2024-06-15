import { useState } from 'react';
import { motion } from 'framer-motion'
import { useAllProducts, useCartInventory } from "../../components/app/Hook.jsx";
import SearchNav from "../../components/nav/SearchNav.jsx";
import Banner from "../../components/banner/Banner.jsx";
import Recommendation from '../../components/Recommendation/Recommendation.jsx';


function Cart() {
    // Custom Hook
    const { setAllProducts } = useAllProducts();
    const { cartInventory, setCartInventory, cartAmount } = useCartInventory();

    // State to manage the discount input
    const [discountInput, setDiscountInput] = useState("")
    const [discountMessage, setDiscountMessage] = useState("");

    // Main cart animation
    const cartAnimation = {
        exit: {
            opacity: 0,
            transition: {
                duration: 0.15,
            }
        }
    }

    // Possible discount code and their value
    const discountCode = {
        WOMEN20: 0.20,
        MEN10: 0.10,
        KIDS15: 0.15
    }

    // The carts values
    let cartSubtotal = getSubTotal();
    let cartTotal = getTotal();
    let cartDiscount = parseFloat(cartSubtotal - cartTotal).toFixed(2);

    // Get subtotal price
    function getSubTotal() {
        let currentPrice = 0.00;
        cartInventory.forEach(product => {
            currentPrice += parseFloat((product.price * product.quantity).toFixed(2))
        });
        return currentPrice.toFixed(2);
    }

    // Get total price
    function getTotal() {
        let currentPrice = 0.00;
        cartInventory.forEach(product => {
            currentPrice += parseFloat(((product.price + (product.discountAmount * -1)) * product.quantity).toFixed(2))
        });
        return currentPrice.toFixed(2);
    }

    // Handle adding 1 to the quantity
    function adjustedQuantity(product, amount) {
        setCartInventory(prevCart => prevCart.map(prevProduct =>
            prevProduct === product
                ? { ...prevProduct, quantity: prevProduct.quantity + amount }
                : prevProduct
        ))
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
    }

    // Handled the onClick of the button to add to cart
    function handleAddToCart(product) {
        // Checking if discount exist in the system
        let discounted = new Set();
        // Finding only unqiue discounts
        cartInventory.forEach(product => product.discountAmount > 0 ? discounted.add(JSON.stringify({ section: product.section, discountPercent: product.discountPercent })) : null)

        let discountArray = [];
        let discountPercent = 0;

        // Finding if discount matches the product section
        if (discounted.size !== 0) {
            discounted.forEach(element => {
                discountArray = discountArray.concat(JSON.parse(element))
            })

            // Setting the discount values
            let isDiscounted = discountArray.find(element => element.section === product.section);
            if (isDiscounted) {
                discountPercent = isDiscounted.discountPercent
            }
        }

        // Adding the data to cart
        setCartInventory(prev => [...prev, {
            // Only added the products required information
            name: product.name,
            price: product.price,
            section: product.section,
            image: product.image,
            // Give it a quantity value
            quantity: 1,
            // discount
            discountAmount: product.price * discountPercent,
            discountPercent: discountPercent
        }]);

        // Find the corresponding product and set its button to disabled
        setAllProducts(prevProducts => prevProducts.map(prevProduct => (
            prevProduct.name === product.name ? { ...prevProduct, status: 'disabled' } : prevProduct
        )));
    }

    // Handled the discount
    function handleDiscount(event) {
        if (discountCode[discountInput.toUpperCase()] !== undefined) {
            let upperCasedInput = discountInput.toUpperCase();
            // Find the discounted section 
            let currentDiscountSection;
            switch (upperCasedInput.charAt(0)) {
                case 'W':
                    currentDiscountSection = "women";
                    break;
                case 'M':
                    currentDiscountSection = "men";
                    break;
                default:
                    currentDiscountSection = "kids";
                    break;
            }

            // Apply the discount to each product with the same section
            setCartInventory(cartInventory.map(product =>
                product.section === currentDiscountSection
                    ? {
                        ...product,
                        discountAmount: (discountCode[upperCasedInput] * product.price),
                        discountPercent: discountCode[upperCasedInput],
                    }
                    : product
            ));

            // Update the discount message
            setDiscountMessage(`Discount applied: ${discountCode[upperCasedInput] * 100}% off`);
        } else {
            setDiscountMessage("error");
        }

        // Reset input
        setDiscountInput("");
        event.target.blur()
    }

    return (
        <motion.section
            className="cart"
            variants={cartAnimation}
            exit="exit"
        >
            <SearchNav />
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
                        {/* Printing out product information if cart is not empty*/}
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
                                            <p className="cart-product__additional"> Listed Price: ${product.price} </p>
                                            <p className="cart-product__additional"> Color: Red</p>
                                            <p className="cart-product__additional"> Size: Medium</p>
                                        </div>
                                        <div className="cart-product__information">
                                            <p className="cart-product__price">Subtotal:
                                                <span className={product.discountAmount > 0 ? "cart-product__discount" : ""}>${parseFloat((product.price * product.quantity).toFixed(2))}</span>
                                            </p>
                                            {product.discountAmount > 0 ? <p className="cart-product__price">
                                                <span className="cart-information__saved">
                                                    -{product.discountPercent * 100}%
                                                </span>
                                                ${((product.price + (product.discountAmount * -1)) * product.quantity).toFixed(2)}</p> : <></>}
                                        </div>
                                        <div className="cart-product__lower-content">
                                            <div className="cart-product__quantity-container">
                                                <button
                                                    className="cart-quantity__button"
                                                    onClick={() => { product.quantity > 1 ? adjustedQuantity(product, -1) : null }}
                                                    data-status={product.quantity > 1 ? "enabled" : "disabled"}
                                                > - </button>
                                                <p className="cart-quantity__display"> {product.quantity} </p>
                                                <button
                                                    className="cart-quantity__button"
                                                    onClick={() => adjustedQuantity(product, 1)}
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
                            <p>{cartAmount} Item(s)</p>
                        </div>

                        <div
                            className="cart-summary__information-container"
                            style={{ gridTemplateRows: cartDiscount > 0 ? "repeat(4, 1fr)" : "repeat(3, 1fr)" }}
                        >
                            <p>Item(s) subtotal</p>
                            <p>${cartSubtotal}</p>
                            {cartDiscount > 0 ? <p className="cart-information__saved">Total Saved</p> : null}
                            {cartDiscount > 0 ? <p className="cart-information__saved">-${cartDiscount}</p> : null}
                            <p>Shipping</p>
                            <p>TBD</p>
                            <p>Sales Tax</p>
                            <p>TBD</p>
                        </div>

                        <div className="cart-summary__total-container">
                            <p>Order Total</p>
                            <p>${cartTotal}</p>
                        </div>

                        <div className="cart-summary__promo-container">
                            <p>Have a discount code?</p>
                            {discountMessage.length !== 0 && discountMessage === "error" ? <p className="cart-promo__error">Invalid or expired discount code</p> : <></>}
                            {discountMessage.length !== 0 && discountMessage !== "error" ? <p className="cart-promo__success">{discountMessage}</p> : <></>}
                            <input
                                className="cart-promo__input"
                                type="text"
                                value={discountInput}
                                onChange={(event) => { setDiscountInput(event.target.value) }}
                                onKeyDown={(event) => {
                                    event.key === 'Enter' ? handleDiscount(event) : null;
                                }}
                            />
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
                    <h3 className="cart__title">Check Out These Recommendations</h3>
                    <Recommendation handleAddToCart={handleAddToCart} />
                </div>
            </article>
        </motion.section>
    )
}

export default Cart