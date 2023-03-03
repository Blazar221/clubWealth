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
    return <div className="d-flex">
        <div style={{ width: "15%" }}>
            <Sidebar />
        </div>
        <div>
            <Header />
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