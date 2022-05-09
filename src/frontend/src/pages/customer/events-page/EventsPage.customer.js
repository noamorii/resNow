import styles from './EventsPage.module.scss'
import React, {useEffect, useState} from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import NewEvent from './modalWindowNewReservation/newReserveEvent';
import eventUtils from "../events-page/restUtils/eventUtils";

let testEvents = [];


export const EventsPageCustomer = () =>{
    useEffect(() => {
        eventUtils.getAllSlots()
            .then(response => response.data)
            .then(data => {
                testEvents = data;
                console.log(testEvents)
                testEvents.map(s => {
                    if(s.hasOwnProperty("price")) {
                        s.title = s.price;
                        delete s.price;
                    }
                    if(s.hasOwnProperty("date") && s.hasOwnProperty("startTime")) {
                        s.start = s.date + " " + s.startTime;
                        delete s.startTime
                    }
                    if(s.hasOwnProperty("date") && s.hasOwnProperty("endTime")) {
                        s.end = s.date + " " + s.endTime;
                        delete s.endTime;
                        delete s.date;
                    }
                })
                setData(testEvents);
                console.log(testEvents)
            });
    }, [])

    const [show, setShow] = useState(false);
    const [data, setData] = useState();

    const handleClose = () => {
        setShow(false);
        localStorage.removeItem("eventTitle");
        localStorage.removeItem("eventStart");
        localStorage.removeItem("eventEnd");
    };

    return (
        <div>
            {show && <NewEvent closeModal={handleClose}/>}
            <section className={styles.eventBody}>
                <div className={styles.eventCalendar}>
                    <FullCalendar
                        plugins={[timeGridPlugin]}
                        initialView="timeGridWeek"
                        locale={'cs'}
                        selectable={true}
                        selectMirror={true}
                        weekends={true}
                        events={data}
                        nowIndicator={true}
                        height={600}
                        headerToolbar={{
                            right: 'today prev,next'
                        }}
                        eventClick={function (info) {
                            localStorage.setItem("eventId", info.event.id);
                            localStorage.setItem("eventFrom", info.event.start.toISOString());
                            localStorage.setItem("eventTo", info.event.end.toISOString());
                            localStorage.setItem("eventPrice", info.event.title);
                            setTimeout(() => setShow(true), 200);
                        }}
                    />
                </div>
            </section>
        </div>
    )
}