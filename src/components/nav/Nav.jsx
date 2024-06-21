import CustomLink from "../router/CustomLink";
import { useCartInventory, useWishlistInventory } from '../app/Hook.jsx';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Nav({ handleActiveSection, activeSection }) {
    // Custom hook
    const { cartAmount } = useCartInventory()
    const { wishlistAmount } = useWishlistInventory();
    // Status of the menu tab
    const [openStatus, setOpenStatus] = useState(false)

    // Used for directions
    const location = useLocation();
    const redirect = useNavigate();

    // Handle the location when nav icon has been press
    function handleLocation(dest) {
        if (location.pathname !== dest) {
            redirect(dest);
        }
    }

    return (
        <nav className="nav" >
            <div className="nav__logo-container">
                <CustomLink to="/home" className="nav__logo" />
            </div>
            <ul className="nav__list nav__list-button-container">
                {/* Print each tab for each section */}
                {["women", "men", "kids"].map((element, index) => (
                    <li key={index}>
                        <button
                            className='nav__buttons'
                            onClick={() => handleActiveSection(element)}
                            data-status={`${activeSection === element ? 'active' : 'inactive'}`}
                        >
                            <p>{element}</p>
                        </button>
                    </li>
                ))}
            </ul>

            <div
                className="nav__list nav-list__icon-wrapper"
                data-open={openStatus}
            >
                <button
                    className="nav__menu"
                    onClick={() => { setOpenStatus(!openStatus) }}
                ></button>
                <div className="nav__icon-holder">
                    <button
                        className="nav-icons"
                        onClick={() => handleLocation("/search")}
                    ></button>
                </div>
                <div className="nav__icon-holder">
                    <button
                        className="nav-icons"
                        onClick={() => handleLocation("/wishlist")}
                        data-visible={wishlistAmount !== 0 ? "visible" : "hidden"}
                        data-amount={wishlistAmount}
                    ></button>
                </div>
                <div className="nav__icon-holder">
                    <button
                        className="nav-icons"
                        onClick={() => handleLocation("/cart")}
                        data-visible={cartAmount !== 0 ? "visible" : "hidden"}
                        data-amount={cartAmount}
                    ></button>
                </div>
            </div>
        </nav >
    )
}

export default Nav