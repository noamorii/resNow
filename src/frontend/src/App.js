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
import {NavbarCustomer} from "./parts";


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


    // <NavbarCustomer/>
    // <Routes>
    //     <Route exact path="/" element={<DashboardPageCustomer/>}/>
    //     <Route exact path="/historie" element={<HistoryPageCustomer/>}/>
    //     <Route exact path="/terminy" element={<EventsPageCustomer/>}/>
    //     <Route exact path="/rezervace" element={<ReservationsPageCustomer/>}/>
    //     <Route exact path="/nastaveni" element={<SettingsPageCustomer/>}/>
    //     <Route exact path="/profil" element={<ProfilePageCustomer/>}/>
    // </Routes>

    return (
        <div>
            <Routes>
                <Route exact path="/" element={<IndexPage/>}/>
                <Route exact path="/login" element={<LoginPage/>}/>
                <Route exact path="/register" element={<RegistrationPage/>}/>

                {regularUser && (
                    <Route path="/app/*" element={<CustomerRoutes/>}/>
                )}

            </Routes>

        </div>
        // <div>
        //     <Routes>
        //         <Route exact path="/" element={<Welcome/>}/>
        //         <Route exact path="/beta" element={<IndexPage/>}/>
        //         <Route exact path="/about" element={<AboutUs/>}/>
        //         <Route exact path="/fe-template-documentation" element={<DocumentationPage/>}/>
        //
        //         <Route exact path="/login" element={<LoginPage/>}/>
        //         <Route exact path="/register" element={<RegistrationPage/>}/>
        //
        //         <Route path="/client/*" element={<ClientRoutes/>}/>
        //         <Route path="/customer/*" element={<CustomerRoutes/>}/>
        //     </Routes>
        // </div>
        // <BrowserRouter>
        //     <Routes>
        //         <Route exact path="/" element={<Welcome/>}/>
        //         <Route exact path="/beta" element={<IndexPage/>}/>
        //         <Route exact path="/about" element={<AboutUs/>}/>
        //         <Route exact path="/fe-template-documentation" element={<DocumentationPage/>}/>
        //
        //         <Route exact path="/login" element={<LoginPage/>}/>
        //         <Route exact path="/register" element={<RegistrationPage/>}/>
        //
        //         <Route path="/client/*" element={<ClientRoutes/>}/>
        //         <Route path="/customer/*" element={<CustomerRoutes/>}/>
        //     </Routes>
        // </BrowserRouter>
    )
}

export default App;
