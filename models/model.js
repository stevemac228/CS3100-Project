const client = require("../utils/db.js");
const { DB } = require("mongodb");
const e = require("express");

/* Resposible for connection to the various collections */
async function getCollection (db,collectionName){ //terms, c19DayWise, c19Worldometer, c19FullGrouped, twtfullClean
	try{
		//let db = await client.getDb();
		return await db.collection(collectionName);
	}catch(err){
		throw err;
	}    
};

class stats {
	
	/* Gets the amount of times a valid term was tweeted */
	static async getCountByTerm(db,term) {
		var term_get = term;
		return new Promise(async function (resolve, reject){
			let collection = await getCollection(db,"terms");
			collection.find({"term":term_get}).toArray((err, items)=>{ //searches collection for desired term
				if (err) reject(err);
				if(items.length > 0) {
					resolve(items); 
				}else{
					console.log('Term '+ term_get +' was not Found');
					resolve('There are no tweets containing '+ term_get);
				}
			});	 
		});
	};
	
	/* Gets the amount of tweets on a day */
	static async getTweetsByDay(db,day) {
		var day_to_get = day;
		return new Promise(async function (resolve, reject){
			let collection = await getCollection(db,'twtFullClean');
			collection.find({"date":day_to_get}).toArray((err, items)=>{
				if (err) reject(err);
				if(items.length > 0) {
					resolve(items); 
				}else{
					console.log(day_to_get +' was not Found');
					resolve('There are no tweets found for '+ day_to_get);
				}
			});	 
		});
	};

	/* Gets all info for a day */
	static async getByDay(db,day) {
		var day_to_get = day;
		return new Promise(async function (resolve, reject){
			let collection = await getCollection(db,'c19DayWise');
			collection.find({"Date":day_to_get}).toArray((err, items)=>{
				if (err) reject(err);
				if(items.length > 0) {
					resolve(items); 
				}else{
					console.log('The day '+ day_to_get +' was not found');
					resolve('There are no documented cases for '+ day_to_get);
				}
			});	 
		});
	};
	
	/* Gets specific info for a day */
	static async getInfoByDay(db,day, field) {
		var day_to_get = day;
		var field_to_get = field;
		return new Promise(async function (resolve, reject){
			let collection = await getCollection(db,'c19DayWise');
			collection.find({"Date":day_to_get}).toArray((err, items)=>{
				if (err) reject(err);
				/* Section to identify which field is being asked to generate the correct result */
				if(items.length > 0) {
					if (field_to_get == 'Cases'){
						const picked = (({Active}) => ({Active}))(items[0]);
						resolve(picked); 
					}else if (field_to_get == 'Deaths'){
						const picked = (({New_deaths}) => ({New_deaths}))(items[0]);
						resolve(picked); 
					}else if (field_to_get == 'Recoveries'){
						const picked = (({New_recovered}) => ({New_recovered}))(items[0]);
						resolve(picked); 
					}else{
						console.log('The day '+ day_to_get +' was not found');
						resolve('There are no documentation for '+ day_to_get);
					}
				};	 
			});
		});
	};		   
	/* Gets specific info for a country */
	static async getCountry(db,country) {
        var country_to_get = country;
        return new Promise(async function (resolve, reject){
			let collection = await getCollection(db,'c19Worldometer');
			 collection.find({"Country/Region":country_to_get}).toArray((err, items)=>{
				if (err) reject(err);
				if(items.length > 0) {
					resolve(items); 
				}else{
					console.log(country_to_get +' was not Found');
					resolve('There are no documented cases for '+ country_to_get);
				}
			});	 
		});
   };

	/* Gets all information for a country on a specific date */
	static async getDayandCountry(db,day, country) {
		var day_to_get = day;
		var country_to_get = country;
		return new Promise(async function (resolve, reject){
			let collection = await getCollection(db,'c19FullGrouped');
			collection.find({"Date":day_to_get,"Country/Region":country_to_get}).toArray((err, items)=>{
				if (err) reject(err);
				if(items.length > 0) {
					resolve(items); 
				}else{
					console.log(country_to_get +", "+ day_to_get +' was not Found');
					resolve('There are no documented cases for '+ country_to_get +" on "+ day_to_get);
				}
			});	
		});
    };
	
