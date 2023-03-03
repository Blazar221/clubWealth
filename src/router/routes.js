// React Routes
import { BrowserRouter as Router, Outlet, Route, Routes, useLocation, Navigate } from "react-router-dom";
// Pages
import PageCat from "../pages/pageCat";
import PageStarwars from "../pages/pageStarwars";
import PageCovid from "../pages/pageCovid";
// Components
import Header from "../components/header";
import Sidebar from "../components/sidebar";

const Container = () => {
    const activePath = useLocation().pathname

    const headerName = (activePath) => {
        switch (activePath) {
            case "/":
                return "Starwars"
            case "/covid":
                return "Covid"
            default:
                return "Cat"
        }
    }

    return <div className="d-flex">
        <Sidebar />
        <div className="p-0 ps-3 container-fluid">
            <Header name={headerName(activePath)} />
            <Outlet />
        </div>
    </div>
}

const CWRoutes = () => {
    return <Router>
        <Routes>
            <Route element={<Container />}>
                <Route path="/" element={<PageStarwars />} />
                <Route path="/cat" element={<PageCat />} />
                <Route path="/covid" element={<PageCovid />} />
            </Route>
        </Routes>
    </Router >
}

export default CWRoutes;