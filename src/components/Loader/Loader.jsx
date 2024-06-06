import { motion } from 'framer-motion';
import LoaderImage from './LoaderImage';

// Container animation
const container = {
    show: {
        transition: {
            staggerChildren: 0.35,
        }
    }
};

// Main image animation
const loadingMain = {
    hidden: {
        y: 200,
        opacity: 0,
    },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1.6,
        }
    },
}

// Side image animation
const loadingItems = {
    hidden: {
        y: 200,
        opacity: 0,
    },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1.6,
            ease: [0.16, 0.86, 0.64, 0.90]
        }
    },
    exit: {
        y: -200,
        opacity: 0,
        transition: {
            duration: 0.8,
        }
    }
};

function Loader({ setLoading }) {
    return (
        <motion.div
            className="loader"
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            onAnimationComplete={() => setLoading(false)}
        >
            {/* Main image used to transition */}
            <motion.div
                className={`loader__image-container loader__loader-image-1`}
                variants={loadingMain}
            >
                <motion.img
                    className="loader__image"
                    src="/homeimage/women/home-women-background-image-1.jpg"
                    alt="home-women-background-image-1.jpg"
                    layoutId="main-image-1"
                />
            </motion.div>

            {/* ID is image name */}
            <LoaderImage variants={loadingItems} id="loader-image-2"></LoaderImage>
            <LoaderImage variants={loadingItems} id="loader-image-3"></LoaderImage>
            <LoaderImage variants={loadingItems} id="loader-image-4"></LoaderImage>
            <LoaderImage variants={loadingItems} id="loader-image-5"></LoaderImage>
        </motion.div>
    );
}

export default Loader;