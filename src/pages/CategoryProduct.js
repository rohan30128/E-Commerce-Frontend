import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Backend } from '../Backend';

export default function CategoryProduct() {
    const [products,setProducts] = useState([]);
    const [category,setCategory] = useState([])
    const params = useParams();
    const navigate = useNavigate();

    const getProductByCategory = async ()=>{
        try {
            const {data} = await axios.get(`${Backend}/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products);
            setCategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }
useEffect(()=>{
   if(params?.slug) getProductByCategory()
},[params.slug])
  return (
    <Layout>
      <div className="container mt-3 category">
        <h4 className='text-center'>Category - {category?.name}</h4>
        <h6 className='text-center'>{products?.length} results found</h6>
        <div className="d-flex flex-wrap">
              {products?.map((p) => {
                return (
                  <div
                    className="card m-2"
                    style={{ width: "18rem" }}
                    key={p._id}
                  >
                    <img
                      src={`${Backend}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-name-price">{p.name}</h5>
                      <p className="card-text">
                        {p.description.substring(0, 30)}...
                      </p>
                      <p className="card-name-price"> ₹ {p.price}</p>
                      <button className="btn btn-primary ms-1" onClick={()=> navigate(`/product/${p.slug}`)}>
                        More Details
                      </button>
                      <button className="btn btn-secondary ms-1">
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
      </div>
    </Layout>
  )
}
