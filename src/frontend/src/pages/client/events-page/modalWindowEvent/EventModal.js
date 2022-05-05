import React from 'react';
import styles from "../EventsPage.module.scss";

let dateFrom = "";
let dateTo = "";
let title = localStorage.getItem("eventTitle");

if(localStorage.getItem("eventFrom") !== null && localStorage.getItem("eventTo") !== null) {
    for(let i  = 0; i < localStorage.getItem("eventFrom").length; i++) {
        if(localStorage.getItem("eventFrom").charAt(i) !== 'G') {
            dateFrom += localStorage.getItem("eventFrom").charAt(i);
        } else {
            break;
        }
    }

    for(let j  = 0; j < localStorage.getItem("eventTo").length; j++) {
        if(localStorage.getItem("eventTo").charAt(j) !== 'G') {
            dateTo += localStorage.getItem("eventTo").charAt(j);
        } else {
            break;
        }
    }
}

//event button
//works only cancel
//TODO lefted buttons

function EventModal({closeModal}) {
    return (
        <div className={styles.eventModalBackground}>
            <div className={styles.eventContent}>
                <h1>{title}</h1>
                <div>
                    <div className={styles.eventModalTermin}>
                        <p>Termín:</p>
                        <div className={styles.eventModalDates}>
                            <div>od {dateFrom}</div>
                            <div>do {dateTo}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.eventButtons}>
                    <div>
                        <button className={'button-primary-outline'} onClick={() => closeModal(false)}>
                            Close
                        </button>
                    </div>
                    <div>
                        <button className={'button-primary-outline'} onClick={() => closeModal(false)}>
                            Edit
                        </button>
                    </div>
                    <div>
                        <button className={'button-primary-outline'} onClick={() => closeModal(false)}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default EventModal