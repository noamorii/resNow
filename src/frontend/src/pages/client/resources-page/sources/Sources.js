import styles from './Sources.module.scss'

const Table = ({columns, data}) => {
    // const {
    //     getTableProps,
    //     getTableBodyProps,
    //     headerGroups,
    //     rows,
    //     prepareRow,
    // } = useTable({
    //     columns,
    //     data,
    // })

    return (
        <table>
            <thead>
            <tr>
                <th>
                    <input type="checkbox"/>
                </th>
                <td>
                    <p>Plný název</p>
                </td>
                <td>
                    <p>Název</p>
                </td>
                <td>
                    <p>Služba</p>
                </td>
                <td>
                    <p>Místo</p>
                </td>
                <td>
                    <p>Zaměstnanec</p>
                </td>
                <td>
                    <p></p>
                </td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                    <button>Upravit</button>
                    <button>Odstranit</button>
                </td>
            </tr>
            </tbody>
        </table>
    )
}

export const Sources = () => {

    // const [data, setData] = useState();
    // const columns = useMemo(() => [
    //     {
    //         Header: "Zdroje",
    //         columns: [
    //             {
    //                 Header: "Plný název"
    //             },
    //             {
    //                 Header: "Název"
    //             },
    //             {
    //                 Header: "Služba",
    //                 Cell: ({ cell: { value } }) => value ? {value} : "-"
    //             },
    //             {
    //                 Header: "Místo"
    //             },
    //             {
    //                 Header: "Zaměstnanec",
    //                 Cell: ({ cell: { value } }) => value ? {value} : "-"
    //             },
    //             {
    //                 Header: " "
    //             },
    //         ]
    //
    //     }]
    // )

    return (
        <div>
            <div className={styles.buttonContainer}>
                <button className={'button-primary '.concat(styles.button)}>Nový zdroj</button>
            </div>
            <div className={styles.table}><Table/></div>
        </div>
    )
}