import { useEffect, useRef, useState } from "react";
import { easeInOut, motion, useAnimation, useInView } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom';
import StarGeneration from "./StarGeneration";

function Product({ product, changeEditStatus }) {
    // use to naviage to the product page while keeping the button nature color
    const redirect = useNavigate();

    // Reference to the product
    const ref = useRef(null)

    // Determines if the section is in view
    const inView = useInView(ref, { once: true })

    // Animation controller
    const playAnimation = useAnimation();

    // Play animation when the product is in view
    useEffect(() => {
        if (inView) {
            playAnimation.start("animation")
        }
    }, [inView])

    // Handled the onClick of the button to add to wishlist
    function handleAddToWishlist() {
        // Open edit menu
        changeEditStatus(product, "default")
    }

    // Handle the button press to add to cart
    function handleAddToCartButton() {
        // redirect to product page
        redirect(`/product/${product.name.toLowerCase().replaceAll(" ", "-").replaceAll("'", "")}`)
    }

    // Default product animation
    const productAnimation = {
        init: {
            y: 10,
            opacity: 0,
        },
        animation: {
            y: 0,
            opacity: 1,
            transtion: {
                duration: 1000,
                ease: easeInOut
            }
        }
    }

    return (
        <motion.div
            className="product-card"
            ref={ref}
            variants={productAnimation}
            initial="init"
            animate={playAnimation}
        >
            {/* Product img */}
            {/* Link to product page */}
            <Link
                to={`/product/${product.name.toLowerCase().replaceAll(" ", "-").replaceAll("'", "")}`}
                className="product-card__img-container"
            >
                <img
                    className="product-card__img"
                    src={`/productimage/${product.section}/${product.image}`}
                    alt={product.image} />
            </Link>
            <button
                className="product-card__wishlist-button"
                onClick={() => { handleAddToWishlist() }}
            />
            {/* Product information */}
            <div className="product-card__content-container">
                <Link
                    to={`/product/${product.name.toLowerCase().replaceAll(" ", "-").replaceAll("'", "")}`}
                    className="product-card__name"
                >{product.name}</Link>
                <p className="product-card__description">{product.description}</p>
                <p className="product-card__price">{`$${product.price}`}</p>
                <div className="product-card__rating-container">
                    <StarGeneration product={product} />
                    <button
                        className="product-card__button"
                        onClick={() => { handleAddToCartButton() }}
                    >View Item</button>
                </div>

            </div>
        </motion.div >
    )
}

export default Product
