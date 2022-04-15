import styles from './RegistrationPage.module.scss'
import {useEffect, useState} from "react";
import AuthService from "../../../services/auth.service";
import logo from './../../../assets/resnow.png'
import {useNavigate} from "react-router-dom";
import ReactTooltip from "react-tooltip";

const Form = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [provider, setProvider] = useState(true);
    const [customer, setCustomer] = useState(false);

    const [error, setError] = useState('');

    let navigate = useNavigate();

    useEffect(() => {
        AuthService.logout();
    }, [])

    const valid = (e) => {
        e.preventDefault();

        const userType = provider ? 1 : 2;

        if (firstname.trim() == 0 ||
            lastname.trim() == 0 ||
            username.trim() == 0 ||
            email.trim() == 0 ||
            password.trim() == 0
        ) {
            setError('Please fill data')
        } else {

        }

        // AuthService.register(firstname, lastname, username, email, password, userType).then(
        //     () => {
        //         navigate('/login')
        //         window.location.reload();
        //     },
        //     (error) => {
        //         const resMessage =
        //             (error.response &&
        //                 error.response.data &&
        //                 error.response.data.message) ||
        //             error.message ||
        //             error.toString();
        //         console.log(resMessage);
        //         setError(resMessage);
        //     }
        // );
    }

    return (
        <form className={styles.form} onSubmit={e => valid(e)}>
            <div className={styles.flexRow}>
                <img src={logo} alt={'logo'}/>
                <h2>Registration</h2>
            </div>
            <div className={styles.flexRow}>
                <div className={styles.leftInputs}>
                    <label>
                        Firstname
                        <input
                            className={'input-primary '.concat(error.trim() != 0 ? "error" : "")}
                            type={'text'}
                            value={firstname}
                            placeholder={'John'}
                            onClick={() => setError('')}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </label>

                    <label>
                        Email
                        <input
                            className={'input-primary '.concat(error.trim() != 0 ? "error" : "")}
                            type={'email'}
                            value={email}
                            placeholder={'john@example.com'}
                            onClick={() => setError('')}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                    </label>

                    <label>
                        Password
                        <input
                            className={'input-primary '.concat(error.trim() != 0 ? "error" : "")}
                            type={'password'}
                            value={password}
                            autoComplete="new-password"
                            onClick={() => setError('')}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                    </label>
                    <label
                        data-tip data-for='provider'
                        className={provider ? styles.labelChoose.concat(" ").concat(styles.active) : styles.labelChoose}>
                        Provider
                        <input type={'radio'} value={1} checked={provider ?? "chechked"} onChange={() => {
                            setCustomer(!customer);
                            setProvider(!provider)
                        }}/>
                    </label>
                    <ReactTooltip id='provider' type='dark' effect='solid' place={'left'}>
                        <span>Provider account is used for <br/> people who want to provide<br/> reservations.</span>
                    </ReactTooltip>
                </div>

                <div className={styles.rightInputs}>
                    <label>
                        Lastname
                        <input
                            className={'input-primary '.concat(error.trim() != 0 ? "error" : "")}
                            type={'text'}
                            value={lastname}
                            placeholder={'Lemon'}
                            onClick={() => setError('')}
                            onChange={(e) => {
                                setLastname(e.target.value)
                            }}
                        />
                    </label>
                    <label>
                        Username
                        <input
                            className={'input-primary '.concat(error.trim() != 0 ? "error" : "")}
                            type={'text'}
                            value={username}
                            placeholder={'lemonade'}
                            autoComplete="username"
                            onClick={() => setError('')}
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                        />
                    </label>
                    <label>
                        Repeat Password
                        <input
                            className={'input-primary '.concat(error.trim() != 0 ? "error" : "")}
                            type={'password'}
                            value={rePassword}
                            autoComplete="new-password"
                            onClick={() => setError('')}
                            onChange={(e) => {
                                setRePassword(e.target.value)
                            }}
                        />
                    </label>
                    <label data-tip data-for='customer'
                           className={customer ? styles.labelChoose.concat(" ").concat(styles.active) : styles.labelChoose}>
                        Customer
                        <input type={'radio'} value={2} checked={customer ?? "checked"} onChange={() => {
                            setCustomer(!customer);
                            setProvider(!provider)
                        }}/>
                    </label>
                    <ReactTooltip id='customer' type='dark' effect='solid' place={'right'}>
                        <span>Customer account is<br/> kind of account that is <br/>used just for making<br/> reservations.</span>
                    </ReactTooltip>

                </div>
            </div>
            <div className={styles.errorMessage}>
                {error}
            </div>
            <button
                type={'submit'}
                className={'button-primary bx-sh'}
            >Register
            </button>
        </form>
    )
}

export const RegistrationPage = () => {
    return (
        <div className={styles.container}>
            <Form/>
        </div>
    )
}