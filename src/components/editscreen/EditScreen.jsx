import { useEffect, useRef, useState } from "react";
import { useAllProducts, useCartInventory, useWishlistInventory } from "../../components/app/Hook.jsx";
import { motion } from "framer-motion"

function EditScreen({ setEditScreen, product, clickedFrom, message = null, changeCurrentDisplay = null, changeConfirmMessage = null }) {
    // Custom Hook
    const { allProducts } = useAllProducts();
    const { cartInventory, setCartInventory } = useCartInventory();
    const { wishlistInventory, setWishlistInventory } = useWishlistInventory();

    // Variables 
    let originalColor = "Not Selected";
    let originalSize = "Not Selected";

    // Prevent from Checking if clicked everywhere but cart and wishlist
    if (clickedFrom !== "default" && clickedFrom !== "wishcart") {
        originalColor = product.color;
        originalSize = product.size.split(" ")[1];
    }

    // State used to manage the selection
    const [selectedColor, setSelectedColor] = useState(originalColor);
    const [selectedSize, setSelectedSize] = useState(originalSize);

    // State used to manage the message
    const [editMessage, setEditMessage] = useState(clickedFrom === "wishcart"
        ? "Please select both a color and a size to add this item to your cart" : ""
    );

    // All possible color
    const colors = {
        black: "#001219",
        grey: "#161a1d",
        navy: "#005f73",
        blue: "#0a9396",
        sky: "#94d2bd",
        beige: "#e9d8a6",
        yellow: "#ee9b00",
        amber: "#ca6702",
        orange: "#bb3e03",
        red: "#ae2012",
        maroon: "#9b2226",
    }

    // Reference the display menu
    const displayRef = useRef(null)

    // Find the current product
    const currentProduct = allProducts.find(products =>
        products.name === product.name
    );

    // Added a mouse listener to document to check if outside has been clicked
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Check if the click happen outside the display menu
    function handleClickOutside(event) {
        //drowDownRef.current to check if value is defined and not null/undefine
        if (displayRef.current && !displayRef.current.contains(event.target)) {
            setEditScreen(false);
        }
    };

    // Handle update if clicked from cart
    function updateProductFromCart() {
        if ((product.size !== selectedSize || product.color !== selectedColor)
            && !cartInventory.find(cartProduct => cartProduct.name === currentProduct.name
                && cartProduct.size === `${currentProduct.section} ${selectedSize}`
                && cartProduct.color === selectedColor)) {
            // Not inside the cart and is different remove old product add with the changed values

            if (editMessage.length <= 0 && product.quantity > 1) {
                setEditMessage("The current product being altered has multiple copies. Continuing will affect all of them.")
            } else {
                setCartInventory(prevCart =>
                    prevCart.map(cartProduct =>
                        cartProduct === product ? { ...cartProduct, size: `${currentProduct.section} ${selectedSize}`, color: selectedColor }
                            : cartProduct
                    ))
                setEditScreen(false);
                message(`${product.name} has been successfully edited.`);
            }
        } else if ((product.size === selectedSize || product.color === selectedColor)
            && cartInventory.find(cartProduct => cartProduct.name === currentProduct.name
                && cartProduct.size === `${currentProduct.section} ${selectedSize}`
                && cartProduct.color === selectedColor)) {
            // Product is the same
            setEditScreen(false);
            message(`No changes detected. ${product.name} has remained the same.`);
        }
        else if (cartInventory.find(cartProduct => cartProduct.name === currentProduct.name
            && cartProduct.size === `${currentProduct.section} ${selectedSize}`
            && cartProduct.color === selectedColor
        )) {
            // Already in the cart and adding a confirm message
            if (editMessage.length <= 0) {
                setEditMessage("This product is already in your cart. Do you want to increase its quantity?")
            } else {
                // increasing the quanity and removing the old product
                let prevCart = cartInventory.filter(cartProduct => cartProduct !== product)
                prevCart = prevCart.map(cartProduct => cartProduct.name === currentProduct.name && cartProduct.size === `${currentProduct.section} ${selectedSize}` && cartProduct.color === selectedColor
                    ? { ...cartProduct, quantity: cartProduct.quantity + product.quantity }
                    : cartProduct)
                setCartInventory(prevCart)
                setEditScreen(false);
                message(`${product.name} has been successfully edited.`);
            }
        }
    }

    // Handle update if clicked from wishlist
    function updateProductFromWishlist() {
        // remove the product from the a temp wishlist in order to find its the same product or the same as another 
        let wishlistInventoryWithoutItem = wishlistInventory.filter(cartProduct => cartProduct !== product);

        if ((product.size !== selectedSize || product.color !== selectedColor)
            && !wishlistInventory.find(cartProduct => cartProduct.name === currentProduct.name
                && cartProduct.size === `${currentProduct.section} ${selectedSize}`
                && cartProduct.color === selectedColor)) {
            // Not inside the cart and is different remove old product add with the changed values

            setWishlistInventory(prevCart =>
                prevCart.map(cartProduct =>
                    cartProduct === product ? { ...cartProduct, size: `${currentProduct.section} ${selectedSize}`, color: selectedColor }
                        : cartProduct
                ))
            setEditScreen(false);
            message(`${product.name} has been successfully edited.`);
        } else if (!wishlistInventoryWithoutItem.find(cartProduct => cartProduct.name === currentProduct.name
            && cartProduct.size === `${currentProduct.section} ${selectedSize}`
            && cartProduct.color === selectedColor)) {
            // Product is the same
            setEditScreen(false);
            message(`No changes detected. ${product.name} has remained the same.`);
        } else {
            setEditMessage("This product is already in your wishlist and cannot be added again.")
        }
    }

    // Handle update if clicked from everywhere else
    function updateProductFromDefault() {
        // Error message if no color/size is selected
        if (!wishlistInventory.find(cartProduct => cartProduct.name === currentProduct.name
            && (cartProduct.size === `${currentProduct.section} ${selectedSize}` || cartProduct.size === selectedSize)
            && cartProduct.color === selectedColor)) {
            // Add product to wishlist if not founded
            setWishlistInventory(prev => [...prev, {
                // Only added the products required information
                timeadded: prev.length,
                name: product.name,
                price: product.price,
                section: product.section,
                image: product.image,
                description: product.description,
                rating: product.rating,
                review: product.review,
                size: selectedColor === "Not Selected" ? selectedSize : `${currentProduct.section} ${selectedSize}`,
                color: selectedColor
            }]);
            changeConfirmMessage(`${product.name} has successfully added to your wishlist.`)
            setEditScreen(false);
        } else {
            setEditMessage("This product is already in your wishlist and cannot be added again.")
        }
    }

    // Handle adding to cart from wishlist if data is not selected
    function addProductToCart() {
        if (selectedColor === "Not Selected" || selectedSize === "Not Selected") {
            setEditMessage("Please select both a color and a size to add this item to your cart.")
        } else {
            // Checking if selected product is already in
            if (!cartInventory.find(cartProduct => cartProduct.name === product.name
                && cartProduct.size === product.size
                && cartProduct.color === product.color
            )) {
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
                    discountPercent: discountPercent,
                    // Selection
                    size: `${currentProduct.section} ${selectedSize}`,
                    color: selectedColor
                }]);
            } else {
                // Added the addition into the cart if already there
                setCartInventory(prevCartProducts =>
                    prevCartProducts.map(cartProduct =>
                        cartProduct.name === product.name && cartProduct.size === product.size && cartProduct.color === product.color
                            ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
                            : cartProduct
                    )
                );
            }
            // Remove it from wishlist
            setWishlistInventory((prevWishlist => prevWishlist.filter(prevProduct => prevProduct !== product)))

            // Remove it from display
            changeCurrentDisplay((prevWishlist => prevWishlist.filter(prevProduct => prevProduct !== product)))

            // Message used to add to cart from wishlist
            message(`${product.name} has been added to cart.`);
            setEditScreen(false);
        }
    }

    // Main edit Animation
    const editAnimation = {
        start: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
            transition: {
                duration: 0.15,
            }
        }
    }

    return (
        <motion.div
            className="editproduct__container"
            variants={editAnimation}
            initial="start"
            animate="enter"
        >
            <div
                className="editproduct__display"
                ref={displayRef}
            >
                <div className="editproduct-display__header">
                    <h2> Editing: {product.name} </h2>
                    <button onClick={() => { setEditScreen(false) }}></button>
                </div>

                <div className="editproduct__content-container">
                    <div
                        className="editproduct-content__img"
                        style={{ backgroundImage: `url("/productimage/${product.section}/${product.image}")` }}
                    />
                    <div className="editproduct-content__selection-container">
                        {/* Color Selector */}
                        <p className="productpage__selection">Color: {selectedColor}</p>
                        <ul className=" productpage__range">
                            {currentProduct.colorrange.map(element => {
                                return (
                                    <li
                                        className="productpage__color-container productpage__range-container "
                                        key={`${currentProduct.name}-${element}-color`}
                                        onClick={() => {
                                            if (editMessage.length > 0) {
                                                setEditMessage("")
                                            }
                                            setSelectedColor(element)
                                        }}
                                        data-active={selectedColor === element ? "true" : "false"}
                                    >
                                        <div
                                            className="productpage__shape productpage__color-orb"
                                            style={{ backgroundColor: colors[element] }}
                                        />
                                    </li>
                                )
                            })}
                        </ul>

                        {/* Generate Size Range */}
                        <p className="productpage__selection">
                            Size: {selectedSize !== "Not Selected" ? currentProduct.section : null} {selectedSize}
                        </p>
                        <ul className="productpage__range">
                            {currentProduct.sizes.map(element => {
                                return (
                                    <li
                                        className="productpage__range-container"
                                        key={`${currentProduct.name}-${element}-range`}
                                        onClick={() => {
                                            if (editMessage.length > 0) {
                                                setEditMessage("")
                                            }
                                            setSelectedSize(element);
                                        }}
                                        data-active={selectedSize === element ? "true" : "false"}
                                    >
                                        <p className="productpage__shape productpage__size-text"> {element} </p>
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="editproduct-content__button-container">
                            {editMessage.length > 0
                                ? <p className="editproduct__message">{editMessage}</p>
                                : null}
                            <button
                                className="editproduct-content__button"
                                onClick={() => {
                                    if (clickedFrom === "cart") {
                                        updateProductFromCart()
                                    } else if (clickedFrom === "wishlist") {
                                        updateProductFromWishlist();
                                    } else if (clickedFrom === "default") {
                                        updateProductFromDefault();
                                    } else {
                                        addProductToCart()
                                    }
                                }}
                            >{clickedFrom === "default"
                                ? 'Add to Wishlist'
                                : clickedFrom === "wishcart"
                                    ? "Add to Cart"
                                    : "Update Product"}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </motion.div >
    )
}

export default EditScreen