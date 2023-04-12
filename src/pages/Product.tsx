import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Image, List, Menu, Space } from 'antd';
import { getAllProduct } from '../api/Product';
import IData from '../models/Products';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getAllCate } from '../api/categories';
interface DataType {
    key: string | number;
    _id: string;
    name: string;
    price: number,
    img:string,
    description: string
}
interface Icheck{
    _id: string
}
interface Cate {
    label: string,
    _id: string,
    name:string,
    categoryId:Icheck
}
interface Item {
    _id: string,
    name: string
}
const Product = () => {
    const [items, setItems] = useState<DataType[]>([])
    const { Meta } = Card;
    const params = useLocation();
    const id = params.search.split("=")[1] || 'all'
    const [cate, setCate] = useState([])
    const obj = {
        key: "all",
        // _id:'all',
        label: <Link to={`/products?cate=all`}>All</Link>
    }
    const data = cate.concat(obj)
    useEffect(() => {
        getAllCate()
            .then(data => {
                setCate(data.data.data.map((item: Item) => {
                    return {
                        _id: item._id,
                        label: <Link to={`/products?cate=${item._id}`}>{item.name}</Link>
                    }
                }))


            })
            .catch((err) => {
                console.log(err);

            })
    }, [])
    useEffect(() => {
        getAllProduct()
            .then(data => {     
                if(id =='all'){
                    setItems(data.data.map((item: IData) => {
                        return {
                            key: item._id,
                            ...item
                        }
                    })
                    )
                    
                }else{
                    setItems(data.data.map((item: IData) => {
                        return {
                            key: item._id,
                            ...item
                        }
                    }).filter((item:Cate)=> item?.categoryId?._id==id)
                    )
                }

            })
            .catch((err) => console.log(err))
    }, [id])
    return (
        <Space style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Menu
                items={data}
                style={{ marginTop: '20px', width: 200, height: '100%' }}

            >

            </Menu>

            <List
                pagination={{ pageSize: 8 }}
                grid={{ gutter: 16 }}
                // style ={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr'}}
                // style={{display:"flex"}}
                renderItem={(product, index) => {
                    console.log(product);   
                    
                    return (
                        <Col span={8}>
                            <Card
                                key={index}
                                hoverable
                                cover={
                                    <Link to="/products" style={{textAlign:"center"}}>
                                        <Image alt="example" src={product.img}
                                            style={{ width: '300px',height: '200px',objectFit:'cover'}} />

                                    </Link>
                                }
                                style={{ margin: '10px 0', width: 290, overflow: 'hidden', boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
                            >
                                <Meta title={<h3 style={{ fontSize: '20px', marginBottom: '0' }}><Link style={{ color: 'black' }} to={`/products/${product?._id}`}>{product?.name}</Link></h3>} />
                                <div>
                                    <p>Price: <span style={{ color: '#ff4d4f', fontWeight: 'bold' }}>{product?.price} $</span></p>
                                    <p style={{maxWidth:'300px',whiteSpace: "nowrap",overflow:"hidden",textOverflow: "ellipsis"}}>desc : {product?.description}</p>
                                    <div>
                                        <Link to={`/products/${product?._id}`}>
                                            <Button style={{ width: '100%' }}>Show more </Button>
                                        </Link>
                                    </div>
                                </div>

                            </Card>
                        </Col>

                    )
                }}
                dataSource={items}
            >

            </List>
        </Space>
    )
}
export default Product;

