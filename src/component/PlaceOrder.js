import React, { useState } from 'react';
import { useOrders } from '../contextapi/OrderProvider';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { addOrder } = useOrders();
  const navigate = useNavigate(); 
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [orderDescription, setOrderDescription] = useState('');
  const [productName, setProductName] = useState('');
  const [email, setEmail] = useState('');
  const [orderDate, setOrderDate] = useState(0); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      customerName,
      address,
      contactNumber,
      orderDescription,
      productName,
      email,
      orderDate 
    };
    addOrder(newOrder); 
    navigate('/orderadmin'); 
    console.log(newOrder);
    setCustomerName('');
    setAddress('');
    setContactNumber('');
    setOrderDescription('');
    setProductName('');
    setEmail('');
    setOrderDate(0);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Place Your Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Customer Name</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contact Number</label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Order Date</label>
          <input
            type="date"
            value={orderDate === 0 ? '' : orderDate} 
            onChange={(e) => setOrderDate(e.target.value ? e.target.value : 0)} 
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;
