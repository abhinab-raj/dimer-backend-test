import { Server, Socket } from 'socket.io';

const SocketController = (IO: Server) => {
  IO.on('connection', (socket: Socket) => {
    console.log(socket.id, 'user connected');

    socket.on('test-endpoint', (client) => {
      // handle connection logic here
    });

    IO.sockets.emit('test-endpoint', {
      /** emit data to client */
    });
  });
};

export default SocketController;
