import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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

            <Link to="/affected-areas" className="button secondary-button">
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

function Help() {
  return (
    <div className="page">
      <h1>Request Help</h1>
      <p>
        If you need flood assistance, submit your request here.
      </p>
    </div>
  );
}

function AffectedAreas() {
  return (
    <div className="page">
      <h1>Affected Areas</h1>
      <p>
        Information about flood-affected areas will appear here.
      </p>
    </div>
  );
}

function Emergency() {
  return (
    <div className="page">
      <h1>Emergency Help</h1>
      <p>
        Emergency assistance information will appear here.
      </p>
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
          <Link to="/affected-areas">Affected Areas</Link>
          <Link to="/emergency">Emergency</Link>
          <Link to="/help">Get Help</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/help" element={<Help />} />
        <Route path="/affected-areas" element={<AffectedAreas />} />
        <Route path="/emergency" element={<Emergency />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;