import React from "react";
import "./TrackOrder.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaPrint, FaCheckCircle } from "react-icons/fa";

const orderTrackingSteps = [
  "Order Placed",
  "Order Accept",
  "Order Preparing",
  "Order Prepared",
  "Order Delivered"
];

const orderItems = [
  {
    name: "Egg Roll",
    details: "Choose A Filling: Chicken",
    price: 1.50,
    qty: 1,
    img: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?h=200&w=200&fit=crop"
  },
  {
    name: "Vegetable Roll",
    details: "",
    price: 1.00,
    qty: 1,
    img: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?h=200&w=200&fit=crop"
  },
  {
    name: "Bacon Double Cheeseburger",
    details: "Size: Regular",
    price: 3.33,
    qty: 1,
    img: "https://images.pexels.com/photos/1639566/pexels-photo-1639566.jpeg?h=200&w=200&fit=crop"
  },
];

const TrackOrder = () => (
  <div className="trackorder-root">
    {/* Left: Order Status Block */}
    <div className="trackorder-status card">
      <div className="trackorder-header">
        <div>
          <span className="oid">
            Order ID: <span className="oid-link">#2207256</span>
          </span>
          <div className="order-date">10:10 AM, 22-07-2025</div>
        </div>
      </div>
      <div className="order-type">
        <div>
          <span className="muted">Order Type:</span>
          <span> Dining Table</span>
        </div>
        <div>
          <span className="muted">Table Name:</span>
          <span> Table 2</span>
        </div>
      </div>
      <div className="delivery-time-block">
        <span className="delivery-label">Estimated delivery time</span>
        <div className="delivery-minutes">30 min</div>
        <FaCheckCircle className="delivery-success" />
        <div className="got-order-text">Got your order!</div>
      </div>
      <div className="tracking-steps">
        {orderTrackingSteps.map((step, i) => (
          <div key={step} className={`track-step ${i === 0 ? 'active' : ''}`}>
            <div className="circle"></div>
            <span>{step}</span>
          </div>
        ))}
      </div>
      <div className="order-addr-block">
        <div className="addr-title">Mirpur-1 (main)</div>
        <div className="addr-info">
          <FaMapMarkerAlt color="#686d82" /> House : 25, Road No: 2, Block A, <br />
          Mirpur-1, Dhaka 1216
        </div>
        <a href="tel:01234567890" className="addr-phone">
          <FaPhoneAlt /> 
        </a>
      </div>
      <div className="paymentinfo-block">
        <div><b>Method:</b> <span>Cash/Card</span></div>
        <div><b>Status:</b> <span className="status-unpaid">Unpaid</span></div>
      </div>
    </div>

    {/* Right: Order Items/Card */}
    <div className="trackorder-details card">
      <div className="details-header">Order Details</div>
      <div className="details-items">
        {orderItems.map((item, i) => (
          <div className="details-item" key={item.name}>
            <img src={item.img} alt={item.name} />
            <div className="details-item-desc">
              <span className="item-qty">{item.qty}</span>
              <div className="item-title">{item.name}</div>
              {item.details && <div className="item-option">{item.details}</div>}
              <div className="item-price">৳{item.price.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="details-total-block">
        <div className="details-row">
          <span>Subtotal</span>
          <span>৳5.83</span>
        </div>
        <div className="details-row total-row">
          <span>Total</span>
          <span>৳5.83</span>
        </div>
      </div>
      <button className="print-btn">
        <FaPrint /> Print Invoice
      </button>
    </div>
  </div>
);

export default TrackOrder;
