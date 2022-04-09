import styles from './NavbarCustomer.module.scss'

import logo from '../../../assets/resnow.png'
import profileSVG from '../../../assets/svg/profile.svg'
import settingSVG from '../../../assets/svg/setting.svg'
import notifySVG from '../../../assets/svg/notify.svg'
import { useLocation } from "react-router-dom";

export const NavbarCustomer = () =>{
    const location = useLocation();

    const { pathname } = location;
    const splitLocation = pathname.split("customer/");

    return (
        <nav className={styles.menu}>
            <div className={styles.leftSideMenu}>
                <a href={'/customer/dashboard'}>
                    <img src={logo} alt={'logo'}/>
                </a>
                <a href={'/customer/dashboard'} className={splitLocation[1] === "dashboard" ? styles.active : ""}>Dashboard</a>
                <a href={'/customer/terminy'} className={splitLocation[1] === "terminy" ? styles.active : ""}>Eventy</a>
                <a href={'/customer/rezervace'} className={splitLocation[1] === "rezervace" ? styles.active : ""}>Rezervace</a>
            </div>
            <div className={styles.rightSideMenu}>
                <div className={styles.iconContainer}>
                    <img src={settingSVG} alt={'icon'}/>
                    <img src={notifySVG} alt={'icon'}/>
                    <img src={profileSVG} alt={'icon'}/>
                </div>
                <div className={styles.searchContainer}>
                    <input className={'input-primary search sh sm'} placeholder={'Find me'}/>
                    <button className={'button-primary-outline'} type={'button'}>Search</button>
                </div>
            </div>
        </nav>
    )
}