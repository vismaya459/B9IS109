// importing from react
import { Outlet } from "react-router-dom";
// importing components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout() {
    return (
        <>
            <Navbar />

            <div className="page">
                <Outlet />
            </div>

            <Footer />
        </>
    );
};
