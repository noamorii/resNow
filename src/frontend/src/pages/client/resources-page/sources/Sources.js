import styles from './Sources.module.scss';
import {useState, useEffect, useMemo} from "react";
import {useTable, useFilters, usePagination} from "react-table";
import MOCK_DATA from "./MOCK_DATA.json"

const Table = ({columns, data}) => {
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
                        <td className={styles.collCheckbox}>
                            <input type="checkbox" />
                        </td>
                        {headerGroup.headers.map(column => (
                            <td {...column.getHeaderProps()}>
                                <p>{column.render('Header')}</p>
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                            </td>

                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {page.map((row) => {
                prepareRow(row)
                return (
                    <tr className={styles.tRow} {...row.getRowProps()}>
                        <td className={styles.collCheckbox}>
                            <input type="checkbox" />
                        </td>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                        <td>
                            <div className={styles.buttonCell}>
                                <button className={'button-primary-outline ' .concat(styles.buttonEdit)}>Upravit</button>
                                <button className={'button-primary-outline ' .concat(styles.buttonDelete)}>Odstranit</button>
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

export const Sources = () => {

    // const [data, setData] = useState();
    const data = useMemo(() => MOCK_DATA, [])
    const columns = useMemo(() => [

                {
                    Header: "Plný název",
                    accessor:"full_name",
                    Filter: Filter
                },
                {
                    Header: "Název",
                    accessor:"title",
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
                {
                    Header: "Zaměstnanec",
                    accessor:"employee",
                    Filter: Filter
                },
            ],
        []
    )

    return (
        <div className={styles.body}>
            <div className={styles.buttonContainer}>
                <button className={'button-primary '.concat(styles.button)}>Nový zdroj</button>
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