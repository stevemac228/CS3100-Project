var assert = require('assert');
var myurl = 'http://localhost:3000';
const Model = require('../models/model');
const request = require('request');
const mongo = require('../utils/db');
const { response } = require('express');

var db;
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

        it('Fail 1: Lookup term not in Database', function(){
            objs = Model.getCountByTerm(db,'CS3100');
            objs.then(function(result){
                assert.strictEqual(result, 'There are no tweets containing CS3100');
            })
        });
        it('Fail 2: Lookup date not in Database', async function(){
            objs = Model.getTweetsByDay(db,'2020-5-31');
            objs.then(function(result){
                assert.strictEqual(result, 'There are no tweets found for 2020-5-31');
            })
        });
        it('Fail 3: Lookup from invalid date format', async function(){
            objs = Model.getByDay(db,'10-02-2020');
            objs.then(function(result){
                assert.strictEqual(result, 'There are no documented cases for 10-02-2020');
            })
        });
        it('Fail 4: Lookup from invalid country', async function(){
            objs = Model.getCountry(db,'The States');
            objs.then(function(result){
                assert.strictEqual(result == '5032179','There are no documented cases for The States');
            })
        });
        it('Fail 5: Input Date and Country in wrong order', async function(){
            objs = Model.getDayandCountry(db,'Angola','2020-01-22');
            objs.then(function(result){
                assert.strictEqual(result.Confirmed == '0', 'There are no documented cases for 2020-01-22 on Angola');
            })
        });

        it('Success 1: Get count of term "coronavirus" from Twitter', async function(){
            objs = Model.getCountByTerm(db,'coronavirus');
            objs.then(function(result){
                assert.strictEqual(result[0].counts == '5131363', true);
            })
        });
        it('Success 2: Get the amount of tweets on 2020-1-26', async function(){
            objs = Model.getTweetsByDay(db,'2020-1-26');
            objs.then(function(result){
                assert.strictEqual(result[0].tweet_id  == '2008', true);
            })
        });
        it('Success 3: Get all information for 2020-02-10', async function(){
            objs = Model.getByDay(db,'2020-02-10');
            objs.then(function(result){
                assert.strictEqual(result[0].Confirmed == '42633', true);
            })
        });
        it('Success 4: Get all information for USA', async function(){
            objs = Model.getCountry(db,'USA');
            objs.then(function(result){
                assert.strictEqual(result[0].TotalCases  == '5032179', true);
            })
        });
        it('Success 5: Get all information for Angola on 2020-01-22', async function(){
            objs = Model.getDayandCountry(db,'2020-01-22','Angola');
            objs.then(function(result){
                assert.strictEqual(result.Confirmed == '0', true);
            })
        });

        it('Success 6: Get the amount of cases over time for 2 days', async function(){
            objs = Model.getCasesOverTime(db,'2020-01-22','2020-01-30','Confirmed');
            objs.then(function(result){
                assert.strictEqual(result == 28607, true);
            })
        });
    });
    describe('Testing the API - Complex Cases', function(){
        it('Success 1: Get the count of term "trump" from Twitter', function(){
            var data = "trump";
            request.get({
                headers: {'content-type': 'application/json'},
                url:     myurl+'/tweets/'+ data,
            }, function(error,response,body){
                objs = JSON.parse(body);
                assert.strictEqual(objs[0].counts,'254693');
            });
        });
        it('Success 2: Get the amount of tweets from 2020-01-22', function(){
            var data = '2020-1-22';
            request.get({
                headers: {'content-type': 'application/json'},
                url:     myurl+'/tweets/date/'+ data,
            }, function(error,response,body){
                objs = JSON.parse(body);
                assert.strictEqual(objs[0].tweetAmount,'895');
            });
        });
        it('Success 3: Get all information from 2020-02-05', function(){
            var data = '2020-02-05';
            request.get({
                headers: {'content-type': 'application/json'},
                url:     myurl+'/date/'+ data,
            }, function(error,response,body){
                objs = JSON.parse(body);
                assert.strictEqual(objs[0].Active,'26008');
            });
        });
        it('Success 4: Get all information for Canada', function(){
            var data = "Canada";
            request.get({
                headers: {'content-type': 'application/json'},
                url:     myurl+'/country/'+ data,
            }, function(error,response,body){
                objs = JSON.parse(body);
                assert.strictEqual(objs[0].TotalDeaths,'8966');
            });
        });
        it('Success 5: Get all information for Australia on 2020-02-17', function(){
            var data = "Australia";
            var data2 = "2020-02-17";
            request.get({
                headers: {'content-type': 'application/json'},
                url:     myurl+'/country/'+ data + '/' + data2,
            }, function(error,response,body){
                objs = JSON.parse(body);
                assert.strictEqual(objs[0].Recovered,'10');
            });
        });
        it('Success 6: Get only the Deaths on 2020-02-08 ', function(){
            var data = "2020-02-08";
            var data2 = "Deaths";
            request.get({
                headers: {'content-type': 'application/json'},
                url:     myurl+'/date/'+ data + '/' + data2,
            }, function(error,response,body){
                objs = JSON.parse(body);
                assert.strictEqual(objs.Deaths,'806');
            });
        });
        it('Success 6: Get only the Active cases on 2020-03-11 ', function(){
            var data = "2020-03-11";
            var data2 = "Active";
            request.get({
                headers: {'content-type': 'application/json'},
                url:     myurl+'/date/'+ data + '/' + data2,
            }, function(error,response,body){
                objs = JSON.parse(body);
                assert.strictEqual(objs.Active,'56136');
            });
        });
    });
});
