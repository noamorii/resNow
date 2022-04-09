import {Route, Routes} from "react-router-dom";
import React from 'react';

import {CustomersPage, DashboardPage, EventsPage, ResourcesPage, ReservationsPage} from "../pages";
import {NavbarClient} from "../parts";


export const ClientRoutes = () => {
    return (
        <React.Fragment>
            <NavbarClient/>
            <Routes>
                <Route exact path="/dashboard" element={<DashboardPage/>}/>
                <Route exact path="/zdroje" element={<ResourcesPage/>}/>
                <Route exact path="/terminy" element={<EventsPage/>}/>
                <Route exact path="/rezervace" element={<ReservationsPage/>}/>
                <Route exact path="/zakaznici" element={<CustomersPage/>}/>
            </Routes>
        </React.Fragment>
    )
}