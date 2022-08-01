import axios from "axios";

const instance = axios.create({
    baseURL:'https://spur-backend.herokuapp.com/'
});

// instance.defaults.headers.common['Authorisation'] = 'Auth from instance'

export default instance;