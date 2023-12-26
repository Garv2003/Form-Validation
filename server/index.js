const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const helmet = require("helmet");
const dotenv = require("dotenv");
dotenv.config();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(helmet());

mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB successfully connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("For testing purposes only");
});

app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);
