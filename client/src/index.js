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
import JavascriptTimeAgo from 'javascript-time-ago'
 
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'
 
JavascriptTimeAgo.addLocale(en)
JavascriptTimeAgo.addLocale(ru)

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
