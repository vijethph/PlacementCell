import React from "react";
import ReactDOM from "react-dom";
import "../node_modules/@mdi/font/css/materialdesignicons.min.css";
//import "../node_modules/materialize-css/dist/css/materialize.min.css";
//import "../node_modules/materialize-css/dist/js/materialize.min.js";
import "../node_modules/toastify-js/src/toastify.js";
//import "../node_modules/toastify-js/src/toastify.css";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
