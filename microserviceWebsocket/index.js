const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
require('dotenv').config(); 
const messageSchema = require('./models/messageSchema'); 
mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGO_DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('Connected to MongoDB');
});

app.use(cors({
    origin: 'http://localhost:3001', 
    methods : ['GET' , 'POST'], 
    credentials : 'true'
}));

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

const conversationData = mongoose.models.messagesData || mongoose.model('messagesData', messageSchema);
conversationData.createIndexes();

var AlreadyArived = {};

io.on('connection', (socket) => {
    socket.on('messageServerConnection', async (arg, callback) => {
        console.log(arg); 
        var recipientId = arg.turn === '2' ? arg.user2 : arg.user1;
        if (!AlreadyArived[arg.hh]) {
            try {
                var dataS = new conversationData(arg);
                await dataS.save();
                socket.broadcast.emit('recieveMessage', arg);
                AlreadyArived[arg.hh] = 1;
                callback("messageSaved");
            } catch (err) {
                console.log({ error: err });
            }
        }
    });
    socket.on('getMessages', (arg, callback) => {
        conversationData.find(arg).then((data) => {
            callback(data);
        });
    });

    socket.on('registerUser', (arg, callback) => {
        socket.join(arg.resu);
        callback("user registered");
    });
});


app.get('/', (req, res) => {
    res.send('WebSocket server is running');
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`WebSocket Server running on port ${PORT}`);
});
