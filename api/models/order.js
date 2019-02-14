const mongoose = require('mongoose');
const schema  =mongoose.Schema ;

const orederModel = new schema({


    ingredeints : {
        type : Object  , required : true
    }
    ,
    price : {
        type : Number , required : true
    }
    ,

    name : {
        type : String , required: true 
    } , 

    email : {
        type :String  , required :true 
    }
     , 
    address : {
        type : String , required : true 
    }
   /* custumer : {
        type : schema.Types.ObjectId , ref : "custumers"
    }*/ 

}) ;

module.exports = mongoose.model('orders' , orederModel)
