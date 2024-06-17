import { useNavigate, useParams } from "react-router-dom";
import SearchNav from "../../components/nav/SearchNav"
import { useAllProducts } from "../../components/app/Hook";
import { useEffect } from "react";
import ScrollToTopOnMount from "../../components/app/ScrollToTopOnMount.jsx";

function ProductPage() {
    // Custom Hook
    const { allProducts } = useAllProducts();

    // The product ID
    const { productID } = useParams();

    // Redirect variable
    const redirect = useNavigate();

    // Find the current product
    const currentProduct = allProducts.find(product =>
        product.name.toLowerCase().replaceAll(" ", "-").replaceAll("'", "") === productID
    );

    // Effect to handle redirection if product is not found
    useEffect(() => {
        if (!currentProduct) {
            redirect('*', { replace: true });
        }
    }, [currentProduct]);

    return (
        <section className="productpage">
            <SearchNav />
            <ScrollToTopOnMount />
            <div className="productpage__content-container">
                <div className="productpage-content__img-container">
                    <img
                        className="productpage-content__img"
                        src={`/productimage/${currentProduct.section}/${currentProduct.image}`}
                        alt="" />
                </div>
            </div>
        </section>
    )
}

export default ProductPage