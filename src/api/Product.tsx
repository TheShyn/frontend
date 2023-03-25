import UpData from "../models/Product1";
import instance from "./instance";

const getAllProduct = () => {
    return instance.get('/products')
}
const getOneProduct = (id:number) => {
    return instance.get('/products/' + id)
}
const delteProduct = (id:number) => {
    return instance.delete('/products/' + id)
}
const addNewProduct = (data:UpData) => {
    return instance.post('/products',data)
}
const updateProduct = (id:number,data:UpData) => {
    return instance.patch('/products/' + id,data)
}

export { getAllProduct, getOneProduct, delteProduct,addNewProduct, updateProduct }