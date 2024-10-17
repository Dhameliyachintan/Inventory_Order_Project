import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useInventory } from "../contextapi/InventoryProvider";

export default function AdminInventoryForm() {
  const navigate = useNavigate();
  const { addOrder } = useInventory();

  const [productName, setProductName] = useState("");
  const [availableStock, setAvailableStock] = useState("");
  const [price, setPrice] = useState("");
  const [orderStatus, setOrderStatus] = useState(""); 
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!productName || !availableStock || !price || !orderStatus) {
      setError("Please fill in all fields correctly.");
      toast.error("Please fill in all fields correctly.");
      return;
    }

    setError("");

    const newOrder = {
      productName,
      availableStock: Number(availableStock),
      price: Number(price),
      orderStatus, 
      description,
    };

    addOrder(newOrder);
    toast.success("Order created successfully!");
    resetForm();
    navigate("/AdminDashboard");
  };

  const resetForm = () => {
    setProductName("");
    setAvailableStock("");
    setPrice("");
    setOrderStatus("");
    setDescription("");
    setError("");
  };

  return (
    <div className="max-w-xl mx-auto mt-[91px] p-6 bg-white rounded-lg shadow-md pt-5">
      <form onSubmit={handleSubmit}>
        {error && <div className="mb-4 text-red-600">{error}</div>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Product Name:
          </label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Available Stock:
          </label>
          <input
            type="number"
            min="0"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={availableStock}
            onChange={(e) => setAvailableStock(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Price (per unit):
          </label>
          <input
            type="number"
            min="0"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Order Status:
          </label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
          >
            <option value="">Select Order Status</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description for this product"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Submit
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
