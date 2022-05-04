import axios from "axios";
import {baseUrl} from "../../../../../config/const";
import authHeader from "../../../../../services/auth-header";

class SourcesUtils {
    getAllSources() {
        const systemId = axios.get(`${baseUrl}/systems/my`, {
            headers: authHeader()
        })
        return axios.get(`${baseUrl}/systems/` + systemId + `/sources`, {
            headers: authHeader()
        })
    }
}

export default new SourcesUtils()