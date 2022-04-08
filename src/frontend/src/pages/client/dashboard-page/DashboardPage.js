import styles from './DashboardPage.module.scss'

export const DashboardPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.topContent}>
                <div className={styles.cards}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="none" viewBox="0 0 80 80">
                        <path fill="#3E3E3E" d="M25 0h40c5.523 0 10 4.477 10 10v50c0 5.523-4.477 10-10 10 0 5.523-4.477 10-10 10H15C9.477 80 5 75.523 5 70h5a5 5 0 0 0 5 5h40a5 5 0 0 0 5-5V20a5 5 0 0 0-5-5H15a5 5 0 0 0-5 5H5c0-5.523 4.477-10 10-10h40c5.523 0 10 4.477 10 10v45a5 5 0 0 0 5-5V10a5 5 0 0 0-5-5H25a5 5 0 0 0-5 5h-5c0-5.523 4.477-10 10-10Z"/>
                        <path fill="#3E3E3E" d="M5 30v-2.5a2.5 2.5 0 0 1 5 0V30h2.5a2.5 2.5 0 0 1 0 5h-10a2.5 2.5 0 0 1 0-5H5ZM5 45v-2.5a2.5 2.5 0 0 1 5 0V45h2.5a2.5 2.5 0 0 1 0 5h-10a2.5 2.5 0 0 1 0-5H5ZM5 57.5V60H2.5a2.5 2.5 0 0 0 0 5h10a2.5 2.5 0 0 0 0-5H10v-2.5a2.5 2.5 0 0 0-5 0Z"/>
                    </svg>
                    <h1>15</h1>
                    <button className={'button-primary '.concat(styles.button)}>Dnešní rezervace</button>
                </div>
                <div className={styles.cards}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="none" viewBox="0 0 80 80">
                        <path fill="#3E3E3E" d="M25 0h40c5.523 0 10 4.477 10 10v50c0 5.523-4.477 10-10 10 0 5.523-4.477 10-10 10H15C9.477 80 5 75.523 5 70h5a5 5 0 0 0 5 5h40a5 5 0 0 0 5-5V20a5 5 0 0 0-5-5H15a5 5 0 0 0-5 5H5c0-5.523 4.477-10 10-10h40c5.523 0 10 4.477 10 10v45a5 5 0 0 0 5-5V10a5 5 0 0 0-5-5H25a5 5 0 0 0-5 5h-5c0-5.523 4.477-10 10-10Z"/>
                        <path fill="#3E3E3E" d="M5 30v-2.5a2.5 2.5 0 0 1 5 0V30h2.5a2.5 2.5 0 0 1 0 5h-10a2.5 2.5 0 0 1 0-5H5ZM5 45v-2.5a2.5 2.5 0 0 1 5 0V45h2.5a2.5 2.5 0 0 1 0 5h-10a2.5 2.5 0 0 1 0-5H5ZM5 57.5V60H2.5a2.5 2.5 0 0 0 0 5h10a2.5 2.5 0 0 0 0-5H10v-2.5a2.5 2.5 0 0 0-5 0Z"/>
                    </svg>
                    <h1>15</h1>
                    <button className={'button-primary '.concat(styles.button)}>Rezervace</button>
                </div>
                <div className={styles.cards}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="none" viewBox="0 0 80 80">
                        <path fill="#3E3E3E" d="M25 0h40c5.523 0 10 4.477 10 10v50c0 5.523-4.477 10-10 10 0 5.523-4.477 10-10 10H15C9.477 80 5 75.523 5 70h5a5 5 0 0 0 5 5h40a5 5 0 0 0 5-5V20a5 5 0 0 0-5-5H15a5 5 0 0 0-5 5H5c0-5.523 4.477-10 10-10h40c5.523 0 10 4.477 10 10v45a5 5 0 0 0 5-5V10a5 5 0 0 0-5-5H25a5 5 0 0 0-5 5h-5c0-5.523 4.477-10 10-10Z"/>
                        <path fill="#3E3E3E" d="M5 30v-2.5a2.5 2.5 0 0 1 5 0V30h2.5a2.5 2.5 0 0 1 0 5h-10a2.5 2.5 0 0 1 0-5H5ZM5 45v-2.5a2.5 2.5 0 0 1 5 0V45h2.5a2.5 2.5 0 0 1 0 5h-10a2.5 2.5 0 0 1 0-5H5ZM5 57.5V60H2.5a2.5 2.5 0 0 0 0 5h10a2.5 2.5 0 0 0 0-5H10v-2.5a2.5 2.5 0 0 0-5 0Z"/>
                    </svg>
                    <h1>15</h1>
                    <button className={'button-primary '.concat(styles.button)}>Termíny</button>
                </div>
                <div className={styles.cards}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="none" viewBox="0 0 80 80">
                        <path fill="#3E3E3E" d="M25 0h40c5.523 0 10 4.477 10 10v50c0 5.523-4.477 10-10 10 0 5.523-4.477 10-10 10H15C9.477 80 5 75.523 5 70h5a5 5 0 0 0 5 5h40a5 5 0 0 0 5-5V20a5 5 0 0 0-5-5H15a5 5 0 0 0-5 5H5c0-5.523 4.477-10 10-10h40c5.523 0 10 4.477 10 10v45a5 5 0 0 0 5-5V10a5 5 0 0 0-5-5H25a5 5 0 0 0-5 5h-5c0-5.523 4.477-10 10-10Z"/>
                        <path fill="#3E3E3E" d="M5 30v-2.5a2.5 2.5 0 0 1 5 0V30h2.5a2.5 2.5 0 0 1 0 5h-10a2.5 2.5 0 0 1 0-5H5ZM5 45v-2.5a2.5 2.5 0 0 1 5 0V45h2.5a2.5 2.5 0 0 1 0 5h-10a2.5 2.5 0 0 1 0-5H5ZM5 57.5V60H2.5a2.5 2.5 0 0 0 0 5h10a2.5 2.5 0 0 0 0-5H10v-2.5a2.5 2.5 0 0 0-5 0Z"/>
                    </svg>
                    <h1>15</h1>
                    <button className={'button-primary '.concat(styles.button)}>Místa</button>
                </div>
                <div className={styles.cards}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="none" viewBox="0 0 80 80">
                        <path fill="#3E3E3E" d="M25 0h40c5.523 0 10 4.477 10 10v50c0 5.523-4.477 10-10 10 0 5.523-4.477 10-10 10H15C9.477 80 5 75.523 5 70h5a5 5 0 0 0 5 5h40a5 5 0 0 0 5-5V20a5 5 0 0 0-5-5H15a5 5 0 0 0-5 5H5c0-5.523 4.477-10 10-10h40c5.523 0 10 4.477 10 10v45a5 5 0 0 0 5-5V10a5 5 0 0 0-5-5H25a5 5 0 0 0-5 5h-5c0-5.523 4.477-10 10-10Z"/>
                        <path fill="#3E3E3E" d="M5 30v-2.5a2.5 2.5 0 0 1 5 0V30h2.5a2.5 2.5 0 0 1 0 5h-10a2.5 2.5 0 0 1 0-5H5ZM5 45v-2.5a2.5 2.5 0 0 1 5 0V45h2.5a2.5 2.5 0 0 1 0 5h-10a2.5 2.5 0 0 1 0-5H5ZM5 57.5V60H2.5a2.5 2.5 0 0 0 0 5h10a2.5 2.5 0 0 0 0-5H10v-2.5a2.5 2.5 0 0 0-5 0Z"/>
                    </svg>
                    <h1>15</h1>
                    <button className={'button-primary '.concat(styles.button)}>Zákazníci</button>
                </div>
                <div className={styles.cards}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="none" viewBox="0 0 80 80">
                        <path fill="#3E3E3E" d="M25 0h40c5.523 0 10 4.477 10 10v50c0 5.523-4.477 10-10 10 0 5.523-4.477 10-10 10H15C9.477 80 5 75.523 5 70h5a5 5 0 0 0 5 5h40a5 5 0 0 0 5-5V20a5 5 0 0 0-5-5H15a5 5 0 0 0-5 5H5c0-5.523 4.477-10 10-10h40c5.523 0 10 4.477 10 10v45a5 5 0 0 0 5-5V10a5 5 0 0 0-5-5H25a5 5 0 0 0-5 5h-5c0-5.523 4.477-10 10-10Z"/>
                        <path fill="#3E3E3E" d="M5 30v-2.5a2.5 2.5 0 0 1 5 0V30h2.5a2.5 2.5 0 0 1 0 5h-10a2.5 2.5 0 0 1 0-5H5ZM5 45v-2.5a2.5 2.5 0 0 1 5 0V45h2.5a2.5 2.5 0 0 1 0 5h-10a2.5 2.5 0 0 1 0-5H5ZM5 57.5V60H2.5a2.5 2.5 0 0 0 0 5h10a2.5 2.5 0 0 0 0-5H10v-2.5a2.5 2.5 0 0 0-5 0Z"/>
                    </svg>
                    <h1>15</h1>
                    <button className={'button-primary '.concat(styles.button)}>Zaměstnanci</button>
                </div>
            </div>
            <div className={styles.bottomContent}>
                <div className={styles.mainGraph}>

                </div>
                <div className={styles.kolacGraph}>

                </div>
            </div>
        </div>
    )
}