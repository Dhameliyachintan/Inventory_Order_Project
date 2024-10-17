import React from "react";
import { useOrders } from "../contextapi/OrderProvider";
// import { useOrders } from './OrderContext';

const Orderadmin = () => {
  const { orders } = useOrders();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      {orders.length === 0 ? (
        <p>No orders have been placed yet.</p>
      ) : (
        <ul className="list-disc pl-5">
          {orders.map((order, index) => (
            <li key={index} className="mb-2">
              <div>
                <strong>Product Name:</strong> {order.productName}
              </div>
              <div>
                <strong>Customer Name:</strong> {order.customerName}
              </div>
              <div>
                <strong>Address:</strong> {order.address}
              </div>
              <div>
                <strong>Contact Number:</strong> {order.contactNumber}
              </div>
              <div>
                <strong>Email:</strong> {order.email}
              </div>
              <div>
                <strong>Order Date:</strong> {order.orderDate === 0 ? 'Not provided' : order.orderDate} 
              </div>
              <hr className="my-2" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orderadmin;
