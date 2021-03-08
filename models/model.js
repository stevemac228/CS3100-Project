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

/* Determines which field is being looked for on a specific day */
async function getField (fieldType){ 
    try{
	    	if(fieldType == "cases"){
			var field = [1,0,0];
		}else if(fieldType == "deaths"){
			var field = [0,1,0];
		}else if(fieldType == "recoveries"){
			 var field = [0,0,1];
			 }
		return await field
	}catch(err){
		throw err;
	}    
};

class stats {
	
	/*Gets the amount of times a valid term was tweeted*/
    static async getCountByTerm(db,term) {
        var term_get = term;
        return new Promise(async function (resolve, reject){
			let collection = await getCollection(db,"terms");
			 collection.find({"term":term_get}).toArray((err, items)=>{
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
    /*Gets the amount of tweets on input day*/
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
				if(items.length > 0) {
					if (field_to_get == 'Active'){
						const picked = (({Active}) => ({Active}))(items[0]);
						resolve(picked); 
					}else if (field_to_get == 'Deaths'){
						const picked = (({Deaths}) => ({Deaths}))(items[0]);
						resolve(picked); 
					}
					
				}else{
                    console.log('The day '+ day_to_get +' was not found');
					resolve('There are no documentation for '+ day_to_get);
				}
			});	 
		});
    };
	
	/*Gets specific info for a country*/
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

	/*Gets all information for a country on a specific date*/
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
    static async getCasesOverTime(db, day1, day2) {
        var day_get = day1;
		var day_end = day2;
		var i;
		let total = 0;
        return new Promise(async function (resolve, reject){
            let collection = await getCollection(db,'c19DayWise');
			collection.find({"Date":{$gte: day_get, $lte: day_end }}).toArray((err, items)=>{
				if (err) reject (err);
				if(items.length > 0) {
					for(i = 0; i < items.length; i++){
						total += parseInt(items[i].Confirmed);
					}
					resolve(total); 
				}else{
					resolve('There is no comparable data for '+ day_get + ", " + day_end)
				}	
				
			});
   		})
	};
	
	/* Returns all deaths within a range of time */
	static async getDeathsOverTime(db, day1, day2) { 
		var day_get = day1;
		var day_end = day2;
		var i;
		let total = 0;
		return new Promise(async function (resolve, reject){
			let collection = await getCollection(db,'c19DayWise');
			collection.find({"Date":{$gte: day_get, $lte: day_end }}).toArray((err, items)=>{
				if (err) reject (err);
				if(items.length > 0) {
					for(i = 0; i < items.length; i++){
						total += parseInt(items[i].Deaths);
					}
					resolve(total); 
				}else{
					resolve('There is no comparable data for '+ day_get + ", " + day_end)
				}	
			
			});
		})
	};

	static async getCountryCasesOverTime(db, country, day1, day2) {
		var country_to_get = country;
		var day_get = day1;
		var day_end = day2;
		return new Promise(async function (resolve, reject) {
			let collection = await _get_collection(db,'c19DayWise');
			collection.find({"Date":{$gte: day_get, $lte: day_end}}, {"Country/Region":country_to_get}).toArray((err, items)=>{
				if (err) reject (err);
				if (items.length > 0) {
					for(i = 0; i < items.length; i++){
						total += parseInt(items[i].Confirmed);
					}
					resolve(total);
				}else{
					resolve('There is no comparable data for '+ day_get + country_to_get);
				}
				if (items.next == day_end) {
					resolve(items.next());
				}
			});
   		})
	};
	
	/* Generates an overall ratio between the amount of tweets and the virus data */
    static async tweetRatio(db,field) { 
        var x;
        return new Promise(async function (resolve, reject){
            /**
             * code
             */
        });
    };
	
}


module.exports = stats
