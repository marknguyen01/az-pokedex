import mongoose from 'mongoose';
    
let cached = global.mongoose;
let database = 'az-pokedex';

if(!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}
if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local')
}

if(process.env.NODE_ENV == "development" || process.env.NODE_ENV == "test") {
    database = 'test';
} else {
    database = process.env.MONGODB_DATABASE && process.env.MONGODB_DATABASE;
}


export default async function mongooseClient() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            dbName: database,
        }

        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}`, opts).then((mongoose) => {
            return mongoose
        })
    }

    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        throw e
    }
    console.log("Connection to DB established successfully!");
    return cached.conn
}