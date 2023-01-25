require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const { connect, disconnect } = require("./config/db.config");
const { userRouter } = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const socketioAuth = require("socketio-auth");
const authenticate = require("./middlewares/authenticate");
const postAuthenticate = require("./middlewares/postAuthenticate");

const httpServer = createServer(app);
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(
  cors({
    origin: ["https://social-gram.onrender.com", "http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
}
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send({ status: true, message: "Instagram Api Home" });
});
app.use("/api/user", userRouter);
app.use("/api/post", postRoutes);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Connect With Socket Id " + socket.id);
  socket.on("disconnect", () => console.log("closed connection"));
});
socketioAuth(io, { authenticate, postAuthenticate });
httpServer.listen(process.env.PORT, async () => {
  await connect();
  console.log(`Server Started Listening On Port ${process.env.PORT}`);
});
