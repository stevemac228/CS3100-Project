const Model = require("../models/model.js")

const all = async (req, res) => {
	let db = req.db;
	try{
		let obj = await Model.getAllTerm(db);
		console.log('server-side: '+obj.length+' terms were returned');
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving all Terms. (err:'+err+')');
		throw new Error(err);
	}
		
}

const getOne = async (req, res) => {
	const term_to_get = req.params.id;
	let db = req.db;
	try{
		let obj = await Model.getTermById(db, term_to_get);
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving the term. (err:'+err+')');
		throw new Error(err);
	}	
}

 const casesByDay = async (req, res) => {
	const day_to_get = req.params.id;
	let db = req.db;
	try{
		let obj = await Model.getCasesByDay(db, day_to_get);
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving the day. (err:'+err+')');
		throw new Error(err);
	}	
}


module.exports = {
	getOne,
	all,
    casesByDay
}