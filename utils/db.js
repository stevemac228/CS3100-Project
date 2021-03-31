const MongoClient = require("mongodb").MongoClient
const url ="mongodb+srv://cs3100:catca@cluster0.7ltlt.mongodb.net/test";
const client = new MongoClient(url, { useUnifiedTopology: true });


async function connectToDB() {
    try {
        // Connect the client to the server
        await client.connect();
        let db = client.db('CATCA');
        console.log("Connected successfully to mongoDB");  
        return db;
    } catch (err) {
        throw err;
    } 
}

async function getDb() {
    return db;
}

async function closeDBConnection(){
    try{
        await client.close();    
    }catch(err){
        throw err;
    }    
};

module.exports = {connectToDB, getDb, closeDBConnection}