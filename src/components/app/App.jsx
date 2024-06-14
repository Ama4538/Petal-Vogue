import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "../router/AnimatedRoutes.jsx";
import AppProvider from "./AppProvider.jsx";

function App() {
    return (
        // Wraps the application in a Router, enabling routing functionality and provider to get context
        <AppProvider>
            <BrowserRouter>
                <AnimatedRoutes />
            </BrowserRouter>
        </AppProvider>
    )
}

export default App;