import React, {useEffect, useState} from "react";
import styles from './DashboardPage.module.scss'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import {Line} from 'react-chartjs-2';
import axios from "axios";
import {baseUrl} from "../../../config/const";
import authHeader from "../../../services/auth-header";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const ChartReservation = () => {
    const [data, setData] = useState(undefined);

    const getLastWeeksDate = () => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    }

    useEffect(() => {

        const fillDay = () => {
            let labels = [];

            const now = new Date();
            for (let d = getLastWeeksDate(); d <= now; d.setDate(d.getDate() + 1)) {
                const newDay = new Date(d);
                labels.push(newDay.getDate() + " " + Number(newDay.getMonth() + 1));
            }
            return labels;
        }

        const day = (today) => {
            const year = today.getFullYear();
            let month = "";
            let date = "";
            if (today.getMonth() < 10) {
                month = "0" + Number(today.getMonth() + 1);
            } else {
                month = Number(today.getMonth() + 1);
            }
            if (today.getDate() < 10) {
                date = "0" + today.getDate();
            } else {
                date = today.getDate();
            }
            const day = year + "-" + month + "-" + date;
            console.log(day)
            return day;
        }


        const getNewReservation = async (e) => {
            return new Promise((resolve, reject) => {
                axios.get(
                    `${baseUrl}/systems/reservations/today`,
                    {
                        headers: authHeader(),
                        params: {"fromDate": day(new Date(new Date().setDate(e[0])))}
                    }
                )
                    .then(response => {
                        resolve(response.data.length)
                    })
                    .catch(reject);
            })
        }

        const getCanceledReservation = async (e) => {
            return new Promise((resolve, reject) => {
                axios.get(`${baseUrl}/systems/1`)//TODO FETCH REAL DATA
                    .then(response => {
                        resolve(response.data.id)
                    })
                    .catch(reject);
            })
        }

        const getDataCanceledReservations = async (data) => {
            let generatedResponse = []
            await Promise.all(data.map(async (e) => {
                try {
                    let insertResponse = await getCanceledReservation(e)
                    generatedResponse.push(insertResponse)
                } catch (error) {
                    console.log('error' + error);
                }
            }))
            return generatedResponse
        }

        const getDataNewReservations = async (data) => {
            let generatedResponse = []
            await Promise.all(data.map(async (e) => {
                try {
                    let insertResponse = await getNewReservation(e)
                    generatedResponse.push(insertResponse)
                } catch (error) {
                    console.log('error' + error);
                }
            }))
            return generatedResponse
        }


        const fillData = async (labels) => {
            let data = {
                labels,
                datasets: [
                    {
                        label: 'Reservations',
                        data: [],
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                ]
            }

            data.datasets[0].data = await getDataNewReservations(labels);
            // data.datasets[0].data = [1, 6, 3, 7, 5, 3, 4, 6];
            // data.datasets[1].data = await getDataCanceledReservations(labels);

            return data;
        }


        let days = fillDay();
        Promise.all(days).then(async r => {
            setData((await fillData(r)));
        })

    }, [])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Rezervace za poslední týden',
            },
        },
        layout: {
            padding: 15
        },
    };

    if (data === undefined) {
        return <>Still loading...</>;
    }

    return (
        <div className={styles.chart}>
            <Line options={options} data={data} redraw={false} className={styles.chartLine}/>
        </div>
    )
}