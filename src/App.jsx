import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes  from "./components/router/AnimatedRoutes.jsx";

function App() {
    return (
        // Wraps the application in a Router, enabling routing functionality
        <BrowserRouter>
            <AnimatedRoutes />
        </BrowserRouter>
    )
}

export default App;