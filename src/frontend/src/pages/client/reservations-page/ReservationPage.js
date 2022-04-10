import styles from './ReservationPage.module.scss'
import {Calendar, DateObject} from "react-multi-date-picker"
import React, { useState } from "react";
import axios from "axios";
import {baseUrl} from "../../../config/const";


const TopButtons = () => {

    return (
        <div className={styles.topbuttons}>
            <button className={'button-primary '.concat(styles.topbutton)}>Filter</button>
            <button className={'button-primary '.concat(styles.topbutton)}>Statistics</button>
            <button className={'button-primary '.concat(styles.topbutton)}>Export of reservations</button>
            <button className={'button-primary '.concat(styles.topbutton)}>New reservation</button>
        </div>
    )
}


const DatePicker = () => {
    const [value, setValue] = useState(new DateObject())

    const [data, setData] = useState()

    const getData = (e) => {
        axios.get(`${baseUrl}/systems/1/`).then(result => setData(result.data.name))
        setValue(e)
        console.log(data)
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
            <div className={'calendar-description '.concat(styles.caldescr)}>
                <p className={styles.datedisplay}>
                    {value?.format("dddd MMMM D, YYYY")}
                </p>
                <p className={' '.concat(styles.pdescr)}>
                    RESERVATIONS: {}
                </p>
                <p className={' '.concat(styles.pdescr)}>
                    RESERVED CAPACITY: {}
                </p>
                <p className={' '.concat(styles.pdescr)}>
                    PRICE OF RESERVATIONS: {}
                </p>
            </div>
        </div>

    )
}

export const ReservationPage = () => {
    return(
        <div className={styles.container}>
            <TopButtons/>
            <DatePicker/>
        </div>
    )
}