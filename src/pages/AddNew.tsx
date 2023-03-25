import React, { useState } from 'react';
import UpData from '../models/Product1';

interface AddDestructuring {
    onAdd: (product: UpData) => void;
}

export default function AddNew({ onAdd }: AddDestructuring) {
    const [value,setValue] = useState<UpData>({name:'',price:'0'})
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const name = e.target.name;
        const valueInput = e.target.value
        setValue({ ...value, [name]: valueInput })        
    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        onAdd(value)
    }

    return (
        <form onSubmit = {onSubmit}>
            <input onChange={onChange} type="text" name="name" placeholder="Name" />
            <input onChange={onChange} type="number" name="price" placeholder="price" />
            <button>submit</button>
        </form>
    )
}
