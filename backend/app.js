const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const socket = require("socket.io");
const dotenv = require("dotenv")

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


// CORS settings
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.options("*", cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization,Content-Length,X-Requested-With");
  next();
});

const usersList = []; // to store all users connected including their names and ids

io.on("connection", (socket) => {
  socket.on("b-join room", ({ roomID, userName }) => {
    let index = usersList.findIndex((user) => user.id === socket.id);
    if (index === -1) {
      const usersInRoom = io.sockets.adapter.rooms.get(roomID);
      let users = [];
      if (usersInRoom) {
        usersInRoom.forEach((u) => {
          const user = usersList.find((user) => user.id === u);
          if (user) {
            users.push(user);
          }
        });
        socket.emit("f-users joined", users);
      } else {
        io.to(roomID).emit("f-users joined", users);
      }

      let newUser = {
        id: socket.id,
        userName,
        roomID,
      };
      usersList.push(newUser);
      socket.join(roomID);
    }
  });

  socket.on("b-request connect", ({ userToConnect, from, signal, userName }) => {
    io.to(userToConnect).emit("f-get request", {
      signal: signal,
      from: from,
      userName,
    });
  });

  socket.on("b-accept connect", ({ from, signal }) => {
    io.to(from).emit("f-accepted connect", {
      signal: signal,
      id: socket.id,
    });
  });

  socket.on("b-send message", ({ message, roomID, userName, time }) => {
    io.to(roomID).emit("f-receive message", { message, userName, time });
  });

  socket.on("b-send file", ({ roomID, body }) => {
    io.to(roomID).emit("f-recieve file", body);
  });

  socket.on("b-send sound", ({ roomID, target }) => {
    io.to(roomID).emit("f-recieve sound", target);
  });

  socket.on("disconnect", () => {
    const userIdx = usersList.findIndex((user) => user.id === socket.id);
    if (userIdx !== -1) {
      socket.leave(usersList[userIdx].roomID);
      usersList.splice(userIdx, 1);
      socket.broadcast.emit("user left", socket.id);
    }
  });
});



server.listen(3001, () => {
  console.log("Server started at http://localhost:3001");
});
