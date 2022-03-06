import logo from './logo.svg';
import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";

const Welcome = () => {

    const [message, setMessage] = useState('Loaduju...');

    const fetchMessage = () =>{
        axios.get("http://localhost:8080/").then(res =>{
            setMessage(res.data);
        })
    }

    useEffect(()=>{
        fetchMessage()
    },[])

    return (
        <div>
            {message}
        </div>
    )
}

function App() {
    return (
        <div>
            <Welcome/>
        </div>
    );
}

export default App;
