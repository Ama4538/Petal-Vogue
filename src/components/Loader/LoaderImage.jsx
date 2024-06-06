import { motion } from 'framer-motion';

function LoaderImage({ variants, id }) {
    return (
        <motion.div
            className={`loader__image-container loader__${id}`}
            variants={variants}
        >
            <img className="loader__image" src={`/loadingImages/${id}.jpg`} alt={id} />
        </motion.div>
    );
};

export default LoaderImage;