import React, {useEffect, useState} from "react";
import styles from './ModalCreateReservation.module.scss';
import DatePicker, {DateObject} from "react-multi-date-picker"
import axios from "axios";
import {baseUrl} from "../../../../config/const";
import authHeader from "../../../../services/auth-header";


function Modal({ closeModal }) {
    const [date, setDate] = useState(new DateObject());

    const [events, setEvents] = useState([]);
    const [sources, setSources] = useState([]);
    const [currSource, setSource] = useState(sources[0]);
    const [currEvent, setEvent] = useState(events[0]);
    const [currUser, setUser] = useState(null);
    const [timeslots, setTimeslots] = useState([]);
    const [currTS, setCurrTS] = useState([]);
    const [description, setDescription] = useState("no desc");
    const [customers, setCustomers] = useState([]);

    const [resDTO, setResDTO] = useState(null);
    let counter = 1500;

    const [firstUseEffect, setFirstUF] = useState(false)

    const [showError, setShowError] = useState(false);

    useEffect(()=>{
        sendGetRequest(date.format("YYYY-MM-DD"))
    }, [date])


    useEffect(()=>{
        if ((firstUseEffect === true) && (currEvent !== undefined)){
            getTS(currEvent.id, date.format("YYYY-MM-DD"))
        } else {
            setFirstUF(true)
        }
    }, [currEvent])


    const sendGetRequest = async (date) => {
        setShowError(false)
        try {
            const resp0 = await axios.get(
                `${baseUrl}/systems/my`,
                {headers: authHeader()})
            let system = resp0.data.id;

            const respSources = await axios.get(
                `${baseUrl}/systems/${system}/sources/`,
                {headers: authHeader()})
            setSources(respSources.data)
            setSource(respSources.data[0].name)

            const respEvents = await axios.get(
                `${baseUrl}/systems/${system}/events/`,
                {params: {fromDate: date, toDate: date},
                    headers: authHeader()})
            setEvents(respEvents.data)
            setEvent(respEvents.data[0])

            const respCustomers = await axios.get(
                `${baseUrl}/systems/my/customers/`,
                {headers: authHeader()})
            let tmp = []
            for (let i = 0; i < respCustomers.data.length; i++) {
                tmp.push(respCustomers.data[i].username)
            }
            setCustomers(tmp)

        } catch (err) {
            // Handle Error Here
            //console.error(err);
            console.log("Didnt find any Events for given date")
            setShowError(true)
        }
    };

    const getUser = async (username) => {
        try {
            const resp = await axios.get(
                `${baseUrl}/users/${username}`,
                {headers: authHeader()})
            setUser(resp.data.username)
            //console.log(resp.data.username)

        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }

    const getTS = async (event, date) => {
        try {
            const resp = await axios.get(
                `${baseUrl}/events/${event}/slots`,
                {params: {fromTimestamp: date, toTimestamp: date},
                    headers: authHeader()})
            setTimeslots(resp.data)
            setCurrTS(resp.data[0])
            //console.log(resp.data)

        } catch (err) {
            // Handle Error Here
            //console.error(err);
            console.log("No user found")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        getUser(e.target.username.value)
        console.log("-----")
        console.log(e.target.description.value)
        console.log(currUser)
        console.log(currTS.id)
        console.log("-----")
        createReservationDTO(e.target.description.value, currTS.id, currUser)
        try {
            axios.post(
                `${baseUrl}/slots/${currTS.id}`,
                {resDTO, headers: authHeader()})

        } catch (err) {
            // Handle Error Here
            console.error(err);
            //console.log("No user found")
        }

    }

    function createReservationDTO(description, slotId, username){
        let tmp = {
            "paymentId": 0,
            "reservationId": counter
        }
        counter += 1;
        tmp["additionalInfo"] = description;
        tmp["cancelled"] = false;
        tmp["reservationSlotId"] = slotId;
        tmp["username"] = username;
        setResDTO(tmp)
    }

    function makeButtonCustomer(data) {
        return (
            <button
                style={styles.customerBtn}
                type="button"
                value={data}
                onClick={clickedCustomer}>
                {data}
            </button>
        );
    }

    function clickedCustomer(e) {
        setUser(e.target.value)
        console.log(e.target.value)
    }


    const changeCurrTS = () => {}

    const changeTS = (e) => {
        setCurrTS(e.target.value)
        console.log(e.target.value)
    }

    return(
        <div className={styles.modalWindow}>
            <div className={styles.contentBody}>
                <h1 className={styles.popisDate}>Nová rezervace:</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.datePart}>
                        <p>Choose date:</p>
                        <DatePicker
                            value={date}
                            onChange={setDate}
                        />
                    </div>
                    {showError === false &&
                        <select>{
                            events.map( (event) =>
                                <option value={event.value} key={event.name}>{event.name}</option>)
                        }</select>}


                    {currEvent === undefined &&
                        <h2>No events for chosen date</h2>
                    }

                    <h3>Choose TimeSlot/Seat</h3>
                    {timeslots !== [undefined] &&
                        <select onChange={changeTS}>{
                            timeslots.map((ts) => {
                                if(ts.hasOwnProperty('seatIdentifier'))
                                    return <option value={ts.id} key={ts.id}>Seat: {ts.seatIdentifier}</option>
                                else return <option value={ts.id} key={ts.id}>EndTime: {ts.endTime}</option>
                            })
                        })

                        }</select>
                    }

                    <div className={styles.userDetails}>
                        {customers.map(makeButtonCustomer, this)}
                        <label htmlFor="username">Username:</label>
                        <input id="username" name="username" className={'input-primary search sh sm'} placeholder={'Find user'} type="text"/>
                    </div>

                    <textarea id="description" name="description" rows="5" >Add additional description</textarea>

                    <button type="submit" className={'button-primary '.concat(styles.modalButton)}>
                        <p>SUBMIT</p>
                    </button>
                </form>

                <button className={'button-primary '.concat(styles.modalButton)} onClick={() => closeModal(false)}>
                    <p>CANCEL</p>
                </button>
            </div>
        </div>
    )
}

export default Modal