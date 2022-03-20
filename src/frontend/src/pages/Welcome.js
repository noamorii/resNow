import logo from "../assets/resnow1.png";
import axios from "axios";
import {baseUrl} from '../config/const'
import {useEffect} from "react";
import {Link} from "react-router-dom";

const Welcome = () => {

    useEffect(() => {
        axios.get(`${baseUrl}/welcome`).then(res => {
            console.log(res.data)
            console.log(process.env.NODE_ENV);
        })
    }, [])

    return (
        <div className={'container'}>
            <img src={logo}/>
            <h2>Vítejte, brzy pro Vás vypustíme naší aplikaci</h2>
            <p>Více <Link to={'about'}>zde</Link></p>
        </div>
    );
}

export default Welcome