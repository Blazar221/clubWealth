// React Routes
import { BrowserRouter as Router, Outlet, Route, Routes, useLocation, Navigate } from "react-router-dom";
// Pages
import PageCat from "../pages/pageCat";
import PageStarwars from "../pages/pageStarwars";
import PageCovid from "../pages/pageCovid";

const Container = () => {
    return <div>
        <div>This is header</div>
        <div>
            <div>This is the sidebar</div>
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