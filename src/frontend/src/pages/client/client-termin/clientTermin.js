import React, {useState} from "react";
import {NabvarIndex} from "../../../parts/header/navbar-index/NabvarIndex";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!

import styles from "./clientTermin.module.scss";


const events = [
    {
        title: "RSP",
        allDay: true,
        start: new Date(2022, 4, 10),
        end: new Date(2022, 5, 26)
    },
    {
        title: "NSS",
        allDay: true,
        start: new Date(2022, 5, 11),
        end: new Date(2022, 5, 26)
    }
]

//TODO
//fetch data from api
//create data and save to db
//as feature create event by dragging on calendar

export default function ClientTermin() {
    return (
        <div>
            <header>
                <NabvarIndex/>
            </header>
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
                            plugins={[ timeGridPlugin ]}
                            initialView="timeGridWeek"
                            locale={'cs'}
                            selectable={true}
                            selectMirror={true}
                            events={events}
                            weekends={true}
                            nowIndicator={true}
                            height={600}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}