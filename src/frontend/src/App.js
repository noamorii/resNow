import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";

import AboutUs from "./pages/global/welcome-page/AboutUs";
import Welcome from "./pages/global/welcome-page/Welcome";
import {
    DashboardPageClient,
    DashboardPageCustomer,
    DocumentationPage, EventsPageCustomer, HistoryPageCustomer,
    IndexPage,
    LoginPage, ProfilePageCustomer,
    RegistrationPage, ReservationsPageCustomer, SettingsPageCustomer
} from "./pages";
import {ClientRoutes} from "./routes/ClientRoutes";
import {CustomerRoutes} from "./routes/CustomerRoutes";
import AuthService from "./services/auth.service";
import {NabvarIndex, NavbarCustomer} from "./parts";


const App = () => {

    const [regularUser, setRegularUser] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [systemOwner, setSystemOwner] = useState(false);
    const [systemEmployee, setSystemEmployee] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            setRegularUser(user.roles.includes("REGULAR_USER"));
            setAdmin(user.roles.includes("ADMIN"));
            setSystemOwner(user.roles.includes("SYSTEM_OWNER"));
            setSystemEmployee(user.roles.includes("SYSTEM_EMPLOYEE"));
        }
    }, []);

    return (
        <div>
            <Routes>
                <Route exact path="/" element={<IndexPage user={currentUser}/>}/>
                <Route exact path="/login" element={<LoginPage/>}/>
                <Route exact path="/register" element={<RegistrationPage/>}/>

                {regularUser && (
                    <Route path="/app/*" element={<CustomerRoutes/>}/>
                )}

                {systemOwner && (
                    <Route path="/app/*" element={<ClientRoutes/>}/>
                )}

                {systemEmployee && (
                    <Route path="/app/*" element={<ClientRoutes/>}/>
                )}
            </Routes>
        </div>
    )
}

export default App;
