import styles from './ReservationPage.module.scss'
import {Calendar, DateObject} from "react-multi-date-picker"
import React, {useEffect, useState} from "react";
import axios from "axios";
import {baseUrl} from "../../../config/const";
import ModalReservationDetails from "./modalWindowReservationDetails/ModalReservationDetails"

const TopButtons = () => {

    return (
        <div className={styles.topbuttons}>
            <p className={styles.heading}>DAILY RESERVATION OVERVIEW</p>
            <button className={'button-primary '.concat(styles.topbutton)}>Filter</button>
            <button className={'button-primary '.concat(styles.topbutton)}>Statistics</button>
            <button className={'button-primary '.concat(styles.topbutton)}>Export of reservations</button>
            <button className={'button-primary '.concat(styles.topbutton)}>New reservation</button>
        </div>
    )
}


const DatePicker = () => {

    const [value, setValue] = useState(new DateObject())

    const [data1, setData] = useState()

    const getData = (e) => {
        axios.get(`${baseUrl}/systems/1/`).then(result => setData(result.data.name))
        setValue(e)
        console.log(data1)
        //console.log(value)
    }

    return (
        <div>
            <Calendar
                numberOfMonths={4}
                disableMonthPicker
                disableYearPicker
                value={value}
                onChange={e => getData(e)}
            />
            <div className={styles.undercalendar}>
                <div className={styles.datedisplay}>
                    <p className={styles.datedisplay}>
                        {value?.format("dddd MMMM D, YYYY")}
                    </p>
                </div>
                <div className={'calendar-description '.concat(styles.caldescr)}>

                    <p className={' '.concat(styles.pdescr)}>
                        RESERVATIONS: {}1
                    </p>
                    <p className={' '.concat(styles.pdescr)}>
                        RESERVED CAPACITY: {}1
                    </p>
                    <p className={' '.concat(styles.pdescr)}>
                        PRICE OF RESERVATIONS: {}250,-
                    </p>
                </div>
            </div>
        </div>
    )
}

const TableUnder = () => {
    const [data, setData] = useState([
        {
            date: '15-04-2022',
            start: '14:00',
            end: '16:00',
            code: 'EL4-MF1-1EM',
            price: '250',
            capacity: 1,
            customer: 'Tonny Stark',
            state: 'NEW',
            cancelDate: '-',
            phone: '123456789',
            place: 'Tennis court',
            service: 'Coach',
            employee: 'Pepper',
            created: '22-03-2022'
        },
        {
            date: '15-04-2022',
            start: '14:00',
            end: '16:00',
            code: 'EL4-MF1-2OP',
            price: '250',
            capacity: 1,
            customer: 'Tonny Stark',
            state: 'NEW',
            cancelDate: '-',
            phone: '123456789',
            place: 'Tennis court',
            service: 'Coach',
            employee: 'Pepper',
            created: '22-03-2022'
        }
    ]);
    const [detailsShown, setDeatilsShown] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(()=>{
        getData();
    }, [])

    async function getData() {
        const result = await fetch('')
        const getResults = await result.json();
        setData(getResults);
        console.log(getResults)
    }

    const toggleShown = code => {
        const shownState =  detailsShown.slice();
        const index = shownState.indexOf(code)
        if (index >= 0){
            shownState.splice(index, 1);
            setDeatilsShown(shownState)
        } else {
            shownState.push(code);
            setDeatilsShown(shownState);
        }
    }

    return (
        <div>
            {openModal && <ModalReservationDetails closeModal={setOpenModal}/>}
            <div className={styles.tableContainer}>
                <table>
                    <thead>
                    <tr>
                        <td className={styles.collCheckbox}>
                            <input type="checkbox" />
                        </td>
                        <td className={styles.collMid}>
                            <p>EVENT</p>
                        </td>
                        <td className={styles.collWide}>
                            <p>RESERVATION CODE</p>
                            <input className={'input-primary search sh sm'} placeholder={'Find names'}/>
                        </td>
                        <td className={styles.collMid}>
                            <p>PRICE</p>
                        </td>
                        <td className={styles.collNarrow}>
                            <p>CAP.</p>
                        </td>
                        <td className={styles.collWide}>
                            <p>CUSTOMER</p>
                            <input className={'input-primary search sh sm'} placeholder={'Find names'}/>
                        </td>
                        <td className={styles.collMid}>
                            <p>STATE</p>
                        </td>
                        <td className={styles.collWide}>
                            <p>DATE OF CANCELLATION</p>
                        </td>
                        <td className={styles.collMid}> </td>
                    </tr>
                    </thead>
                    <tbody>
                        {data.map(reservation => (
                            <React.Fragment key={reservation.code}>
                            <tr className={styles.headRow}>
                                <td className={styles.collCheckbox}>
                                    <input className={'checkbox'} type="checkbox" />
                                    <button onClick={() => toggleShown(reservation.code)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" fill="none" viewBox="0 0 16 19">
                                            <path fill="#000"  d="M.685 6.14 2.05 4.55l5.581 6.524 5.593-6.51 1.362 1.593-6.958 8.1L.685 6.14Z"/>
                                        </svg>
                                    </button>
                                </td>
                                <td>{reservation.start}-{reservation.end}</td>
                                <td>{reservation.code}</td>
                                <td>{reservation.price}</td>
                                <td>{reservation.capacity}</td>
                                <td>{reservation.customer}</td>
                                <td>{reservation.state}</td>
                                <td>{reservation.cancelDate}</td>
                                <td>
                                    <div className={styles.buttonsTable}>
                                        <div className={styles.detailsButton}>
                                            <button className={'button-primary-outline'} onClick={() => setOpenModal(true)}>Details</button>
                                        </div>
                                        <button className={'button-primary-outline '}>Cancel</button>
                                    </div>
                                </td>
                            </tr>
                                {detailsShown.includes(reservation.code) && (
                                    <tr>
                                        <td colSpan="2" className={styles.toggleInfo}>
                                            PHONE NUMBER: <br/>{reservation.phone}</td>
                                        <td className={styles.toggleInfo}>PLACE: <br/>{reservation.place}</td>
                                        <td colSpan="2" className={styles.toggleInfo}>SERVICE: <br/>{reservation.service}</td>
                                        <td className={styles.toggleInfo}>EMPLOYEE: <br/>{reservation.employee}</td>
                                        <td colSpan="2" className={styles.toggleInfo}>DATE OF RESERVATION: <br/>{reservation.created}</td>
                                        <td> </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                        <div className={styles.containerFunction}>
                            <select>
                                <option selected value="-">-</option>
                                <option value="allowReservations">test</option>
                            </select>
                            <button className={'button-primary sm '}>Apply</button>
                        </div>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export const ReservationsPageClient = () => {
    return(
        <div className={styles.container}>
            <TopButtons/>
            <DatePicker/>
            <TableUnder/>
        </div>
    )
}