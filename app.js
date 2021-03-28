const express = require("express");
const router = require("./routes/router");
const mongo = require('./utils/db');
const port = 3000
const app = express()

app.use(express.json())

var db;
async function loadDBClient() {
	try {
		db = await mongo.connectToDB();
	}catch(err){
		throw new Error('Could not connect to the Mongo DB');
	}
};  
loadDBClient();
app.use((req, res, next) => {
	req.db = db;	
	next();
});

app.use("/", router)
app.use(express.static(__dirname + '/view'))

server = app.listen(port, () => {
	console.log('Example app listening at http://localhost:%d', port);
});

process.on('SIGINT', () => {
	console.info('SIGINT signal received.');
	console.log('Closing Mongo Client.');
	mongo.closeDBConnection();
	server.close(() => {
	  console.log('Http server closed.');
	});
 });