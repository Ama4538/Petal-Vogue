import { motion } from 'framer-motion';

function LoaderImage({ variants, id }) {
    return (
        <motion.div
            className={`loader__image-container  loader__image-container-${id}`}
            variants={variants}
        >
            <img className="loader__image" src={`/loadingImages/loader-image-${id}.jpg`} alt={id} />
        </motion.div>
    );
};

export default LoaderImage;