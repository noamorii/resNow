import React, {useEffect, useMemo, useState} from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import NewEventModal from './modalWindowNewEvent/Modal';
import EventModal from './modalWindowEvent/EventModal';

import styles from "./EventsPage.module.scss";
import eventUtils from "./restUtils/eventUtils"

let testEvents = [];

//TODO
//create data and save to db

export const EventsPageClient = () => {

    useEffect(() => {
        eventUtils.getAllEvents()
            .then(response => response.data)
            .then(data => {
                testEvents = data;
                testEvents.map(s => {
                    if(s.hasOwnProperty("name")) {
                        s.title = s.name;
                        delete s.name;
                    }
                    if(s.hasOwnProperty("startDate") && s.hasOwnProperty("fromTime")) {
                        s.start = s.startDate + " " + s.fromTime;
                        delete s.fromTime
                    }
                    if(s.hasOwnProperty("startDate") && s.hasOwnProperty("toTime")) {
                        s.end = s.startDate + " " + s.toTime;
                        delete s.toTime;
                        delete s.startDate;
                    }
                })
                setData(testEvents);
                console.log(testEvents)
            });
    }, [])

    const [show, setShow] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [data, setData] = useState();

    const handleHidden = () => setHidden(false);
    const handleClose = () => {
        setShow(false);
        localStorage.removeItem("eventTitle");
        localStorage.removeItem("eventStart");
        localStorage.removeItem("eventEnd");
    };

    return (
        <div>
            {hidden && <NewEventModal closeModal={handleHidden}/>}
            {show && <EventModal closeModal={handleClose}/>}
            <section className={styles.sectionBody}>
                <div className={styles.calendarBody}>
                    <div className={styles.bodySide}>
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
                                localStorage.setItem("eventTitle", info.event.title);
                                localStorage.setItem("eventStart", info.event.start.toString());
                                localStorage.setItem("eventEnd", info.event.end.toString());
                                setTimeout(() => {
                                    setShow(true)
                                }, 200);
                            }}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}