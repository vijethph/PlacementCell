import { Link, redirect } from "react-router-dom";

const NavBar = () => {
  const loginLinks = (
    <ul className="d-flex mb-0">
      <li className="nav-item">
        <Link to="/login" className="nav-link ms-1">
          <button className="btn btn-outline-light">Login</button>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link ms-1">
          <button className="btn btn-outline-light">Register</button>
        </Link>
      </li>
    </ul>
  );

  const userLinks = (
    <ul className="d-flex mb-0">
      <li className="nav-item">
        <Link to="/ide" className="nav-link ms-1">
          <button className="btn btn-outline-light">IDE</button>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/quiz" className="nav-link ms-1">
          <button className="btn btn-outline-light">Quiz</button>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/companies/details" className="nav-link ms-1">
          <button className="btn btn-outline-light">Companies</button>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/videos" className="nav-link ms-1">
          <button className="btn btn-outline-light">Aptitude</button>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/discussion" className="nav-link ms-1">
          <button className="btn btn-outline-light">Forum</button>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/profile" className="nav-link ms-1">
          <button className="btn btn-outline-light">User</button>
        </Link>
      </li>
      <li className="nav-item nav-link ms-1">
        <button
          className="btn btn-outline-light"
          onClick={(event) => {
            event.preventDefault();
            localStorage.removeItem("userToken");
            redirect("/");
          }}>
          Logout
        </button>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        <button className="navbar-toggler navbar-brand" type="button" data-toggle="collapse" data-target="#placementCellNavbar" aria-controls="placementCellNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="placementCellNavbar">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <button className="btn btn-outline-light">Home</button>
              </Link>
            </li>
          </ul>
          {localStorage.getItem("userToken") ? userLinks : loginLinks}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
