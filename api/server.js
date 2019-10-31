const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const order = require('./models/order');
const API_PORT = 8080;
const app = express();
const User = require('./models/custumer');

//passport configuration 
const pass = require('passport');
app.use(pass.initialize());
const passport = require('./passport/passport');


const jwt = require('jsonwebtoken')
const router = express.Router();
app.use(cors());
const path = require('path');
const dbRoute = "mongodb://localhost:27017/burger-api";
const jwtSecret = require('./passport/jwtSecret');
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





//  sign up 

const bcrypt = require('bcryptjs');

router.post('/sign-up',
      (req, res, next) => {

            passport.authenticate('register',
                  (err, user, info) => {
                        if (err) {

                              // console.log(`amir error `);
                        }
                        if (info !== undefined) {
                              // console.error(info.message);
                              // console.log('[ amir is here right now ]') ; 
                              // res.status(403).json({
                              //       message: info.message , 
                              //       status: false
                              // });

                              return res.json({
                                    message: info.message,
                                    status: false
                              });
                        } else {

                              req.logIn(user, error => {
                                    if (error) {
                                          console.log(`[ Error in register costumer  :| ]`, error);
                                    }
                                    // console.log(`user created `)
                                    // console.log(user);

                                    res.status(200).json({
                                          message: 'user created',
                                          status: true,
                                    });

                              });
                        }
                  })(req, res, next);
      }
)

// log in
// sign in 
router.post('/log-In',
      (req, res, next) => {
            passport.authenticate('login',
                  (err, users, info) => {
                        if (err) {
                              console.error(`error In login `);
                        }
                        if (info !== undefined) {
                              console.error(`amir is here `);
                              console.error(info.message);
                              if (info.message === 'bad username') {
                                    // res.status(401).send(info.message);
                                    res.json({ status: false, message: info.message });
                              } else {
                                    // res.status(403).send(info.message);
                                    res.json({ status: false, message: info.message });
                              }
                        } else {
                              req.logIn(users, () => {
                                    User.findOne({ email: req.body.email })
                                          .then((user) => {
                                                const token = jwt.sign({ id: user.id },
                                                      jwtSecret.secret);
                                                console.log(`user founded successfully`);
                                                res.status(200).json({
                                                      status: true,
                                                      message: 'user found & logged in',
                                                      token: token,
                                                      email: user.email
                                                });
                                                // res.redirect(`/findUser/${req.body.email}`) ; 
                                          });
                              });
                        }
                  })(req, res, next);
      });







router.get('/findUser',
      (req, res, next) => {

            // console.log(`[test purposes]`, req.query);
            passport.authenticate('jwt',
                  { session: false },

                  (err, user, info) => {

                        if (err) {

                              console.error(err);
                        }
                        if (info !== undefined) {

                              console.log(info.message);
                              res.status(401).send(info.message);

                        }
                        else if (user.email === req.query.email) {

                              User.findOne({
                                    email: req.query.email
                              })
                                    .then((userInfo) => {

                                          if (userInfo != null) {
                                                // console.log('user found in db from findUsers');
                                                res.status(200).send({
                                                      auth: true,
                                                      user: userInfo,
                                                      message: " user founded and authenticated "
                                                });
                                          } else {
                                                // console.error('no user exists in db with that username');
                                                res.status(401).send(
                                                      {
                                                            message: 'no user exists in db with that username',
                                                            auth: false
                                                      }
                                                );
                                          }
                                    });
                        } else {
                              // console.error('jwt id and username do not match');
                              res.status(403).send('username and jwt token do not match');
                        }
                  })(req, res, next);
      });




// inintial ings 
router.get('/initIngs', async (req, res) => {

      const initIng = {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
      };
      res.json(initIng);
});


//  ordeer 

// change  
router.post('/orders', async (req, res) => {


      const fetchOrders = await order.find({ costumer: req.body.userId })
      res.json(fetchOrders);
});


router.post("/createOrder", async (req, res) => {

      try {

            const newOrder = new order({ ...req.body.data });
            const err = await newOrder.save();
            res.json(`[order saved successfully]`);

      } catch (error) {
            console.log(`we have some error dear developer ${error}`);
      }

});








app.use("/api", router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
