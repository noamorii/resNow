import React from 'react';
import styles from "../EventsPage.module.scss";


//event button
//works only cancel
//TODO lefted buttons

let dateFrom = "";
let dateTo = "";
let title = localStorage.getItem("eventTitle");

if(localStorage.getItem("eventFrom") !== null && localStorage.getItem("eventTo") !== null) {
    for(let i  = 0; i < 15; i++) {
        if(localStorage.getItem("eventFrom").charAt(i) !== 'G') {
            dateFrom += localStorage.getItem("eventFrom").charAt(i);
        } else {
            break;
        }
    }

    for(let j  = 0; j < 15; j++) {
        if(localStorage.getItem("eventTo").charAt(j) !== 'G') {
            dateTo += localStorage.getItem("eventTo").charAt(j);
        } else {
            break;
        }
    }
}

function newReserveEvent({closeModal}) {
    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
                <h1>{title}</h1>
                <div>
                    <div>
                        <p>Termín: {dateFrom} - {dateTo}</p>
                        <p>Price: </p>
                    </div>
                    <div className={styles.modalInput}>
                        <input type={"text"} placeholder={'Name'}/>
                        <input type={"text"} placeholder={'Surname'}/>
                        <input type={"text"} placeholder={'Email'}/>
                        <input type={"text"} placeholder={'Phone number'}/>
                        <input type={"text"} placeholder={'Capacity'}/>
                    </div>
                </div>
                <div className={styles.modalButton}>
                    <button className={'button-primary-outline'} onClick={() => closeModal(false)}>
                        Close
                    </button>
                    <button className={'button-primary'}>
                        Reserve
                    </button>
                </div>
            </div>
        </div>
    )

}

export default newReserveEvent