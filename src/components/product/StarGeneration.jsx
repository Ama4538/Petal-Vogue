function StarGeneration({ product, displayRating = true }) {
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
    
    return (
        <div className="product__rating-star">
            {/* Populate the container with stars and their corresponding fillness */}
            {starArray.map((element, index) => {
                return (
                    element === 1
                        ? <div className="product__star--filled" key={index}></div>
                        : <div className="product__star--empty" key={index}></div>
                )
            })}
            {displayRating ? <p className="product__rating">{`${product.rating} (${product.review})`}</p> : null}
        </div>
    )
}

export default StarGeneration