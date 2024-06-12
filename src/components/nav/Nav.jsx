import CustomLink from "../router/CustomLink";

function Nav({ setActiveSection = null, activeSection = "null", cartAmount = 0}) {
    return (
        <nav
            className="nav" >
            <CustomLink to="/home" className="nav__logo" />
            <ul className="nav__list nav__list-button-container">
                {/* Print each tab for each section */}
                {["women", "men", "kid"].map((element, index) => (
                    <li key={index}>
                        <button
                            className='nav__buttons'
                            onClick={() => setActiveSection(element)}
                            data-status={`${activeSection === element ? 'active' : 'inactive'}`}
                        >
                            <p>{element}</p>
                        </button>
                    </li>
                ))}
            </ul>
            <ul className="nav__list nav__list-icon-container">
                <CustomLink to="/search" className="nav__list-icon" />
                <CustomLink to="/home" className="nav__list-icon" />
                {/* Manage cart amount display*/}
                <CustomLink
                    to="/cart"
                    className="nav__list-icon"
                    dataVisible={cartAmount !== 0 ? "visible" : "hidden"}
                    dataAmount={cartAmount}
                />
            </ul>
        </nav >
    )
}

export default Nav