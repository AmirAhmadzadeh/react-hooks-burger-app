const mongoose = require('mongoose');
const schema = mongoose.Schema;




const custumerModel = new schema({

    email: {
        type: String,
        required: true , 
         unique: true
    },

    password: {

        type: String,
        required: true  ,  
        minlength: 5
    }



});





module.exports = mongoose.model('custumers', custumerModel); 