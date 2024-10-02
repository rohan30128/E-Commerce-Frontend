import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
import { Backend } from "../../Backend";

export default function AdminOrders() {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "delivered",
    "cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState();

  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${Backend}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (orderId, value) => {
    try {
      const {} = await axios.put(
        `${Backend}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title="All Orders Data">
      <div className="row container">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>

          {orders?.map((o, i) => {
            return (
              <div className="border shadow" key={i}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Status</th>
                      <th>Buyer</th>
                      <th>Date</th>
                      <th>Payment</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          variant={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.payments?.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products.map((p) => {
                    return (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`${Backend}/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            height={"100px"}
                            width={"100px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price : {p.price}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
