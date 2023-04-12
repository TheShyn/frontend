import axios from 'axios';

const user = localStorage.getItem('userInformation');
let token:any
if(user){
    token = JSON.parse(user).accessToken;
}else{
    token = ''
}
const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers:{
        Authorization: 'Bearer ' + token

    }
})


export default instance;