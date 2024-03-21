const express = require('express')
const router = express.Router()

const authControllers = require('../controllers/auth-controller') 

router.get('/',authControllers.homeGet)

router.route('/register').post(authControllers.registrationPost)

router.route('/login').get(authControllers.loginGet).post(authControllers.loginPost)

module.exports = router