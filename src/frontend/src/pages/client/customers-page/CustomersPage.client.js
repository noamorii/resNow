import styles from './CustomersPage.module.scss'
import {useState} from "react";
import {ModalNewCustomer} from "./modalWindowNewCustomer/ModalNewCustomer";
import {ModalDeleteConfirm} from "./modalWindowDeleteConfirm/ModalDeleteConfirm";

export const CustomersPageClient = () => {

    const [show, setShow] = useState(false);
    const [confirm, setConfirm] = useState(false)

    return(
      <div className={styles.container}>
          <div className={styles.buttonContainer}>
              <button className={'button-primary '.concat(styles.button)} onClick={() => setShow(true)}>Nový zákazník</button>
              <ModalNewCustomer onClose={() => setShow(false)} show={show}/>
              <ModalDeleteConfirm onClose={() => setConfirm(false)} show={confirm}/>
          </div>
          <div className={styles.tableContainer}>
              <table>
                  <thead>
                  <tr>
                      <td className={styles.collCheckbox}>
                          <input type="checkbox" />
                      </td>
                      <td>
                          <p>CELÉ JMÉNO</p>
                          <input className={'input-primary search sh sm'} placeholder={'Hledaný text…'}/>
                      </td>
                      <td>
                          <p>EMAIL</p>
                          <input className={'input-primary search sh sm'} placeholder={'Hledaný text…'}/>
                      </td>
                      <td>
                          <p>TELEFON</p>
                          <input className={'input-primary search sh sm'} placeholder={'Hledaný text…'}/>
                      </td>
                      <td>
                          <p>N. REZERVACE</p>
                      </td>
                      <td>
                          <p>REG. DATUM</p>
                      </td>
                      <td></td>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <th className={styles.collCheckbox}>
                          <input className={'checkbox'} type="checkbox" />
                      </th>
                      <th>name</th>
                      <th>name</th>
                      <th>email</th>
                      <th>tel</th>
                      <th>date</th>
                      <th>
                          <div className={styles.buttonsTable}>
                              <button className={'button-primary-outline ' .concat(styles.buttonEdit)}>Upravit</button>
                              <button className={'button-primary-outline ' .concat(styles.buttonDelete)} onClick={() => setConfirm(true)}>Odstranit</button>
                          </div>
                      </th>
                  </tr>

                  <tr>
                      <th className={styles.collCheckbox}>
                          <input className={'checkbox'} type="checkbox" />
                      </th>
                      <th>name</th>
                      <th>name</th>
                      <th>email</th>
                      <th>tel</th>
                      <th>date</th>
                      <th>
                          <div className={styles.buttonsTable}>
                              <button className={'button-primary-outline '}>Upravit</button>
                              <button className={'button-primary-outline ' .concat(styles.buttonDelete)} onClick={() => setConfirm(true)}>Odstranit</button>
                          </div>
                      </th>
                  </tr>
                  </tbody>
              </table>
              <div className={styles.buttonsContainer}>
                  <div>
                      <button className={'button-primary sm'}>Předchozí</button>
                      <button className={'button-primary sm'}>Další</button>
                  </div>
              </div>
          </div>
          <div className={styles.containerFunction}>
              <select>
                  <option disabled>-</option>
                  <option value="allowReservations">Povolit rezervaci</option>
                  <option selected value="DisableReservations">Zakázat rezervaci</option>
                  <option value="Remove">Odstranit</option>
                  <option value="writeEmail">Napsat e-mail</option>
                  <option value="writeSms">Napsat sms</option>
              </select>
              <button className={'button-primary sm '}>Aplikovat</button>
          </div>
      </div>
    )
}