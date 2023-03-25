import { useEffect, useState } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Product from './pages/Product'
import { addNewProduct, getAllProduct, updateProduct } from './api/Product'
import axios from 'axios'
import IData from './models/Products'
import AddNew from './pages/AddNew'
import UpData from './models/Product1'
import UpdateProduct from './pages/UpdateProduct'

function App() {
  const [products, setProducts] = useState<IData[]>([])
  const handleDelete = async (id:number) =>{
    try {
      const data = await axios.delete(`http://localhost:3000/products/${id}`)
      console.log(data);
      setProducts(products.filter(product => product.id !== id))
    } catch (error) {
      console.log(error);
      
    }

  }

  const onHandleAdd = async (product:UpData) => {
    console.log('app.js', product)
    try {
      const data = await addNewProduct(product)
      setProducts([data.data])
    } catch (error) {
      console.log(error);
    }
  }

  const onHandleUpdate = async (product:IData) => {
    // console.log(product);
    try {
      const data = await updateProduct(product.id,product)
      console.log(data.data);
      setProducts([data.data])
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    getAllProduct().then(({ data }) => setProducts(data))
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Product products1={products} handleRemove = {handleDelete} />} />
        <Route path="/add" element={<AddNew onAdd = {onHandleAdd}/>} />
        <Route path="/update/:id" element={<UpdateProduct products1={products} onHandleUpdate = {onHandleUpdate}/>} />
      </Routes>
    </div>
  )
}

export default App
