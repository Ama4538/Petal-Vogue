import { useEffect } from 'react';
import LoaderImage from './LoaderImage';
import { motion, easeInOut } from 'framer-motion';

const container = {
    show: {
        transition: {
            staggerChildren: 0.35,
        }
    }
};

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
        }
    },
    exit: {
        y: -200,
        opacity: 0,
        transition: {
            duration: 0.8,
            ease: easeInOut,
        }
    }
};

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
            initial='hidden'
            animate='show'
            exit='exit'
            onAnimationComplete={() => setLoading(false)}
        >

            <LoaderImage variants={loadingMain} id="image-1"></LoaderImage>
            <LoaderImage variants={loadingItems} id="image-2"></LoaderImage>
            <LoaderImage variants={loadingItems} id="image-3"></LoaderImage>
            <LoaderImage variants={loadingItems} id="image-4"></LoaderImage>
            <LoaderImage variants={loadingItems} id="image-5"></LoaderImage>
        </motion.div>
    );
}

export default Loader;