import React, {useState} from 'react';
import styles from "../EventsPage.module.scss";
import eventUtils from "../restUtils/eventUtils";

function NewReserveEvent({closeModal}) {

    let slotId = localStorage.getItem("eventId");
    let dateFrom = localStorage.getItem("eventFrom").substring(0, 10);
    let dateTo = localStorage.getItem("eventTo").substring(0, 10);
    let price = localStorage.getItem("eventPrice");

    let info = "";

    const [date, setData] = useState({
        name: "",
        surname: "",
        email: "",
        phonenumber: "",
        capacity: ""
    });

    const handleChange = (e) => {
        const {id, value} = e.target;
        setData(prevState => ({
            ...prevState,
            [id] : value
        }))
        info = date.email + " " + date.phonenumber + " " + date.capacity;
        console.log(info);
    }

    const createReservation = (name, info) => {
        eventUtils.newReservation(slotId, name, info)
            .then(() => {
                console.log("success")
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
                <h1>{slotId}</h1>
                <div>
                    <div>
                        <p>Termín: {dateFrom} - {dateTo}</p>
                        <p>Price: {price}</p>
                    </div>
                    <div className={styles.modalInput}>
                        <input type={"text"} placeholder={'Name'} id="name" value={date.name} onChange={handleChange}/>
                        <input type={"text"} placeholder={'Surname'} id="surname" value={date.surname} onChange={handleChange}/>
                        <input type={"email"} placeholder={'Email'} id="email" value={date.email} onChange={handleChange}/>
                        <input type={"text"} placeholder={'Phone number'} id="phonenumber" value={date.phonenumber} onChange={handleChange}/>
                        <input type={"text"} placeholder={'Capacity'} id="capacity" value={date.capacity} onChange={handleChange}/>
                    </div>
                </div>
                <div className={styles.modalButton}>
                    <button className={'button-primary-outline'} onClick={() => closeModal(false)}>
                        Close
                    </button>
                    <button className={'button-primary'} onClick={() => createReservation(date.name, info)}>
                        Reserve
                    </button>
                </div>
            </div>
        </div>
    )

}

export default NewReserveEvent