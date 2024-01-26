var User = require('../models/user.js');
var messages = require('../config/messages');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var moment = require('moment');
let ObjectId = require('mongodb').ObjectID;
exports.setUser = async (req, res) =>{
  console.log(req.body);
  let {
    first_name,last_name,profile_pic,email,password,cpassword,mobile,gender,dob,status,fb_id,google_id,last_login,address,language,street,city,state,country,zip,phone_no,created_by
} = req.body
    if (!first_name || !last_name || !password || !cpassword) {
      return res.send({ success: false, message: messages.REQUIRED});
    }
    try {
    let users = await new User(req.body);
  return res.send({ success: true,mm:"dd", data: req.body});
      
    } catch (error) {
      return res.send({ success: true,error, message: messages.ERROR});
    }
  };