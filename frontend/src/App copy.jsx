import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import "./App.css";

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
              View information about areas affected by floods.
            </p>
            <Link to="/affected-areas">
              Learn More →
            </Link>
          </div>

          <div className="info-card">
            <div className="card-icon">🆘</div>
            <h3>Emergency Help</h3>
            <p>
              Find important emergency information and assistance.
            </p>
            <Link to="/emergency">
              Get Help →
            </Link>
          </div>

          <div className="info-card">
            <div className="card-icon">🤝</div>
            <h3>Request Help</h3>
            <p>
              Submit a request for flood assistance.
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

function AffectedAreas() {
  const areas = [
    {
      name: "Mansehra",
      status: "Affected",
      help: "Food, clean water, shelter and medical assistance",
    },
    {
      name: "Balakot",
      status: "Affected",
      help: "Food, water, rescue and temporary shelter",
    },
    {
      name: "Abbottabad",
      status: "At Risk",
      help: "Emergency information and preparedness",
    },
  ];

  return (
    <div className="page affected-page">
      <h1>Affected Areas</h1>

      <p className="page-intro">
        Find information about areas affected by flooding
        and the assistance that may be needed.
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

          <Link to="/help" className="button">
            Request Rescue
          </Link>
        </div>

        <div className="emergency-card">
          <div className="emergency-icon">🏥</div>

          <h2>Medical Assistance</h2>

          <p>
            People who need medical assistance should seek
            help from nearby hospitals or medical teams.
          </p>

          <Link to="/help" className="button">
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

          <Link to="/help" className="button">
            Request Shelter
          </Link>
        </div>

        <div className="emergency-card">
          <div className="emergency-icon">💧</div>

          <h2>Food & Clean Water</h2>

          <p>
            Flood-affected communities may require food,
            drinking water and essential supplies.
          </p>

          <Link to="/help" className="button">
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
    </div>
  );
}

function Help() {
  return (
    <div className="page">
      <h1>Request Help</h1>

      <p>
        If you or someone in your area needs flood assistance,
        submit the form below.
      </p>

      <form
        className="contact-form"
        onSubmit={(event) => {
          event.preventDefault();
          alert("Help request submitted!");
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
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

        <select name="helpType" required>
          <option value="">
            Select Help Needed
          </option>

          <option value="Food">Food</option>
          <option value="Water">Water</option>
          <option value="Medical">Medical Help</option>
          <option value="Shelter">Shelter</option>
          <option value="Rescue">Rescue</option>
          <option value="Other">Other</option>
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
        to find and help affected communities.
      </p>
    </div>
  );
}

function Contact() {
  return (
    <div className="page">
      <h1>Contact Us</h1>

      <p>
        Have a question or need more information?
        Contact us using the form below.
      </p>

      <form
        className="contact-form"
        onSubmit={(event) => {
          event.preventDefault();
          alert("Message sent successfully!");
        }}
      >
        <input
          type="text"
          placeholder="Your Name"
          required
        />

        <input
          type="email"
          placeholder="Your Email"
          required
        />

        <textarea
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

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <h2>Flood Help Center</h2>

        <div className="nav-links">
          <Link to="/">Home</Link>

          <Link to="/affected-areas">
            Affected Areas
          </Link>

          <Link to="/emergency">
            Emergency
          </Link>

          <Link to="/help">
            Get Help
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/contact">
            Contact
          </Link>
        </div>
      </nav>

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;