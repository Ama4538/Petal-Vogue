import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'
import Nav from "../../components/nav/Nav";


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
                duration: 0.25,
            }
        }
    }

    return (
        <motion.section
            className="cart"
            variants={cartAnimation}
            exit="exit"
        >
            <Nav setActiveSection={setActiveSection} cartAmount={cartInventory.length}/>
            <article className="cart__content-container">
                <div className="cart__content">
                    <h2 className="cart-content__title"> My Shopping Cart</h2>
                    <div className="cart__display">
                        
                    </div>
                </div>
                <div className="cart__summary"></div>
            </article>
        </motion.section>
    )
}

export default Cart