import axios from "axios";
import {baseUrl} from "../../../../../config/const";
import authHeader from "../../../../../services/auth-header";

class SourcesUtils {
    getAllSources() {
        const systemId = axios.get(`${baseUrl}/systems/my`, {
            headers: authHeader()
        }).then((response) => {
            // console.log(response.data.id)
            return response.data.id
        }).catch((error) => {
            console.log(error)
        })
        return axios.get(`${baseUrl}/systems/` + systemId + `/sources`, {
            headers: authHeader()
        }).then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
        })
    }
}

export default new SourcesUtils()