import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { getAllProduct } from './api/Product'
import LayoutAdmin from './layout/admin'
import LayoutClient from './layout/client'
import IData from './models/Products'
import Detail from './pages/Detail'
import HomePage from './pages/HomePage'
import Product from './pages/Product'
import AddNew from './pages/admin/AddNew'
import Dashboard from './pages/admin/Dashboard'
import ProductManagementPage from './pages/admin/ProductsMangement'
import UpdateProduct from './pages/admin/UpdateProduct'
import Login from './pages/auth/Login'
import LayoutAuth from './layout/auth'
import Register from './pages/auth/Register'
import ManagementCategories from './pages/admin/categories'
import AddNewCate from './pages/admin/categories/AddNewCate'
import UpdateCate from './pages/admin/categories/UpdateCate'
import ManagementUsers from './pages/admin/user'
import UpdateUser from './pages/admin/user/UpdateUser'

function App() {
  const [products, setProducts] = useState<IData[]>([])
  useEffect(() => {
    getAllProduct().then(({ data }) => setProducts(data))
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<HomePage />} />
          <Route path='products'>
            <Route index element={<Product  />} />
            <Route path='/products/:id' element={<Detail/>} />
          </Route>
        </Route>
        <Route path='/admin' element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path='managementProducts' element={<ProductManagementPage />} />

          <Route path="managementProducts/add" element={<AddNew />} />
          <Route path="products/:id/update" element={<UpdateProduct />} />

          {/* cate */}
          <Route path="managementCategories" element={<ManagementCategories />} />
          <Route path="managementCategories/add" element={<AddNewCate />} />
          <Route path="managementCategories/:id/update" element={<UpdateCate />} />
        {/* user */}
          <Route path="managementUsers" element={<ManagementUsers />} />
          <Route path="managementUsers/:id/update" element={<UpdateUser />} />

        
        </Route>
        <Route path='auth' element={<LayoutAuth/>}>
          <Route index element = {<Login/>}  />
          <Route path='register' element = {<Register/>}  />
        </Route>
      </Routes>
    </div>
  )
}

export default App
