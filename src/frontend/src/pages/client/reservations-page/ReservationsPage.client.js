import styles from './ReservationPage.module.scss'
import {Calendar, DateObject} from "react-multi-date-picker"
import React, { useState } from "react";
import axios from "axios";
import {baseUrl} from "../../../config/const";


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

    const [confirm, setConfirm] = useState(false)

    return (
        <div>
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
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th className={styles.collCheckbox}>
                            <input className={'checkbox'} type="checkbox" />
                        </th>
                        <th>event time</th>
                        <th>reservation code</th>
                        <th>price</th>
                        <th>1</th>
                        <th>customer</th>
                        <th>state</th>
                        <th>date of cancellation</th>
                        <th>
                            <div className={styles.buttonsTable}>
                                <button className={'button-primary-outline '}>Details</button>
                                <button className={'button-primary-outline '} onClick={() => setConfirm(true)}>Cancel</button>
                            </div>
                        </th>
                    </tr>
                    </tbody>
                </table>
            </div>
        <div className={styles.containerFunction}>
            <select>
                <option selected value="-">-</option>
                <option value="allowReservations">Povolit rezervaci</option>
                <option value="DisableReservations">Zakázat rezervaci</option>
                <option value="Remove">Odstranit</option>
                <option value="writeEmail">Napsat e-mail</option>
                <option value="writeSms">Napsat sms</option>
            </select>
            <button className={'button-primary sm '}>Apply</button>
        </div></div>
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