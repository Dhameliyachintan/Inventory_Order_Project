import React, { useState } from "react";
import { useInventory } from "../contextapi/InventoryProvider"; 
import { useCart } from "../contextapi/CartProvider"; 
import { useNavigate } from "react-router-dom"; 

const CustomerDashboard = () => {
  const { getOrders } = useInventory(); 
  const { addToCart } = useCart(); 

  const orders = getOrders();

  const handleAddToCart = (order) => {
    console.log("order", order);
    addToCart({ ...order, quantity: 1 }); 
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Orders List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {orders.map((order, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 border border-gray-300">
            <h3 className="text-lg font-semibold">{order.productName}</h3>
            <p><strong>Available Stock:</strong> {order.availableStock}</p>
            <p><strong>Price:</strong> ${order.price.toFixed(2)}</p>
            <p><strong>Status:</strong> {order.orderStatus}</p>
            {/* <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-16 border border-gray-300 rounded-md px-2 my-2"
            /> */}
            <button
              onClick={() => handleAddToCart(order)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;
