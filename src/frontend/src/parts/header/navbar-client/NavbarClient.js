import styles from './NavbarClient.module.scss'

import logo from '../../../assets/resnow.png'
import profileSVG from '../../../assets/svg/profile.svg'
import settingSVG from '../../../assets/svg/setting.svg'
import notifySVG from '../../../assets/svg/notify.svg'
import {useLocation} from "react-router-dom";


export const NavbarClient = () => {
    const location = useLocation();

    const {pathname} = location;
    const splitLocation = pathname.split("client/");

    return (
        <nav className={styles.menu}>
            <div className={styles.leftSideMenu}>
                <a href={'/client'}>
                    <img src={logo} alt={'logo'}/>
                </a>
                <a href={'/client'}
                   className={splitLocation[0] === "/client" ? styles.active : ""}>Dashboard</a>
                <a href={'/client/terminy'} className={splitLocation[1] === "terminy" ? styles.active : ""}>Termíny</a>
                <a href={'/client/rezervace'}
                   className={splitLocation[1] === "rezervace" ? styles.active : ""}>Rezervace</a>
                <a href={'/client/zakaznici'}
                   className={splitLocation[1] === "zakaznici" ? styles.active : ""}>Zákazníci</a>
                <a href={'/client/zdroje'} className={splitLocation[1] === "zdroje" ? styles.active : ""}>Služby</a>
            </div>
            <div className={styles.rightSideMenu}>
                <div className={styles.iconContainer}>
                    <a href={'/client/nastaveni'}><img src={settingSVG} alt={'icon'}/></a>
                    <a href={'/client/notifikace'}><img src={notifySVG} alt={'icon'}/></a>
                    <a href={'/client/profil'}><img src={profileSVG} alt={'icon'}/></a>
                </div>
                <div className={styles.searchContainer}>
                    <input className={'input-primary search sh sm'} placeholder={'Find me'}/>
                    <button className={'button-primary-outline'} type={'button'}>Search</button>
                </div>
            </div>
        </nav>
    )
}