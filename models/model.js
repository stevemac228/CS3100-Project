/* General notes
1. For our more complex functions such as "getCaseByDay" we might want to consider having case, death, recovery or so on be a varaible in it
	and just have the function be a "getByDay" to reduce the amount of coding overall.
2. I didn't know if anybody had plans so I didn't want to mess around with the skeleton too much until I get the okay.
4. I don't understand what "var id_get = id;" does and why id is a variable in the method besides.
*/
const client = require("../utils/db.js");
const { DB } = require("mongodb");
const e = require("express");

async function getCollection (string collectionName){ //terms, c19DayWise, c19Worldometer, c19FullGrouped, fullClean
    try{
	    	let db = await client.getDb();
		return await db.collection(collectionName);
	}catch(err){
		throw err;
	}    
};

class stats {
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

    static async getCasesByDay(day) {
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
	
    static async casesOverTime(id, id2) { //very rough but I based it off the skeleton design
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
}


module.exports = stats
