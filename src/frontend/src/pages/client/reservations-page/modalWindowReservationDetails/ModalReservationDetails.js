import React, {useState} from "react";
import styles from './ModalReservationDetails.module.scss';

const text = {
    text1: (
        <>
            <h3>
                Client name<br/>
            </h3>
            <h4>
                Client e-mail<br/>
                Client phone
            </h4>
            <h5>
                Reservations: 1<br/>
                Cancelled reservations: 0<br/>
                Allow reservation: Yes<br/>
            </h5>
        </>
    ),
    text2: (
        <h3>
            Will finish later
        </h3>
    ),
    text3:(
        <h3>
            Will finish later
        </h3>
    )
};


function Modal({ closeModal }) {
    const [isFreeActive, setFreeActive] = useState(true);
    const [isPremiumActive, setPremiumActive] = useState(false);
    const [isBusinessActive, setBusinessActive] = useState(false);

    const [description, setDescription] = useState(text.text1);
    const [activeClassName, setActiveClassName] = useState(styles.free);
    const [buttonText, setButtonText] = useState('Try');

    const onClickFree = () => {
        setBusinessActive(false);
        setPremiumActive(false);
        setFreeActive(true);
        setActiveClassName(styles.free);
        setDescription(text.text1);
        setButtonText("Try");
    }

    const onClickPremium = () => {
        setBusinessActive(false);
        setPremiumActive(true);
        setFreeActive(false);
        setActiveClassName(styles.premium);
        setDescription(text.text2);
        setButtonText("Buy");
    }

    const onClickBusiness = () => {
        setBusinessActive(true);
        setPremiumActive(false);
        setFreeActive(false);
        setActiveClassName(styles.business);
        setDescription(text.text3);
        setButtonText("Buy");
    }

    return(
        <div className={styles.modalWindow}>
            <div className={styles.contentBody}>
                <div className={styles.description}>
                    <h1>Event name</h1>
                    <div className={styles.row}>
                        <h3>Date and time of event</h3>
                        <p>Date and time of event</p>
                    </div>
                    <div className={styles.row}>
                        <h3>Reservation code</h3>
                        <p>EL4-MF1-1EM</p>
                    </div>
                    <div className={styles.row}>
                        <h3>Place</h3>
                        <p>Tennis court</p>
                    </div>
                    <div className={styles.added}>
                        <h3>State</h3>
                        <div className={styles.optionButton}>
                            <select>
                                <option selected value="New">New</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Taken place">Taken place</option>
                                <option value="Not taken place">Not taken place</option>
                                <option value="Canceled">Canceled</option>
                            </select>
                        </div>
                        <h3>Capacity</h3>
                        <p>1</p>
                    </div>
                    <div className={styles.row}>
                        <h3>Date and time of reservation</h3>
                        <p>03.06.2022 11:16</p>
                    </div>
                    <div className={styles.row}>
                        <h3>Reservation made by</h3>
                        <p>Client</p>
                    </div>
                    <div className={styles.added}>
                        <h3>Collision control</h3>
                        <p>No</p>
                        <h3>Reservation out of term</h3>
                        <p>No</p>
                    </div>
                </div>
                <div className={styles.board}>
                    <div className={styles.tab} id={'tab'}>
                        <button type={"button"} onClick={() => onClickFree()}
                                className={isFreeActive ? styles.activeFree : ""}>
                            Client
                            <div className={styles.circleR}/>
                        </button>
                        <button type={"button"} onClick={() => onClickPremium()}
                                className={isPremiumActive ? styles.activePremium : ""}>
                            Payments
                            <div className={styles.circleR}/>
                            <div className={styles.circleL}/>
                        </button>
                        <button type={"button"} onClick={() => onClickBusiness()}
                                className={isBusinessActive ? styles.activeBusiness : ""}>
                            History
                            <div className={styles.circleL}/>
                        </button>
                    </div>
                    <div className={styles.main + " " + activeClassName} id={'pricing-table'}>
                        <div className={styles.content}>
                            {description}
                            <div className={styles.buttonUnderDescr}>
                                <button className={'button-primary '.concat(styles.modalButton)}>
                                    <p>EDIT</p>
                                </button>
                                <button className={'button-primary '.concat(styles.modalButton)} onClick={() => closeModal(false)}>
                                    <p>CANCEL</p>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal