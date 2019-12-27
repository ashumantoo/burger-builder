import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-3f9d5.firebaseio.com/'
});

export default instance;