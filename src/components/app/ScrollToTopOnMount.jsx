import { useEffect } from "react";

function ScrollToTopOnMount() {
    // Scrolls the window to the top
    useEffect(() => {
        window.scrollTo(0, 0); 
    }, []);

    return null; 
}

export default ScrollToTopOnMount