import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Backend } from "../Backend";

export default function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct,setRelatedProduct] = useState([]);
  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${Backend}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id,data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params.slug]);

  //get similar  products
  const getSimilarProducts = async (pid,cid)=>{
    const {data} = await axios.get(`${Backend}/api/v1/product/related-product/${pid}/${cid}`);
    setRelatedProduct(data?.products);
  }
  return (
    <Layout>
      <div>
      {product && product._id ? (
          <div className="row container product-details">
            <div className="col-md-6">
              <img
                src={`${Backend}/api/v1/product/product-photo/${product._id}`}
                className="card-img-top"
                alt={product.name}
                height={"300px"}
                width={"300px"}
              />
            </div>
            <div className="col-md-6 product-details-info">
              <h1 className="text-center">Product Details</h1>
              <h6> Name : {product.name}</h6>
              <h6> description : {product.description}</h6>
              <h6> Price : {product.price} INR</h6>
              <h6> Category : {product.category.name}</h6>
              <button className="btn btn-secondary ms-1">
                ADD TO CART
              </button>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <hr />
        <div className="row container similar-products">
          {relatedProduct.length <1 && (<p className="text-center">No Similar Product Found</p>)} 
          <h6>Similar Products</h6>
          <div className="d-flex flex-wrap">
              {relatedProduct?.map((p) => {
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
                    <div className="card-body ">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">
                        {p.description.substring(0, 30)}...
                      </p>
                      <p className="card-text"> ₹ {p.price}</p>
                      
                      <button className="btn btn-secondary ms-1">
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
        </div>
      </div>
    </Layout>
  );
}
