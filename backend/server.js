const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/sneakers", require("./routes/sneakerRoutes"));

// Serve frontend
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../fly-america/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "fly-america", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production."));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
