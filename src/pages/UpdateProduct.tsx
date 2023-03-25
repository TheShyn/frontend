import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import IData from '../models/Products';

interface Product{
    products1:IData[],
    onHandleUpdate: (data:IData) => void
}

export default function UpdateProduct({products1,onHandleUpdate}:Product) {
    const {id} = useParams()
    const [value,setValue] = useState<IData>({name:'',price:'0',id:Number(id)})
    const [product,setProduct] =useState<Partial<IData>>({}) // important
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const name = e.target.name;
        const valueInput = e.target.value
        setValue({ ...value, [name]: valueInput })        
    }
    
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const newData = {...product,...value}
        onHandleUpdate(newData)
        console.log(product);
        
    }
    
    useEffect(()=>{
        setProduct(products1.filter(product => +product.id === Number(id))[0])
    },[products1])
  return (
    <form onSubmit = {onSubmit}>
        <input onChange={onChange} defaultValue = {product?.name}  type="text" name="name" placeholder="Name" />
        <input onChange={onChange} defaultValue = {product?.price} type="number" name="price" placeholder="price" />
    <button>submit</button>
</form>
  )
}
