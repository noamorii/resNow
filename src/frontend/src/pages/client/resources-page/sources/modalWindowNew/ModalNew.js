import styles from './ModalNew.module.scss'
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {useMemo, useState} from "react";
// import MOCK_DATA from "../MOCK_DATA.json"
// import Select from "react-select/base";

ChartJS.register(ArcElement, Tooltip, Legend);

export const ModalNew = (props) => {
    // const data = useMemo(() => MOCK_DATA, [])
    const [title, setTitle] = useState('')

    if (!props.show) return (
        <></>
    )

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        alert('Title-"' + title
            /*'    SecondName-"' + secondName +
        '    Email-' + email +
        '    Telephone-' + telephone +
        '    Description-' + description +
        '    Active-' + active*/);

        e.preventDefault();
    }

    return (
        <div className={styles.modal} onClick={props.onClose}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <p>Nový zdroj</p>
                </div>
                <form className={styles.form} onSubmit={(e) => {handleSubmit(e)}}>
                    <div>
                        <label htmlFor="title">Název</label>
                        <input id="title" className={'input-primary search sh'} placeholder={'Název'} required
                               value={title} onChange={(e) => {handleTitle(e)}}/>
                        <label htmlFor="place">Místo</label>
                        <select className={styles.selectContainer}>
                            <option selected>-</option>
                            <option value="place1">place1</option>
                            <option value="place2">place2</option>
                            <option value="place3">place3</option>
                        </select >
                        <label htmlFor="service">Služba</label>
                        <select className={styles.selectContainer}>
                            <option selected>-</option>
                            <option value="service1">service1</option>
                            <option value="service2">service2</option>
                            <option value="service3">service3</option>
                        </select>
                        <label htmlFor="employee">Zaměstnanec</label>
                        <select className={styles.selectContainer}>
                            <option selected>-</option>
                            <option value="employee1">employee1</option>
                            <option value="employee2">employee2</option>
                            <option value="employee3">employee3</option>
                        </select>
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