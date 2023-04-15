import React, { useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/UserFunctions";

const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
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

      const registerResponse = await registerUser(user);

      if (registerResponse.message) {
        swal("Success", registerResponse.message, "success");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      swal("Error", error as string, "error");
      setUser({
        firstName: "",
        lastName: "",
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
            <h1 className="page-header">Register</h1>
            <div className="form-group mt-4">
              <label htmlFor="name" className="form-label">
                First name
              </label>
              <input type="text" className="form-control" name="firstName" placeholder="Enter your first name" value={user.firstName} onChange={(event) => valueChangeHandler(event)} />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="name" className="form-label">
                Last name
              </label>
              <input type="text" className="form-control" name="lastName" placeholder="Enter your last name" value={user.lastName} onChange={(event) => valueChangeHandler(event)} />
            </div>
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
              <input type="password" className="form-control" name="password" placeholder="Password" value={user.password} onChange={(event) => valueChangeHandler(event)} />
            </div>
            <button type="submit" className="btn btn-lg btn-primary btn-block mt-4">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
