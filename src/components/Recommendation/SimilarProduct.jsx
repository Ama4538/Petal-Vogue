import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAllProducts } from "../../components/app/Hook.jsx";
import Product from "../product/Product.jsx"

function SimilarProduct({ product, changeEditStatus }) {
    // Custom Hook
    const { allProducts } = useAllProducts();

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
        const displaySet = new Set()

        // All possible product display without any already inside the cart
        let possibleDisplay = allProducts.filter(prevProduct =>
            prevProduct.section === product.section && prevProduct.name !== product.name
        );

        // Check to see if we are not pulling more product then in the system
        if (defaultAmount > possibleDisplay.length) {
            setDefaultAmount(possibleDisplay.length)
        }

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
                currentDisplay.map((prevProduct) => {
                    return (
                        <Product
                            key={`${prevProduct.name}SimilarProduct`}
                            product={prevProduct}
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

export default SimilarProduct