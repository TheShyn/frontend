import instance from "./instance";

interface IUser{
    name:string,
    role:string
}
export const getAllUser = ()=>{
    return instance.get('/users')
}
export const getDetailUser = (id:string|undefined)=>{
    return instance.get('/users/'+id)
}

export const addNewUser = (data:IUser)=>{
    return instance.post('/users', data)
}
export const deleteUser = (id:string|undefined)=>{
    return instance.delete('/users/'+id)
}
export const updateUser = (id:string|undefined,data:IUser)=>{
    return instance.patch('/users/'+id,data)
}
