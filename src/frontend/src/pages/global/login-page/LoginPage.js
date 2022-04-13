import styles from './LoginPage.module.scss'
import {useState} from "react";
import AuthService from "../../../services/auth.service";

const Form = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = (e) => {
        e.preventDefault();
        AuthService.login(username, password).then(
            () => {
                console.log('logged');
                const user = AuthService.getCurrentUser();
                console.log(user.roles[0]);
            },
            (error) => {
                console.log(error)
            }
        )
    }

    return (
        <form className={styles.form}>
            <input
                className={'input-primary'}
                type={'text'}
                value={username}
                placeholder={'username'}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className={'input-primary'}
                type={'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className={'button-primary'} onClick={(e) => login(e)}>Login</button>
        </form>
    )
}

export const LoginPage = () => {
    return (
        <Form/>
    )
}