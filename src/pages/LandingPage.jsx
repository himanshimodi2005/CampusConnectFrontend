import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="bg-light-blue-gradient min-vh-100">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <div className="p-2 bg-gradient-primary rounded-3 d-flex align-items-center justify-content-center me-3">
              <i className="bi bi-mortarboard fs-4 text-white"></i>
            </div>
            <span className="h4 fw-bold text-gradient-primary m-0">Campus Connect</span>
          </Link>
          <div className="d-flex align-items-center gap-3">
            <Link to="/login" className="btn btn-link text-dark text-decoration-none fw-medium">
              Sign In
            </Link>
            <Link
              to="/register"
              className="btn btn-campus fw-medium px-4 py-2 rounded-3 shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-5 text-center">
        <div className="container">
          <h1 className="display-1 fw-bold mb-4">
            <span className="text-gradient-primary">Connect</span>
            <br />
            <span className="text-dark">Your Campus</span>
          </h1>
          
          <p className="lead text-muted mb-5 mx-auto" style={{maxWidth: '700px'}}>
            Join the ultimate platform for campus life. Connect with peers, stay updated with events, 
            and make the most of your university experience.
          </p>

          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center mb-5">
            <Link
              to="/register"
              className="btn btn-campus btn-lg fw-bold px-5 py-3 rounded-4 shadow-lg transition-transform hover-scale-105"
            >
              Join Campus Connect
            </Link>
            <Link
              to="/login"
              className="btn btn-white btn-lg fw-bold px-5 py-3 rounded-4 shadow-sm border border-secondary transition-transform hover-scale-105"
            >
              Sign In
            </Link>
          </div>

          {/* Stats */}
          <div className="row g-4 mt-5">
            <div className="col-6 col-md-3">
              <div className="text-center">
                <div className="h2 fw-bold text-primary mb-1">10K+</div>
                <div className="text-muted">Students Connected</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="text-center">
                <div className="h2 fw-bold text-purple mb-1">500+</div>
                <div className="text-muted">Campus Events</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="text-center">
                <div className="h2 fw-bold text-success mb-1">50+</div>
                <div className="text-muted">Universities</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="text-center">
                <div className="h2 fw-bold text-pink mb-1">24/7</div>
                <div className="text-muted">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white-50">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold text-dark mb-3">
              Everything You Need for Campus Life
            </h2>
            <p className="lead text-muted">
              Discover features designed to enhance your university experience
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {[
              {
                title: "Connect with Peers",
                description: "Build meaningful connections with students from across your campus community",
                icon: "bi bi-people-fill",
                color: "bg-gradient-blue-indigo"
              },
              {
                title: "Stay Updated",
                description: "Never miss important announcements, events, or deadlines",
                icon: "bi bi-bell-fill",
                color: "bg-gradient-green-emerald"
              },
              {
                title: "Academic Excellence",
                description: "Access course materials, join study groups, and track your progress",
                icon: "bi bi-book-fill",
                color: "bg-gradient-purple-pink"
              },
              {
                title: "Campus Events",
                description: "Discover and participate in exciting campus activities and events",
                icon: "bi bi-calendar-event-fill",
                color: "bg-gradient-orange-red"
              }
            ].map((feature, index) => (
              <div className="col-md-6 col-lg-3" key={index}>
                <div className="card-campus p-4 text-center h-100 transition-transform hover-translate-y-2">
                  <div className={`feature-icon rounded-4 d-flex align-items-center justify-content-center mx-auto mb-4 ${feature.color} shadow-lg`}>
                    <i className={`${feature.icon} text-white fs-3`}></i>
                  </div>
                  <h3 className="h5 fw-bold text-dark mb-2">{feature.title}</h3>
                  <p className="text-muted">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-gradient-primary">
        <div className="container text-center text-white">
          <h2 className="display-5 fw-bold mb-4">
            Ready to Transform Your Campus Experience?
          </h2>
          <p className="lead text-white-50 mb-5">
            Join thousands of students who are already connecting, learning, and growing together.
          </p>
          
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">
            <Link
              to="/register"
              className="btn btn-white btn-lg fw-bold px-5 py-3 rounded-4 shadow-lg transition-transform hover-scale-105"
            >
              Create Your Account
            </Link>
            <Link
              to="/login"
              className="btn btn-outline-light btn-lg fw-bold px-5 py-3 rounded-4 transition-transform hover-scale-105"
            >
              Sign In Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}