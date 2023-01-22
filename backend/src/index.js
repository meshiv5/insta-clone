require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const { connect, disconnect } = require("./config/db.config");
const { userRouter } = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send({ status: true, message: "Instagram Api Home" });
});
app.use("/api/user", userRouter);
app.use("/api/post", postRoutes);

app.listen(process.env.PORT, async () => {
  await connect();
  console.log(`Server Started Listening On Port ${process.env.PORT}`);
});
