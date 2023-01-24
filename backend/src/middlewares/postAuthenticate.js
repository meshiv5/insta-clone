const postAuthenticate = (socket) => {
  socket.on("create-comment", (data, id) => {
    socket.broadcast.emit(`get-comment-${id}`, data);
  });
  socket.on("delete-comment", (id) => {
    socket.broadcast.emit("delete-comment", id);
  });
};
module.exports = postAuthenticate;
