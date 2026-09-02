import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import "./App.css";

const API = "https://flood-help-center-backend.vercel.app";

// ==================== HOME ====================

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <p className="small-title">FLOOD HELP & INFORMATION</p>

          <h1>Flood Help Center</h1>

          <p className="hero-text">
            Find important flood information, emergency assistance,
            affected areas and ways to help people in need.
          </p>

          <div className="hero-buttons">
            <Link to="/help" className="button">
              Get Help
            </Link>

            <Link to="/affected-areas" className="button secondary-button">
              Affected Areas
            </Link>

            <Link to="/products" className="button secondary-button">
              Shop Products 🛒
            </Link>
          </div>
        </div>
      </section>

      <section className="cards-section">
        <h2>How Can We Help?</h2>

        <div className="cards">
          <div className="info-card">
            <div className="card-icon">📍</div>

            <h3>Affected Areas</h3>

            <p>
              View information about areas affected by floods and important updates.
            </p>

            <Link to="/affected-areas">Learn More →</Link>
          </div>

          <div className="info-card">
            <div className="card-icon">🆘</div>

            <h3>Emergency Help</h3>

            <p>
              Find important emergency information and assistance for people affected by floods.
            </p>

            <Link to="/emergency">Get Help →</Link>
          </div>

          <div className="info-card">
            <div className="card-icon">🤝</div>

            <h3>Request Help</h3>

            <p>
              People affected by floods can submit a request for assistance.
            </p>

            <Link to="/help">Request Help →</Link>
          </div>

          <div className="info-card">
            <div className="card-icon">🛒</div>

            <h3>Relief Products</h3>

            <p>
              Browse useful flood relief products and essential supplies.
            </p>

            <Link to="/products">View Products →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ==================== PRODUCTS ====================

