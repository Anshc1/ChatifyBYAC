const mongoose = require('mongoose');
import ProfileSchema from "../../Models/userSchema" 
mongoose.connect('mongodb://127.0.0.1:27017/', {
    dbName: 'ProfilesX',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : "DONE");

var ProfileX = mongoose.models.profilesX || mongoose.model('profilesX', ProfileSchema);
ProfileX.createIndexes({unique: true});

let ALreadyArrived ={}; 
async function serverBackend(req, res) {
    if (req.method === 'POST') {
        if (req.body.type === 'first') {
            if(ALreadyArrived[req.body.email] === 1 ){

            }else{
                var data = new ProfileX({ name: req.body.name, email: req.body.email, UID: req.body.UID });
                data.save().then(() => {
                    res.send("success")
                    ALreadyArrived[req.body.email] = 1 ;
                }).catch(err => {
                    res.status(400).send(err)
                })
            }
        } else {
            try {
                const q = JSON.stringify(req.body.UID);
                const user = await ProfileX.find({ UID: q });
                res.status(201).json({ success: true, data: user });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
        }
    } else {
        try {
            const users = await ProfileX.find({}); 
            res.status(201).json({ success: true, data: users });
        } catch (error) {
            res.status(400).json({ success: false, error: error });
        }
    }
}

export default serverBackend
