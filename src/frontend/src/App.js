import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AboutUs from "./pages/global/welcome-page/AboutUs";
import Welcome from "./pages/global/welcome-page/Welcome";
import {DocumentationPage, IndexPage, Test} from "./pages";
import Termin from "./pages/client/client-termin/clientTermin";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact  path="/" element={<Welcome/>}/>
                <Route exact  path="/beta" element={<IndexPage/>}/>
                <Route exact  path="/about" element={<AboutUs/>}/>
                <Route exact  path="/fe-template-documentation" element={<DocumentationPage/>}/>
                <Route exact  path="/milancu-test" element={<Test/>}/>
                <Route exact path="/client/termin" element={<Termin/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
