import styles from './ReservationPage.module.scss'

const Form = () => {
    return (
        <form>
            <button>login</button>
        </form>
    )
}

export const ReservationPage = () => {
    return(
        <div className={styles.container}>
           <Form/>
        </div>
    )
}