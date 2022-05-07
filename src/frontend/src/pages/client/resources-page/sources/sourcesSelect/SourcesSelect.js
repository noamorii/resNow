import myData from "../MOCK_DATA.json"
import Select from "react-select";
import {Component, useMemo} from "react";
import styles from "../modalWindowNew/ModalNew.module.scss";

export const PlaceOption = props => {
    const {innerProps, innerRef, data} = props
    return(
        <div ref={innerRef} {...innerProps} className={styles.selectContainer}>
            <span>{data.place}</span>
        </div>
    )
}

export const ServiceOption = props => {
    const {innerProps, innerRef, data} = props
    return(
        <div ref={innerRef} {...innerProps} className={styles.selectContainer}>
            <span>{data.service}</span>
        </div>
    )
}

export default class MySelect extends Component {
    customFilter = (option, inputValue) => {
        const reg = new RegExp(`^${inputValue}`)
        return reg.test(option.label);
    }

    getOptionValue = option => option.id

    getOptionLabel = option => `${option.place}`

    getOptionServices = option => `${option.service}`

    render() {
        return(
            <Select
                styles={styles.selectContainer}
                options={myData}
                filterOption={this.customFilter}
                getOptionValue={this.getOptionValue}
                getOptionLabel={this.getOptionLabel}
            />
        )
    }
}