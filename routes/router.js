const express = require('express')
const router  = express.Router()

const model_controller = require("../controllers/controller.js")

router.get("/tweets/:term",model_controller.TweetCountByTerm)

router.get("/country/:country",model_controller.AllDate)

router.get("/date/:date",model_controller.CasesByDay)

//should make this one better by inputing the date and country instead date/country/:date
//AKA find a way to input two fields with one reroute.
//router.get("/country/date/:country",model_controller.DayandCountry)

router.get("/tweets/date/:date", model_controller.TweetsByDay)

router.get("/comare/:date",model_controller.dayCompare)



module.exports = router
