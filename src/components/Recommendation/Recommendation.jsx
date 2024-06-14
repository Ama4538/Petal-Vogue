import { useEffect, useState } from "react";
import Product from "../product/Product";

function Recommendation({ products, mostCommonSection = "all", handleAddToCart }) {
    // Current display for recommendation
    const [currentDisplay, setCurrentDisplay] = useState([])

    // Default amount of items on the grid
    let defaultAmount = 4;

    // Most common product used to find recommendation
    let mostCommonProducts;
    if (mostCommonSection !== "all") {
        mostCommonProducts = products.filter(product => product.section === mostCommonSection)
    } else {
        mostCommonProducts = products.filter(product => product.status !== "disabled")
    }

    // Default cannot be greater then mostCommonProducts length
    if (defaultAmount > mostCommonProducts.length) {
        defaultAmount = mostCommonProducts.length;
    }

    // Generating the display array then adding to the current display
    useEffect(() => {
        if (mostCommonProducts.length === 0) {
            setCurrentDisplay([]);
            return;
        }

        // Array used to generate random product
        let displayArray = Array(defaultAmount);
        let index = 0;
        while (index < defaultAmount) {
            let randomNum = generateRandom(0, mostCommonProducts.length - 1);
            if (!displayArray.includes(mostCommonProducts[randomNum])) {
                displayArray[index] = mostCommonProducts[randomNum];
                index++;
            }
        }
        setCurrentDisplay(displayArray);
    }, [])


    // Generate a random number
    function generateRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    return (
        <div className="recommendation">
            {currentDisplay.map((product) => {
                return (
                    <Product
                        key={`${product.name}Recommendation`}
                        product={product}
                        handleAddToCart={() => handleAddToCart(product)}
                    />
                )
            })}
        </div>
    )
}

export default Recommendation;

