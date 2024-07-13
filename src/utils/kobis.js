import axios from "axios";

const API_KOBIS_KEY = process.env.REACT_APP_KOBIS_API_KEY;


const kobis = axios.create({
    baseURL: 'https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/'
})

export default kobis;