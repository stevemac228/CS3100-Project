const MongoClient = require("mongodb").MongoClient
const uri = "mongodb+srv://cs3100:catca@cluster0.7ltlt.mongodb.net/test?authSource=admin&replicaSet=atlas-z3jqek-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


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