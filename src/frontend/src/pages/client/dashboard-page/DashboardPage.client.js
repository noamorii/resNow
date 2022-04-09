import styles from './DashboardPage.module.scss'
import journals from './../../../assets/svg/journals.svg'
import journalMedical from './../../../assets/svg/journal-medical.svg'
import calendar2 from './../../../assets/svg/calendar2-event.svg'
import pin from './../../../assets/svg/pin.svg'
import person from './../../../assets/svg/person.svg'
import personCircle from './../../../assets/svg/person-circle.svg'
import {useEffect, useState} from "react";
import axios from "axios";
import {baseUrl} from "../../../config/const";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const PieChart = () => {

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
                Rezervace dne {current.getDate()}.{current.getMonth() + 1}.{current.getFullYear()}
            </p>
            <div className={styles.pie}>
                <Pie data={data} options={{
                    maintainAspectRatio: false
                }}/>
            </div>
            <button type={'button'} className={'button-primary '.concat(styles.button)}>Zobrazit více</button>
        </div>
    )
}

export const DashboardPageClient = () => {

    const [todayReservation, setTodayReservation] = useState(0);
    const [allReservation, setAllReservation] = useState(0);
    const [allEvents, setAllEvents] = useState(0);
    const [allPlace, setAllPlace] = useState(0);
    const [allCustomers, setAllCustomers] = useState(0);
    const [allEmployee, setAllEmployee] = useState(0);

    const fetchTodayReservation = () => {
        // axios.get(`${baseUrl}/`).then(res => setTodayReservation(res.data))
        setTodayReservation(5)
    }

    const fetchAllReservation = () => {
        // axios.get(`${baseUrl}/`).then(res => setAllReservation(res.data))
        setAllReservation(265)
    }

    const fetchAllEvents = () => {
        // axios.get(`${baseUrl}/`).then(res => setAllEvents(res.data))
        setAllEvents(3)
    }

    const fetchAllPlace = () => {
        // axios.get(`${baseUrl}/`).then(res => setAllPlace(res.data))
        setAllPlace(4)
    }

    const fetchAllCustomer = () => {
        // axios.get(`${baseUrl}/`).then(res => setAllCustomers(res.data))
        setAllCustomers(25)
    }

    const fetchAllEmployee = () => {
        // axios.get(`${baseUrl}/`).then(res => setAllEmployee(res.data))
        setAllEmployee(10);
    }

    useEffect(() => {
        fetchTodayReservation()
        fetchAllReservation()
        fetchAllEvents()
        fetchAllPlace()
        fetchAllCustomer()
        fetchAllEmployee()
    }, [])


    return (
        <div className={styles.container}>
            <div className={styles.topContent}>
                <div className={styles.cards}>
                    <img src={journals} alt={'icon'}/>
                    <p>{todayReservation}</p>
                    <button className={'button-primary '.concat(styles.button)}><a href={'rezervace'}>Dnešní
                        rezervace</a></button>
                </div>
                <div className={styles.cards}>
                    <img src={journalMedical} alt={'icon'}/>
                    <p>{allReservation}</p>
                    <button className={'button-primary '.concat(styles.button)}><a href={'rezervace'}>Rezervace</a>
                    </button>
                </div>
                <div className={styles.cards}>
                    <img src={calendar2} alt={'icon'}/>
                    <p>{allEvents}</p>
                    <button className={'button-primary '.concat(styles.button)}><a href={'terminy'}>Termíny</a></button>
                </div>
                <div className={styles.cards}>
                    <img src={pin} alt={'icon'}/>
                    <p>{allPlace}</p>
                    <button className={'button-primary '.concat(styles.button)}><a href={'zdroje'}>Místa</a></button>
                </div>
                <div className={styles.cards}>
                    <img src={person} alt={'icon'}/>
                    <p>{allCustomers}</p>
                    <button className={'button-primary '.concat(styles.button)}><a href={'zakaznici'}>Zákazníci</a>
                    </button>
                </div>
                <div className={styles.cards}>
                    <img src={personCircle} alt={'icon'}/>
                    <p>{allEmployee}</p>
                    <button className={'button-primary '.concat(styles.button)}><a href={'zdroje'}>Zaměstnanci</a>
                    </button>
                </div>
            </div>


            <div className={styles.bottomContent}>
                <div className={styles.mainGraph}>
                    <p>
                        Aktivita za poslední 4 týdny
                    </p>
                </div>
                <PieChart/>
            </div>
        </div>
    )
}