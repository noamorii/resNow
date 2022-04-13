import styles from './RegistrationPage.module.scss'
import {useState} from "react";
import AuthService from "../../../services/auth.service";
import {baseUrl} from "../../../config/const";
import axios from "axios";


const Form = () => {

    const [firstname, setFirstname] = useState('admin');
    const [lastname, setLastname] = useState('admin');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('admin');


    const valid = (e) => {
        e.preventDefault();
        AuthService.register(firstname, lastname, username, email, password).then(
            res => {
                console.log(res);
            }
        );
        // axios.post(
        //     `${baseUrl}/v1/systems/1`
        // ).then(res => console.log(res))

    }

    return (<form className={styles.container}>
        <input
            className={'input-primary'}
            type={'text'}
            value={firstname}
            placeholder={'firstname'}
            onChange={(e) => setFirstname(e.target.value)}
        />
        <input
            className={'input-primary'}
            type={'text'}
            value={lastname}
            placeholder={'lastname'}
            onChange={(e) => {
                setLastname(e.target.value)
            }}
        />
        <input
            className={'input-primary'}
            type={'text'}
            value={username}
            placeholder={'username'}
            onChange={(e) => {
                setUsername(e.target.value)
            }}
        />
        <input
            className={'input-primary'}
            type={'email'}
            value={email}
            placeholder={'email'}
            onChange={(e) => {
                setEmail(e.target.value)
            }}
        />
        <input
            className={'input-primary'}
            type={'password'}
            value={password}
            placeholder={'password'}
            onChange={(e) => {
                setPassword(e.target.value)
            }}
        />
        <button
            className={'button-primary'}
            onClick={e => valid(e)}
        >Registrovat se
        </button>
    </form>)
}

export const RegistrationPage = () => {
    return (<Form/>)
}