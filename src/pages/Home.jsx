import { motion } from 'framer-motion'
import HomeColumnMain from '../components/home/HomeColumnMain';

function Home({home}) {
    return (
        <section className="home">
            <HomeColumnMain section = "women" data = {home.women} />
        </section>
    )
}

export default Home;