import styles from './ModalNewCustomer.module.scss'
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';
import {getIn, useFormik} from 'formik';

ChartJS.register(ArcElement, Tooltip, Legend);

const Form = () => {

    const validate = values => {
        const errors = {};

        if (!values.firstName) {
            errors.firstName = 'Toto pole je povinné.';
        } else if (values.firstName.length < 2) {
            errors.firstName = 'Musí mít minimálně 2 znaky.';
        }

        if (!values.secondName) {
            errors.secondName = 'Toto pole je povinné.';
        } else if (values.secondName.length < 2) {
            errors.secondName = 'Musí mít minimálně 2 znaky.';
        }

        if (!values.email) {
            errors.email = 'Toto pole je povinné.';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Neplatná emailová adresa.';
        }

        if (!values.telephone) {
            errors.telephone = 'Toto pole je povinné.';
        } else if (!/^[0-9\b]+$/i.test(values.telephone)) {
            errors.telephone = 'Neplatný telefon.';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {firstName: '',
                        secondName: '',
                        email: '',
                        telephone: '',
                        description:'',
                        checkbox: true
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    function getStyles(errors, fieldName) {
        if (getIn(errors, fieldName)) {
            return {
                border: '1px solid red'
            }
        }
    }

    return (
        <div className={styles.modal} onClick={props.onClose}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <p>Nový zákazník</p>
                </div>
                <form className={styles.form} onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="firstName">*Jméno</label>
                        <input id="firstName"
                               className={'input-primary search sh '}
                               placeholder={'John'}
                               required
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               value={formik.values.firstName}
                               name={'firstName'}
                               style={getStyles(formik.errors, 'firstName')}
                        />
                        {formik.errors.firstName ? <div className={styles.errorMessage}>{formik.errors.firstName}</div> : null}

                        <label htmlFor="telephone">*Telefonní číslo</label>
                        <input id="telephone"
                               className={'input-primary search sh'}
                               placeholder={'Telephone'}
                               type="tel"
                               required
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               value={formik.values.telephone}
                               name={'telephone'}
                               style={getStyles(formik.errors, 'telephone')}
                            />
                        {formik.errors.telephone ? <div className={styles.errorMessage}>{formik.errors.telephone}</div> : null}

                        <label htmlFor="description">Popis</label>
                        <textarea id="description"
                                  className={'input-primary search sh '
                                      .concat(styles.description)}
                                  placeholder={'Popis'}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.description}
                        />
                        {formik.errors.description ? <div className={styles.errorMessage}>{formik.errors.description}</div> : null}

                        <div className={styles.checkboxContainer}>
                            <label htmlFor="active">Aktivní</label>
                            <input id="checkbox"
                                   className={styles.checkbox}
                                   type="checkbox"
                                   defaultChecked={true}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.checkbox}
                            />
                            {formik.errors.checkbox ? <div className={styles.errorMessage}>{formik.errors.checkbox}</div> : null}

                        </div>
                    </div>
                    <div>
                        <label htmlFor="secondName">*Příjmení</label>
                        <input id="secondName"
                               className={'input-primary search sh'}
                               placeholder={'Příjmení'}
                               required
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               value={formik.values.secondName}
                               name={'secondName'}
                               style={getStyles(formik.errors, 'secondName')}
                        />
                        {formik.errors.secondName ? <div className={styles.errorMessage}>{formik.errors.secondName}</div> : null}

                        <label htmlFor="email">*Email</label>
                        <input id="email"
                               className={'input-primary search sh'}
                               placeholder={'john@example.com'}
                               type="email"
                               required
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               value={formik.values.email}
                               name={'email'}
                               style={getStyles(formik.errors, 'email')}
                        />
                        {formik.errors.email ? <div className={styles.errorMessage}>{formik.errors.email}</div> : null}

                        <div className={styles.buttons}>
                            <button className={'button-primary-outline '.concat(styles.buttonSave)}
                                    type="submit">Uložit
                            </button>
                            <button className={'button-primary-outline '.concat(styles.buttonCancel)}
                                    onClick={props.onClose}>Storno
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

let props;

export const ModalNewCustomer = (prop) => {
    props = prop;
    if (!props.show) return (<></>);
    return <Form/>
}