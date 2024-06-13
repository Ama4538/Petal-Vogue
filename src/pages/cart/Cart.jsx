import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'
import Nav from "../../components/nav/Nav";
import Banner from "../../components/banner/Banner";


function Cart({ setInitalState, cartInventory }) {
    // State used to manage active section when returning to home page
    const [activeSection, setActiveSection] = useState("null")

    // Used to redirect the users
    const redirect = useNavigate();

    // When the nav is press manage the section
    useEffect(() => {
        // Prevent auto redirect on mount
        if (activeSection !== "null") {
            setInitalState(activeSection)
            redirect('/home');
        }
    }, [activeSection])

    // Main cart animation
    const cartAnimation = {
        exit: {
            opacity: 0,
            transition: {
                duration: 0.15,
            }
        }
    }

    return (
        <motion.section
            className="cart"
            variants={cartAnimation}
            exit="exit"
        >
            <Nav setActiveSection={setActiveSection} cartAmount={cartInventory.length} />
            <article className="cart__content-container">
                <div className='cart__banner-container'>
                    <Banner
                        title={"You're Almost There!"}
                        subtitle={ "Complete Your Purchase and Enjoy Your New Look"}
                        section={"exit"}
                    ></Banner>
                </div>
                <h2 className="cart__title"> Shopping Cart</h2>
                <div className="cart__content">
                    <div className="cart__display">
                        {cartInventory.map(product => {
                            return (
                                <div className="cart-display__product" key={product.name}>
                                    <div className="cart-product__img-container">
                                        <img
                                            src={`./productimage/${product.section}/${product.image}`}
                                            alt={product.image}
                                            className="cart-product__img" />
                                    </div>
                                    <div className="cart-product__content-container">
                                        <div className="cart-product__upper-content">
                                            <div className="cart-product__information">
                                                <p className="cart-product__name"> {product.name}</p>
                                                <p className="cart-product__additional"> Color: Red</p>
                                                <p className="cart-product__additional"> Size: Medium</p>
                                                <p className="cart-product__edit"> Edit</p>
                                            </div>
                                            <p className="cart-product__price">${product.price}</p>
                                        </div>
                                        <div className="cart-product__lower-content">

                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="cart__summary">

                    </div>
                </div>

            </article>
        </motion.section>
    )
}

export default Cart