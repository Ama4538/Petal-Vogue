import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAllProducts, useCartInventory, useWishlistInventory } from "../../components/app/Hook.jsx";
import Product from "../product/Product.jsx"

function Recommendation() {
    // Custom Hook
    const { allProducts } = useAllProducts();
    const { cartInventory } = useCartInventory();
    const { wishlistInventory } = useWishlistInventory()

    // Current display for recommendation
    const [currentDisplay, setCurrentDisplay] = useState([])

    // Default amount of items on the grid
    let defaultAmount = 4;

    // Used to redirected back to search page
    const redirect = useNavigate();

    // Handle the recommondation system on mount
    useEffect(() => {
        // cart and wishlist add sections
        let commonSection = new Set();
        if (cartInventory.length > 0) {
            cartInventory.forEach(product => {
                commonSection.add(product.section)
            });
        } else if (wishlistInventory.length > 0) {
            wishlistInventory.forEach(product => {
                commonSection.add(product.section)
            });
        } else {
            // Cart is empty
            commonSection = new Set(["women", "men", "kids"]);
        }

        // All possible product display without any already inside the cart
        let possibleDisplay = [];
        if (commonSection.length === 3) {
            possibleDisplay = possibleDisplay.concat(allProducts.filter(product => product.status != "disabled"));
        } else {
            commonSection.forEach(section => {
                possibleDisplay = possibleDisplay.concat(
                    allProducts.filter(
                        product => product.section === section && product.wishlist === false && product.status !== "disabled"
                    )
                );
            })
        }

        // Display with only unqiue product
        let displaySet = new Set();
        // Check to see if we are not pulling more product then in the recommnedation system
        if (defaultAmount > possibleDisplay.length) {
            defaultAmount = possibleDisplay.length
        }

        // Populate the display set with random product
        if (defaultAmount !== 0) {
            while (displaySet.size < defaultAmount) {
                displaySet.add(possibleDisplay[Math.floor(Math.random() * possibleDisplay.length)])
            }
        }

        // Add it to the current display
        setCurrentDisplay([...displaySet])
    }, [])

    return (
        <div className="recommendation">
            {/* Print out the product or a message */}
            {currentDisplay.length !== 0 ?
                currentDisplay.map((product) => {
                    return (
                        <Product
                            key={`${product.name}Recommendation`}
                            product={product}
                            handleAddToCart={() => handleAddToCart(product)}
                        />
                    )
                })
                :
                <div className="recommendation__none-container">
                    <p> We have run out of recommendations for you!</p>
                    <button className='recommendation-none__button' onClick={() => {redirect("/search")}}> Continue Shopping </button>
                </div>
            }
        </div>
    )
}

export default Recommendation;

