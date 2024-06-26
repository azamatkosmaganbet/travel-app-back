  require("dotenv").config();
  const express = require("express");
  const cors = require("cors");
  const cookieParser = require("cookie-parser");
  const mongoose = require("mongoose");
  const router = require("./router/index");
  const errorMiddleware = require("./middlewares/error-middleware");
  const PORT = process.env.PORT || 5000;
  const app = express();
  app.use(
    cors({
      credentials: true,
      origin: [
        process.env.CLIENT_URL,
        process.env.PROD_URL,
        "http://localhost:3001",
        "http://192.168.0.122:3001/",
      ],
    })
  );

  app.use(express.json());
  app.use(cookieParser());
  app.use("/api", router);
  app.use(errorMiddleware);
  app.use(express.static("public"));

  const start = async () => {
    try {
      await mongoose.connect(process.env.DB_URL);
      app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
    } catch (e) {
      console.log(e);
    }
  };

  start();
