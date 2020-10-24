import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Landing extends Component {
  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push(`/`);
  }

  render() {
    const loginRegLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            <button className="btn btn-outline-light">Login</button>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            <button className="btn btn-outline-light">Register</button>
          </Link>
        </li>
      </ul>
    );

    const userLink = (
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
          <Link to="/ide" className="nav-link">
            <button className="btn btn-outline-light">IDE</button>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/quiz" className="nav-link">
            <button className="btn btn-outline-light">Quiz</button>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/companies/details" className="nav-link">
            <button className="btn btn-outline-light">Companies</button>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/videos" className="nav-link">
            <button className="btn btn-outline-light">Aptitude</button>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/discussion" className="nav-link">
            <button className="btn btn-outline-light">Forum</button>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            <button className="btn btn-outline-light">User</button>
          </Link>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.logOut.bind(this)} className="nav-link">
            <button className="btn btn-outline-light">Logout</button>
          </a>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <button className="btn btn-outline-light">Home</button>
              </Link>
            </li>
          </ul>
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
      </nav>
    );
  }
}

export default withRouter(Landing);
