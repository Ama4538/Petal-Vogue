import { useState } from "react";

function Product({ product, handleAddToCart }) {
    // Status used to manage the button
    const [status, setStatus] = useState(product.status)

    // Text for each status
    const textStatus = {
        disabled: "Added To Cart",
        enabled: "Add to Cart"
    }

    // Max star rating
    const MAX_STARS = 5;

    // Filled stars based upon product avarage rating
    let filledStars = Math.round(product.rating);

    // Creating star array to populate stars
    const starArray = new Array(MAX_STARS).fill(0);

    // Filling in all filled stars in relation to array
    for (let i = 0; i < filledStars; i++) {
        starArray[i] = 1;
    }

    // Handle onClick
    function onClick() {
        // Has own status to update the button without refreshing the section
        setStatus("disabled");
        handleAddToCart();
    }

    return (
        <div className="product-card" >
            {/* Product img */}
            <div className="product-card__img-container">
                <img className="product-card__img" src={`./productimage/${product.section}/${product.image}`} alt={product.image} />
            </div>

            {/* Product information */}
            <div className="product-card__content-container">
                <p className="product-card__name">{product.name}</p>
                <p className="product-card__description">{product.description}</p>
                <p className="product-card__price">{`$${product.price}`}</p>
                <div className="product-card__rating-container">
                    <div className="product-card__rating-star">
                        {/* Populate the container with stars and their corresponding fillness */}
                        {starArray.map((element, index) => {
                            return (
                                element === 1
                                    ? <div className="product-rating__star--filled" key={index}></div>
                                    : <div className="product-rating__star--empty" key={index}></div>
                            )
                        })}
                        <p className="product-card__rating">{`${product.rating} (${product.review})`}</p>
                    </div>
                    <button
                        className="product-card__button"
                        // If enable allow to be clicked
                        onClick={ status === "enabled" ? onClick : null }
                        data-status={status}
                    >{textStatus[status]}</button>
                </div>

            </div>

        </div>
    )
}

export default Product

// `url("./homeimage/${section}/${data.file}")`