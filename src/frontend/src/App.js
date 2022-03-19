import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Welcome from "./pages/Welcome";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact  path="/" element={<Welcome/>}/>
                <Route exact  path="/about" element={<AboutUs/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
