const mongoose = require('mongoose')
const donorSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    firstName: {type:String,require:true},
    lastName:{type:String,require:true},
    motherName:{type:String,require:true},
    fatherName:{type:String,require:true},
    mobNum:{type:String,require:true},
    address : {type: String,require:true},
    gender:{type:String,require:true},
    bloodGroup:{type:String,require:true},
    district:{type:String,require:true},
    dob:{type:String,require:true},
    pincode:{type:Number,require:true}
});
module.exports = mongoose.model('donor',donorSchema)