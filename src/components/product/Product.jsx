import { useEffect, useState } from "react";
import StarGeneration from "./StarGeneration";
import { useAllProducts, useCartInventory, useWishlistInventory } from "../app/Hook";

function Product({ product }) {
    // Custom Hook
    const { setAllProducts } = useAllProducts();
    const { cartInventory, setCartInventory } = useCartInventory();
    const { wishlistInventory, setWishlistInventory } = useWishlistInventory()

    // Status used to manage the button
    const [cartStatus, setCartStatus] = useState(product.status)
    const [wishlistStatus, setWishlistStatus] = useState(product.wishlist)

    // Text for each status
    const textStatus = {
        disabled: "Added To Cart",
        enabled: "Add to Cart"
    }

    // Handled the onClick of the button to add to cart
    function handleAddToCart() {
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
            size: "Not Selected",
            color: "Not Selected"
        }]);

        // Find the corresponding product and set its button to disabled
        setAllProducts(prevProducts => prevProducts.map(prevProduct => (
            prevProduct.name === product.name ? { ...prevProduct, status: 'disabled' } : prevProduct
        )));

        setCartStatus("disabled");
    }

    // Handled the onClick of the button to add to wishlist
    function handleAddToWishlist() {
        if (wishlistStatus) {
            // Remove it from wishlist
            setWishlistInventory((prevWishlist => prevWishlist.filter(prevProduct => prevProduct.name !== product.name)))

            setAllProducts(prevProducts => prevProducts.map(prevProduct => (
                prevProduct.name === product.name ? { ...prevProduct, wishlist: false } : prevProduct
            )));

            setWishlistStatus(false)
        } else {
            // Adding to wishlist
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
                size: "Not Selected",
                color: "Not Selected"
            }]);

            setAllProducts(prevProducts => prevProducts.map(prevProduct => (
                prevProduct.name === product.name ? { ...prevProduct, wishlist: true } : prevProduct
            )));

            setWishlistStatus(true)
        }
    }

    return (
        <div className="product-card" >
            {/* Product img */}
            <div className="product-card__img-container">
                <img
                    className="product-card__img"
                    src={`./productimage/${product.section}/${product.image}`}
                    alt={product.image} />
                <button
                    className="product-card__wishlist-button"
                    onClick={() => { handleAddToWishlist() }}
                    data-status={wishlistStatus}
                />
            </div>

            {/* Product information */}
            <div className="product-card__content-container">
                <p className="product-card__name">{product.name}</p>
                <p className="product-card__description">{product.description}</p>
                <p className="product-card__price">{`$${product.price}`}</p>
                <div className="product-card__rating-container">
                    <StarGeneration product={product} />
                    <button
                        className="product-card__button"
                        // If enable allow to be clicked
                        onClick={cartStatus === "enabled" ? handleAddToCart : null}
                        data-status={cartStatus}
                    >{textStatus[cartStatus]}</button>
                </div>

            </div>

        </div>
    )
}

export default Product
