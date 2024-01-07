import connectToDatabase from '../../utils/mongodb';

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    email1: String,
    email2: String,
    Status: Boolean,
});




const serverBackendRelationship = async (req, res) => {
    connectToDatabase();
    var contact = mongoose.models.contact || mongoose.model('contact', contactSchema);

    contact.createIndexes();
    if (req.method === 'POST') {
        if (req.body.type === '1') {
            const data = {
                email1: req.body.email1,
                email2: req.body.email2,
                Status: false,
            }
            await contact.deleteMany(data);

            var val = new contact(data);
            await val.save().then(() => {
                res.send(200);

            });
        } else if (req.body.type === '2') {
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
            var datax = new contact(data);
            datax.save(datax).then(() => {
                //res.send("You are now Friends"); 
            }).catch((err) => {
                console.log(err);
            })
            data = {
                email1: req.body.email2,
                email2: req.body.email1,
                Status: true,
            }
            datax = new contact(data);
            datax.save(datax).then(() => {
                res.send("You are now Friends");
            }).catch((err) => {
                console.log(err);
            })
        } else if (req.body.type === '3') {
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
            res.end();
        } else if (req.body.type === '5') {
            contact.find({ email1: req.body.email1, email2: req.body.email2 }).then((data) => {
                res.send(data);
            })
        } else {
            contact.find({ email1: req.body.email }).then((data) => {
                res.status(200).send(data);
            })
        }
    }
}

export default serverBackendRelationship
