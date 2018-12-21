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

    custumer : {
        type : schema.Types.ObjectId , ref : "custumers"
    }

}) ;

module.exports = mongoose.model('orders' , orederModel)
