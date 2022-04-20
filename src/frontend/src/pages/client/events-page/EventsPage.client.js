import React, {useState} from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import Modal from './Modal';

import styles from "./EventsPage.module.scss";

const events = [
    {
        title:"Hello",
        start:"2022-04-17 20:25",
        end:"2022-04-18 20:00"
    },
    {
        title:"world",
        start:"2022-04-18 14:25",
        end:"2022-04-18 20:00"
    },
    {
        title:"!",
        start:"2022-04-18 20:00",
        end:"2022-04-18 21:00"
    }
]


//TODO
//fetch data from api
//create data and save to db

export const EventsPageClient = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    return (
        <div>
            {show && <Modal closeModal={handleClose}/>}
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
                                        setShow(true);
                                    },
                                },
                            }}
                            headerToolbar={{
                                right: 'myCustomButton today prev,next'
                            }}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}