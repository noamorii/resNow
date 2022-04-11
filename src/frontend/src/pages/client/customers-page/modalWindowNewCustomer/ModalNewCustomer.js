import styles from './ModalNewCustomer.module.scss'
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {useState} from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export const ModalNewCustomer = (props) => {
    if (!props.show) return null;

    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [active, setActive] = useState(true);

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const handleSetSecondName = (e) => {
        setSecondName(e.target.value);
    }

    const handleTelephone = (e) => {
        setTelephone(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleSubmit = (e) => {
        alert('Name-"' + firstName +
            '    SecondName-"' + secondName +
            '    Email-' + email +
            '    Telephone-' + telephone +
            '    Description-' + description +
            '    Active-' + active);

        e.preventDefault();
    }

    return (
        <div className={styles.modal} onClick={props.onClose}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <p>Nový zákazník</p>
                </div>
                <form className={styles.form} onSubmit={(e) => {handleSubmit(e)}}>
                    <div>
                        <label htmlFor="firstName">Jméno</label>
                        <input id="firstName" className={'input-primary search sh'} placeholder={'Jméno'} required
                               value={firstName} onChange={(e) => {handleFirstName(e)}}/>

                        <label htmlFor="telephone">Telefonní číslo</label>
                        <input id="telephone" className={'input-primary search sh'} placeholder={'Telephone'} type="tel"  required
                               value={telephone} onChange={(e) => {handleTelephone(e)}}/>

                        <label htmlFor="description">Popis</label>
                        <textarea  id="description" className={'input-primary search sh ' .concat(styles.description)}
                                   placeholder={'Popis'} value={description}
                                   onChange={(e) => {handleDescription(e)}}/>

                        <div className={styles.checkboxContainer}>
                            <label htmlFor="active">Aktivní</label>
                            <input id="active" className={styles.checkbox} type="checkbox"
                                   onChange={() => setActive(!active)} defaultChecked={true}/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="secondName">Příjmení</label>
                        <input id="secondName" className={'input-primary search sh'} placeholder={'Příjmení'} required
                               value={secondName} onChange={(e) => {handleSetSecondName(e)}}/>

                        <label htmlFor="email">Email</label>
                        <input id="email" className={'input-primary search sh'} placeholder={'Email'} type="email"
                               required value={email} onChange={(e) => {handleEmail(e)}}/>

                        <div className={styles.buttons}>
                            <button className={'button-primary-outline ' .concat(styles.buttonSave)} type="submit">Uložit</button>
                            <button className={'button-primary-outline ' .concat(styles.buttonCancel)} onClick={props.onClose}>Storno</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}