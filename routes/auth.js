const express = require ('express')
const router =express.Router()
const userControl = require ('../controlers/auth')
router.post('/register',userControl.signup);
router.post('/login',userControl.login);
module.exports = router;
