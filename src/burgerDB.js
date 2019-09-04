import axios from 'axios';

const burgerDB = axios.create({
    baseURL: 'https://burger-udemy-eef3d.firebaseio.com/'
})

export default burgerDB;