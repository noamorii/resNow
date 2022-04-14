import styles from './LoginPage.module.scss'
import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import AuthService from "../../../services/auth.service";

const Form = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    let navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        AuthService.login(username, password).then(
            () => {
                console.log('logged');
                const user = AuthService.getCurrentUser();
                console.log(user.roles[0]);
                navigate("/profile");
                window.location.reload();
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                console.log(resMessage);
                setError(resMessage);
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
                autoComplete={'username'}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className={'input-primary'}
                type={'password'}
                value={password}
                autoComplete={'current-password'}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error}
            <button className={'button-primary'} onClick={(e) => login(e)}>Login</button>
        </form>
    )
}

export const LoginPage = () => {
    return (
        <Form/>
    )
}