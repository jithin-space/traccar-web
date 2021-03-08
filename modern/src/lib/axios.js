import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
});

// Where you would set stuff like your 'Authorization' header, etc ...
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.withCredentials = true;

// Also add/ configure interceptors && all the other cool stuff

// instance.interceptors.request...

export default instance;