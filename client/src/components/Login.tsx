import React, { useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/UserFunctions";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async (event: React.FormEvent) => {
    try {
      event.preventDefault();

      const loginResponse = await loginUser(user);

      if (loginResponse.token) {
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
      swal("Error", error as string, "error");
      setUser({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
          <form noValidate onSubmit={submitHandler}>
            <h1 className="page-header">Login</h1>
            <div className="form-group mt-4">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input type="email" className="form-control" name="email" placeholder="Enter email" value={user.email} onChange={valueChangeHandler} />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input type="password" className="form-control" name="password" placeholder="Password" value={user.password} onChange={valueChangeHandler} />
            </div>
            <button type="submit" className="btn btn-lg btn-primary btn-block mt-4">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
