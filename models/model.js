/* General notes
1. For our more complex functions such as "getCaseByDay" we might want to consider having case, death, recovery or so on be a varaible in it
	and just have the function be a "getByDay" to reduce the amount of coding overall.
2. I didn't know if anybody had plans so I didn't want to mess around with the skeleton too much until I get the okay.
3. Consider ways to minimize connecting to the collection.
4. I don't understand what "var id_get = id;" does and why id is a variable in the method besides.
*/

async function _get_bigrams_collection (db){
    try{
		return await db.collection('bigrams');
	}catch(err){
		throw err;
	}    
};

async function _get_trigrams_collection (db){
    try{
		return await db.collection('trigrmas');
	}catch(err){
		throw err;
	}    
};

async function _get_tweets_collection (db){
    try{
		return await db.collection('tweets');
	}catch(err){
		throw err;
	}    
};

async function _get_terms_collection (db){
    try{
		return await db.collection('terms');
	}catch(err){
		throw err;
	}    
};


class stats {
    static async getTermById(db, id) {
        var id_get = id;
        return new Promise(async function (resolve, reject){
            /**
             * 
             */
        });
    };

    static async getAllTerm(db) {
        return new Promise(async function (resolve, reject){
            /**
             * 
             */
        });
    };

    static async getCasesByDay(db, id) {
        var day_get = id;
        return new Promise(async function (resolve, reject){
            /**
             * 
             */
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
