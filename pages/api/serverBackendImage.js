const mongoose = require('mongoose');
import ProfileSchema from '../../Models/ProfileSchema'; 
import connectToDatabase from '../../utils/mongodb';

async function serverBackendImage(req, res) {
    connectToDatabase(); 
    var ProfilesImages = mongoose.models.profileImages || mongoose.model('profileImages', ProfileSchema);
    ProfilesImages.createIndexes();
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
            //console.log(data)
            res.status(200).send(data);  
        }).catch(err=>{
            console.log(err); 
            res.status(400).send('error'); 
        }); 
    }
}

export default serverBackendImage
