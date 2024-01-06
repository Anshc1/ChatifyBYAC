const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    user1: String,
    user2: String,
    turn: String,
    message: String,
    time: String,
    hh: { type: String, unique: true }
})
export default messageSchema; 