import axios from "axios";
import {baseUrl} from '../../../../config/const';
import authHeader from '../../../../services/auth-header';

let current = new Date();
let first = current.getDate() - current.getDay();
let last = first + 6;

let currentDay = new Date(current.setDate(first)).toISOString().substring(0, 10);
let lastDay = new Date(current.setDate(last)).toISOString().substring(0, 10);

class EventUtils {

    //rest/v1/systems/1/events
    getAllEvents() {
        return axios.get(`${baseUrl}/systems/my/events`, {
            headers: authHeader(),
            params: {
                fromDate: currentDay,
                toDate: lastDay
            }
        });
    }

    //patch for update selected event [name, timeFrom, timeTo, ...]
    updateEvent(id, name, timeFrom, timeTo) {
        return axios.put('${baseUrl}/endpoint', {
            "name": "test",
            "fromTime": "12:00:00",
            "toTime": "14:00:00",
            "startDate": "2022-05-14",
            // "repeatUntil": "2022-05-15",
            // "day": 3,
            // "repetition": "NONE",
            // "categoryId": "1",
        }, {
            headers: authHeader()
        })
            .then(response => {
                console.log("Event Updated")
            })
    }

    //put for new event [name, timeFrom, timeTo, ...]
    newEvent(name, timeFrom, timeTo) {
        return axios.post(`${baseUrl}/categories/4/events`, {
            "name": "test eventu",
            "fromTime": "18:00:00",
            "toTime": "22:00:00",
            "startDate": "2022-05-17",
            "repeatUntil": "2022-05-19",
            "day": 3,
            "repetition": "NONE",
            "categoryId": "0",
            "timeBetweenIntervals": 3600,
            "intervalDuration": 3600,
        }, {
            headers: authHeader()
        })
            .then(response => {
                console.log(response)
                console.log("Event created")
            })
    }
}

export default new EventUtils();