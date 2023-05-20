import { Server } from 'socket.io';
var hash = require('object-hash');





const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/', {
    dbName: 'ProfilesX',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : 'Done');


const messageSchema = new mongoose.Schema({
    user1: String,
    user2: String,
    turn : String , 
    message: String,
    time :  String , 
    hh : {type: String , unique : true}
})

var conversationData = mongoose.models.messagesData || mongoose.model('messagesData', messageSchema);
conversationData.createIndexes();

function messengingBackend(req, res) {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io
    }
    ;
    res.socket.server.io.on('connection', (socket) => {
        socket.on('messageServerConnection', (arg, callback) => {
            var dataS = new conversationData(arg); 
            dataS.save().then(() => {
            }).catch((err) => {
                console.log(err);
            })
            callback("messageSaved")
        })
    })
    res.socket.server.io.on('connection', (socket) => {
        socket.on('getMessages', (arg, callback) => { 
            conversationData.find(arg).then((data)=>{
                callback(data);                
            })
        })
    })
    res.end()
}

export default messengingBackend