const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/', {
    dbName: 'ProfileImages',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : "DONE");
const ProfileSchema = new mongoose.Schema({
    UID: String,
    URL: String,
});
var ProfilesImages = mongoose.models.profileImages || mongoose.model('profileImages', ProfileSchema);
ProfilesImages.createIndexes();

async function serverBackend(req, res) {
    if (req.method === 'POST') {
        if(req.body.type === '1'){
            await ProfilesImages.deleteMany({UID : req.body.UID})
            var data = new ProfilesImages({UID : req.body.UID , URL : req.body.URL});
            data.save().then(() => {
                res.status(200).send("success")
            }).catch(err => {
                res.status(400).send(err)
            })
        }else{
            await ProfilesImages.find({UID : req.body.UID}).then((data) => {
                res.status(200).send(data); 
            }).catch(err => {
                res.status(400).send(err)
            })
        }
    }else{
        await ProfilesImages.find({}).then((data)=>{
            console.log(data)
            res.status(200).send(data);  
        }).catch(err=>{
            console.log(err); 
            res.status(400).send('error'); 
        }); 
    }
}

export default serverBackend
