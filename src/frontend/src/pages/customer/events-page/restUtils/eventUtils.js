import axios from "axios";
import {baseUrl} from '../../../../config/const';
import authHeader from '../../../../services/auth-header';


class EventUtils {
    //get all slots of event [name, timeFrom, timeTo]
    getAllSlots(id) {
        return axios.get('${baseUrl}' + '/systems/' + id + '/events', {
            headers: authHeader()
        });
    }

    //put for new reservation on customer [name, surname, email, ...]
    newReservation(name, surname, email) {
        return axios.put('${baseUrl}/endpoint', {name, surname, email}, {
            headers: authHeader()
        })
            .then(response => {
                console.log("Reservation created")
            })
    }
}

export default new EventUtils();