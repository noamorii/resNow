import styles from './Places.module.scss'
import {useState, useMemo} from "react";
import MOCK_DATA from "./MOCK_DATA.json";
import {Table} from "./placesTable/PlacesTable";


export const Places = () => {
    const data = useMemo(() => MOCK_DATA, [])
    const columns = useMemo(() => [

            {
                Header: "Název",
                accessor:"title",
                Filter: Filter
            },
            {
                Header: "Poštovní směrovací číslo",
                // accessor:"title",
                Filter: Filter
            },
            {
                Header: "Adresa",
                // accessor:"title",
                Filter: Filter
            },
            {
                Header: "Popis",
                accessor:"description",
                Filter: Filter
            },
        ],
        []
    )

    return (
        <div className={styles.body}>
            <div className={styles.buttonContainer}>
                <button className={'button-primary '.concat(styles.button)}>Nové místo</button>
            </div>
            <div className={styles.table}>
                <Table columns={columns} data={data}/>
            </div>
            <div className={styles.selectContainer}>
                <select className={styles.select}>
                    <option selected>-</option>
                    <option value="Remove">Odstranit</option>
                </select>
                <button className={'button-primary sm '}>Aplikovat</button>
            </div>
        </div>
    )
}


const Filter = ({column}) => {
    const {filterValue, setFilter} = column

    return (
        <span>
            <input value={filterValue} onChange={(e) => setFilter(e.target.value)} className={'input-primary search sh sm'} placeholder={'Hledaný text…'}/>
        </span>
    )
}