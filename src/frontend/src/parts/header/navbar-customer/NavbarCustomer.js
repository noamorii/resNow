import styles from './NavbarCustomer.module.scss'

import logo from '../../../assets/resnow.png'
import profileSVG from '../../../assets/svg/profile.svg'
import settingSVG from '../../../assets/svg/setting.svg'
import notifySVG from '../../../assets/svg/notify.svg'
import {useLocation} from "react-router-dom";

export const NavbarCustomer = () => {
    const location = useLocation();

    const {pathname} = location;
    const splitLocation = pathname.split("customer/");

    return (
        <nav className={styles.menu}>
            <div className={styles.leftSideMenu}>
                <a href={'/customer'}>
                    <img src={logo} alt={'logo'}/>
                </a>
                <a href={'/customer'}
                   className={splitLocation[1] === "dashboard" ? styles.active : ""}>Dashboard</a>
                <a href={'/customer/terminy'} className={splitLocation[1] === "terminy" ? styles.active : ""}>Eventy</a>
                <a href={'/customer/rezervace'}
                   className={splitLocation[1] === "rezervace" ? styles.active : ""}>Rezervace</a>
                <a href={'/customer/historie'}
                   className={splitLocation[1] === "historie" ? styles.active : ""}>Historie</a>
            </div>
            <div className={styles.rightSideMenu}>
                <div className={styles.iconContainer}>
                    <a href={'/customer/nastaveni'}><img src={settingSVG} alt={'icon'}/></a>
                    <a href={'/customer/notifikace'}><img src={notifySVG} alt={'icon'}/></a>
                    <a href={'/customer/profil'}><img src={profileSVG} alt={'icon'}/></a>
                </div>
                <div className={styles.searchContainer}>
                    <input className={'input-primary search sh sm'} placeholder={'Find me'}/>
                    <button className={'button-primary-outline'} type={'button'}>Search</button>
                </div>
            </div>
        </nav>
    )
}