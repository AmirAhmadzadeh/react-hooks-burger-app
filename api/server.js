const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const order = require('./models/order');
//const logger = require("morgan") ;
const API_PORT = 3001;
const app = express();
const router = express.Router();
app.use(cors());



const dbRoute = "mongodb://localhost:27017/burger-api";

mongoose.Promise = global.Promise;

mongoose.connect(
      dbRoute,
      { useNewUrlParser: true }
);

let db = mongoose.connection;


db.once("open", () => console.log("connected to the database"));

db.on("error", console.error.bind(console, "MongoDB connection error:"));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



const path = require('path');

/*
router.get('*', (req, res) => {
      console.log(path.join(__dirname, "client" , "build"))
      res.sendFile(path.join(__dirname, "client" , "build" , "index.html")) ;
}); */

router.get('/orders', async (req, res) => {

      const orders = await order.find({});


      const ordersFetched = orders.filter((elm) => {
            return elm._id != "5c4873331f8aa6d1b0461742";
      })

      res.json(ordersFetched);

});

router.get('/initIngs', async (req, res) => {


      const initIng = await order.findById("5c4873331f8aa6d1b0461742");
      res.json(initIng);
});


router.post("/createOrder", async (req, res) => {


      try {

            console.log(`[hello it works  :) ]`, req.body.data);
            const newOrder = new order({ ...req.body.data });
            console.log(`new order is []  :`, newOrder);
            const err = await newOrder.save();
            res.json(`[order saved successfully]`);

      } catch (error) {

            console.log(`we have some error dear developer ${error}`);
      }

});

router.delete("/deleteData", (req, res) => {
      //
});

router.post("/putData", (req, res) => {



});


const Custumer = require('./models/custumer');

//  sign up 


router.post('/sign-up', async (req, res) => {

      const { password, email } = req.body;

      const newCustumer = new Custumer({
            password, email
      });


      newCustumer.save()
            .then(async custumer => {

                  const token = await newCustumer.generateAuthToken();
                  // console.log(`[test the token] ==> `, token);
                  const { email , _id } = custumer ;
                  res.header('x-auth' , token).json({ email , _id }) ;
            })
            .catch(err => {
                   console.log(`seems to have some errors dear amir` , err);     
            })



});


// app.post('/sign-in') ;






app.use("/api", router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
