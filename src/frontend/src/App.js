import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AboutUs from "./pages/global/welcome-page/AboutUs";
import Welcome from "./pages/global/welcome-page/Welcome";
import {DocumentationPage, IndexPage, RegistrationPage, Test} from "./pages";
import {MainLayoutRoutes} from "./MainLayoutRoutes";
import React from "react";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Welcome/>}/>
                <Route exact path="/beta" element={<IndexPage/>}/>
                <Route exact path="/about" element={<AboutUs/>}/>
                <Route exact path="/fe-template-documentation" element={<DocumentationPage/>}/>
                <Route exact path="/register" element={<RegistrationPage/>}/>




                <Route path="*" element={<MainLayoutRoutes/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
