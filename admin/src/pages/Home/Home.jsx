import React from 'react';
import './Home.css';

const Home = () => {
  // In real use, fetch these from an API or state management
  const summaryData = [
    { label: "Total Income", value: "$34,000.00", className: "income" },
    { label: "Income (Last Month)", value: "$1,000.00", delta: "+15%", deltaClass: "positive" },
    { label: "Expenses (Last Month)", value: "$246.00", delta: "-10%", deltaClass: "negative", button: "Withdraw $" },
  ];

  const favoriteDishes = [
    {
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80",
      title: "Rotisserie Chicken",
      sales: 3515,
      reviews: 654
    },
    {
      img: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=300&q=80",
      title: "Organic Tomato Salad with Gorgonzola",
      sales: 2120,
      reviews: 422
    },
    {
      img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=300&q=80",
      title: "Grilled Octopus with Citrus Emulsion",
      sales: 1640,
      reviews: 320
    },
    {
      img: "https://images.unsplash.com/photo-1516685018646-5499d0a7fdde?auto=format&fit=crop&w=300&q=80",
      title: "Bacon Wrapped Gulf Prawns",
      sales: 1200,
      reviews: 251
    }
  ];

  const bestSellers = [
    {
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=100&q=80",
      name: "Lavender Lemonade",
      desc: "Drink • Serves 4 • 24 mins",
      price: "$12.56"
    },
    {
      img: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=100&q=80",
      name: "Plum Blossom Pizza",
      desc: "Pizza • Serves 4 • 24 mins",
      price: "$5.67"
    },
    {
      img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3f5e?auto=format&fit=crop&w=100&q=80",
      name: "Seattle Aperol Spritz",
      desc: "Juice • Serves 4 • 24 mins",
      price: "$11.21"
    },
    {
      img: "https://images.unsplash.com/photo-1519864600265-abb23847ef26?auto=format&fit=crop&w=100&q=80",
      name: "Amaretto di Saronno",
      desc: "Mocktail • Serves 4 • 24 mins",
      price: "$8.15"
    }
  ];

  const orderSummary = [
    { type: "American Food", percent: "27%", count: 251 },
    { type: "Fast Food", percent: "50%", count: 465 },
    { type: "Western Cuisine", percent: "13%", count: 121 },
    { type: "Chinese Food", percent: "5%", count: 47 },
    { type: "Japanese Food", percent: "5%", count: 47 },
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="left">
          <h2>Restaurant Dashboard</h2>
          <p><span>Home</span> / <span className="active">Dashboard</span></p>
        </div>
        <div className="right">
          <button className="btn-manage">Manage Dashboard</button>
          <button className="btn-create">+ Create New Reservation</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="dashboard-summary">
        {summaryData.map((s, i) => (
          <div className={`summary-card${s.className ? ` ${s.className}` : ""}`} key={i}>
            <p>{s.label}</p>
            <h3>{s.value} {s.delta && <span className={s.deltaClass}>{s.delta}</span>}</h3>
            {s.button && <button className="btn-withdraw">{s.button}</button>}
          </div>
        ))}
      </div>

      <div className="dashboard-main">
        {/* Favorites Section */}
        <div className="favorites-section">
          <div className="section-header">
            <h4>Top Rated Dishes</h4>
            <div className="categories">
              <span className="active">All Categories</span>
              <span>Main Course</span>
              <span>Pizza</span>
              <span>Drinks</span>
              <span>Desserts</span>
              <span>More</span>
            </div>
          </div>
          <div className="favorites-items">
            {favoriteDishes.map((dish, i) => (
              <div className="item" key={i}>
                <img src={dish.img} alt={dish.title} />
                <div>
                  <h5>{dish.title}</h5>
                  <p>{dish.sales.toLocaleString()} Total Sales</p>
                  <p>({dish.reviews} reviews)</p>
                </div>
              </div>
            ))}
          </div>
          <p className="view-more">View More</p>
        </div>

        {/* Best Selling Items Section */}
        <div className="selling-section">
          <h4>Best Selling Items</h4>
          <div className="tabs">
            <span className="active">Monthly</span>
            <span>Weekly</span>
            <span>Today</span>
          </div>
          <div className="selling-items">
            {bestSellers.map((item, i) => (
              <div className="selling-item" key={i}>
                <img src={item.img} alt={item.name} />
                <div>
                  <h5>{item.name}</h5>
                  <p>{item.desc}</p>
                </div>
                <span className="price">{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Section Placeholder */}
        {/* <div className="chart-section">
          <h4>Orders Over Time</h4>
          <div className="chart-placeholder">[ Chart coming soon ]</div>
          <div className="chart-summary">
            <p>123k Avg. Sales per Month</p>
            <p>598 Avg. Sales per Day</p>
          </div>
        </div> */}

        {/* Order Delivery Breakdown Table */}
        <div className="order-summary">
          <h4>Order Delivery Breakdown</h4>
          <p>Total: <strong>932</strong></p>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Percent</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {orderSummary.map((row, i) => (
                <tr key={i}>
                  <td>{row.type}</td>
                  <td>{row.percent}</td>
                  <td>{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
