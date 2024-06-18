import { useNavigate, useParams } from "react-router-dom";
import SearchNav from "../../components/nav/SearchNav";
import { useAllProducts, useCartInventory, useWishlistInventory } from "../../components/app/Hook";
import { useEffect, useState } from "react";
import ScrollToTopOnMount from "../../components/app/ScrollToTopOnMount.jsx";
import StarGeneration from "../../components/product/StarGeneration.jsx";

function ProductPage() {
    // Custom Hook
    const { allProducts, setAllProducts } = useAllProducts();
    const { wishlistInventory, setWishlistInventory } = useWishlistInventory();
    const {cartInventory, setCartInventory} = useCartInventory();

    // State used to mange product information
    const [selectedColor, setSelectedColor] = useState("Not Selected");
    const [selectedSize, setSelectedSize] = useState("Not Selected");
    const [quantity, setQuantity] = useState(1);

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

    // Handled the onClick of the button to Move to wishlist
    function handleAddTowishlist() {
        if (!wishlistInventory.find(wishlistProduct =>
            wishlistProduct.name === currentProduct.name
            && wishlistProduct.size === selectedSize
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
                prevProduct.wish === currentProduct.name ? { ...prevProduct, wishlist: true } : prevProduct
            )));
        }
    }

    // Handled the onClick of the button to add to cart
    function handleAddToCart() {
        if (!cartInventory.find(cartProduct => cartProduct.name === currentProduct.name
            && cartProduct.size === selectedSize
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
        }
    }

    return (
        <section className="productpage">
            <SearchNav />
            <ScrollToTopOnMount />
            <div className="productpage__content-container">
                <div
                    className="productpage-content__img"
                    style={{ backgroundImage: `url("/productimage/${currentProduct.section}/${currentProduct.image}")` }}
                />
                {/* Information display */}
                <div className="productpage__information">
                    <h2 className="productpage__title">{currentProduct.name}</h2>
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
                                    onClick={() => { setSelectedColor(element) }}
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
                                    onClick={() => { setSelectedSize(element) }}
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

                    <p className="productpage__unselect">To buy, select a <b>color</b> and <b>size</b></p>
                    <button
                        className="productpage__button"
                        onClick={() => {handleAddToCart()}}
                        data-active={selectedColor === "Not Selected" || selectedSize === "Not Selected"
                            ? false : true}
                    >Add to Cart</button>

                    <button 
                    className="productpage__button productpage__button-wishlist"
                    onClick={() => {handleAddTowishlist()}}
                    >Add to Wishlist</button>

                </div>


            </div>
        </section>
    )
}

export default ProductPage