function Products({ cart, addToCart, removeFromCart, updateQuantity, clearCart }) {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const products = [
    {
      id: 1,
      name: "Food Relief Package",
      price: 2000,
      icon: "🥫",
      description:
        "Essential food supplies for families affected by flooding.",
    },
    {
      id: 2,
      name: "Clean Water Pack",
      price: 500,
      icon: "💧",
      description:
        "Clean drinking water supplies for emergency situations.",
    },
    {
      id: 3,
      name: "Medical First Aid Kit",
      price: 1500,
      icon: "🩹",
      description:
        "Basic first aid supplies for emergency needs.",
    },
    {
      id: 4,
      name: "Emergency Shelter Kit",
      price: 3000,
      icon: "🏕️",
      description:
        "Basic shelter supplies for families needing temporary support.",
    },
    {
      id: 5,
      name: "Emergency Essentials Kit",
      price: 2500,
      icon: "🎒",
      description:
        "A collection of useful emergency and relief supplies.",
    },
    {
      id: 6,
      name: "Hygiene Supplies Pack",
      price: 1000,
      icon: "🧼",
      description:
        "Essential hygiene items for flood-affected communities.",
    },
  ];

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    setCustomerDetails({
      ...customerDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      name: customerDetails.name,
      email: customerDetails.email,
      phone: customerDetails.phone,
      address: customerDetails.address,
      items: cart,
      totalAmount: cartTotal,
    };

    try {
      await axios.post(API + "/orders", orderData);

      alert(
        `Thank you ${customerDetails.name}! Your order has been placed successfully.\nIt is now sent to the Admin Dashboard.`
      );

      clearCart();

      setShowCheckoutForm(false);

      setCustomerDetails({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      console.error("Backend /orders post error:", error);

      alert("Order could not be placed. Please try again.");
    }
  };

  return (
    <div className="page">
      <h1>Relief Products 🛒</h1>

      <p className="page-intro">
        Browse essential products and supplies that can help support
        flood-affected communities.
      </p>

      {/* ==================== CART ==================== */}

      <div className="cart-box">
        <h2>Your Cart 🛒</h2>

        <p>
          Cart Items: <strong>{cartCount}</strong>
        </p>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <span>
                  {item.icon} {item.name}
                </span>

                <div className="quantity-controls">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    −
                  </button>

                  <strong>{item.quantity}</strong>

                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>

                <strong>
                  Rs.{" "}
                  {(item.price * item.quantity).toLocaleString()}
                </strong>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="cart-total">
              Total: Rs. {cartTotal.toLocaleString()}
            </div>

            <button
              type="button"
              className="button"
              onClick={() => setShowCheckoutForm(true)}
            >
              Checkout 🛒
            </button>
          </>
        )}
      </div>

      {/* ==================== CHECKOUT FORM ==================== */}

      {showCheckoutForm && (
        <div className="checkout-form-container">
          <h2>Shipping & Contact Information</h2>

          <form
            className="contact-form"
            onSubmit={handleOrderSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={customerDetails.name}
              onChange={handleInputChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              value={customerDetails.email}
              onChange={handleInputChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={customerDetails.phone}
              onChange={handleInputChange}
              required
            />

            <textarea
              name="address"
              placeholder="Delivery Address"
              value={customerDetails.address}
              onChange={handleInputChange}
              required
            />

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <button type="submit" className="button">
                Confirm & Place Order
              </button>

              <button
                type="button"
                className="button delete-button"
                onClick={() => setShowCheckoutForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ==================== PRODUCTS ==================== */}

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-icon">{product.icon}</div>

            <h2>{product.name}</h2>

            <p>{product.description}</p>

            <h3>Rs. {product.price.toLocaleString()}</h3>

            <button
              className="button"
              onClick={() => addToCart(product)}
            >
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== ABOUT ====================

function About() {
  return (
    <div className="page">
      <h1>About Flood Help Center</h1>

      <p>
        Flood Help Center is an information platform designed to provide useful
        flood-related information and connect people with available assistance.
      </p>

      <p>
        Our goal is to make important flood information easier to find and help
        affected communities submit assistance requests.
      </p>
    </div>
  );
}

// ==================== CONTACT ====================

function Contact() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;

    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const response = await axios.post(API + "/contact", data);

      alert(response.data.message);

      form.reset();
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="page narrow-page">
      <h1>Contact Us</h1>

      <p>Have a question or need more information? Contact us.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" required />

        <input type="email" name="email" placeholder="Your Email" required />

        <textarea name="message" placeholder="Your Message" required />

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

// ==================== AFFECTED AREAS ====================

function AffectedAreas() {
  const areas = [
    {
      name: "Mansehra",
      status: "Affected",
      people: "Flood-affected communities",
      help: "Food, clean water, shelter and medical assistance",
    },
    {
      name: "Balakot",
      status: "Affected",
      people: "Families in flood-affected areas",
      help: "Food, water, rescue and temporary shelter",
    },
    {
      name: "Abbottabad",
      status: "At Risk",
      people: "Communities near flood-prone areas",
      help: "Emergency information and preparedness",
    },
  ];

  return (
    <div className="page affected-page">
      <h1>Affected Areas</h1>

      <p className="page-intro">
        Find information about areas affected by flooding and the type of assistance
        that may be needed.
      </p>

      <div className="area-cards">
        {areas.map((area) => (
          <div className="area-card" key={area.name}>
            <div className="area-icon">📍</div>

            <h2>{area.name}</h2>

            <p>
              <strong>Status:</strong> {area.status}
            </p>

            <p>
              <strong>People:</strong> {area.people}
            </p>

            <p>
              <strong>Help Needed:</strong> {area.help}
            </p>

            <Link to="/help" className="button">
              Request Help
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== EMERGENCY ====================

function Emergency() {
  return (
    <div className="page emergency-page">
      <h1>Emergency Help</h1>

      <p className="page-intro">
        If you are affected by flooding or someone nearby needs urgent assistance, use the information below.
      </p>

      <div className="emergency-cards">
        <div className="emergency-card">
          <div className="emergency-icon">🚑</div>

          <h2>Rescue Assistance</h2>

          <p>
            If people need immediate rescue, seek help from appropriate local emergency services.
          </p>

          <Link to="/help" className="button">
            Request Rescue
          </Link>
        </div>

        <div className="emergency-card">
          <div className="emergency-icon">🏥</div>

          <h2>Medical Assistance</h2>

          <p>
            People who need medical assistance should seek help from nearby hospitals, clinics or emergency medical teams.
          </p>

          <Link to="/help" className="button">
            Request Medical Help
          </Link>
        </div>

        <div className="emergency-card">
          <div className="emergency-icon">🏠</div>

          <h2>Temporary Shelter</h2>

          <p>
            Families displaced by flooding may need a safe temporary place to stay.
          </p>

          <Link to="/help" className="button">
            Request Shelter
          </Link>
        </div>

        <div className="emergency-card">
          <div className="emergency-icon">💧</div>

          <h2>Food & Clean Water</h2>

          <p>
            Flood-affected communities may require food, drinking water and other essential supplies.
          </p>

          <Link to="/help" className="button">
            Request Supplies
          </Link>
        </div>
      </div>

      <div className="page-intro">
        <h2>⚠️ Flood Safety Tips</h2>

        <p>
          Move to a safe and higher location if flooding is increasing. Avoid walking or driving through moving floodwater and follow instructions from local authorities.
        </p>

        <p>
          Keep important documents, drinking water, medicines and essential items in a safe place.
        </p>
      </div>

      <Link to="/help" className="button">
        Request Help
      </Link>
    </div>
  );
}

// ==================== REQUEST HELP ====================

function Help() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;

    const data = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      area: form.area.value,
      helpType: form.helpType.value,
      message: form.message.value,
    };

    try {
      const response = await axios.post(API + "/help", data);

      alert(response.data.message);

      form.reset();
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="page narrow-page">
      <h1>Request Flood Assistance</h1>

      <p>
        If you or someone in your area needs help due to flooding, please provide the details below. Your request will be reviewed by our support team.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" required />

        <input type="email" name="email" placeholder="Your Email" required />

        <input type="tel" name="phone" placeholder="Phone Number" required />

        <input type="text" name="area" placeholder="Affected Area / City" required />

        <select name="helpType" required>
          <option value="">Select Help Needed</option>

          <option value="Food">Food</option>

          <option value="Water">Water</option>

          <option value="Medical">Medical Help</option>

          <option value="Shelter">Shelter</option>

          <option value="Rescue">Rescue</option>

          <option value="Other">Other</option>
        </select>

        <textarea name="message" placeholder="Describe your situation" required />

        <button type="submit">Submit Help Request</button>
      </form>
    </div>
  );
}

// ==================== ADMIN LOGIN ====================

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    if (username === "shahzad" && password === "mansahera") {
      sessionStorage.setItem("adminLoggedIn", "true");

      alert("Admin login successful!");

      navigate("/admin/dashboard");
    } else {
      alert("Wrong username or password!");
    }
  };

  return (
    <div className="page narrow-page">
      <h1>Admin Login</h1>

      <p>Enter your admin username and password.</p>

      <form className="contact-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Admin Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

// ==================== ADMIN DASHBOARD ====================

function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const navigate = useNavigate();

  const isLoggedIn = sessionStorage.getItem("adminLoggedIn") === "true";

  // ==================== GET DATA ====================

  const getData = async () => {
    try {
      const responseRequests = await axios.get(API + "/help");
      setRequests(responseRequests.data);

      try {
        const responseOrders = await axios.get(API + "/orders");
        setOrders(responseOrders.data);
      } catch (e) {
        console.log("No orders API route found or fetch failed:", e);
      }
    } catch (error) {
      console.error(error);
      alert("Could not load dashboard data!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getData();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  // ==================== DELETE REQUEST / ORDER ====================

  const deleteRequest = async (id) => {
    if (!window.confirm("Are you sure you want to delete this help request?")) {
      return;
    }

    try {
      const response = await axios.delete(API + "/help/" + id);
      alert(response.data.message);
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error(error);
      alert("Could not delete request!");
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product order?")) {
      return;
    }

    try {
      await axios.delete(API + "/orders/" + id);
      alert("Order deleted successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      setOrders((prev) => prev.filter((o) => (o._id || o.id) !== id));
    }
  };

  // ==================== UPDATE STATUS ====================

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(API + "/help/" + id + "/status", {
        status: newStatus,
      });

      alert(response.data.message);

      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
      );
    } catch (error) {
      console.error(error);
      alert("Could not update request status!");
    }
  };

  const updateOrderStatus = async (id, newStatus) => {
    try {
      await axios.put(API + "/orders/" + id + "/status", {
        status: newStatus,
      });
      alert("Order status updated!");
    } catch (error) {
      console.error(error);
    } finally {
      setOrders((prev) =>
        prev.map((o) =>
          (o._id || o.id) === id ? { ...o, status: newStatus } : o
        )
      );
    }
  };

  // ==================== LOGOUT ====================

  const logout = () => {
    sessionStorage.removeItem("adminLoggedIn");
    navigate("/admin");
  };

  if (!isLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  // ==================== FILTER REQUESTS ====================

  const filteredRequests = requests.filter((request) => {
    const search = searchText.toLowerCase().trim();
    const name = request.name?.toLowerCase() || "";
    const area = request.area?.toLowerCase() || "";
    const helpType = request.helpType?.toLowerCase() || "";

    const matchesSearch =
      name.includes(search) || area.includes(search) || helpType.includes(search);

    const matchesFilter =
      filterType === "All" || request.helpType === filterType;

    const matchesStatus =
      statusFilter === "All" || (request.status || "Pending") === statusFilter;

    return matchesSearch && matchesFilter && matchesStatus;
  });

  // ==================== COUNTS ====================

  const foodCount = requests.filter((r) => r.helpType === "Food").length;
  const waterCount = requests.filter((r) => r.helpType === "Water").length;
  const medicalCount = requests.filter((r) => r.helpType === "Medical").length;
  const shelterCount = requests.filter((r) => r.helpType === "Shelter").length;
  const rescueCount = requests.filter((r) => r.helpType === "Rescue").length;
  const otherCount = requests.filter((r) => r.helpType === "Other").length;

  const maxCount = Math.max(
    foodCount,
    waterCount,
    medicalCount,
    shelterCount,
    rescueCount,
    otherCount,
  );

  const getBarWidth = (count) => `${(count / maxCount) * 100}%`;
  const recentRequests = requests.slice(0, 3);

  return (
    <div className="page admin-page">
      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>

          <p>Manage flood assistance requests & customer orders.</p>
        </div>

        <button className="button" onClick={logout}>
          Logout
        </button>
      </div>

      {/* ==================== SUMMARY ==================== */}

      <div className="admin-summary">
        <div className="summary-card">
          <h3>Total Requests</h3>
          <strong>{requests.length}</strong>
        </div>

        <div className="summary-card">
          <h3>Total Orders</h3>
          <strong>{orders.length}</strong>
        </div>

        <div className="summary-card">
          <h3>Food</h3>
          <strong>{foodCount}</strong>
        </div>

        <div className="summary-card">
          <h3>Water</h3>
          <strong>{waterCount}</strong>
        </div>

        <div className="summary-card">
          <h3>Medical</h3>
          <strong>{medicalCount}</strong>
        </div>

        <div className="summary-card">
          <h3>Shelter</h3>
          <strong>{shelterCount}</strong>
        </div>
      </div>

      {/* ==================== CUSTOMER ORDERS SECTION ==================== */}

      <div className="admin-section">
        <h2>🛍️ Customer Orders</h2>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No customer orders placed yet.</p>
        ) : (
          <div className="requests-list">
            {orders.map((order, idx) => {
              const orderId = order._id || order.id || idx;
              return (
                <div className="request-card" key={orderId}>
                  <div className="request-header">
                    <h3>Customer: {order.name}</h3>

                    <button
                      className="delete-button"
                      onClick={() => deleteOrder(orderId)}
                    >
                      Delete Order
                    </button>
                  </div>

                  <p>
                    <strong>Email:</strong> {order.email || "N/A"}
                  </p>

                  <p>
                    <strong>Phone:</strong> {order.phone || "N/A"}
                  </p>

                  <p>
                    <strong>Address:</strong> {order.address || "N/A"}
                  </p>

                  <p>
                    <strong>Order Date:</strong> {order.date || "N/A"}
                  </p>

                  <div>
                    <strong>Ordered Products:</strong>
                    <ul>
                      {order.items &&
                        order.items.map((item, i) => (
                          <li key={i}>
                            {item.icon} {item.name} x {item.quantity} (Rs.{" "}
                            {(item.price * item.quantity).toLocaleString()})
                          </li>
                        ))}
                    </ul>
                  </div>

                  <p style={{ marginTop: "5px" }}>
                    <strong>Total Amount:</strong> Rs.{" "}
                    {order.totalAmount
                      ? order.totalAmount.toLocaleString()
                      : "0"}
                  </p>

                  <div className="status-section">
                    <strong>Order Status:</strong>

                    <select
                      value={order.status || "Pending"}
                      onChange={(e) =>
                        updateOrderStatus(orderId, e.target.value)
                      }
                    >
                      <option value="Pending">🟡 Pending</option>

                      <option value="In Progress">🔵 Processing</option>

                      <option value="Completed">🟢 Completed</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ==================== ANALYTICS ==================== */}

      <div className="admin-section">
        <h2>Request Analytics</h2>

        <div className="analytics-list">
          <div className="analytics-item">
            <div className="analytics-label">
              <span>Food</span>
              <strong>{foodCount}</strong>
            </div>

            <div className="analytics-bar">
              <div
                className="analytics-fill"
                style={{ width: getBarWidth(foodCount) }}
              />
            </div>
          </div>

          <div className="analytics-item">
            <div className="analytics-label">
              <span>Water</span>
              <strong>{waterCount}</strong>
            </div>

            <div className="analytics-bar">
              <div
                className="analytics-fill"
                style={{ width: getBarWidth(waterCount) }}
              />
            </div>
          </div>

          <div className="analytics-item">
            <div className="analytics-label">
              <span>Medical</span>
              <strong>{medicalCount}</strong>
            </div>

            <div className="analytics-bar">
              <div
                className="analytics-fill"
                style={{ width: getBarWidth(medicalCount) }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ==================== RECENT REQUESTS ==================== */}

      <div className="admin-section">
        <h2>Recent Help Requests</h2>

        {recentRequests.length === 0 ? (
          <p>No recent requests.</p>
        ) : (
          <div className="recent-requests">
            {recentRequests.map((request) => (
              <div className="request-card" key={request._id}>
                <h3>{request.name}</h3>

                <p>
                  <strong>Area:</strong> {request.area}
                </p>

                <p>
                  <strong>Help:</strong> {request.helpType}
                </p>

                <p>
                  <strong>Status:</strong> {request.status || "Pending"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ==================== SEARCH & FILTER ==================== */}

      <div className="admin-section">
        <h2>All Help Requests</h2>

        <div className="admin-filters">
          <input
            type="text"
            placeholder="Search by name, area or help type..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />

          <select
            value={filterType}
            onChange={(event) => setFilterType(event.target.value)}
          >
            <option value="All">All Help Types</option>

            <option value="Food">Food</option>

            <option value="Water">Water</option>

            <option value="Medical">Medical</option>

            <option value="Shelter">Shelter</option>

            <option value="Rescue">Rescue</option>

            <option value="Other">Other</option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All Status</option>

            <option value="Pending">Pending</option>

            <option value="In Progress">In Progress</option>

            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* ==================== REQUEST LIST ==================== */}

        {loading ? (
          <p>Loading requests...</p>
        ) : filteredRequests.length === 0 ? (
          <p>No help requests found.</p>
        ) : (
          <div className="requests-list">
            {filteredRequests.map((request) => (
              <div className="request-card" key={request._id}>
                <div className="request-header">
                  <h3>{request.name}</h3>

                  <button
                    className="delete-button"
                    onClick={() => deleteRequest(request._id)}
                  >
                    Delete
                  </button>
                </div>

                <p>
                  <strong>Email:</strong> {request.email || "Not provided"}
                </p>

                <p>
                  <strong>Phone:</strong> {request.phone}
                </p>

                <p>
                  <strong>Area:</strong> {request.area}
                </p>

                <p>
                  <strong>Help Needed:</strong> {request.helpType}
                </p>

                <p>
                  <strong>Message:</strong> {request.message}
                </p>

                <div className="status-section">
                  <strong>Status:</strong>

                  <select
                    value={request.status || "Pending"}
                    onChange={(event) =>
                      updateStatus(request._id, event.target.value)
                    }
                  >
                    <option value="Pending">🟡 Pending</option>

                    <option value="In Progress">🔵 In Progress</option>

                    <option value="Completed">🟢 Completed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== NAVBAR ====================

function Navbar() {
  const isLoggedIn = sessionStorage.getItem("adminLoggedIn") === "true";

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">Flood Help Center</Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/affected-areas">Affected Areas</Link>

        <Link to="/emergency">Emergency</Link>

        <Link to="/help">Request Help</Link>

        <Link to="/products">Products</Link>

        <Link to="/about">About</Link>

        <Link to="/contact">Contact</Link>

        {isLoggedIn ? (
          <Link to="/admin/dashboard">Admin Dashboard</Link>
        ) : (
          <Link to="/admin">Admin</Link>
        )}
      </div>
    </nav>
  );
}

// ==================== APP ====================

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    updateQuantity(id, -1);
  };

  const updateQuantity = (id, change) => {
    setCart((previousCart) =>
      previousCart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/affected-areas" element={<AffectedAreas />} />

        <Route path="/emergency" element={<Emergency />} />

        <Route path="/help" element={<Help />} />

        <Route
          path="/products"
          element={
            <Products
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              clearCart={clearCart}
            />
          }
        />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/admin" element={<AdminLogin />} />

        <Route path="/admin/dashboard" element={<AdminRequests />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;