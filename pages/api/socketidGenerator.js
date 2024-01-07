import { Server } from 'socket.io';

const ioHandler = async(req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    io.on('connection', (socket) => {
        console.log('connectedhere')
        socket.on("connection id" , (arg , callBack)=>{
            const rid = arg; 
            socket.join(rid); 
            callBack("Successfully Joined")
        })
    });
  }
  res.end(); 
};

export default ioHandler;