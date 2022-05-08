import styles from './HistoryPage.module.scss'
import styles1 from "../events-page/EventsPage.module.scss";
import React, {useState, useEffect, useMemo} from "react";
import {useTable, useFilters, usePagination} from "react-table";
import MOCK_DATA from "./MOCK_DATA.json"
import FeedbackPage from "./FeedbackPage";
import {CloseButton, Modal} from "react-bootstrap";



export const HistoryPageCustomer = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };
    const data = useMemo(() => MOCK_DATA, [])
    const columns = useMemo(() => [

            {
                Header: "Událost",
                accessor:"event",
                Filter: Filter
            },
            {
                Header: "Kod rezervace",
                accessor:"reservation_code",
                Filter: Filter
            },
            {
                Header: "Cena",
                accessor:"price",
                Filter: Filter,
                disableFilters: true
            },
            {
                Header: "Stav rezervace",
                accessor:"state",
                Filter: Filter,
                disableFilters: true
            }
        ],
        []
    )

    return (
        <>
            {show && <FeedbackPage closeModal={handleClose}/>}
            <div className={styles.body}>
                <div className={styles.buttonContainer}>
                    <button className={'button-primary '.concat(styles.button)}>Vymazat historii</button>
                </div>
                <div className={styles.table}>
                    <Table columns={columns} data={data} setShow={setShow}/>
                </div>
                <div className={styles.selectContainer}>
                    <select className={styles.select}>
                        <option selected>-</option>
                        <option value="Remove">Odstranit</option>
                    </select>
                    <button className={'button-primary sm'}>Aplikovat</button>
                </div>
            </div>

        </>
    )
}

const Table = ({columns, data, setShow}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        prepareRow,
    } = useTable({
            columns,
            data,
        },
        useFilters,
        usePagination
    )

    const {pageIndex} = state

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <td {...column.getHeaderProps()}>
                                <p>{column.render('Header')}</p>
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                            </td>

                        ))}
                        <td>
                            <p>Feedback</p>
                            <div></div>
                        </td>
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                    prepareRow(row)
                    return (
                        <tr className={styles.tRow} {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                            <td>
                                <div className={styles.buttonCell}>
                                    <button className={'button-primary-outline ' .concat(styles.buttonDetail)} onClick={() => setShow(true)}>Napsat</button>
                                </div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div className={styles.buttonsContainer}>
                <div>
                    <span>Page {pageIndex + 1} of {pageOptions.length} </span>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage} className={'button-primary sm'}>Předchozí</button>
                    <button onClick={() => nextPage()} disabled={!canNextPage} className={'button-primary sm'}>Další</button>
                </div>
            </div>
        </>
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

// const DatePick = ({column}) => {
//     // const [value, setValue] = useState(new Date())
//     const {value, setValue} = column
//
//     return (
//         <span>
//             <DatePicker value={value} onChange={setValue} />
//         </span>
//     )
// }

// const Select = ({data}) => {
//     const [value, setValue] = useState(null)
//
//     const filtering = (e) => {
//         let state = e.target.value
//
//         if (state) {
//
//         }
//     }
//     return (
//         <div>
//             <select>
//                 <option>All</option>
//                 {data.map((history) => (
//                     <option>{history.state}</option>
//                 ))}
//             </select>
//         </div>
//     )
// }