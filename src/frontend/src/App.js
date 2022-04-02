import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AboutUs from "./pages/global/welcome-page/AboutUs";
import Welcome from "./pages/global/welcome-page/Welcome";
import {DocumentationPage, IndexPage, Test} from "./pages";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact  path="/" element={<Welcome/>}/>
                <Route exact  path="/beta" element={<IndexPage/>}/>
                <Route exact  path="/about" element={<AboutUs/>}/>
                <Route exact  path="/fe-template-documentation" element={<DocumentationPage/>}/>
                <Route exact  path="/milancu-test" element={<Test/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
