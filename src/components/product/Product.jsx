function Product({ section, name, price, description, rating, review, image }) {
    // Max star rating
    const MAX_STARS = 5;

    // Filled stars based upon product avarage rating
    let filledStars = Math.round(rating);

    // Creating star array to populate stars
    const starArray = new Array(MAX_STARS).fill(0);

    // Filling in all filled stars in relation to array
    for (let i = 0; i < filledStars; i++) {
        starArray[i] = 1;
    }

    return (
        <div className="product-card" >
            {/* Product img */}
            <div className="product-card__img-container">
                <img className="product-card__img" src={`./productimage/${section}/${image}`} alt={image} />
            </div>

            {/* Product information */}
            <div className="product-card__content-container">
                <p className="product-card__name">{name}</p>
                <p className="product-card__description">{description}</p>
                <p className="product-card__price">{`$${price}`}</p>
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
                        <p className="product-card__rating">{`${rating} (${review})`}</p>
                    </div>
                    <button className="product-card__button">Add To Cart</button>
                </div>

            </div>

        </div>
    )
}

export default Product

// `url("./homeimage/${section}/${data.file}")`