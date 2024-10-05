require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions.js");
const { logger, logs } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler.js");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const dbConn = require("./config/dbConn");
dbConn();
console.log(process.env.DATABASE_URI);
console.log(process.env.NODE_ENV);
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/notes", require("./routes/notes"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logs(err.message, "errors.log");
  process.exit(1);
});
