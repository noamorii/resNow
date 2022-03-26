import {useEffect} from "react";
import {Link} from "react-router-dom";
import filter_img from "../../../../assets/filter.png";
import dashboard_img from "../../../../assets/Dashboard.png";

import styles from './HomeSection.module.scss';

export const HomeSection = () => {

    useEffect(() => {
        document.getElementById('home').addEventListener('mousemove', e => {
            document.querySelectorAll("#home > img").forEach(move => {
                const moving_speed = move.getAttribute("data-speed");
                const x = (e.clientX * moving_speed) / 200;
                const y = (e.clientY * moving_speed) / 200;
                move.style.transform = `translateX(${x}px) translateY(${y}px)`;
            })
        })
    })

    return (
        <div id={'home'} className={styles.home}>
            <div className={styles.appDescription}>
                <h1>Enter the new era <br/>of reservations</h1>
                <p>Don’t be a pussy.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s, when an.</p>
                <div>
                    <Link to={'/register'}>
                        <button type={"button"} className={'button-primary lg bx-sh'}>Try now!</button>
                    </Link>
                    <Link to={'/login'}>
                        <button type={"button"} className={'button-primary-outline lg bx-sh'}>Login</button>
                    </Link>
                </div>
            </div>
            <img src={filter_img} alt={'db'} data-speed={'-2'}/>
            <img src={dashboard_img} alt={'db'} data-speed={'2'}/>
        </div>
    )
}