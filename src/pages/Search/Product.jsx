function Product({ sectionTitle, name, price, image }) {
    return (
        <div className="product-card">
            <img className="product-card__img" src={`./productimage/${sectionTitle}/${image}`} alt={image} />
            <div className="product-card__content-wrapper">
                <p className="product-card__name">{name}</p>
                <p className="product-price">{`$${price}`}</p>
            </div>
        </div>
    )
}

export default Product

// `url("./homeimage/${section}/${data.file}")`