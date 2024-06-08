function Product({ sectionTitle, name, price, star, review, image }) {
    return (
        <div className="product-card">
            <img className="product-card__img" src={`./productimage/${sectionTitle}/${image}`} alt={image} />
            <div className="product-card__content-wrapper">
                <p className="product-card__name">{name}</p>
                <div className="product-price-wrapper">
                    <p className="product-price">{`$${price}`}</p>
                    <p className="product-card__rating">{`${star} (${review})`}</p>
                </div>
            </div>
        </div>
    )
}

export default Product

// `url("./homeimage/${section}/${data.file}")`