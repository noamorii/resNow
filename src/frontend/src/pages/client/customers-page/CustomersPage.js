import styles from './CustomersPage.module.scss'

const Form = () => {
    return (
        <Form>
            <input className={'input-primary sm'} type={"text"}/>
            <button type={'submit'}>ok</button>
        </Form>
    )
}

export const CustomersPage = () => {
  return(
      <div className={styles.container}>
          <p className={styles.topic}>CustomersPage</p>
      </div>
  )
}