const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors  = require('cors');
const order = require('./models/order');
//const logger = require("morgan") ;
const API_PORT = 3001;
const app = express();
const router = express.Router();
app.use(cors());
// this is our MongoDB database
const dbRoute = "mongodb://localhost:27017/burger-api";

// connects our back end code with the database
mongoose.Promise = global.Promise ;

mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;


db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(logger("dev"));

// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
  //
});

router.get('/orders' , async(req,res) => {

      console.log(`[in server ]`) ;
      const orders = await order.find({});
      res.json(orders);  

 }) ;



// this is our update method
// this method overwrites existing data in our database
router.post("/createOrder",async(req, res) => {
   
     
    
      const newOrder = new order({...req.body.order}) ;
      
       const err =await newOrder.save() ;
       
       res.json(`[order saved successfully]`);
      
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
    //
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
  

});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
