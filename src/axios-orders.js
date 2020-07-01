import axios from 'axios';

const instance = axios.create({
    baseURL: "https://react-burger-7e1a4.firebaseio.com/"
});
export default instance;