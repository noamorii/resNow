import styles from './DashboardPage.module.scss'
import {useLocation} from "react-router-dom";
import photo from './photo.jpg'
import tennis from './tennis.png'
import star from './img.png'

export const DashboardPageCustomer = () =>{

    const location = useLocation();
    const {pathname} = location;
    const splitLocation = pathname.split("customer/");

    return(
        <div className={styles.container}>
            <nav className={styles.servicesNavigation}>
                <a>Pubs</a>
                <a>Theatre</a>
                <a>Restaurants</a>
                <a>Sport</a>
                <a>Other</a>
            </nav>

            <div className={styles.sections}>
                <p>Your upcoming reservations</p>
                <div className={styles.block}>
                    <img src = {photo}/>
                    <p>Beauty salon BEAUTYBAR</p>
                    <p>Praha, Vodickova 2</p>
                    <div className={styles.rating}>
                        <p>9.8</p>
                        <img src={star}/>
                    </div>
                </div>

                <div className={styles.block}>
                    <img src = {tennis}/>
                    <p>Tennis court Let’s play</p>
                    <p>Praha, Sportovni areal Prazacka</p>
                    <div className={styles.rating}>
                        <p>8.0</p>
                        <img src={star}/>
                    </div>
                </div>
            </div>


        </div>
    )
}