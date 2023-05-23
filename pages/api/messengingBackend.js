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

const ALreadyArrived ={}; 
function messengingBackend(req, res) {

    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io
    }
    res.socket.server.io.on('connection', (socket) => {
        socket.on('messageServerConnection', (arg, callback) => {
            var recipientId = arg.user1; 
            if(arg.turn == '2'){
                recipientId = arg.user2; 
            }
            if(ALreadyArrived[arg.hh]===1){
                
            } else{
                var dataS = new conversationData(arg); 
                dataS.save().then(() => {
                    socket.broadcast.emit('recieveMessage' , arg);
                }).catch((err) => {
                    console.log({error : arg.message});
                })
                ALreadyArrived[arg.hh] =1; 
            }
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
    res.socket.server.io.on('connection', (socket) => {
        socket.on('registerUser', (arg, callback) => { 
            socket.join(arg.resu); 
            callback("user registered");
        })
    })

    res.end()
}

export default messengingBackend