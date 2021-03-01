const Model = require("../models/model.js")

const TweetCountByTerm = async (req, res) => {
	const term_to_get = req.params.term;
	let db = req.db;
	try{
		let obj = await Model.getCountByTerm(db, term_to_get);
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving the term. (err:'+err+')');
		throw new Error(err);
	}	
}

 const casesByDay = async (req, res) => {
	const day_to_get = req.params.day;
	let db = req.db;
	try{
		let obj = await Model.getCasesByDay(db, day_to_get);
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving the day. (err:'+err+')');
		throw new Error(err);
	}	
}

const dayCompare = async (req, res) => {
	const day_to_get = req.params.date;
	let db = req.db;
	try{
		let obj = await Model.dayCompare(db, day_to_get);
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving the day. (err:'+err+')');
		throw new Error(err);
	}	
}

const allDate = async (req, res) => {
	const country_to_get = req.params.country;
	let db = req.db;
	try{
		let obj = await Model.getCountry(db, country_to_get);
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving the country. (err:'+err+')');
		throw new Error(err);
	}	
}

const DayandCountry = async (req, res) => {
	const country_to_get = req.params.country;
	let db = req.db;
	try{
		let obj = await Model.getCountry(db, country_to_get);
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving the country. (err:'+err+')');
		throw new Error(err);
	}	
}


module.exports = {
	TweetCountByTerm,
	all,
    casesByDay,
	allDate,
	DayandCountry,
	dayCompare
}