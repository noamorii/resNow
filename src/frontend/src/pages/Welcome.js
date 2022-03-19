import logo from "../rynary.png";
import axios from "axios";
import { baseUrl } from '../config/const'
import {useEffect} from "react";

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
            <p>Více <a href='about'>zde</a></p>
        </div>
    );
}

export default Welcome