import React from 'react';
import {Route, Routes} from "react-router-dom";
import {RegistrationPage, Test} from "./pages";
import {NavbarClient} from "./parts";
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