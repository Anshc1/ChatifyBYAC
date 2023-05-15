
import { Server } from 'socket.io';
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/', {
    dbName: 'ProfilesX',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : "DONE");
const contactSchema = new mongoose.Schema({
    email1: String,
    email2: String,
    Status: Boolean,
});
const SidSchema = new mongoose.Schema({
    email : String ,  
    SID : String 
})
var contact = mongoose.models.contact || mongoose.model('contact', contactSchema);
var SIDs = mongoose.models.SIDs || mongoose.model('SIDs' ,SidSchema ) ; 
contact.createIndexes();
SIDs.createIndexes();


const serverBackendRelationship = (req, res) => {
    if (!res.socket.server.io) {
        console.log('*First use, starting socket.io')
        const io = new Server(res.socket.server)
        io.on('connection', socket => {
            socket.on('hello', msg => {
                socket.emit('hello', 'world!')
            })
        })
        res.socket.server.io = io
    } else {
        var data;
        var result; 
        res.socket.server.io.on('connection', socket => {
            socket.on('friend request sent', (arg, callback) => {
                SIDs.find({ email: arg.body.email1 }).then((reso) => {
                    data = JSON.stringify(reso)  
                    result = JSON.parse(data); 
                    //console.log(result[0].SID); 
                    socket.broadcast.to(result[0].SID).emit('send Frequest', arg.body.email ); 
                }) 
                callback('got it')
            })
        })
        /*const fun = async (data) => {
            console.log(data.email1);
            await SIDs.find({ email: data.email1 }).then((reso) => {
                console.log(reso);
            })
        }*/
        //console.log({'data': data}); 
        //console.log('socket.io already running')
    }
    res.end()

    /*if (req.method === 'GET') {
        console.log("vis"); 
    } else { 
        if (req.body.type === '1') {

            const data = {
                email1: req.body.email1,
                email2: req.body.email2,
                Status: false,
            }
            val = new contact(data);
            await val.save().then(()=>{
                const data1 = {
                    email1: req.body.email2,
                    email2: req.body.email1,
                    Status: false,
                }
                val = new contact(data1); 
                val.save().then(() => {
                    res.send(200); 
                }).catch(err => {
                    console.log(err);
                })
            });
        } else {
            console.log("vis2");  
            var data = {
                email1: req.body.email1,
                email2: req.body.email2,
                Status: false,
            }
            await contact.deleteMany(data);
            data = {
                email1: req.body.email2,
                email2: req.body.email1,
                Status: false,
            }
            await contact.deleteMany(data);
            data = {
                email1: req.body.email1,
                email2: req.body.email2,
                Status: true,
            }
        }
    }*/
}

export default serverBackendRelationship
