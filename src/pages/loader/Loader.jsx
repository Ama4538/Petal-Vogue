import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import LoaderImage from './LoaderImage';

function Loader() {
    // The state of the loading animation
    const [loading, setLoading] = useState(true);
    const redirect = useNavigate();

    // A array used to generate images 
    const generateImageArray = Array.from({ length: 8 }, (_, index) => index + 1)

    console.log(generateImageArray);
    // Redirect to home page after loading animation
    useEffect(() => {
        if (!loading) {
            redirect('/home');
        }
    }, [loading])

    // Container animation
    const container = {
        show: {
            transition: {
                staggerChildren: 0.25,
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
                delay: 2.25,
                duration: 1.2,
                ease: [0.16, 0.86, 0.64, 0.90]
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
                duration: 1.2,
                ease: [0.16, 0.86, 0.64, 0.90]
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.6,
            }
        },
    };

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
                className={`loader__image-container loader__image-container-main`}
                variants={loadingMain}
            >
                <motion.img
                    className="loader__image"
                    src="/homeimage/women/home-women-background-image-1.jpg"
                    alt="home-women-background-image-1.jpg"
                    layoutId="main-image-1"
                />
            </motion.div>

            {generateImageArray.map((_, index) => {
                return (
                    <LoaderImage
                        key={`${index + 1}Loader`}
                        variants={loadingItems}
                        id={index + 1}
                    />
                )
            })}


        </motion.div>
    );
}

export default Loader;