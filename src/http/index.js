import axios from 'axios';

var http = axios

//http settings
http.defaults.baseURL = localStorage.getItem("dev") ? 'http://localhost:80/api/v1' : 'http://141.8.199.108/api/v1'



export default http 