import styles from './NavbarCustomer.module.scss'

import logo from '../../../assets/resnow.png'
import profileSVG from '../../../assets/svg/profile.svg'
import settingSVG from '../../../assets/svg/setting.svg'
import notifySVG from '../../../assets/svg/notify.svg'
import {Link, useLocation} from "react-router-dom";

export const NavbarCustomer = () => {
    const location = useLocation();

    const {pathname} = location;
    const splitLocation = pathname.split("app/");

    return (
        <nav className={styles.menu}>
            <div className={styles.leftSideMenu}>
                <Link to={"app"}>
                    <img src={logo} alt={'logo'}/>
                </Link>
                <Link to={"app/terminy"}>
                    Eventy
                </Link>
                <a href={'/app'}
                   className={splitLocation[0] === "/app" ? styles.active : ""}>Dashboard</a>
                <a href={'/app/terminy'} className={splitLocation[1] === "terminy" ? styles.active : ""}>Eventy</a>
                <a href={'/app/rezervace'}
                   className={splitLocation[1] === "rezervace" ? styles.active : ""}>Rezervace</a>
                <a href={'/app/historie'}
                   className={splitLocation[1] === "historie" ? styles.active : ""}>Historie</a>
            </div>
            <div className={styles.rightSideMenu}>
                <div className={styles.iconContainer}>
                    <a href={'/app/nastaveni'}><img src={settingSVG} alt={'icon'}/></a>
                    <a href={'/app/notifikace'}><img src={notifySVG} alt={'icon'}/></a>
                    <a href={'/app/profil'}><img src={profileSVG} alt={'icon'}/></a>
                </div>
                <div className={styles.searchContainer}>
                    <input className={'input-primary search sh sm'} placeholder={'Find me'}/>
                    <button className={'button-primary-outline'} type={'button'}>Search</button>
                </div>
            </div>
        </nav>
    )
}