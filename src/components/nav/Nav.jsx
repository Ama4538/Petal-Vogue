import { Link } from "react-router-dom"

function Nav() {
    return (
        <nav className="nav">
            <Link to = "/home" className = "nav__logo" href="">placeholder</Link>
            <ul className = "nav__list">
                <li>
                    <button>Women</button>
                </li>
                <li>
                    <button>Men</button>
                </li>
                <li>
                    <button>Kid</button>
                </li>
            </ul>
            <ul className = "nav__list">
                <a href="">placeholder</a>
                <a href="">placeholder</a>
                <a href="">placeholder</a>
            </ul>
        </nav>
    )
}

export default Nav