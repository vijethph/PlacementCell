import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

const Profile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    // let spinner = false;
    const token = localStorage.getItem("userToken") || "";
    const decodedPayload: IUser = jwt_decode(token);

    setUser({
      firstName: decodedPayload.firstName,
      lastName: decodedPayload.lastName,
      email: decodedPayload.email,
    });

    //   getData("videos").then((result: IVideo[]) => {
    //     if (!spinner) {
    //       setVideos(result);
    //     }
    //   });

    return () => {
      // spinner = true;
    };
  }, []);

  return (
    <div className="container">
      <div className="jumbotron mt-5 border border-primary">
        <div className="col-sm-8 mx-auto">
          <h1 className="text-center">User Profile</h1>
        </div>
        <table className="table col-md-6 mx-auto">
          <tbody>
            <tr>
              <td>First Name</td>
              <td>{user.firstName}</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>{user.lastName}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{user.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
