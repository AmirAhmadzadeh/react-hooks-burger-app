const mongoose = require('mongoose');
const schema  =mongoose.Schema ;

const  custumerModel = new schema({


        name : {
            type : String , require : true
        } , 
        
        address : {
            type : Object , required : true 
        } ,

        email: {
             type: String   , required: true 
        }

}) ;

mongoose.model('orders' , custumerModel)