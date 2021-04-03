var express = require("express");
var cors = require("cors");
var path = require('path');
var https = require("https");
var bodyParser = require("body-parser");
var app = express();
const mongoose = require("mongoose");
var port = process.env.PORT || 5000;

let compile_status = "";
let run_status = "";

function defaultContentTypeMiddleware(req, res, next) {
  req.headers["content-type"] =
    req.headers["content-type"] || "application/json";
  next();
}

app.use(defaultContentTypeMiddleware);

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

var Users = require("./routes/Users");
var Companies = require("./routes/Companies");
var Videos = require("./routes/Videos");
var Questions = require("./routes/Questions");
var Discussions = require("./routes/Discussions");

app.use("/users", Users);
app.use("/companies", Companies);
app.use("/videos", Videos);
app.use("/quiz", Questions);
app.use("/discussion", Discussions);

app.post("/codehook", (req, res) => {
  if (req.body) {
    if (req.body.request_status.code == "CODE_COMPILED") {
      console.log(req.body.result.compile_status);
      compile_status = req.body.result.compile_status;
    } else if (req.body.request_status.code == "REQUEST_COMPLETED") {
      console.log(req.body.result.run_status.status);
      console.log("checking output url");
      console.log(req.body.result.run_status.output);

      https
        .get(req.body.result.run_status.output, (outputres) => {
          console.log(outputres.headers);
          let rawData = "";
          outputres.on("data", (chunk) => {
            rawData += chunk;
          });
          outputres.on("end", () => {
            try {
              const parsedData = rawData;
              console.log(parsedData);
              run_status = parsedData;
            } catch (e) {
              console.error(e.message);
            }
          });
        })
        .on("error", (e) => {
          console.error(`Got error: ${e.message}`);
        });
    }
  }

  res.status(200);
  res.send(); // Responding is important
});

app.get("/coderesult", (req, res) => {
  if (compile_status === "" && run_status === "") {
    res.statusCode = 204;
    res.end("No Content");
  } else {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({ compile_status: compile_status, run_status: run_status });
  }
});

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build'))
});

app.listen(port, function () {
  console.log("Server is running on port: " + port);
});
// what

