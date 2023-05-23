import { Server } from 'socket.io';
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/', {
    dbName: 'ProfilesX',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : 'Done');


const messageSchema = new mongoose.Schema({
    user1: String,
    user2: String,
})
var conversationData = mongoose.models.messagesData || mongoose.model('messagesData', messageSchema);
conversationData.createIndexes();

function saveMessage(req , res) { 
    let ioInstance
    if (ioInstance) {
        console.log('Socket is already running');    
    } else {
        console.log('Socket is initializing');
        const io = new Server(res.socket.server);
        ioInstance = io;
    }

    ioInstance.on('connection', (socket) => {
        // Listen for the 'getData' event from the client
        socket.on('getData', (requestData) => {
          // Process the request and retrieve the data from your server's logic
          conversationData.find(requestData).then((data) => {
              console.log(data);
              socket.emit('data', data);              
          })
        });
      });
    res.end();
}

export default saveMessage