import React from 'react';
import styles from "../EventsPage.module.scss";


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
function Modal({closeModal}) {

    return(
        <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
                <div className={styles.modalBody}>
                    <div className={styles.modalType}>
                        <p>Vyberte typ termínu</p>
                        <div className={styles.modalTypeBoxes}>
                            <div className={styles.modalTypeInterval}>
                                <div className={styles.interval}>
                                    <div className={styles.interBox1}>
                                        <div className={styles.inter}/>
                                    </div>
                                    <div className={styles.interBox2}/>
                                    <div className={styles.interBox3}/>
                                </div>
                                <div>
                                    <input type={"checkbox"} placeholder={'Foo'} disabled={true}/>Intervaly
                                </div>
                            </div>
                            <div className={styles.modalTypeInterval}>
                                <div className={styles.interval}>
                                    <div className={styles.interBox1}>
                                        <div className={styles.inter2}/>
                                        <div className={styles.inter1}/>
                                    </div>
                                    <div className={styles.interBox2}>
                                        <div className={styles.inter}/>
                                    </div>
                                    <div className={styles.interBox3}>
                                        <div className={styles.inter3}/>
                                    </div>
                                </div>
                                <div>
                                    <input type={"checkbox"} placeholder={'Foo'} disabled={true}/>Libovolný čas
                                </div>
                            </div>
                            <div className={styles.modalTypeInterval}>
                                <div className={styles.interval}>
                                    <div className={styles.interBox1}>
                                        <div className={styles.inter}/>
                                    </div>
                                    <div className={styles.interBox2}>
                                        <div className={styles.inter}/>
                                    </div>
                                    <div className={styles.interBox3}>
                                        <div className={styles.inter}/>
                                    </div>
                                </div>
                                <div>
                                    <input type={"checkbox"} placeholder={'Foo'} checked={true}/>Celá sekevence
                                </div>
                            </div>
                            <div className={styles.modalTypeInterval}>
                                <div className={styles.interval}>
                                    <div className={styles.interBox1}>
                                        <div className={styles.inter}/>
                                    </div>
                                    <div className={styles.interBox2}/>
                                    <div className={styles.interBox3}/>
                                </div>
                                <div>
                                    <input type={"checkbox"} placeholder={'Foo'} disabled={true}/>Celý jeden termín
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.modalInput}>
                        <p>Kdy?</p>
                        <div className={styles.modalInputBoxes}>
                            <p>Termín rezervace:</p>
                            <div className={styles.modalInputInputes}>
                                <div>
                                    od?
                                    <input type="datetime-local" value={timestampToDatetimeInputString(Date.now())}/>
                                </div>
                                <div>
                                    do?
                                    <input type="datetime-local"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.modalActivity}>
                        <p>Co?</p>
                        <div className={styles.modalActivityBox}>
                            <table style={{width: "100%"}}>
                                <tr>
                                    <th><input type={"checkbox"} placeholder={'Foo'}/></th>
                                    <th style={{width: "70%"}}>lorem ipsum</th>
                                    <th>Praha</th>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div className={styles.modalFooter}>
                    <button className={'button-primary-outline'} onClick={() => closeModal(false)}>Cancel</button>
                    <button className={'button-primary-outline'}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default Modal