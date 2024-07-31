import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAllProducts, useCartInventory, useWishlistInventory } from "../../components/app/Hook.jsx";
import Product from "../product/Product.jsx"

function Recommendation({ changeEditStatus }) {
    // Custom Hook
    const { allProducts } = useAllProducts();
    const { cartInventory } = useCartInventory();
    const { wishlistInventory } = useWishlistInventory()

    // Current display for recommendation
    const [currentDisplay, setCurrentDisplay] = useState([])
    const [defaultAmount, setDefaultAmount] = useState(5)

    // Used to redirected back to search page
    const redirect = useNavigate();

    // Media Query 
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 576) {
                setDefaultAmount(2);
            } else if (window.innerWidth >= 576 && window.innerWidth <= 767) {
                setDefaultAmount(3);
            } else if (window.innerWidth >= 768 && window.innerWidth <= 1199) {
                setDefaultAmount(4);
            } else {
                setDefaultAmount(5);
            }
        };

        // Call the function initially to set the default amount
        handleResize();

        // Add an event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    // Handle the recommondation system on mount
    useEffect(() => {
        // cart and wishlist add sections
        let commonSection = new Set();
        // Not include into the system
        let notIncluded = new Set();

        if (cartInventory.length > 0) {
            cartInventory.forEach(product => {
                commonSection.add(product.section)
                notIncluded.add(product.name)
            });
        }

        if (wishlistInventory.length > 0) {
            wishlistInventory.forEach(product => {
                commonSection.add(product.section)
                notIncluded.add(product.name)
            });
        }

        // Cart and wishlist is empty
        if (commonSection.size === 0) {
            commonSection = new Set(["women", "men", "kids"]);
        }

        // Array the notIncluded set
        const notIncludedArray = [...notIncluded]

        // All possible product display without any already inside the cart
        let possibleDisplay = [];
        if (commonSection.length === 3) {
            possibleDisplay = allProducts.filter(
                product => !(notIncludedArray.includes(product.name))
            )
        } else {
            commonSection.forEach(section => {
                possibleDisplay = possibleDisplay.concat(
                    allProducts.filter(
                        product => product.section === section && !(notIncludedArray.includes(product.name))
                    )
                );
            })
        }

        // Display with only unqiue product
        let displaySet = new Set();
        // Check to see if we are not pulling more product then in the recommnedation system
        if (defaultAmount > possibleDisplay.length) {
            setDefaultAmount(possibleDisplay.length)
        }

        // Populate the display set with random product
        if (defaultAmount !== 0) {
            while (displaySet.size < defaultAmount) {
                displaySet.add(possibleDisplay[Math.floor(Math.random() * possibleDisplay.length)])
            }
        }

        // Add it to the current display
        setCurrentDisplay([...displaySet])
    }, [defaultAmount])

    return (
        <div
            className="recommendation"
            style={{ gridTemplateColumns: `repeat(${defaultAmount}, 1fr)`, }}
        >
            {/* Print out the product or a message */}
            {currentDisplay.length !== 0 ?
                currentDisplay.map((product) => {
                    return (
                        <Product
                            key={`${product.name}Recommendation`}
                            product={product}
                            changeEditStatus={changeEditStatus}
                        />
                    )
                })
                :
                <div className="recommendation__none-container">
                    <p> We have run out of recommendations for you!</p>
                    <button className='recommendation-none__button' onClick={() => { redirect("/search") }}> Continue Shopping </button>
                </div>
            }
        </div>
    )
}

export default Recommendation;

