import { Server } from 'socket.io';

const mongoose = require('mongoose'); 
mongoose.connect('mongodb+srv://ansh_c:12345@cluster0.znvzn.mongodb.net/', {
    dbName: 'ProfilesX',
    useNewUrlParser: true,
    useUnifiedTopology: true
} , err=> err?console.log(err) : 'Done' ); 

const SidSchema = new mongoose.Schema({
    email : String ,  
    SID : String 
})
var SIDs = mongoose.models.SIDs || mongoose.model('SIDs', SidSchema);
SIDs.createIndexes();

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