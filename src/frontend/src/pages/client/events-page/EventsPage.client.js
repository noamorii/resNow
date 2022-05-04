import React, {useState} from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import NewEventModal from './modalWindowNewEvent/Modal';
import EventModal from './modalWindowEvent/EventModal';

import styles from "./EventsPage.module.scss";
import eventUtils from "./restUtils/eventUtils"

const events = [
    {
        title:"Hello",
        start:"2022-04-29 20:25",
        end:"2022-04-30 20:00",
    },
    {
        title:"world",
        start:"2022-04-18 14:25",
        end:"2022-04-18 20:00"
    },
    {
        title:"!",
        start:"2022-04-18 20:00",
        end:"2022-04-18 21:00",
    }
]


//TODO
//fetch data from api
//create data and save to db

export const EventsPageClient = () => {
    const [show, setShow] = useState(false);
    const [hidden, setHidden] = useState(false);

    const handleHidden = () => setHidden(false);
    const handleClose = () => {
        setShow(false);
        localStorage.removeItem("eventTitle");
        localStorage.removeItem("eventFrom");
        localStorage.removeItem("eventTo");
    };
    const selectedEvent = (eventTitle, eventFrom, eventTo) => {
        if(eventTitle && eventTo && eventFrom) {
            localStorage.setItem("eventTitle", eventTitle);
            localStorage.setItem("eventFrom", eventFrom);
            localStorage.setItem("eventTo", eventTo);
        }
        setTimeout(() => setShow(true), 200);
    }

    return (
        <div>
            {hidden && <NewEventModal closeModal={handleHidden}/>}
            {show && <EventModal closeModal={handleClose}/>}
            <section className={styles.sectionBody}>
                <nav className={styles.sideBar}>
                    <p>Sidebar</p>
                    <button className={'button-primary-outline'}>Foo</button>
                    <button className={'button-primary-outline'}>Foo</button>
                    <button className={'button-primary-outline'}>Foo</button>
                    <button className={'button-primary-outline'}>Foo</button>
                    <button className={'button-primary-outline'}>Foo</button>
                    <button className={'button-primary-outline'}>Foo</button>
                </nav>
                <div className={styles.calendarBody}>
                    <div className={styles.bodySide}>
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
                            customButtons={{
                                myCustomButton: {
                                    text: 'Add event',
                                    click: function() {
                                        setHidden(true);
                                    },
                                },
                            }}
                            headerToolbar={{
                                right: 'myCustomButton today prev,next'
                            }}
                            eventClick={function (info) {
                                selectedEvent(info.event.title, info.event.start, info.event.end)
                            }}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}