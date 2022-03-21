import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Welcome from "./pages/Welcome";
import IndexPage from "./pages/IndexPage";
import Nabvar from "./parts/Header/Nabvar";


const App = () => {
    return (
        <BrowserRouter>
            <Nabvar/>
            <Routes>
                <Route exact  path="/" element={<Welcome/>}/>
                <Route exact  path="/beta" element={<IndexPage/>}/>
                <Route exact  path="/about" element={<AboutUs/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
