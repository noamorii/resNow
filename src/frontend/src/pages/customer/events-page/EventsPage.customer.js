import styles from './EventsPage.module.scss'
import React, {useState} from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import NewEvent from './modalWindowNewReservation/newReserveEvent';

const events = [
    {
        id: 1,
        title:"test1",
        start:"2022-05-01 20:25",
        end:"2022-05-02 10:00",
    },
    {
        id: 2,
        title:"test2",
        start:"2022-05-03 20:25",
        end:"2022-05-04 10:00"
    },
    {
        id: 3,
        title:"test3",
        start:"2022-05-05 20:25",
        end:"2022-05-06 10:00",
    }
]

export const EventsPageCustomer = () =>{

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };

    const selectedEvent = (eventId, eventTitle, eventFrom, eventTo) => {
        if(eventTitle && eventTo && eventFrom) {
            localStorage.setItem("eventTitle", eventTitle);
            localStorage.setItem("eventFrom", eventFrom);
            localStorage.setItem("eventTo", eventTo);
        }
        setTimeout(() => setShow(true), 200);
    }

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
                        events={events}
                        nowIndicator={true}
                        height={600}
                        headerToolbar={{
                            right: 'today prev,next'
                        }}
                        eventClick={function (info) {
                            selectedEvent(info.event.id, info.event.title, info.event.start, info.event.end);
                        }}
                    />
                </div>
            </section>
        </div>
    )
}