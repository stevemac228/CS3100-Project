var assert = require('assert');
var myurl = 'http://localhost:3000';
const Model = require('../models/model');
const request = require('request');
const mongo = require('../utils/db');

before(async function() {
	try {
		db = await mongo.connectToDB();
	}catch(err){
		throw err;
	}
});

after(async function() {
    try{
        mongo.closeDBConnection();
    }catch(err){
        throw err;
    }
});


describe('Testing the API', async function(){
    describe('Testing- Simple cases', function(){

        it('Fail 1', function(){

        });
        it('Fail 2', async function(){

        });
        it('Fail 3', async function(){

        });
        it('Fail 4', async function(){

        });
        it('Fail 5', async function(){

        });
        it('Success 1', async function(){
            objs = Model.getTweetCountByTerm('coronavirus');
            objs.then(function(result){
                assert.strictEqual(result[0].counts == '5131363', true);
            })
        });
        it('Success 2', async function(){
            objs = Model.getDay('2020-02-10');
            objs.then(function(result){
                assert.strictEqual(result[0].Confirmed == '42633', true);
            })
        });
        it('Success 3', async function(){
            objs = Model.getDayandCountry('2020-01-22','Angola');
            objs.then(function(result){
                assert.strictEqual(result.Confirmed == '0', true);
            })
        });
        it('Success 4', async function(){
            objs = Model.getCountry('USA');
            objs.then(function(result){
                assert.strictEqual(result[0].TotalCases  == '5032179', true);
            })
        });
        it('Success 5', async function(){
            objs = Model.getTweetsByDay('2020-1-26');
            objs.then(function(result){
                assert.strictEqual(result[0].tweet_id  == '2008', true);
            })
        });
    });
    describe('Testing the API - Complex Cases', function(){
        it('Success 1: Compare the amount of tweets on a day to the amount of covid cases.', function(){
            let date  = '2020-03-21';
            request.post({
                headers: {'content-type': 'application/json'},
                url:     myurl+'/date/:date',
                body:    JSON.stringify(date)    
            }, function(error, response, body){
                //console.log(body);
                    if (body.length < 2 ) {
                        assert.fail('There should be a tweet and a covid informatino object.');
                    }
                });
            });
        });
        it('Success 2', function(){

        });
        it('Success 3', function(){

        });
        it('Success 4', function(){
  
        });
        it('Success 5', function(){

        });
    });
;
