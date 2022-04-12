import './App.scss';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";

import AboutUs from "./pages/global/welcome-page/AboutUs";
import Welcome from "./pages/global/welcome-page/Welcome";
import {
    DashboardPageClient,
    DashboardPageCustomer,
    DocumentationPage,
    IndexPage,
    LoginPage,
    RegistrationPage
} from "./pages";
import {ClientRoutes} from "./routes/ClientRoutes";
import {CustomerRoutes} from "./routes/CustomerRoutes";
import AuthService from "./services/auth.service";


const App = () => {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
    };



    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                    bezKoder
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                            Home
                        </Link>
                    </li>
                    {showModeratorBoard && (
                        <li className="nav-item">
                            <Link to={"/mod"} className="nav-link">
                                Moderator Board
                            </Link>
                        </li>
                    )}
                    {showAdminBoard && (
                        <li className="nav-item">
                            <Link to={"/admin"} className="nav-link">
                                Admin Board
                            </Link>
                        </li>
                    )}
                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/user"} className="nav-link">
                                User
                            </Link>
                        </li>
                    )}
                </div>
                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {currentUser.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </div>
                )}
            </nav>
            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<DashboardPageCustomer/>} />
                    <Route path="/home" element={<DashboardPageClient/>} />
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/register" element={<RegistrationPage/>} />
                </Routes>
            </div>
        </div>
        /*<BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Welcome/>}/>
                <Route exact path="/beta" element={<IndexPage/>}/>
                <Route exact path="/about" element={<AboutUs/>}/>
                <Route exact path="/fe-template-documentation" element={<DocumentationPage/>}/>

                <Route exact path="/login" element={<LoginPage/>}/>
                <Route exact path="/register" element={<RegistrationPage/>}/>

                <Route path="/client/!*" element={<ClientRoutes/>}/>
                <Route path="/customer/!*" element={<CustomerRoutes/>}/>
            </Routes>
        </BrowserRouter>*/
    )
}

export default App;
