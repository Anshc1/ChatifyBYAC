const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/', {
    dbName: 'ProfilesX',
    useNewUrlParser: true,
    useUnifiedTopology: true
} , err => err ? console.log(err) : "DONE" );  
const ProfileSchema = new mongoose.Schema({
        name: String, 
        email : String ,  
        UID :  String, 
});
var ProfileX = mongoose.models.profilesX || mongoose.model('profilesX' ,ProfileSchema ); 
ProfileX.createIndexes();


async function serverBackend(req , res) {
   
    if(req.type === 'first'){
        try {
            const user = await ProfileX.create(req.body)
            res.status(201).json({ success: true, data: user })
        } catch (error) {             
            res.status(400).json({ success: false, error : error })
        }
    } else{
        try{
            const q = JSON.stringify(req.body); 
            console.log(q); 
            const user = await ProfileX.find({UID : q}); 
            res.status(201).json({success: true , data : user}); 
        }catch(error){
            console.log(error) ; 
            res.status(400).json({success :false , error: error}); 
        }
    }
}

export default serverBackend
