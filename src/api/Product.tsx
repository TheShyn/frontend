import UpData from "../models/Product1";
import instance from "./instance";

const getAllProduct = () => {
    return instance.get('/products')
}
const getOneProduct = (id:string | undefined) => {
    return instance.get('/products/' + id)
}
const delteProduct = (id:string) => {
    return instance.delete('/products/' + id)
}
const addNewProduct = (data:UpData) => {
    return instance.post('/products',data)
}
const updateProduct = (id:string | undefined,data:UpData) => {
    return instance.patch('/products/' + id,data)
}

export { getAllProduct, getOneProduct, delteProduct,addNewProduct, updateProduct }