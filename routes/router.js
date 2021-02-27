const express = require('express')
const router  = express.Router()

const model_controller = require("../controllers/controller.js")

router.get("/tweets/", model_controller.all)
router.get("/tweets/:id",model_controller.getOne)
router.get("/cases/:id", model_controller.casesByDay)

module.exports = router
