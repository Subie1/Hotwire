import { useContext } from "react"
import { context } from "../lib/Context"

import SquarePage from "../pages/SquarePage";
import CirclePage from "../pages/CirclePage";
import Footer from "./components/Footer";

const CurrentPage = () => {
    const { page } = useContext(context);
    
    if (page === 0) return (<SquarePage />);
    if (page === 1) return (<CirclePage />);

    return (<SquarePage />)
}

export default function Layout() {
    return (
        <main className="dark w-full h-full bg-background text-text">
            <CurrentPage />
            <Footer />
        </main>
    )
}