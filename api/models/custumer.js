const mongoose = require('mongoose');
const schema = mongoose.Schema;
const jwt = require('jsonwebtoken');




const custumerModel = new schema({



    // address : {
    //     type : Object , required : true 
    // } , 
    email: {
        type: String, required: true, unique: true
    },

    password: {

        type: String, required: true, minlength: 5
    }
    ,
    tokens: [{
        access: {
            type: String, required: true
        },
        token: {
            type: String, required: true
        }
    }]


}); 

// custumerModel.methods.toJson = function () {

//     const custumer = this;
//     const custumerObj =   custumer.toObject() ;

//     const { email , _id} =  custumerObj    

//     return {email , _id } ; 
// }

custumerModel.methods.generateAuthToken = function () {

    const custumer = this;
    const access = "Auth";
    // change the secret key later  
    const token = jwt.sign({ _id: custumer._id, access }, "SecretKey").toString();

    custumer.tokens = custumer.tokens.concat([{
        access, token
    }]) ; 
    console.log(`hello this is test [development]  ==>  ` , custumer) ; 

  
    return new Promise(async( resolve ) => { 

        await custumer.save() ;
        resolve(token) ;
    }) ;


    // return custumer.save()
    //     .then(custumer => {
    //         return token;
    // }) ; 




}





module.exports = mongoose.model('custumers', custumerModel); 