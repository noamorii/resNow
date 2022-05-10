import React, {useEffect, useState} from 'react';
import styles from "../EventsPage.module.scss";
import eventUtils from "../restUtils/eventUtils";

import allIn from "./../../../../assets/allintervaly.png";
import fullSek from "./../../../../assets/fullsekvence 1.png";
import lib from "./../../../../assets/libovolny 1.png";
import axios from "axios";
import {baseUrl} from "../../../../config/const";
import authHeader from "../../../../services/auth-header";


function timestampToDatetimeInputString(timestamp) {
    const date = new Date((timestamp + _getTimeZoneOffsetInMs()));
    return date.toISOString().slice(0, 19);
}

function _getTimeZoneOffsetInMs() {
    return new Date().getTimezoneOffset() * -60 * 1000;
}

//TODO
//getters for activities
//send to rest new event
export const Modal = (props) => {

    const [name, setName] = useState('');
    const [fromTime, setFromTime] = useState('');
    const [toTime, setToTime] = useState('');
    const [startDate, setStartDate] = useState('');
    const [repeatUntil, setRepeatUntil] = useState('');
    const [day, setDay] = useState('');
    const [repetition, setRepetition] = useState('NONE');

    const [minimalReservationTime, setMinimalReservationTime] = useState(null);
    const [seatAmount, setSeatAmount] = useState(null);
    const [timeBetweenIntervals, setTimeBetweenIntervals] = useState(null);
    const [intervalDuration, setIntervalDuration] = useState(null);
    const [sourceId, setSourceId] = useState(null);

    const [eventType, setEventType] = useState(1)

    const [resources, setResources] = useState([]);

    useEffect(async () => {
        const fetchSources = await Promise.any([
                axios.get(
                    `${baseUrl}/systems/my/sources`,
                    {headers: authHeader()})
            ]
        )
        setResources(fetchSources.data)

    }, [])


    const handle = () => {
        eventUtils.newIntervalEvent("test", "2022-05-09", "2022-05-11")
    }

    const Int = () => {
        return (
            <>
                <div className={styles.flex}>
                    <label>
                        <div>
                            V období:
                            <input type={"date"}
                                   onChange={e => setStartDate(e.target.value)}/>
                        </div>
                    </label>

                    <label>
                        <div>
                            od?
                            <input type={"time"}
                                   onChange={e => setFromTime(e.target.value)}/>
                        </div>
                    </label>

                    <label>
                        <div>
                            do?
                            <input type={"time"}
                                   onChange={e => setToTime(e.target.value)}/>
                        </div>
                    </label>
                </div>

                <div className={styles.flex}>
                    <label>
                        <div>
                            Velikost intervalu:
                            <input type={"time"}
                                   onChange={e => setIntervalDuration(e.target.value)}/>
                        </div>
                    </label>

                    <label>
                        <div>
                            Minimální délka rezervace
                            <input type={"time"}
                                   onChange={e => setMinimalReservationTime(e.target.value)}/>
                        </div>
                    </label>
                </div>
            </>
        )
    }

    const Custom = () => {
        return (
            <>
                <div className={styles.flex}>
                    <label>
                        <div>
                            V období:
                            <input type={"date"}
                                   onChange={e => setStartDate(e.target.value)}/>
                        </div>
                    </label>

                    <label>
                        <div>
                            od?
                            <input type={"time"}
                                   onChange={e => setFromTime(e.target.value)}/>
                        </div>
                    </label>

                    <label>
                        <div>
                            do?
                            <input type={"time"}
                                   onChange={e => setToTime(e.target.value)}/>
                        </div>
                    </label>
                </div>
            </>
        )
    }

    return (
        <div className={styles.modalBackground} onClick={props.closeModal}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.modalBody}>
                    <form>
                        <fieldset className={styles.eventType}>
                            <legend><h3>Vyberte typ termínu</h3></legend>
                            <div>
                                <label htmlFor="interval">
                                    <img src={allIn} alt={"eventType"}/>
                                    <div>
                                        <input type="radio" id="interval" name={"event"} value="interval"
                                               checked={eventType === 1}
                                               onChange={(e) => setEventType(1)}
                                        />Intervaly
                                    </div>
                                </label>
                            </div>

                            <div>

                                <label htmlFor="custom">
                                    <img src={lib} alt={"eventType"}/>
                                    <div>
                                        <input type="radio" id="custom" name={"event"} value="custom"
                                               checked={eventType === 2}
                                               onChange={(e) => setEventType(2)}
                                        />Libovolný čas
                                    </div>
                                </label>
                            </div>

                            <div>
                                <label htmlFor="sequence">
                                    <img src={fullSek} alt={"eventType"}/>
                                    <div>
                                        <input type="radio" id="sequence" name={"event"} value="sequence"
                                               checked={eventType === 3}
                                               onChange={(e) => setEventType(3)}
                                        />
                                        Seat
                                    </div>
                                </label>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend><h3>Název eventu</h3></legend>
                            <label>
                                <div>
                                    <input type={"text"} className={'input-primary'} value={name}
                                           onChange={e => setName(e.target.value)}/>
                                </div>
                            </label>
                        </fieldset>
                        <fieldset className={styles.when}>
                            <legend><h3>Kdy?</h3></legend>
                            {eventType === 1 ? <Int/> : null}
                            {eventType === 2 ? <Custom/> : null}
                            {eventType === 3 ? <Int/> : null}
                        </fieldset>
                        <fieldset>
                            <legend><h3>Co?</h3></legend>
                            <select className={'input-primary'}>
                                {resources.map(resource => {
                                    return (
                                        <option>
                                            {resource.name}
                                            {resource.description}
                                        </option>
                                    )
                                })}
                            </select>
                        </fieldset>
                    </form>
                </div>
                <div className={styles.modalFooter}>
                    <button className={'button-primary-outline'} onClick={props.closeModal}>Cancel</button>
                    <button className={'button-primary'} onClick={handle}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default Modal