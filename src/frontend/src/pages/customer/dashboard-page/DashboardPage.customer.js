import styles from './DashboardPage.module.scss'
import {useLocation} from "react-router-dom"
import photo from './photo.jpg'
import tennis from './tennis.png'
import star from './img.png'
import prof from './profile.png'
import leftButton from './leftButton.svg'
import rightButton from './rightButton.svg'
import {useLocation} from "react-router-dom"


export const DashboardPageCustomer = () =>{

    const location = useLocation();
    const {pathname} = location;
    const splitLocation = pathname.split("customer/");

    return(
        <div className={styles.container}>
            <nav className={styles.servicesNavigation}>
                <a href={'/customer/dashboard/pubs'}
                   className={splitLocation[1] === "pubs" ? styles.active : ""}>Pubs</a>
                <a href={'/customer/dashboard/theatre'}
                   className={splitLocation[1] === "theatre" ? styles.active : ""}>Theatre</a>
                <a href={'/customer/dashboard/restaurants'}
                   className={splitLocation[1] === "restaurants" ? styles.active : ""}>Restaurants</a>
                <a href={'/customer/dashboard/sport'}
                   className={splitLocation[1] === "sport" ? styles.active : ""}>Sport</a>
                <a href={'/customer/dashboard/other'}
                   className={splitLocation[1] === "other" ? styles.active : ""}>Other</a>
            </nav>


            <div className={styles.upcomingSections}>
                <p className={styles.title}>Your upcoming reservations</p>
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

                <div className={styles.buttons}>
                    <button><img src={leftButton}/></button>
                    <button><img src={rightButton}/></button>
                </div>
            </div>


            <div className={styles.sections}>
                <p className={styles.title}>Recent visits</p>
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

                <div className={styles.buttons}>
                    <button><img src={leftButton}/></button>
                    <button><img src={rightButton}/></button>
                </div>
            </div>


            <div className={styles.sections}>
                <p className={styles.title}>The best of RESNOW</p>
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

                <div className={styles.buttons}>
                    <button><img src={leftButton}/></button>
                    <button><img src={rightButton}/></button>
                </div>
            </div>


            <div className={styles.reviews}>
                <p className={styles.title}>Recent reviews</p>
                <div className={styles.block}>
                    <img src = {prof}/>
                    <p>Beauty salon BEAUTYBAR</p>
                    <text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</text>
                    <p>Petr, today, 12:00</p>
                </div>

                <div className={styles.buttons}>
                    <button><img src={leftButton}/></button>
                    <button><img src={rightButton}/></button>
                </div>
            </div>



        </div>
    )
}