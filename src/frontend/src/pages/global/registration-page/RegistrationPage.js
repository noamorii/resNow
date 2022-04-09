import styles from './RegistrationPage.module.scss'
import {useState} from "react";
import axios from "axios";
import {baseUrl} from '../../../config/const'


const Form = () => {
    const [data, setData] = useState('')

    const fetchData = () => {
        axios.get(`${baseUrl}/systems/1/`)
            .then(result => setData(result.data.name))
    }

    return (
        <div>
            {data}
            <input className={'input-primary lg'} placeholder={'Email'}></input>
            <button
                type={'button'}
                className={'button-primary sm '}
                onClick={() => {
                    fetchData()
                }}
            >login
            </button>
        </div>
    )
}

export const RegistrationPage = () => {


    return (
        <div className={styles.container}>

            <Form/>
        </div>
    )
}