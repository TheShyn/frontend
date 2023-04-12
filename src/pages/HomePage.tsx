import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Image, List, Typography } from 'antd';
import { getAllProduct } from '../api/Product';
import IData from '../models/Products';
import { Link } from 'react-router-dom';

interface DataType {
  key: string | number;
  _id: string;
  name: string;
  price: number,
  img: string
}
export default function HomePage() {
  const [items, setItems] = useState<DataType[]>([])
  const { Meta } = Card;
  useEffect(() => {
    getAllProduct()
      .then(data => setItems(data.data.map((item: IData) => {
        return {
          key: item._id,
          ...item
        }
      }).slice(0, 4)))
      .catch((err) => console.log(err))
  }, [])
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '450px',
    color: '#fff',
    lineHeight: '300px',
    textAlign: 'center',
    background: '#364d79',
    width: '100%',
    objectFit: 'cover'
  };
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  return (
    <div>
      <Carousel autoplay afterChange={onChange}>
        <div>
          <img style={contentStyle} src="https://marketplace.canva.com/EAE8Tb5QFJE/1/0/1600w/canva-clean-and-professional-marketing-manager-linkedin-banner-2_y74bBBiNA.jpg" alt="Image 1" />
        </div>
        <div>
          <img style={contentStyle} src="https://marketplace.canva.com/EAFWN8d4lL8/1/0/1600w/canva-creamy-line-art-floral-personal-linkedin-banner-5_aViwZweYI.jpg" alt="Image 2" />
        </div>
        <div>
          <img style={contentStyle} src="https://marketplace.canva.com/EAFUS85PneM/1/0/1600w/canva-pastel-watercolor-floral-personal-linkedin-banner-WxYkcf9oRPw.jpg" alt="Image 3" />
        </div>
      </Carousel>

      <div style={{ marginTop: '50px' }}>
        <Typography.Title level={2} style={{ textAlign: 'center', marginTop: '0' }}>Sản phẩm nổi bật</Typography.Title>
        <List
          grid={{ gutter: 8, column: 4 }}
          renderItem={(product, index) => {
            return (
              <Card
                key={index}
                hoverable
                cover={
                  <Link to="/" style={{ textAlign: "center", width: '100%' }}>
                    <Image alt="example" src={product.img}
                      style={{ width: '333px', height: '200px', objectFit: 'cover' }} />

                  </Link>
                }
                style={{ margin: '15px', width: 330, overflow: 'hidden', boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
              >
                <Meta title={<h3 style={{ fontSize: '20px', marginBottom: '0' }}><Link style={{ color: 'black' }} to={`/products/${product?._id}`}>{product?.name}</Link></h3>} />
                <div>
                  <p>Price: <span style={{ color: '#ff4d4f', fontWeight: 'bold' }}>{product?.price} $</span></p>
                  <p>desc</p>
                  <div>
                    <Link to={`/products/${product?._id}`}>
                      <Button style={{ width: '100%' }}>Show more </Button>
                    </Link>
                  </div>
                </div>

              </Card>

            )
          }}
          dataSource={items}
        >

        </List>
      </div>
    </div>
  )
}
