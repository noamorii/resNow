import {Route, Routes} from "react-router-dom";
import React from 'react';

import {NavbarClient} from "../parts";
import {
    CustomersPageClient,
    DashboardPageClient,
    EventsPageCustomer,
    ResourcesPageClient,
    ReservationsPageCustomer,
    SettingsPageCustomer,
    ProfilePageCustomer
} from "../pages";

export const ClientRoutes = () => {
    return (
        <React.Fragment>
            <NavbarClient/>
            <Routes>
                <Route exact path="/dashboard" element={<DashboardPageClient/>}/>
                <Route exact path="/zdroje" element={<ResourcesPageClient/>}/>
                <Route exact path="/terminy" element={<EventsPageCustomer/>}/>
                <Route exact path="/rezervace" element={<ReservationsPageCustomer/>}/>
                <Route exact path="/zakaznici" element={<CustomersPageClient/>}/>
                <Route exact path="/nastaveni" element={<SettingsPageCustomer/>}/>
                <Route exact path="/profil" element={<ProfilePageCustomer/>}/>
            </Routes>
        </React.Fragment>
    )
}