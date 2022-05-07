import axios from "axios";
import {baseUrl} from "../../../../../config/const";
import authHeader from "../../../../../services/auth-header";

class SourcesUtils {
    getAllSources() {
        const systemId = 1
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