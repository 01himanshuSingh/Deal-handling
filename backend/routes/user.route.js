const mongoose = require('mongoose')
const express= require('express')
const { register, login, logout, dealhandletask,   sectioninchargetask, studentIdget, draAcademictask, deanAcademictask, alladmin, allStudent } = require('../controller/controller')

const router = express.Router()
router.post('/register', register)
router.post('/login',login)
router.get('/logout',logout) 
router.post('/dealhandletask',dealhandletask)
router.get('/student/:id',studentIdget)
router.post('/student/:id',sectioninchargetask)
router.post('/draacdemic/:id',draAcademictask)
router.post('/deanAcademictask/:id',deanAcademictask)
router.get('/getadmin',alladmin)
router.get('/allstudent', allStudent)
router.get('/',(req,res)=>{
    res.send('Welcome')
})
module.exports = router