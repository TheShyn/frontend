import { Button, Card, Col, Image, List, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAllProduct, getOneProduct } from '../api/Product';
import IData from '../models/Products';
import Meta from 'antd/es/card/Meta';
interface ICateId {
  _id: string;
}
interface IRelate {
  _id: string,
  name: string,
  categoryId: ICateId,
  img: string,
  price: string,
  description: string
}
export default function Detail() {
  const [product, setProduct] = useState<Partial<IData>>({})
  const { id } = useParams()
  const [relate, setRelate] = useState<Partial<IRelate[]>>([])
  useEffect(() => {
    getOneProduct(id)
      .then(data => {
        console.log(data.data.data);

        setProduct(data.data.data)
      })
      .catch(err => console.log(err));
  }, [])
  console.log(relate);

  useEffect(() => {
    getAllProduct()
      .then(data => {
        // setRelate(data.data.filter((item)=>{
        //   return item.categoryId._id == id
        // }));
        let a = data.data
        setRelate(a.filter((item: IRelate) => item?.categoryId?._id === product?.categoryId?._id && item._id !== id).slice(0, 4))

        // setRelate(data.data.data)
      })
  }, [product])
  return (
    <div>
      <div style={{ marginTop: '30px', display: 'flex', gap: '40px', padding: '0 40px' }}>
        <div>
          <img style={{ width: '700px', height: '600px' }} src={product?.img} alt="" />

        </div>
        <div style={{ marginLeft: '90px' }}>
          <Typography.Title level={2}>{product?.name}</Typography.Title>
          <Typography.Paragraph style={{ fontStyle: 'italic' }}>Uy tín tạo nên thương hiệu</Typography.Paragraph>
          <Typography.Paragraph style={{ fontSize: '28px', fontWeight: 'bold', color: '#ff4d4f' }}>{product?.price} $</Typography.Paragraph>
          <Typography.Paragraph style={{ color: 'rgba(0,0,0,0.6)' }}>{product?.description}</Typography.Paragraph>
          <Button danger style={{ width: '200px', height: '40px', marginTop: '30px' }} type="primary">Add to cart</Button>
        </div>
      </div>
      <div style={{ marginTop: '50px' }}>
        <Typography.Title level={2} style={{ textAlign: 'center', marginTop: '0' }}>Sản phẩm liên quan</Typography.Title>
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
                    <div style={{ textAlign: "center" }}>
                      <Image alt="example" src={product?.img}
                        style={{ width: '300px', height: '200px', objectFit: 'cover' }} />

                    </div>


                  }
                  style={{ margin: '10px 20px', width: 290, overflow: 'hidden', boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
                >
                  <Meta title={<h3 style={{ fontSize: '20px', marginBottom: '0' }}><Link style={{ color: 'black' }} to={`/products/${product?._id}`}>{product?.name}</Link></h3>} />
                  <div>
                    <p>Price: <span style={{ color: '#ff4d4f', fontWeight: 'bold' }}>{product?.price} $</span></p>
                    <p style={{ maxWidth: '300px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>desc : {product?.description}</p>
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
          dataSource={relate}
        >

        </List>
      </div>
    </div>
  )
}
