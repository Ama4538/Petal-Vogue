import StarGeneration from "../../components/product/StarGeneration";

function ProductReview({ reviews, length, product }) {
    // Making sure we dont generate more than we have
    let defaultLength = length
    if (defaultLength > reviews.length) {
        defaultLength = reviews.length
    }

    if (defaultLength === 0) {
        return;
    }

    // Select a random unqiue review that we dont have
    const selectedReviews = new Set();
    while (selectedReviews.size <= defaultLength) {
        selectedReviews.add(reviews[generateRandomNum(reviews.length)])
    }

    // Generate a random size and color
    const reviewArray = [...selectedReviews].map(review => ({
        ...review,
        color: product.colorrange[generateRandomNum(product.colorrange.length)],
        size: product.sizes[generateRandomNum(product.sizes.length)]
    }))

    // Generate a random number from 0 - max
    function generateRandomNum(max) {
        return Math.floor(Math.random() * max)
    }

    return (
        <>
            {reviewArray.map(review => {
                return (<div
                    key={`${review.name}Review`}
                    className="productreview__container"
                >
                    <p className="productreview__name">{review.name}</p>
                    <div className="productreview__rating">
                        <StarGeneration displayRating={false} product={review} />
                        <p>{review.title}</p>
                    </div>
                    <p className="productreview__minor">Reviewed from {review.location} on {review.date}</p>
                    <ul className="productreview__list productreview__minor">
                        <li>Color: {review.color}</li>
                        <li>Size: {review.size}</li>
                    </ul>
                    <p>{review.review}</p>
                </div>)
            })}
        </>
    )
}

export default ProductReview