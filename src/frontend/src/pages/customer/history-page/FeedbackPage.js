import React, {useEffect, useState} from "react";
import {CloseButton, Modal} from 'react-bootstrap'
import styles from "./HistoryPage.module.scss";

export default function FeedbackPage({ closeModal }) {
    return (
            <div className={styles.modalBackground}>
                <div className={styles.modalContent}>
                    <div>
                        <h3>Feedback</h3>
                    </div>
                    <div>
                        <textarea className="form-control" rows={4} autoFocus placeholder={"Napište vaši zprávu"} cols={32}></textarea>
                    </div>
                    <div className={styles.modalButton}>
                        <button className={'button-primary-outline'} onClick={() => closeModal(false)}>
                            Close
                        </button>
                        <button type="submit" className={'button-primary'} onClick={()=>closeModal(false)}>
                            Odeslát
                        </button>
                    </div>
                </div>
            </div>
    );
}