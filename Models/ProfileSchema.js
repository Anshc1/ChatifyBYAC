const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    UID: String,
    URL: String,
});
export default ProfileSchema; 
