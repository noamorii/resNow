import {Route, Routes} from "react-router-dom";
import React from 'react';

import {NavbarCustomer} from "../parts";
import {
    DashboardPageCustomer,
    EventsPageCustomer,
    HistoryPageCustomer, LoginPage,
    ProfilePageCustomer, RegistrationPage,
    ReservationsPageCustomer,
    SettingsPageCustomer
} from "../pages";

export const CustomerRoutes = () => {
    return (
        <React.Fragment>
            <NavbarCustomer/>
            <Routes>
                <Route exact path="/" element={<DashboardPageCustomer/>}/>
                <Route exact path="/historie" element={<HistoryPageCustomer/>}/>
                <Route exact path="/terminy" element={<EventsPageCustomer/>}/>
                <Route exact path="/rezervace" element={<ReservationsPageCustomer/>}/>
                <Route exact path="/nastaveni" element={<SettingsPageCustomer/>}/>
                <Route exact path="/profil" element={<ProfilePageCustomer/>}/>
            </Routes>
        </React.Fragment>
    )
}