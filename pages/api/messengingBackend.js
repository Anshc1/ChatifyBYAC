import { Server } from 'socket.io';
import messageSchema from '../../Models/messageSchema'; 


const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/', {
    dbName: 'ProfilesX',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : 'Done');


var conversationData = mongoose.models.messagesData || mongoose.model('messagesData', messageSchema);
conversationData.createIndexes();

var AlreadyArived  = {}; 
function messengingBackend(req, res) {

    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io
    }

    const onConnection = (socket) => {
        socket.on('messageServerConnection', (arg, callback) => {
            var recipientId = arg.user1;
            if (arg.turn === '2') {
                recipientId = arg.user2;
            }
            if(AlreadyArived[arg.hh]===1){

            }else{                
                var dataS = new conversationData(arg);
                dataS.save().then(() => {
                    socket.broadcast.emit('recieveMessage', arg);
                }).catch((err) => {
                    console.log({ error: arg });
                })
                AlreadyArived[arg.hh] = 1; 
                callback("messageSaved")
            }
        })
            
            
        socket.on('getMessages', (arg, callback) => {
            conversationData.find(arg).then((data) => {
                callback(data);
            })
        })

        socket.on('registerUser', (arg, callback) => {
            socket.join(arg.resu);
            callback("user registered");
        })
    }

    res.socket.server.io.on('connection', onConnection)
    res.end()
    AlreadyArived = {};
}

export default messengingBackend