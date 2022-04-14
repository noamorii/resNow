import axios from 'axios';
import {baseUrl} from "../config/const";

const login = (username, password) => {
    return (axios.post(`${baseUrl}/signin`, {}, {
            params: {"username": username, "password": password}
        }).then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data
        }));
}

const logout = () => {
    localStorage.removeItem('user');
}

const register = (firstname, lastname, username, email, password) => {
    return (axios.post(`${baseUrl}/signup`, {}, {
            params: {
                "firstname": firstname, "lastname": lastname, "username": username, "email": email, "password": password
            }
        }));
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

const AuthService = {
    register, login, logout, getCurrentUser,
};
export default AuthService;