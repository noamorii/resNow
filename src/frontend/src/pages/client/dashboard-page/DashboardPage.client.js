import styles from './DashboardPage.module.scss'
import journals from './../../../assets/svg/journals.svg'
import journalMedical from './../../../assets/svg/journal-medical.svg'
import calendar2 from './../../../assets/svg/calendar2-event.svg'
import pin from './../../../assets/svg/pin.svg'
import person from './../../../assets/svg/person.svg'
import React, {useEffect, useState} from "react";
import axios from "axios";
import {baseUrl} from "../../../config/const";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import {Modal} from "./modalWindow/Modal";
import {Link} from "react-router-dom";
import {LocalDate, LocalDateTime} from "local-date";
import authHeader from "../../../services/auth-header";
import {ChartReservation} from "./ChartReservation";

ChartJS.register(ArcElement, Tooltip, Legend);

const dataWithoutLabel = {
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19],
            backgroundColor: [
                'rgb(186,202,232)',
                'rgb(134,211,235)',
            ],
            borderColor: [
                'rgb(186,202,232)',
                'rgb(134,211,235)',
            ],
            borderWidth: 1,
        },
    ],
};

const PieChart = () => {
    const [show, setShow] = useState(false);

    const current = new Date();

    const data = {
        labels: ['Tenisový kurt', 'Florbalová hala'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19],
                backgroundColor: [
                    'rgb(186,202,232)',
                    'rgb(134,211,235)',
                ],
                borderColor: [
                    'rgb(186,202,232)',
                    'rgb(134,211,235)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className={styles.kolacGraph}>
            <p>
                {current.getDate()}.{current.getMonth() + 1}.{current.getFullYear()}
            </p>
            <div className={styles.pie}>
                <Pie data={data} options={{
                    maintainAspectRatio: false
                }}/>
            </div>
            {/*<button type={'button'} onClick={() => setShow(true)}*/}
            {/*        className={'button-primary '.concat(styles.button)}>Zobrazit více*/}
            {/*</button>*/}
            {/*<Modal onClose={() => setShow(false)} show={show} data={dataWithoutLabel}/>*/}
        </div>
    )
}

export const getDate = (year, month, day) => {
    if (month < 10) {
        month = "0".concat(month.toString());
    }
    if (day < 10) {
        day = "0".concat(day.toString());
    }

    return year + "-" + month + "-" + day;
}

export const DashboardPageClient = () => {

    const [todayReservation, setTodayReservation] = useState(0);
    const [allReservation, setAllReservation] = useState(0);
    const [allEvents, setAllEvents] = useState(0);
    const [allPlace, setAllPlace] = useState(0);
    const [allCustomers, setAllCustomers] = useState(0);
    const [allEmployee, setAllEmployee] = useState(0);
    const [show, setShow] = useState(false);

    const [feedbacks, setFeedbacks] = useState([]);
    const [customers, setCustomers] = useState(0);
    const [resources, setResources] = useState(0);
    const [reservations, setReservations] = useState(0);

    useEffect(async () => {
        const fetchFeedbacks = await Promise.any([
                axios.get(
                    `${baseUrl}/systems/my/feedback`,
                    {headers: authHeader()}
                )
            ]
        )
        setFeedbacks(fetchFeedbacks.data)

        const fetchCustomers = await Promise.any([
                axios.get(`${baseUrl}/systems/my/customers`,
                    {headers: authHeader()})
            ]
        )
        fetchCustomers.data.map(item => item.age)
            .filter((value, index, self) => self.indexOf(value) === index)
        setCustomers(fetchCustomers.data.length)

        const fetchSources = await Promise.any([
                axios.get(
                    `${baseUrl}/systems/my/sources`,
                    {headers: authHeader()})
            ]
        )
        setResources(fetchSources.data.length)

        const fetchReservations = await Promise.any(
            [
                axios.get(
                    `${baseUrl}/systems/reservations`,
                    {headers: authHeader()}
                )
            ]
        )
        setReservations(fetchReservations.data.length)

        const today = () => {
            const today = new Date();
            const year = today.getFullYear();
            let month = "";
            let date = "";
            if (today.getMonth() < 10) {
                month = "0" + Number(today.getMonth() + 1);
            } else {
                month = today.getMonth();
            }
            if (today.getDate() < 10) {
                date = "0" + Number(today.getMonth() + 1);
            } else {
                date = today.getDate();
            }
            const day = year + "-" + month + "-" + date;
            return day;
        }

        const fetchToday = await Promise.any(
            [
                axios.get(
                    `${baseUrl}/systems/reservations/today`,
                    {
                        headers: authHeader(),
                        params: {"fromDate": today()}
                    }
                )
            ]
        )
        setTodayReservation(fetchToday.data.length)

        const fetchEvents = await Promise.any([
            axios.get(`${baseUrl}/systems/my/all/events`,
                {headers: authHeader()}
            )
        ])
        setAllEvents(fetchEvents.data.length)

    }, [])


    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.topContent}>
                    <div className={styles.cards}>
                        <img src={journals} alt={'icon'}/>
                        <p>{todayReservation}</p>
                        <button className={'button-primary '.concat(styles.button)} onClick={() => setShow(true)}><Link
                            to={'/app/rezervace'}>Dnešní rezervace</Link>
                        </button>
                        {/*<Modal onClose={() => setShow(false)} show={show} data={dataWithoutLabel}/>*/}

                    </div>
                    <div className={styles.cards}>
                        <img src={journalMedical} alt={'icon'}/>
                        <p>{reservations}</p>
                        <button className={'button-primary '.concat(styles.button)}><Link
                            to={'/app/rezervace'}>Rezervace</Link>
                        </button>
                    </div>
                    <div className={styles.cards}>
                        <img src={calendar2} alt={'icon'}/>
                        <p>{allEvents}</p>
                        <button className={'button-primary '.concat(styles.button)}><Link
                            to={'/app/terminy'}>Termíny</Link>
                        </button>
                    </div>
                    <div className={styles.cards}>
                        <img src={pin} alt={'icon'}/>
                        <p>{resources}</p>
                        <button className={'button-primary '.concat(styles.button)}><Link
                            to={'/app/zdroje'}>Místa</Link>
                        </button>
                    </div>
                    <div className={styles.cards}>
                        <img src={person} alt={'icon'}/>
                        <p>{customers}</p>
                        <button className={'button-primary '.concat(styles.button)}><Link
                            to={'/app/zakaznici'}>Zákazníci</Link>
                        </button>
                    </div>
                </div>
                <div className={styles.bottomContent}>
                    <div className={styles.mainGraph}>
                        <ChartReservation/>
                    </div>
                </div>
            </div>
            <div className={styles.feedbackContainer}>
                <h2>
                    Feedbacks
                </h2>
                <ul>
                    {feedbacks.map(f => {
                        return (
                            <li>{f.message}<br/></li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}