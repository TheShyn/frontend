import instance from "./instance";
interface ICate{
    name: string
}
export const addNewCate = (data:ICate)=>{
    return instance.post('/categories', data)
}
export const deleteCate = (id:string|undefined)=>{
    return instance.delete('/categories/'+id)
}
export const updateCate = (id:string|undefined,data:ICate)=>{
    return instance.patch('/categories/'+id,data)
}
export const getAllCate = ()=>{
    return instance.get('/categories')
}
export const getDetailCate = (id:string|undefined)=>{
    return instance.get('/categories/'+id)
}
