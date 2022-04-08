import {Route, Routes} from "react-router-dom";
import Welcome from "./pages/global/welcome-page/Welcome";
import {DocumentationPage, IndexPage, Test} from "./pages";
import AboutUs from "./pages/global/welcome-page/AboutUs";
import {NavbarClient} from "./parts";
import React from 'react';
import {DashboardPage} from "./pages/client";

export const MainLayoutRoutes = () => {
    return (
        <React.Fragment>
            <NavbarClient/>
            <Routes>
                <Route exact path="/milancu-test" element={<Test/>}/>
                <Route exact path="/dashboard" element={<DashboardPage/>}/>
            </Routes>
        </React.Fragment>
    )
}