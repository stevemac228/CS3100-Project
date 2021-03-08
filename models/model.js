const client = require("../utils/db.js");
const { DB } = require("mongodb");
const e = require("express");

/* Resposible for connection to the various collections */
async function getCollection (collectionName){ //terms, c19DayWise, c19Worldometer, c19FullGrouped, fullClean
    try{
	    	let db = await client.getDb();
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
    static async getTweetCountByTerm(term) {
        var term_get = term;
        return new Promise(async function (resolve, reject){
			let collection = await getCollection("terms");
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

	/* Gets all info for a day */
    static async getByDay(day) {
        var day_to_get = day;
        return new Promise(async function (resolve, reject){
			let collection = await getCollection('c19DayWise');
			 collection.find({"Date":day_to_get}).toArray((err, items)=>{
				if (err) reject(err);
				if(items.length > 0) {
					resolve(items); 
				}else{
                    console.log('The day '+ day_to_get +' was not Found');
					resolve('There are no documented cases for '+ day_to_get);
				}
			});	 
		});
    };
	
	/* Gets specific info for a day */
    static async getInfoByDay(day, field) {
        var day_to_get = day;
        return new Promise(async function (resolve, reject){
			let collection = await getCollection('c19DayWise');
			let fieldArray[] = getField(field);
			 collection.find({"Date":day_to_get}, 
					 {"Date": 0,"Confirmed":fieldArray[0],"Deaths":fieldArray[1],"Recovered":fieldArray[2],"Active": 0,"New cases": 0,
					  "New deaths": 0,"New recovered": 0,"Deaths / 100 Cases": 0,"Recovered / 100 Cases": 0,"Deaths / 100 Recovered": 0,
					  "No. of countries": 0})(err, items)=>{
				if (err) reject(err);
				if(items.length > 0) {
					resolve(items); 
				}else{
                    console.log('The day '+ day_to_get +' was not Found');
					resolve('There are no documentation for '+ day_to_get);
				}
			});	 
		});
    };
	
	/**/
    static async getCountry(country) {
        var country_to_get = country;
        return new Promise(async function (resolve, reject){
			let collection = await getCollection('c19Worldometer');
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

	/**/
    static async getDayandCountry(day, country) {
        var day_to_get = day;
        var country_to_get = country;
        return new Promise(async function (resolve, reject){
			let collection = await getCollection('c19FullGrouped');
			 collection.find({"Date":day_to_get}, {"Country/Region":country_to_get}).toArray((err, items)=>{
				if (err) reject(err);
				if(items.length > 0) {
					resolve(items); 
				}else{
					console.log(day_to_get +", "+ country_to_get +' was not Found');
					resolve('There are no documented cases for '+ day_to_get +" "+ country_to_get);
				}
			});	 
		});
    };

	/**/
    static async getTweetsByDay(day) {
        var day_to_get = day;
        return new Promise(async function (resolve, reject){
			let collection = await getCollection('fullClean');
			 collection.find({"date":day_to_get}).toArray((err, items)=>{
				if (err) reject(err);
				if(items.length > 0) {
					resolve(items); 
				}else{
					console.log(day_to_get +' was not Found');
					resolve('There are no documented cases for '+ day_to_get);
				}
			});	 
		});
    };

	/**/
    static async dayCompare(day) {
        var day_to_get = day;
        return new Promise(async function (resolve, reject){
			let collection = await getCollection('fullClean');
            let collection2 = await _get_collection('c19DayWise');
			collection.find({"date":day_to_get}).toArray((err, items1)=>{
                collection2.find({"date":day_to_get}).toArray((err, items2)=>{
                    if (err) reject(err);
                    //console.log(items1+" "+ items2);
                    if(items1.length > 0 && items1.length > 0) {
                        resolve(items1); 
                    }else{
                        console.log(day_to_get +' was not found');
                        resolve('There is no comparable data for '+ day_to_get);
                    }
                });
			});	 
		});
    };
	
	/* Returns all cases within a range of time */
    static async casesOverTime(id, id2) {
        var day_get = id;
	var day_end = id2
        return new Promise(async function (resolve, reject){
            let collection = await _get_collection('c19DayWise');
			collection.find({"date":day_get}).toArray((err, items)=>{
				if (err) reject (err);
				if (items.length > 0) {
					while (items.next() != day_end) {
						console.log(items);
						items = items.next(); }
				}else{
					resolve('There is no comparable data for '+ day_get)
				}	
				if (items.next == day_end) {
					resolve(items.next())
				}
				});
   		})
	};
	
	/* Returns all deaths within a range of time */
    static async deathsOverTime(day1, day2) { 
        var first_day = day1;
	var last_day = day2
        return new Promise(async function (resolve, reject){
            /**
             * code
             */
        });
    };
	
	/* Generates an overall ratio between the amount of tweets and the virus data */
    static async tweetRatio(field) { 
        var x;
        return new Promise(async function (resolve, reject){
            /**
             * code
             */
        });
    };
	
}


module.exports = stats
