import CustomLink from "../router/CustomLink";
import { useCartInventory, useWishlistInventory } from '../app/Hook.jsx';

function Nav({ handleActiveSection, activeSection }) {
    // Custom hook
    const { cartAmount } = useCartInventory()
    const { wishlistAmount } = useWishlistInventory();

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
            <div className="nav__list nav__list-icon-container">
                <CustomLink to="/search" className="nav__list-icon" />
                <CustomLink
                    to="/wishlist"
                    className="nav__list-icon"
                    dataVisible={wishlistAmount !== 0 ? "visible" : "hidden"}
                    dataAmount={wishlistAmount}
                />
                {/* Manage cart amount display*/}
                <CustomLink
                    to="/cart"
                    className="nav__list-icon"
                    dataVisible={cartAmount !== 0 ? "visible" : "hidden"}
                    dataAmount={cartAmount}
                />
            </div>
        </nav >
    )
}

export default Nav