import styles from './ProfilePage.module.scss'

export const ProfilePageClient = () =>{
    return(
        <div>
            <div className={styles.mainText}>MY PROFILE</div>

            <div className={styles.section}>
                <p>Credentials</p>
                <div className={styles.block}>
                    <div className={styles.fieldsGroup}>
                        <div>
                            <p>Name</p>
                            <input className={'input-primary '.concat(styles.input)} placeholder={'Name'}/>
                        </div>

                        <div>
                            <p>Surname</p>
                            <input className={'input-primary '.concat(styles.input)} placeholder={'Surname'}/>
                        </div>
                    </div>

                    <button className={'button-primary'}>Save</button>
                    <button className={'button-primary-outline'}>Cancel</button>
                </div>
            </div>

            <div className={styles.section}>
                <p>Security</p>
                <div className={styles.block}>
                    <div className={styles.fieldsGroup}>
                        <div>
                            <p>Current password</p>
                            <input className={'input-primary '.concat(styles.input)} placeholder={'Password'}/>
                        </div>

                        <div>
                            <p>New password</p>
                            <input className={'input-primary '.concat(styles.input)} placeholder={'New password'}/>
                        </div>
                    </div>

                    <button className={'button-primary'}>Save</button>
                    <button className={'button-primary-outline'}>Cancel</button>
                </div>
            </div>
        </div>
    )
}