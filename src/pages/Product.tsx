import { useEffect, useState } from "react";
import IData from "../models/Products";
interface IProps{
    products1: IData[],
    handleRemove:(id:number) => void;
}
const Product = ({products1,handleRemove}:IProps) => {
    const [data, setData] = useState<Array<IData>>([])
    console.log(data);
    useEffect(() =>{
        setData(products1)
    },[products1])


    return (
        <div>
            {products1.map(product => {
                return (
                    <div key={product.id}>
                        <ul>
                            <li>
                                <p>{product.name}</p>
                                <button onClick={()=>handleRemove(product.id)}>Xóa</button>
                            </li>
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}
export default Product;

