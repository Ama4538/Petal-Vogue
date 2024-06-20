import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import { useAllProducts, useCartInventory, useWishlistInventory } from "../../components/app/Hook";
import SearchNav from "../../components/nav/SearchNav";
import Banner from "../../components/banner/Banner";
import DropDown from '../../components/dropdown/DropDown.jsx';
import StarGeneration from "../../components/product/StarGeneration.jsx";
import Recommendation from "../../components/Recommendation/Recommendation.jsx";
import ScrollToTopOnMount from "../../components/app/ScrollToTopOnMount.jsx";
import { Link } from "react-router-dom";
import EditScreen from '../../components/editscreen/EditScreen.jsx';

function Wishlist() {
    // Custom Hook
    const { wishlistInventory, setWishlistInventory, wishlistAmount } = useWishlistInventory()
    const { cartInventory, setCartInventory } = useCartInventory();
    const { setAllProducts } = useAllProducts();

    // State to manage sorting
    const [sortingOrder, setSortingOrder] = useState("Newly Listed");
    const sortByFilter = ["Newly Listed", "Oldest to Newest"]

    // State to manage the display
    const [currentDisplay, setCurrentDisplay] = useState(wishlistInventory)

    // State used to manage message
    const [wishlistMessage, setWishlistMessage] = useState("")

    // State used to mange editing
    const [edit, setEdit] = useState(false)
    const [editProduct, setEditProduct] = useState(null);
    const [clickedFrom, setClickedFrom] = useState("wishlist");

    // Check if edit screen should appear
    useEffect(() => {
        if (edit) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [edit])

    // Change the wistlist display when the wishlist changes
    useEffect(() => {
        setCurrentDisplay(wishlistInventory);
        changeSortingOrder()
    }, [wishlistInventory])

    // When sorting order change call needed functions
    useEffect(() => {
        // Sort the current display category
        changeSortingOrder()
    }, [sortingOrder])

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
        setWishlistMessage(data)
    }

    // Handled the onClick of the button to add to cart
    function handleAddToCart(product) {
        if (product.size === "Not Selected" || product.color === "Not Selected") {
            // ADDED ADD TO CART CHECKER OPENING EDIT SCREEN AND MAKE IT PUT THE PRODUCT IN THE SCREEN THEN REMOVE IT FROM WISHLIST IF NOT CANCEL
            // ADDED NOTIFCATION BANNER 
        } else {
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
                    size: product.size,
                    color: product.color
                }]);
            }
        }

        // Find the corresponding product and set its button to disabled
        setAllProducts(prevProducts => prevProducts.map(prevProduct => (
            prevProduct.name === product.name ? { ...prevProduct, wishlist: false } : prevProduct
        )));

        // Remove it from wishlist
        setWishlistInventory((prevWishlist => prevWishlist.filter(prevProduct => prevProduct !== product)))

        // Remove it from display
        setCurrentDisplay((prevWishlist => prevWishlist.filter(prevProduct => prevProduct !== product)))

        // Update message 
        setWishlistMessage(`${product.name} has been added to cart`);
    }

    // Handle removing the item from wishlist
    function removeItem(product) {
        // Reenable the product
        setAllProducts(prevProducts => prevProducts.map(prevProduct => (
            prevProduct.name === product.name ? { ...prevProduct, wishlist: false } : prevProduct
        )));

        // Remove it from wishlist
        setWishlistInventory((prevWishlist => prevWishlist.filter(prevProduct => prevProduct !== product)))

        // Remove it from display
        setCurrentDisplay((prevWishlist => prevWishlist.filter(prevProduct => prevProduct !== product)))

        // Update message 
        setWishlistMessage(`${product.name} has been removed from your wishlist`);
    }

    // Handle the change in sorting order
    function changeSortingOrder() {
        // Ensure currentDisplay is not empty
        if (currentDisplay.length === 0) {
            return;
        }

        switch (sortingOrder.toLowerCase()) {
            case 'newly listed':
                setCurrentDisplay(prev => [...prev].sort((a, b) => b.timeadded - a.timeadded))
                break;
            case 'oldest to newest':
                setCurrentDisplay(prev => [...prev].sort((a, b) => a.timeadded - b.timeadded))
                break;
        }
    }

    // Main Wishlist Animation
    const wishListAnimation = {
        exit: {
            opacity: 0,
            transition: {
                duration: 0.15,
            }
        }
    }

    return (
        <motion.section
            className="wishlist"
            variants={wishListAnimation}
            exit="exit"
        >
            <ScrollToTopOnMount />
            <SearchNav />
            {edit ? <EditScreen
                setEditScreen={changeEditScreen}
                product={editProduct}
                clickedFrom={clickedFrom}
                message={changeCartMessage}
            /> : <></>}
            <article className="wishlist__content-container">
                <div className="wishlist__banner-container">
                    <Banner
                        title={"Your Dream Wardrobe Awaits"}
                        subtitle={"Collect the trends you love"}
                        section={"wishlist"}
                    />
                </div>
                {/* Filter Containers */}
                <h2 className="wishlist__title">Wishlist</h2>
                <div className="wishlist__filter-container">
                    <p>Results: {wishlistAmount} items</p>
                    {wishlistMessage.length > 0
                        ? <p className={wishlistMessage.includes("remove") ? "wishlist-message__remove" : "wishlist-message__add"}>{wishlistMessage}</p>
                        : <> </>}
                    <div className="wishlist-filter__dropdown-container">
                        <p className="wishlist-dropdown__title">Sort By:</p>
                        <DropDown
                            content={sortByFilter}
                            setSelected={setSortingOrder} />
                    </div>
                </div>

                {/* Display */}
                <div className="wishlist__display-container">
                    {wishlistAmount > 0 ?
                        (currentDisplay.map(product => {
                            return (
                                <div className="wishlist-display__product" key={`${product.name}-${product.size}-${product.color}-wishlist`}>
                                    <Link
                                        to={`/product/${product.name.toLowerCase().replaceAll(" ", "-").replaceAll("'", "")}`}
                                        className="wishlist-product__img-container"
                                    >
                                        <img
                                            src={`./productimage/${product.section}/${product.image}`}
                                            alt={product.image}
                                            className="wishlist-product__img" />
                                    </Link>
                                    <div className="wishlist-product__content-container">
                                        <div className="wishlist-product__information">
                                            <Link
                                                to={`/product/${product.name.toLowerCase().replaceAll(" ", "-").replaceAll("'", "")}`}
                                                className="wishlist-product__name"
                                            > {product.name}</Link>
                                            <p className="wishlist-product__description">  {product.description}</p>
                                            <p className="wishlist-product__additional"> Price: ${product.price} </p>
                                            <p className="wishlist-product__additional"> Color: {product.color} </p>
                                            <p className="wishlist-product__additional"> Size: {product.size} </p>
                                            <StarGeneration product={product} />

                                        </div>
                                        <div className="wishlist-product__button-container">
                                            <button
                                                className="wishlist-product__button-add"
                                                onClick={() => handleAddToCart(product)}
                                            >Add to Cart</button>
                                            <div className="wishlist-product__button-format">
                                                <button
                                                    className="wishlist-product__button-remove"
                                                    onClick={() => { changeEditStatus(product, "wishlist") }}
                                                > Edit </button>
                                                <button
                                                    className="wishlist-product__button-remove"
                                                    onClick={() => removeItem(product)}
                                                >Remove </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        }))
                        :
                        <div className="wishlist__empty-container">
                            <h3 className='wishlist-empty__title'> Looks like you wishlist is empty!</h3>
                            <p className='wishlist-empty__text'> Continue shopping to discover more stylish options</p>
                        </div>
                    }
                </div>

                {/* Recommondation */}
                <div className="wishlist__recommend-container">
                    <h3 className="wishlist__title">Check Out These Recommendations</h3>
                    <Recommendation changeEditStatus={changeEditStatus} />
                </div>
            </article>
        </motion.section >
    )
}

export default Wishlist