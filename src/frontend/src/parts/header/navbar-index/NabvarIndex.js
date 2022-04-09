import logo from "../../../assets/resnow.png";
import {Link} from "react-router-dom";

import styles from './NavbarIndex.module.scss'

export const NabvarIndex = () => {

    return (
        <div className={styles.topNav}>
            <img src={logo} alt={'logo'}/>
            <span className={styles.linksContainer}>
                <a href={'#home'}>Home</a>
                <a href={'#about'}>About</a>
                <a href={'#pricing'}>Pricing</a>
                <a href={'#contact'}>Contact</a>
            </span>
            <span className={styles.buttonsContainer}>

                <Link to={'/login'}>
                    <button type={"button"} className={'button-primary-outline'}>
                        Login
                    </button>
                </Link>

                <Link to={'/register'}>
                    <button type={"button"} className={'button-primary'}>
                        Register
                    </button>
                </Link>

            </span>
        </div>
    );
}