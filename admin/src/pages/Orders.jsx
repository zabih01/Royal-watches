import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="w-full px-3 sm:px-5 lg:px-8">
      <h3 className="text-lg sm:text-xl font-semibold mb-4">Order Page</h3>

      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 
        items-start border border-gray-200 rounded-xl 
        p-4 sm:p-6 lg:p-8 my-3 text-xs sm:text-sm text-gray-700 shadow-sm"
          >
            {/* Icon */}
            <img
              className="w-10 sm:w-12 mx-auto sm:mx-0"
              src={assets.parcel_icon}
              alt=""
            />

            {/* Address + Items */}
            <div className="space-y-2 text-center sm:text-left">
              <div>
                {order.items.map((item, index) => (
                  <p className="py-0.5" key={index}>
                    {item.name} x {item.quantity}
                  </p>
                ))}
              </div>

              <p className="mt-2 font-semibold">
                {order.address.firstName + " " + order.address.lastName}
              </p>

              <div className="leading-tight">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
              </div>

              <p>{order.address.phone}</p>
            </div>

            {/* Order Info */}
            <div className="space-y-1 text-center sm:text-left">
              <p className="font-medium">Items: {order.items.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>
                Payment:{" "}
                <span
                  className={order.payment ? "text-green-600" : "text-red-500"}
                >
                  {order.payment ? "Done" : "Pending"}
                </span>
              </p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Amount */}
            <p className="font-semibold text-sm sm:text-base text-center sm:text-left">
              {currency}
              {order.amount}
            </p>

            {/* Status */}
            <select
              value={order.status}
              onChange={(event) => statusHandler(event, order._id)}
              className="w-full sm:w-auto p-2 rounded-lg border border-gray-300 
          text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
