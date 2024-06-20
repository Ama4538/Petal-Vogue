import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchNav from "../../components/nav/SearchNav";
import { useAllProducts, useCartInventory, useWishlistInventory } from "../../components/app/Hook";
import ScrollToTopOnMount from "../../components/app/ScrollToTopOnMount.jsx";
import StarGeneration from "../../components/product/StarGeneration.jsx";
import ProductReview from "./ProductReview.jsx";
import SimilarProduct from "../../components/Recommendation/SimilarProduct.jsx";
import Recommendation from "../../components/Recommendation/Recommendation.jsx";
import EditScreen from '../../components/editscreen/EditScreen.jsx';
import EditMessageDisplay from "../../components/editscreen/EditMessageDisplay.jsx";

function ProductPage({ reviews }) {
    // Custom Hook
    const { allProducts, setAllProducts } = useAllProducts();
    const { wishlistInventory, setWishlistInventory } = useWishlistInventory();
    const { cartInventory, setCartInventory } = useCartInventory();

    // State used to mange product information
    const [selectedColor, setSelectedColor] = useState("Not Selected");
    const [selectedSize, setSelectedSize] = useState("Not Selected");
    const [quantity, setQuantity] = useState(1);

    // State used to mange message
    const [productMessage, setProductMessage] = useState("");
    const [cartAmountSame, setCartAmountSame] = useState(1);

    // State used to mange editing
    const [edit, setEdit] = useState(false)
    const [editProduct, setEditProduct] = useState(null);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [messageVisible, setMessageVisible] = useState(false);

    // The product ID
    const { productID } = useParams();

    // Redirect variable
    const redirect = useNavigate();

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

    // Find the current product
    const currentProduct = allProducts.find(product =>
        product.name.toLowerCase().replaceAll(" ", "-").replaceAll("'", "") === productID
    );

    // Effect to handle redirection if product is not found
    useEffect(() => {
        if (!currentProduct) {
            redirect('*', { replace: true });
        }
    }, [currentProduct]);

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
    function changeEditStatus(product) {
        setEditProduct(product)
        setEdit(true);
    }

    // Function to pass to children to change confirm Message
    function changeConfirmMessage(data) {
        setConfirmMessage(data)
    }

    // Function to pass to children to change edit
    function changeEditScreen(data) {
        setEdit(data)
    }

    // Handled the onClick of the button to Move to wishlist
    function handleAddTowishlist() {
        if (!wishlistInventory.find(wishlistProduct =>
            wishlistProduct.name === currentProduct.name
            && (wishlistProduct.size === `${currentProduct.section} ${selectedSize}` || wishlistProduct.size === selectedSize)
            && wishlistProduct.color === selectedColor
        )) {
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
                size: selectedSize === "Not Selected" ? selectedSize : `${currentProduct.section} ${selectedSize}`,
                color: selectedColor
            }]);

            setAllProducts(prevProducts => prevProducts.map(prevProduct => (
                prevProduct.name === currentProduct.name ? { ...prevProduct, wishlist: true } : prevProduct
            )));
            setProductMessage("Product has been added to wishlist")
        } else {
            setProductMessage("Product is already in wishlist")
        }
    }

    // Handled the onClick of the button to add to cart
    function handleAddToCart() {
        if (!cartInventory.find(cartProduct => cartProduct.name === currentProduct.name
            && cartProduct.size === `${currentProduct.section} ${selectedSize}`
            && cartProduct.color === selectedColor
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
                name: currentProduct.name,
                price: currentProduct.price,
                section: currentProduct.section,
                image: currentProduct.image,
                // Give it a quantity value
                quantity: quantity,
                // discount
                discountAmount: currentProduct.price * discountPercent,
                discountPercent: discountPercent,
                // Selection
                size: `${currentProduct.section} ${selectedSize}`,
                color: selectedColor
            }]);
            setProductMessage("Product has been added to cart")
            if (cartAmountSame > 1) {
                setCartAmountSame(1);
            }
        } else {
            // Added the addition into the cart if already there
            setCartInventory(prevCartProducts =>
                prevCartProducts.map(cartProduct =>
                    cartProduct.name === currentProduct.name && cartProduct.size === `${currentProduct.section} ${selectedSize}` && cartProduct.color === selectedColor
                        ? { ...cartProduct, quantity: cartProduct.quantity + quantity }
                        : cartProduct
                )
            );
            setCartAmountSame(cartAmountSame + 1);
            setProductMessage(`Product has been added to cart (${cartAmountSame})`)
        }
    }

    return (
        <section className="productpage">
            <SearchNav />
            <ScrollToTopOnMount />
            {edit ? <EditScreen
                setEditScreen={changeEditScreen}
                product={editProduct}
                clickedFrom={"default"}
                changeConfirmMessage={changeConfirmMessage}
            /> : <></>}
            <EditMessageDisplay
                text={confirmMessage}
                dataVisible={messageVisible ? true : false}
            />

            <article className="productpage__content-display">
                <div
                    className="productpage-content__img"
                    style={{ backgroundImage: `url("/productimage/${currentProduct.section}/${currentProduct.image}")` }}
                />
                {/* Information display */}
                <div className="productpage__information">
                    <h2 className="productpage__title">{currentProduct.name}</h2>
                    <p className="productpage__subtitle">{currentProduct.description}</p>
                    <div className="productpage__star-container">
                        <p> {currentProduct.rating} </p>
                        <StarGeneration product={currentProduct} displayRating={false} />
                        <p> ({currentProduct.review} ratings) </p>
                    </div>

                    {/* Generate the color range */}
                    <p className="productpage__selection">Color: {selectedColor}</p>
                    <ul className=" productpage__range">
                        {currentProduct.colorrange.map(element => {
                            return (
                                <li
                                    className="productpage__color-container productpage__range-container "
                                    key={`${currentProduct.name}-${element}-color`}
                                    onClick={() => {
                                        if (productMessage.length > 0) {
                                            setProductMessage("")
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
                                        if (productMessage.length > 0) {
                                            setProductMessage("")
                                        }
                                        setSelectedSize(element)
                                    }}
                                    data-active={selectedSize === element ? "true" : "false"}
                                >
                                    <p className="productpage__shape productpage__size-text"> {element} </p>
                                </li>
                            )
                        })}
                    </ul>

                    <p className="productpage__price">Price: ${currentProduct.price} </p>

                    <div className="productpage__quantity-container">
                        <button
                            className="productpage-quantity__button"
                            onClick={() => { quantity > 1 ? setQuantity(quantity - 1) : null }}
                            data-status={quantity > 1 ? "enabled" : "disabled"}
                        > - </button>
                        <p className="productpage-quantity__display"> {quantity} </p>
                        <button
                            className="productpage-quantity__button"
                            onClick={() => setQuantity(quantity + 1)}
                        > + </button>
                    </div>

                    {productMessage.length > 0
                        ? <p className={`productpage__message ${productMessage.includes("already") ? "productpage__message--red" : "" }`}>{productMessage}</p>
                        : null}

                    <button
                        className="productpage__button"
                        onClick={() => {
                            if (selectedColor !== "Not Selected" && selectedSize !== "Not Selected") {
                                handleAddToCart();
                            }
                        }}
                        data-active={selectedColor !== "Not Selected" && selectedSize !== "Not Selected"
                            ? true : false}
                    >Add to Cart </button>

                    <button
                        className="productpage__button productpage__button-wishlist"
                        onClick={() => { handleAddTowishlist() }}
                    >Add to Wishlist</button>

                </div>
            </article>

            {/* Comments / Discription */}
            <article className="productpage__reviews-container">
                <h2 className="productpage-reviews__title ">Reviews and Product Details</h2>
                <div className="productpage-information__display">
                    <div className="productpage-review__display">
                        <ProductReview
                            reviews={reviews}
                            length={3}
                            product={currentProduct}
                        />
                    </div>
                    <div className="productpage__information-discription">
                        <p className="productpage__information-title">Details</p>
                        <ul className="productpage-discription__list">
                            <li>Product Type: Casual Wear</li>
                            <li>Colors: {currentProduct.colorrange.join(", ")}</li>
                            <li>Sizes: {currentProduct.sizes.join(", ")}</li>
                            <li>Fit: Regular</li>
                            <li>Style: Modern, versatile design</li>
                            <li>Eco Friendly</li>
                        </ul>
                        <p className="productpage__information-title">Material</p>
                        <ul className="productpage-discription__list">
                            <li>Fabric Type: 90% Fake, 5% Made Up, and 5% Love</li>
                        </ul>
                        <p className="productpage__information-title">Care</p>
                        <ul className="productpage-discription__list">
                            <li>Storage: Store in a cool, dry place away from direct sunlight and humidity</li>
                            <li>Handling: Handle with care to avoid damage</li>
                            <li>Avoiding Damage: Avoid exposure to harsh chemicals, extreme temperatures, and abrasive surfaces</li>
                        </ul>
                        <p className="productpage__information-title">Exchanges & Returns</p>
                        <p className="productpage-discription__list">Exchanges and returns are accepted within 30 days of the purchase date, provided the items are unworn, unwashed, and have tags attached. Items purchased online, including Buy Online, Pick Up In-Store (BOPUS) orders, can only be returned to our warehouse via mail using our Prepaid Return Label/QR Code. If payment was completed at a store, the item can be returned to any store location in the US.</p>
                    </div>
                </div>
            </article>


            {/* Similar Product */}
            <div className="productpage__similar-container">
                <h3 className="productpage-reviews__title">Similar Product</h3>
                <SimilarProduct
                    product={currentProduct}
                    changeEditStatus={changeEditStatus}
                />
            </div>

            {/* RECOMMENDATION */}
            <div className="productpage__similar-container">
                <h3 className="productpage-reviews__title ">Recommend for you</h3>
                <Recommendation changeEditStatus={changeEditStatus} />
            </div>
        </section>
    )
}

export default ProductPage