
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
}


module.exports = stats