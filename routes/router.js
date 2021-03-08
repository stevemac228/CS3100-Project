const express = require('express')
const router  = express.Router()

const model_controller = require("../controllers/controller.js")
router.get("/tweets/:term",model_controller.getCountByTerm)
router.get("/tweets/date/:date",model_controller.getTweetsByDay)
router.get("/date/:date",model_controller.getByDay)
router.get("/country/:country",model_controller.getCountry)
router.get("/country/:country/:date",model_controller.getDayandCountry)
router.get("/date/:date/:field",model_controller.getInfoByDay)
module.exports = router
