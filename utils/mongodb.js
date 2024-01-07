import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://ansh_c:12345@cluster0.znvzn.mongodb.net/';
const MONGO_DB_NAME = 'ProfilesX';

if (!MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            dbname : MONGO_DB_NAME, 
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectToDatabase;
