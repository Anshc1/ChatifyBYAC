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
        await ProfilesImages.deleteMany({UID : req.body.UID})
        var data = new ProfilesImages({UID : req.body.UID , URL : req.body.URL});
        data.save().then(() => {
            res.send("success")
        }).catch(err => {
            res.status(400).send(err)
        })
    }
}

export default serverBackend
