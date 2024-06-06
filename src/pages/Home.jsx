import { motion } from 'framer-motion'
import HomeColumnMain from '../components/home/HomeColumnMain.jsx';
import Nav from '../components/nav/Nav.jsx';

function Home({home}) {
    return (
        <section className="home">
            <Nav></Nav>
            <HomeColumnMain section = "women" data = {home.women} />
        </section>
    )
}

export default Home;