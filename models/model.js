/* General notes
1. For our more complex functions such as "getCaseByDay" we might want to consider having case, death, recovery or so on be a varaible in it
	and just have the function be a "getByDay" to reduce the amount of coding overall.
2. I didn't know if anybody had plans so I didn't want to mess around with the skeleton too much until I get the okay.
3. Consider ways to minimize connecting to the collection.
4. I don't understand what "var id_get = id;" does and why id is a variable in the method besides.
*/
async function _get_terms_collection (db){
    try{
		return await db.collection('terms');
	}catch(err){
		throw err;
	}    
};

async function _get_DayWise_collection (db){
    try{
		return await db.collection('c19DayWise');
	}catch(err){
		throw err;
	}    
};

async function _get_Worldometer_collection (db){
    try{
		return await db.collection('c19Worldometer');
	}catch(err){
		throw err;
	}    
};

async function _get_Fullgrouped_collection (db){
    try{
		return await db.collection('c19FullGrouped');
	}catch(err){
		throw err;
	}    
};

async function _get_TweetCount_collection (db){
    try{
		return await db.collection('fullClean');
	}catch(err){
		throw err;
	}    
};


class stats {
    static async getTweetCountByTerm(db, term) {
        var term_get = term;
        return new Promise(async function (resolve, reject){
			let collection = await _get_terms_collection(db);
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

    static async getCasesByDay(db, day) {
        var day_to_get = day;
        return new Promise(async function (resolve, reject){
			let collection = await _get_DayWise_collection(db);
			 collection.find({"Date":day_to_get}).toArray((err, items)=>{
				if (err) reject(err);
				if(items.length > 0) {
					resolve(items); 
				}else{
                    console.log('Term '+ term_get +' was not Found');
					resolve('There are no documented cases for '+ day_to_get);
				}
			});	 
		});
    };

    static async getCountry(db, country) {
        var country_to_get = country;
        return new Promise(async function (resolve, reject){
			let collection = await _get_Worldometer_collection(db);
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

    static async getDayandCountry(db, day, country) {
        var day_to_get = day;
        var country_to_get = country;
        return new Promise(async function (resolve, reject){
			let collection = await _get_Fullgrouped_collection(db);
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

    static async getTweetsByDay(db, day) {
        var day_to_get = day;
        return new Promise(async function (resolve, reject){
			let collection = await _get_TweetCount_collection(db);
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

    static async dayCompare(db, day) {
        var day_to_get = day;
        return new Promise(async function (resolve, reject){
			let collection = await _get_TweetCount_collection(db);
            let collection2 = await _get_DayWise_collection(db);
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
	
    static async casesOverTime(db, id, id2) { //very rough but I based it off the skeleton design
        var day_get = id;
        return new Promise(async function (resolve, reject){
            /**
             * 
             */
        });
    };
}


module.exports = stats
