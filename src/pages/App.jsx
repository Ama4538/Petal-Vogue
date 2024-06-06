import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { home } from "../data/data.json"
import Loader from "./Loader.jsx"
import Home from "./Home.jsx";

function App() {
    // Routers for each page
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Loader />
        },
        {
            path: "/home",
            element: <Home home={home} />
        }
    ])

    return (
        <RouterProvider router={router} />
    )
}

export default App;