import axios from "axios";
import {baseUrl} from '../../../../config/const';
import authHeader from '../../../../services/auth-header';


class EventUtils {
    //get all events [name, timeFrom, timeTo]
    getAllEvents(id) {
        return axios.get('${baseUrl}' + '/systems/' + id + '/events', {
            headers: authHeader()
        });
    }

    //patch for update selected event [name, timeFrom, timeTo, ...]
    updateEvent(id, name, timeFrom, timeTo) {
        return axios.patch('${baseUrl}/endpoint', {name, timeFrom, timeTo}, {
            headers: authHeader()
        })
            .then(response => {
                console.log("Event Updated")
            })
    }

    //put for new event [name, timeFrom, timeTo, ...]
    newEvent(name, timeFrom, timeTo) {
        return axios.put('${baseUrl}/endpoint', {name, timeFrom, timeTo}, {
            headers: authHeader()
        })
            .then(response => {
                console.log("Event created")
            })
    }
}

export default new EventUtils();