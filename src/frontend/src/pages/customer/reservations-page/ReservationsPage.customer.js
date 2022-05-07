import styles from './Reservations.module.scss'
import {useEffect, useState} from "react";
import {baseUrl} from "../../../config/const";
import axios from "axios";
import authHeader from "../../../services/auth-header";


export const ReservationsPageCustomer = () => {
    const [event, setEvents] = useState([]);
    const [slots, setSlots] = useState([]);

    const fetchSlot = async (e) => {
        return new Promise((resolve, reject) => {
            axios.get(
                `${baseUrl}/slots/${e}`,
                {headers: authHeader()}
            ).then(response => {
                resolve(response.data)
                // console.log(response.data)
            }).catch(reject);
        })
    }

    const fetchSlots = async (data) => {

        let response = []
        await Promise.all(data.map(async (e) => {
            try {
                let insertResponse = await fetchSlot(e.reservationId)
                response.push(insertResponse)
            } catch (error) {
                console.log('error' + error);
            }
        }))
        return response
    }

    const fetchEvent = (id) => {
        return new Promise((resolve, reject) => {
            axios.get(
                `${baseUrl}/events/${id}`,
                {headers: authHeader()}
            ).then(response => {
                resolve(response.data)
            }).catch(reject);
        })
    }

    const fetchEvents = async (data) => {

        let response = []
        await Promise.all(data.map(async (e) => {
            try {
                let insertResponse = await fetchEvent(e.eventId)
                response.push(insertResponse)
            } catch (error) {
                console.log('error' + error);
            }
        }))
        return response
    }

    useEffect(async () => {
        const reservations = await Promise.all([
                axios.get(
                    `${baseUrl}/my/reservations`,
                    {headers: authHeader()}
                )
            ]
        )
        const slots = await Promise.all([fetchSlots(reservations[0].data)])
        setSlots(slots[0])
        // console.log(slots[0])
        const events = await Promise.all([fetchEvents(slots[0])])
        setEvents(events[0]);
    }, [])

    return (
        <div className={styles.container}>
            <h2>My reservations</h2>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>From Time</th>
                    <th>To Time</th>
                    <th>Start Date</th>
                </tr>
                </thead>
                <tbody>

                {event.map((r, index) => {
                    return (
                        <tr>
                            <td>
                                {r.name}
                            </td>
                            <td>
                                {slots[index].date}
                            </td>
                            <td>
                                {r.toTime}
                            </td>
                            <td>
                                {r.startDate}
                            </td>
                        </tr>
                    )
                })}

                </tbody>
            </table>
        </div>
    )
}