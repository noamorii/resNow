import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";


import AboutUs from "./pages/global/welcome-page/AboutUs";
import Welcome from "./pages/global/welcome-page/Welcome";
import {DashboardPageCustomer, DocumentationPage, IndexPage, LoginPage, RegistrationPage} from "./pages";
import {ClientRoutes} from "./routes/ClientRoutes";
import {CustomerRoutes} from "./routes/CustomerRoutes";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Welcome/>}/>
                <Route exact path="/beta" element={<IndexPage/>}/>
                <Route exact path="/about" element={<AboutUs/>}/>
                <Route exact path="/fe-template-documentation" element={<DocumentationPage/>}/>

                <Route exact path="/login" element={<LoginPage/>}/>
                <Route exact path="/register" element={<RegistrationPage/>}/>


                <Route exact path="/dashboard-customer" element={<DashboardPageCustomer/>}/>

                <Route path="/client/*" element={<ClientRoutes/>}/>
                <Route path="/customer/*" element={<CustomerRoutes/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
