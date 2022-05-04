import styles from './Sources.module.scss';
import {useState, useEffect, useMemo} from "react";
import MOCK_DATA from "./MOCK_DATA.json"
import {ModalNew} from "./modalWindowNew/ModalNew";
import {Table} from "./resourcesTable/ResourcesTable";
import sourcesUtils from "./restUtils/SourcesUtils"

export const Sources = () => {
    const [newRes, setNewRes] = useState(false)
    const [data, setData] = useState(false)
    useEffect(() => {
        const fetchSources = async () => {
            try {
                setData(sourcesUtils.getAllSources)
            } catch (err) {
                if (err.response) {
                    console.log(err.response.data)
                    console.log(err.response.status)
                    console.log(err.response.headers)
                }
            }
        }
        fetchSources()
    }, [])
    const columns = useMemo(() => [
                {
                    Header: "Název",
                    accessor:"description",
                    Filter: Filter
                },
                {
                    Header: "Služba",
                    accessor:"service",
                    Filter: Filter
                },
                {
                    Header: "Místo",
                    accessor:"place",
                    Filter: Filter
                },
            ],
        []
    )

    return (
        <div className={styles.body}>
            <ModalNew onClose={() => setNewRes(false)} show={newRes}/>
            <div className={styles.buttonContainer}>
                <button className={'button-primary '.concat(styles.button)} onClick={() => {setNewRes(true)}}>Nový zdroj</button>
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

