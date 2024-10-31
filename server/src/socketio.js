import { Server } from 'socket.io';

let io;

const initSocket = async (server) => {
  if (io) {
    return;
  }

  io = new Server(server);

  /*
  io.on("connection", sync(socket) =>{
    socket.on("new connection", () => {
    })

    socket.on("error", ()=>{})
  })
  
   */
};

/*
  relevant event summery:
  * delete group
  * add member to group
  * delete member from group
  * post note
  * put note
  * delete note
 */
const genericPublisher = async (groupId, event, result) => {
  io.in(groupId).emit(event, result);
};

export default {
  initSocket,
  genericPublisher,
};
