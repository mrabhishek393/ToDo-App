const express = require("express");

const app = express();

const tasks = require("./routes/tasks");

const connectDB = require("./db/connect");

const notfound = require("./middleware/notfound");

const error_handler = require("./middleware/error-handler");

require("dotenv").config();
app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/tasks", tasks);
app.use(notfound);
app.use(error_handler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, () => console.log("Listening on port 3000"));
  } catch (error) {
    console.log("Error");
  }
};

start();
