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
var contact = mongoose.models.contact || mongoose.model('contact', contactSchema);
contact.createIndexes();
async function serverBackendRelationship(req, res) {
    var val ; 
    if (req.method === 'GET') {
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
    }
}

export default serverBackendRelationship
