import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Welcome from "./pages/Welcome";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/about" element={<AboutUs/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
