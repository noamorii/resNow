import axios from "axios";
import {authHeader} from "./auth-header";
import {baseUrl} from "../config/const";

const getPublicContent = () => {
    return axios.get(
        `${baseUrl}/beta`
    );
};

const getClientBoard = () => {
    return axios.get(
        `${baseUrl}/client`,
        {headers: authHeader()});
};

const getCustomerBoard = () => {
    return axios.get(
        `${baseUrl}/customer`,
        {headers: authHeader()});
};

const UserService = {
    getPublicContent,
    getClientBoard,
    getCustomerBoard
};
export default UserService;