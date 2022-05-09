import styles from './FeedbackPage.module.scss'
import MOCK_DATA from "./MOCK_DATA.json"
import {useState, useMemo, useEffect} from "react";
import {useTable, useFilters, usePagination} from "react-table";
import axios from "axios";
import {baseUrl} from "../../../config/const";
import authHeader from "../../../services/auth-header";

const Filter = ({column}) => {
    const {filterValue, setFilter} = column;

    return (
        <span>
                <input value={filterValue} onChange={(e) => setFilter(e.target.value)}
                       className={'input-primary search sh sm'} placeholder={'Hledaný text…'}/>
            </span>
    )
}

export const FeedbackPageClient = () => {

    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const [feedbacks, setFeedbacks] = useState([]);


    const data = useMemo(() => MOCK_DATA, []);
    const columns = useMemo(() => [
            {
                Header: "JMÉNO",
                accessor: "name",
                Filter: Filter
            },
            {
                Header: "EMAIL",
                accessor: "email",
                Filter: Filter
            },
            {
                Header: "TELEFON",
                accessor: "tel",
                Filter: Filter
            },
            {
                Header: "N. REZERVACE",
                accessor: "number",
                Filter: Filter
            },
            {
                Header: "REG. DATUM",
                accessor: "date",
                Filter: Filter
            },
        ], []
    );

    useEffect(async () => {
        const myService = await Promise.any([
                axios.get(`${baseUrl}/systems/my`,
                    {headers: authHeader()})
            ]
        )
        setShow(myService.data.name);
        const fetchFeedback = await Promise.any([
                axios.get(`${baseUrl}/systems/${myService.data.id}/feedback`,
                    {headers: authHeader()})
            ]
        )
        setFeedbacks(fetchFeedback.data.sort((a, b) => b.id - a.id))


    }, [])


    let getSelectedRows = () => {
        this.setState({
            Selected: this.state.List.filter((e) => e.selected),
        });
    }

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
            initialState: {
                pageSize: 2
            },
        },
        useFilters,
        usePagination
    );

    const {pageIndex} = state;

    const [checkedState, setCheckedState] = useState([]);
    const handleChange = (e) => {
        const {checked, name} = e.target;
        if (checked) {
            setCheckedState((oldState) => [...oldState, name]);
        } else {
            setCheckedState((oldState) => oldState.filter((row) => row !== name));
        }
    };

    // console.log(checkedState.join(", "));

    return (
        <div className={styles.container}>
            <div className={styles.tableContainer}>
                <table>
                    <thead>
                    <tr>
                        <th width={"20%"}><strong>Číslo</strong></th>
                        <th><strong>Text - ({show})</strong></th>
                    </tr>
                    </thead>
                    <tbody>
                    {feedbacks.map((feedback, current) => {
                        return (
                            <tr>
                                <td>{current+1}</td>
                                <td>{feedback.message}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}