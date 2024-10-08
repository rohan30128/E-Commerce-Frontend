import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/Cart";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Backend } from "../Backend";

export default function CartPage() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    let total = 0;
    cart?.map((item) => {
      total = total + Number(item.price);
    });
    return total.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  //delete Item
  const removeCartItem = (pid) => {
    try {
      const myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(myCart));
      setCart(myCart);
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gatway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${Backend}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payment
  const handlePayment =async () => {
    try {
      setLoading(true);
      const { nonce } =await instance.requestPaymentMethod();
      const {data} = await axios.post(`${Backend}/api/v1/product/braintree/payment`,{nonce,cart})
      setLoading(false);
      localStorage.removeItem("cart")
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="container cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 m-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 0
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            {cart?.map((p) => {
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
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price : {p.price}</p>
                    </div>
                    <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-md-5  cart-summary">
            <h2>Cart Summary</h2>
            <p>Total  |  CheckOut  |  Payment</p>
            <hr />
            <h4>Total : {totalPrice()}</h4>
            {auth?.user?.address ? (
              <div className="mb-3">
                <h4>Current Address</h4>
                <h5>{auth?.user?.address}</h5>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outlin-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? ("") : (
                <>
                 <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: "vault",
                  },
                }}
                onInstance={(instance) => setInstance(instance)}
              />
              <button className="btn btn-primary" onClick={handlePayment}
              disabled={loading || !instance || !auth?.user?.address}
              >
                {loading ? "Processing..." : "Make Payment"}
              </button>
                </>
              )}
             
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
