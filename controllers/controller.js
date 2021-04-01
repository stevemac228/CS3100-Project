const Model = require("../models/model.js")

const getCountByTerm = async (req, res) => {
	const term_to_get = req.params.term;
	let db = req.db;
	try{
		let obj = await Model.getCountByTerm(db,term_to_get);
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving the term. (err:'+err+')');
		throw new Error(err);
	}	
}

const getTweetsByDay = async (req, res) => {
	const day_to_get = req.params.date;
	let db = req.db;
	try{
		let obj = await Model.getTweetsByDay(db,day_to_get);
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving the day. (err:'+err+')');
		throw new Error(err);
	}	
}

 const getByDay = async (req, res) => {
	const day_to_get = req.params.date;
	let db = req.db;
	try{
		let obj = await Model.getByDay(db,day_to_get);
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving the day. (err:'+err+')');
		throw new Error(err);
	}	
}

const getCountry = async (req, res) => {
	const country_to_get = req.params.country;
	let db = req.db;
	try{
		let obj = await Model.getCountry(db,country_to_get);
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving the country. (err:'+err+')');
		throw new Error(err);
	}	
}



const getDayandCountry = async (req, res) => {
	const country_to_get = req.params.country;
	const day_to_get  = req.params.date; 
	let db = req.db;
	try{
		let obj = await Model.getDayandCountry(db,day_to_get,country_to_get);
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving the country. (err:'+err+')');
		throw new Error(err);
	}	
}

const getInfoByDay = async (req, res) => {
	const day_to_get  = req.params.date; 
	const field_to_get = req.params.field;
	let db = req.db;
	try{
		let obj = await Model.getInfoByDay(db,day_to_get,field_to_get);
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving the day. (err:'+err+')');
		throw new Error(err);
	}	
}

const getInfoOverTime = async (req, res) => {
	const day_get = req.params.date; 
	const day_end =  req.params.date2;
	const field_to_get = req.params.field;
	let db = req.db;
	try{
		let obj = await Model.getInfoOverTime(db,day_get,day_end,field_to_get);
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving the day. (err:'+err+')');
		throw new Error(err);
	}	
}

const getRatio = async (req, res) => {
	const field_to_get = req.params.field;
	let db = req.db;
	try{
		let obj = await Model.tweetRatio(db,field_to_get);
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving the day. (err:'+err+')');
		throw new Error(err);
	}	
}

const getCountryOverTime = async (req, res) => {
	const country_to_get = req.params.country;
	const day_get = req.params.date; 
	const day_end =  req.params.date2;
	const field_to_get = req.params.field;
	let db = req.db;
	try{
		let obj = await Model.getCountryInfoOverTime(db,country_to_get,day_get,day_end,field_to_get);
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving the day. (err:'+err+')');
		throw new Error(err);
	}	
}

const getCovidWorld = async (req, res) => {
	let db = req.db;
	try{
		let obj = await Model.getCovidWorld(db);
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving the day. (err:'+err+')');
		throw new Error(err);
	}	
}

const getTwitterAll = async (req, res) => {
	let db = req.db;
	try{
		let obj = await Model.getTwitterAll(db);
		res.send(obj);
	}catch(err){
		res.send('There was an error while retrieving the day. (err:'+err+')');
		throw new Error(err);
	}	
}

getTwitterAll



module.exports = {
	getCountByTerm,
	getTweetsByDay,
    getByDay,
	getCountry,
	getDayandCountry,
	getInfoByDay,
	getInfoOverTime,
	getCountryOverTime,
	getRatio,
	getCovidWorld,
	getTwitterAll
}