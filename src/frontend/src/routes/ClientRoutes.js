import {Route, Routes} from "react-router-dom";
import React from 'react';

import {NavbarClient} from "../parts";
import {
    CustomersPageClient,
    DashboardPageClient,
    ResourcesPageClient,
    EventsPageClient,
    SettingsPageClient,
    ProfilePageClient
} from "../pages";

export const ClientRoutes = () => {
    return (<React.Fragment>
            <NavbarClient/>
            <Routes>
                <Route exact path="/dashboard" element={<DashboardPageClient/>}/>
                <Route exact path="/zdroje" element={<ResourcesPageClient/>}/>
                <Route exact path="/terminy" element={<EventsPageClient/>}/>
                <Route exact path="/rezervace" element={<ResourcesPageClient/>}/>
                <Route exact path="/zakaznici" element={<CustomersPageClient/>}/>
                <Route exact path="/nastaveni" element={<SettingsPageClient/>}/>
                <Route exact path="/profil" element={<ProfilePageClient/>}/>
                {/*<Route exact path="*" element={<DashboardPageClient/>}/>*/}
            </Routes>
        </React.Fragment>)
}