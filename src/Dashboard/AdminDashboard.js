import React from "react";
import { useInventory } from "../contextapi/InventoryProvider"; 
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { getOrders, deleteOrder } = useInventory(); 
  const orders = getOrders(); 
  const navigate = useNavigate(); 

  const handleEdit = (orderData) => {
    navigate("/orderupdate", { state: { orderData } }); 
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      deleteOrder(index); 
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Orders List</h2>

      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-2 px-4 border-b">Product Name</th>
                <th className="py-2 px-4 border-b">Available Stock</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="text-gray-600 border-b hover:bg-gray-100">
                  <td className="py-2 px-4">{order.productName}</td>
                  <td className="py-2 px-4">{order.availableStock}</td>
                  <td className="py-2 px-4">
                    ${typeof order.price === 'number' ? order.price.toFixed(2) : 'N/A'}
                  </td>
                  <td className="py-2 px-4">{order.orderStatus}</td>
                  <td className="py-2 px-4">{order.description}</td>
                  <td className="py-2 px-4 flex space-x-2 justify-center">
                    <button
                      onClick={() => handleEdit(order)} 
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No orders available</p>
      )}
    </div>
  );
};

export default AdminDashboard;
