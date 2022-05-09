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
                fromDate:currentDay,
                toDate:lastDay
            }
        });
    }

    //patch for update selected event [name, timeFrom, timeTo, ...]
    updateEvent(id, name, timeFrom, timeTo) {
        return axios.put('${baseUrl}/endpoint', {name, timeFrom, timeTo}, {
            headers: authHeader()
        })
            .then(response => {
                console.log("Event Updated")
            })
    }

    //put for new event [name, timeFrom, timeTo, ...]
    newEvent(name, timeFrom, timeTo) {
        return axios.put(`${baseUrl}/category/4/events`, {name, timeFrom, timeTo}, {
            headers: authHeader()
        })
            .then(response => {
                console.log("Event created")
            })
    }
}

export default new EventUtils();