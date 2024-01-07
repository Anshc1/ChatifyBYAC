const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const messageSchema = new mongoose.Schema({
    user1: String,
    user2: String,
    turn: String,
    message: String,
    time: String,
    hh: { type: String, unique: true }
});  

mongoose.connect('mongodb+srv://ansh_c:12345@cluster0.znvzn.mongodb.net/', {
    dbName: 'ProfilesX',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('Connected to MongoDB');
});

app.use(cors());

const conversationData = mongoose.models.messagesData || mongoose.model('messagesData', messageSchema);
conversationData.createIndexes();

var AlreadyArived = {};

io.on('connection', (socket) => {
    socket.on('messageServerConnection', async (arg, callback) => {
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
