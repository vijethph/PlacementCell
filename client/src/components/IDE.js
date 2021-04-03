import React, { Component } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import axios from "axios";
require("codemirror/mode/python/python");
require("codemirror/mode/clike/clike");
require("codemirror/mode/javascript/javascript");
require("codemirror/lib/codemirror.css");
require("codemirror/theme/material.css");

let postBody = {
  lang: "",
  source: "",
  callback: "",
};
let boddy = new FormData();
let inputisthere = false;

export default class IDE extends Component {
  constructor() {
    super();
    this.state = {
      language: "text/x-java",
      code: "",
      compile: "",
      run: "",
      inputthings: "",
    };
  }
  compileCode() {
    switch (this.state.language) {
      case "text/x-csrc":
        postBody["lang"] = "C";
        //boddy.set("lang", "C");
        break;
      case "text/x-c++src":
        postBody["lang"] = "CPP14";
        //boddy.set("lang", "CPP14");
        break;
      case "text/x-java":
        postBody["lang"] = "JAVA";
        //boddy.set("lang", "JAVA");
        break;
      case "python":
        postBody["lang"] = "PYTHON3";
        //boddy.set("lang", "PYTHON3");
        break;
    }
    //console.log("code status:" + boddy.get("lang"));

    if (inputisthere == true) {
      console.log(this.state.inputthings);
      postBody["input"] = this.state.inputthings;
      //boddy.set("input", this.state.inputthings);
    }

    //boddy.append("client_secret", process.env.REACT_APP_HACKEREARTH_API_KEY);
    //boddy.append('lang', 'PYTHON3');
    //boddy.append("source", this.state.code);
    //boddy.append("callback", "https://336a7eef90c3.ngrok.io/codehook");

    postBody["source"] = this.state.code;
    postBody["callback"] = window.location.origin + "/codehook";

    axios({
      method: "post",
      url:
        "https://cors.bridged.cc/https://api.hackerearth.com/v4/partner/code-evaluation/submissions/",
      data: postBody,
      headers: {
        "Content-Type": "application/json",
        "client-secret": process.env.REACT_APP_HACKEREARTH_API_KEY,
      },
    })
      .then((response) => {
        //handle success
        console.log(response);
        setTimeout(
          function () {
            axios({
              method: "get",
              url: window.location.origin + "/coderesult",
            })
              .then((response) => {
                this.setState({ compile: response.data.compile_status });
              })
              .catch((response) => {
                console.log(response);
              });
          }.bind(this),
          5000
        );
      })
      .catch((response) => {
        //handle error
        console.log(response);
      });

    /*
   fetch('https://api.hackerearth.com/v3/code/compile/',{
            method:'POST',
            body: JSON.stringify({
            client_secret: process.env.REACT_APP_HACKEREARTH_API_KEY,
		lang: 'PYTHON3',
      source: this.state.code,
	}),
	headers: {

		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "X-Requested-With"
	}
      }).then((response) => response.json())
          .then(function(data) { console.log(data); })
          .catch((error) => console.log(error));
      */
    // console.log(this.state.code);
  }

  runCode() {
    switch (this.state.language) {
      case "text/x-csrc":
        postBody["lang"] = "C";
        //boddy.set("lang", "C");
        break;
      case "text/x-c++src":
        postBody["lang"] = "CPP14";
        //boddy.set("lang", "CPP14");
        break;
      case "text/x-java":
        postBody["lang"] = "JAVA";
        //boddy.set("lang", "JAVA");
        break;
      case "python":
        postBody["lang"] = "PYTHON3";
        //boddy.set("lang", "PYTHON3");
        break;
    }
    //console.log("code status:" + boddy.get("lang"));

    if (inputisthere == true) {
      console.log(this.state.inputthings);
      postBody["input"] = this.state.inputthings;
      //boddy.set("input", this.state.inputthings);
    }

    //boddy.append("client_secret", process.env.REACT_APP_HACKEREARTH_API_KEY);
    //boddy.append('lang', 'PYTHON3');
    //boddy.append("source", this.state.code);
    //boddy.append("callback", "https://336a7eef90c3.ngrok.io/codehook");

    postBody["source"] = this.state.code;
    postBody["callback"] = window.location.origin + "/codehook";

    axios({
      method: "post",
      url:
        "https://cors.bridged.cc/https://api.hackerearth.com/v4/partner/code-evaluation/submissions/",
      data: postBody,
      headers: {
        "Content-Type": "application/json",
        "client-secret": process.env.REACT_APP_HACKEREARTH_API_KEY,
      },
    })
      .then((response) => {
        //handle success
        console.log(response);
        setTimeout(
          function () {
            axios({
              method: "get",
              url: window.location.origin + "/coderesult",
            })
              .then((response) => {
                this.setState({ run: response.data.run_status });
              })
              .catch((response) => {
                console.log(response);
              });
          }.bind(this),
          5000
        );
      })
      .catch((response) => {
        //handle error
        console.log(response);
      });
  }

  handleChange(event) {
    this.setState({ language: event.target.value });
    console.log(
      "handlechange:" + this.state.language + " sdvs" + this.state.code
    );
  }

  getInput(event) {
    this.setState({ inputthings: event.target.value });
    boddy.set("input", this.state.inputthings);
    inputisthere = true;
  }
  render() {
    return (
      <div className="container-fluid">
        <br />
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-left">Live Code Compiler</h3>
            <div className="dropdown">
              <select
                value={this.state.language}
                onChange={this.handleChange.bind(this)}
              >
                <option value="text/x-csrc" className="dropdown-item">
                  C
                </option>
                <option value="text/x-c++src" className="dropdown-item">
                  C++
                </option>
                <option value="text/x-java" className="dropdown-item">
                  Java
                </option>
                <option value="python" className="dropdown-item">
                  Python
                </option>
              </select>
            </div>
          </div>
          <div className="col-md-12">
            <br />
            <CodeMirror
              value="<h1>I ♥ react-codemirror2</h1>"
              options={{
                mode: this.state.language,
                theme: "material",
                lineNumbers: true,
              }}
              onChange={(editor, data, value) => {
                //console.log(value);
                this.setState({
                  code: value,
                });
              }}
            />
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-md-4 ">
            <div className="card">
              <h5 className="card-header">Input</h5>
              <div className="card-body">
                <textarea
                  className="form-control"
                  rows="3"
                  onChange={this.getInput.bind(this)}
                ></textarea>
              </div>
              <div className="card-footer">
                Type any input that needs to be given to program
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <h5 className="card-header">Compile Output</h5>
              <div className="card-body">
                <p className="card-text">{this.state.compile}</p>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-outline-primary btn-block mt-5 mx-auto"
              onClick={this.compileCode.bind(this)}
            >
              Compile Code
            </button>
          </div>
          <div className="col-md-4 ">
            <div className="card">
              <h5 className="card-header">Run Output</h5>
              <div className="card-body">
                <p className="card-text">{this.state.run}</p>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-block btn-outline-success mt-5 mx-auto"
              onClick={this.runCode.bind(this)}
            >
              Run Code
            </button>
          </div>
        </div>
      </div>
    );
  }
}
