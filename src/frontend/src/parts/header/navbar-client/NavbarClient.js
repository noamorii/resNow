import styles from './NavbarClient.module.scss'

import logo from '../../../assets/resnow.png'
import profileSVG from '../../../assets/svg/profile.svg'
import settingSVG from '../../../assets/svg/setting.svg'
import notifySVG from '../../../assets/svg/notify.svg'
import {Link, useLocation} from "react-router-dom";


export const NavbarClient = () => {
    const location = useLocation();

    const {pathname} = location;
    const splitLocation = pathname.split("app/");

    return (
        <nav className={styles.menu}>
            <div className={styles.leftSideMenu}>
                <Link to={'dashboard'}>
                    <img src={logo} alt={'logo'}/>
                </Link>
                <Link to={'dashboard'}
                   className={splitLocation[1] === "dashboard" ? styles.active : ""}>Dashboard</Link>
                <Link to={'terminy'} className={splitLocation[1] === "terminy" ? styles.active : ""}>Termíny</Link>
                <Link to={'rezervace'}
                   className={splitLocation[1] === "rezervace" ? styles.active : ""}>Rezervace</Link>
                <Link to={'zakaznici'}
                   className={splitLocation[1] === "zakaznici" ? styles.active : ""}>Zákazníci</Link>
                <Link to={'zdroje'} className={splitLocation[1] === "zdroje" ? styles.active : ""}>Služby</Link>
            </div>
            <div className={styles.rightSideMenu}>
                <div className={styles.iconContainer}>
                    <Link to={'nastaveni'}><img src={settingSVG} alt={'icon'}/></Link>
                    <Link to={'notifikace'}><img src={notifySVG} alt={'icon'}/></Link>
                    <Link to={'profil'}><img src={profileSVG} alt={'icon'}/></Link>
                </div>
                <div className={styles.searchContainer}>
                    <input className={'input-primary search sh sm'} placeholder={'Find me'}/>
                    <button className={'button-primary-outline'} type={'button'}>Search</button>
                </div>
            </div>
        </nav>
    )
}