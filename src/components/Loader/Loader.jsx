import LoaderImage from './LoaderImage';
import { motion } from 'framer-motion';

// Container Animation
const container = {
    show: {
        transition: {
            staggerChildren: 0.35,
        }
    }
};

// Side Image Animation
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

// Main Animation
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

            {/* ID is image name */}
            <motion.div
                className={`loader__image-container loader__image-1`}
                variants={loadingMain}
            >
                <motion.img
                    className="loader__image"
                    src="/loadingImages/image-1.jpg"
                    alt="image-1"
                    layoutId="main-image-1"
                />
            </motion.div>
            <LoaderImage variants={loadingItems} id="image-2"></LoaderImage>
            <LoaderImage variants={loadingItems} id="image-3"></LoaderImage>
            <LoaderImage variants={loadingItems} id="image-4"></LoaderImage>
            <LoaderImage variants={loadingItems} id="image-5"></LoaderImage>
        </motion.div>
    );
}

export default Loader;