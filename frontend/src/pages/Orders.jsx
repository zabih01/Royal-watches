import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, products, currency, cartItems } =
    useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
              image: Array.isArray(item.image)
                ? item.image[0]
                : item.image?.includes(",")
                  ? item.image.split(",")[0]
                  : item.image || "",
            });
          });
        });
        setOrders(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  // Build orders data from cartItems
  // useEffect(() => {
  //   const tempOrders = [];
  //   for (const itemId in cartItems) {
  //     if (cartItems[itemId] > 0) {
  //       const product = products.find((p) => p._id === itemId);
  //       if (product) {
  //         tempOrders.push({
  //           _id: itemId,
  //           name: product.name,
  //           image: product.image[0],
  //           price: product.price,
  //           quantity: cartItems[itemId],
  //           date: new Date(),
  //         });
  //       }
  //     }
  //   }
  //   setOrders(tempOrders);
  // }, [cartItems, products]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          You have no orders yet.
        </p>
      ) : (
        <div>
          {orders.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  className="w-16 sm:w-20"
                  src={item.image}
                  alt={item.name}
                />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className="text-lg">
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <p className="mt-2">
                    Date:
                    <span className="text-gray-400">
                      <span className="text-gray-400">
                        {new Date(item.date).toDateString()}
                      </span>
                    </span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button
                  onClick={loadOrderData}
                  className="border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
