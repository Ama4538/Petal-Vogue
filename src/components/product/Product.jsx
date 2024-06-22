import { Link, useNavigate } from 'react-router-dom';
import StarGeneration from "./StarGeneration";

function Product({ product, changeEditStatus }) {
    // use to naviage to the product page while keeping the button nature color
    const redirect = useNavigate();

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

    return (
        <div className="product-card">
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
        </div >
    )
}

export default Product
