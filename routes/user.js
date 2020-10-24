//routes middleware for user
const express = require('express')
const router = express.Router()

const {sayHi} = require('../controllers/user');//invoking function from controller
router.get('/', sayHi);

module.exports = router;//export it as router

