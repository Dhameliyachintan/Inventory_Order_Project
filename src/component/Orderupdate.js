import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useInventory } from "../contextapi/InventoryProvider";

const OrderUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateOrder } = useInventory();
  
  const { orderData } = location.state || {};
  const [productName, setProductName] = useState("");
  const [availableStock, setAvailableStock] = useState("");
  const [price, setPrice] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (orderData) {
      setProductName(orderData.productName);
      setAvailableStock(orderData.availableStock);
      setPrice(orderData.price);
      setOrderStatus(orderData.orderStatus);
      setDescription(orderData.description);
    }
  }, [orderData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedOrder = {
      ...orderData,
      productName,
      availableStock: parseInt(availableStock),
      price: parseFloat(price),
      orderStatus,
      description,
    };

    updateOrder(updatedOrder);
    navigate("/AdminDashboard");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Update Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Available Stock</label>
          <input
            type="number"
            value={availableStock}
            onChange={(e) => setAvailableStock(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <input
            type="text"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded py-2 px-4"
        >
          Update Order
        </button>
      </form>
    </div>
  );
};

export default OrderUpdate;
