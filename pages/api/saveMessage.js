import messageSchema from '../../Models/messageSchema'
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/', {
    dbName: 'ProfilesX',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : 'Done');

var conversationData = mongoose.models.messagesData || mongoose.model('messagesData', messageSchema);

conversationData.createIndexes();

function saveMessage(req , res) {
    var dataS = new conversationData(req.body);
    console.log(req.body)
    dataS.save().then(() => {
        res.send(200); 
    }).catch((err) => {
        console.log(err); 
    })
}

export default saveMessage