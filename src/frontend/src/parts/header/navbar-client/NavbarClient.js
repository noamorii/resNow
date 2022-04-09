import styles from './NavbarClient.module.scss'

import logo from '../../../assets/resnow.png'
import profileSVG from '../../../assets/svg/profile.svg'
import settingSVG from '../../../assets/svg/setting.svg'
import notifySVG from '../../../assets/svg/notify.svg'
import { useLocation } from "react-router-dom";


export const NavbarClient = () => {
    const location = useLocation();

    const { pathname } = location;
    const splitLocation = pathname.split("/");


    return (
        <nav className={styles.menu}>
            <div className={styles.leftSideMenu}>
                <a href={'/dashboard'}>
                    <img src={logo} alt={'logo'}/>
                </a>
                <a href={'/client/dashboard'} className={splitLocation[1] === "dashboard" ? styles.active : ""}>Dashboard</a>
                <a href={'/client/terminy'} className={splitLocation[1] === "terminy" ? styles.active : ""}>Termíny</a>
                <a href={'/client/rezervace'} className={splitLocation[1] === "rezervace" ? styles.active : ""}>Rezervace</a>
                <a href={'/client/zakaznici'} className={splitLocation[1] === "zakaznici" ? styles.active : ""}>Zákazníci</a>
                <a href={'/client/zdroje'} className={splitLocation[1] === "zdroje" ? styles.active : ""}>Zdroje</a>
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