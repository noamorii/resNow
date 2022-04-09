import {Route, Routes} from "react-router-dom";
import React from 'react';

import {NavbarCustomer} from "../parts";
import {DashboardPageCustomer, HistoryPage} from "../pages";

export const CustomerRoutes = () => {
    return (
        <React.Fragment>
            <NavbarCustomer/>
            <Routes>
                <Route exact path="/dashboard" element={<DashboardPageCustomer/>}/>
                <Route exact path="/history" element={<HistoryPage/>}/>
            </Routes>
        </React.Fragment>
    )
}