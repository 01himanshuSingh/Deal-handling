const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    universityRollno:{
        type:String,
        required:true
    },
    dealhandreview:{
                type:String,
       
    },
    sectionInchargereview :{
        type:String,
       
    },
    draAcademic:{
        type:String,
        
    },
    deanAcademic:{
        type:String,
        
    }
},{timestamps:true})
const Student = mongoose.model('Student', studentSchema)
module.exports = Student