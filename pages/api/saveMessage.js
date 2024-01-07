import messageSchema from '../../Models/messageSchema'
import connectToDatabase from '../../utils/mongodb';
const mongoose = require('mongoose');


function saveMessage(req, res) {
    connectToDatabase(); 
    var conversationData = mongoose.models.messagesData || mongoose.model('messagesData', messageSchema);
    conversationData.createIndexes();
    var dataS = new conversationData(req.body);
    console.log(req.body)
    dataS.save().then(() => {
        res.send(200);
    }).catch((err) => {
        console.log(err);
    })
}

export default saveMessage