import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import VideosList from "./components/VideosList";
import CompaniesList from "./components/CompaniesList";
import Quiz from "./components/Quiz";
import IDE from "./components/IDE";
import QuizSummary from "./components/QuizSummary";
import Forum from "./components/Forum";

const footerStyles = {
  position: "fixed",
  marginTop: "0px",
  flexShrink: "none",
  bottom: "0px",
  left: "0px",
  right: "0px",
  marginBottom: "0px",
};
const bodystyle = {
  paddingBottom: "100px",
};
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App" style={bodystyle}>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/videos" component={VideosList} />
            <Route exact path="/companies/details" component={CompaniesList} />
            <Route exact path="/ide" component={IDE} />
            <Route exact path="/quiz" component={Quiz} />
            <Route exact path="/quizSummary" component={QuizSummary} />
            <Route exact path="/discussion" component={Forum} />
          </div>
          {/* <footer
            className="text-muted text-center bg-dark py-4"
            style={footerStyles}
          >
            <div className="container">
              <span className="text-white">
                Developed By Sathya M and Vijeth P H
              </span>
            </div>
          </footer> */}
        </div>
      </Router>
    );
  }
}

export default App;
