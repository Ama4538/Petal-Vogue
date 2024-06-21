import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import { useAllProducts, useCartInventory, useWishlistInventory } from "../../components/app/Hook.jsx";
import SearchNav from "../../components/nav/SearchNav.jsx";
import Banner from "../../components/banner/Banner.jsx";
import Recommendation from '../../components/Recommendation/Recommendation.jsx';
import ScrollToTopOnMount from "../../components/app/ScrollToTopOnMount.jsx";
import { Link } from 'react-router-dom';
import EditScreen from '../../components/editscreen/EditScreen.jsx';
import EditMessageDisplay from "../../components/editscreen/EditMessageDisplay.jsx";

function Cart() {
    // Custom Hook
    const { allProducts } = useAllProducts();
    const { cartInventory, setCartInventory, cartAmount } = useCartInventory();
    const { wishlistInventory, setWishlistInventory } = useWishlistInventory()

    // State to manage the discount input
    const [discountInput, setDiscountInput] = useState("")
    const [discountMessage, setDiscountMessage] = useState("");

    // State used to manage message
    const [cartMessage, setCartMessage] = useState("")

    // State used to mange editing
    const [edit, setEdit] = useState(false)
    const [editProduct, setEditProduct] = useState(null);
    const [clickedFrom, setClickedFrom] = useState("cart");
    const [confirmMessage, setConfirmMessage] = useState("");
    const [messageVisible, setMessageVisible] = useState(false);

    // The carts values
    let cartSubtotal = getSubTotal();
    let cartTotal = getTotal();
    let cartDiscount = parseFloat(cartSubtotal - cartTotal).toFixed(2);

    // Possible discount code and their value
    const discountCode = {
        WOMEN20: 0.20,
        MEN10: 0.10,
        KIDS15: 0.15
    }

    // Check if edit screen should appear
    useEffect(() => {
        if (edit) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [edit])

    // Timer for confirm message
    useEffect(() => {
        if (confirmMessage.length > 0) {
            setMessageVisible(true)
            setTimeout(() => {
                setMessageVisible(false)
            }, 2500)
        }
    }, [confirmMessage])

    // Update the current product being edited and change the edit status
    function changeEditStatus(product, clickedFrom) {
        setClickedFrom(clickedFrom)
        setEditProduct(product)
        setEdit(true);
    }

    // Function to pass to children to change edit
    function changeEditScreen(data) {
        setEdit(data)
    }

    // Function to pass to children setCartMessage
    function changeCartMessage(data) {
        setCartMessage(data)
    }

    // Function to pass to children to change confirm Message
    function changeConfirmMessage(data) {
        setConfirmMessage(data)
    }

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
        setCartInventory(prevCart => prevCart.filter(prevProduct => prevProduct !== product));
        setCartMessage(`${product.name} has been removed from cart`)
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

    // Handled the onClick of the button to Move to wishlist
    function handleAddTowishlist(product) {
        if (!wishlistInventory.find(wishlistProduct =>
            wishlistProduct.name === product.name
            && wishlistProduct.size === product.size
            && wishlistProduct.color === product.color
        )) {
            let currentProduct = allProducts.find(products => products.name === product.name)
            setWishlistInventory(prev => [...prev, {
                // Only added the products required information
                timeadded: prev.length,
                name: currentProduct.name,
                price: currentProduct.price,
                section: currentProduct.section,
                image: currentProduct.image,
                description: currentProduct.description,
                rating: currentProduct.rating,
                review: currentProduct.review,
                size: product.size,
                color: product.color
            }]);

        }
        removeItem(product)
        setCartMessage(`${product.name} has been moved to wishlist`)
    }

    // Main checkout function
    function handleCheckOut() {
        // No offical check out
        setCartInventory([])
        setConfirmMessage("Thank you for your purchese")
    }

    // Main cart animation
    const cartAnimation = {
        exit: {
            opacity: 0,
            transition: {
                duration: 0.15,
            }
        }
    }

    return (
        <motion.section
            className="cart"
            variants={cartAnimation}
            exit="exit"
        >
            <ScrollToTopOnMount />
            <SearchNav />
            {edit ? <EditScreen
                setEditScreen={changeEditScreen}
                product={editProduct}
                clickedFrom={clickedFrom}
                message={changeCartMessage}
                changeConfirmMessage={changeConfirmMessage}
            /> : <></>}
            <EditMessageDisplay
                text={confirmMessage}
                dataVisible={messageVisible ? true : false}
            />

            <article className="cart__content-container">
                <div className='cart__banner-container'>
                    <Banner
                        title={"You're Almost There!"}
                        subtitle={"Complete Your Purchase and Enjoy Your New Look"}
                        section={"exit"}
                    ></Banner>
                </div>
                <h2 className="cart__title"> Shopping Cart
                    {cartMessage.length > 0
                        ? <span className={cartMessage.includes("remove") ? "cart-message__remove" : "cart-message__moved"}>{cartMessage}</span>
                        : <> </>}
                </h2>
                {cartInventory.length !== 0 ? <div className="cart__content">
                    <div className="cart__display">
                        {/* Printing out product information if cart is not empty*/}
                        {cartInventory.map(product => {
                            return (
                                <div className="cart-display__product" key={`${product.name}-${product.size}-${product.color}-Cart`}>
                                    <Link
                                        to={`/product/${product.name.toLowerCase().replaceAll(" ", "-").replaceAll("'", "")}`}
                                        className="cart-product__img-container"
                                    >
                                        <img
                                            src={`./productimage/${product.section}/${product.image}`}
                                            alt={product.image}
                                            className="cart-product__img" />
                                    </Link>
                                    <div className="cart-product__content-container">
                                        <div className="cart-product__information">
                                            <Link
                                                to={`/product/${product.name.toLowerCase().replaceAll(" ", "-").replaceAll("'", "")}`}
                                                className="cart-product__name"
                                            > {product.name}</Link>
                                            <p className="cart-product__additional"> Listed Price: ${product.price} </p>
                                            <p className="cart-product__additional"> Color: {product.color}</p>
                                            <p className="cart-product__additional"> Size: {product.size}</p>
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
                                            <button
                                                className="cart-product__edit"
                                                onClick={() => { changeEditStatus(product) }}
                                            > Edit </button>
                                            <button
                                                className="cart-product__edit"
                                                onClick={() => handleAddTowishlist(product)}
                                            > Move to wishlist </button>
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
                            {discountMessage.length > 0 && discountMessage === "error" ? <p className="cart-promo__error">Invalid or expired discount code</p> : <></>}
                            {discountMessage.length > 0 && discountMessage !== "error" ? <p className="cart-promo__success">{discountMessage}</p> : <></>}
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

                        <button 
                        className='cart-summary__checkout'
                        onClick={() => {handleCheckOut()}}
                        >Checkout</button>
                    </div>
                </div>
                    : <div className="cart__empty-container">
                        <h3 className='cart-empty__title'> Looks like you cart is empty!</h3>
                        <p className='cart-empty__text'> Continue shopping to discover more stylish options</p>
                    </div>
                }

                {/* Recommendation */}
                <div className="cart__recommend-container">
                    <h3 className="cart__title title__recommmend">Check Out These Recommendations</h3>
                    <Recommendation changeEditStatus={changeEditStatus} />
                </div>
            </article>
        </motion.section>
    )
}

export default Cart