	/* Returns all cases within a range of time */
	static async getInfoOverTime(db, day1, day2,field) {
		var day_get = day1;
		var day_end = day2;
		var field_to_get = field;
		var total = 0;
		var i;
		return new Promise(async function (resolve, reject){
			let collection = await getCollection(db,'c19DayWise');
			collection.find({"Date":{$gte: day_get, $lte: day_end }}).toArray((err, items)=>{
				if (err) reject (err);
				if(items.length > 0) {
					if (field_to_get == 'Cases'){ 
						for(i = 0; i < items.length; i++){
						const picked = (({Active}) => ({Active}))(items[i]);
							total += parseInt(picked.Active);
						}
						resolve(total.toString()); 
					}else if (field_to_get == 'Deaths'){
						for(i = 0; i < items.length; i++){
							const picked = (({New_deaths}) => ({New_deaths}))(items[i]);
							total += parseInt(picked.New_deaths);
						}
						resolve(total.toString());  
					}else if (field_to_get == 'Recoveries'){
						for(i = 0; i < items.length; i++){
							const picked = (({New_recovered}) => ({New_recovered}))(items[i]);
							total += parseInt(picked.New_recovered);
						}
						resolve(total.toString()); 
					}else{
						console.log('The day '+ day_get +' was not found');
						resolve('There are no documentation for '+ day_get);
					}
				};	
			});
   		});
	};

	/* Get all cases for a country within a range of time */
	static async getCountryInfoOverTime(db, country, day1, day2,field) {
		var country_to_get = country;
		var day_get = day1;
		var day_end = day2;
		var field_to_get = field;
		var i;
		var total = 0;
		return new Promise(async function (resolve, reject) {
			let collection = await getCollection(db,'c19FullGrouped');
			collection.find({"Date":{$gte: day_get, $lte: day_end}, "Country/Region":country_to_get}).toArray((err, items)=>{
				if (err) reject (err);
				if (items.length > 0) {
					if (field_to_get == 'Cases'){
						for(i = 0; i < items.length; i++){
							const picked = (({Active}) => ({Active}))(items[i]);
							total += parseInt(picked.Active);
						}
						resolve(total.toString()); 
					}else if (field_to_get == 'Deaths'){
						for(i = 0; i < items.length; i++){
							const picked = (({New_deaths}) => ({New_deaths}))(items[i]);
							total += parseInt(picked.New_deaths);
						}
						resolve(total.toString());  
					}else if (field_to_get == 'Recoveries'){
						for(i = 0; i < items.length; i++){
							const picked = (({New_recovered}) => ({New_recovered}))(items[i]);
							total += parseInt(picked.New_recovered);
						}
						resolve(total.toString()); 
					}else{
						console.log('The day '+ day_get +' was not found');
						resolve('There are no documentation for '+ day_get);
					}
				}
			});
   		});
	};
	
	/* Generates an overall ratio between the amount of tweets and the virus data */
	static async tweetRatio(db,field) { 
		var field_to_get = field;
		var i;
		var totalTweets = 0;
		var totalCases = 0;
		var totalDeaths = 0;
		var totalRecoveries = 0;
		var ratio = 0;
		return new Promise(async function (resolve, reject){
			let collection = await getCollection(db,'twtFullCleanINT'); //last minute adjustment to fix an error in the db
			let collection2 = await getCollection(db,'c19DaywiseINT');
			collection.find({}).toArray((err, items)=>{
				if (err) reject(err);
				if(items.length > 0) {
					for(i = 0; i < items.length; i++){
						totalTweets = totalTweets + items[i].tweetAmount;
					}
					if (field_to_get == 'Cases'){
						collection2.find().sort({Confirmed:-1}).limit(1).toArray((err, items)=>{ //gets max in the collection
							totalCases = items[0].Confirmed;
							ratio = (totalTweets/totalCases).toFixed(2); //rounds result to the second decimal place
							resolve(ratio.toString());
						});;
					}else if (field_to_get == 'Deaths'){
						totalDeaths = collection2.find().sort({Deaths:-1}).limit(1);
						ratio = (totalTweets/totalDeaths).toFixed(2);
						resolve(ratio.toString());
					}else if (field_to_get == 'Recoveries'){
						totalRecoveries = collection2.find().sort({Recovered:-1}).limit(1);
						ratio = (totalTweets/totalRecoveries).toFixed(2);
						resolve(ratio.toString());
					}else{
						console.log('The information was not found');
						resolve('The information was not found');
					}
				};	 
			});
		});
	};
	static async getCovidWorld(db) { 
		return new Promise(async function (resolve, reject){
			let collection = await getCollection(db,'c19DaywiseINT');
			collection.find({}).toArray((err, items)=>{
				if (err) reject(err);
				resolve(items);
			});	
		});
	};
};


module.exports = stats
