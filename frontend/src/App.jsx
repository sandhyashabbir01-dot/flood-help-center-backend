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

            <Link
              to="/affected-areas"
              className="button secondary-button"
            >
              Affected Areas
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
              View information about areas affected by floods
              and important updates.
            </p>

            <Link to="/affected-areas">
              Learn More →
            </Link>
          </div>

          <div className="info-card">
            <div className="card-icon">🆘</div>

            <h3>Emergency Help</h3>

            <p>
              Find important emergency information and
              assistance for people affected by floods.
            </p>

            <Link to="/emergency">
              Get Help →
            </Link>
          </div>

          <div className="info-card">
            <div className="card-icon">🤝</div>

            <h3>Request Help</h3>

            <p>
              People affected by floods can submit a request
              for assistance.
            </p>

            <Link to="/help">
              Request Help →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ==================== ABOUT ====================

function About() {
  return (
    <div className="page">
      <h1>About Flood Help Center</h1>

      <p>
        Flood Help Center is an information platform designed
        to provide useful flood-related information and connect
        people with available assistance.
      </p>

      <p>
        Our goal is to make important flood information easier
        to find and help affected communities submit assistance
        requests.
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
      const response = await axios.post(
        API + "/contact",
        data
      );

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

      <p>
        Have a question or need more information?
        Contact us.
      </p>

      <form
        className="contact-form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          required
        />

        <button type="submit">
          Send Message
        </button>
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
        Find information about areas affected by flooding
        and the type of assistance that may be needed.
      </p>

      <div className="area-cards">
        {areas.map((area) => (
          <div
            className="area-card"
            key={area.name}
          >
            <div className="area-icon">📍</div>

            <h2>{area.name}</h2>

            <p>
              <strong>Status:</strong>{" "}
              {area.status}
            </p>

            <p>
              <strong>People:</strong>{" "}
              {area.people}
            </p>

            <p>
              <strong>Help Needed:</strong>{" "}
              {area.help}
            </p>

            <Link
              to="/help"
              className="button"
            >
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
        If you are affected by flooding or someone nearby
        needs urgent assistance, use the information below.
      </p>

      <div className="emergency-cards">

        <div className="emergency-card">
          <div className="emergency-icon">🚑</div>

          <h2>Rescue Assistance</h2>

          <p>
            If people need immediate rescue, seek help from
            appropriate local emergency services.
          </p>

          <Link
            to="/help"
            className="button"
          >
            Request Rescue
          </Link>
        </div>

        <div className="emergency-card">
          <div className="emergency-icon">🏥</div>

          <h2>Medical Assistance</h2>

          <p>
            People who need medical assistance should seek
            help from nearby hospitals, clinics or emergency
            medical teams.
          </p>

          <Link
            to="/help"
            className="button"
          >
            Request Medical Help
          </Link>
        </div>

        <div className="emergency-card">
          <div className="emergency-icon">🏠</div>

          <h2>Temporary Shelter</h2>

          <p>
            Families displaced by flooding may need a safe
            temporary place to stay.
          </p>

          <Link
            to="/help"
            className="button"
          >
            Request Shelter
          </Link>
        </div>

        <div className="emergency-card">
          <div className="emergency-icon">💧</div>

          <h2>Food & Clean Water</h2>

          <p>
            Flood-affected communities may require food,
            drinking water and other essential supplies.
          </p>

          <Link
            to="/help"
            className="button"
          >
            Request Supplies
          </Link>
        </div>

      </div>

      <div className="page-intro">
        <h2>⚠️ Flood Safety Tips</h2>

        <p>
          Move to a safe and higher location if flooding is
          increasing. Avoid walking or driving through moving
          floodwater and follow instructions from local
          authorities.
        </p>

        <p>
          Keep important documents, drinking water, medicines
          and essential items in a safe place.
        </p>
      </div>

      <Link
        to="/help"
        className="button"
      >
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
      const response = await axios.post(
        API + "/help",
        data
      );

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
        If you or someone in your area needs help due to flooding,
        please provide the details below. Your request will be
        reviewed by our support team.
      </p>

      <form
        className="contact-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
        />

        <input
          type="text"
          name="area"
          placeholder="Affected Area / City"
          required
        />

        <select
          name="helpType"
          required
        >
          <option value="">
            Select Help Needed
          </option>

          <option value="Food">
            Food
          </option>

          <option value="Water">
            Water
          </option>

          <option value="Medical">
            Medical Help
          </option>

          <option value="Shelter">
            Shelter
          </option>

          <option value="Rescue">
            Rescue
          </option>

          <option value="Other">
            Other
          </option>
        </select>

        <textarea
          name="message"
          placeholder="Describe your situation"
          required
        />

        <button type="submit">
          Submit Help Request
        </button>

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

    if (
      username === "shahzad" &&
      password === "mansahera"
    ) {
      sessionStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      alert("Admin login successful!");

      navigate("/admin/dashboard");
    } else {
      alert("Wrong username or password!");
    }
  };

  return (
    <div className="page narrow-page">

      <h1>Admin Login</h1>

      <p>
        Enter your admin username and password.
      </p>

      <form
        className="contact-form"
        onSubmit={handleLogin}
      >

        <input
          type="text"
          placeholder="Admin Username"
          value={username}
          onChange={(event) =>
            setUsername(event.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          required
        />

        <button type="submit">
          Login
        </button>

      </form>
    </div>
  );
}

// ==================== ADMIN DASHBOARD ====================

function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const navigate = useNavigate();

  const isLoggedIn =
    sessionStorage.getItem("adminLoggedIn") === "true";

  // ==================== GET REQUESTS ====================

  const getRequests = async () => {
    try {
      const response = await axios.get(
        API + "/help"
      );

      setRequests(response.data);
    } catch (error) {
      console.error(error);
      alert("Could not load help requests!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getRequests();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  // ==================== DELETE REQUEST ====================

  const deleteRequest = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this help request?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(
        API + "/help/" + id
      );

      alert(response.data.message);

      setRequests((previousRequests) =>
        previousRequests.filter(
          (request) => request._id !== id
        )
      );
    } catch (error) {
      console.error(error);
      alert("Could not delete help request!");
    }
  };

  // ==================== UPDATE STATUS ====================

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(
        API + "/help/" + id + "/status",
        {
          status: newStatus,
        }
      );

      alert(response.data.message);

      setRequests((previousRequests) =>
        previousRequests.map((request) =>
          request._id === id
            ? {
                ...request,
                status: newStatus,
              }
            : request
        )
      );
    } catch (error) {
      console.error(error);
      alert("Could not update request status!");
    }
  };

  // ==================== LOGOUT ====================

  const logout = () => {
    sessionStorage.removeItem(
      "adminLoggedIn"
    );

    navigate("/admin");
  };

  // ==================== PROTECTION ====================

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/admin"
        replace
      />
    );
  }

  // ==================== RECENT REQUESTS ====================

  const recentRequests = requests.slice(0, 3);

  // ==================== FILTER ====================

  const filteredRequests = requests.filter(
    (request) => {
      const search =
        searchText.toLowerCase().trim();

      const name =
        request.name?.toLowerCase() || "";

      const area =
        request.area?.toLowerCase() || "";

      const helpType =
        request.helpType?.toLowerCase() || "";

      const matchesSearch =
        name.includes(search) ||
        area.includes(search) ||
        helpType.includes(search);

      const matchesFilter =
        filterType === "All" ||
        request.helpType === filterType;

      const matchesStatus =
        statusFilter === "All" ||
        (request.status || "Pending") ===
          statusFilter;

      return (
        matchesSearch &&
        matchesFilter &&
        matchesStatus
      );
    }
  );

  // ==================== COUNTS ====================

  const foodCount = requests.filter(
    (request) =>
      request.helpType === "Food"
  ).length;

  const waterCount = requests.filter(
    (request) =>
      request.helpType === "Water"
  ).length;

  const medicalCount = requests.filter(
    (request) =>
      request.helpType === "Medical"
  ).length;

  const shelterCount = requests.filter(
    (request) =>
      request.helpType === "Shelter"
  ).length;

  const rescueCount = requests.filter(
    (request) =>
      request.helpType === "Rescue"
  ).length;

  const otherCount = requests.filter(
    (request) =>
      request.helpType === "Other"
  ).length;

  // ==================== ANALYTICS MAX ====================

  const maxCount = Math.max(
    foodCount,
    waterCount,
    medicalCount,
    shelterCount,
    rescueCount,
    otherCount,
    1
  );

  const getBarWidth = (count) => {
    return `${(count / maxCount) * 100}%`;
  };

  // ==================== STATUS COUNTS ====================

  const pendingCount = requests.filter(
    (request) =>
      (request.status || "Pending") ===
      "Pending"
  ).length;

  const inProgressCount = requests.filter(
    (request) =>
      request.status === "In Progress"
  ).length;

  const completedCount = requests.filter(
    (request) =>
      request.status === "Completed"
  ).length;

  // ==================== DASHBOARD ====================

  return (
    <div className="page admin-page">

      <h1>Admin - Help Requests</h1>

      <p className="page-intro">
        View and manage all help requests
        submitted by flood-affected people.
      </p>

      {/* LOGOUT */}

      <button
        className="delete-button"
        onClick={logout}
      >
        Logout
      </button>

      {/* SEARCH + FILTER */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "30px",
          marginBottom: "25px",
          flexWrap: "wrap",
        }}
      >

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search by name, area or help type..."
          value={searchText}
          onChange={(event) =>
            setSearchText(event.target.value)
          }
          style={{
            flex: "1",
            minWidth: "250px",
            padding: "12px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            fontSize: "16px",
          }}
        />

        {/* HELP TYPE FILTER */}

        <select
          value={filterType}
          onChange={(event) =>
            setFilterType(event.target.value)
          }
          style={{
            minWidth: "180px",
            padding: "12px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            fontSize: "16px",
          }}
        >
          <option value="All">
            All Requests
          </option>

          <option value="Food">
            Food
          </option>

          <option value="Water">
            Water
          </option>

          <option value="Medical">
            Medical
          </option>

          <option value="Shelter">
            Shelter
          </option>

          <option value="Rescue">
            Rescue
          </option>

          <option value="Other">
            Other
          </option>
        </select>

        {/* STATUS FILTER */}

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
          style={{
            minWidth: "180px",
            padding: "12px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            fontSize: "16px",
          }}
        >
          <option value="All">
            All Statuses
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Completed">
            Completed
          </option>
        </select>

        {/* CLEAR FILTERS */}

        <button
          type="button"
          onClick={() => {
            setSearchText("");
            setFilterType("All");
            setStatusFilter("All");
          }}
          style={{
            padding: "12px 18px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#111827",
            color: "#ffffff",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Clear Filters
        </button>

      </div>

      {/* SUMMARY */}

      <div className="admin-summary">

        {/* TOTAL */}

        <div
          className="summary-card"
          onClick={() => {
            setStatusFilter("All");
            setFilterType("All");
          }}
          style={{
            backgroundColor: "#334155",
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          <h3>Total Requests</h3>

          <strong>
            {requests.length}
          </strong>
        </div>

        {/* PENDING */}

        <div
          className="summary-card"
          onClick={() => {
            setStatusFilter("Pending");
            setFilterType("All");
          }}
          style={{
            backgroundColor: "#cbd5e1",
            color: "#111827",
            cursor: "pointer",
          }}
        >
          <h3>Pending</h3>

          <strong>
            {pendingCount}
          </strong>
        </div>

        {/* IN PROGRESS */}

        <div
          className="summary-card"
          onClick={() => {
            setStatusFilter("In Progress");
            setFilterType("All");
          }}
          style={{
            backgroundColor: "#0f766e",
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          <h3>In Progress</h3>

          <strong>
            {inProgressCount}
          </strong>
        </div>

        {/* COMPLETED */}

        <div
          className="summary-card"
          onClick={() => {
            setStatusFilter("Completed");
            setFilterType("All");
          }}
          style={{
            backgroundColor: "#000000",
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          <h3>Completed</h3>

          <strong>
            {completedCount}
          </strong>
        </div>

        {/* FOOD */}

        <div
          className="summary-card"
          onClick={() => {
            setFilterType("Food");
            setStatusFilter("All");
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <h3>Food</h3>

          <strong>
            {foodCount}
          </strong>
        </div>

        {/* WATER */}

        <div
          className="summary-card"
          onClick={() => {
            setFilterType("Water");
            setStatusFilter("All");
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <h3>Water</h3>

          <strong>
            {waterCount}
          </strong>
        </div>

        {/* MEDICAL */}

        <div
          className="summary-card"
          onClick={() => {
            setFilterType("Medical");
            setStatusFilter("All");
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <h3>Medical</h3>

          <strong>
            {medicalCount}
          </strong>
        </div>

        {/* SHELTER */}

        <div
          className="summary-card"
          onClick={() => {
            setFilterType("Shelter");
            setStatusFilter("All");
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <h3>Shelter</h3>

          <strong>
            {shelterCount}
          </strong>
        </div>

      </div>

      {/* ANALYTICS */}

      <div className="analytics-section">

        <h2>📊 Help Request Analytics</h2>

        <div className="analytics-bars">

          <div className="analytics-item">
            <span>Food</span>

            <div className="bar">
              <div
                className="bar-fill"
                style={{
                  width: getBarWidth(foodCount),
                }}
              >
                {foodCount}
              </div>
            </div>
          </div>

          <div className="analytics-item">
            <span>Water</span>

            <div className="bar">
              <div
                className="bar-fill"
                style={{
                  width: getBarWidth(waterCount),
                }}
              >
                {waterCount}
              </div>
            </div>
          </div>

          <div className="analytics-item">
            <span>Medical</span>

            <div className="bar">
              <div
                className="bar-fill"
                style={{
                  width: getBarWidth(medicalCount),
                }}
              >
                {medicalCount}
              </div>
            </div>
          </div>

          <div className="analytics-item">
            <span>Shelter</span>

            <div className="bar">
              <div
                className="bar-fill"
                style={{
                  width: getBarWidth(shelterCount),
                }}
              >
                {shelterCount}
              </div>
            </div>
          </div>

          <div className="analytics-item">
            <span>Rescue</span>

            <div className="bar">
              <div
                className="bar-fill"
                style={{
                  width: getBarWidth(rescueCount),
                }}
              >
                {rescueCount}
              </div>
            </div>
          </div>

          <div className="analytics-item">
            <span>Other</span>

            <div className="bar">
              <div
                className="bar-fill"
                style={{
                  width: getBarWidth(otherCount),
                }}
              >
                {otherCount}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* RECENT REQUESTS */}

      <div className="recent-requests-section">

        <h2>🕐 Recent Requests</h2>

        {recentRequests.length === 0 ? (

          <p>No recent requests available.</p>

        ) : (

          <div className="recent-requests">

            {recentRequests.map((request) => (

              <div
                className="recent-request-card"
                key={request._id}
              >

                <div className="recent-request-header">

                  <h3>
                    {request.name}
                  </h3>

                  <span>
                    {request.helpType}
                  </span>

                </div>

                <p>
                  📧 {request.email}
                </p>

                <p>
                  📅{" "}
                  {request.createdAt
                    ? new Date(
                        request.createdAt
                      ).toLocaleDateString()
                    : "Not available"}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* ALL REQUESTS */}

      <div className="all-requests-heading">

        <h2>📋 All Help Requests</h2>

        <p>
          View, update and manage all submitted requests.
        </p>

      </div>

      {/* REQUESTS */}

      {loading ? (

        <p>
          Loading requests...
        </p>

      ) : requests.length === 0 ? (

        <p>
          No help requests have been submitted yet.
        </p>

      ) : filteredRequests.length === 0 ? (

        <p>
          No requests match your search or filter.
        </p>

      ) : (

        <div className="admin-requests">

          {filteredRequests.map(
            (request) => (

              <div
                className="admin-request-card"
                key={request._id}
              >

                <div className="request-header">

                  <h2>
                    {request.name}
                  </h2>

                  <span>
                    {request.helpType}
                  </span>

                </div>

                <p>
                  <strong>
                    📧 Email:
                  </strong>{" "}
                  {request.email}
                </p>

                <p>
                  <strong>
                    📞 Phone:
                  </strong>{" "}
                  {request.phone}
                </p>

                <p>
                  <strong>
                    📍 Area:
                  </strong>{" "}
                  {request.area}
                </p>

                <p>
                  <strong>
                    📝 Message:
                  </strong>{" "}
                  {request.message}
                </p>

                <p>
                  <strong>
                    📅 Submitted:
                  </strong>{" "}
                  {request.createdAt
                    ? new Date(
                        request.createdAt
                      ).toLocaleString()
                    : "Not available"}
                </p>

                {/* STATUS */}

                <div
                  style={{
                    marginTop: "15px",
                    marginBottom: "15px",
                  }}
                >

                  <strong>
                    📌 Status:
                  </strong>{" "}

                  <select
                    value={
                      request.status ||
                      "Pending"
                    }
                    onChange={(event) =>
                      updateStatus(
                        request._id,
                        event.target.value
                      )
                    }
                    style={{
                      marginLeft: "8px",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border:
                        "1px solid #d1d5db",
                      fontWeight: "600",

                      backgroundColor:
                        request.status ===
                        "Completed"
                          ? "#000000"
                          : request.status ===
                            "In Progress"
                          ? "#0f766e"
                          : "#cbd5e1",

                      color:
                        request.status ===
                        "Pending"
                          ? "#111827"
                          : "#ffffff",
                    }}
                  >

                    <option value="Pending">
                      ● Pending
                    </option>

                    <option value="In Progress">
                      ● In Progress
                    </option>

                    <option value="Completed">
                      ● Completed
                    </option>

                  </select>

                </div>

                {/* DELETE */}

                <button
                  className="delete-button"
                  onClick={() =>
                    deleteRequest(
                      request._id
                    )
                  }
                >
                  🗑️ Delete Request
                </button>

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
}

// ==================== MAIN APP ====================

function App() {
  return (
    <BrowserRouter>

      {/* NAVBAR */}

      <nav className="navbar">

        <h2>
          Flood Help Center
        </h2>

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/affected-areas">
            Affected Areas
          </Link>

          <Link to="/emergency">
            Emergency
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/contact">
            Contact
          </Link>

          <Link to="/admin">
            Admin
          </Link>

        </div>

      </nav>

      {/* ROUTES */}

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/affected-areas"
          element={<AffectedAreas />}
        />

        <Route
          path="/emergency"
          element={<Emergency />}
        />

        <Route
          path="/help"
          element={<Help />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/admin"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminRequests />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;