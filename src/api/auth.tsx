import ILogin from "../models/Login";
import IRegister from "../models/Register";
import instance from "./instance";

const postLogin = (data:ILogin)=>{
    return instance.post('/auth/login', data)
}
const postRegister = (data:IRegister)=>{
    return instance.post('/auth/register',data)
}
export {postLogin, postRegister}