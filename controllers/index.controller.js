var messages = require("../config/messages");
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
var config = require('../config/config');
var jwt = require('jsonwebtoken');
var jwt_decode = require('jwt-decode');
var atob = require('atob');
var moment = require('moment');
var request = require('request');
let csc = require('country-state-city').default;

var User = require('../model/user.js');
var AllCategory = require("../model/AllCategory.js");
var I_am_buyer = require("../model/i_am_buyer.js");
var News_subcribe_user = require("../model/news_subscribe_user");
var User_show_property_interest = require("../model/user_show_property_interest");
var Upload_category_photos = require('../model/upload_category_photos');
var Chat_ID = require('../model/chat_id');
var Users_chat = require('../model/chats_user.js');
var Post_media = require('../model/post_media.js');
var getNewBuyerID;
var getNewPostMediaId;
var Buyer_post_like_comment = require('../model/buyer_post_like_comment.js');
var Banner_ad = require('../model/banner_ad');
var Poster_ad = require('../model/poster_ad');
var Poster_ad_group_data = require('../model/poster_ad_group_data');
var Sidebar_ad = require('../model/sidebar_ad');
var Ad_Text = require('../model/Ad_Text');
var Vendors_Page_Listing = require('../model/vendor_resource_ad');
var Vendor_type = require('../model/vendor_type');
var User_membership = require('../model/user_membership');
var Book_post_invitation = require('../model/book_post_invitation');
var Book_post_request = require('../model/book_post_request');
// WePo Models
var WePo_property_type = require('../model/wePo/wePo_property_type');
var WePo_posting = require('../model/wePo/wePo_posting');
// Wecon@9876 relator
// property type listing
var Health_care_listing_sale = require('../model/wePo/health_care_listing_sale');
var Hospitality_listing_sale = require('../model/wePo/hospitility_listing_sale');
var Industrial_listing_sale = require('../model/wePo/industrial_listing_sale');
var Land_listing_sale = require('../model/wePo/land_listing_sale');
var Multifamily_listing_sale = require('../model/wePo/multifamily_listing_sale');
var Office_listing_sale = require('../model/wePo/office_listing_sale');
var Residential_listing_sale = require('../model/wePo/residential_listing_sale');
var restaurant_listing_sale = require('../model/wePo/restaurant_listing_sale');
var Retail_listing_sale = require('../model/wePo/retail_listing_sale');
var Shopping_listing_sale = require('../model/wePo/shopping_listing_sale');
var Specaility_listing_sale = require('../model/wePo/speciality_listing_sale');
var Sport_listing_sale = require('../model/wePo/sport_listing_sale');

var Yachts_sale = require('../model/wePo/yachts_sale');
var Real_estate_sale = require('../model/wePo/real_estate_sale');
var Aircraft_sale = require('../model/wePo/aircrafts_sale');
var CrowdFunding_sale = require('../model/wePo/crowdFunding');
var Crypto_asset = require('../model/wePo/Crypto_asset');
var Horses_livestock = require('../model/wePo/Horses_livestock');
var Cars_and_rv_sale = require('../model/wePo/Cars_and_rv_sale');
var Artwork_sale = require('../model/wePo/Artwork_sale');
var Business_sale = require('../model/wePo/business_sale');
var country = require('../model/Region/country');
var state = require('../model/Region/state');
var city = require('../model/Region/city');
var WePo_sub_property_type = require('../model/wePo/wePo_sub_property_type');
var Pbms = require('../model/pbms')
var {
    callbackPromise
} = require("nodemailer/lib/shared");
var {
    forEach
} = require("lodash");
var sport_listing_sale = require("../model/wePo/sport_listing_sale");
var yachts_sale = require("../model/wePo/yachts_sale");
var crowdFunding = require("../model/wePo/crowdFunding");
var Book_pbms_property = require('../model/book_pbms_property');
var Renting_pbms_property = require('../model/renting_pbms_property');
var Chartering_pbms_property = require('../model/chartering_pbms_property');
var Managing_cashflows_pbms_property = require('../model/managing_cashflows_pbms_property copy');
var User_show_interest_fractional_listing = require('../model/user_show_interest_fractional_listing');
const Wcx_rewards_tokens_history = require('../model/wcx_rewards_tokens_history');
const User_claim_key_history = require('../model/user_claim_key_history');
const Request_for_cohorts = require('../model/request_for_cohorts');
const User_cohorts = require('../model/user_cohorts');
const {
    Translate
} = require('@google-cloud/translate').v2;
// var {
//   response
// } = require("express");
/**
 * @project_name Wecoown project
 * @description This are all API's for Wecoown project
 * @author Karishma Soni
 * @version 1.0
 */

//localstorage for token
const LocalStorage = require('node-localstorage').LocalStorage;
const chartering_pbms_property = require("../model/chartering_pbms_property");
if (typeof localStorage === "undefined" || localStorage === null) {
    localStorage = new LocalStorage('./scratch');
}

exports.setUser = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body)
    if (!req.body.firstname || req.body.firstname == "") {
        return res.send({
            success: false,
            message: "Please enter first name."
        });
    }
    if (!req.body.lastname || req.body.lastname == "") {
        return res.send({
            success: false,
            message: "Please enter last name."
        });
    }
    if (!req.body.username || req.body.username == "") {
        return res.send({
            success: false,
            message: "Please enter username."
        });
    }
    if (req.body.username.length < 4) {
        return res.send({
            success: false,
            message: messages.USERNAME_4DIGIT
        });
    }
    if (!req.body.created_by || req.body.created_by == "") {
        return res.send({
            success: false,
            message: "Please enter website name."
        });
    }
    var userCheck = await User.findOne({
        'username': req.body.username
    });
    var roleNew = req.body.role;
    //console.log("usercheck : ", userCheck);
    if (userCheck != null) {
        var rolePre = userCheck.role
        if (userCheck.username === req.body.username) {
            if (req.body.created_by === userCheck.created_by) {
                return res.send({
                    success: false,
                    message: messages.ALREADY_USERNAME_EXIST
                });
            } else {
                var checkPara = "";
                if (req.body.created_by === 'WeCoOwn') {
                    checkPara = "1"
                } else if (req.body.created_by === 'WePropertyowners') {
                    checkPara = '2'
                }
                for (let i = 0; i < rolePre.length; i++) {
                    if (rolePre[i] === checkPara) {
                        return res.send({
                            code: 800,
                            success: true,
                            message: "You are already register at " + userCheck.created_by + ". Please go to login page and login with your same " + userCheck.created_by + " login credentials.",
                        });
                    }
                }
                return res.send({
                    code: 900,
                    success: true,
                    username: userCheck.username,
                    message: "You are already register at " + userCheck.created_by + ". Do you want to register as " + req.body.created_by + " too?"
                });
            }
        }
    }

    if (!req.body.email || req.body.email == "") {
        return res.send({
            success: false,
            message: "Please enter email address."
        });
    }
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!regex.test(req.body.email)) {
        return res.send({
            success: false,
            message: "Please enter valid email address."
        });
    }
    let emailCheck = await User.findOne({
        'email': req.body.email
    });
    //console.log("emailCheck : ", emailCheck);
    if (emailCheck != null) {
        if (emailCheck.email === req.body.email) {
            return res.send({
                success: false,
                message: messages.ALREADY_EMAIL_EXIST
            });
        }
    }
    if (!req.body.password || req.body.password == "") {
        return res.send({
            success: false,
            message: "Please enter password."
        });
    }
    if (req.body.password.length < 6) {
        return res.send({
            success: false,
            message: messages.PASSWORD_6DIGIT
        });
    }
    if (!req.body.confirm_password || req.body.confirm_password == "") {
        return res.send({
            success: false,
            message: "Please enter confirm password."
        });
    }
    if (req.body.password != req.body.confirm_password) {
        return res.send({
            success: false,
            message: messages.MISS_MATCH_PASSWORD
        });
    }
    //console.log("hereeeeeeeeeee");
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        // set default  is admin false
        req.body.is_admin = false;
        req.body.claim_key = guidGenerator();
        //console.log("Password:-----: ", req.body.password);
        let userData = new User(req.body).save();
        if (!userData) {
            return res.send({
                success: false,
                message: "Error in registration"
            });
        }
        if (req.body.created_by === 'WeCoOwn') {
            /**node mailer code*/
            let employeeEmail = req.body.email;
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                type: "SMTP",
                host: "smtp.gmail.com",
                secure: true,
                auth: {
                    user: 'wecoowntest@gmail.com',
                    pass: 'wecon123'
                }
            });

            let urlMerge = 'https://wecoown.com/verifyEmailLink?tokenVerify=' + req.body.username;
            // let urlMerge = req.protocol + '://'+ req.get('host') + '/verifyEmailLink?tokenVerify=' + req.body.username;
            // let logoImageUrl = 
            //console.log("uerl mergerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr : ", urlMerge);
            var mailOptions = {
                from: 'WeCoOwn <wecoowntest@gmail.com>',
                to: 'karishmasoni396@gmail.com,' + employeeEmail + '',
                subject: 'WeCoOwn',
                html: `<!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <style>
                            *{
                                box-sizing: border-box;
                            }            
                            body {
                                font-family: Arial, Helvetica, sans-serif;
                            }            
                            /* Style the header */
                            header,footer{
                                background-color: #0b3655;
                                padding: 10px;
                                text-align: center;
                                color: white;
                            }
                        </style>
                    </head>
                    <body>
                        <header>
                            <h3 style="margin: 0px;">WeCoOwn</h3>
                        </header>            
                        <section style="background: #f1f1f178;padding-bottom: 10px;">  
                            <div style="text-align:center;">
                                <a href="https://wecoown.com/" onclick="window.open(this.href,this.href); return false"><img src="https://wecoown.com/assets/images/Original-1.png" width="110px" style="margin-top: 20px;"></a>
                                <p style="padding: 15px 15%;margin: 0;font-weight: 600;font-style: italic;">Community Platform | Finding Potential Co-Owners | Buy and Manage Assets or Properties Together</p>
                                <div style="margin: 0px 20%;background: orange;padding: 10px;color: white;">
                                    <h3>Hi, &nbsp;` + req.body.username + `</h3>
                                    <p>Thanks for getting started with WeCoOwn!<br> We need a little more information to complete your registration, including confirmation of your email address. Click below to confirm your email address : 
                                        <a href="` + urlMerge + `"><i><strong>` + urlMerge + `</strong></i></a>.
                                    </p>
                                    <p>If you have problems, please paste the above URL into your web browser.</p>
                                    <p>If you received this email by mistake, simply delete it.</p>                                    
                                    <p>Thanks,</p>
                                    <p>WeCoOwn Support<p>
                                    <br>
                                </div>
                            </div>                
                        </section>
                        <footer>
                            <div>
                                <a href="https://www.facebook.com/wecoown" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-fb-icon.jpg">
                                </a>                    
                                <a href="https://www.instagram.com/wecoown/" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-insta-icon.jpg">
                                </a>
                                <a href="https://www.linkedin.com/company/wecoown/" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-linkedin-icon.jpg">
                                </a>
                                <a href="https://twitter.com/WeCoOwn" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-twitter-icon.jpg" style="margin-left: -3px;">
                                </a>
                                <a href="https://www.youtube.com/channel/UCOwKKGKaK2DWkiZJi9-CfQA" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-youtube-icon.jpg">
                                </a>
                                <a href="https://medium.com/wecoown" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-medium-icon.jpg" style="margin-bottom: 4px; margin-left: -5px; height: 45;">
                                </a>
                                <br>
                                <a href="https://wecoown.com/terms-conditions" style="color: white;" onclick="window.open(this.href,this.href); return false">Terms & Conditions</a> |
                                <a href="https://wecoown.com/privacy-policy" style="color: white;" onclick="window.open(this.href,this.href); return false">Privacy Policy</a><br>
                                <p>© 2020 WeCoOwn, Inc. All rights reserved.</p>
                            </div>
                        </footer>
                    </body>
                </html>`
                // html: '<div style="background-color:#f6f8f1;padding:15px;font-size: 18px;font-family: sans-serif; ">' +
                //     '<div style="background-color:white;padding:20px;margin:10px;">' +
                //     '<h3>Hi, &nbsp;' + req.body.username + '</h3><br>' +
                //     '<p>Thanks for getting started with WeCoOwn!<br> We need a little more information to complete your registration, including confirmation of your email address. Click below to confirm your email address : <a href="' + urlMerge + '"><i><strong>' + urlMerge + '</strong></i></a>.</p> ' +
                //     ' <p>If you have problems, please paste the above URL into your web browser.</p>' +
                //     ' <br>' +
                //     '<p>Thanks,</p>' +
                //     ' <p>WeCoOwn Support<p>' +
                //     '<br>' +
                //     '</div>' +
                //     ' </div>'

                // html: `<!DOCTYPE html>
                // <html lang="en">
                // <head>
                // <meta charset="utf-8">
                // <meta name="viewport" content="width=device-width, initial-scale=1">
                // <style>
                // * {
                //   box-sizing: border-box;
                // }

                // body {
                //   font-family: Arial, Helvetica, sans-serif;
                // }

                // /* Style the header */
                // header,footer{
                //   background-color: #0b3655;
                //   padding: 10px;
                //   text-align: center;
                //   color: white;
                // }
                // </style>
                // </head>
                // <body>
                // <header>
                // <h3 style="margin: 0px;">WeCoOwn</h3>
                // </header>

                // <section style="background: #f1f1f178;padding-bottom: 10px;">  
                //     <div style="text-align:center;">
                //     <a href="https://wecoown.com/" onclick="window.open(this.href,this.href); return false"><img src="https://wecoown.com/assets/images/Original-1.png" width="110px" style="margin-top: 20px;"></a>
                //      <p style="padding: 15px 15%;margin: 0;font-weight: 600;font-style: italic;">Community Platform | Finding Potential Co-Owners | Buy and Manage Assets or Properties Together</p>

                //   <div style="
                //     margin: 0px 20%;
                //     background: orange;
                //     padding: 10px;
                //     color: white;
                // ">
                //           <h3>Hi, &nbsp;` + req.body.username + `</h3><p>Thanks for getting started with WeCoOwn!
                //           <br> We need a little more information to complete your registration, including confirmation of your email address. Click below to confirm your email address : <a href="` + urlMerge + `"><i><strong>` + urlMerge + `</strong></i></a>.</p>
                //           <p>If you have problems, please paste the above URL into your web browser.</p>
                //                      <br>
                //                   <p>Thanks,</p>
                //        <p>WeCoOwn Support<p>
                //            <br>
                //                  </div>
                //                    </div>                
                // </section>
                // <footer>
                //     <div>
                //            <a href="https://www.facebook.com/wecoown" onclick="window.open(this.href,this.href); return false">
                //           <img src="https://wecoown.com/assets/images/email-fb-icon.jpg">
                //         </a>
                //         <!-- <a>
                //           <span class="fa fa-google-plus"></span>
                //         </a> -->
                //         <a href="https://www.instagram.com/wecoown/" onclick="window.open(this.href,this.href); return false">
                //            <img src="https://wecoown.com/assets/images/email-insta-icon.jpg">
                //         </a>
                //         <a href="https://www.linkedin.com/company/wecoown/" onclick="window.open(this.href,this.href); return false">
                //         <img src="https://wecoown.com/assets/images/email-linkedin-icon.jpg">
                //         </a>
                //         <a href="https://twitter.com/WeCoOwn" onclick="window.open(this.href,this.href); return false">
                //           <img src="https://wecoown.com/assets/images/email-twitter-icon.jpg" style="
                //     margin-left: -3px;
                // ">
                //         </a>
                //         <a href="https://www.youtube.com/channel/UCOwKKGKaK2DWkiZJi9-CfQA" onclick="window.open(this.href,this.href); return false">
                //           <img src="https://wecoown.com/assets/images/email-youtube-icon.jpg">
                //         </a>
                //         <a href="https://medium.com/wecoown" onclick="window.open(this.href,this.href); return false">
                //          <img src="https://wecoown.com/assets/images/email-medium-icon.jpg" style="
                //     margin-bottom: 4px;
                //     margin-left: -5px;
                //     height: 45;
                // ">
                //         </a>
                //         <br>
                //         <a href="https://wecoown.com/terms-conditions" style="
                //     color: white;
                // " onclick="window.open(this.href,this.href); return false">Terms & Conditions</a> |
                //               <a href="https://wecoown.com/privacy-policy" style="
                //     color: white;
                // " onclick="window.open(this.href,this.href); return false">Privacy Policy</a><br>
                // <p>© 2020 WeCoOwn, Inc. All rights reserved.</p>
                //     </div>
                // </footer>

                // </body>
                // </html>
                // `
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    //console.log(error);
                } else {
                    //console.log('New User Registration Email sent');
                }
            });
        } else if (req.body.created_by === 'WePropertyowners') {
            /**node mailer code*/
            console.log("wepo mail : ");
            let employeeEmail = req.body.email;
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                type: "SMTP",
                host: "smtp.gmail.com",
                secure: true,
                auth: {
                    user: 'wepropertyowner@gmail.com',
                    pass: 'wepo9876'
                }
            });

            let urlMerge = 'https://wepropertyowners.com/verifyEmailLink?tokenVerify=' + req.body.username;
            // let urlMerge = req.protocol + '://'+ req.get('host') + '/verifyEmailLink?tokenVerify=' + req.body.username;
            // let logoImageUrl = 
            //console.log("uerl mergerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr : ", urlMerge);
            var mailOptions = {
                from: 'WePropertyowners <wepropertyowner@gmail.com>',
                to: 'karishmasoni396@gmail.com,' + employeeEmail + '',
                subject: 'WePropertyowners',
                html: `<!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <style>
                            *{
                                box-sizing: border-box;
                            }            
                            body {
                                font-family: Arial, Helvetica, sans-serif;
                            }            
                            /* Style the header */
                            header,footer{
                                background-color: #0b3655;
                                padding: 10px;
                                text-align: center;
                                color: white;
                            }
                        </style>
                    </head>
                    <body>
                        <header>
                            <h3 style="margin: 0px;">WePropertyowners</h3>
                        </header>            
                        <section style="background: #f1f1f178;padding-bottom: 10px;">  
                            <div style="text-align:center;">
                                <a href="http://wepropertyowners.com/" onclick="window.open(this.href,this.href); return false"><img src="http://wepropertyowners.com/assets/images/Trans-1.png" width="110px" style="margin-top: 20px;"></a>
                                <p style="padding: 15px 15%;margin: 0;font-weight: 600;font-style: italic;">Sale and lease listings platform for properties and assets</p>
                                <div style="margin: 0px 20%;background: orange;padding: 10px;color: white;">   
                                    <h3>Hi, &nbsp;` + req.body.username + `</h3>
                                    <p>Thanks for getting started with WePropertyowners!<br> We need a little more information to complete your registration, including confirmation of your email address. Click below to confirm your email address : 
                                        <a href="` + urlMerge + `"><i><strong>` + urlMerge + `</strong></i></a>.</p>
                                    <p>If you have problems, please paste the above URL into your web browser.</p>                                 
                                    <p>If you received this email by mistake, simply delete it.</p>                             
                                    <p>Thanks,</p>
                                    <p>WePropertyowners Support<p>
                                    <br>
                                </div>
                            </div>                
                        </section>
                        <footer>
                            <div>
                                <a href="https://www.facebook.com/WePropertyOwners/" onclick="window.open(this.href,this.href); return false">
                                    <img src="http://wepropertyowners.com/assets/images/email-fb-icon.jpg">
                                </a>                    
                                <a href="https://www.instagram.com/wepropertyowners/" onclick="window.open(this.href,this.href); return false">
                                    <img src="http://wepropertyowners.com/assets/images/email-insta-icon.jpg">
                                </a>
                                <a href="https://www.linkedin.com/company/wepropertyowners" onclick="window.open(this.href,this.href); return false">
                                    <img src="http://wepropertyowners.com/assets/images/email-linkedin-icon.jpg">
                                </a>
                                <a href="https://twitter.com/WePropOwners?s=09" onclick="window.open(this.href,this.href); return false">
                                    <img src="http://wepropertyowners.com/assets/images/email-twitter-icon.jpg" style="margin-left: -3px;">
                                </a>
                                <a href="https://www.youtube.com/channel/UCOwKKGKaK2DWkiZJi9-CfQA" onclick="window.open(this.href,this.href); return false">
                                    <img src="http://wepropertyowners.com/assets/images/email-youtube-icon.jpg">
                                </a>
                                <a href="https://medium.com/wecoown" onclick="window.open(this.href,this.href); return false">
                                    <img src="http://wepropertyowners.com/assets/images/email-medium-icon.jpg" style="margin-bottom: 4px; margin-left: -5px; height: 45;">
                                </a>
                                <br>
                                <a href="http://wepropertyowners.com/terms-conditions" style="color: white;" onclick="window.open(this.href,this.href); return false">Terms & Conditions</a> |
                                <a href="http://wepropertyowners.com/privacy-policy" style="color: white;" onclick="window.open(this.href,this.href); return false">Privacy Policy</a><br>
                                <p>© 2020 WeCoOwn, Inc. All rights reserved.</p>
                            </div>
                        </footer>
                    </body>
                </html>`
                // html: '<div style="background-color:#f6f8f1;padding:15px;font-size: 18px;font-family: sans-serif; ">' +
                //     '<div style="background-color:white;padding:20px;margin:10px;">' +
                //     '<h3>Hi, &nbsp;' + req.body.username + '</h3><br>' +
                //     '<p>Thanks for getting started with WePropertyowners!<br> We need a little more information to complete your registration, including confirmation of your email address. Click below to confirm your email address : <a href="' + urlMerge + '"><i><strong>' + urlMerge + '</strong></i></a>.</p> ' +
                //     ' <p>If you have problems, please paste the above URL into your web browser.</p>' +
                //     ' <br>' +
                //     '<p>Thanks,</p>' +
                //     ' <p>WePropertyowners Support<p>' +
                //     '<br>' +
                //     '</div>' +
                //     ' </div>'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log("Wepo email : ",error);
                } else {
                    console.log('New User wepo Registration Email sent');
                }
            });
        }
        var getIambuyer = await I_am_buyer.findById(req.body.i_am_buyer_id);
        // //console.log("getIambuyerrrrrrrrrrr", getIambuyer)
        if (getIambuyer) {
            var getUserId = await User.findOne({
                username: req.body.username
            });
            //console.log("getUserIdgetUserIdgetUserId checkkkkk", getUserId);
            //console.log("getUserIdgetUserIdgetUserId checkkkkk", getUserId[0]);
            updateDataBuyer = {
                user_id: getUserId._id
            }
            var updateData = await I_am_buyer.findByIdAndUpdate(req.body.i_am_buyer_id, updateDataBuyer);
            // for update user id in post media table
            var updateVendorData = await Post_media.updateMany({
                post_id: req.body.i_am_buyer_id
            }, {
                $set: {
                    user_id: getUserId._id
                }
            });
            //console.log("updateDataupdateData", updateData);
            if (!updateData && !updateVendorData) {
                return res.send({
                    success: false,
                    message: "I am buyer data not updated"
                });
            }
            // update wcx reward token by add 2000    
            // let updateWcxTokenIncrementBody = {
            //     $inc: {
            //         wcx_rewards_tokens: 2000
            //     }
            // }
            // let updateWcxToeknData = await User.findByIdAndUpdate(getUserId._id, updateWcxTokenIncrementBody);
            // //console.log("update data user: ", updateData)
            // if (!updateWcxToeknData) {
            //     return res.send({
            //         success: false,
            //         message: "Error in update information."
            //     });
            // }
            // // create new wcx history   
            // let dataForWcxToken = {
            //     user_id: getUserId._id,
            //     date: Date.now(),
            //     token_price: 2000,
            //     event_name: 'Create posting'
            // }
            // let responseToUser = {};
            // new Wcx_rewards_tokens_history(dataForWcxToken).save(function (err, resultOfWcxToken) {
            //     //console.log("Error in create new wcx history  : ", err);
            //     if (err) {
            //         responseToUser = {
            //             success: false,
            //             error: true,
            //             message: "Error in update information.",
            //         };
            //         res.send(responseToUser);
            //     }
            // });
        }
        /**node mailer code */
        return res.send({
            success: true,
            message: "You have successfully registered. Please verify your email address. After verification you'll be able to login to your account. Upon successful verification you will receive 10K WCX tokens."
        });

    } catch (error) {
        //console.log("Error in set user", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.setUserWithSocialLogin = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body)
    if (!req.body.firstname || req.body.firstname == "") {
        return res.send({
            success: false,
            message: "Please enter first name."
        });
    }
    if (!req.body.lastname || req.body.lastname == "") {
        return res.send({
            success: false,
            message: "Please enter last name."
        });
    }
    if (!req.body.username || req.body.username == "") {
        return res.send({
            success: false,
            message: "Please enter username."
        });
    }
    if (req.body.username.length < 4) {
        return res.send({
            success: false,
            message: messages.USERNAME_4DIGIT
        });
    }
    if (!req.body.created_by || req.body.created_by == "") {
        return res.send({
            success: false,
            message: "Please enter website name."
        });
    }
    var userCheck = await User.findOne({
        'username': req.body.username
    });
    var roleNew = req.body.role;
    //console.log("usercheck : ", userCheck);
    if (userCheck != null) {
        var rolePre = userCheck.role
        if (userCheck.username === req.body.username) {
            if (req.body.created_by === userCheck.created_by) {
                return res.send({
                    success: false,
                    message: messages.ALREADY_USERNAME_EXIST
                });
            } else {
                var checkPara = "";
                if (req.body.created_by === 'WeCoOwn') {
                    checkPara = "1"
                } else if (req.body.created_by === 'WePropertyowners') {
                    checkPara = '2'
                }
                for (let i = 0; i < rolePre.length; i++) {
                    if (rolePre[i] === checkPara) {
                        return res.send({
                            code: 800,
                            success: true,
                            message: "You are already register at " + userCheck.created_by + ". Please go to login page and login with your same " + userCheck.created_by + " login credentials.",
                        });
                    }
                }
                return res.send({
                    code: 900,
                    success: true,
                    username: userCheck.username,
                    message: "You are already register at " + userCheck.created_by + ". Do you want to register as " + req.body.created_by + " too?"
                });
            }
        }
    }
    if (!req.body.email || req.body.email == "") {
        return res.send({
            success: false,
            message: "Please enter email address."
        });
    }
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(req.body.email)) {
        return res.send({
            success: false,
            message: "Please enter valid email address."
        });
    }
    let emailCheck = await User.findOne({
        'email': req.body.email
    });
    //console.log("emailCheck : ", emailCheck);
    if (emailCheck != null) {
        if (emailCheck.email === req.body.email) {
            return res.send({
                success: false,
                message: messages.ALREADY_EMAIL_EXIST
            });
        }
    }
    if (!req.body.facebook_id && !req.body.google_id && !req.body.linkedin_id) {
        return res.send({
            success: false,
            message: "Please enter social network id."
        });
    }
    if (req.body.facebook_id == "" && req.body.google_id == "" && req.body.linkedin_id == "") {
        return res.send({
            success: false,
            message: "Please enter social network id."
        });
    }
    //console.log("hereeeeeeeeeee");
    try {
        // set default  is admin false
        req.body.is_admin = false;
        //console.log("Password:-----: ", req.body.password);
        // let userData = new User(req.body).save();
        req.body.verfied = 'Yes';
        req.body.wcx_rewards_tokens = 10000;
        req.body.claim_key = guidGenerator();
        new User(req.body).save(function (err, seeData) {
            //console.log("error in set user through social login : ", err);
            if (err) {
                response = {
                    success: false,
                    message: "Error in registration."
                };
            } else {
                response = {
                    success: true,
                    message: "You have successfully registered. We are glad to inform you that you have received 10K WCX tokens."
                }
            }
            res.send(response);
        });
    } catch (error) {
        //console.log("Error in set user social", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getAllUserForAdmin = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.user_id) {
            return res.send({
                success: false,
                message: "Please enter user id."
            });
        }
        var getdata = await User.findOne({
            _id: req.body.user_id,
            status: 'Active',
            verfied: 'Yes',
            is_admin: true
        });
        ////console.log("post data : ", getdata);
        ////console.log("post data : ", typeof(getdata));
        if (getdata == {} || getdata == null) {
            return res.send({
                success: false,
                message: "You are not authorised to see this page."
            });
        } else if (getdata != null) {
            var getAllUserList = await User.find({}).sort({
                '_id': -1
            });
            return res.send({
                success: true,
                message: "Get all user list data",
                getdata: getAllUserList
            });
        }
    } catch (error) {
        //console.log("Error in all user data", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.makeUserAdmin = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.user_id) {
            return res.send({
                success: false,
                message: "Please enter user id."
            });
        }
        User.findOneAndUpdate({
            _id: req.body.user_id
        }, {
            $set: {
                is_admin: true
            }
        }, {
            new: true
        }, (err, doc) => {
            if (err) {
                //console.log("Something went wrong while updating you as an admin!", err);
                return res.send({
                    success: false,
                    error: err,
                    message: "You are not authorised to see this page."
                });
            } else {
                return res.send({
                    success: true,
                    message: "You are now admin."
                });
            }
        });
    } catch (error) {
        //console.log("Error in make admin user", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.updateUserRole = async (req, res) => {
    if (!req.body.username || req.body.username == "") {
        return res.send({
            success: false,
            message: "Please enter username."
        });
    }
    if (req.body.username.length < 4) {
        return res.send({
            success: false,
            message: messages.USERNAME_4DIGIT
        });
    }
    if (!req.body.created_by || req.body.created_by == "") {
        return res.send({
            success: false,
            message: "Please enter website name."
        });
    }
    try {
        var userCheck = await User.findOne({
            'username': req.body.username
        });
        var rolePre = userCheck.role;
        //console.log("usercheck : ", userCheck);
        if (userCheck != null) {
            var uniqueArr = [];
            if (req.body.created_by === 'WeCoOwn') {
                rolePre.push('1');

            } else if (req.body.created_by === 'WePropertyowners') {
                rolePre.push('2');
            }
            var formDataa = {
                role: rolePre,
                updated_at: Date.now()
            }
            var updateRoleData = await User.findByIdAndUpdate(userCheck._id, formDataa);
            if (!updateRoleData) {
                return res.send({
                    success: false,
                    message: "Error in update user data."
                });
            }
            return res.send({
                success: true,
                message: "You are successfully register in " + req.body.created_by + ". Now, please login with your same " + userCheck.created_by + " login credentials."
            });
        }
    } catch (error) {
        //console.log("Error in set user", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.updateUserRolewhenWebsiteChange = async (req, res) => {
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    try {
        var formDataa = {
            role: ["1", "2"],
            updated_at: Date.now()
        }
        var updateRoleData = await User.findByIdAndUpdate(req.query.id, formDataa);
        if (!updateRoleData) {
            return res.send({
                success: false,
                message: "Error in update user data."
            });
        }
        return res.send({
            success: true,
            message: "You are successfully registered."
        });
    } catch (error) {
        //console.log("Error in set user", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.setLoginUser = async (req, res) => {
    if (!req.body.username || req.body.username == "") {
        return res.send({
            success: false,
            message: "Please enter username."
        });
    }
    if (req.body.username.length < 4) {
        return res.send({
            success: false,
            message: messages.USERNAME_4DIGIT
        });
    }
    if (!req.body.password || req.body.password == "") {
        return res.send({
            success: false,
            message: "Please enter password."
        });
    }
    if (req.body.password.length < 6) {
        return res.send({
            success: false,
            message: "Password must be greater than 6 character."
        });
    }
    if (!req.body.created_by || req.body.created_by == "") {
        return res.send({
            success: false,
            message: "Please enter website name."
        });
    }
    let user = await User.findOne({
        username: req.body.username
    });
    //console.log("user information : ", user)
    if (!user) {
        return res.send({
            success: false,
            message: "Invalid username."
        });
    }
    if (user.verfied != 'Yes') {
        return res.send({
            success: false,
            message: "Please verify your email address."
        });
    }
    try {
        var userInfo = {};
        let result = bcrypt.compareSync(req.body.password, user.password);
        //console.log("passwords are : ", result, user.password, req.body.password);
        if (!result) {
            return res.send({
                success: false,
                message: messages.INVALID_PASSWORD
            });
        }
        if (result == true) {
            var token = jwt.sign({
                username: req.body.username,
            }, config.jwt_secret, {
                expiresIn: -1
            });
            //console.log("login token : ", token);
            // localStorage.setItem('myToken', token);
            userInfo = {
                id: user._id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role,
                profile_pic: user.profile_pic,
                login_token: token,
                is_admin: user.is_admin
            }
            //console.log("userrrrrrrrrrr : ", userInfo)
            //console.log("token : ", token)
            var userCheck = await User.findOne({
                'username': req.body.username
            });
            // for update is logged in
            var UserIpAddress = req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress;
            let splitIP = UserIpAddress.split(':')
            ////console.log(splitIP[0]);          
            var dataUpdateForLogged = {}
            if (req.body.created_by === 'WeCoOwn') {
                dataUpdateForLogged = {
                    is_logged_in: true,
                    is_logged_in_weco: true,
                    last_ip_address: splitIP[0],
                    login_token: token
                }
            } else if (req.body.created_by === 'WePropertyowners') {
                dataUpdateForLogged = {
                    is_logged_in: true,
                    is_logged_in_wepo: true,
                    last_ip_address: splitIP[0],
                    login_token: token
                }
            }
            var updateFlagOfLoggedIn = await User.findByIdAndUpdate(userCheck._id, dataUpdateForLogged);
            if (!updateFlagOfLoggedIn) {
                return res.send({
                    success: false,
                    message: messages.ERROR
                });
            }
            // end for update is logged in
            //console.log("usercheck : ", userCheck);
            if (userCheck != null) {
                var rolePre = userCheck.role
                if (userCheck.username === req.body.username) {
                    var checkPara = "";
                    if (req.body.created_by === 'WeCoOwn') {
                        checkPara = "1"
                    } else if (req.body.created_by === 'WePropertyowners') {
                        checkPara = '2'
                    }
                    for (let i = 0; i < rolePre.length; i++) {
                        if (rolePre[i] === checkPara) {
                            return res.send({
                                success: true,
                                message: messages.LOGIN_SUCCESSFULL,
                                userInfo: userInfo,
                            })
                        }
                    }
                    return res.send({
                        code: 900,
                        success: true,
                        username: userCheck.username,
                        userInfo: userInfo,
                        message: "You are already register at " + userCheck.created_by + ". Do you want to register as " + req.body.created_by + " too?"
                    });
                }
            }
        }
    } catch (error) {
        //console.log("Error in post Login", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.setLoginWithSocialLogin = async (req, res) => {
    if (!req.body.username || req.body.username == "") {
        return res.send({
            success: false,
            message: "Please enter username."
        });
    }
    if (req.body.username.length < 4) {
        return res.send({
            success: false,
            message: messages.USERNAME_4DIGIT
        });
    }
    if (!req.body.facebook_id && !req.body.google_id && !req.body.linkedin_id) {
        return res.send({
            success: false,
            message: "Please enter social network id."
        });
    }
    if (req.body.facebook_id == "" && req.body.google_id == "" && req.body.linkedin_id == "") {
        return res.send({
            success: false,
            message: "Please enter social network id."
        });
    }
    if (!req.body.created_by || req.body.created_by == "") {
        return res.send({
            success: false,
            message: "Please enter website name."
        });
    }
    let user = await User.findOne({
        username: req.body.username
    });
    if (req.body.facebook_id != "" && req.body.facebook_id != undefined) {
        user = await User.findOne({
            username: req.body.username,
            verfied: 'Yes',
            facebook_id: req.body.facebook_id
        });
    } else if (req.body.google_id != "" && req.body.google_id != undefined) {
        user = await User.findOne({
            username: req.body.username,
            verfied: 'Yes',
            google_id: req.body.google_id
        });
    } else if (req.body.linkedin_id != "" && req.body.linkedin_id != undefined) {
        user = await User.findOne({
            username: req.body.username,
            verfied: 'Yes',
            linkedin_id: req.body.linkedin_id
        });
    }
    //console.log("user information : ", user)
    if (!user) {
        return res.send({
            success: false,
            message: "Invalid username."
        });
    }
    try {
        var userInfo = {};
        if (user != null) {
            var token = jwt.sign({
                username: req.body.username,
            }, config.jwt_secret, {
                expiresIn: -1
            });
            //console.log("login token : ", token);
            // localStorage.setItem('myToken', token);
            userInfo = {
                id: user._id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role,
                profile_pic: user.profile_pic,
                login_token: token,
                is_admin: user.is_admin
            }
            //console.log("userrrrrrrrrrr : ", userInfo)
            //console.log("token : ", token)
            var userCheck = await User.findOne({
                'username': req.body.username
            });
            // for update is logged in
            var UserIpAddress = req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress;
            let splitIP = UserIpAddress.split(':')
            ////console.log(splitIP[0]);          
            var dataUpdateForLogged = {}
            if (req.body.created_by === 'WeCoOwn') {
                dataUpdateForLogged = {
                    is_logged_in: true,
                    is_logged_in_weco: true,
                    last_ip_address: splitIP[0],
                    login_token: token
                }
            } else if (req.body.created_by === 'WePropertyowners') {
                dataUpdateForLogged = {
                    is_logged_in: true,
                    is_logged_in_wepo: true,
                    last_ip_address: splitIP[0],
                    login_token: token
                }
            }
            var updateFlagOfLoggedIn = await User.findByIdAndUpdate(userCheck._id, dataUpdateForLogged);
            if (!updateFlagOfLoggedIn) {
                return res.send({
                    success: false,
                    message: messages.ERROR
                });
            }
            // end for update is logged in
            //console.log("usercheck : ", userCheck);
            if (userCheck != null) {
                var rolePre = userCheck.role
                if (userCheck.username === req.body.username) {
                    var checkPara = "";
                    if (req.body.created_by === 'WeCoOwn') {
                        checkPara = "1"
                    } else if (req.body.created_by === 'WePropertyowners') {
                        checkPara = '2'
                    }
                    for (let i = 0; i < rolePre.length; i++) {
                        if (rolePre[i] === checkPara) {
                            return res.send({
                                success: true,
                                message: messages.LOGIN_SUCCESSFULL,
                                userInfo: userInfo,
                            })
                        }
                    }
                    return res.send({
                        code: 900,
                        success: true,
                        username: userCheck.username,
                        userInfo: userInfo,
                        message: "You are already register at " + userCheck.created_by + ". Do you want to register as " + req.body.created_by + " too?"
                    });
                }
            }
        }
    } catch (error) {
        //console.log("Error in set Login through social login", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

// exports.IsUserLoggedIn = async (req, res) => {
//     try {
//         ////console.log(req.body);
//         var UserIpAddress = req.headers['x-forwarded-for'] ||
//             req.connection.remoteAddress ||
//             req.socket.remoteAddress ||
//             req.connection.socket.remoteAddress;
//         let splitIP = UserIpAddress.split(':')
//         ////console.log(splitIP[0]);
//         var checkdata = [];
//         if (req.body.email != undefined) {
//             ////console.log("In email check");
//             checkdata = await User.findOne({
//                 email: req.body.email,
//                 is_logged_in: true
//             });
//         } else if (req.body.login_token != undefined) {
//             ////console.log("In login token check");
//             checkdata = await User.findOne({
//                 login_token: req.body.login_token,
//                 is_logged_in: true
//             });
//         } else if (splitIP[0] != "") {
//             ////console.log("In ip address check");
//             checkdata = await User.findOne({
//                 last_ip_address: splitIP[0],
//                 is_logged_in: true
//             });
//         }
//         ////console.log("user information : ", checkdata)
//         if (checkdata == [] || checkdata == null) {
//             return res.send({
//                 success: false,
//                 message: "User is not logged in."
//             });
//         }
//         userInfo = {
//             id: checkdata._id,
//             username: checkdata.username,
//             firstname: checkdata.firstname,
//             lastname: checkdata.lastname,
//             email: checkdata.email,
//             role: checkdata.role,
//             profile_pic: checkdata.profile_pic,
//             login_token: checkdata.login_token
//         }
//         return res.send({
//             success: true,
//             message: "User is logged in.",
//             userInfo: userInfo
//         });
//     } catch (error) {
//        //console.log("Error in post Login", error);
//         return res.send({
//             success: false,
//             message: messages.ERROR
//         });
//     }
// };

exports.IsUserLoggedIn = async (req, res) => {
    try {
        ////console.log(req.body);
        var UserIpAddress = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        let splitIP = UserIpAddress.split(':')
        ////console.log(splitIP[0]);
        var checkdata = [];
        if (req.body.email != undefined) {
            ////console.log("email check");
            checkdata = await User.findOne({
                email: req.body.email,
            });
        } else if (req.body.login_token != undefined) {
            ////console.log("login token check");
            checkdata = await User.findOne({
                login_token: req.body.login_token,
            });
        } else if (splitIP[0] != "") {
            ////console.log("ip address check");
            checkdata = await User.findOne({
                last_ip_address: splitIP[0],
            });
        }
        ////console.log("user information : ", checkdata)
        if (checkdata == [] || checkdata == null) {
            return res.send({
                success: false,
                message: "User is not logged in."
            });
        } else if (checkdata != null) {
            if (checkdata.role.length == 1) {
                var formDataa = {
                    role: ["1", "2"],
                    updated_at: Date.now()
                }
                await User.findByIdAndUpdate(checkdata._id, formDataa);
            }
            var userInfo = {
                id: checkdata._id,
                username: checkdata.username,
                firstname: checkdata.firstname,
                lastname: checkdata.lastname,
                email: checkdata.email,
                role: ['1', '2'],
                profile_pic: checkdata.profile_pic,
                login_token: checkdata.login_token,
                is_admin: checkdata.is_admin
            }
            if (checkdata.is_logged_in_weco === true && checkdata.is_logged_in_wepo === true) {
                return res.send({
                    success: true,
                    message: "User is logged in.",
                    userInfo: userInfo
                });
            } else if (checkdata.is_logged_in_weco === false && checkdata.is_logged_in_wepo === false) {
                return res.send({
                    success: false,
                    message: "User is not logged in.",
                    code: 104
                });
            } else {
                if (req.body.website === 'WeCoOwn') {
                    if (checkdata.is_logged_in_weco === false && checkdata.is_logged_in_wepo === true) {
                        return res.send({
                            success: true,
                            message: "User is logged in.",
                            userInfo: userInfo
                        });
                    } else if (checkdata.is_logged_in_weco === true && checkdata.is_logged_in_wepo === false) {
                        return res.send({
                            success: true,
                            message: "User is logged in.",
                        });
                    }
                } else if (req.body.website === 'WePropertyowners') {
                    if (checkdata.is_logged_in_weco === false && checkdata.is_logged_in_wepo === true) {
                        return res.send({
                            success: true,
                            message: "User is logged in.",
                        });
                    } else if (checkdata.is_logged_in_weco === true && checkdata.is_logged_in_wepo === false) {
                        return res.send({
                            success: true,
                            message: "User is logged in.",
                            userInfo: userInfo
                        });
                    }
                }
            }
        }
    } catch (error) {
        //console.log("Error in post Login", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDU1OTIxMDh9.f_oMpBM-6qmiBXCj7Y4Tf9p7m0CKEtpsXTpZQamTXOI
exports.IsUserLoggedInMobile = async (req, res) => {
    try {
        ////console.log(req.body);

        if (!req.body.login_token || req.body.login_token == "" || req.body.login_token == 'undefined') {
            return res.send({
                success: false,
                message: "Please enter login token."
            });
        }
        if (!req.body.created_by || req.body.created_by == "") {
            return res.send({
                success: false,
                message: "Please enter website name."
            });
        }
        var decodedToken = jwt_decode(req.body.login_token, {
            complete: true
        });
        ////console.log("doceoded token : ", decodedToken);
        if (decodedToken == {} || decodedToken == null) {
            return res.send({
                success: false,
                message: "Invalid token."
            });
        }
        // var base64Url = req.body.login_token.split('.')[1];
        // var decodedValue0 =  JSON.parse(atob(token.split('.')[0]));
        var checkdata = [];
        if (decodedToken.username != undefined) {
            //console.log("username check");
            checkdata = await User.findOne({
                username: decodedToken.username,
            });
        }
        ////console.log("user information : ", checkdata)
        if (checkdata == [] || checkdata == null) {
            return res.send({
                success: false,
                message: "User is not logged in."
            });
        } else if (checkdata != null) {
            if (req.body.created_by === 'WeCoOwn') {
                dataUpdateForLogged = {
                    is_logged_in_wepo: true,
                }
            } else if (req.body.created_by === 'WePropertyowners') {
                dataUpdateForLogged = {
                    is_logged_in_weco: true
                }
            }
            var updateFlagOfLoggedIn = await User.findByIdAndUpdate(checkdata._id, dataUpdateForLogged);
            if (!updateFlagOfLoggedIn) {
                return res.send({
                    success: false,
                    message: messages.ERROR
                });
            } else {
                var userInfo = {
                    id: checkdata._id,
                    username: checkdata.username,
                    firstname: checkdata.firstname,
                    lastname: checkdata.lastname,
                    email: checkdata.email,
                    role: ['1', '2'],
                    profile_pic: checkdata.profile_pic,
                    login_token: checkdata.login_token,
                    is_admin: checkdata.is_admin
                }
                return res.send({
                    success: true,
                    message: "User is logged in.",
                    userInfo: userInfo
                });
            }
        }
    } catch (error) {
        //console.log("Error in post Login", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.signOutUser = async (req, res) => {
    if (!req.body.email || req.body.email == "") {
        return res.send({
            success: false,
            message: "Please enter email."
        });
    }
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        //console.log("user information : ", user)
        if (!user) {
            return res.send({
                success: false,
                message: "Invalid email."
            });
        }
        // for update is logged in
        let dataUpdateForLogged = {
            is_logged_in: false,
            is_logged_in_weco: false,
            is_logged_in_wepo: false,
            last_ip_address: ''
        }
        var updateFlagOfLoggedIn = await User.findByIdAndUpdate(user._id, dataUpdateForLogged);
        if (!updateFlagOfLoggedIn) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        } else {
            return res.send({
                success: true,
                message: "You are successfully logged out."
            });
        }
    } catch (error) {
        //console.log("Error in post Login", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getUserById = async (req, res) => {
    //console.log("user postttttttttt req body : ", req.body)
    if (!req.body.id || req.body.id == "") {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    try {
        var getData = await User.findById(req.body.id);
        ////console.log("9999999999", data)
        if (!getData) {
            return res.send({
                success: false,
                message: "Error in user by id."
            });
        }
        let userInfo = {
            id: getData._id,
            username: getData.username,
            firstname: getData.firstname,
            lastname: getData.lastname,
            email: getData.email,
            role: getData.role,
            profile_pic: getData.profile_pic,
            login_token: getData.login_token,
            is_admin: getData.is_admin
        }
        return res.send({
            success: true,
            message: "Get user by id.",
            getData: getData,
            userInfo: userInfo
        });
    } catch (error) {
        //console.log("Error in user by Id", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
exports.putUserProfile = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    try {
        delete req.body.username;
        delete req.body.email;
        delete req.body.password;
        delete req.body.firstname;
        delete req.body.lastname;
        delete req.body.profile_pic;
        delete req.body.cover_pic;
        // usage example:

        if (req.body.vendor != undefined && req.body.vendor != []) {
            var unique = req.body.vendor.filter(onlyUnique);
            var vendorArr = unique;
            //console.log(vendorArr);
            //console.log("len ", vendorArr.length);
            var finalArrOfVendor = [];
            var checkPrevious = await User.findById(req.query.id).select('vendor');
            if (!checkPrevious) {
                return res.send({
                    success: false,
                    message: "User does not exist."
                });
            }
            // //console.log("checkPrevious",checkPrevious);
            // //console.log("vendorr previousssssssss : ", checkPrevious.vendor);
            //console.log("vendorr previousssssssss length : ", checkPrevious.vendor.length);
            if (checkPrevious.vendor.length == 0) {
                // //console.log("check vendor iffffffffffffff");
                for (let ijk = 0; ijk < vendorArr.length; ijk++) {
                    finalArrOfVendor.push({
                        vendor_id: vendorArr[ijk],
                        company_name: '',
                        company_email: '',
                        company_website: '',
                        company_address: ''
                    })
                }
                var updateData = await User.findByIdAndUpdate(req.query.id, {
                    $push: {
                        vendor: finalArrOfVendor
                    }
                });
                // //console.log("update data user: ", updateData)
                if (!updateData) {
                    return res.send({
                        success: false,
                        message: messages.ERROR
                    });
                }
            } else {
                //console.log("elseeeeeeeeeeeee partttttttttt");
                for (let ijk = 0; ijk < vendorArr.length; ijk++) {
                    checkPrevious.vendor.forEach(element => {
                        if (element.vendor_id != vendorArr[ijk]) {
                            //console.log("iffffffff chekkkkkkkkkkkkkkkkkkk ven");
                            let formDDA = {
                                vendor_id: vendorArr[ijk],
                                company_name: '',
                                company_email: '',
                                company_website: '',
                                company_address: ''
                            }
                            updatevendorArrOfUser(formDDA);
                        } else {
                            //console.log("else      checkkkkkkkkkkkk");
                        }
                    });
                }
            }
        }
        async function updatevendorArrOfUser(formDDA) {
            let updateData11 = await User.findByIdAndUpdate(req.query.id, {
                $push: {
                    vendor: formDDA
                }
            });
            if (!updateData11) {
                return res.send({
                    success: false,
                    message: messages.ERROR
                });
            }
        }
        // progileImageArr = [];
        // coverImageArr = [];
        // if (req.body.profile_pic == "") {
        // }
        // if (req.body.cover_pic == "") {
        // }
        // if (req.files != undefined) {
        //     //console.log(" element.profile_pic", req.files.profile_pic);
        //     if (req.files.profile_pic != undefined) {
        //         req.files.profile_pic.forEach(element => {
        //             progileImageArr.push({
        //                 src: 'uploads/' + element.filename,
        //                 orgName: element.originalname,
        //             })
        //         });
        //         req.body.profile_pic = progileImageArr;
        //         //console.log("profile_pic pic coverImageArr", progileImageArr);
        //         //console.log("profile_pic pic ", req.body.profile_pic);
        //     }
        //     if (req.files.cover_pic != undefined) {
        //         req.files.cover_pic.forEach(element => {
        //             coverImageArr.push({
        //                 src: 'uploads/' + element.filename,
        //                 orgName: element.originalname,
        //             })
        //         });
        //         req.body.cover_pic = coverImageArr;
        //         //console.log("cover pic coverImageArr", coverImageArr);
        //         //console.log("cover pic ", req.body.cover_pic);
        //     }
        // }
        delete req.body.vendor;
        var updateData = await User.findByIdAndUpdate(req.query.id, req.body);
        //console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your profile updated successfully."
        });
    } catch (error) {
        //console.log("User Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.updateUserProfilePic = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    //console.log("Photos : ", req.file);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (!req.body.uploadImageThrughAPK && !req.file) {
        //console.log("innn upload image through apk");
        return res.send({
            success: false,
            message: "Please select profile picture."
        });
    }
    if (req.body.uploadImageThrughAPK == [] && req.file == {}) {
        //console.log("innn upload image through apk");
        return res.send({
            success: false,
            message: "Please select profile picture."
        });
    }
    // if (!req.file) {
    //     return res.send({
    //         success: false,
    //         message: "Please select profile picture."
    //     });
    // }
    // if (req.file == "") {
    //     return res.send({
    //         success: false,
    //         message: "Please select profile picture."
    //     });
    // }
    try {
        delete req.body.username;
        delete req.body.email;
        delete req.body.password;
        progileImageArr = [];

        if (req.file != undefined) {
            progileImageArr.push({
                src: 'uploads/' + req.file.filename,
                orgName: req.file.originalname,
            })
        } else if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined') {
            progileImageArr = req.body.uploadImageThrughAPK
        }
        //console.log("profile_pic pic", req.body.profile_pic);
        let profileData = {
            profile_pic: progileImageArr
        }
        var updateData = await User.findByIdAndUpdate(req.query.id, profileData);
        //console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        var getData = await User.findById(req.query.id);
        let userInfo = {
            id: getData._id,
            username: getData.username,
            email: getData.email,
            role: getData.role,
            profile_pic: getData.profile_pic,
            login_token: getData.login_token,
            is_admin: getData.is_admin
        }
        return res.send({
            success: true,
            message: "Your profile picture updated successfully.",
            userInfo: userInfo
        });
    } catch (error) {
        //console.log("User Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.updateUserCoverPic = async (req, res) => {
    console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    console.log("body cover pic reqparams user profile: ", req.body);
    console.log("Photos : ", req.file);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (!req.body.uploadImageThrughAPK && !req.file) {
        return res.send({
            success: false,
            message: "Please select cover picture."
        });
    }
    if (req.body.uploadImageThrughAPK == [] && req.file == {}) {
        return res.send({
            success: false,
            message: "Please select cover picture."
        });
    }
    // if (!req.file) {
    //     return res.send({
    //         success: false,
    //         message: "Please select cover picture."
    //     });
    // }
    // if (req.file == "") {
    //     return res.send({
    //         success: false,
    //         message: "Please select cover picture."
    //     });
    // }
    try {
        delete req.body.username;
        delete req.body.email;
        delete req.body.password;
        progileImageArr = [];
        if (req.file != undefined) {
            //console.log("in req. file");
            progileImageArr.push({
                src: 'uploads/' + req.file.filename,
                orgName: req.file.originalname,
            })
        } else if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined') {
            //console.log("in upload image");
            progileImageArr = req.body.uploadImageThrughAPK
        }
        let profileData = {
            cover_pic: progileImageArr
        }
        //console.log("final upload image : ", profileData);
        var updateData = await User.findByIdAndUpdate(req.query.id, profileData);
        //console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your cover picture updated successfully."
        });
    } catch (error) {
        //console.log("User Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.updateUserPortfolioPic = async (req, res) => {
    //console.log("in put user portfolio methodddddddddddddddd : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    //console.log("Photos of my portfolio : ", req.file);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (!req.body.uploadImageThrughAPK && !req.file) {
        //console.log("innn upload image through apk");
        return res.send({
            success: false,
            message: "Please select portfolio picture."
        });
    }
    if (req.body.uploadImageThrughAPK == [] && req.file == {}) {
        //console.log("innn upload image through apk");
        return res.send({
            success: false,
            message: "Please select portfolio picture."
        });
    }
    try {
        progileImageArr = [];
        if (req.file != undefined) {
            progileImageArr.push({
                src: 'uploads/' + req.file.filename,
                orgName: req.file.originalname,
            })
        } else if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined') {
            progileImageArr = req.body.uploadImageThrughAPK
        }
        //console.log("profile_pic pic", req.body.profile_pic);
        let profileData = {
            portfolio_pic: progileImageArr
        }
        var updateData = await User.findByIdAndUpdate(req.query.id, profileData);
        //console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your portfolio picture updated successfully.",
        });
    } catch (error) {
        //console.log("User portfolio_pic Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.updateUserBio = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (!req.body.bio) {
        return res.send({
            success: false,
            message: "Please enter your introduction."
        });
    }
    // if (req.body.bio == "") {
    //     return res.send({
    //         success: false,
    //         message: "Please enter your introduction."
    //     });
    // }
    if (req.body.intro_public == "") {
        return res.send({
            success: false,
            message: "Please check if introduction is public or not."
        });
    }

    try {
        let profileData = {
            bio: req.body.bio,
            intro_public: req.body.intro_public
        }
        var updateData = await User.findByIdAndUpdate(req.query.id, profileData);
        //console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your introduction updated successfully."
        });
    } catch (error) {
        //console.log("User Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.updateUserSocialLink = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }

    try {
        let profileData = {
            facebook_link: req.body.facebook_link,
            twitter_link: req.body.twitter_link,
            linkedin_link: req.body.linkedin_link,
            instagram_link: req.body.instagram_link
        }
        var updateData = await User.findByIdAndUpdate(req.query.id, profileData);
        //console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your social media link updated successfully."
        });
    } catch (error) {
        //console.log("User Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.updateVendorInfo = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (req.body.vendor == "") {
        return res.send({
            success: false,
            message: "Please enter vendor type."
        });
    }
    try {
        let vendorArr = req.body.vendor;
        // let profileData = {
        //   vendor : req.body.vendor
        // }
        let checkPrevious = await User.findById(req.query.id).select('vendor');
        if (!checkPrevious) {
            return res.send({
                success: false,
                message: "User does not exist"
            });
        }
        // //console.log("checkPrevious",checkPrevious);
        //console.log("vendorr previousssssssss : ", checkPrevious.vendor);
        //console.log("vendorr previousssssssss length : ", checkPrevious.vendor.length);
        if (checkPrevious.vendor.length == 0) {
            //console.log("check vendor iffffffffffffff");
            var updateData = await User.findByIdAndUpdate(req.query.id, {
                $push: {
                    vendor: req.body.vendor[0]
                }
            });
            // //console.log("update data user: ", updateData)
            if (!updateData) {
                return res.send({
                    success: false,
                    message: messages.ERROR
                });
            }
            return res.send({
                success: true,
                message: "Vendor type updated successfully."
            });
        } else {
            let checkFlagIdMatch = false;
            //console.log("elseeeeeeeeeeeee partttttttttt");
            checkPrevious.vendor.forEach(element => {
                if (element.vendor_id == vendorArr[0].vendor_id) {
                    //console.log("iffffffffffff trueeeeeeeeee idddddddddddd");
                    checkFlagIdMatch = true;
                }
            });
            if (checkFlagIdMatch == true) {
                //console.log("inerrrr of flagggggggggggg trueeeee");
                var updateVendorData = await User.updateOne({
                    _id: req.query.id,
                    "vendor.vendor_id": vendorArr[0].vendor_id
                }, {
                    $set: {
                        "vendor.$.company_name": vendorArr[0].company_name,
                        "vendor.$.company_email": vendorArr[0].company_email,
                        "vendor.$.company_website": vendorArr[0].company_website,
                        "vendor.$.company_address": vendorArr[0].company_address,
                    }
                });
                //console.log("updateVendorData  updateVendorData ", updateVendorData);
                if (!updateVendorData) {
                    return res.send({
                        success: false,
                        message: "Error in update vendor type array"
                    });
                }
            } else {
                //console.log("else with trueeeeeeeeee");
                let updateData11 = await User.findByIdAndUpdate(req.query.id, {
                    $push: {
                        vendor: req.body.vendor[0]
                    }
                });
                //console.log("else updateData11 : ", updateData11);
                if (!updateData11) {
                    return res.send({
                        success: false,
                        message: messages.ERROR
                    });
                }
            }
            return res.send({
                success: true,
                message: "Vendor type updated successfully."
            });
        }
    } catch (error) {
        //console.log("Your vendor type updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.updateVendorInfoUntick = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (req.body.vendor_id == "") {
        return res.send({
            success: false,
            message: "Please enter vendor type."
        });
    }
    try {
        //console.log("inerrrr of flagggggggggggg trueeeee");
        var updateVendorData = await User.updateOne({
            _id: req.query.id,
        }, {
            $pull: {
                "vendor": {
                    vendor_id: req.body.vendor_id
                }
            }
        });
        //console.log("updateVendorData  updateVendorData ", updateVendorData);
        if (!updateVendorData) {
            return res.send({
                success: false,
                message: "Error in delete vendor type array"
            });
        }
        return res.send({
            success: true,
            message: "Vendor type deleted successfully."
        });

    } catch (error) {
        //console.log("error in Your vendor type deleted", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.redeemUserClaimKey = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    if (req.body.user_id == "") {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (req.body.date == "") {
        return res.send({
            success: false,
            message: "Please enter date & time."
        });
    }
    if (req.body.token_price == "") {
        return res.send({
            success: false,
            message: "Please enter token price."
        });
    }
    if (req.body.claim_key == "") {
        return res.send({
            success: false,
            message: "Please enter claim key."
        });
    }
    try {
        // update wcx reward token by add 0
        let new_claim_key = guidGenerator();
        let updateWcxTokenIncrementBody = {
            wcx_rewards_tokens: 0,
            claim_key: new_claim_key
        }
        let updateWcxToeknData = await User.findByIdAndUpdate(req.body.user_id, updateWcxTokenIncrementBody);
        //console.log("update data user: ", updateData)
        if (!updateWcxToeknData) {
            return res.send({
                success: false,
                message: "Error in redeem claim key."
            });
        }
        // create new wcx history   
        let dataForWcxToken = {
            user_id: req.body.user_id,
            date: req.body.date,
            token_price: 0,
            event_name: 'Redeem claim key',
        }
        let responseToUser = {};
        new Wcx_rewards_tokens_history(dataForWcxToken).save(function (err, resultOfWcxToken) {
            if (err) {
                console.log("Error in redeem claim key  : ", err);
                responseToUser = {
                    success: false,
                    error: true,
                    message: "Error in redeem claim key.",
                };
                res.send(responseToUser);
            }
        });
        // create new user claim key history   
        let dataForUserClaimKey = {
            user_id: req.body.user_id,
            date: req.body.date,
            token_price: req.body.token_price,
            claim_key: req.body.claim_key
        }
        new User_claim_key_history(dataForUserClaimKey).save(function (err, resultOfUserClaimKey) {
            if (err) {
                console.log("Error in redeem claim key  : ", err);
                responseToUser = {
                    success: false,
                    error: true,
                    message: "Error in redeem claim key.",
                };
                res.send(responseToUser);
            }
        });
        return res.send({
            success: true,
            message: "Redeem claim key successfully.",
            new_claim_key: new_claim_key
        });
    } catch (error) {
        console.log("Error in redeem claim key", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getOneUserClaimKeyHistory = async (req, res) => {
    if (req.body.user_id == "") {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    try {
        let getData = await User_claim_key_history.find({
            user_id: req.body.user_id,
            status: 'Active'
        }).sort({
            'date': -1
        });
        //console.log("getData : ", getData);
        if (!getData) {
            return res.send({
                success: false,
                message: "Error in get data of one user claim key history."
            });
        }
        return res.send({
            success: true,
            message: "get data of one user claim key history.",
            getData: getData
        });
    } catch (error) {
        //console.log("get data of one user claim key history : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.updateUserProfilePublic = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (!req.body.profile_public) {
        return res.send({
            success: false,
            message: "Please select your public profile."
        });
    }
    if (req.body.profile_public == "") {
        return res.send({
            success: false,
            message: "Please select your public profile."
        });
    }

    try {
        let profileData = {
            profile_public: req.body.profile_public
        }
        var updateData = await User.findByIdAndUpdate(req.query.id, profileData);
        //console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your public profile updated successfully."
        });
    } catch (error) {
        //console.log("User Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};
// start api for advertisement
exports.setAdTest = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body);
    if (!req.body.text || req.body.text == "") {
        return res.send({
            success: false,
            message: "Please enter text."
        });
    }
    try {
        let textBody = {
            text: req.body.text
        }
        new Ad_Text(textBody).save(function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                response = {
                    success: false,
                    message: "Error in save text Ad."
                };
            } else {
                response = {
                    success: true,
                    message: "Your text Ad created successfully."
                }
            }
            res.send(response);
        });
    } catch (error) {
        //console.log("Error in save text Ad : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getAdTest = async (req, res) => {
    try {
        let getData = await Ad_Text.find({});
        //console.log("getData : ", getData);
        if (!getData) {
            return res.send({
                success: false,
                message: "Error in get data of Ad text."
            });
        }
        return res.send({
            success: true,
            message: "get data of Ad text.",
            getData: getData
        });
    } catch (error) {
        //console.log("Error in save text Ad : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getAllAd = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please select user id."
            });
        }
        let getBanner = await Banner_ad.find({
            user_id: req.body.id
        }).sort({
            '_id': -1
        });
        let getSidebar = await Sidebar_ad.find({
            user_id: req.body.id
        }).sort({
            '_id': -1
        });
        let getPoster = await Poster_ad.find({
            user_id: req.body.id
        }).sort({
            '_id': -1
        });
        let getVendor = await Vendors_Page_Listing.find({
            user_id: req.body.id
        }).sort({
            '_id': -1
        });
        return res.send({
            success: true,
            message: "get all data of ad.",
            getBanner: getBanner,
            getSidebar: getSidebar,
            getPoster: getPoster,
            getVendor: getVendor
        });
    } catch (error) {
        //console.log("Error in get all ad : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getAllVendorAd = async (req, res) => {
    try {
        // var checkDD = new Date();
        // var todayDate = checkDD.getFullYear() + '-' + (checkDD.getMonth() + 1) + '-' + checkDD.getDate();
        let getData = await Vendors_Page_Listing.find({
            status: 'Active',
            start_date: {
                $lte: new Date()
            },
            end_date: {
                $gte: new Date()
            }
        }).sort({
            '_id': -1
        });
        if (!getData) {
            return res.send({
                success: false,
                message: "Error in get data of all vendor Ad."
            });
        }
        return res.send({
            success: true,
            message: "All data of all vendor Ad.",
            getData: getData
        });
    } catch (error) {
        //console.log("Error in get data of all vendor Ad : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getAllBannerAdByCategory = async (req, res) => {
    try {
        if (!req.body.category) {
            return res.send({
                success: false,
                message: "Please enter category name."
            });
        }
        let getData = await Banner_ad.find({
            status: 'Active',
            category: req.body.category,
            start_date: {
                $lte: new Date()
            },
            end_date: {
                $gte: new Date()
            }
        }).select('url_button ad_image').sort({
            '_id': -1
        });
        if (!getData) {
            return res.send({
                success: false,
                message: "Error in get data of all banner Ad."
            });
        }
        return res.send({
            success: true,
            message: "All data of all banner Ad.",
            getData: getData
        });
    } catch (error) {
        //console.log("Error in get data of all banner Ad : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getAllPosterAdByCategory = async (req, res) => {
    try {
        if (!req.body.category) {
            return res.send({
                success: false,
                message: "Please enter category name."
            });
        }
        let getData = await Poster_ad.find({
            status: 'Active',
            category: req.body.category,
            start_date: {
                $lte: new Date()
            },
            end_date: {
                $gte: new Date()
            }
        }).select('url_button ad_image headline description').sort({
            '_id': -1
        });
        if (!getData) {
            return res.send({
                success: false,
                message: "Error in get data of all poster Ad."
            });
        }
        return res.send({
            success: true,
            message: "All data of all poster Ad.",
            getData: getData
        });
    } catch (error) {
        //console.log("Error in get data of all poster Ad : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getAllSidebarAdByCategory = async (req, res) => {
    try {
        if (!req.body.category) {
            return res.send({
                success: false,
                message: "Please enter category name."
            });
        }
        let getData = await Sidebar_ad.find({
            status: 'Active',
            category: req.body.category,
            start_date: {
                $lte: new Date()
            },
            end_date: {
                $gte: new Date()
            }
        }).select('url_button ad_image').sort({
            '_id': -1
        });
        if (!getData) {
            return res.send({
                success: false,
                message: "Error in get data of all sidebar Ad."
            });
        }
        return res.send({
            success: true,
            message: "All data of all sidebar Ad.",
            getData: getData
        });
    } catch (error) {
        //console.log("Error in get data of all sidebar Ad : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getAdByIdAndName = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please select user id."
            });
        }
        if (!req.body.name) {
            return res.send({
                success: false,
                message: "Please select Ad name."
            });
        }
        var getData = [];
        if (req.body.name === "Banner Ad") {
            getData = await Banner_ad.find({
                _id: req.body.id,
                name: req.body.name
            });
        } else if (req.body.name === "Sidebar Ad") {
            getData = await Sidebar_ad.find({
                _id: req.body.id,
                name: req.body.name
            });
        } else if (req.body.name === "Poster Ad") {
            getData = await Poster_ad.find({
                _id: req.body.id,
                name: req.body.name
            });
        } else if (req.body.name === "Vendor Listing") {
            getData = await Vendors_Page_Listing.find({
                _id: req.body.id,
                name: req.body.name
            });
        }
        if (getData == []) {
            return res.send({
                success: false,
                message: "There is no data"
            });
        }
        return res.send({
            success: true,
            message: "All data of Ad.",
            getData: getData
        });
    } catch (error) {
        //console.log("Error in get all Ad : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.updateStatusOfAds = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please select user id."
            });
        }
        if (!req.body.name) {
            return res.send({
                success: false,
                message: "Please select Ad name."
            });
        }
        if (!req.body.status) {
            return res.send({
                success: false,
                message: "Please select Ad status."
            });
        }
        let updateFormStatus = {
            status: req.body.status
        }
        var getData = [];
        if (req.body.name === "Banner Ad") {
            getData = await Banner_ad.findByIdAndUpdate(req.body.id, updateFormStatus);
        } else if (req.body.name === "Sidebar Ad") {
            getData = await Sidebar_ad.findByIdAndUpdate(req.body.id, updateFormStatus);
        } else if (req.body.name === "Poster Ad") {
            getData = await Poster_ad.findByIdAndUpdate(req.body.id, updateFormStatus);
        } else if (req.body.name === "Vendor Listing") {
            getData = await Vendors_Page_Listing.findByIdAndUpdate(req.body.id, updateFormStatus);
        }
        if (getData == []) {
            return res.send({
                success: false,
                message: "There is no data"
            });
        }
        return res.send({
            success: true,
            message: "Status updated successfully.",
            getData: getData
        });
    } catch (error) {
        //console.log("Error in update status ad : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getPosterAdGroupDataByUserId = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body);
    if (!req.body.user_id || req.body.user_id == "") {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    try {
        var ImageArr = [];
        let getPreviousUserData = await Poster_ad_group_data.find({
            user_id: req.body.user_id
        });
        //console.log("req body of advertisement poster group data : ", req.body);
        if (getPreviousUserData == [] || getPreviousUserData == null) {
            return res.send({
                success: false,
                message: "Previous group data not found"
            });
        } else if (getPreviousUserData != null) {
            for (let ijk = 0; ijk < getPreviousUserData.length; ijk++) {
                if (getPreviousUserData[ijk].all_poster_ad_id.length <= 2) {
                    //console.log("match id : ", getPreviousUserData[ijk]._id);
                    return res.send({
                        success: true,
                        message: "Previous poster ad group data found.",
                        posterAdGroupData: getPreviousUserData[ijk]
                    });
                }
            }
            return res.send({
                success: false,
                message: "Previous group data not found"
            });
        }
    } catch (error) {
        //console.log("Error in set poster ad : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.setBannerAd = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body);
    if (!req.body.user_id || req.body.user_id == "") {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    if (!req.body.category) {
        return res.send({
            success: false,
            message: "Please enter category"
        });
    }
    try {
        var ImageArr = [];
        if (req.file != undefined) {
            ImageArr.push({
                src: 'uploads/' + req.file.filename,
                orgName: req.file.originalname,
            })
            req.body.ad_image = ImageArr;
        } else if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined') {
            ImageArr = req.body.uploadImageThrughAPK;
            req.body.ad_image = ImageArr;
        }
        //console.log("req body of advertisement : ", req.body);
        // var userData = new Banner_ad(req.body).save();
        new Banner_ad(req.body).save(function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                response = {
                    success: false,
                    message: "Error in post save banner Ad."
                };
            } else {
                response = {
                    success: true,
                    message: "Banner Ad created successfully."
                }
            }
            res.send(response);
        });
        // if (!userData) {
        //   return res.send({
        //     success: false,
        //     message: "Error in post save banner ad."
        //   });
        // }
        // return res.send({
        //   success: true,
        //   message: "Your banner ad created successfully."
        // });
    } catch (error) {
        //console.log("Error in set banner Ad : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.setPosterAd = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body);
    if (!req.body.user_id || req.body.user_id == "") {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    if (!req.body.category) {
        return res.send({
            success: false,
            message: "Please enter category"
        });
    }
    try {
        var ImageArr = [];
        if (req.file != undefined) {
            ImageArr.push({
                src: 'uploads/' + req.file.filename,
                orgName: req.file.originalname,
            })
            req.body.ad_image = ImageArr;
        } else if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined') {
            ImageArr = req.body.uploadImageThrughAPK;
            req.body.ad_image = ImageArr;
        }
        //console.log("req body of advertisement : ", req.body);
        new Poster_ad(req.body).save(async function (err, seeData) {
            //console.log("err in create poster ad data save : ", err);
            if (err) {
                response = {
                    success: false,
                    message: "Error in post save poster Ad."
                };
                res.send(response);
            } else {
                let getNewPosterID = seeData._id;
                //console.log("seeData : ", seeData);
                if (getNewPosterID != "") {
                    // first check user send any group id or not
                    if (req.body.previous_group_data_id != undefined && req.body.previous_group_data_id != "") {
                        updatePosterAdGroupData(req.body.previous_group_data_id, getNewPosterID)
                    } else {
                        // first check user have already 3 post group or not at same start date
                        let getPreviousUserData = await Poster_ad_group_data.findOne({
                            user_id: req.body.user_id,
                            start_date: seeData.start_date,
                            end_date: seeData.end_date
                        });
                        let groupDataForm = {
                            user_id: req.body.user_id,
                            all_poster_ad_id: [getNewPosterID],
                            start_date: req.body.start_date,
                            end_date: req.body.end_date
                        }
                        if (getPreviousUserData == [] || getPreviousUserData == null) {
                            // create new user group data
                            createPosterAdGroupData(groupDataForm);
                        } else if (getPreviousUserData != null) {
                            // check the previous group have poster ad 3 or less
                            if (getPreviousUserData.all_poster_ad_id.length < 3) {
                                // if user have same start date and post is lesser than 3 then update or append the poster id in all poster id array
                                updatePosterAdGroupData(getPreviousUserData._id, getNewPosterID)
                            } else {
                                // create new user group data
                                createPosterAdGroupData(groupDataForm);
                            }
                        }
                    }
                    // create new group data method
                    function createPosterAdGroupData(formdata) {
                        new Poster_ad_group_data(formdata).save(function (errorGroupData, savePosterData) {
                            //console.log("error poster Group Data : ", errorGroupData);
                            if (errorGroupData) {
                                response = {
                                    success: false,
                                    message: "Error in post save poster Ad."
                                };
                            } else {
                                response = {
                                    success: true,
                                    message: "Poster Ad created successfully."
                                }
                            }
                            res.send(response);
                        })
                    }
                    // update group data method
                    async function updatePosterAdGroupData(previous_group_data_id, getNewPosterID) {
                        let updatePreviousPosterGroup = await Poster_ad_group_data.findByIdAndUpdate(previous_group_data_id, {
                            $push: {
                                all_poster_ad_id: getNewPosterID
                            }
                        });
                        if (!updatePreviousPosterGroup) {
                            return res.send({
                                success: false,
                                message: "Error in create poster ad"
                            });
                        } else {
                            return res.send({
                                success: true,
                                message: "Poster Ad created successfully."
                            });
                        }
                    }
                } else {
                    return res.send({
                        success: false,
                        message: "Error in post save poster Ad."
                    });
                }
            }
        });
    } catch (error) {
        //console.log("Error in set poster ad : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.setSidebarAd = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body);
    if (!req.body.user_id || req.body.user_id == "") {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    if (!req.body.category) {
        return res.send({
            success: false,
            message: "Please enter category"
        });
    }
    try {
        var ImageArr = [];
        if (req.file != undefined) {
            ImageArr.push({
                src: 'uploads/' + req.file.filename,
                orgName: req.file.originalname,
            })
            req.body.ad_image = ImageArr;
        } else if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined') {
            ImageArr = req.body.uploadImageThrughAPK;
            req.body.ad_image = ImageArr;
        }
        //console.log("req body of advertisement : ", req.body);
        new Sidebar_ad(req.body).save(function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                response = {
                    success: false,
                    message: "Error in post save sidebar Ad."
                };
            } else {
                response = {
                    success: true,
                    message: "Sidebar Ad created successfully."
                }
            }
            res.send(response);
        });
    } catch (error) {
        //console.log("Error in set sidebar Ad : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.setVendorType = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body);
    if (!req.body.vendor_type || req.body.vendor_type == "") {
        return res.send({
            success: false,
            message: "Please enter vender type."
        });
    }
    try {
        new Vendor_type(req.body).save(function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                response = {
                    success: false,
                    message: "Error in save vender type."
                };
            } else {
                response = {
                    success: true,
                    message: "Your vender type created successfully."
                }
            }
            res.send(response);
        });
    } catch (error) {
        //console.log("Error in set vender type : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getVendorType = async (req, res) => {
    try {
        let getData = await Vendor_type.find({}).sort('vendor_type');
        //console.log("getData : ", getData);
        if (!getData) {
            return res.send({
                success: false,
                message: "Error in get data of vender type."
            });
        }
        return res.send({
            success: true,
            message: "get data of vender type.",
            getData: getData
        });
    } catch (error) {
        //console.log("Error in save vender type : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.setVendorPageListingAd = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body);
    if (!req.body.user_id || req.body.user_id == "") {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    // if (!req.body.category) {
    //   return res.send({
    //     success: false,
    //     message: "Please enter category"
    //   });
    // }
    try {
        var ImageArr = [];
        if (req.file != undefined) {
            ImageArr.push({
                src: 'uploads/' + req.file.filename,
                orgName: req.file.originalname,
            })
            req.body.ad_image = ImageArr;
        } else if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined') {
            ImageArr = req.body.uploadImageThrughAPK;
            req.body.ad_image = ImageArr;
        }
        // for date conversion
        ////console.log("type of start date : ",(req.body.start_date));
        ////console.log("type of start date : ",typeof(req.body.start_date));
        ////console.log("type of end date : ",(req.body.end_date));
        ////console.log("type of end date : ",typeof(req.body.end_date));
        // req.body.end_date = moment(req.body.end_date).utc().format();
        // req.body.start_date = moment(req.body.start_date).utc().format();
        //console.log("req body of advertisement : ", req.body);
        new Vendors_Page_Listing(req.body).save(function (err, seeData) {
            //console.log("seeData : ", err);
            if (err) {
                response = {
                    success: false,
                    message: "Error in post save vendor listing."
                };
            } else {
                response = {
                    success: true,
                    message: "Your vendor listing created successfully."
                }
            }
            res.send(response);
        });
    } catch (error) {
        //console.log("Error in set vendor listing : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.updateBannerAds = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    try {
        var ImageArr = [];
        if (req.file != undefined) {
            ImageArr.push({
                src: 'uploads/' + req.file.filename,
                orgName: req.file.originalname,
            })
            req.body.ad_image = ImageArr;
        } else if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined') {
            ImageArr = req.body.uploadImageThrughAPK;
            req.body.ad_image = ImageArr;
        }
        var updateData = await Banner_ad.findByIdAndUpdate(req.query.id, req.body);
        //console.log("update banner ad updated: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Banner Ad updated successfully."
        });
    } catch (error) {
        //console.log("Error in banner ad updated : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.updatePosterAds = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    try {
        var ImageArr = [];
        if (req.file != undefined) {
            ImageArr.push({
                src: 'uploads/' + req.file.filename,
                orgName: req.file.originalname,
            })
            req.body.ad_image = ImageArr;
        } else if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined') {
            ImageArr = req.body.uploadImageThrughAPK;
            req.body.ad_image = ImageArr;
        }
        var updateData = await Poster_ad.findByIdAndUpdate(req.query.id, req.body);
        //console.log("update poster ad updated: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Poster Ad updated successfully."
        });
    } catch (error) {
        //console.log("Error in banner ad updated : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.updateSidebarAds = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    try {
        var ImageArr = [];
        if (req.file != undefined) {
            ImageArr.push({
                src: 'uploads/' + req.file.filename,
                orgName: req.file.originalname,
            })
            req.body.ad_image = ImageArr;
        } else if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined') {
            ImageArr = req.body.uploadImageThrughAPK;
            req.body.ad_image = ImageArr;
        }
        var updateData = await Sidebar_ad.findByIdAndUpdate(req.query.id, req.body);
        //console.log("update banner ad updated: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Sidebar Ad updated successfully."
        });
    } catch (error) {
        //console.log("Error in sidebar ad updated : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.updateVendorAds = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    try {
        var ImageArr = [];
        if (req.file != undefined) {
            ImageArr.push({
                src: 'uploads/' + req.file.filename,
                orgName: req.file.originalname,
            })
            req.body.ad_image = ImageArr;
        } else if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined') {
            ImageArr = req.body.uploadImageThrughAPK;
            req.body.ad_image = ImageArr;
        }
        var updateData = await Vendors_Page_Listing.findByIdAndUpdate(req.query.id, req.body);
        //console.log("update banner ad updated: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Vendor Listing updated successfully."
        });
    } catch (error) {
        //console.log("Error in Vendor Listing updated : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};
// end api for advertisement

// start of user cohorts Api
exports.sendRequestForCohorts = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body)
    if (!req.body.sender_id || req.body.sender_id == "") {
        return res.send({
            success: false,
            message: "Please enter sender id."
        });
    }
    if (!req.body.receiver_id || req.body.receiver_id == "") {
        return res.send({
            success: false,
            message: "Please enter receiver id."
        });
    }
    try {
        // check for previous only post like       
        let checkPreviousRequest = await Request_for_cohorts.findOne({
            $or: [{
                sender_id: req.body.sender_id,
                receiver_id: req.body.receiver_id,
                status: {
                    $in: ['Accept', 'Pending']
                },
            }, {
                sender_id: req.body.receiver_id,
                receiver_id: req.body.sender_id,
                status: {
                    $in: ['Accept', 'Pending']
                },
            }],
        });
        if (checkPreviousRequest == null || checkPreviousRequest.length == 0) {
            req.body.status = 'Pending';
            req.body.read = false;
            //console.log("req body of comment like : ", req.body);
            new Request_for_cohorts(req.body).save(async function (err, result) {
                //console.log("room room", room);
                if (err) {
                    console.log("error :", err);
                    response = {
                        success: false,
                        error: true,
                        message: "Error in send request for cohorts."
                    };
                } else {
                    response = {
                        success: true,
                        message: "your request send successfully."
                    };
                }
                res.send(response);
            });
        } else {
            return res.send({
                success: false,
                message: "Your request is pending."
            });
        }
    } catch (error) {
        console.log("Error in send request for cohorts.", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};
exports.createUserCohortConnection = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body)
    if (!req.body.my_id || req.body.my_id == "") {
        return res.send({
            success: false,
            message: "Please enter my id."
        });
    }
    if (!req.body.receiver_id || req.body.receiver_id == "") {
        return res.send({
            success: false,
            message: "Please enter receiver id."
        });
    }
    try {
        // check for previous only post like       
        let finalResponse = {};
        // find and create my id cohort
        let checkMyIdPreviousCohort = await User_cohorts.findOne({
            my_id: req.body.my_id,
            status: 'Active'
        });
        if (checkMyIdPreviousCohort == null || checkMyIdPreviousCohort.length == 0) {
            console.log("ifff first");
            let createFormData = {
                my_id: req.body.my_id,
                status: 'Active',
                all_cohorts_user_id: [{
                    user_id: req.body.receiver_id
                }]
            }
            createUserCohort(createFormData, 1);
        } else {
            console.log("else first");
            // push cohort id in previous data
            updateUserCohort(checkMyIdPreviousCohort._id, req.body.receiver_id, 1, checkMyIdPreviousCohort.all_cohorts_user_id.length)
        }
        // find and create for receiver id cohort
        let checkReceiverIdPreviousCohort = await User_cohorts.findOne({
            my_id: req.body.receiver_id,
            status: 'Active'
        });
        if (checkReceiverIdPreviousCohort == null || checkReceiverIdPreviousCohort.length == 0) {
            console.log("iffff seconddddd");
            let createFormData = {
                my_id: req.body.receiver_id,
                status: 'Active',
                all_cohorts_user_id: [{
                    user_id: req.body.my_id
                }]
            }
            createUserCohort(createFormData, 2);
        } else {
            console.log("else secccccccc");
            // push cohort id in previous data
            updateUserCohort(checkReceiverIdPreviousCohort._id, req.body.my_id, 2, checkReceiverIdPreviousCohort.all_cohorts_user_id.length)
        }
        // create new group data method
        function createUserCohort(formdata, action) {
            new User_cohorts(formdata).save(async function (err, result) {
                //console.log("room room", room);
                if (err) {
                    console.log("error :", err);
                    response = {
                        success: false,
                        error: true,
                        message: "Error in create user cohorts."
                    };
                    res.send(response);
                } else if (action === 2) {
                    console.log("action 2222222222222 create");
                    response = {
                        success: true,
                        message: "Your new cohort connection created successfully."
                    };
                    res.send(response);
                }
            });
        }
        // update group data method
        async function updateUserCohort(previous_group_data_id, getRecevierId, action, all_cohort_member_count) {
            // first check usr cohort limit is 3000 or not
            if (all_cohort_member_count < 3000) {
                let updatePreviousPosterGroup = await User_cohorts.findByIdAndUpdate(previous_group_data_id, {
                    $push: {
                        all_cohorts_user_id: {
                            'user_id': getRecevierId
                        }
                    }
                });
                if (!updatePreviousPosterGroup) {
                    return res.send({
                        success: false,
                        message: "Error in create new cohort connection created successfully"
                    });
                } else if (action === 2) {
                    console.log("action 2222222222222 update");
                    return res.send({
                        success: true,
                        message: "Your new cohort connection created successfully."
                    });
                }
            } else {
                return res.send({
                    success: true,
                    message: "Your limit for cohort connection is 3000. Now you are cross the limit."
                });
            }
        }
    } catch (error) {
        console.log("Error in send request for cohorts.", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};
exports.setAcceptRejectResponseToCohort = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body)
    if (!req.body.action || req.body.action == "") {
        return res.send({
            success: false,
            message: "Please enter action."
        });
    }
    if (!req.body.request_id || req.body.request_id == "") {
        return res.send({
            success: false,
            message: "Please enter request id."
        });
    }
    try {
        // check for previous only post like       
        if (req.body.action != undefined) {
            updatePoertfolio = await Request_for_cohorts.updateOne({
                _id: req.body.request_id,
            }, {
                $set: {
                    "status": req.body.action
                }
            });
            if (!updatePoertfolio) {
                return res.send({
                    success: false,
                    message: "Error in update cohort request response."
                });
            } else {
                return res.send({
                    success: true,
                    message: "Your response updated successfully."
                });
            }
        }
    } catch (error) {
        console.log("Error in send request for cohorts.", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};
exports.getAllCohortsByUserId = async (req, res) => {
    // console.log("user bodyyyyyyyyyyyy : ", req.body)
    if (!req.body.my_id || req.body.my_id == "") {
        return res.send({
            success: false,
            message: "Please enter my id."
        });
    }
    try {
        let getAllCohort = await User_cohorts.find({
            my_id: req.body.my_id,
            status: 'Active'
        }).populate('all_cohorts_user_id.user_id');
        if (req.body.current_login_user_id != "" && req.body.current_login_user_id != undefined && req.body.current_login_user_id != 'undefined') {
            // console.log("ifffffff outer", req.body.current_login_user_id);
            // find all cohort member id of cuurent login user
            let getAllCohortOfCurrentUser = await User_cohorts.findOne({
                my_id: req.body.current_login_user_id,
                status: 'Active'
            }).select('all_cohorts_user_id');
            let getCurrentUserMembersId = getAllCohortOfCurrentUser.all_cohorts_user_id;
            // console.log("getAllCohortOfCurrentUser",getAllCohortOfCurrentUser);
            // console.log("getCurrentUserMembersId",getCurrentUserMembersId);
            return res.send({
                success: true,
                message: "get all user cohorts.",
                getAllCohort: getAllCohort,
                getCurrentUserMembersId: getCurrentUserMembersId
            })
        } else {
            return res.send({
                success: true,
                message: "get all user cohorts.",
                getAllCohort: getAllCohort,
                getCurrentUserMembersId: []
            })
        }
    } catch (error) {
        console.log("Error in get all cohorts.", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};
exports.getOneUserHadCohortsOrNot = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body)
    if (!req.body.user_id || req.body.user_id == "") {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    if (!req.body.receiver_id || req.body.receiver_id == "") {
        return res.send({
            success: false,
            message: "Please enter receiver id."
        });
    }
    try {
        // check for previous only post like       
        let checkPreviousRequest = await Request_for_cohorts.find({
            $or: [{
                sender_id: req.body.user_id,
                receiver_id: req.body.receiver_id,
                status: {
                    $in: ['Accept', 'Pending']
                },
            }, {
                sender_id: req.body.receiver_id,
                receiver_id: req.body.user_id,
                status: {
                    $in: ['Accept', 'Pending']
                },
            }],
        });
        if (checkPreviousRequest == null || checkPreviousRequest.length == 0) {
            return res.send({
                success: false,
                message: "User have not any cnnection to user."
            });
        } else {
            return res.send({
                success: true,
                checkPreviousRequest: checkPreviousRequest,
                message: "You have cnnection or pending request to user."
            });
        }
    } catch (error) {
        console.log("Error in send request for cohorts.", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};
exports.getAllPostingOfMeAndMyCohorts = async (req, res) => {
    if (!req.body.user_id || req.body.user_id == "") {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    try {
        let showPostToUser = [];
        let populateQuery = [{
            path: 'user_id',
            select: 'firstname lastname _id profile_pic'
        }];
        let myAllPosting = await I_am_buyer.find({
            user_id: req.body.user_id,
            showPostToUser: {
                $in: ['Public', 'Cohorts', 'Private']
            },
            status: 'Active'
        }).populate(populateQuery);
        // for like and comment count
        for (let ijk = 0; ijk < myAllPosting.length; ijk++) {
            myAllPosting[ijk].All_like_count = await getCoverLikeCount(myAllPosting[ijk]._id);
            myAllPosting[ijk].All_comment_count = await getCoverCommentCount(myAllPosting[ijk]._id);
        }
        let checkMyPostingMedia = await Post_media.find({
            user_id: req.body.user_id,
            status: 'Active'
        });
        // find all my cohorts posting
        let getAllMyCohortsId = await User_cohorts.findOne({
            my_id: req.body.user_id,
            status: 'Active'
        }).select('all_cohorts_user_id');
        let all_cohort_posting = [];
        let all_cohort_posting_media = [];
        let all_cohort_id = getAllMyCohortsId.all_cohorts_user_id;
        for (let kk = 0; kk < all_cohort_id.length; kk++) {
            //get all posting data    
            let getAllPosting = await I_am_buyer.find({
                user_id: all_cohort_id[kk].user_id,
                showPostToUser: {
                    $in: ['Public', 'Cohorts']
                },
                status: 'Active'
            }).populate(populateQuery);
            // for like and comment count
            for (let pp = 0; pp < getAllPosting.length; pp++) {
                getAllPosting[pp].All_like_count = await getCoverLikeCount(getAllPosting[pp]._id);
                getAllPosting[pp].All_comment_count = await getCoverCommentCount(getAllPosting[pp]._id);
            }
            if (getAllPosting.length > 0) {
                all_cohort_posting.push(getAllPosting);
            }
            // for user post media
            let checkMediaOfCohort = await Post_media.find({
                user_id: all_cohort_id[kk].user_id,
                status: 'Active'
            });
            if (checkMediaOfCohort.length > 0) {
                all_cohort_posting_media.push(checkMediaOfCohort)
            }
        }
        let MergeCohortPosting = [].concat.apply([], all_cohort_posting);
        let finalAllCohortPosting = myAllPosting.concat(MergeCohortPosting);
        let MergeMediaCohortPosting = [].concat.apply([], all_cohort_posting_media);
        let finalAllMediaCohortPosting = checkMyPostingMedia.concat(MergeMediaCohortPosting);
        finalAllCohortPosting.sort(function (a, b) {
            return new Date(b.created_at) - new Date(a.created_at);
        });
        finalAllMediaCohortPosting.sort(function (a, b) {
            return new Date(b.created_at) - new Date(a.created_at);
        });
        return res.send({
            success: true,
            message: "All user post data",
            BuyerData: finalAllCohortPosting,
            postMediaData: finalAllMediaCohortPosting
        });
    } catch (error) {
        console.log("Error in send request for cohorts.", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};
exports.unfriendCohortUser = async (req, res) => {
    if (!req.body.my_id || req.body.my_id == "") {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    if (!req.body.receiver_id || req.body.receiver_id == "") {
        return res.send({
            success: false,
            message: "Please enter receiver id."
        });
    }
    try {
        // check for previous only post like       
        let removeCohortFromMyId = await User_cohorts.updateOne({
            my_id: req.body.my_id
        }, {
            $pull: {
                "all_cohorts_user_id": {
                    user_id: req.body.receiver_id
                }
            }
        });
        let removeCohortFromRecevierId = await User_cohorts.updateOne({
            my_id: req.body.receiver_id
        }, {
            $pull: {
                "all_cohorts_user_id": {
                    user_id: req.body.my_id
                }
            }
        });
        // remove request from table
        let checkPreviousRequest = await Request_for_cohorts.findOneAndDelete({
            $or: [{
                sender_id: req.body.my_id,
                receiver_id: req.body.receiver_id,
                status: 'Accept'
            }, {
                sender_id: req.body.receiver_id,
                receiver_id: req.body.my_id,
                status: 'Accept'
            }],
        });
        // checkPreviousRequest
        if (removeCohortFromMyId == null || removeCohortFromMyId.length == 0 || checkPreviousRequest == null) {
            return res.send({
                success: false,
                message: "Error in unfriend cohort."
            });
        } else if (removeCohortFromRecevierId == null || removeCohortFromRecevierId.length == 0) {
            return res.send({
                success: false,
                message: "Error in unfriend cohort."
            });
        } else {
            return res.send({
                success: true,
                message: "You have unfriend cohort to user succssfully."
            });
        }
    } catch (error) {
        console.log("Error in unfriend for cohorts.", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};
exports.searchListCohortOfLoginUser = async (req, res) => {
    //console.log("req body search members : ", req.body);
    try {
        if (!req.body.user_id || req.body.user_id == "") {
            return res.send({
                success: false,
                message: "Please enter user id."
            });
        }
        // find all my cohorts posting
        let getAllMyCohortsId = await User_cohorts.findOne({
            my_id: req.body.user_id,
            status: 'Active'
        }).select('all_cohorts_user_id');
        let getData = [];
        if (getAllMyCohortsId != null && getAllMyCohortsId.length != 0) {
            if (getAllMyCohortsId.all_cohorts_user_id.length != 0) {
                let all_cohort_id = getAllMyCohortsId.all_cohorts_user_id.map(a => a.user_id);
                let searchMemberText = req.body.searchMember.trim();
                //console.log("searchMemberText", searchMemberText);
                if (searchMemberText != "") {
                    //console.log("searchMemberText SEARCH");
                    let checkSpace = searchMemberText.split(' ');
                    //console.log("checkSpace : ", checkSpace);
                    if (checkSpace[1]) {
                        //console.log("ifff checkspace");
                        getData = await User.find({
                            $and: [{
                                "$expr": {
                                    "$regexMatch": {
                                        "input": {
                                            "$concat": ["$firstname", " ", "$lastname"]
                                        },
                                        "regex": "a", //Your text search here
                                        "options": "i"
                                    }
                                }
                            }, {
                                profile_public: 'Yes',
                                verfied: 'Yes',
                                _id: {
                                    $in: all_cohort_id
                                }
                            }]
                        });
                    } else {
                        //console.log("elseeeee checkspace");
                        getData = await User.find({
                            $and: [{
                                $or: [{
                                        firstname: {
                                            $regex: ".*" + searchMemberText + ".*",
                                            '$options': 'i'
                                        }
                                    },
                                    {
                                        lastname: {
                                            $regex: ".*" + searchMemberText + ".*",
                                            '$options': 'i'
                                        }
                                    }
                                ]
                            }, {
                                profile_public: 'Yes',
                                verfied: 'Yes',
                                _id: {
                                    $in: all_cohort_id
                                }
                            }]
                        });
                    }
                } else {
                    getData = [];
                }
            } else {
                getData = [];
            }
        } else {
            getData = [];
        }
        //console.log("getData : ", getData)
        if (!getData) {
            return res.send({
                success: false,
                message: "Error in search members"
            });
        }
        return res.send({
            success: true,
            message: "Search members",
            dataCount: getData.length,
            getData: getData
        });
    } catch (error) {
        //console.log("Error in search members", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};
// end of user cohorts api
// start api for like and comment on post
exports.postLikeComment = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body)
    if (!req.body.post_id || req.body.post_id == "") {
        return res.send({
            success: false,
            message: "Please enter post id."
        });
    }
    if (!req.body.user_id || req.body.user_id == "") {
        return res.send({
            success: false,
            message: "Please enter user id"
        });
    }
    if (!req.body.action_type || req.body.action_type == "") {
        return res.send({
            success: false,
            message: "Please enter your action type."
        });
    }
    try {
        let todayDate = new Date().toLocaleDateString('en-GB');
        let todayTime = new Date().toLocaleTimeString();
        req.body.action_time = todayTime;
        req.body.action_date = todayDate;
        // check for previous only post like

        // var preCheckSinglePost = await Buyer_post_like_comment.findOneAndUpdate({
        //   post_id: req.body.post_id,
        //   user_id: req.body.user_id,
        //   status: 'Inactive',
        //   action_type: '1',
        //   post_media_id: {
        //     '$exists': false
        //   }
        // }, {
        //   $set: {
        //     status: 'Active'
        //   }
        // });
        // //console.log("check previous like data : ", preCheckSinglePost);
        // if (preCheckSinglePost != null) {
        //   return res.send({
        //     success: true,
        //     message: "Your like updated posted successfully."
        //   });
        // }
        // check for previous post and media like
        // if (req.body.post_media_id != "" && req.body.action_type == '1') {
        //   let preCheckMediaPost = await Buyer_post_like_comment.findOneAndUpdate({
        //     post_id: req.body.post_id,
        //     user_id: req.body.user_id,
        //     status: 'Inactive',
        //     action_type: '1',
        //     post_media_id: req.body.post_media_id
        //   }, {
        //     $set: {
        //       status: 'Active'
        //     }
        //   });
        //   //console.log("check previous like data : ", preCheckMediaPost);
        //   if (preCheckMediaPost != null) {
        //     return res.send({
        //       success: true,
        //       message: "Your like media updated posted successfully."
        //     });
        //   }
        // }
        //console.log("req body of comment like : ", req.body);
        let userData = new Buyer_post_like_comment(req.body).save();
        if (!userData) {
            return res.send({
                success: false,
                message: "Error in post like / comment."
            });
        }
        return res.send({
            success: true,
            message: "Your like / comment posted successfully."
        });

    } catch (error) {
        //console.log("Error in set user", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getLikeOfPost = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body)
    if (!req.body.post_id || req.body.post_id == "") {
        return res.send({
            success: false,
            message: "Please enter post id."
        });
    }
    try {
        let checkLikeData = await Buyer_post_like_comment.find({
            post_id: req.body.post_id,
            status: 'Active',
            action_type: '1',
            post_media_id: {
                '$exists': false
            }
        }).populate('user_id');

        let checkCommentData = await Buyer_post_like_comment.find({
            post_id: req.body.post_id,
            status: 'Active',
            action_type: '2',
            post_media_id: {
                '$exists': false
            }
        }).populate('user_id');

        let checkLikeCount = await Buyer_post_like_comment.find({
            post_id: req.body.post_id,
            action_type: '1',
            status: 'Active',
            post_media_id: {
                '$exists': false
            }
        }).count();

        let checkCommentCount = await Buyer_post_like_comment.find({
            post_id: req.body.post_id,
            action_type: '2',
            status: 'Active',
            post_media_id: {
                '$exists': false
            }
        }).count();

        return res.send({
            success: true,
            message: "Get likes of post.",
            likeData: checkLikeData,
            CommentData: checkCommentData,
            likeCount: checkLikeCount,
            CommentCount: checkCommentCount
        });
    } catch (error) {
        //console.log("Error in set user", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getMediaLikeOfPost = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body)
    if (!req.body.post_id || req.body.post_id == "") {
        return res.send({
            success: false,
            message: "Please enter post id."
        });
    }
    if (!req.body.post_media_id || req.body.post_media_id == "") {
        return res.send({
            success: false,
            message: "Please enter post media id."
        });
    }
    try {
        let checkLikeData = await Buyer_post_like_comment.find({
            post_id: req.body.post_id,
            post_media_id: req.body.post_media_id,
            status: 'Active',
            action_type: '1',
        }).populate('user_id');

        let checkCommentData = await Buyer_post_like_comment.find({
            post_id: req.body.post_id,
            post_media_id: req.body.post_media_id,
            status: 'Active',
            action_type: '2',
        }).populate('user_id');

        let checkLikeCount = await Buyer_post_like_comment.find({
            post_id: req.body.post_id,
            post_media_id: req.body.post_media_id,
            action_type: '1',
            status: 'Active'
        }).count();

        let checkCommentCount = await Buyer_post_like_comment.find({
            post_id: req.body.post_id,
            post_media_id: req.body.post_media_id,
            action_type: '2',
            status: 'Active'
        }).count();
        return res.send({
            success: true,
            message: "Get likes of post.",
            medialikeData: checkLikeData,
            mediaCommentData: checkCommentData,
            medialikeCount: checkLikeCount,
            mediaCommentCount: checkCommentCount
        });
    } catch (error) {
        //console.log("Error in get media post like and comment", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getUserLikeData = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body)
    if (!req.body.user_id || req.body.user_id == "") {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    try {
        let LikeDataByUserId = await Buyer_post_like_comment.find({
            user_id: req.body.user_id,
            status: 'Active',
            action_type: '1',
            post_media_id: {
                '$exists': false
            }
        });

        return res.send({
            success: true,
            message: "Get likes of post by user id.",
            LikeDataByUserId: LikeDataByUserId,
        });

    } catch (error) {
        //console.log("Error in set user", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.unlikeUserPost = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body)
    if (!req.body.post_id || req.body.post_id == "") {
        return res.send({
            success: false,
            message: "Please enter post id."
        });
    }
    if (!req.body.user_id || req.body.user_id == "") {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    try {
        // let LikeDataByUserId = await Buyer_post_like_comment.findOneAndUpdate({
        //   user_id: req.body.user_id,
        //   post_id: req.body.post_id,
        //   status: 'Active',
        //   action_type: '1',
        //   post_media_id: {
        //     '$exists': false
        //   }
        // }, {
        //   $set: {
        //     status: 'Inactive'
        //   }
        // });
        let LikeDataByUserId = await Buyer_post_like_comment.deleteOne({
            user_id: req.body.user_id,
            post_id: req.body.post_id,
            status: 'Active',
            action_type: '1',
            post_media_id: {
                '$exists': false
            }
        });
        //console.log("remove like data : ", LikeDataByUserId);
        if (!LikeDataByUserId) {
            return res.send({
                success: false,
                message: "Error in removee like of user."
            });
        }
        return res.send({
            success: true,
            message: "You unlike this post.",
        });
    } catch (error) {
        //console.log("Error in remove like of user", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getUserMediaLikeData = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body)
    if (!req.body.user_id || req.body.user_id == "") {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    try {
        let MediaLikeDataByUserId = await Buyer_post_like_comment.find({
            user_id: req.body.user_id,
            status: 'Active',
            action_type: '1',
            post_media_id: {
                '$exists': true
            }
        });

        return res.send({
            success: true,
            message: "Get likes of media post by user id.",
            MediaLikeDataByUserId: MediaLikeDataByUserId,
        });

    } catch (error) {
        //console.log("Error in Get likes of media post by user id", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.unlikeUserMediaPost = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy unlikeeeeeeeee modeia body : ", req.body)
    if (!req.body.post_id || req.body.post_id == "") {
        return res.send({
            success: false,
            message: "Please enter post id."
        });
    }
    if (!req.body.post_media_id || req.body.post_media_id == "") {
        return res.send({
            success: false,
            message: "Please enter post media id."
        });
    }
    if (!req.body.user_id || req.body.user_id == "") {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    try {
        // let LikeDataByUserId = await Buyer_post_like_comment.findOneAndUpdate({
        //   post_id: req.body.post_id,
        //   user_id: req.body.user_id,
        //   status: 'Active',
        //   action_type: '1',
        //   post_media_id: req.body.post_media_id
        // }, {
        //   $set: {
        //     status: 'Inactive'
        //   }
        // });
        let LikeDataByUserId = await Buyer_post_like_comment.deleteOne({
            post_id: req.body.post_id,
            user_id: req.body.user_id,
            action_type: '1',
            post_media_id: req.body.post_media_id
        });
        //console.log("remove media like data mediaaaaaaaaaaa : ", LikeDataByUserId);
        if (!LikeDataByUserId) {
            return res.send({
                success: false,
                message: "Error in remove media like of user."
            });
        }
        return res.send({
            success: true,
            message: "You unlike this media post.",
        });
    } catch (error) {
        //console.log("Error in remove like of user", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.setVerifyLink = async (req, res) => {
    //console.log("in vrify user profile methodddddddddddddddd : ", req.query.tokenVerify);
    if (!req.query.tokenVerify) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    let checkAlready = await User.find({
        username: req.query.tokenVerify
    }).select('verfied');
    if (checkAlready.verfied == 'Yes') {
        return res.send({
            success: false,
            message: "Your email address already verified."
        });
    }
    var userIDD = "";
    let getDataId = await User.find({
        username: req.query.tokenVerify
    }).select('email');
    //console.log("getDataIdddddddddddddddddd ", getDataId);
    getDataId.forEach(element => {
        userIDD = element._id;
    });
    //console.log("getDataIdddddddddddddddddd ", userIDD);
    try {
        let verifyBody = {
            verfied: 'Yes',
            wcx_rewards_tokens: 10000
        }
        var updateData = await User.findByIdAndUpdate(userIDD, verifyBody);
        //console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: "Error in verify email address."
            });
        }
        // create new wcx history   
        let dataForWcxToken = {
            user_id: userIDD,
            date: Date.now(),
            token_price: 10000,
            event_name: 'Registration'
        }
        new Wcx_rewards_tokens_history(dataForWcxToken).save(function (err, resultOfWcxToken) {
            //console.log("Error in create new wcx history  : ", err);
            if (err) {
                response = {
                    success: false,
                    error: true,
                    message: "Error in verify email address.",
                };
                res.send(response);
            }
        });
        return res.send({
            success: true,
            message: "Your email address has been verified successfully!"
        });
    } catch (error) {
        //console.log("User Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.setContactUsMsg = async (req, res) => {
    try {
        //console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
        if (!req.body.name || !req.body.email || !req.body.address) {
            return res.send({
                success: false,
                message: "Please enter required fields."
            });
        }

        /**node mailer code*/

        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            type: "SMTP",
            host: "smtp.gmail.com",
            secure: true,
            auth: {
                user: 'wecoowntest@gmail.com',
                pass: 'wecon123'
            }
        });

        var mailOptions = {
            from: 'WeCoOwn <wecoowntest@gmail.com>',
            to: 'karishmasoni396@gmail.com',
            subject: 'Message from WeCoOwn Website',
            html: `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <style>
                        *{
                            box-sizing: border-box;
                        }            
                        body {
                            font-family: Arial, Helvetica, sans-serif;
                        }            
                        /* Style the header */
                        header,footer{
                            background-color: #0b3655;
                            padding: 10px;
                            text-align: center;
                            color: white;
                        }
                    </style>
                </head>
                <body>
                    <header>
                        <h3 style="margin: 0px;">WeCoOwn</h3>
                    </header>            
                    <section style="background: #f1f1f178;padding-bottom: 10px;">  
                        <div style="text-align:center;">
                            <a href="https://wecoown.com/" onclick="window.open(this.href,this.href); return false"><img src="https://wecoown.com/assets/images/Original-1.png" width="110px" style="margin-top: 20px;"></a>
                            <p style="padding: 15px 15%;margin: 0;font-weight: 600;font-style: italic;">Community Platform | Finding Potential Co-Owners | Buy and Manage Assets or Properties Together</p>
                            <div style="margin: 0px 20%;background: orange;padding: 10px;color: white;">
                                <h3>Hi, WeCoOwn</h3>
                                <p>This is message from contact us WeCoOwn!<br>
                                    <strong>Full Name = ` + req.body.name + `<br/>
                                    Email Address = ` + req.body.email + `<br>
                                    Description = ` + req.body.address + `</strong> 
                                </p>
                                <p>If you received this email by mistake, simply delete it.</p>
                                <p>Thanks,</p>
                                <p>WeCoOwn Support<p>
                                <br>
                            </div>
                        </div>                
                    </section>
                    <footer>
                        <div>
                            <a href="https://www.facebook.com/wecoown" onclick="window.open(this.href,this.href); return false">
                                <img src="https://wecoown.com/assets/images/email-fb-icon.jpg">
                            </a>                    
                            <a href="https://www.instagram.com/wecoown/" onclick="window.open(this.href,this.href); return false">
                                <img src="https://wecoown.com/assets/images/email-insta-icon.jpg">
                            </a>
                            <a href="https://www.linkedin.com/company/wecoown/" onclick="window.open(this.href,this.href); return false">
                                <img src="https://wecoown.com/assets/images/email-linkedin-icon.jpg">
                            </a>
                            <a href="https://twitter.com/WeCoOwn" onclick="window.open(this.href,this.href); return false">
                                <img src="https://wecoown.com/assets/images/email-twitter-icon.jpg" style="margin-left: -3px;">
                            </a>
                            <a href="https://www.youtube.com/channel/UCOwKKGKaK2DWkiZJi9-CfQA" onclick="window.open(this.href,this.href); return false">
                                <img src="https://wecoown.com/assets/images/email-youtube-icon.jpg">
                            </a>
                            <a href="https://medium.com/wecoown" onclick="window.open(this.href,this.href); return false">
                                <img src="https://wecoown.com/assets/images/email-medium-icon.jpg" style="margin-bottom: 4px; margin-left: -5px; height: 45;">
                            </a>
                            <br>
                            <a href="https://wecoown.com/terms-conditions" style="color: white;" onclick="window.open(this.href,this.href); return false">Terms & Conditions</a> |
                            <a href="https://wecoown.com/privacy-policy" style="color: white;" onclick="window.open(this.href,this.href); return false">Privacy Policy</a><br>
                            <p>© 2020 WeCoOwn, Inc. All rights reserved.</p>
                        </div>
                    </footer>
                </body>
            </html>`
            // text: "Name = " + req.body.name + "<br/><br/>" +
            //     "Email = " + req.body.email + "<br><br/>" +
            //     "Description = " + req.body.address,
            // html: "Full Name = " + req.body.name + "<br/><br/>" +
            //     "Email Address = " + req.body.email + "<br><br/>" +
            //     "Description = " + req.body.address
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                //console.log(error);
                return res.send({
                    success: false,
                    message: error
                });
            } else {
                //console.log('contact us Email sent');
                return res.send({
                    success: true,
                    message: "Your message has been sent successfully."
                });
            }
        });

        /**node mailer code */

    } catch (error) {
        //console.log("Error in send message", error);
        return res.send({
            success: false,
            message: "Error in send message"
        });
    }
};

exports.setNewsSubscribe = async (req, res) => {
    try {
        //console.log("news subscribe req body : ", req.body)
        if (!req.body.name || !req.body.email) {
            return res.send({
                success: false,
                message: "Please enter required fields."
            });
        }
        if (!req.body.website_name) {
            return res.send({
                success: false,
                message: "Please enter website name."
            });
        }
        let userCheck = await News_subcribe_user.findOne({
            "email": {
                $regex: "^" + req.body.email,
                "$options": "i"
            }
        });
        //console.log("usercheck : ", userCheck);
        if (userCheck != null) {
            if (userCheck.email == req.body.email) {
                return res.send({
                    success: false,
                    message: "Your email is already subscribed."
                });
            }
        }
        if (req.body.website_name === "WeCoOwn") {
            /**node mailer code*/
            var nodemailer = require('nodemailer');
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                type: "SMTP",
                host: "smtp.gmail.com",
                secure: true,
                auth: {
                    user: 'wecoowntest@gmail.com',
                    pass: 'wecon123'
                }
            });
            // let urlMerge = 'http://localhost:4200/verifyEmailLink?VerifyNewsSubscription=' + req.body.name;
            let urlMerge = 'https://wecoown.com/verifyEmailLink?VerifyNewsSubscription=' + req.body.name;
            var mailOptions = {
                from: 'WeCoOwn <wecoowntest@gmail.com>',
                to: 'karishmasoni396@gmail.com,' + req.body.email + '',
                subject: 'Message from WeCoOwn Website for News Subscription.',
                html: `<!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <style>
                            *{
                                box-sizing: border-box;
                            }            
                            body {
                                font-family: Arial, Helvetica, sans-serif;
                            }            
                            /* Style the header */
                            header,footer{
                                background-color: #0b3655;
                                padding: 10px;
                                text-align: center;
                                color: white;
                            }
                        </style>
                    </head>
                    <body>
                        <header>
                            <h3 style="margin: 0px;">WeCoOwn</h3>
                        </header>            
                        <section style="background: #f1f1f178;padding-bottom: 10px;">  
                            <div style="text-align:center;">
                                <a href="https://wecoown.com/" onclick="window.open(this.href,this.href); return false"><img src="https://wecoown.com/assets/images/Original-1.png" width="110px" style="margin-top: 20px;"></a>
                                <p style="padding: 15px 15%;margin: 0;font-weight: 600;font-style: italic;">Community Platform | Finding Potential Co-Owners | Buy and Manage Assets or Properties Together</p>
                                <div style="margin: 0px 20%;background: orange;padding: 10px;color: white;">
                                    <h3>Hi, &nbsp;` + req.body.name + `</h3>
                                    <p>Thanks for subscribing to our newsletter! We need a little more information to complete your newsletter subscription, including confirmation of your email address. Click below to confirm your email address : 
                                        <a href="` + urlMerge + `"><i><strong>` + urlMerge + `</strong></i></a>.
                                    </p>
                                    <p>If you received this email by mistake, simply delete it.</p>                          
                                    <p>Thanks,</p>
                                    <p>WeCoOwn Support<p>
                                    <br>
                                </div>
                            </div>                
                        </section>
                        <footer>
                            <div>
                                <a href="https://www.facebook.com/wecoown" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-fb-icon.jpg">
                                </a>                    
                                <a href="https://www.instagram.com/wecoown/" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-insta-icon.jpg">
                                </a>
                                <a href="https://www.linkedin.com/company/wecoown/" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-linkedin-icon.jpg">
                                </a>
                                <a href="https://twitter.com/WeCoOwn" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-twitter-icon.jpg" style="margin-left: -3px;">
                                </a>
                                <a href="https://www.youtube.com/channel/UCOwKKGKaK2DWkiZJi9-CfQA" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-youtube-icon.jpg">
                                </a>
                                <a href="https://medium.com/wecoown" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-medium-icon.jpg" style="margin-bottom: 4px; margin-left: -5px; height: 45;">
                                </a>
                                <br>
                                <a href="https://wecoown.com/terms-conditions" style="color: white;" onclick="window.open(this.href,this.href); return false">Terms & Conditions</a> |
                                <a href="https://wecoown.com/privacy-policy" style="color: white;" onclick="window.open(this.href,this.href); return false">Privacy Policy</a><br>
                                <p>© 2020 WeCoOwn, Inc. All rights reserved.</p>
                            </div>
                        </footer>
                    </body>
                </html>`
                // html: '<div style="background-color:#f6f8f1; padding:15px; font-size: 20px;font-family: sans-serif; ">' +
                //     '<div style="background-color:white;padding:20px;margin:10px;">' +
                //     '<h3>Hi, &nbsp;' + req.body.name + '</h3><br>' +
                //     '<p>Thanks for subscribing to our newsletter! We need a little more information to complete your newsletter subscription, including confirmation of your email address. Click below to confirm your email address : <a href="' + urlMerge + '"><i><strong>' + urlMerge + '</strong></i></a>.</p>' +
                //     '<p>If you received this email by mistake, simply delete it.</p><br><p>Thanks,</p><p>WeCoOwn Support<p><br>' +
                //     '</div>' +
                //     '</div>'
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    //console.log(error);
                    return res.send({
                        success: false,
                        message: error
                    });
                } else {
                    //console.log('News Subscription Email sent');
                    return res.send({
                        success: true,
                        message: "Thank you for subscribing our updates and news. An activation link has been sent to your email inbox for email address confirmation."
                    });
                }
            });
            /**node mailer code */
        } else if (req.body.website_name === "WePropertyowners") {
            /**node mailer code*/
            let employeeEmail = req.body.email;
            var nodemailer = require('nodemailer');
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                type: "SMTP",
                host: "smtp.gmail.com",
                secure: true,
                auth: {
                    user: 'wepropertyowner@gmail.com',
                    pass: 'wepo9876'
                }
            });

            let urlMerge = 'https://wepropertyowners.com/verifyEmailLink?VerifyNewsSubscription=' + req.body.name;
            // let urlMerge = req.protocol + '://'+ req.get('host') + '/verifyEmailLink?tokenVerify=' + req.body.username;
            // let logoImageUrl = 
            //console.log("uerl mergerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr : ", urlMerge);
            var mailOptions = {
                from: 'WePropertyowners <wepropertyowner@gmail.com>',
                to: 'karishmasoni396@gmail.com,' + req.body.email + '',
                subject: 'WePropertyowners',
                html: `<!DOCTYPE html>
               <html lang="en">
                   <head>
                       <meta charset="utf-8">
                       <meta name="viewport" content="width=device-width, initial-scale=1">
                       <style>
                           *{
                               box-sizing: border-box;
                           }            
                           body {
                               font-family: Arial, Helvetica, sans-serif;
                           }            
                           /* Style the header */
                           header,footer{
                               background-color: #0b3655;
                               padding: 10px;
                               text-align: center;
                               color: white;
                           }
                       </style>
                   </head>
                   <body>
                       <header>
                           <h3 style="margin: 0px;">WePropertyowners</h3>
                       </header>            
                       <section style="background: #f1f1f178;padding-bottom: 10px;">  
                           <div style="text-align:center;">
                               <a href="http://wepropertyowners.com/" onclick="window.open(this.href,this.href); return false"><img src="http://wepropertyowners.com/assets/images/Trans-1.png" width="110px" style="margin-top: 20px;"></a>
                               <p style="padding: 15px 15%;margin: 0;font-weight: 600;font-style: italic;">Sale and lease listings platform for properties and assets</p>
                               <div style="margin: 0px 20%;background: orange;padding: 10px;color: white;">   
                                    <h3>Hi, &nbsp;` + req.body.name + `</h3>
                                    <p>Thanks for subscribing to our newsletter! We need a little more information to complete your newsletter subscription, including confirmation of your email address. Click below to confirm your email address : 
                                        <a href="` + urlMerge + `"><i><strong>` + urlMerge + `</strong></i></a>.
                                    </p>
                                   <p>If you have problems, please paste the above URL into your web browser.</p>                                 
                                   <p>If you received this email by mistake, simply delete it.</p>                             
                                   <p>Thanks,</p>
                                   <p>WePropertyowners Support<p>
                                   <br>
                               </div>
                           </div>                
                       </section>
                       <footer>
                           <div>
                               <a href="https://www.facebook.com/WePropertyOwners/" onclick="window.open(this.href,this.href); return false">
                                   <img src="http://wepropertyowners.com/assets/images/email-fb-icon.jpg">
                               </a>                    
                               <a href="https://www.instagram.com/wepropertyowners/" onclick="window.open(this.href,this.href); return false">
                                   <img src="http://wepropertyowners.com/assets/images/email-insta-icon.jpg">
                               </a>
                               <a href="https://www.linkedin.com/company/wepropertyowners" onclick="window.open(this.href,this.href); return false">
                                   <img src="http://wepropertyowners.com/assets/images/email-linkedin-icon.jpg">
                               </a>
                               <a href="https://twitter.com/WePropOwners?s=09" onclick="window.open(this.href,this.href); return false">
                                   <img src="http://wepropertyowners.com/assets/images/email-twitter-icon.jpg" style="margin-left: -3px;">
                               </a>
                               <a href="https://www.youtube.com/channel/UCOwKKGKaK2DWkiZJi9-CfQA" onclick="window.open(this.href,this.href); return false">
                                   <img src="http://wepropertyowners.com/assets/images/email-youtube-icon.jpg">
                               </a>
                               <a href="https://medium.com/wecoown" onclick="window.open(this.href,this.href); return false">
                                   <img src="http://wepropertyowners.com/assets/images/email-medium-icon.jpg" style="margin-bottom: 4px; margin-left: -5px; height: 45;">
                               </a>
                               <br>
                               <a href="http://wepropertyowners.com/terms-conditions" style="color: white;" onclick="window.open(this.href,this.href); return false">Terms & Conditions</a> |
                               <a href="http://wepropertyowners.com/privacy-policy" style="color: white;" onclick="window.open(this.href,this.href); return false">Privacy Policy</a><br>
                               <p>© 2020 WeCoOwn, Inc. All rights reserved.</p>
                           </div>
                       </footer>
                   </body>
               </html>`
                // html: '<div style="background-color:#f6f8f1;padding:15px;font-size: 18px;font-family: sans-serif; ">' +
                //     '<div style="background-color:white;padding:20px;margin:10px;">' +
                //     '<h3>Hi, &nbsp;' + req.body.username + '</h3><br>' +
                //     '<p>Thanks for getting started with WePropertyowners!<br> We need a little more information to complete your registration, including confirmation of your email address. Click below to confirm your email address : <a href="' + urlMerge + '"><i><strong>' + urlMerge + '</strong></i></a>.</p> ' +
                //     ' <p>If you have problems, please paste the above URL into your web browser.</p>' +
                //     ' <br>' +
                //     '<p>Thanks,</p>' +
                //     ' <p>WePropertyowners Support<p>' +
                //     '<br>' +
                //     '</div>' +
                //     ' </div>'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    //console.log(error);
                    return res.send({
                        success: false,
                        message: "Something went wrong"
                    });
                } else {
                    //console.log('News Subscription Email sent');
                    return res.send({
                        success: true,
                        message: "Thank you for subscribing our updates and news. An activation link has been sent to your email inbox for email address confirmation."
                    });
                }
            });
        }
        let userData = new News_subcribe_user(req.body).save();
        if (!userData) {
            return res.send({
                success: false,
                message: "Error in news subscription"
            });
        }
    } catch (error) {
        //console.log("Error in news subscription", error);
        return res.send({
            success: false,
            message: "Error in news subscription."
        });
    }
};

exports.setConfirmNewsSubscribe = async (req, res) => {
    //console.log("in vrify user profile methodddddddddddddddd : ", req.query.VerifyNewsSubscription);
    if (!req.query.VerifyNewsSubscription) {
        return res.send({
            success: false,
            message: "Please send name in url."
        });
    }
    let checkAlready = await News_subcribe_user.find({
        name: req.query.VerifyNewsSubscription
    }).select('status');
    if (checkAlready.status == 'Active') {
        return res.send({
            success: false,
            message: "Your email address is already verified."
        });
    }
    var userIDD = "";
    let getDataId = await News_subcribe_user.find({
        name: req.query.VerifyNewsSubscription
    }).select('email');
    //console.log("getDataIdddddddddddddddddd ", getDataId);
    getDataId.forEach(element => {
        userIDD = element._id;
    });
    //console.log("getDataIdddddddddddddddddd ", userIDD);

    try {
        let verifyBody = {
            status: 'Active'
        }
        var updateData = await News_subcribe_user.findByIdAndUpdate(userIDD, verifyBody);
        //console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your email address has been verified successfully!"
        });
    } catch (error) {
        //console.log("news letter user Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getAllCategory = async (req, res) => {
    try {
        var categoryData = await AllCategory.find({}).sort('category_name');
        //console.log("all act ..: ", categoryData);
        if (!categoryData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "All category list",
            categoryData: categoryData,
        });
    } catch (error) {
        //console.log("Error in category", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.setCategory = async (req, res) => {
    if (!req.body.category_name || !req.body.description) {
        return res.send({
            success: false,
            message: messages.REQUIRED
        });
    }
    let imgArr = [];
    //console.log("imageeeeeeeeeee", req.files);
    try {
        req.files.forEach(element => {
            imgArr.push({
                src: 'uploads/' + element.filename,
                orgName: element.originalname,
            })
        });
        //console.log("alll property array photos : ", typeof (imgArr[0]));
        req.body.banner_image = imgArr[0];
        req.body.thumbnaill_image = imgArr[1];
        new AllCategory(req.body).save();
        return res.send({
            success: true,
            message: "Category added"
        });
    } catch (error) {
        //console.log("Error in category_name", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};
// for like count
async function getCoverLikeCount(getPostId) {
    let checkLikeCount = await Buyer_post_like_comment.find({
        post_id: getPostId,
        action_type: '1',
        status: 'Active',
        post_media_id: {
            '$exists': false
        }
    }).count();
    ////console.log("countttttttttttttttttttttt like of post : ", checkLikeCount);
    return checkLikeCount;
}
// for like count
async function getCoverCommentCount(getPostId) {
    let checkLikeCount = await Buyer_post_like_comment.find({
        post_id: getPostId,
        action_type: '2',
        status: 'Active',
        post_media_id: {
            '$exists': false
        }
    }).count();
    ////console.log("countttttttttttttttttttttt like of post : ", checkLikeCount);
    return checkLikeCount;
}
exports.getCategoryByNameAndBuyer = async (req, res) => {
    try {
        console.log("req body : ",req.body);
        if (!req.body.category_name) {
            return res.send({
                success: false,
                message: messages.REQUIRED
            });
        }
        if (!req.body.showPostToUser) {
            return res.send({
                success: false,
                message: "Please enter show post to user name."
            });
        }
        let categoryData = await AllCategory.find({
            category_name: req.body.category_name
        });
        console.log("categoryData : ",categoryData);
        // GET ALL PUBLIC POST
        let BuyerDataPublicAndCohort = await I_am_buyer.aggregate([{
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $match: {
                    category: req.body.category_name,
                    status: 'Active',
                    showPostToUser: 'Public',
                    user_id: {
                        $ne: null
                    },
                    "user.verfied": "Yes"
                }
            },
        ]).sort({
            '_id': -1
        });
        console.log("BuyerDataPublicAndCohort :",BuyerDataPublicAndCohort);
        let getMyPrivateAndCohortData = [];
        let all_my_cohort_posting = [];
        // get current user private and cohort post
        if (req.body.user_id != undefined && req.body.user_id != "") {
            //console.log("ifffffffff");
            getMyPrivateAndCohortData = await I_am_buyer.find({
                category: req.body.category_name,
                status: 'Active',
                showPostToUser: {
                    $in: ['Private', 'Cohorts']
                },
                user_id: req.body.user_id,
            }).sort({
                '_id': -1
            });
            console.log("getMyPrivateAndCohortData :",getMyPrivateAndCohortData);
            // get current user all cohort list
            let getAllMyCohortsId = await User_cohorts.findOne({
                my_id: req.body.user_id,
                status: 'Active'
            }).select('all_cohorts_user_id');
            console.log("getAllMyCohortsId : ",getAllMyCohortsId);
            if (getAllMyCohortsId != null) {                
                let all_cohort_id = getAllMyCohortsId.all_cohorts_user_id;
                // find all my cohorts posting
                for (let kk = 0; kk < all_cohort_id.length; kk++) {
                    //get all posting data    
                    let getAllPosting = await I_am_buyer.find({
                        category: req.body.category_name,
                        user_id: all_cohort_id[kk].user_id,
                        showPostToUser: {
                            $in: ['Cohorts']
                        },
                        status: 'Active'
                    });
                    console.log("getAllPosting : ",getAllPosting);
                    // for like and comment count
                    for (let pp = 0; pp < getAllPosting.length; pp++) {
                        getAllPosting[pp].All_like_count = await getCoverLikeCount(getAllPosting[pp]._id);
                        getAllPosting[pp].All_comment_count = await getCoverCommentCount(getAllPosting[pp]._id);
                    }
                    if (getAllPosting.length > 0) {
                        all_my_cohort_posting.push(getAllPosting);
                    }
                }
            }
        }
        let MergeCohortPosting = [].concat.apply([], all_my_cohort_posting);
        // merge 2 array
        let BuyerData;
        if (getMyPrivateAndCohortData != []) {
            BuyerData = BuyerDataPublicAndCohort.concat(getMyPrivateAndCohortData, MergeCohortPosting);
        } else {
            BuyerData = BuyerDataPublicAndCohort;
        }
        BuyerData.sort(function (a, b) {
            return new Date(b.created_at) - new Date(a.created_at);
        });
        // for like and comment count
        for (let ijk = 0; ijk < BuyerData.length; ijk++) {
            BuyerData[ijk].All_like_count = await getCoverLikeCount(BuyerData[ijk]._id);
            BuyerData[ijk].All_comment_count = await getCoverCommentCount(BuyerData[ijk]._id);
            ////console.log("add aftr kkkkkkkkkkk: ", BuyerData[ijk]);
        }
        var checkMedia = await Post_media.find({
            category: req.body.category_name,
            status: 'Active'
        });
        console.log("category by name : ", categoryData);
        console.log("all Buyer by category : ", BuyerData);
        console.log("checkMedia checkMedia : ", checkMedia);
        if (!categoryData && !BuyerData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "All buyer data by category name",
            categoryData: categoryData,
            BuyerData: BuyerData,
            postMediaData: checkMedia
        });
    } catch (error) {
        console.log("Error in All buyer data by category name", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getUserPostByCategory = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.category) {
            return res.send({
                success: false,
                message: "Please enter category"
            });
        }
        if (!req.body.user_id) {
            return res.send({
                success: false,
                message: "Please enter User Id"
            });
        }
        var BuyerData = await I_am_buyer.find({
            category: req.body.category,
            user_id: req.body.user_id,
            status: 'Active'
        }).sort({
            '_id': -1
        });
        // for like and comment count
        for (let ijk = 0; ijk < BuyerData.length; ijk++) {
            BuyerData[ijk].All_like_count = await getCoverLikeCount(BuyerData[ijk]._id);
            BuyerData[ijk].All_comment_count = await getCoverCommentCount(BuyerData[ijk]._id);
            ////console.log("add aftr kkkkkkkkkkk: ", BuyerData[ijk]);
        }
        var checkMedia = await Post_media.find({
            category: req.body.category,
            user_id: req.body.user_id,
            status: 'Active'
        });
        //console.log("all user Buyer data by category : ", BuyerData);
        if (!BuyerData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "All User buyer data by category name",
            BuyerData: BuyerData,
            postMediaData: checkMedia
        });
    } catch (error) {
        //console.log("Error in All User buyer data by category name", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getUserAllPostById = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.user_id) {
            return res.send({
                success: false,
                message: "Please enter user id"
            });
        }
        if (!req.body.showPostToUser) {
            return res.send({
                success: false,
                message: "Please enter show post to user name."
            });
        }
        var jionDataa = await I_am_buyer.find({
            user_id: req.body.user_id,
            showPostToUser: {
                $in: req.body.showPostToUser
            },
            status: 'Active'
        }).sort({
            '_id': -1
        });
        // for like and comment count
        for (let ijk = 0; ijk < jionDataa.length; ijk++) {
            jionDataa[ijk].All_like_count = await getCoverLikeCount(jionDataa[ijk]._id);
            jionDataa[ijk].All_comment_count = await getCoverCommentCount(jionDataa[ijk]._id);
            ////console.log("add aftr kkkkkkkkkkk: ", BuyerData[ijk]);
        }
        // for (let i = 0; i < jionDataa.length; i++) {
        //     var checkLikeCount = await Buyer_post_like_comment.find({
        //         post_id: jionDataa[i],
        //         action_type: '1',
        //         status: 'Active',
        //         post_media_id: {
        //             '$exists': false
        //         }
        //     }).count();
        //     var checkCommentCount = await Buyer_post_like_comment.find({
        //         post_id: jionDataa[i],
        //         action_type: '2',
        //         status: 'Active',
        //         post_media_id: {
        //             '$exists': false
        //         }
        //     }).count();
        //     jionDataa[i].FinalLikeCount = "checkLikeCount";
        //     jionDataa[i].FinalCommentCount = "checkCommentCount";
        // }        
        let checkMedia = await Post_media.find({
            user_id: req.body.user_id,
            status: 'Active'
        });
        // //console.log("checkMedia checkMedia : ", checkMedia);
        // db.defn.aggregate( [ 
        //   { "$lookup" : {
        //      "from" : "data",
        //      "localField" : "_id", 
        //      "foreignField" : "defn",
        //      "as" : "defns"
        //     }
        //   } 
        // ])

        // var jionDataa = await I_am_buyer.aggregate([ 
        //   { $match: { user_id: req.body.user_id, status: 'Active' } },
        //   { 
        //     "$lookup" : {
        //      "from" : "Buyer_post_like_comment",
        //      "localField" : "_id", 
        //      "foreignField" : "post_id",
        //      "as" : "mergeData"
        //     }
        //   } 
        // ]).sort({
        //     '_id': -1
        //   })
        // //console.log("all user post data : ", jionDataa);
        if (!jionDataa) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "All user post data",
            BuyerData: jionDataa,
            postMediaData: checkMedia
        });
    } catch (error) {
        //console.log("Error in all user post data", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};
exports.getUserAndCohortAllPostById = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.user_id) {
            return res.send({
                success: false,
                message: "Please enter user id"
            });
        }
        if (!req.body.showPostToUser) {
            return res.send({
                success: false,
                message: "Please enter show post to user name."
            });
        }
        // get all search member public post
        let getMemberCohortdata = [];
        let jionDataa = await I_am_buyer.find({
            user_id: req.body.user_id,
            showPostToUser: {
                $in: ['Public']
            },
            status: 'Active'
        }).sort({
            '_id': -1
        });
        // for like and comment count
        for (let ijk = 0; ijk < jionDataa.length; ijk++) {
            jionDataa[ijk].All_like_count = await getCoverLikeCount(jionDataa[ijk]._id);
            jionDataa[ijk].All_comment_count = await getCoverCommentCount(jionDataa[ijk]._id);
            ////console.log("add aftr kkkkkkkkkkk: ", BuyerData[ijk]);
        }
        let checkMedia = await Post_media.find({
            user_id: req.body.user_id,
            status: 'Active'
        });
        // get all current login user cohorts
        if (req.body.currentLoginUserId != undefined && req.body.currentLoginUserId != "") {
            let getAllCohort = await User_cohorts.findOne({
                my_id: req.body.currentLoginUserId,
                status: 'Active',
                'all_cohorts_user_id.user_id': req.body.user_id
            }).select('all_cohorts_user_id');
            // console.log("getAllCohort : ",getAllCohort);
            if (getAllCohort != null && getAllCohort.length != 0) {
                getMemberCohortdata = await I_am_buyer.find({
                    user_id: req.body.user_id,
                    showPostToUser: {
                        $in: ['Cohorts']
                    },
                    status: 'Active'
                }).sort({
                    '_id': -1
                });
                // for like and comment count
                for (let ijk = 0; ijk < getMemberCohortdata.length; ijk++) {
                    getMemberCohortdata[ijk].All_like_count = await getCoverLikeCount(getMemberCohortdata[ijk]._id);
                    getMemberCohortdata[ijk].All_comment_count = await getCoverCommentCount(getMemberCohortdata[ijk]._id);
                    ////console.log("add aftr kkkkkkkkkkk: ", BuyerData[ijk]);
                }
            }
        }
        // //console.log("all user post data : ", jionDataa);
        if (!jionDataa) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        // merge member ublic and cohort posting
        let finalPosting = jionDataa.concat(getMemberCohortdata);
        finalPosting.sort(function (a, b) {
            return new Date(b.created_at) - new Date(a.created_at);
        });
        return res.send({
            success: true,
            message: "All user post data",
            BuyerData: finalPosting,
            postMediaData: checkMedia
        });
    } catch (error) {
        //console.log("Error in all user post data", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};
exports.deleteUserPostByCategory = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.post_id) {
            return res.send({
                success: false,
                message: "Please enter post id"
            });
        }
        let upadteStatus = {
            status: 'Inactive'
        }
        var updateDate = await I_am_buyer.findByIdAndUpdate(req.body.post_id, upadteStatus);
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in delete post"
            });
        }
        return res.send({
            success: true,
            message: "Your post deleted successfully.",
        });
    } catch (error) {
        //console.log("Error in delete post User category name", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getOnePostById = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.post_id) {
            return res.send({
                success: false,
                message: "Please enter user id"
            });
        }
        var jionDataa = await I_am_buyer.findOne({
            _id: req.body.post_id,
            status: 'Active'
        });

        //console.log("post data : ", jionDataa);
        if (!jionDataa) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }

        return res.send({
            success: true,
            message: "Post data",
            BuyerData: jionDataa
        });
    } catch (error) {
        //console.log("Error in all user post data", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.setSearchByCategoryName = async (req, res) => {
    try {
        //console.log("search for category specific : ", req.body);
        if (!req.body.category) {
            return res.send({
                success: false,
                message: messages.REQUIRED
            });
        }
        if (!req.body.showPostToUser) {
            return res.send({
                success: false,
                message: "Please enter show post to user name."
            });
        }
        let cat = req.body.category;
        var property = req.body.property_desciption;
        var countryName = req.body.country;
        var stateName = req.body.state;
        var cityName = req.body.city;
        var getData = [];
        let condition = [];
        // required conditions
        condition.push({
            user_id: {
                $ne: null
            }
        })
        condition.push({
            status: 'Active',
        })
        condition.push({
            "user.verfied": "Yes"
        })
        condition.push({
            showPostToUser: {
                $in: req.body.showPostToUser
            },
        })
        /**filter by category */
        if (cat != '') {
            condition.push({
                category: req.body.category,
            })
        }
        /**filter by country */
        if (countryName !== '') {
            condition.push({
                country: countryName
            })
        }
        /*start state search*/
        if (stateName != '') {
            condition.push({
                state: stateName,
            })
        }
        /*start city search*/
        if (cityName != '') {
            condition.push({
                city: cityName,
            })
        }

        if (property != "") {
            getData = await I_am_buyer.aggregate([{
                    $match: {
                        $text: {
                            $search: property
                        }
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                {
                    $match: {
                        $and: condition
                    }
                },
            ]).sort({
                '_id': -1
            });
            // for like and comment count
            for (let ijk = 0; ijk < getData.length; ijk++) {
                getData[ijk].All_like_count = await getCoverLikeCount(getData[ijk]._id);
                getData[ijk].All_comment_count = await getCoverCommentCount(getData[ijk]._id);
                ////console.log("add aftr kkkkkkkkkkk: ", BuyerData[ijk]);
            }
        } else {
            getData = await I_am_buyer.aggregate([{
                    $lookup: {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                {
                    $match: {
                        $and: condition
                    }
                },
            ]).sort({
                '_id': -1
            });
            // for like and comment count
            for (let ijk = 0; ijk < getData.length; ijk++) {
                getData[ijk].All_like_count = await getCoverLikeCount(getData[ijk]._id);
                getData[ijk].All_comment_count = await getCoverCommentCount(getData[ijk]._id);
                ////console.log("add aftr kkkkkkkkkkk: ", BuyerData[ijk]);
            }
        }

        // let condition = {
        //     $and: []
        // }
        // // required conditions
        // condition['$and'].push({
        //     user_id: {
        //         $ne: null
        //     },
        //     status: 'Active'
        // })
        // /**filter by category */
        // if (cat != '') {
        //     condition['$and'].push({
        //         category: req.body.category,
        //     })
        // }
        /**filter by country */
        // if (countryName !== '') {
        //     condition['$and'].push({
        //         country: countryName
        //     })
        // }
        // /*start state search*/
        // if (stateName != '') {
        //     condition['$and'].push({
        //         state: stateName,
        //     })
        // }
        /*start city search*/
        // if (cityName != '') {
        //     condition['$and'].push({
        //         city: cityName,
        //     })
        // }

        // if (property != "") {
        //     condition['$and'].push({
        //         $text: {
        //             $search: property
        //         }
        //     })          
        // } else {
        //     getData = await I_am_buyer.find(condition).sort({
        //         '_id': -1
        //     });
        // }
        var checkMedia = await Post_media.find({
            category: req.body.category,
            status: 'Active'
        });
        //console.log("search for category specific : ", getData);
        if (!getData) {
            return res.send({
                success: false,
                message: "Error in search buyer data"
            });
        }
        return res.send({
            success: true,
            message: "Search buyer data",
            dataCount: getData.length,
            getData: getData,
            postMediaData: checkMedia
        });
    } catch (error) {
        //console.log("Error in All buyer data by category name", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.setIAmBuyer = async (req, res) => {
    //console.log("Req body my posting : ", req.body);
    if (!req.body.category) {
        return res.send({
            success: false,
            message: "Please select category name."
        });
    }
    if (!req.body.title) {
        return res.send({
            success: false,
            message: "Please enter title."
        });
    }
    if (!req.body.property_desciption) {
        return res.send({
            success: false,
            message: "Please enter property description."
        });
    }
    if (!req.body.country) {
        return res.send({
            success: false,
            message: "Please select country."
        });
    }
    if (!req.body.state) {
        return res.send({
            success: false,
            message: "Please select state."
        });
    }
    if (!req.body.city) {
        return res.send({
            success: false,
            message: "Please select city."
        });
    }
    // if (!req.files) {
    //     return res.send({
    //         success: false,
    //         message: "Please select property photos."
    //     });
    // }    
    if (!req.body.uploadImageThrughAPK && !req.files) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.body.uploadImageThrughAPK == '[]' && req.files == {}) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (!req.body.is_cover_photo) {
        return res.send({
            success: false,
            message: "Please select one of the checkbox to make it as a cover photo."
        });
    }
    let imgArr = [];
    try {
        if (req.body.user_id === 'null' || req.body.user_id === '' || req.body.user_id == undefined) {
            req.body.user_id = null
        }
        //console.log("images of property description", req.files);
        let FilesArray = req.files.all_images;
        let cover_photo_src = "";
        let cover_photo_name = "";
        var getPdfFile = [];
        if (req.files.pdfFile != undefined) {
            req.files.pdfFile.forEach(element => {
                if (element.originalname.substring(element.originalname.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
                    return res.send({
                        success: false,
                        message: "Please select document in pdf format."
                    });
                } else {
                    getPdfFile.push({
                        src: 'uploads/' + element.filename,
                        orgName: element.originalname,
                    })
                }
            });
            req.body.pdf_doc = getPdfFile;
            //console.log("profile_pic pic coverImageArr", progileImageArr);
            //console.log("profile_pic pic ", req.body.profile_pic);
        }
        //console.log("alll req.body : ", req.body);
        await I_am_buyer(req.body).save(async function (err, room) {
            //console.log("err :", err);
            //console.log("room room", room);
            if (err) {
                response = {
                    success: false,
                    error: true,
                    message: "Error in buyer data save"
                };
                //console.log(response);
                res.send(response);
            } else {
                this.getNewBuyerID = room._id
                //console.log("this.getNewBuyerID,", this.getNewBuyerID);
                if (this.getNewBuyerID != "") {
                    // // update wcx reward token by add 2000    
                    // if (req.body.user_id != null && req.body.user_id != undefined) {
                    //     let updateWcxTokenIncrementBody = {
                    //         $inc: {
                    //             wcx_rewards_tokens: 2000
                    //         }
                    //     }
                    //     let updateWcxToeknData = await User.findByIdAndUpdate(req.body.user_id, updateWcxTokenIncrementBody);
                    //     //console.log("update data user: ", updateData)
                    //     if (!updateWcxToeknData) {
                    //         return res.send({
                    //             success: false,
                    //             message: "Error in buyer update information."
                    //         });
                    //     }
                    //     // create new wcx history   
                    //     let dataForWcxToken = {
                    //         user_id: req.body.user_id,
                    //         date: Date.now(),
                    //         token_price: 2000,
                    //         event_name: 'Create posting'
                    //     }
                    //     let responseToUser = {};
                    //     new Wcx_rewards_tokens_history(dataForWcxToken).save(function (err, resultOfWcxToken) {
                    //         //console.log("Error in create new wcx history  : ", err);
                    //         if (err) {
                    //             responseToUser = {
                    //                 success: false,
                    //                 error: true,
                    //                 message: "Error in buyer update information.",
                    //             };
                    //             res.send(responseToUser);
                    //         }
                    //     });
                    // }
                    // for images get through mobile apk gallery and camera              
                    if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined' && req.body.uploadImageThrughAPK != '[]') {
                        FilesArray = JSON.parse(req.body.uploadImageThrughAPK)
                        for (let i = 0; i < FilesArray.length; i++) {
                            var formPostModia = {};
                            if (FilesArray[i].orgName === req.body.is_cover_photo) {
                                cover_photo_src = FilesArray[i].src;
                                cover_photo_name = FilesArray[i].orgName;
                                formPostModia = {
                                    post_id: this.getNewBuyerID,
                                    user_id: req.body.user_id,
                                    category: req.body.category,
                                    src: FilesArray[i].src,
                                    name: FilesArray[i].orgName,
                                    is_cover_pic: "Yes"
                                }
                            } else {
                                formPostModia = {
                                    post_id: this.getNewBuyerID,
                                    user_id: req.body.user_id,
                                    category: req.body.category,
                                    src: FilesArray[i].src,
                                    name: FilesArray[i].orgName,
                                }
                            }
                            Post_media(formPostModia).save(async function (err, result_media) {
                                if (err) {
                                    //console.log("error in post media data save : ", err);
                                    response = {
                                        success: false,
                                        error: true,
                                        message: "Error in buyer media data save"
                                    };
                                    res.send(response);
                                } else {
                                    this.getNewPostMediaId = result_media._id;
                                    //console.log("new post media id : ", result_media._id);
                                    if (this.getNewPostMediaId != "") {
                                        // for update cover image data in buyer post doc
                                        let formOFUpdate = {
                                            cover_photo: [{
                                                post_media_id: this.getNewPostMediaId,
                                                src: cover_photo_src,
                                                name: cover_photo_name,
                                            }],
                                        }
                                        var updateDataBuyer = await I_am_buyer.findByIdAndUpdate(this.getNewBuyerID, formOFUpdate);
                                        //console.log("upupdateDataBuyer : ", updateDataBuyer);
                                        if (!updateDataBuyer) {
                                            return res.send({
                                                success: false,
                                                message: "error in buyer update information"
                                            });
                                        }
                                        return res.send({
                                            success: true,
                                            message: "Your property details successfully saved.",
                                            id: this.getNewBuyerID
                                        });
                                    }
                                }
                            });
                        }
                    } else {
                        // for get images throguh input type file or websites
                        for (let i = 0; i < FilesArray.length; i++) {
                            var formPostModia = {};
                            if (FilesArray[i].originalname === req.body.is_cover_photo) {
                                cover_photo_src = 'uploads/' + FilesArray[i].filename;
                                cover_photo_name = FilesArray[i].originalname;
                                formPostModia = {
                                    post_id: this.getNewBuyerID,
                                    user_id: req.body.user_id,
                                    category: req.body.category,
                                    src: 'uploads/' + FilesArray[i].filename,
                                    name: FilesArray[i].originalname,
                                    is_cover_pic: "Yes"
                                }
                            } else {
                                formPostModia = {
                                    post_id: this.getNewBuyerID,
                                    user_id: req.body.user_id,
                                    category: req.body.category,
                                    src: 'uploads/' + FilesArray[i].filename,
                                    name: FilesArray[i].originalname,
                                }
                            }
                            Post_media(formPostModia).save(async function (err, result_media) {
                                if (err) {
                                    //console.log("error in post media data save : ", err);
                                    response = {
                                        success: false,
                                        error: true,
                                        message: "Error in buyer media data save"
                                    };
                                    res.send(response);
                                } else {
                                    this.getNewPostMediaId = result_media._id;
                                    //console.log("new post media id : ", result_media._id);
                                    if (this.getNewPostMediaId != "") {
                                        // for update cover image data in buyer post doc
                                        let formOFUpdate = {
                                            cover_photo: [{
                                                post_media_id: this.getNewPostMediaId,
                                                src: cover_photo_src,
                                                name: cover_photo_name,
                                            }],
                                        }
                                        var updateDataBuyer = await I_am_buyer.findByIdAndUpdate(this.getNewBuyerID, formOFUpdate);
                                        //console.log("upupdateDataBuyer : ", updateDataBuyer);
                                        if (!updateDataBuyer) {
                                            return res.send({
                                                success: false,
                                                message: "error in buyer update information"
                                            });
                                        }
                                        return res.send({
                                            success: true,
                                            message: "Your property details successfully saved.",
                                            id: this.getNewBuyerID
                                        });
                                    }
                                }
                            });
                        }
                    }
                }
            }
        });

    } catch (error) {
        //console.log("Error in category_name", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

// exports.setIAmBuyer = async (req, res) => {
//    //console.log("Req body my posting : ", req.body);
//     if (!req.body.category) {
//         return res.send({
//             success: false,
//             message: "Please select category name."
//         });
//     }
//     if (!req.body.title) {
//         return res.send({
//             success: false,
//             message: "Please enter title."
//         });
//     }
//     if (!req.body.property_desciption) {
//         return res.send({
//             success: false,
//             message: "Please enter property description."
//         });
//     }
//     if (!req.body.country) {
//         return res.send({
//             success: false,
//             message: "Please select country."
//         });
//     }
//     if (!req.body.state) {
//         return res.send({
//             success: false,
//             message: "Please select state."
//         });
//     }
//     if (!req.body.city) {
//         return res.send({
//             success: false,
//             message: "Please select city."
//         });
//     }
//     // if (!req.files) {
//     //     return res.send({
//     //         success: false,
//     //         message: "Please select property photos."
//     //     });
//     // }    
//     if (!req.body.uploadImageThrughAPK && !req.files) {
//         return res.send({
//             success: false,
//             message: "Please select property picture."
//         });
//     }
//     if (req.body.uploadImageThrughAPK == [] && req.files == {}) {
//         return res.send({
//             success: false,
//             message: "Please select property picture."
//         });
//     }
//     if (!req.body.is_cover_photo) {
//         return res.send({
//             success: false,
//             message: "Please select one of the checkbox to make it as a cover photo."
//         });
//     }
//     let imgArr = [];
//     try {
//         if (req.body.user_id === 'null' || req.body.user_id === '') {
//             req.body.user_id = null
//         }
//        //console.log("images of property description", req.files);
//         let FilesArray = req.files.all_images;
//         let cover_photo_src = "";
//         let cover_photo_name = "";
//         var getPdfFile = [];
//         if (req.files.pdfFile != undefined) {
//             req.files.pdfFile.forEach(element => {
//                 if (element.originalname.substring(element.originalname.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
//                     return res.send({
//                         success: false,
//                         message: "Please select document in pdf format."
//                     });
//                 } else {
//                     getPdfFile.push({
//                         src: 'uploads/' + element.filename,
//                         orgName: element.originalname,
//                     })
//                 }
//             });
//             req.body.pdf_doc = getPdfFile;
//             //console.log("profile_pic pic coverImageArr", progileImageArr);
//             //console.log("profile_pic pic ", req.body.profile_pic);
//         }
//        //console.log("alll req.body : ", req.body);
//         await I_am_buyer(req.body).save(function (err, room) {
//            //console.log("err :", err);
//            //console.log("room room", room);
//             if (err) {
//                 response = {
//                     success: false,
//                     error: true,
//                     message: "Error in buyer data save"
//                 };
//                 //console.log(response);
//                 res.send(response);
//             } else {
//                 this.getNewBuyerID = room._id
//                 //console.log("this.getNewBuyerID,", this.getNewBuyerID);
//                 if (this.getNewBuyerID != "") {
//                     for (let i = 0; i < FilesArray.length; i++) {
//                         var formPostModia = {};
//                         if (FilesArray[i].originalname === req.body.is_cover_photo) {
//                             cover_photo_src = 'uploads/' + FilesArray[i].filename;
//                             cover_photo_name = FilesArray[i].originalname;
//                             formPostModia = {
//                                 post_id: this.getNewBuyerID,
//                                 user_id: req.body.user_id,
//                                 category: req.body.category,
//                                 src: 'uploads/' + FilesArray[i].filename,
//                                 name: FilesArray[i].originalname,
//                                 is_cover_pic: "Yes"
//                             }
//                         } else {
//                             formPostModia = {
//                                 post_id: this.getNewBuyerID,
//                                 user_id: req.body.user_id,
//                                 category: req.body.category,
//                                 src: 'uploads/' + FilesArray[i].filename,
//                                 name: FilesArray[i].originalname,
//                             }
//                         }
//                         Post_media(formPostModia).save(async function (err, result_media) {
//                             if (err) {
//                                 //console.log("error in post media data save : ", err);
//                                 response = {
//                                     success: false,
//                                     error: true,
//                                     message: "Error in buyer media data save"
//                                 };
//                                 res.send(response);
//                             } else {
//                                 this.getNewPostMediaId = result_media._id;
//                                 //console.log("new post media id : ", result_media._id);
//                                 if (this.getNewPostMediaId != "") {
//                                     // for update cover image data in buyer post doc
//                                     let formOFUpdate = {
//                                         cover_photo: [{
//                                             post_media_id: this.getNewPostMediaId,
//                                             src: cover_photo_src,
//                                             name: cover_photo_name,
//                                         }],
//                                     }
//                                     var updateDataBuyer = await I_am_buyer.findByIdAndUpdate(this.getNewBuyerID, formOFUpdate);
//                                     //console.log("upupdateDataBuyer : ", updateDataBuyer);
//                                     if (!updateDataBuyer) {
//                                         return res.send({
//                                             success: false,
//                                             message: "error in buyer update information"
//                                         });
//                                     }
//                                     return res.send({
//                                         success: true,
//                                         message: "Your property details successfully saved.",
//                                         id: this.getNewBuyerID
//                                     });
//                                 }
//                             }
//                         });
//                     }
//                 }
//             }
//         });

//     } catch (error) {
//        //console.log("Error in category_name", error);
//         return res.send({
//             success: false,
//             message: messages.ERROR
//         });
//     }
// };

exports.setIAmBuyerByWePo = async (req, res) => {
    //console.log("Req body my posting : ", req.body);
    if (!req.body.category) {
        return res.send({
            success: false,
            message: "Please select category name."
        });
    }
    if (req.body.property_desciption == undefined) {
        return res.send({
            success: false,
            message: "Please enter property description."
        });
    }
    if (!req.body.country) {
        return res.send({
            success: false,
            message: "Please select country."
        });
    }
    if (!req.body.state) {
        return res.send({
            success: false,
            message: "Please select state."
        });
    }
    if (!req.body.city) {
        return res.send({
            success: false,
            message: "Please select city."
        });
    }
    if (!req.body.is_cover_photo) {
        return res.send({
            success: false,
            message: "Please give cover photo name."
        });
    }
    let imgArr = [];
    try {
        if (req.body.user_id === 'null' || req.body.user_id === '') {
            req.body.user_id = null
        }
        let FilesArray = req.body.all_previous_images;
        let cover_photo_src = "";
        let cover_photo_name = "";
        var getPdfFile = [];
        //console.log("alll req.body : ", req.body);
        await I_am_buyer(req.body).save(function (err, room) {
            //console.log("err :", err);
            //console.log("room room", room);
            if (err) {
                response = {
                    success: false,
                    error: true,
                    message: "Error in buyer data save"
                };
                //console.log(response);
                res.send(response);
            } else {
                this.getNewBuyerID = room._id
                //console.log("this.getNewBuyerID,", this.getNewBuyerID);
                if (this.getNewBuyerID != "") {
                    for (let i = 0; i < FilesArray.length; i++) {
                        var formPostModia = {};
                        if (FilesArray[i].orgName === req.body.is_cover_photo) {
                            cover_photo_src = FilesArray[i].src;
                            cover_photo_name = FilesArray[i].orgName;
                            formPostModia = {
                                post_id: this.getNewBuyerID,
                                user_id: req.body.user_id,
                                category: req.body.category,
                                src: FilesArray[i].src,
                                name: FilesArray[i].orgName,
                                is_cover_pic: "Yes"
                            }
                        } else {
                            formPostModia = {
                                post_id: this.getNewBuyerID,
                                user_id: req.body.user_id,
                                category: req.body.category,
                                src: FilesArray[i].src,
                                name: FilesArray[i].orgName,
                            }
                        }
                        Post_media(formPostModia).save(async function (err, result_media) {
                            if (err) {
                                //console.log("error in post media data save : ", err);
                                response = {
                                    success: false,
                                    error: true,
                                    message: "Error in buyer media data save"
                                };
                                res.send(response);
                            } else {
                                this.getNewPostMediaId = result_media._id;
                                //console.log("new post media id : ", result_media._id);
                                if (this.getNewPostMediaId != "") {
                                    // for update cover image data in buyer post doc
                                    let formOFUpdate = {
                                        cover_photo: [{
                                            post_media_id: this.getNewPostMediaId,
                                            src: cover_photo_src,
                                            name: cover_photo_name,
                                        }],
                                    }
                                    var updateDataBuyer = await I_am_buyer.findByIdAndUpdate(this.getNewBuyerID, formOFUpdate);
                                    //console.log("upupdateDataBuyer : ", updateDataBuyer);
                                    if (!updateDataBuyer) {
                                        return res.send({
                                            success: false,
                                            message: "error in buyer update information"
                                        });
                                    }
                                    return res.send({
                                        success: true,
                                        message: "Your property details successfully saved.",
                                        id: this.getNewBuyerID
                                    });
                                }
                            }
                        });
                    }
                }
            }
        });

    } catch (error) {
        //console.log("Error in category_name", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

// exports.setIAmBuyer = async (req, res) => {
//   if (!req.body.category) {
//     return res.send({
//       success: false,
//       message: "Please select category name."
//     });
//   }
//   if (!req.body.property_desciption) {
//     return res.send({
//       success: false,
//       message: "Please enter property description."
//     });
//   }
//   if (!req.files) {
//     return res.send({
//       success: false,
//       message: "Please select property photos."
//     });
//   }
//   if (!req.body.is_cover_photo) {
//     return res.send({
//       success: false,
//       message: "Please tick on checkbox to make as a cover photo."
//     });
//   }
//   let imgArr = [];
//  for (const key in object) {
//    if (object.hasOwnProperty(key)) {
//      const element = object[key];

//    }
//  }
//   try {
//     //console.log("images of property description", req.files);
//     let cover_photo_src = "";
//     let cover_photo_name = "";
//     //console.log("alll req.body : ", req.body);
//     await I_am_buyer(req.body).save(function (err, room) {
//       //console.log("room room", room);
//       if (err) {
//         response = {
//           success: false,
//           error: true,
//           message: "Error in buyer data save"
//         };
//         //console.log(response);
//         res.send(response);
//       } else {
//         this.getNewBuyerID = room._id
//         //console.log("this.getNewBuyerID,", this.getNewBuyerID);
//         if (this.getNewBuyerID != "") {
//           req.files.forEach(async element => {
//             let formPostModia = {};
//             if (element.originalname === req.body.is_cover_photo) {
//               cover_photo_src = req.protocol + '://' + req.get('host') + 'uploads/' + element.filename;
//               cover_photo_name = element.originalname;
//               formPostModia = {
//                 post_id: this.getNewBuyerID,
//                 src: req.protocol + '://' + req.get('host') + 'uploads/' + element.filename,
//                 name: element.originalname,
//                 is_cover_pic: "Yes"
//               }
//             } else {
//               formPostModia = {
//                 post_id: this.getNewBuyerID,
//                 src: req.protocol + '://' + req.get('host') + 'uploads/' + element.filename,
//                 name: element.originalname,
//               }
//             }
//             Post_media(formPostModia).save(function (err, result_media) {
//               if (err) {
//                 //console.log("error in post media data save : ", err);
//                 response = {
//                   success: false,
//                   error: true,
//                   message: "Error in buyer media data save"
//                 };
//                 res.send(response);
//               } else {
//                 this.getNewPostMediaId = result_media._id;
//                 //console.log("new post media id : ", result_media._id);
//                 if (this.getNewPostMediaId != "") {
//                   // for update cover image data in buyer post doc
//                   let formOFUpdate = {
//                     cover_photo: [{
//                       post_media: this.getNewPostMediaId,
//                       src: cover_photo_src,
//                       name: cover_photo_name,
//                     }],
//                   }                 
//                   var updateDataBuyer = I_am_buyer.findByIdAndUpdate(this.getNewBuyerID, formOFUpdate);     
//                   //console.log("upupdateDataBuyer : ",updateDataBuyer);           
//                     if (!updateDataBuyer) {
//                       return res.send({
//                         success: false,
//                         message: "error in buyer update information"
//                       });
//                     }
//                     return res.send({
//                       success: true,
//                       message: "Your property details succesfully saved."
//                     });                 
//                 }
//               }
//             });
//           });
//         }
//       }
//     });
//     // //console.log("checkkkkkkkkkkkkk : ", this.getNewBuyerID);
//     // collection.save(function (err, room) {
//     //   var newRoomId = room._id;
//     // });
//     // await new I_am_buyer(req.body),.save(function (err, result) {
//     //   //console.log("resssssssssssss",result);
//     //   if (err) {
//     //     //console.log("error in buyer table save : ", err);
//     //     response = {
//     //       success: false,
//     //       error: true,
//     //       message: "Error in buyer data save"
//     //     };
//     //     res.send(response);
//     //   } else {
//     //     //console.log("buyer table id : ",result._id);
//     //     new_post_id = result._id;
//     //     response = {
//     //       success: false,
//     //       error: true,
//     //       message: "Error in buyer data save"
//     //     };
//     //   }
//     // });
//     // req.files.forEach(element => {
//     //   let formPostModia = {};
//     //   if (element.originalname == req.body.is_cover_photo) {
//     //     cover_photo_src = req.protocol + '://' + req.get('host') + 'uploads/' + element.filename;
//     //     cover_photo_name = element.originalname;
//     //     formPostModia = {
//     //       post_id: new_post_id,
//     //       src: req.protocol + '://' + req.get('host') + 'uploads/' + element.filename,
//     //       name: element.originalname,
//     //       is_cover_pic: "Yes"
//     //     }
//     //   } else {
//     //     formPostModia = {
//     //       post_id: new_post_id,
//     //       src: req.protocol + '://' + req.get('host') + 'uploads/' + element.filename,
//     //       name: element.originalname,
//     //     }
//     //   }
//     //   Post_media(formPostModia).save(function (err, result) {
//     //     if (err) {
//     //       //console.log("error in post media data save : ", err);
//     //       response = {
//     //         success: false,
//     //         error: true,
//     //         message: "Error in buyer media data save"
//     //       };
//     //       res.send(response);
//     //     } 
//     //       //console.log("new post media id : ", result._id);
//     //       new_post_media_id = result._id;

//     //   });
//     // });

//     // for update cover image data in buyer post doc
//     // let formOFUpdate = {
//     //   cover_photo: [{
//     //     post_media: new_post_media_id,
//     //     src: cover_photo_src,
//     //     name: cover_photo_name,
//     //   }],
//     // }
//     // var updateData = await I_am_buyer.findByIdAndUpdate(new_post_id, formOFUpdate);
//     // if (!updateData) {
//     //   return res.send({
//     //     success: false,
//     //     message: messages.ERROR
//     //   });
//     // }
//     // return res.send({
//     //   success: true,
//     //   message: "Your property details succesfully saved."
//     // });
//   } catch (error) {
//     //console.log("Error in category_name", error);
//     return res.send({
//       success: false,
//       message: messages.ERROR
//     });
//   }
// };

exports.setShowInterestEmail = async (req, res) => {
    //console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.current_user_id) {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    if (!req.body.name) {
        return res.send({
            success: false,
            message: "Please enter Name."
        });
    }
    if (!req.body.email) {
        return res.send({
            success: false,
            message: "Please enter Email Address."
        });
    }
    if (!req.body.email_text) {
        return res.send({
            success: false,
            message: "Please enter Email Text."
        });
    }
    try {
        let userData = new User_show_property_interest(req.body).save();
        //console.log("userData", userData);
        if (!userData) {
            return res.send({
                success: false,
                message: "Error in save show user interest data."
            });
        }
        if (req.body.send_me_copy == 'Yes') {
            /**node mailer code*/

            //console.log("INNER SEND ME COPY EMAIL USER IDDDDDDDDDDD");
            var nodemailer = require('nodemailer');

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                type: "SMTP",
                host: "smtp.gmail.com",
                secure: true,
                auth: {
                    user: 'wecoowntest@gmail.com',
                    pass: 'wecon123'
                }
            });

            var mailOptions = {
                from: 'WeCoOwn <wecoowntest@gmail.com>',
                to: 'karishmasoni396@gmail.com,' + req.body.email,
                subject: 'Message from WeCoOwn Website',
                html: `<!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <style>
                            *{
                                box-sizing: border-box;
                            }            
                            body {
                                font-family: Arial, Helvetica, sans-serif;
                            }            
                            /* Style the header */
                            header,footer{
                                background-color: #0b3655;
                                padding: 10px;
                                text-align: center;
                                color: white;
                            }
                        </style>
                    </head>
                    <body>
                        <header>
                            <h3 style="margin: 0px;">WeCoOwn</h3>
                        </header>            
                        <section style="background: #f1f1f178;padding-bottom: 10px;">  
                            <div style="text-align:center;">
                                <a href="https://wecoown.com/" onclick="window.open(this.href,this.href); return false"><img src="https://wecoown.com/assets/images/Original-1.png" width="110px" style="margin-top: 20px;"></a>
                                <p style="padding: 15px 15%;margin: 0;font-weight: 600;font-style: italic;">Community Platform | Finding Potential Co-Owners | Buy and Manage Assets or Properties Together</p>
                                <div style="margin: 0px 20%;background: orange;padding: 10px;color: white;">                                  
                                    <h3>Hi, &nbsp;` + req.body.name + `</h3>
                                    <p>We are glad to inform you that a person is showing interest in your buyer post. Details of person are below.</p>
                                    <h3>Name : ` + req.body.name + `</h3>
                                    <h3>Email Address : ` + req.body.email + `</h3>
                                    <h3>Email Text : ` + req.body.email_text + `</h3>
                                    <p>If you received this email by mistake, simply delete it.</p>                       
                                    <p>Thanks,</p>
                                    <p>WeCoOwn Support<p>
                                    <br>
                                </div>
                            </div>                
                        </section>
                        <footer>
                            <div>
                                <a href="https://www.facebook.com/wecoown" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-fb-icon.jpg">
                                </a>                    
                                <a href="https://www.instagram.com/wecoown/" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-insta-icon.jpg">
                                </a>
                                <a href="https://www.linkedin.com/company/wecoown/" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-linkedin-icon.jpg">
                                </a>
                                <a href="https://twitter.com/WeCoOwn" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-twitter-icon.jpg" style="margin-left: -3px;">
                                </a>
                                <a href="https://www.youtube.com/channel/UCOwKKGKaK2DWkiZJi9-CfQA" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-youtube-icon.jpg">
                                </a>
                                <a href="https://medium.com/wecoown" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-medium-icon.jpg" style="margin-bottom: 4px; margin-left: -5px; height: 45;">
                                </a>
                                <br>
                                <a href="https://wecoown.com/terms-conditions" style="color: white;" onclick="window.open(this.href,this.href); return false">Terms & Conditions</a> |
                                <a href="https://wecoown.com/privacy-policy" style="color: white;" onclick="window.open(this.href,this.href); return false">Privacy Policy</a><br>
                                <p>© 2020 WeCoOwn, Inc. All rights reserved.</p>
                            </div>
                        </footer>
                    </body>
                </html>`
                // html: '<div style="background-color:#f6f8f1; padding:15px; font-size: 20px;font-family: sans-serif; ">' +
                //     '<div style="background-color:white;padding:20px;margin:10px;">' +
                //     '<h3>Hi, &nbsp;' + req.body.name + '</h3><br>' +
                //     '<p>We are glad to inform you that a person is showing interest in your buyer post. Details of person are below.</p>' +
                //     '<h3>Name : ' + req.body.name + '</h3><br>' +
                //     '<h3>Email Address : ' + req.body.email + '</h3><br>' +
                //     '<h3>Email Text : ' + req.body.email_text + '</h3><br>' +
                //     '<br><p>Thanks,</p><p>WeCoOwn Support<p><br>' +
                //     '</div> ' +
                //     ' </div>'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    //console.log(error);
                } else {
                    //console.log('Send me copy Email sent');
                }
            });
            /**node mailer code */
        }
        if (req.body.buyer_user_id != null) {
            /**node mailer code*/
            var getUserEmail = await User.findById(req.body.buyer_user_id).select('email username');
            //console.log("INNER BUYER USER IDDDDDDDDDDD", getUserEmail);
            var nodemailer = require('nodemailer');

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                type: "SMTP",
                host: "smtp.gmail.com",
                secure: true,
                auth: {
                    user: 'wecoowntest@gmail.com',
                    pass: 'wecon123'
                }
            });

            var mailOptions = {
                from: 'WeCoOwn <wecoowntest@gmail.com>',
                to: 'karishmasoni396@gmail.com,' + getUserEmail.email,
                subject: 'Message from WeCoOwn Website',
                html: `<!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <style>
                            *{
                                box-sizing: border-box;
                            }            
                            body {
                                font-family: Arial, Helvetica, sans-serif;
                            }            
                            /* Style the header */
                            header,footer{
                                background-color: #0b3655;
                                padding: 10px;
                                text-align: center;
                                color: white;
                            }
                        </style>
                    </head>
                    <body>
                        <header>
                            <h3 style="margin: 0px;">WeCoOwn</h3>
                        </header>            
                        <section style="background: #f1f1f178;padding-bottom: 10px;">  
                            <div style="text-align:center;">
                                <a href="https://wecoown.com/" onclick="window.open(this.href,this.href); return false"><img src="https://wecoown.com/assets/images/Original-1.png" width="110px" style="margin-top: 20px;"></a>
                                <p style="padding: 15px 15%;margin: 0;font-weight: 600;font-style: italic;">Community Platform | Finding Potential Co-Owners | Buy and Manage Assets or Properties Together</p>
                                <div style="margin: 0px 20%;background: orange;padding: 10px;color: white;">                              
                                    <h3>Hi, &nbsp;` + getUserEmail.username + `</h3>
                                    <p>We are glad to inform you that a person is showing interest in your buyer post. Details of person are below.</p>
                                    <h3>Name : ` + req.body.name + `</h3>
                                    <h3>Email Address : ` + req.body.email + `</h3>
                                    <h3>Email Text : ` + req.body.email_text + `</h3>
                                    <p>If you received this email by mistake, simply delete it.</p>                              
                                    <p>Thanks,</p>
                                    <p>WeCoOwn Support<p>
                                    <br>
                                </div>
                            </div>                
                        </section>
                        <footer>
                            <div>
                                <a href="https://www.facebook.com/wecoown" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-fb-icon.jpg">
                                </a>                    
                                <a href="https://www.instagram.com/wecoown/" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-insta-icon.jpg">
                                </a>
                                <a href="https://www.linkedin.com/company/wecoown/" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-linkedin-icon.jpg">
                                </a>
                                <a href="https://twitter.com/WeCoOwn" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-twitter-icon.jpg" style="margin-left: -3px;">
                                </a>
                                <a href="https://www.youtube.com/channel/UCOwKKGKaK2DWkiZJi9-CfQA" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-youtube-icon.jpg">
                                </a>
                                <a href="https://medium.com/wecoown" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-medium-icon.jpg" style="margin-bottom: 4px; margin-left: -5px; height: 45;">
                                </a>
                                <br>
                                <a href="https://wecoown.com/terms-conditions" style="color: white;" onclick="window.open(this.href,this.href); return false">Terms & Conditions</a> |
                                <a href="https://wecoown.com/privacy-policy" style="color: white;" onclick="window.open(this.href,this.href); return false">Privacy Policy</a><br>
                                <p>© 2020 WeCoOwn, Inc. All rights reserved.</p>
                            </div>
                        </footer>
                    </body>
                </html>`
                // html: '<div style="background-color:#f6f8f1; padding:15px; font-size: 20px;font-family: sans-serif; ">' +
                //     '<div style="background-color:white;padding:20px;margin:10px;">' +
                //     '<h3>Hi, &nbsp;' + getUserEmail.username + '</h3><br>' +
                //     '<p>We are glad to inform you that a person is showing interest in your buyer post. Details of person are below.</p>' +
                //     '<h3>Name : ' + req.body.name + '</h3><br>' +
                //     '<h3>Email Address : ' + req.body.email + '</h3><br>' +
                //     '<h3>Email Text : ' + req.body.email_text + '</h3><br>' +
                //     '<br><p>Thanks,</p><p>WeCoOwn Support<p><br>' +
                //     '</div> ' +
                //     ' </div>'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    //console.log(error);
                    return res.send({
                        success: false,
                        message: "Your email has not sent to buyer."
                    });
                } else {
                    //console.log('Buyer Email sent');
                    return res.send({
                        success: true,
                        message: "Your email has been sent to buyer successfully."
                    });
                }
            });
            /**node mailer code */
        } else {
            return res.send({
                success: true,
                message: "Your email has been sent to buyer successfully."
            });
        }
    } catch (error) {
        //console.log("Error in User_show_property_interest", error);
        return res.send({
            success: false,
            message: "Error in User_show_property_interest"
        });
    }
};

exports.showInterestFractionalListingEmail = async (req, res) => {
    //console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.current_user_id) {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    if (!req.body.name) {
        return res.send({
            success: false,
            message: "Please enter Name."
        });
    }
    if (!req.body.email) {
        return res.send({
            success: false,
            message: "Please enter Email Address."
        });
    }
    if (!req.body.email_text) {
        return res.send({
            success: false,
            message: "Please enter Email Text."
        });
    }
    if (!req.body.recevier_user_id) {
        return res.send({
            success: false,
            message: "Please enter recevier id."
        });
    }
    try {
        let userData = new User_show_interest_fractional_listing(req.body).save();
        //console.log("userData", userData);
        if (!userData) {
            return res.send({
                success: false,
                message: "Error in save show user interest data of WePropertyowners listing."
            });
        }
        if (req.body.send_me_copy == 'Yes') {
            /**node mailer code*/

            //console.log("INNER SEND ME COPY EMAIL USER IDDDDDDDDDDD");
            var nodemailer = require('nodemailer');

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                type: "SMTP",
                host: "smtp.gmail.com",
                secure: true,
                auth: {
                    user: 'wecoowntest@gmail.com',
                    pass: 'wecon123'
                }
            });

            var mailOptions = {
                from: 'WeCoOwn <wecoowntest@gmail.com>',
                to: 'karishmasoni396@gmail.com,' + req.body.email,
                subject: 'Message from WeCoOwn Website',
                html: `<!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <style>
                            *{
                                box-sizing: border-box;
                            }            
                            body {
                                font-family: Arial, Helvetica, sans-serif;
                            }            
                            /* Style the header */
                            header,footer{
                                background-color: #0b3655;
                                padding: 10px;
                                text-align: center;
                                color: white;
                            }
                        </style>
                    </head>
                    <body>
                        <header>
                            <h3 style="margin: 0px;">WeCoOwn</h3>
                        </header>            
                        <section style="background: #f1f1f178;padding-bottom: 10px;">  
                            <div style="text-align:center;">
                                <a href="https://wecoown.com/" onclick="window.open(this.href,this.href); return false"><img src="https://wecoown.com/assets/images/Original-1.png" width="110px" style="margin-top: 20px;"></a>
                                <p style="padding: 15px 15%;margin: 0;font-weight: 600;font-style: italic;">Community Platform | Finding Potential Co-Owners | Buy and Manage Assets or Properties Together</p>
                                <div style="margin: 0px 20%;background: orange;padding: 10px;color: white;">                                  
                                    <h3>Hi, &nbsp;` + req.body.name + `</h3>
                                    <p>We are glad to inform you that a person is showing interest in your WeproPertyowners listing. Details of person are below.</p>
                                    <h3>Name : ` + req.body.name + `</h3>
                                    <h3>Email Address : ` + req.body.email + `</h3>
                                    <h3>Email Text : ` + req.body.email_text + `</h3>
                                    <p>If you received this email by mistake, simply delete it.</p>                              
                                    <p>Thanks,</p>
                                    <p>WeCoOwn Support<p>
                                    <br>
                                </div>
                            </div>                
                        </section>
                        <footer>
                            <div>
                                <a href="https://www.facebook.com/wecoown" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-fb-icon.jpg">
                                </a>                    
                                <a href="https://www.instagram.com/wecoown/" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-insta-icon.jpg">
                                </a>
                                <a href="https://www.linkedin.com/company/wecoown/" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-linkedin-icon.jpg">
                                </a>
                                <a href="https://twitter.com/WeCoOwn" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-twitter-icon.jpg" style="margin-left: -3px;">
                                </a>
                                <a href="https://www.youtube.com/channel/UCOwKKGKaK2DWkiZJi9-CfQA" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-youtube-icon.jpg">
                                </a>
                                <a href="https://medium.com/wecoown" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-medium-icon.jpg" style="margin-bottom: 4px; margin-left: -5px; height: 45;">
                                </a>
                                <br>
                                <a href="https://wecoown.com/terms-conditions" style="color: white;" onclick="window.open(this.href,this.href); return false">Terms & Conditions</a> |
                                <a href="https://wecoown.com/privacy-policy" style="color: white;" onclick="window.open(this.href,this.href); return false">Privacy Policy</a><br>
                                <p>© 2020 WeCoOwn, Inc. All rights reserved.</p>
                            </div>
                        </footer>
                    </body>
                </html>`
                // html: '<div style="background-color:#f6f8f1; padding:15px; font-size: 20px;font-family: sans-serif; ">' +
                //     '<div style="background-color:white;padding:20px;margin:10px;">' +
                //     '<h3>Hi, &nbsp;' + req.body.name + '</h3><br>' +
                //     '<p>We are glad to inform you that a person is showing interest in your WeproPertyowners listing. Details of person are below.</p>' +
                //     '<h3>Name : ' + req.body.name + '</h3><br>' +
                //     '<h3>Email Address : ' + req.body.email + '</h3><br>' +
                //     '<h3>Email Text : ' + req.body.email_text + '</h3><br>' +
                //     '<br><p>Thanks,</p><p>WeCoOwn Support<p><br>' +
                //     '</div> ' +
                //     ' </div>'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    //console.log(error);
                } else {
                    //console.log('Send me copy Email sent');
                }
            });
            /**node mailer code */
        }
        if (req.body.recevier_user_id != null) {
            /**node mailer code*/
            var getUserEmail = await User.findById(req.body.recevier_user_id).select('email username');
            //console.log("INNER BUYER USER IDDDDDDDDDDD", getUserEmail);
            var nodemailer = require('nodemailer');

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                type: "SMTP",
                host: "smtp.gmail.com",
                secure: true,
                auth: {
                    user: 'wecoowntest@gmail.com',
                    pass: 'wecon123'
                }
            });

            var mailOptions = {
                from: 'WeCoOwn <wecoowntest@gmail.com>',
                to: 'karishmasoni396@gmail.com,' + getUserEmail.email,
                subject: 'Message from WeCoOwn Website',
                html: `<!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <style>
                            *{
                                box-sizing: border-box;
                            }            
                            body {
                                font-family: Arial, Helvetica, sans-serif;
                            }            
                            /* Style the header */
                            header,footer{
                                background-color: #0b3655;
                                padding: 10px;
                                text-align: center;
                                color: white;
                            }
                        </style>
                    </head>
                    <body>
                        <header>
                            <h3 style="margin: 0px;">WeCoOwn</h3>
                        </header>            
                        <section style="background: #f1f1f178;padding-bottom: 10px;">  
                            <div style="text-align:center;">
                                <a href="https://wecoown.com/" onclick="window.open(this.href,this.href); return false"><img src="https://wecoown.com/assets/images/Original-1.png" width="110px" style="margin-top: 20px;"></a>
                                <p style="padding: 15px 15%;margin: 0;font-weight: 600;font-style: italic;">Community Platform | Finding Potential Co-Owners | Buy and Manage Assets or Properties Together</p>
                                <div style="margin: 0px 20%;background: orange;padding: 10px;color: white;">                              
                                    <h3>Hi, &nbsp;` + getUserEmail.username + `</h3>
                                    <p>We are glad to inform you that a person is showing interest in your WePropertyowners listing. Details of person are below.</p>
                                    <h3>Name : ` + req.body.name + `</h3>
                                    <h3>Email Address : ` + req.body.email + `</h3>
                                    <h3>Email Text : ` + req.body.email_text + `</h3>
                                    <p>If you received this email by mistake, simply delete it.</p>                              
                                    <p>Thanks,</p>
                                    <p>WeCoOwn Support<p>
                                    <br>
                                </div>
                            </div>                
                        </section>
                        <footer>
                            <div>
                                <a href="https://www.facebook.com/wecoown" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-fb-icon.jpg">
                                </a>                    
                                <a href="https://www.instagram.com/wecoown/" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-insta-icon.jpg">
                                </a>
                                <a href="https://www.linkedin.com/company/wecoown/" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-linkedin-icon.jpg">
                                </a>
                                <a href="https://twitter.com/WeCoOwn" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-twitter-icon.jpg" style="margin-left: -3px;">
                                </a>
                                <a href="https://www.youtube.com/channel/UCOwKKGKaK2DWkiZJi9-CfQA" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-youtube-icon.jpg">
                                </a>
                                <a href="https://medium.com/wecoown" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-medium-icon.jpg" style="margin-bottom: 4px; margin-left: -5px; height: 45;">
                                </a>
                                <br>
                                <a href="https://wecoown.com/terms-conditions" style="color: white;" onclick="window.open(this.href,this.href); return false">Terms & Conditions</a> |
                                <a href="https://wecoown.com/privacy-policy" style="color: white;" onclick="window.open(this.href,this.href); return false">Privacy Policy</a><br>
                                <p>© 2020 WeCoOwn, Inc. All rights reserved.</p>
                            </div>
                        </footer>
                    </body>
                </html>`
                // html: '<div style="background-color:#f6f8f1; padding:15px; font-size: 20px;font-family: sans-serif; ">' +
                //     '<div style="background-color:white;padding:20px;margin:10px;">' +
                //     '<h3>Hi, &nbsp;' + getUserEmail.username + '</h3><br>' +
                //     '<p>We are glad to inform you that a person is showing interest in your WePropertyowners listing. Details of person are below.</p>' +
                //     '<h3>Name : ' + req.body.name + '</h3><br>' +
                //     '<h3>Email Address : ' + req.body.email + '</h3><br>' +
                //     '<h3>Email Text : ' + req.body.email_text + '</h3><br>' +
                //     '<br><p>Thanks,</p><p>WeCoOwn Support<p><br>' +
                //     '</div> ' +
                //     ' </div>'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    //console.log(error);
                    return res.send({
                        success: false,
                        message: "Your email has not sent to WePropertyowners."
                    });
                } else {
                    //console.log('Buyer Email sent');
                    return res.send({
                        success: true,
                        message: "Your email has been sent to WePropertyowners successfully."
                    });
                }
            });
            /**node mailer code */
        } else {
            return res.send({
                success: true,
                message: "Your email has been sent to WePropertyowners successfully."
            });
        }
    } catch (error) {
        //console.log("Error in email sent for show inteerest WePropertyowners", error);
        return res.send({
            success: false,
            message: "Error in User_show_property_interest"
        });
    }
};

exports.setUploadCategoryPhotos = async (req, res) => {
    //console.log("hhhhhhhhhhhhhhh : ", req.body);
    //console.log("kkkkkkkkkkk : ", req.files);
    try {
        if (!req.body.user_id) {
            return res.send({
                success: false,
                message: "Please enter user id"
            });
        }
        if (!req.body.category) {
            return res.send({
                success: false,
                message: "Please select category name"
            });
        }
        if (!req.body.uploadImageThrughAPK && !req.files) {
            return res.send({
                success: false,
                message: "Please select property picture."
            });
        }
        if (req.body.uploadImageThrughAPK == '[]' && req.files == []) {
            return res.send({
                success: false,
                message: "Please select property picture."
            });
        }
        // if (!req.files) {
        //     return res.send({
        //         success: false,
        //         message: "Please select property photos"
        //     });
        // }
        let imgArr = [];

        //console.log("images of property upload photos", typeof (req.files));
        if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined' && req.body.uploadImageThrughAPK != '[]') {
            //console.log("uploadImageThrughAPK : ", req.body.uploadImageThrughAPK);
            //console.log("in loop jjjjjjjjjjjjjjjjjjjjjjjjjj");
            let imageArr = JSON.parse(req.body.uploadImageThrughAPK);
            for (let i = 0; i < imageArr.length; i++) {
                imgArr.push({
                    src: imageArr[i].src,
                    orgName: imageArr[i].orgName,
                })
            }
        } else if (req.files != undefined) {
            //console.log("req files : ", req.files);
            req.files.forEach(element => {
                imgArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        //console.log("alll property array photos : ", imgArr);
        req.body.property_photos = imgArr;
        new Upload_category_photos(req.body).save(function (err, result) {
            if (err) {
                response = {
                    success: false,
                    error: true,
                    message: "Error in upload category photos"
                };
            } else {
                response = {
                    error: false,
                    success: true,
                    message: "Your photos uploaded successfully.",
                };
            }
            res.send(response);
        });
    } catch (error) {
        //console.log("Error in upload category photos save", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getCategoryPhotos = async (req, res) => {
    if (!req.body.category) {
        return res.send({
            success: false,
            message: "Please select category name"
        });
    }

    let imgArr = [];
    try {
        let getdata = await Upload_category_photos.find({
            category: req.body.category
        }).select('property_photos').sort({
            '_id': -1
        });
        if (!getdata) {
            return res.send({
                success: false,
                message: "Error in get catregory phtots"
            });
        }
        return res.send({
            success: true,
            message: "All get category photos",
            getdata: getdata,
        });
    } catch (error) {
        //console.log("Error in get catrgory phtots", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getUserAllPostPhotosById = async (req, res) => {
    if (!req.body.user_id) {
        return res.send({
            success: false,
            message: "Please enter user id"
        });
    }

    let imgArr = [];
    try {
        let getdata = await Upload_category_photos.find({
            user_id: req.body.user_id
        }).select('property_photos').sort({
            '_id': -1
        });
        if (!getdata) {
            return res.send({
                success: false,
                message: "Error in get user phtots"
            });
        }
        return res.send({
            success: true,
            message: "All get user photos",
            getdata: getdata,
        });
    } catch (error) {
        //console.log("Error in get user phtots", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.setForgetUserPassword = async (req, res) => {
    if (!req.body.username) {
        return res.send({
            success: false,
            message: "Please enter username"
        });
    }
    if (req.body.username.length < 4) {
        return res.send({
            success: false,
            message: messages.USERNAME_4DIGIT
        });
    }
    if (!req.body.created_by || req.body.created_by == "") {
        return res.send({
            success: false,
            message: "Please enter website name."
        });
    }
    /////console.log("result user Info : ",resultId)      
    try {
        var check = await User.findOne({
            username: req.body.username
        });
        ////console.log("checkkkkkk : ",check)
        if (!check) {
            return res.send({
                success: false,
                message: "Invalid username."
            });
        }
        let OTPEmail = Math.floor(100000 + Math.random() * 900000);
        let forgetUserOTP = {
            forgetOtp: OTPEmail
        }
        //console.log(OTPEmail);
        let updateOTP = await User.findByIdAndUpdate(check._id, forgetUserOTP);
        if (!updateOTP) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }

        // localStorage.setItem('forgetUserOTP',JSON.stringify(forgetUserOTP));

        /**node mailer code*/
        if (req.body.created_by === 'WeCoOwn') {
            var nodemailer = require('nodemailer');

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                type: "SMTP",
                host: "smtp.gmail.com",
                secure: true,
                auth: {
                    user: 'wecoowntest@gmail.com',
                    pass: 'wecon123'
                }
            });
            // let urlMerge = 'http://localhost:4200/verifyEmailLink?VerifyNewsSubscription=' + req.body.name;
            let urlMerge = 'https://wecoown.com/verifyEmailLink?VerifyNewsSubscription=' + check.username;
            var mailOptions = {
                from: 'WeCoOwn <wecoowntest@gmail.com>',
                to: 'karishmasoni396@gmail.com,' + check.email + '',
                subject: 'Message from WeCoOwn Website for Forgot Password!',
                html: `<!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <style>
                            *{
                                box-sizing: border-box;
                            }            
                            body {
                                font-family: Arial, Helvetica, sans-serif;
                            }            
                            /* Style the header */
                            header,footer{
                                background-color: #0b3655;
                                padding: 10px;
                                text-align: center;
                                color: white;
                            }
                        </style>
                    </head>
                    <body>
                        <header>
                            <h3 style="margin: 0px;">WeCoOwn</h3>
                        </header>            
                        <section style="background: #f1f1f178;padding-bottom: 10px;">  
                            <div style="text-align:center;">
                                <a href="https://wecoown.com/" onclick="window.open(this.href,this.href); return false"><img src="https://wecoown.com/assets/images/Original-1.png" width="110px" style="margin-top: 20px;"></a>
                                <p style="padding: 15px 15%;margin: 0;font-weight: 600;font-style: italic;">Community Platform | Finding Potential Co-Owners | Buy and Manage Assets or Properties Together</p>
                                <div style="margin: 0px 20%;background: orange;padding: 10px;color: white;">                              
                                    <h3>Hi, &nbsp;` + check.username + `</h3>
                                    <p>Use below code for setting the New Password.</p>
                                    <p>Your code is : <label style="font-weight: 900;font-size: 24px;">` + OTPEmail + ` </label></p>
                                    <p>If you received this email by mistake, simply delete it.</p>                              
                                    <p>Thanks,</p>
                                    <p>WeCoOwn Support<p>
                                    <br>
                                </div>
                            </div>                
                        </section>
                        <footer>
                            <div>
                                <a href="https://www.facebook.com/wecoown" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-fb-icon.jpg">
                                </a>                    
                                <a href="https://www.instagram.com/wecoown/" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-insta-icon.jpg">
                                </a>
                                <a href="https://www.linkedin.com/company/wecoown/" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-linkedin-icon.jpg">
                                </a>
                                <a href="https://twitter.com/WeCoOwn" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-twitter-icon.jpg" style="margin-left: -3px;">
                                </a>
                                <a href="https://www.youtube.com/channel/UCOwKKGKaK2DWkiZJi9-CfQA" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-youtube-icon.jpg">
                                </a>
                                <a href="https://medium.com/wecoown" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-medium-icon.jpg" style="margin-bottom: 4px; margin-left: -5px; height: 45;">
                                </a>
                                <br>
                                <a href="https://wecoown.com/terms-conditions" style="color: white;" onclick="window.open(this.href,this.href); return false">Terms & Conditions</a> |
                                <a href="https://wecoown.com/privacy-policy" style="color: white;" onclick="window.open(this.href,this.href); return false">Privacy Policy</a><br>
                                <p>© 2020 WeCoOwn, Inc. All rights reserved.</p>
                            </div>
                        </footer>
                    </body>
                </html>`
                // html: '<div style="background-color:#f6f8f1; padding:15px; font-size: 20px;font-family: sans-serif; ">' +
                //     ' <div style="background-color:white;padding:20px;margin:10px;">' +
                //     '<h3>Hi, &nbsp;' + check.username + '</h3><br>' +
                //     '<p>Use below code for setting the New Password.</p>' +
                //     ' <p>Your code is : <label style="font-weight: 900;font-size: 24px;">' + OTPEmail + ' </label></p><br>' +
                //     '<br><p>Thanks,</p><p>WeCoOwn Support<p><br>' +
                //     '</div> ' +
                //     ' </div>'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    //console.log(error);
                    return res.send({
                        success: false,
                        message: error
                    });
                } else {
                    //console.log('Forgot password Email sent');
                    return res.send({
                        success: true,
                        message: "For setting new password the code has been sent to your email inbox!",
                        username: req.body.username
                    });
                }
            });
        } else if (req.body.created_by === 'WePropertyowners') {
            var nodemailer = require('nodemailer');

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                type: "SMTP",
                host: "smtp.gmail.com",
                secure: true,
                auth: {
                    user: 'wepropertyowner@gmail.com',
                    pass: 'wepo9876'
                }
            });
            // let urlMerge = 'http://localhost:4200/verifyEmailLink?VerifyNewsSubscription=' + req.body.name;
            let urlMerge = 'https://wepropertyowners.com/verifyEmailLink?VerifyNewsSubscription=' + check.username;
            var mailOptions = {
                from: 'WePropertyowners <wepropertyowner@gmail.com>',
                to: 'karishmasoni396@gmail.com,' + check.email + '',
                subject: 'Message from WePropertyowners Website for Forgot Password!',
                html: `<!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <style>
                            *{
                                box-sizing: border-box;
                            }            
                            body {
                                font-family: Arial, Helvetica, sans-serif;
                            }            
                            /* Style the header */
                            header,footer{
                                background-color: #0b3655;
                                padding: 10px;
                                text-align: center;
                                color: white;
                            }
                        </style>
                    </head>
                    <body>
                        <header>
                            <h3 style="margin: 0px;">WePropertyowners</h3>
                        </header>            
                        <section style="background: #f1f1f178;padding-bottom: 10px;">  
                            <div style="text-align:center;">
                                <a href="http://wepropertyowners.com/" onclick="window.open(this.href,this.href); return false"><img src="http://wepropertyowners.com/assets/images/Trans-1.png" width="110px" style="margin-top: 20px;"></a>
                                <p style="padding: 15px 15%;margin: 0;font-weight: 600;font-style: italic;">Sale and lease listings platform for properties and assets</p>
                                <div style="margin: 0px 20%;background: orange;padding: 10px;color: white;">                              
                                    <h3>Hi, &nbsp;` + check.username + `</h3>
                                    <p>Use below code for setting the New Password.</p>
                                    <p>Your code is : <label style="font-weight: 900;font-size: 24px;">` + OTPEmail + ` </label></p>
                                    <p>If you received this email by mistake, simply delete it.</p>                              
                                    <p>Thanks,</p>
                                    <p>WePropertyowners Support<p>
                                    <br>
                                </div>
                            </div>                
                        </section>
                        <footer>
                            <div>
                                <a href="https://www.facebook.com/WePropertyOwners/" onclick="window.open(this.href,this.href); return false">
                                    <img src="http://wepropertyowners.com/assets/images/email-fb-icon.jpg">
                                </a>                    
                                <a href="https://www.instagram.com/wepropertyowners/" onclick="window.open(this.href,this.href); return false">
                                    <img src="http://wepropertyowners.com/assets/images/email-insta-icon.jpg">
                                </a>
                                <a href="https://www.linkedin.com/company/wepropertyowners" onclick="window.open(this.href,this.href); return false">
                                    <img src="http://wepropertyowners.com/assets/images/email-linkedin-icon.jpg">
                                </a>
                                <a href="https://twitter.com/WePropOwners?s=09" onclick="window.open(this.href,this.href); return false">
                                    <img src="http://wepropertyowners.com/assets/images/email-twitter-icon.jpg" style="margin-left: -3px;">
                                </a>
                                <a href="https://www.youtube.com/channel/UCOwKKGKaK2DWkiZJi9-CfQA" onclick="window.open(this.href,this.href); return false">
                                    <img src="http://wepropertyowners.com/assets/images/email-youtube-icon.jpg">
                                </a>
                                <a href="https://medium.com/wecoown" onclick="window.open(this.href,this.href); return false">
                                    <img src="http://wepropertyowners.com/assets/images/email-medium-icon.jpg" style="margin-bottom: 4px; margin-left: -5px; height: 45;">
                                </a>
                                <br>
                                <a href="http://wepropertyowners.com/terms-conditions" style="color: white;" onclick="window.open(this.href,this.href); return false">Terms & Conditions</a> |
                                <a href="http://wepropertyowners.com/privacy-policy" style="color: white;" onclick="window.open(this.href,this.href); return false">Privacy Policy</a><br>
                                <p>© 2020 WeCoOwn, Inc. All rights reserved.</p>
                            </div>
                        </footer>
                    </body>
                </html>`
                // html: '<div style="background-color:#f6f8f1; padding:15px; font-size: 20px;font-family: sans-serif; ">' +
                //     ' <div style="background-color:white;padding:20px;margin:10px;">' +
                //     '<h3>Hi, &nbsp;' + check.username + '</h3><br>' +
                //     '<p>Use below code for setting the New Password.</p>' +
                //     ' <p>Your code is : <label style="font-weight: 900;font-size: 24px;">' + OTPEmail + ' </label></p><br>' +
                //     '<br><p>Thanks,</p><p>WePropertyowners Support<p><br>' +
                //     '</div> ' +
                //     ' </div>'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    //console.log(error);
                    return res.send({
                        success: false,
                        message: error
                    });
                } else {
                    //console.log('Forgot password Email sent');
                    return res.send({
                        success: true,
                        message: "For setting new password the code has been sent to your email inbox.",
                        username: req.body.username
                    });
                }
            });
        }
        /**node mailer code */

    } catch (error) {
        //console.log("User Profile change password", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.setVerifyOTPForgetUserPassword = async (req, res) => {
    //console.log("req.body : ", req.body);
    if (!req.body.username) {
        return res.send({
            success: false,
            message: "Please enter username"
        });
    }
    if (req.body.username.length < 4) {
        return res.send({
            success: false,
            message: messages.USERNAME_4DIGIT
        });
    }
    if (!req.body.otp) {
        return res.send({
            success: false,
            message: "Please enter code"
        });
    }
    if (req.body.otp.length < 6) {
        return res.send({
            success: false,
            message: "OTP must be greater than 5 digit"
        });
    }
    try {
        var check = await User.findOne({
            username: req.body.username
        });
        ////console.log("checkkkkkk : ",check)
        if (!check) {
            return res.send({
                success: false,
                message: "Invalid username"
            });
        }
        if (check.forgetOtp === parseInt(req.body.otp)) {
            return res.send({
                success: true,
                message: "Now you can set the new password"
            });
        } else {
            return res.send({
                success: false,
                message: "Invalid code"
            });
        }
    } catch (error) {
        //console.log("User Profile change password", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.setForgetUserPasswordUpdate = async (req, res) => {
    if (!req.body.username) {
        return res.send({
            success: false,
            message: "Please enter username"
        });
    }
    if (req.body.username.length < 4) {
        return res.send({
            success: false,
            message: messages.USERNAME_4DIGIT
        });
    }
    if (!req.body.new_password || req.body.new_password == "") {
        return res.send({
            success: false,
            message: "Please enter new password"
        });
    }
    if (!req.body.confirm_password || req.body.confirm_password == "") {
        return res.send({
            success: false,
            message: "Please enter confirm password"
        });
    }
    if (req.body.new_password != req.body.confirm_password) {
        return res.send({
            success: false,
            message: messages.NEW_MISS_MATCH_PASSWORD
        });
    }

    /////console.log("result user Info : ",resultId)      
    try {
        var check = await User.findOne({
            username: req.body.username
        });
        ////console.log("checkkkkkk : ",check)
        if (!check) {
            return res.send({
                success: false,
                message: "Invalid username"
            });
        }
        NewCodedpassword = bcrypt.hashSync(req.body.new_password, 10);
        userNewPass = {
            password: NewCodedpassword
        }
        var updateData = await User.findByIdAndUpdate(check._id, userNewPass);
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: messages.RESET_PASSWORD
        });

    } catch (error) {
        //console.log("User Profile change password", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.setUserChangePassword = async (req, res) => {
    if (!req.body.id || req.body.id == "") {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    if (!req.body.old_password || req.body.old_password == "") {
        return res.send({
            success: false,
            message: "Please enter old password."
        });
    }
    if (!req.body.new_password || req.body.new_password == "") {
        return res.send({
            success: false,
            message: "Please enter new password."
        });
    }
    if (!req.body.confirm_password || req.body.confirm_password == "") {
        return res.send({
            success: false,
            message: "Please enter confirm password."
        });
    }
    if (req.body.new_password != req.body.confirm_password) {
        return res.send({
            success: false,
            message: messages.NEW_MISS_MATCH_PASSWORD
        });
    }

    /////console.log("result user Info : ",resultId)      
    try {
        var check = await User.findOne({
            _id: req.body.id
        }).select("password");
        ////console.log("checkkkkkk : ",check)
        if (!check) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        let result = bcrypt.compareSync(req.body.old_password, check.password);
        ////console.log("::",result,check.password,req.body.password );
        if (!result) {
            return res.send({
                success: false,
                message: messages.INVALID_OLD_PASSWORD
            });
        }
        if (result == true) {
            req.body.password = bcrypt.hashSync(req.body.new_password, 10);
            var updateData = await User.findByIdAndUpdate(req.body.id, req.body);
            if (!updateData) {
                return res.send({
                    success: false,
                    message: messages.ERROR
                });
            }
            return res.send({
                success: true,
                message: messages.RESET_PASSWORD
            });
        }
    } catch (error) {
        //console.log("User Profile change password", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.setForgetUsername = async (req, res) => {
    if (!req.body.email) {
        return res.send({
            success: false,
            message: "Please enter email address"
        });
    }
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!regex.test(req.body.email)) {
        return res.send({
            success: false,
            message: "Please enter your valid email address"
        });
    }
    if (!req.body.created_by || req.body.created_by == "") {
        return res.send({
            success: false,
            message: "Please enter website name."
        });
    }
    /////console.log("result user Info : ",resultId)      
    try {
        var check = await User.findOne({
            email: req.body.email
        });
        ////console.log("checkkkkkk : ",check)
        if (!check) {
            return res.send({
                success: false,
                message: "Invalid email address"
            });
        }

        // localStorage.setItem('forgetUserOTP',JSON.stringify(forgetUserOTP));

        /**node mailer code*/
        if (req.body.created_by === 'WeCoOwn') {
            var nodemailer = require('nodemailer');

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                type: "SMTP",
                host: "smtp.gmail.com",
                secure: true,
                auth: {
                    user: 'wecoowntest@gmail.com',
                    pass: 'wecon123'
                }
            });
            // let urlMerge = 'http://localhost:4200/verifyEmailLink?VerifyNewsSubscription=' + req.body.name;
            let urlMerge = 'https://wecoown.com/verifyEmailLink?VerifyNewsSubscription=' + check.username;
            var mailOptions = {
                from: 'WeCoOwn <wecoowntest@gmail.com>',
                to: 'karishmasoni396@gmail.com,' + check.email + '',
                subject: 'Message from WeCoOwn Website for Forgot Username!',
                html: `<!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <style>
                            *{
                                box-sizing: border-box;
                            }            
                            body {
                                font-family: Arial, Helvetica, sans-serif;
                            }            
                            /* Style the header */
                            header,footer{
                                background-color: #0b3655;
                                padding: 10px;
                                text-align: center;
                                color: white;
                            }
                        </style>
                    </head>
                    <body>
                        <header>
                            <h3 style="margin: 0px;">WeCoOwn</h3>
                        </header>            
                        <section style="background: #f1f1f178;padding-bottom: 10px;">  
                            <div style="text-align:center;">
                                <a href="https://wecoown.com/" onclick="window.open(this.href,this.href); return false"><img src="https://wecoown.com/assets/images/Original-1.png" width="110px" style="margin-top: 20px;"></a>
                                <p style="padding: 15px 15%;margin: 0;font-weight: 600;font-style: italic;">Community Platform | Finding Potential Co-Owners | Buy and Manage Assets or Properties Together</p>
                                <div style="margin: 0px 20%;background: orange;padding: 10px;color: white;">      
                                    <h3>Hi</h3>
                                    <p>Below is your username associated with your email address :</p>
                                    <label style="font-weight: 900;font-size: 24px;">` + check.username + ` </label>                     
                                    <p>If you received this email by mistake, simply delete it.</p>                              
                                    <p>Thanks,</p>
                                    <p>WeCoOwn Support<p>
                                    <br>
                                </div>
                            </div>                
                        </section>
                        <footer>
                            <div>
                                <a href="https://www.facebook.com/wecoown" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-fb-icon.jpg">
                                </a>                    
                                <a href="https://www.instagram.com/wecoown/" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-insta-icon.jpg">
                                </a>
                                <a href="https://www.linkedin.com/company/wecoown/" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-linkedin-icon.jpg">
                                </a>
                                <a href="https://twitter.com/WeCoOwn" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-twitter-icon.jpg" style="margin-left: -3px;">
                                </a>
                                <a href="https://www.youtube.com/channel/UCOwKKGKaK2DWkiZJi9-CfQA" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-youtube-icon.jpg">
                                </a>
                                <a href="https://medium.com/wecoown" onclick="window.open(this.href,this.href); return false">
                                    <img src="https://wecoown.com/assets/images/email-medium-icon.jpg" style="margin-bottom: 4px; margin-left: -5px; height: 45;">
                                </a>
                                <br>
                                <a href="https://wecoown.com/terms-conditions" style="color: white;" onclick="window.open(this.href,this.href); return false">Terms & Conditions</a> |
                                <a href="https://wecoown.com/privacy-policy" style="color: white;" onclick="window.open(this.href,this.href); return false">Privacy Policy</a><br>
                                <p>© 2020 WeCoOwn, Inc. All rights reserved.</p>
                            </div>
                        </footer>
                    </body>
                </html>`
                // html: '<div style="background-color:#f6f8f1; padding:15px; font-size: 20px;font-family: sans-serif; ">' +
                //     ' <div style="background-color:white;padding:20px;margin:10px;">' +
                //     '<h3>Hi</h3><br>' +
                //     '<p>Below is your username associated with your email address :</p> ' +
                //     '<label style="font-weight: 900;font-size: 24px;">' + check.username + ' </label><br>' +
                //     '<br><p>Thanks,</p><p>WeCoOwn Support<p><br>' +
                //     '</div> ' +
                //     ' </div>'
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    //console.log(error);
                    return res.send({
                        success: false,
                        message: error
                    });
                } else {
                    //console.log('News Subscription Email sent');
                    return res.send({
                        success: true,
                        message: "Your username has been sent to your email inbox!",
                        username: req.body.username
                    });
                }
            });
        } else if (req.body.created_by === 'WePropertyowners') {
            var nodemailer = require('nodemailer');

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                type: "SMTP",
                host: "smtp.gmail.com",
                secure: true,
                auth: {
                    user: 'wepropertyowner@gmail.com',
                    pass: 'wepo9876'
                }
            });
            // let urlMerge = 'http://localhost:4200/verifyEmailLink?VerifyNewsSubscription=' + req.body.name;
            let urlMerge = 'https://wepropertyowners.com/verifyEmailLink?VerifyNewsSubscription=' + check.username;
            var mailOptions = {
                from: 'WePropertyowners <wepropertyowner@gmail.com>',
                to: 'karishmasoni396@gmail.com,' + check.email + '',
                subject: 'Message from WePropertyowners Website for Forgot Username!',
                html: `<!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <style>
                            *{
                                box-sizing: border-box;
                            }            
                            body {
                                font-family: Arial, Helvetica, sans-serif;
                            }            
                            /* Style the header */
                            header,footer{
                                background-color: #0b3655;
                                padding: 10px;
                                text-align: center;
                                color: white;
                            }
                        </style>
                    </head>
                    <body>
                        <header>
                            <h3 style="margin: 0px;">WePropertyowners</h3>
                        </header>            
                        <section style="background: #f1f1f178;padding-bottom: 10px;">  
                            <div style="text-align:center;">
                                <a href="http://wepropertyowners.com/" onclick="window.open(this.href,this.href); return false"><img src="http://wepropertyowners.com/assets/images/Trans-1.png" width="110px" style="margin-top: 20px;"></a>
                                <p style="padding: 15px 15%;margin: 0;font-weight: 600;font-style: italic;">Sale and lease listings platform for properties and assets</p>
                                <div style="margin: 0px 20%;background: orange;padding: 10px;color: white;">   
                                    <h3>Hi</h3>
                                    <p>Below is your username associated with your email address :</p>
                                    <label style="font-weight: 900;font-size: 24px;">` + check.username + ` </label> 
                                    <p>If you received this email by mistake, simply delete it.</p>                              
                                    <p>Thanks,</p>
                                    <p>WePropertyowners Support<p>
                                    <br>
                                </div>
                            </div>                
                        </section>
                        <footer>
                            <div>
                                <a href="https://www.facebook.com/WePropertyOwners/" onclick="window.open(this.href,this.href); return false">
                                    <img src="http://wepropertyowners.com/assets/images/email-fb-icon.jpg">
                                </a>                    
                                <a href="https://www.instagram.com/wepropertyowners/" onclick="window.open(this.href,this.href); return false">
                                    <img src="http://wepropertyowners.com/assets/images/email-insta-icon.jpg">
                                </a>
                                <a href="https://www.linkedin.com/company/wepropertyowners" onclick="window.open(this.href,this.href); return false">
                                    <img src="http://wepropertyowners.com/assets/images/email-linkedin-icon.jpg">
                                </a>
                                <a href="https://twitter.com/WePropOwners?s=09" onclick="window.open(this.href,this.href); return false">
                                    <img src="http://wepropertyowners.com/assets/images/email-twitter-icon.jpg" style="margin-left: -3px;">
                                </a>
                                <a href="https://www.youtube.com/channel/UCOwKKGKaK2DWkiZJi9-CfQA" onclick="window.open(this.href,this.href); return false">
                                    <img src="http://wepropertyowners.com/assets/images/email-youtube-icon.jpg">
                                </a>
                                <a href="https://medium.com/wecoown" onclick="window.open(this.href,this.href); return false">
                                    <img src="http://wepropertyowners.com/assets/images/email-medium-icon.jpg" style="margin-bottom: 4px; margin-left: -5px; height: 45;">
                                </a>
                                <br>
                                <a href="http://wepropertyowners.com/terms-conditions" style="color: white;" onclick="window.open(this.href,this.href); return false">Terms & Conditions</a> |
                                <a href="http://wepropertyowners.com/privacy-policy" style="color: white;" onclick="window.open(this.href,this.href); return false">Privacy Policy</a><br>
                                <p>© 2020 WeCoOwn, Inc. All rights reserved.</p>
                            </div>
                        </footer>
                    </body>
                </html>`
                // html: '<div style="background-color:#f6f8f1; padding:15px; font-size: 20px;font-family: sans-serif; ">' +
                //     ' <div style="background-color:white;padding:20px;margin:10px;">' +
                //     '<h3>Hi</h3><br>' +
                //     '<p>Below is your username associated with your email address :</p> ' +
                //     '<label style="font-weight: 900;font-size: 24px;">' + check.username + ' </label><br>' +
                //     '<br><p>Thanks,</p><p>WePropertyowners Support<p><br>' +
                //     '</div> ' +
                //     ' </div>'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    //console.log(error);
                    return res.send({
                        success: false,
                        message: error
                    });
                } else {
                    //console.log('News Subscription Email sent');
                    return res.send({
                        success: true,
                        message: "Your username has been sent to your email inbox.",
                        username: req.body.username
                    });
                }
            });
        }
        /**node mailer code */

    } catch (error) {
        //console.log("User Profile change password", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.setSearchForBuyer = async (req, res) => {
    //console.log("req body search buyer : ", req.body);

    /////console.log("result user Info : ",resultId)      
    try {
        let cat = req.body.category;
        let property = req.body.property_desciption;
        let getData = [];
        if (cat != "" && (property == "" || property == null || property == undefined)) {
            //console.log("ONLY CATEGORY SEARCH");
            getData = await I_am_buyer.find({
                category: req.body.category
            }).sort('category');
        } else if (property != "" && (cat == "" || cat == null || cat == undefined)) {
            //console.log("ONLY property SEARCH");
            getData = await I_am_buyer.find({
                $text: {
                    $search: property
                }
            }, {
                score: {
                    $meta: "textScore"
                }
            }).sort({
                score: {
                    $meta: "textScore"
                }
            })
        } else if (cat != "" && property != "") {
            //console.log("BOTH CATEGORY property SEARCH");
            // getData = await I_am_buyer.find({ "name": /m/ , category : req.body.category})
            getData = await I_am_buyer.find({
                $text: {
                    $search: property
                },
                category: req.body.category
            }, {
                score: {
                    $meta: "textScore"
                }
            }).sort({
                score: {
                    $meta: "textScore"
                }
            })
        } else {
            getData = await I_am_buyer.find({}).sort('category');
        }
        //console.log("getData : ", getData)
        if (!getData) {
            return res.send({
                success: false,
                message: "Error in search buyer data"
            });
        }
        return res.send({
            success: true,
            message: "Search buyer Data",
            dataCount: getData.length,
            getData: getData
        });

    } catch (error) {
        //console.log("User Profile change password", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getAllBuyerData = async (req, res) => {
    try {
        var data = await I_am_buyer.find({});
        //console.log("all act : ", data);
        if (!data) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "All Buyer list",
            data: data,
        });
    } catch (error) {
        //console.log("Error in Buyer", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.setUserMembership = async (req, res) => {
    //console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.user_id) {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    if (!req.body.membership_type) {
        return res.send({
            success: false,
            message: "Please select membership type."
        });
    }
    if (!req.body.Card_Number) {
        return res.send({
            success: false,
            message: "Please enter card number."
        });
    }
    if (!req.body.Card_Type) {
        return res.send({
            success: false,
            message: "Please enter card type."
        });
    }
    if (!req.body.cvv) {
        return res.send({
            success: false,
            message: "Please enter CVV."
        });
    }
    if (!req.body.card_holder_name) {
        return res.send({
            success: false,
            message: "Please enter card holder name."
        });
    }
    if (!req.body.expiration_card_date) {
        return res.send({
            success: false,
            message: "Please select expiration date printed on card."
        });
    }
    try {
        Date.prototype.addDays = function (d) {
            this.setHours(this.getHours() + d * 24);
            return this;
        };
        let checkPreviousMember = await User_membership.findOne({
            user_id: req.body.user_id
        });
        //console.log("checkPreviousMember : ", checkPreviousMember);
        if (checkPreviousMember != null) {
            //console.log("ifffffffffffffff");
            req.body.membership_start_date = new Date();
            let newdateAddDays = new Date().addDays(30);
            req.body.membership_end_date = newdateAddDays;
            let checkdata = await User_membership.findByIdAndUpdate(checkPreviousMember._id, req.body);
            //console.log("checkdata : ", checkdata);
            if (!checkdata || checkdata == null) {
                return obj = {
                    success: false,
                    message: "Error in upgrade membership."
                };
            } else {
                return res.send({
                    success: true,
                    message: "Your membership upgraded successfully."
                });
            }
        } else {
            req.body.membership_start_date = new Date();
            let newdateAddDays = new Date().addDays(30);
            req.body.membership_end_date = newdateAddDays;
            new User_membership(req.body).save(function (err, result) {
                if (err) {
                    response = {
                        success: false,
                        error: true,
                        message: "Error in add membership"
                    };
                } else {
                    response = {
                        error: false,
                        success: true,
                        message: "Your membership added successfully.",
                    };
                }
                res.send(response);
            });
        }
    } catch (error) {
        //console.log("Error in create membership added", error);
        return res.send({
            success: false,
            message: "Error in set user membership."
        });
    }
};

exports.checkAlreadyUserMembership = async (req, res) => {
    //console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.user_id) {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    try {
        var checkPreviousMember = await User_membership.findOne({
            user_id: req.body.user_id,
        });
        //console.log("checkPreviousMember : ", checkPreviousMember);
        if (checkPreviousMember == [] || checkPreviousMember == null) {
            return res.send({
                success: false,
                message: "User not have any membership."
            });
        } else {
            if (checkPreviousMember.membership_end_date <= new Date()) {
                return res.send({
                    success: false,
                    code: 800,
                    message: "Your membership has expired. Please upgrade your membership",
                    expired_membership: checkPreviousMember.membership_type
                    // getdata: checkPreviousMember
                });
            } else {
                return res.send({
                    success: true,
                    message: "You already having a membership.",
                    getdata: checkPreviousMember
                });
            }
        }
    } catch (error) {
        //console.log("Error in create membership added", error);
        return res.send({
            success: false,
            message: "Error in check user membership"
        });
    }
};

exports.getAllVerfiedUserForInvitation = async (req, res) => {
    //console.log("getAllVerfiedUserForInvitation postttttttttt req body : ", req.body)
    if (!req.body.user_id) {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    try {
        var getAllMembers = await User.find({
            _id: {
                $nin: req.body.user_id
            },
            verfied: "Yes",
        }).select('firstname lastname profile_pic');
        ////console.log("getAllMembers : ", getAllMembers);
        if (getAllMembers == [] || getAllMembers == null) {
            return res.send({
                success: false,
                message: "No verified user found."
            });
        } else {
            return res.send({
                success: true,
                message: "All users.",
                getdata: getAllMembers
            });
        }
    } catch (error) {
        //console.log("Error in get verified user", error);
        return res.send({
            success: false,
            message: "Error in get verified user."
        });
    }
};

exports.createMyPbmsGroup = async (req, res) => {
    //console.log("createMyPbmsGroup postttttttttt req body : ", req.body)
    //console.log("createMyPbmsGroup postttttttttt req body : ", req.files)
    if (!req.body.property_url) {
        return res.send({
            success: false,
            message: "Please enter property url."
        });
    }
    let checkPreData = await Pbms.findOne({
        property_url: req.body.property_url,
        "status": 'Active'
    })
    if (checkPreData != null) {
        if (checkPreData.property_url === req.body.property_url) {
            return res.send({
                success: false,
                message: "Property url already exist. Please enter another property url."
            });
        }
    }
    if (!req.body.title) {
        return res.send({
            success: false,
            message: "Please enter title."
        });
    }
    if (!req.body.group_creater_id) {
        return res.send({
            success: false,
            message: "Please enter your user id."
        });
    }
    if (!req.body.getAllUser) {
        return res.send({
            success: false,
            message: "Please enter user list."
        });
    }
    if (!req.body.typeOfForm) {
        return res.send({
            success: false,
            message: "Please enter type of form."
        });
    }
    if (!req.body.category) {
        return res.send({
            success: false,
            message: "Please select category."
        });
    }
    try {
        // for checking user have which type of membership 
        let checkPreviousMember = await User_membership.findOne({
            user_id: req.body.group_creater_id
        });
        let getPrePropertyCount = await Pbms.find({
            group_creater_id: req.body.group_creater_id,
            "status": 'Active'
        }).count();
        //console.log("checkPreviousMember : ", checkPreviousMember);
        //console.log("getPrePropertyCount : ", getPrePropertyCount);
        if (checkPreviousMember.membership_type === "1") {
            if (getPrePropertyCount >= 3) {
                return res.send({
                    success: false,
                    code: 901,
                    message: "In premium membership, you can only be admin of 3 properties."
                });
            }
        }
        // for images
        let AllImages = [];
        if (req.body.typeOfForm != "third-property") {
            if (req.body.property_photos != undefined) {
                if (req.body.property_photos != '[]') {
                    //console.log("prevuois image : ", req.body.previous_images);
                    var preImg = JSON.parse(req.body.property_photos);
                    //console.log("pre image parse : ", preImg);
                    //console.log("pre image parse trrrrrrrrr : ", preImg[0].orgName);
                    for (let jk = 0; jk < preImg.length; jk++) {
                        AllImages.push({
                            src: preImg[jk].src,
                            orgName: preImg[jk].orgName,
                        })
                    }
                    //console.log("after previous merge : ", progileImageArr);
                }
            }
        }
        let types = /(\.|\/)(jpeg|jpg|png)$/i;
        if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined' && req.body.uploadImageThrughAPK != '[]') {
            let imageArr = JSON.parse(req.body.uploadImageThrughAPK);
            for (let i = 0; i < imageArr.length; i++) {
                AllImages.push({
                    src: imageArr[i].src,
                    orgName: imageArr[i].orgName,
                })
            }
        } else if (req.files != undefined) {
            req.files.forEach(element => {
                if (types.test(element.originalname)) {
                    AllImages.push({
                        src: 'uploads/' + element.filename,
                        orgName: element.originalname,
                    })
                } else {
                    return res.send({
                        success: false,
                        pre_membership_data: checkPreviousMember,
                        message: "Please select property photos.(Images only in jpg/jpeg/png)"
                    });
                }
                // if (element.originalname.substring(element.originalname.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
                //     return res.send({
                //         success: false,
                //         message: "Please select document in pdf format."
                //     });
                // } else {
                //     getPdfFile.push({
                //         src: 'uploads/' + element.filename,
                //         orgName: element.originalname,
                //     })
                // }
            });
            //console.log("profile_pic pic coverImageArr", progileImageArr);
            //console.log("profile_pic pic ", req.body.profile_pic);
        }
        req.body.property_images = AllImages;
        //  else if (checkPreviousMember.membership_type === "2") {
        //     if (getPrePropertyCount >= 3) {                
        //         return res.send({
        //             success: false,
        //             code:902,
        //             pre_membership_data : checkPreviousMember,
        //             message: "In professional membership you can only be admin of 3 properties. For more admin of properties please upgrade your membership."
        //         });
        //     }
        // }
        let createNewArr = [];
        let AllRecevierId = JSON.parse(req.body.getAllUser);
        for (let ijk = 0; ijk < AllRecevierId.length; ijk++) {
            //console.log("inner loop", AllRecevierId[ijk]);
            createNewArr.push({
                invited_by_user_id: req.body.group_creater_id,
                user_id: AllRecevierId[ijk],
                request_for_admin: {
                    action: 'No'
                },
                status: 'Pending',
                read: false,
                is_admin: false
            })
            //console.log("in loop new array : ", createNewArr);
        }
        req.body.recevier_id = createNewArr;
        req.body.all_admins = [{
            user_id: req.body.group_creater_id
        }]
        //console.log("before create my portfolii  boduy : ", req.body);
        new Pbms(req.body).save(function (err, result) {
            //console.log("Error in send invitation create my portfolio : ", err);
            //console.log("result in send invitation create my portfolio : ", result);
            if (err) {
                response = {
                    success: false,
                    error: true,
                    message: "Error in create my portfolio"
                };
                res.send(response);
            }
        });
        // for (let ijk = 0; ijk < req.body.getAllUser.length; ijk++) {
        //     req.body.recevier_id = req.body.getAllUser[ijk];
        //     req.body.read = false;
        //     req.body.name = 1;
        //     new Pbms(req.body).save(function (err, result) {
        //        //console.log("Error in send invitation create my portfolio : ", err);
        //         if (err) {
        //             response = {
        //                 success: false,
        //                 error: true,
        //                 message: "Error in create my portfolio"
        //             };
        //             res.send(response);
        //         }
        //     });
        // }
        return res.send({
            success: true,
            message: "Your new Co-Owners Group created successfully."
        });
    } catch (error) {
        //console.log("Error in  New Co-Owners Group created", error);
        return res.send({
            success: false,
            message: "Error in  new Co-Owners Group created"
        });
    }
};

exports.getMyPbmsById = async (req, res) => {
    ////console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.user_id) {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    try {
        var checkdata1 = await Pbms.find({
            $or: [{
                "recevier_id.user_id": req.body.user_id,
                "recevier_id.status": {
                    $in: ['Accept', 'Pending']
                },
                "status": 'Active'
            }, {
                group_creater_id: req.body.user_id,
                "status": 'Active'
            }],
        }).populate('group_creater_id recevier_id.user_id');
        if (!checkdata1) {
            return res.send({
                success: false,
                message: "No data found."
            });
        }
        checkdata1.sort(function (a, b) {
            return new Date(b.created_at) - new Date(a.created_at);
        });
        return res.send({
            success: true,
            message: "All invitations data",
            dataCount: checkdata1.length,
            getData: checkdata1,
        });
    } catch (error) {
        //console.log("Error in get All invitations and request data", error);
        return res.send({
            success: false,
            message: "Error in get All invitations and request data"
        });
    }
};

exports.getOnePbmsById = async (req, res) => {
    //console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.id) {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    try {
        var checkdata1 = await Pbms.findById(req.body.id).populate('group_creater_id recevier_id.user_id recevier_id.invited_by_user_id');
        if (!checkdata1) {
            return res.send({
                success: false,
                message: "No data found."
            });
        }
        return res.send({
            success: true,
            message: "One group data",
            getData: checkdata1,
        });
    } catch (error) {
        //console.log("Error in get One getOnePbmsById data", error);
        return res.send({
            success: false,
            message: "Error in get one portfolio data"
        });
    }
};

exports.updatePbmsInvitaionReadStatus = async (req, res) => {
    ////console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.user_id) {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    if (!req.body.action) {
        return res.send({
            success: false,
            message: "Please enter action."
        });
    }
    if (!req.body.portfolio_id) {
        return res.send({
            success: false,
            message: "Please enter portfolio."
        });
    }
    try {
        var checkdata1 = await Pbms.findOne({
            _id: req.body.portfolio_id,
            "recevier_id.user_id": req.body.user_id,
            "status": 'Active'
        });
        //console.log("checkdata1 : ", checkdata1);
        if (checkdata1 == [] || checkdata1 == null) {
            return res.send({
                success: false,
                message: "portfolio id and recevier is not found."
            });
        } else {
            let updatePoertfolio;
            // for update status of recevier user
            // action = 1 => status change, action = 2 => read change
            if (req.body.action == 1) {
                if (req.body.status != undefined) {
                    if (req.body.status === 'Accept') {
                        updatePoertfolio = await Pbms.updateOne({
                            _id: req.body.portfolio_id,
                            "recevier_id.user_id": req.body.user_id
                        }, {
                            $set: {
                                "recevier_id.$.status": req.body.status,
                            },
                            $inc: {
                                TotalMember: 1
                            }
                        });
                    } else if (req.body.status === 'Reject') {
                        updatePoertfolio = await Pbms.updateOne({
                            _id: req.body.portfolio_id,
                            "recevier_id.user_id": req.body.user_id
                        }, {
                            $pull: {
                                "recevier_id": {
                                    user_id: req.body.user_id
                                }
                            }
                        });
                    }
                }
            } else if (req.body.action == 2) {
                updatePoertfolio = await Pbms.updateOne({
                    _id: req.body.portfolio_id,
                    "recevier_id.user_id": req.body.user_id
                }, {
                    $set: {
                        "recevier_id.$.read": true,
                    }
                });
            }
            //console.log("updatePoertfolio : ", updatePoertfolio);
            if (!updatePoertfolio) {
                return res.send({
                    success: false,
                    message: "Error in update portfolio read and status data."
                });
            }
            return res.send({
                success: true,
                message: "Update portfolio read and status data successfully."
            });
        }
    } catch (error) {
        //console.log("Error in update portfolio read and status data", error);
        return res.send({
            success: false,
            message: "Error in update portfolio read and status data"
        });
    }
};

exports.AddMoreNewMemberInGroup = async (req, res) => {
    //console.log("AddMoreNewMemberInGroup postttttttttt req body : ", req.body)
    if (!req.body.user_id_array || req.body.user_id_array.length == 0) {
        return res.send({
            success: false,
            message: "Please select member name."
        });
    }
    if (!req.body.portfolio_id) {
        return res.send({
            success: false,
            message: "Please enter portfolio."
        });
    }
    if (!req.body.user_id) {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    try {
        let array = req.body.user_id_array;
        let checkdata1;
        let updateData11;
        for (let pp = 0; pp < array.length; pp++) {
            checkdata1 = await Pbms.findOne({
                _id: req.body.portfolio_id,
                "recevier_id.user_id": array[pp]
            });
        }
        if (checkdata1 != null) {
            if (Object.keys(checkdata1).length == 1) {
                return res.send({
                    success: false,
                    message: "recevier id already exist."
                });
            }
        }
        for (let kk = 0; kk < array.length; kk++) {
            //console.log("In kkkkkkkkkkkkk loop : ", array[kk]);
            updateData11 = await Pbms.findByIdAndUpdate(req.body.portfolio_id, {
                $push: {
                    recevier_id: {
                        'invited_by_user_id': req.body.user_id,
                        'user_id': array[kk],
                        'request_for_admin': {
                            'action': 'No'
                        },
                        'status': 'Pending',
                        'read': false,
                        'is_admin': false
                    }
                }
            });
        }
        //console.log("updateData11 : ", updateData11);
        if (!updateData11) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your invitation sent to user successfully."
        });
    } catch (error) {
        //console.log("Error in update invitation sent to user successfully", error);
        return res.send({
            success: false,
            message: "Error in update invitation sent to user successfully data"
        });
    }
};

exports.deletedMemberInGroup = async (req, res) => {
    ////console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.user_id_array || req.body.user_id_array.length == 0) {
        return res.send({
            success: false,
            message: "Please select member."
        });
    }
    if (!req.body.portfolio_id) {
        return res.send({
            success: false,
            message: "Please enter portfolio."
        });
    }
    try {
        let array = req.body.user_id_array;
        let checkdata1;
        for (let pp = 0; pp < array.length; pp++) {
            checkdata1 = await Pbms.updateOne({
                _id: req.body.portfolio_id,
            }, {
                $pull: {
                    "recevier_id": {
                        user_id: array[pp]
                    }
                },
                $inc: {
                    'TotalMember': -1
                }
            });
        }
        if (checkdata1 == null) {
            return res.send({
                success: false,
                message: "Error in delete member from group"
            });
        }
        return res.send({
            success: true,
            message: "Delete member from group successfully."
        });
    } catch (error) {
        //console.log("Error in Delete member from group", error);
        return res.send({
            success: false,
            message: "Error in delete member from group"
        });
    }
};

exports.deletedPbmsGroupById = async (req, res) => {
    ////console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.portfolio_id) {
        return res.send({
            success: false,
            message: "Please enter portfolio."
        });
    }
    try {
        let checkdata1 = await Pbms.updateOne({
            _id: req.body.portfolio_id,
        }, {
            $set: {
                "status": 'Inactive'
            }
        });
        if (checkdata1 == null) {
            return res.send({
                success: false,
                message: "Error in delete group"
            });
        }
        return res.send({
            success: true,
            message: "Delete group successfully."
        });
    } catch (error) {
        //console.log("Error in Delete group", error);
        return res.send({
            success: false,
            message: "Error in Delete group"
        });
    }
};

exports.memberLeaveTheGroup = async (req, res) => {
    ////console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.user_id || req.body.user_id == "") {
        return res.send({
            success: false,
            message: "Please select member."
        });
    }
    if (!req.body.portfolio_id) {
        return res.send({
            success: false,
            message: "Please enter portfolio."
        });
    }
    try {
        let checkdata1 = await Pbms.updateOne({
            _id: req.body.portfolio_id,
        }, {
            $inc: {
                TotalMember: -1
            },
            $pull: {
                "recevier_id": {
                    user_id: req.body.user_id
                }
            }
        });
        if (checkdata1 == null) {
            return res.send({
                success: false,
                message: "Error in left member from group"
            });
        }
        return res.send({
            success: true,
            message: "You are left from group successfully."
        });
    } catch (error) {
        //console.log("Error in left member from group", error);
        return res.send({
            success: false,
            message: "Error in left member from group"
        });
    }
};

exports.sendRequestForBecomeAdminOfPbms = async (req, res) => {
    ////console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.group_id) {
        return res.send({
            success: false,
            message: "Please enter post id."
        });
    }
    if (!req.body.user_id) {
        return res.send({
            success: false,
            message: "Please enter your user id."
        });
    }
    try {
        let updatePoertfolio = await Pbms.updateOne({
            _id: req.body.group_id,
            "recevier_id.user_id": req.body.user_id
        }, {
            $set: {
                "recevier_id.$.request_for_admin": {
                    action: 'Yes',
                    request_date_time: new Date(),
                    status: 'Pending',
                    read: false
                }
            },
        });
        if (updatePoertfolio == [] || updatePoertfolio == null) {
            return res.send({
                success: true,
                message: "Error in sent request to admin."
            });
        } else if (updatePoertfolio != null) {
            return res.send({
                success: true,
                message: "Your request to become an admin has been sent to admin successfully. Please wait for admin response."
            });
        }
    } catch (error) {
        //console.log("Error in request for become a admin is sent to admin", error);
        return res.send({
            success: false,
            message: "Error in request sent to owner"
        });
    }
};

exports.ChangeStatusOfRequestForBecomeAdminOfPbms = async (req, res) => {
    ////console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.group_id) {
        return res.send({
            success: false,
            message: "Please enter post id."
        });
    }
    if (!req.body.user_id) {
        return res.send({
            success: false,
            message: "Please enter your user id."
        });
    }
    if (!req.body.recevier_user_id) {
        return res.send({
            success: false,
            message: "Please enter recevier user id."
        });
    }
    if (!req.body.status) {
        return res.send({
            success: false,
            message: "Please enter status."
        });
    }
    try {
        let updatePoertfolio;
        if (req.body.action === 'Yes') {
            updatePoertfolio = await Pbms.updateOne({
                _id: req.body.group_id,
                "recevier_id.invited_by_user_id": req.body.user_id,
                "recevier_id.user_id": req.body.recevier_user_id
            }, {
                $set: {
                    "recevier_id.$.status": 'Accept',
                    "recevier_id.$.is_admin": true,
                    "recevier_id.$.request_for_admin": {
                        action: 'Yes',
                        status: 'Accept',
                        read: true
                    }
                },
                $inc: {
                    TotalMember: 1
                },
                $push: {
                    all_admins: {
                        'user_id': req.body.recevier_user_id
                    }
                }
            });
        } else {
            updatePoertfolio = await Pbms.updateOne({
                _id: req.body.group_id,
                "recevier_id.invited_by_user_id": req.body.user_id,
                "recevier_id.user_id": req.body.recevier_user_id
            }, {
                $set: {
                    "recevier_id.$.status": 'Accept',
                    "recevier_id.$.request_for_admin": {
                        action: 'Yes',
                        status: 'Reject',
                        read: true
                    }
                },
                $inc: {
                    TotalMember: 1
                }
            });
        }
        if (updatePoertfolio == [] || updatePoertfolio == null) {
            return res.send({
                success: true,
                message: "Error in update request to admin."
            });
        } else if (updatePoertfolio != null) {
            return res.send({
                success: true,
                message: "Your response sent to user successfully."
            });
        }
    } catch (error) {
        //console.log("Error in request for become a admin is sent to admin", error);
        return res.send({
            success: false,
            message: "Error in request sent to owner"
        });
    }
};

exports.bookPbmsProperty = async (req, res) => {
    // book_pbms_property
    ////console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.purpose) {
        return res.send({
            success: false,
            message: "Please enter purpose."
        });
    }
    if (!req.body.pbms_group_id) {
        return res.send({
            success: false,
            message: "Please enter group id."
        });
    }
    if (!req.body.user_id) {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    if (!req.body.booking_notes) {
        return res.send({
            success: false,
            message: "Please enter booking notes."
        });
    }
    if (!req.body.start_date) {
        return res.send({
            success: false,
            message: "Please select start date."
        });
    }
    if (!req.body.end_date) {
        return res.send({
            success: false,
            message: "Please select end date."
        });
    }
    // for checking start and end date
    let getStartDate = Date.parse(req.body.start_date);
    let getEndDate = Date.parse(req.body.end_date);
    if (getStartDate >= getEndDate) {
        return res.send({
            success: false,
            message: "Please select valid start or end date & time."
        });
    }
    // for checking dates already book property
    // check start date in between events
    let checkStartDateInBetween = [];
    let checkEndDateInBetween = [];
    let checkBookDataInBetwwenBothDate = [];
    // let checkPreviousDate = [];
    // checkPreviousDate = await Book_pbms_property.find({
    //             status: 'Active',
    //             pbms_group_id: req.body.pbms_group_id,
    //             start_date: {
    //                 $gte: req.body.start_date
    //             },
    //             end_date: {
    //                 $lt: req.body.end_date
    //             }
    // }).sort({
    //     '_id': -1
    // });
    checkStartDateInBetween = await Book_pbms_property.find({
        status: 'Active',
        pbms_group_id: req.body.pbms_group_id,
        start_date: {
            $lte: req.body.start_date
        },
        end_date: {
            $gte: req.body.start_date
        }
    }).sort({
        '_id': -1
    });
    ////console.log("checkStartDateInBetween checkStartDateInBetween : ", checkStartDateInBetween);
    // for check end date between events booking
    checkEndDateInBetween = await Book_pbms_property.find({
        status: 'Active',
        pbms_group_id: req.body.pbms_group_id,
        start_date: {
            $lte: req.body.end_date
        },
        end_date: {
            $gte: req.body.end_date
        }
    }).sort({
        '_id': -1
    });
    ////console.log("checkEndDateInBetween  end ddddddddddddd : ", checkEndDateInBetween);
    // for check events in between start and end date
    checkBookDataInBetwwenBothDate = await Book_pbms_property.find({
        status: 'Active',
        pbms_group_id: req.body.pbms_group_id,
        start_date: {
            $gte: req.body.start_date
        },
        end_date: {
            $lt: req.body.end_date
        }
    }).sort({
        '_id': -1
    });
    ////console.log("check previous events of book property : ", checkPreviousDate);
    try {
        if (checkBookDataInBetwwenBothDate.length == 0 && checkStartDateInBetween.length == 0 && checkEndDateInBetween.length == 0) {
            new Book_pbms_property(req.body).save(function (err, result) {
                //console.log("Error in book pbms group property : ", err);
                //console.log("result in book pbms group property : ", result);
                let sendMessage = "";
                if (req.body.request_to_admin == null) {
                    sendMessage = "Your booking of peroperty successfully."
                } else {
                    sendMessage = "Your request has been sent to admin for booking property approval."
                }
                if (err) {
                    response = {
                        success: false,
                        error: true,
                        message: "Error in book pbms group property",
                    };
                } else {
                    response = {
                        success: true,
                        message: sendMessage,
                    };
                }
                res.send(response);
            });
        } else {
            return res.send({
                success: false,
                message: "This slot is already booked. Please select another dates.",
            });
        }
    } catch (error) {
        //console.log("Error in book pbms group property", error);
        return res.send({
            success: false,
            message: "Error in book pbms group property"
        });
    }
};

exports.getOnebookPbmsPropertyById = async (req, res) => {
    //console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.pbms_group_id) {
        return res.send({
            success: false,
            message: "Please enter group id."
        });
    }
    if (!req.body.user_id) {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    try {
        let checkdata1 = await Book_pbms_property.find({
            pbms_group_id: req.body.pbms_group_id,
            status: 'Active'
        }).populate('user_id').sort({
            '_id': -1
        });
        let getRequestForProperty = await Book_pbms_property.find({
            pbms_group_id: req.body.pbms_group_id,
            status: 'Pending',
            request_to_admin: {
                $in: [req.body.user_id]
            }
        }).populate('user_id').sort({
            '_id': -1
        });
        if (!checkdata1) {
            return res.send({
                success: false,
                message: "No data found."
            });
        }
        return res.send({
            success: true,
            message: "One group data",
            getData: checkdata1,
            getRequestForProperty: getRequestForProperty
        });
    } catch (error) {
        //console.log("Error in get One book group data", error);
        return res.send({
            success: false,
            message: "Error in get One book group data"
        });
    }
};

exports.updateRentingPbmsPropertyById = async (req, res) => {
    //console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body);
    //console.log("id  : ", req.query.id);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please enter renting id."
        });
    }
    delete req.body.pbms_group_id;
    delete req.body.reference_user_id;
    delete req.body._id;
    try {
        var updateData = await Renting_pbms_property.findByIdAndUpdate(req.query.id, req.body);
        //console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your rent document updated successfully."
        });
    } catch (error) {
        //console.log("Error in rent property updated data", error);
        return res.send({
            success: false,
            message: "Error in rent property updated data"
        });
    }
};

exports.getOnlyOneRentingPropertyData = async (req, res) => {
    ////console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.id) {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    try {
        var checkdata1 = await Renting_pbms_property.findById(req.body.id);
        if (!checkdata1) {
            return res.send({
                success: false,
                message: "No data found."
            });
        }
        return res.send({
            success: true,
            message: "One renting group data",
            getData: checkdata1,
        });
    } catch (error) {
        //console.log("Error in get One renting property data", error);
        return res.send({
            success: false,
            message: "Error in get One renting property data"
        });
    }
};

exports.updateStatusbookPbmsPropertyById = async (req, res) => {
    //console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.book_property_event_id) {
        return res.send({
            success: false,
            message: "Please enter book property id."
        });
    }
    if (!req.body.status) {
        return res.send({
            success: false,
            message: "Please enter status."
        });
    }
    try {
        // let checkdata1 = await Book_pbms_property.find({
        //     pbms_group_id: req.body.pbms_group_id,
        //     status: 'Active'
        // }).populate('user_id');
        let getRequestForProperty = await Book_pbms_property.findOneAndUpdate({
            _id: req.body.book_property_event_id
        }, {
            $set: {
                status: req.body.status,
                request_to_admin: null
            }
        });
        if (!getRequestForProperty) {
            return res.send({
                success: false,
                message: "Error in update request of book property."
            });
        }
        return res.send({
            success: true,
            message: "Your response has been updated successfully",
        });
    } catch (error) {
        //console.log("Error in get one book group data", error);
        return res.send({
            success: false,
            message: "Error in get one book group data"
        });
    }
};

exports.updatebookPbmsPropertyById = async (req, res) => {
    //console.log("booking updatepostttttttttt req body : ", req.body);
    //console.log("id  : ", req.query.id);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please enter renting id."
        });
    }
    if (!req.body.purpose) {
        return res.send({
            success: false,
            message: "Please enter purpose."
        });
    }
    if (!req.body.pbms_group_id) {
        return res.send({
            success: false,
            message: "Please enter group id."
        });
    }
    if (!req.body.booking_notes) {
        return res.send({
            success: false,
            message: "Please enter booking notes."
        });
    }
    if (!req.body.start_date) {
        return res.send({
            success: false,
            message: "Please select start date."
        });
    }
    if (!req.body.end_date) {
        return res.send({
            success: false,
            message: "Please select end date."
        });
    }
    // for checking start and end date
    let getStartDate = Date.parse(req.body.start_date);
    let getEndDate = Date.parse(req.body.end_date);
    if (getStartDate >= getEndDate) {
        return res.send({
            success: false,
            message: "Please select valid start or end date & time."
        });
    }
    // for checking dates already book property
    // check start date in between events
    let checkStartDateInBetween = [];
    let checkEndDateInBetween = [];
    let checkBookDataInBetwwenBothDate = [];
    checkStartDateInBetween = await Book_pbms_property.find({
        status: 'Active',
        _id: {
            $ne: req.query.id
        },
        pbms_group_id: req.body.pbms_group_id,
        start_date: {
            $lte: req.body.start_date
        },
        end_date: {
            $gte: req.body.start_date
        }
    }).sort({
        '_id': -1
    });
    ////console.log("checkStartDateInBetween checkStartDateInBetween : ", checkStartDateInBetween);
    // for check end date between events booking
    checkEndDateInBetween = await Book_pbms_property.find({
        status: 'Active',
        _id: {
            $ne: req.query.id
        },
        pbms_group_id: req.body.pbms_group_id,
        start_date: {
            $lte: req.body.end_date
        },
        end_date: {
            $gte: req.body.end_date
        }
    }).sort({
        '_id': -1
    });
    ////console.log("checkEndDateInBetween  end ddddddddddddd : ", checkEndDateInBetween);
    // for check events in between start and end date
    checkBookDataInBetwwenBothDate = await Book_pbms_property.find({
        status: 'Active',
        _id: {
            $ne: req.query.id
        },
        pbms_group_id: req.body.pbms_group_id,
        start_date: {
            $gte: req.body.start_date
        },
        end_date: {
            $lt: req.body.end_date
        }
    }).sort({
        '_id': -1
    });
    ////console.log("check previous events of book property : ", checkPreviousDate);
    try {
        // first check start and end dates are same or not
        delete req.body.pbms_group_id;
        delete req.body.reference_user_id;
        delete req.body._id;
        let getStartEndDates = await Book_pbms_property.findById(req.query.id).select('start_date end_date');
        //console.log("previous start date and end date : ", getStartEndDates);
        if (getStartEndDates.start_date == req.body.start_date && getStartEndDates.end_date == req.body.end_date) {
            let updateData = await Book_pbms_property.findByIdAndUpdate(req.query.id, req.body);
            //console.log("update data user: ", updateData)
            if (!updateData) {
                return res.send({
                    success: false,
                    message: "Error in update booking property."
                });
            }
            return res.send({
                success: true,
                message: "Your booking of property updated successfully."
            });
        } else if (checkBookDataInBetwwenBothDate.length == 0 && checkStartDateInBetween.length == 0 && checkEndDateInBetween.length == 0) {
            let updateData = await Book_pbms_property.findByIdAndUpdate(req.query.id, req.body);
            //console.log("update data user: ", updateData)
            if (!updateData) {
                return res.send({
                    success: false,
                    message: "Error in update booking property."
                });
            }
            return res.send({
                success: true,
                message: "Your booking of property updated successfully."
            });
        } else {
            return res.send({
                success: false,
                message: "This slot is already booked. Please select another dates.",
            });
        }
    } catch (error) {
        //console.log("Error in booking property updated data", error);
        return res.send({
            success: false,
            message: "Error in booking property updated data"
        });
    }
};

exports.getOnlyOnebookPbmsPropertyById = async (req, res) => {
    ////console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.id) {
        return res.send({
            success: false,
            message: "Please enter id."
        });
    }
    try {
        var checkdata1 = await Book_pbms_property.findById(req.body.id);
        if (!checkdata1) {
            return res.send({
                success: false,
                message: "No data found."
            });
        }
        return res.send({
            success: true,
            message: "One booking group data",
            getData: checkdata1,
        });
    } catch (error) {
        //console.log("Error in get One booking property data", error);
        return res.send({
            success: false,
            message: "Error in get One booking property data"
        });
    }
};

exports.rentingPbmsProperty = async (req, res) => {
    // book_pbms_property
    ////console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    // if (!req.body.purpose) {
    //     return res.send({
    //         success: false,
    //         message: "Please enter purpose."
    //     });
    // }
    // if (!req.body.pbms_group_id) {
    //     return res.send({
    //         success: false,
    //         message: "Please enter group id."
    //     });
    // }
    // if (!req.body.reference_user_id) {
    //     return res.send({
    //         success: false,
    //         message: "Please enter user id."
    //     });
    // }
    // if (!req.body.start_date) {
    //     return res.send({
    //         success: false,
    //         message: "Please select start date."
    //     });
    // }
    // if (!req.body.end_date) {
    //     return res.send({
    //         success: false,
    //         message: "Please select end date."
    //     });
    // }
    // if (!req.body.price) {
    //     return res.send({
    //         success: false,
    //         message: "Please enter price."
    //     });
    // }
    // if (!req.body.full_Name) {
    //     return res.send({
    //         success: false,
    //         message: "Please enter full name."
    //     });
    // }
    // if (!req.body.email) {
    //     return res.send({
    //         success: false,
    //         message: "Please enter email."
    //     });
    // }
    // if (!req.body.phone) {
    //     return res.send({
    //         success: false,
    //         message: "Please enter phone."
    //     });
    // }
    // if (!req.body.address) {
    //     return res.send({
    //         success: false,
    //         message: "Please enter address."
    //     });
    // }

    // // for checking start and end date
    // let getStartDate = Date.parse(req.body.start_date);
    // let getEndDate = Date.parse(req.body.end_date);
    // if (getStartDate >= getEndDate) {
    //     return res.send({
    //         success: false,
    //         message: "Please select valid start or end date & time."
    //     });
    // }
    // // for checking dates already book property
    // // check start date in between events
    // let checkStartDateInBetween = [];
    // let checkEndDateInBetween = [];
    // let checkBookDataInBetwwenBothDate = [];
    // checkStartDateInBetween = await Renting_pbms_property.find({
    //     status: 'Active',
    //     pbms_group_id: req.body.pbms_group_id,
    //     start_date: {
    //         $lte: req.body.start_date
    //     },
    //     end_date: {
    //         $gte: req.body.start_date
    //     }
    // }).sort({
    //     '_id': -1
    // });
    // ////console.log("checkStartDateInBetween checkStartDateInBetween : ", checkStartDateInBetween);
    // // for check end date between events booking
    // checkEndDateInBetween = await Renting_pbms_property.find({
    //     status: 'Active',
    //     pbms_group_id: req.body.pbms_group_id,
    //     start_date: {
    //         $lte: req.body.end_date
    //     },
    //     end_date: {
    //         $gte: req.body.end_date
    //     }
    // }).sort({
    //     '_id': -1
    // });
    // ////console.log("checkEndDateInBetween  end ddddddddddddd : ", checkEndDateInBetween);
    // // for check events in between start and end date
    // checkBookDataInBetwwenBothDate = await Renting_pbms_property.find({
    //     status: 'Active',
    //     pbms_group_id: req.body.pbms_group_id,
    //     start_date: {
    //         $gte: req.body.start_date
    //     },
    //     end_date: {
    //         $lt: req.body.end_date
    //     }
    // }).sort({
    //     '_id': -1
    // });
    ////console.log("check previous events of book property : ", checkPreviousDate);
    try {
        // let agreement_img = [];
        // if (req.file != undefined) {
        //     agreement_img.push({
        //         src: 'uploads/' + req.file.filename,
        //         orgName: req.file.originalname,
        //     })
        // }
        // req.body.agreement = agreement_img;
        // if (checkBookDataInBetwwenBothDate.length == 0 && checkStartDateInBetween.length == 0 && checkEndDateInBetween.length == 0) {
        new Renting_pbms_property(req.body).save(function (err, result) {
            //console.log("Error in renting pbms group property : ", err);
            //console.log("result in renting pbms group property : ", result);
            let sendMessage = "";
            // if (req.body.request_to_admin == null) {
            sendMessage = "Your renting of property successfully."
            // } else {
            //     sendMessage = "Your request has been sent to admin for booking property approval."
            // }
            if (err) {
                response = {
                    success: false,
                    error: true,
                    message: "Error in renting pbms group property",
                };
            } else {
                response = {
                    success: true,
                    message: sendMessage,
                };
            }
            res.send(response);
        });
        // } else {
        // return res.send({
        //     success: false,
        //     message: "This slot is already booked. Please select another dates.",
        // });
        // }
    } catch (error) {
        //console.log("Error in book pbms group property", error);
        return res.send({
            success: false,
            message: "Error in book pbms group property"
        });
    }
};

exports.getOneRentingPbmsPropertyById = async (req, res) => {
    //console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.pbms_group_id) {
        return res.send({
            success: false,
            message: "Please enter group id."
        });
    }
    if (!req.body.user_id) {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    try {
        let checkdata1 = await Renting_pbms_property.find({
            pbms_group_id: req.body.pbms_group_id,
            status: 'Active'
        }).populate('user_id').sort({
            '_id': -1
        });
        if (!checkdata1) {
            return res.send({
                success: false,
                message: "No data found."
            });
        }
        return res.send({
            success: true,
            message: "One group data",
            getData: checkdata1,
        });
    } catch (error) {
        //console.log("Error in get one renting group data", error);
        return res.send({
            success: false,
            message: "Error in get one renting group data"
        });
    }
};

exports.createCharteringPbmsProperty = async (req, res) => {
    // book_pbms_property
    ////console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.pbms_group_id) {
        return res.send({
            success: false,
            message: "Please enter group id."
        });
    }
    if (!req.body.reference_user_id) {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    if (!req.body.full_Name) {
        return res.send({
            success: false,
            message: "Please enter full name."
        });
    }
    if (!req.body.address) {
        return res.send({
            success: false,
            message: "Please enter address."
        });
    }
    if (!req.body.email) {
        return res.send({
            success: false,
            message: "Please enter email address."
        });
    }
    let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(req.body.email)) {
        return res.send({
            success: false,
            message: "Please enter valid email address"
        });
    }
    if (!req.body.mobile) {
        return res.send({
            success: false,
            message: "Please enter mobile number."
        });
    }
    if (req.body.mobile.length != 10) {
        return res.send({
            success: false,
            message: "Please enter valid mobile number. Mobile number should be of 10 digits."
        });
    }

    if (!req.body.start_date) {
        return res.send({
            success: false,
            message: "Please select start date & time."
        });
    }
    if (!req.body.end_date) {
        return res.send({
            success: false,
            message: "Please select end date & time."
        });
    }
    // for checking start and end date
    let getStartDate = Date.parse(req.body.start_date);
    let getEndDate = Date.parse(req.body.end_date);
    if (getStartDate >= getEndDate) {
        return res.send({
            success: false,
            message: "Please select valid start or end date & time."
        });
    }
    if (!req.body.total_charter_fees) {
        return res.send({
            success: false,
            message: "Please enter total charter fees."
        });
    }
    // for checking dates already book property
    // check start date in between events
    let checkStartDateInBetween = [];
    let checkEndDateInBetween = [];
    let checkBookDataInBetwwenBothDate = [];
    checkStartDateInBetween = await Chartering_pbms_property.find({
        status: 'Active',
        pbms_group_id: req.body.pbms_group_id,
        start_date: {
            $lte: req.body.start_date
        },
        end_date: {
            $gte: req.body.start_date
        }
    }).sort({
        '_id': -1
    });
    ////console.log("checkStartDateInBetween checkStartDateInBetween : ", checkStartDateInBetween);
    // for check end date between events booking
    checkEndDateInBetween = await Chartering_pbms_property.find({
        status: 'Active',
        pbms_group_id: req.body.pbms_group_id,
        start_date: {
            $lte: req.body.end_date
        },
        end_date: {
            $gte: req.body.end_date
        }
    }).sort({
        '_id': -1
    });
    ////console.log("checkEndDateInBetween  end ddddddddddddd : ", checkEndDateInBetween);
    // for check events in between start and end date
    checkBookDataInBetwwenBothDate = await Chartering_pbms_property.find({
        status: 'Active',
        pbms_group_id: req.body.pbms_group_id,
        start_date: {
            $gte: req.body.start_date
        },
        end_date: {
            $lt: req.body.end_date
        }
    }).sort({
        '_id': -1
    });
    ////console.log("check previous events of book property : ", checkPreviousDate);
    try {
        // let agreement_img = [];
        // if (req.file != undefined) {
        //     agreement_img.push({
        //         src: 'uploads/' + req.file.filename,
        //         orgName: req.file.originalname,
        //     })
        // }
        // req.body.agreement = agreement_img;
        if (checkBookDataInBetwwenBothDate.length == 0 && checkStartDateInBetween.length == 0 && checkEndDateInBetween.length == 0) {
            new Chartering_pbms_property(req.body).save(function (err, result) {
                //console.log("Error in chartering pbms group property : ", err);
                //console.log("result in chartering pbms group property : ", result);
                let sendMessage = "";
                // if (req.body.request_to_admin == null) {
                sendMessage = "Your chartering of property successfully."
                // } else {
                //     sendMessage = "Your request has been sent to admin for booking property approval."
                // }
                if (err) {
                    response = {
                        success: false,
                        error: true,
                        message: "Error in chartering pbms group property",
                    };
                } else {
                    response = {
                        success: true,
                        message: "Your chatering created successfully.",
                    };
                }
                res.send(response);
            });
        } else {
            return res.send({
                success: false,
                message: "This slot is already charted. Please select another dates.",
            });
        }
    } catch (error) {
        //console.log("Error in chatering pbms group property", error);
        return res.send({
            success: false,
            message: "Error in chartering pbms group property"
        });
    }
};

exports.getOnecharteringPbmsPropertyById = async (req, res) => {
    //console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.pbms_group_id) {
        return res.send({
            success: false,
            message: "Please enter group id."
        });
    }
    try {
        let checkdata1 = await Chartering_pbms_property.find({
            pbms_group_id: req.body.pbms_group_id,
            status: 'Active'
        }).sort({
            '_id': -1
        });
        if (!checkdata1) {
            return res.send({
                success: false,
                message: "No data found."
            });
        }
        return res.send({
            success: true,
            message: "One group data",
            getData: checkdata1,
        });
    } catch (error) {
        //console.log("Error in get one chartering group data", error);
        return res.send({
            success: false,
            message: "Error in get one chartering group data"
        });
    }
};

exports.updateChateringPbmsPropertyById = async (req, res) => {
    //console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body);
    //console.log("id  : ", req.query.id);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please enter renting id."
        });
    }
    if (!req.body.pbms_group_id) {
        return res.send({
            success: false,
            message: "Please enter group id."
        });
    }
    if (!req.body.full_Name) {
        return res.send({
            success: false,
            message: "Please enter full name."
        });
    }
    if (!req.body.address) {
        return res.send({
            success: false,
            message: "Please enter address."
        });
    }
    if (!req.body.email) {
        return res.send({
            success: false,
            message: "Please enter email address."
        });
    }
    let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(req.body.email)) {
        return res.send({
            success: false,
            message: "Please enter valid email address"
        });
    }
    if (!req.body.mobile) {
        return res.send({
            success: false,
            message: "Please enter mobile number."
        });
    }
    if (req.body.mobile.length != 10) {
        return res.send({
            success: false,
            message: "Please enter valid mobile number. Mobile number should be of 10 digits."
        });
    }
    if (!req.body.start_date) {
        return res.send({
            success: false,
            message: "Please select start date & time."
        });
    }
    if (!req.body.end_date) {
        return res.send({
            success: false,
            message: "Please select end date & time."
        });
    }
    // for checking start and end date
    let getStartDate = Date.parse(req.body.start_date);
    let getEndDate = Date.parse(req.body.end_date);
    if (getStartDate >= getEndDate) {
        return res.send({
            success: false,
            message: "Please select valid start or end date & time."
        });
    }
    if (!req.body.total_charter_fees) {
        return res.send({
            success: false,
            message: "Please enter total charter fees."
        });
    }
    // for checking dates already book property
    // check start date in between events
    let checkStartDateInBetween = [];
    let checkEndDateInBetween = [];
    let checkBookDataInBetwwenBothDate = [];
    checkStartDateInBetween = await Chartering_pbms_property.find({
        status: 'Active',
        _id: {
            $ne: req.query.id
        },
        pbms_group_id: req.body.pbms_group_id,
        start_date: {
            $lte: req.body.start_date
        },
        end_date: {
            $gte: req.body.start_date
        }
    }).sort({
        '_id': -1
    });
    ////console.log("checkStartDateInBetween checkStartDateInBetween : ", checkStartDateInBetween);
    // for check end date between events booking
    checkEndDateInBetween = await Chartering_pbms_property.find({
        status: 'Active',
        _id: {
            $ne: req.query.id
        },
        pbms_group_id: req.body.pbms_group_id,
        start_date: {
            $lte: req.body.end_date
        },
        end_date: {
            $gte: req.body.end_date
        }
    }).sort({
        '_id': -1
    });
    ////console.log("checkEndDateInBetween  end ddddddddddddd : ", checkEndDateInBetween);
    // for check events in between start and end date
    checkBookDataInBetwwenBothDate = await Chartering_pbms_property.find({
        status: 'Active',
        _id: {
            $ne: req.query.id
        },
        pbms_group_id: req.body.pbms_group_id,
        start_date: {
            $gte: req.body.start_date
        },
        end_date: {
            $lt: req.body.end_date
        }
    }).sort({
        '_id': -1
    });
    ////console.log("check previous events of book property : ", checkPreviousDate);
    try {
        // let agreement_img = [];
        // if (req.file != undefined) {
        //     agreement_img.push({
        //         src: 'uploads/' + req.file.filename,
        //         orgName: req.file.originalname,
        //     })
        // }
        // req.body.agreement = agreement_img;
        delete req.body.pbms_group_id;
        delete req.body.reference_user_id;
        delete req.body._id;
        let getStartEndDates = await Chartering_pbms_property.findById(req.query.id).select('start_date end_date');
        //console.log("previous start date and end date : ", getStartEndDates);
        if (getStartEndDates.start_date == req.body.start_date && getStartEndDates.end_date == req.body.end_date) {
            let updateData = await Chartering_pbms_property.findByIdAndUpdate(req.query.id, req.body);
            //console.log("update data user: ", updateData)
            if (!updateData) {
                return res.send({
                    success: false,
                    message: messages.ERROR
                });
            }
            return res.send({
                success: true,
                message: "Your chatering updated successfully."
            });
        } else if (checkBookDataInBetwwenBothDate.length == 0 && checkStartDateInBetween.length == 0 && checkEndDateInBetween.length == 0) {
            let updateData = await Chartering_pbms_property.findByIdAndUpdate(req.query.id, req.body);
            //console.log("update data user: ", updateData)
            if (!updateData) {
                return res.send({
                    success: false,
                    message: messages.ERROR
                });
            }
            return res.send({
                success: true,
                message: "Your chatering updated successfully."
            });
        } else {
            return res.send({
                success: false,
                message: "This slot is already charted. Please select another dates.",
            });
        }
    } catch (error) {
        //console.log("Error in chatering property updated data", error);
        return res.send({
            success: false,
            message: "Error in chatering property updated data"
        });
    }
};

exports.getOnlyOneChateringPropertyData = async (req, res) => {
    ////console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.id) {
        return res.send({
            success: false,
            message: "Please enter id."
        });
    }
    try {
        var checkdata1 = await Chartering_pbms_property.findById(req.body.id);
        if (!checkdata1) {
            return res.send({
                success: false,
                message: "No data found."
            });
        }
        return res.send({
            success: true,
            message: "One chaterting group data",
            getData: checkdata1,
        });
    } catch (error) {
        //console.log("Error in get one chaterting property data", error);
        return res.send({
            success: false,
            message: "Error in get one chaterting property data"
        });
    }
};

exports.updateStatusCharteringPbmsPropertyById = async (req, res) => {
    //console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.charted_property_id) {
        return res.send({
            success: false,
            message: "Please enter charted property id."
        });
    }
    if (!req.body.status) {
        return res.send({
            success: false,
            message: "Please enter status."
        });
    }
    try {
        // let checkdata1 = await Book_pbms_property.find({
        //     pbms_group_id: req.body.pbms_group_id,
        //     status: 'Active'
        // }).populate('user_id');
        let getRequestForProperty = await Chartering_pbms_property.findOneAndUpdate({
            _id: req.body.charted_property_id
        }, {
            $set: {
                status: req.body.status,
            }
        });
        if (!getRequestForProperty) {
            return res.send({
                success: false,
                message: "Error in update request of chartering property."
            });
        }
        return res.send({
            success: true,
            message: "Your charted successfully",
        });
    } catch (error) {
        //console.log("Error in update status of One charted group data", error);
        return res.send({
            success: false,
            message: "Error in update status of chartering data"
        });
    }
};

exports.createManagingCashflowsPbmsProperty = async (req, res) => {
    // book_pbms_property
    ////console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.pbms_group_id) {
        return res.send({
            success: false,
            message: "Please enter group id."
        });
    }
    if (!req.body.reference_user_id) {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    if (!req.body.distribution_type) {
        return res.send({
            success: false,
            message: "Please select type of distribution (Percent/Amount)."
        });
    }
    if (!req.body.distribution_frequency) {
        return res.send({
            success: false,
            message: "Please select type distribution frequency."
        });
    }
    if (!req.body.memberData) {
        return res.send({
            success: false,
            message: "Please enter memberData."
        });
    }
    ////console.log("check previous events of book property : ", checkPreviousDate);
    try {
        // let agreement_img = [];
        // if (req.file != undefined) {
        //     agreement_img.push({
        //         src: 'uploads/' + req.file.filename,
        //         orgName: req.file.originalname,
        //     })
        // }
        // req.body.agreement = agreement_img;
        new Managing_cashflows_pbms_property(req.body).save(function (err, result) {
            //console.log("Error in chartering pbms group property : ", err);
            //console.log("result in chartering pbms group property : ", result);
            let sendMessage = "";
            if (err) {
                response = {
                    success: false,
                    error: true,
                    message: "Error in managing cashflows pbms group property",
                };
            } else {
                response = {
                    success: true,
                    message: "Your managing cashflows created successfully.",
                };
            }
            res.send(response);
        });
    } catch (error) {
        //console.log("Error in managing cashflows pbms group property", error);
        return res.send({
            success: false,
            message: "Error in managing cashflows pbms group property"
        });
    }
};

exports.getOneManagingCashflowsByPbmsPropertyId = async (req, res) => {
    //console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.pbms_group_id) {
        return res.send({
            success: false,
            message: "Please enter group id."
        });
    }
    try {
        let checkdata1 = await Managing_cashflows_pbms_property.find({
            pbms_group_id: req.body.pbms_group_id,
            status: 'Active'
        }).sort({
            '_id': -1
        });
        if (!checkdata1) {
            return res.send({
                success: false,
                message: "No data found."
            });
        }
        return res.send({
            success: true,
            message: "One group data",
            getData: checkdata1,
        });
    } catch (error) {
        //console.log("Error in get one managing cashflow group data", error);
        return res.send({
            success: false,
            message: "Error in get one managing cashflow group data"
        });
    }
};

exports.updateMnanagingCashflowPbmsPropertyById = async (req, res) => {
    if (!req.body.reference_user_id) {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    if (!req.body.distribution_type) {
        return res.send({
            success: false,
            message: "Please select type of distribution (Percent/Amount)."
        });
    }
    if (!req.body.distribution_frequency) {
        return res.send({
            success: false,
            message: "Please select type distribution frequency."
        });
    }
    if (!req.body.memberData) {
        return res.send({
            success: false,
            message: "Please enter memberData."
        });
    }
    try {
        delete req.body.pbms_group_id;
        // delete req.body.reference_user_id;
        delete req.body._id;
        let updateData = await Managing_cashflows_pbms_property.findByIdAndUpdate(req.query.id, req.body);
        //console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your managing cashflow updated successfully."
        });
    } catch (error) {
        //console.log("Error in managing cashflow updated data", error);
        return res.send({
            success: false,
            message: "Error in managing cashflow updated data"
        });
    }
};

exports.getAllFractionalShareListing = async (req, res) => {
    try {
        // for get wepo all listings
        let getData1Real = await Real_estate_sale.find({
            status: 'Active',
            'fractional_share_choice_percentage_or_unit': {
                $in: ['Percentage', "Units"]
            }
        }).sort({
            '_id': -1
        });
        let getData1Air = await Aircraft_sale.find({
            status: 'Active',
            'fractional_share_choice_percentage_or_unit': {
                $in: ['Percentage', "Units"]
            }
        }).sort({
            '_id': -1
        });
        let getData1Yach = await Yachts_sale.find({
            status: 'Active',
            'fractional_share_choice_percentage_or_unit': {
                $in: ['Percentage', "Units"]
            }
        }).sort({
            '_id': -1
        });
        let getDataCrowdfunding = await CrowdFunding_sale.find({
            status: 'Active',
            'fractional_share_choice_percentage_or_unit': {
                $in: ['Percentage', "Units"]
            }
        }).sort({
            '_id': -1
        });
        let getDataBusiness = await Business_sale.find({
            status: 'Active',
            'fractional_share_choice_percentage_or_unit': {
                $in: ['Percentage', "Units"]
            }
        }).sort({
            '_id': -1
        });
        let getDataCars = await Cars_and_rv_sale.find({
            status: 'Active',
            'fractional_share_choice_percentage_or_unit': {
                $in: ['Percentage', "Units"]
            }
        }).sort({
            '_id': -1
        });
        let getDataHorses = await Horses_livestock.find({
            status: 'Active',
            'fractional_share_choice_percentage_or_unit': {
                $in: ['Percentage', "Units"]
            }
        }).sort({
            '_id': -1
        });
        let getDataArtwork = await Artwork_sale.find({
            status: 'Active',
            'fractional_share_choice_percentage_or_unit': {
                $in: ['Percentage', "Units"]
            }
        }).sort({
            '_id': -1
        });
        let getDataCrypto = await Crypto_asset.find({
            status: 'Active',
            'fractional_share_choice_percentage_or_unit': {
                $in: ['Percentage', "Units"]
            }
        }).sort({
            '_id': -1
        });
        var finalArray = getData1Real.concat(getData1Air, getData1Yach, getDataCrowdfunding, getDataBusiness, getDataCars, getDataHorses, getDataArtwork, getDataCrypto);
        //console.log("getData : ", finalArray);
        if (!finalArray) {
            return res.send({
                success: false,
                message: "Error in get fractional share all listing for wecoown pbms group create."
            });
        }
        finalArray.sort(function (a, b) {
            return new Date(b.created_at) - new Date(a.created_at);
        });
        return res.send({
            success: true,
            message: "get data of all fractional share listing for wecoown pbms group create.",
            getData: finalArray
        });
    } catch (error) {
        //console.log("Error in get all fractional share listing for wecoown pbms group create. : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.sendInvitationForBookPost = async (req, res) => {
    ////console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.post_id) {
        return res.send({
            success: false,
            message: "Please enter post id."
        });
    }
    if (!req.body.sender_id) {
        return res.send({
            success: false,
            message: "Please enter your user id."
        });
    }
    if (!req.body.getAllUser) {
        return res.send({
            success: false,
            message: "Please enter user list."
        });
    }
    try {
        for (let ijk = 0; ijk < req.body.getAllUser.length; ijk++) {
            req.body.recevier_id = req.body.getAllUser[ijk];
            req.body.read = false;
            req.body.name = 1;
            new Book_post_invitation(req.body).save(function (err, result) {
                //console.log("Error in send invitation : ", err);
                if (err) {
                    response = {
                        success: false,
                        error: true,
                        message: "Error in send invitation"
                    };
                    res.send(response);
                }
            });
        }
        return res.send({
            success: true,
            message: "Your invitation sent to users successfully."
        });
    } catch (error) {
        //console.log("Error in invitation sent to users", error);
        return res.send({
            success: false,
            message: "Error in invitation sent to users"
        });
    }
};

exports.sendRequestForBookPost = async (req, res) => {
    ////console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.post_id) {
        return res.send({
            success: false,
            message: "Please enter post id."
        });
    }
    if (!req.body.sender_id) {
        return res.send({
            success: false,
            message: "Please enter your user id."
        });
    }
    if (!req.body.recevier_id) {
        return res.send({
            success: false,
            message: "Please enter recevier user id."
        });
    }
    try {
        var checkdata = await Book_post_request.findOne({
            post_id: req.body.post_id,
            sender_id: req.body.sender_id,
            recevier_id: req.body.recevier_id
        })
        if (checkdata == [] || checkdata == null) {
            req.body.read = false;
            req.body.name = 2;
            new Book_post_request(req.body).save(function (err, result) {
                //console.log("Error in sent request to owner : ", err);
                if (err) {
                    response = {
                        success: false,
                        error: true,
                        message: "Error in sent request to owner."
                    };
                } else {
                    response = {
                        error: false,
                        success: true,
                        message: "Your request sent to owner successfully.",
                    };
                }
                res.send(response);
            });
        } else if (checkdata != null) {
            return res.send({
                success: true,
                message: "User request already sent to owner."
            });
        }
    } catch (error) {
        //console.log("Error in request sent to owner", error);
        return res.send({
            success: false,
            message: "Error in request sent to owner"
        });
    }
};

exports.getUserAllInvitationAndRequest = async (req, res) => {
    ////console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.user_id) {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    try {
        var checkdata1 = await Book_post_invitation.find({
            recevier_id: req.body.user_id
        }).populate('sender_id post_id');
        var checkdata2 = await Book_post_request.find({
            recevier_id: req.body.user_id
        }).populate('sender_id post_id');
        var finalArray = [];
        if (checkdata1 != null && checkdata2 != null) {
            finalArray = checkdata1.concat(checkdata2);
        } else if (checkdata1 != null) {
            finalArray = checkdata1;
        } else if (checkdata2 != null) {
            finalArray = checkdata2;
        }
        if (!finalArray) {
            return res.send({
                success: false,
                message: "No data found."
            });
        }
        finalArray.sort(function (a, b) {
            return new Date(b.created_at) - new Date(a.created_at);
        });

        return res.send({
            success: true,
            message: "All invitations and request data",
            dataCount: finalArray.length,
            getData: finalArray,
        });
    } catch (error) {
        //console.log("Error in get All invitations and request data", error);
        return res.send({
            success: false,
            message: "Error in get All invitations and request data"
        });
    }
};

exports.getPostCoowners = async (req, res) => {
    ////console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.post_id) {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    try {
        var checkdata1 = await Book_post_invitation.find({
            recevier_id: req.body.user_id
        });


        return res.send({
            success: true,
            message: "All invitations and request data",
            dataCount: finalArray.length,
            getData: finalArray,
        });
    } catch (error) {
        //console.log("Error in get All invitations and request data", error);
        return res.send({
            success: false,
            message: "Error in get All invitations and request data"
        });
    }
};

function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

exports.createChatId = async (req, res) => {
    //console.log("Chat id save body : ", req.body)
    if (!req.body.user_id) {
        return res.send({
            success: false,
            message: "Please enter user id"
        });
    }
    if (!req.body.buyer_id) {
        return res.send({
            success: false,
            message: "Please enter buyer id"
        });
    }
    //console.log("req.body.property_id ,", req.body.property_id);
    //console.log("req.body.property_id ,", typeof (req.body.property_id));
    try {
        var checkdata1 = await Chat_ID.find({
            $or: [{
                start_chat_user_id: req.body.user_id,
                receiver_user: req.body.buyer_id
            }, {
                start_chat_user_id: req.body.buyer_id,
                receiver_user: req.body.user_id
            }],
        })
        //console.log("records previous chat id : ", checkdata1);
        //console.log("records previous chat id : ", typeof (checkdata1));
        //console.log("records previous chat id : ", checkdata1.length);
        if (checkdata1.length !== 0) {
            //console.log("first if");
            let postD = {};
            if (req.body.property_id != undefined && req.body.property_id != "") {
                //console.log("sec ifffffffffffffff");
                postD = {
                    chat_id: checkdata1[0].chat_id,
                    sender_id: req.body.user_id,
                    recevier_id: req.body.buyer_id,
                    property_id: req.body.property_id,
                    message: "Hi, I'm interested in your property.",
                    read: false
                }
                new Users_chat(postD).save(async function (err, seeData) {
                    //console.log("seeData : ", seeData);
                    if (err) {
                        //console.log("Error in user chat save : ", err);
                        response = {
                            success: false,
                            message: "Error in user chat message save."
                        };
                    } else {
                        response = {
                            success: true,
                            code: 401,
                            chat_id: checkdata1[0].chat_id,
                            message: "Your message has been sent successfully. You already have a chat box, please visit your inbox to chat further the dealers."
                        }
                    }
                    let updateDate = await Chat_ID.findOneAndUpdate({
                        chat_id: checkdata1[0].chat_id
                    }, {
                        $set: {
                            updated_at: Date.now(),
                            updated_by: req.body.user_id
                        }
                    });
                    if (!updateDate) {
                        return res.send({
                            success: false,
                            message: "Error in update at chat id"
                        });
                    }
                    return res.send(response);
                });
            } else {
                //console.log("elseeee");
                return res.send({
                    success: true,
                    code: 401,
                    chat_id: checkdata1[0].chat_id,
                    message: "You already have a chat box, please visit your inbox to chat further the dealers."
                });
            }
        } else {
            var chat_id = guidGenerator();
            var postData = {
                start_chat_user_id: req.body.user_id,
                chat_id: chat_id,
                receiver_user: req.body.buyer_id,
            }
            new Chat_ID(postData).save(function (err, seeData) {
                //console.log("seeData : ", seeData);
                if (err) {
                    //console.log("Error in chat id save : ", err);
                    response = {
                        success: false,
                        message: "Error in chat id save"
                    };
                    return res.send(response);
                }
            });
            if (req.body.property_id != undefined && req.body.property_id != "") {
                //console.log("first prop ifff");
                let postD = {
                    chat_id: chat_id,
                    sender_id: req.body.user_id,
                    recevier_id: req.body.buyer_id,
                    property_id: req.body.property_id,
                    message: "Hi, I'm interested in your property.",
                    read: false
                }
                new Users_chat(postD).save(async function (err, seeData) {
                    //console.log("seeData : ", seeData);
                    if (err) {
                        //console.log("Error in chat id save : ", err);
                        response = {
                            success: false,
                            message: "Error in chat id save"
                        };
                    } else {
                        response = {
                            success: true,
                            code: 501,
                            chat_id: chat_id,
                            message: "New chat box and message has been sent successfully. Please visit your inbox to chat further the dealers."
                        }
                    }
                    let updateDate = await Chat_ID.findOneAndUpdate({
                        chat_id: chat_id
                    }, {
                        $set: {
                            updated_at: Date.now(),
                            updated_by: req.body.user_id
                        }
                    });
                    if (!updateDate) {
                        return res.send({
                            success: false,
                            message: "Error in update at chat id"
                        });
                    }
                    return res.send(response);
                });
            } else {
                return res.send({
                    success: true,
                    code: 501,
                    chat_id: chat_id,
                    message: "New chat box created successfully, please visit your inbox to chat further the dealers."
                });
            }
        }
    } catch (error) {
        //console.log("Error in chat id create", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.chatMessage = async (req, res) => {
    //console.log("Chat body : ", req.body)
    if (!req.body.user_id) {
        return res.send({
            success: false,
            message: "Please enter user id"
        });
    }
    if (!req.body.buyer_id) {
        return res.send({
            success: false,
            message: "Please enter buyer id"
        });
    }
    if (!req.body.chat_message) {
        return res.send({
            success: false,
            message: "Please enter chat message"
        });
    }
    try {
        // var checkPreviousChat = await Users_chat.find({
        //   sender_id: req.body.user_id,
        //   recevier_id: req.body.buyer_id
        // });
        // //console.log("checkPreviousChat checkPreviousChat", checkPreviousChat);
        // if (checkPreviousChat) {
        //   return res.send({
        //     success: false,
        //     error: true,
        //     message: "Your message already sent to buyer please go for your message box to chat with buyer"
        //   });
        //11111111 }
        var chat_id = guidGenerator();
        var postData = {
            start_chat_user_id: req.body.user_id,
            chat_id: chat_id,
            receiver_user: req.body.buyer_id,
            property_name: req.body.property_name
        }
        var postD = {
            chat_id: chat_id,
            sender_id: req.body.user_id,
            recevier_id: req.body.buyer_id,
            message: req.body.chat_message,
            read: false
        }
        // let response;
        var checkChatId = new Chat_ID(postData).save();
        if (!checkChatId) {
            return res.send({
                success: false,
                error: true,
                message: "Error in chat id save"
            });
        }
        var checkChatUser = new Users_chat(postD).save();
        if (!checkChatUser) {
            return res.send({
                success: false,
                error: true,
                message: "Error in chat in user chat"
            });
        }
        return res.send({
            error: false,
            success: true,
            message: "Message has been sent successfully, please visit your inbox to chat further the dealers.",
        });
    } catch (error) {
        //console.log("Error in chat user", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.deleteChatMessage = async (data) => {
    try {
        //console.log(data, "mark as read data")
        var result = await Users_chat.updateMany({
            _id: {
                $in: data
            }
        }, {
            $set: {
                status: 'Inactive'
            }
        });
        if (result) {
            //console.log(result, "resultssssss")
            return obj = {
                success: true,
                message: "Chat deleted successfully",
                data: result,
            }
        } else {
            return obj = {
                success: false,
                message: error
            }
        }
    } catch (error) {
        return obj = {
            success: false,
            message: error
        }
    }
}

// exports.deleteChatMessage = async (req, res) => {
//     if (!req.body.id || req.body.id == []) {
//         return res.send({
//             success: false,
//             message: "Please enter id"
//         });
//     }
//     try {
//         let arrayOfId = req.body.id;
//         for (let ij = 0; ij < arrayOfId.length; ij++) {
//             let upadteStatus = {
//                 status: 'Inactive'
//             }
//             await Users_chat.findByIdAndUpdate(arrayOfId[ij], upadteStatus).exec((err, records) => {
//                 if (err) {
//                    //console.log(err);
//                     return res.send({
//                         success: false,
//                         message: "Error in delete chat message"
//                     });
//                 }
//             });
//         }
//         return res.send({
//             success: true,
//             message: "Message deleted successfully.",
//         });
//     } catch (error) {
//        //console.log("Error in delete msg", error);
//         return res.send({
//             success: false,
//             message: messages.ERROR
//         });
//     }
// };

exports.editChatMessage = async (msg) => {
    ////console.log("Chat body : ", req.body)
    let obj = {}
    if (msg.recevier_id == "") {
        return obj = {
            success: false,
            message: "Please enter receiver id."
        };
    }
    if (msg.chat_id == "") {
        return obj = {
            success: false,
            message: "Please enter chat id."
        };
    }
    if (msg.message_id == "") {
        return obj = {
            success: false,
            message: "Please enter message id."
        };
    }
    if (msg.chat_message == "") {
        return obj = {
            success: false,
            message: "Please enter chat message."
        };
    }
    try {
        let upadteStatus = {
            message: msg.chat_message,
            updated_at: Date.now()
        }
        ////console.log(upadteStatus);
        var checkdata = await Users_chat.findByIdAndUpdate(msg.message_id, upadteStatus);
        if (!checkdata) {
            return obj = {
                success: false,
                message: "Error in update message."
            };
        }
        return obj = {
            success: true,
            message: "Your message updated succesfully.",
        };

    } catch (error) {
        //console.log("Error in update msg", error);
        return obj = {
            success: false,
            message: messages.ERROR
        };
    }
};

exports.markRead = async (data) => {
    try {

        //console.log(data, "mark as read data")
        var result = await Users_chat.updateMany({
            _id: {
                $in: data
            }
        }, {
            $set: {
                read: true
            }
        });
        if (result) {
            //console.log(result, "resultssssss")
            return obj = {
                success: true,
                message: "Chat marked read",
                data: result,
            }
        } else {
            return obj = {
                success: false,
                message: error
            }
        }
    } catch (error) {
        return obj = {
            success: false,
            message: error
        }
    }
}

exports.setSearchForMenebers = async (req, res) => {
    //console.log("req body search members : ", req.body);
    try {
        let searchMemberText = req.body.searchMember.trim();
        //console.log("searchMemberText", searchMemberText);
        let getData = [];
        if (searchMemberText != "") {
            //console.log("searchMemberText SEARCH");
            let checkSpace = searchMemberText.split(' ');
            //console.log("checkSpace : ", checkSpace);
            if (checkSpace[1]) {
                //console.log("ifff checkspace");
                getData = await User.find({
                    $and: [{
                        "$expr": {
                            "$regexMatch": {
                                "input": {
                                    "$concat": ["$firstname", " ", "$lastname"]
                                },
                                "regex": "a", //Your text search here
                                "options": "i"
                            }
                        }
                    }, {
                        profile_public: 'Yes',
                        verfied: 'Yes'
                    }]
                });
            } else {
                //console.log("elseeeee checkspace");
                getData = await User.find({
                    $and: [{
                        $or: [{
                                firstname: {
                                    $regex: ".*" + searchMemberText + ".*",
                                    '$options': 'i'
                                }
                            },
                            {
                                lastname: {
                                    $regex: ".*" + searchMemberText + ".*",
                                    '$options': 'i'
                                }
                            }
                        ]
                    }, {
                        profile_public: 'Yes',
                        verfied: 'Yes'
                    }]
                });
            }
        } else {
            getData = [];
        }
        //console.log("getData : ", getData)
        if (!getData) {
            return res.send({
                success: false,
                message: "Error in search members"
            });
        }
        return res.send({
            success: true,
            message: "Search members",
            dataCount: getData.length,
            getData: getData
        });
    } catch (error) {
        //console.log("Error in search members", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.searchForMembersWithoutCurrentUser = async (req, res) => {
    //console.log("req body search members : ", req.body);
    if (!req.body.user_id || req.body.user_id == '') {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    try {
        let searchMemberText = req.body.searchMember.trim();
        //console.log("searchMemberText", searchMemberText);
        let getData = [];
        if (searchMemberText != "") {
            //console.log("searchMemberText SEARCH");
            let checkSpace = searchMemberText.split(' ');
            //console.log("checkSpace : ", checkSpace);
            if (checkSpace[1]) {
                //console.log("ifff checkspace");
                getData = await User.find({
                    $and: [{
                        "$expr": {
                            "$regexMatch": {
                                "input": {
                                    "$concat": ["$firstname", " ", "$lastname"]
                                },
                                "regex": "a", //Your text search here
                                "options": "i"
                            }
                        }
                    }, {
                        profile_public: 'Yes',
                        verfied: 'Yes',
                        _id: {
                            $nin: req.body.user_id
                        },
                    }]
                });
            } else {
                //console.log("elseeeee checkspace");
                getData = await User.find({
                    $and: [{
                        $or: [{
                                firstname: {
                                    $regex: ".*" + searchMemberText + ".*",
                                    '$options': 'i'
                                }
                            },
                            {
                                lastname: {
                                    $regex: ".*" + searchMemberText + ".*",
                                    '$options': 'i'
                                }
                            }
                        ]
                    }, {
                        profile_public: 'Yes',
                        verfied: 'Yes',
                        _id: {
                            $nin: req.body.user_id
                        },
                    }]
                });
            }
        } else {
            getData = [];
        }
        //console.log("getData : ", getData)
        if (!getData) {
            return res.send({
                success: false,
                message: "Error in search members list without current user"
            });
        }
        return res.send({
            success: true,
            message: "Search members list without current user",
            dataCount: getData.length,
            getData: getData
        });
    } catch (error) {
        //console.log("Error in search members list without current user", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.showCountOfNotifications = async (req, res) => {
    if (!req.body.user_id) {
        return res.send({
            success: false,
            message: "Please send user id"
        });
    }
    try {
        var getAllChatId = await Chat_ID.find({
            $or: [{
                start_chat_user_id: req.body.user_id
            }, {
                receiver_user: req.body.user_id
            }],
            status: 'Active'
        }).sort({
            '_id': -1
        });
        if (!getAllChatId) {
            return res.send({
                success: false,
                message: "Error in get all chat contacts."
            });
        }
        var allChatIDs = getAllChatId.map(e => {
            return e.chat_id
        })
        var getChatData = await Users_chat.find({
            chat_id: {
                $in: allChatIDs
            },
            status: 'Active'
        });
        if (!getChatData) {
            return res.send({
                success: false,
                message: "Error in get all chat contacts."
            });
        }
        let count = 0;
        let countChatIds = [];
        for (const iterator of allChatIDs) {
            var groupedArray = getChatData.filter(e => {
                return e.chat_id == iterator;
            })
            ////console.log("groupedArray",groupedArray);
            for (let ijk = 0; ijk < groupedArray.length; ijk++) {
                if (groupedArray[ijk].read == false && groupedArray[ijk].recevier_id == req.body.user_id) {
                    count = count + 1;
                    countChatIds.push(groupedArray[ijk].chat_id);
                    break;
                }
            }
        }
        ////console.log("count : ",count);
        return res.send({
            success: true,
            message: "Get all chat contacts",
            notifyCount: count,
            countChatIds: countChatIds
        });
    } catch (error) {
        //console.log(error)
        return res.send({
            success: false,
            message: error
        });
    }
}

exports.getUserAllInvitationForPortfolio = async (req, res) => {
    ////console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.user_id) {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    try {
        let getAllUserInvitaion = await Pbms.find({
            "recevier_id.user_id": req.body.user_id,
            "status": 'Active'
        }).populate('recevier_id.invited_by_user_id recevier_id.user_id');
        let count11 = 0;
        for (let iii = 0; iii < getAllUserInvitaion.length; iii++) {
            let RecArray = getAllUserInvitaion[iii].recevier_id;
            for (let index = 0; index < RecArray.length; index++) {
                if (RecArray[index].user_id._id == req.body.user_id) {
                    if (RecArray[index].read == 'false') {
                        console.log("condition check yes",typeof(RecArray[index].read));
                        count11++;
                    }
                }
            }
        }
        console.log("after get invitation count : ",count11);
        let getAllRequestForAdmin = await Pbms.find({
            "recevier_id.invited_by_user_id": req.body.user_id,
            "recevier_id.request_for_admin.action": 'Yes',
            "recevier_id.request_for_admin.status": 'Pending',
        }).populate('recevier_id.user_id');
        if (getAllRequestForAdmin != null || getAllRequestForAdmin != []) {
            for (let iii = 0; iii < getAllRequestForAdmin.length; iii++) {
                let RecArray = getAllRequestForAdmin[iii].recevier_id;
                for (let index = 0; index < RecArray.length; index++) {
                    if (RecArray[index].invited_by_user_id == req.body.user_id) {
                        if (RecArray[index].request_for_admin.read == false) {
                            count11++;
                        }
                    }
                }
            }
            // count11 = count11 + getAllRequestForAdmin.length;
            getAllRequestForAdmin.sort(function (a, b) {
                return new Date(b.recevier_id.request_for_admin.request_date_time) - new Date(a.recevier_id.request_for_admin.request_date_time);
            });
        }
        console.log("after get user admin request count : ",count11);
        // get all user request for book property
        let populateQuery = [{
            path: 'user_id',
            select: 'firstname lastname _id profile_pic'
        }, {
            path: 'pbms_group_id',
            select: '_id title all_admins'
        }];
        let getRequestForProperty = await Book_pbms_property.find({
            status: 'Pending',
            request_to_admin: {
                $in: [req.body.user_id]
            }
        }).populate(populateQuery);
        // get user all request for beacome cohorts 
        let getAllrequestForCohorts = await Request_for_cohorts.find({
            receiver_id: req.body.user_id,
            "status": 'Pending'
        }).populate('sender_id').sort({
            '_id': -1
        });
        var getCohortRequestCount = await Request_for_cohorts.find({
            receiver_id: req.body.user_id,
            status: 'Pending',
            read: false
        }).count();
        count11 = count11 + getCohortRequestCount;
        console.log("after get user cohort request count : ",count11);
        ////console.log("countUnreadNotify : ",countUnreadNotify);
        if (!getAllUserInvitaion) {
            return res.send({
                success: false,
                message: "No data found."
            });
        }
        getAllUserInvitaion.sort(function (a, b) {
            return new Date(b.created_at) - new Date(a.created_at);
        });
        return res.send({
            success: true,
            message: "All invitations data",
            dataCount: count11,
            getData: getAllUserInvitaion,
            requestForAdminApproval: getAllRequestForAdmin,
            getRequestForProperty: getRequestForProperty,
            getAllrequestForCohorts: getAllrequestForCohorts
        });
    } catch (error) {
        //console.log("Error in get All invitations and request data", error);
        return res.send({
            success: false,
            message: "Error in get All invitations and request data"
        });
    }
};

exports.setReadAtUserAllNotification = async (req, res) => {
    ////console.log("emloyeeeeeeeeeeeeeee postttttttttt req body : ", req.body)
    if (!req.body.user_id) {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    try {
        updateUserInvitation = await Pbms.update({
            "recevier_id.user_id": req.body.user_id,
            "status": 'Active'
        }, {
            $set: {
                "recevier_id.$.read": 'true',
            }
        });
        updateUserAdminApproval = await Pbms.update({
            "recevier_id.invited_by_user_id": req.body.user_id,
            "recevier_id.request_for_admin.action": 'Yes',
            "recevier_id.request_for_admin.status": 'Pending',
        }, {
            $set: {
                "recevier_id.$.request_for_admin": {
                    action: 'Yes',
                    status: 'Pending',
                    read: true
                }
            }
        });
        updateCohortRequest = await Request_for_cohorts.update({
            receiver_id: req.body.user_id,
            "status": 'Pending',
            read: false
        }, {
            $set: {
                read: true,
            }
        });
        ////console.log("countUnreadNotify : ",countUnreadNotify);
        if (!updateUserInvitation || !updateUserAdminApproval || !updateCohortRequest) {
            return res.send({
                success: false,
                message: "No data found."
            });
        }       
        return res.send({
            success: true,
            message: "Set Read to all notification done.",
        });
    } catch (error) {
        //console.log("Error in get All invitations and request data", error);
        return res.send({
            success: false,
            message: "Error in set read All invitations and request data"
        });
    }
};

exports.listAllContacts = async (req, res) => {
    try {
        var checkdata = await Chat_ID.find({
            $or: [{
                start_chat_user_id: req.body.user_id
            }, {
                receiver_user: req.body.user_id
            }],
            status: 'Active'
        }).populate('start_chat_user_id receiver_user').sort({
            'updated_at': -1
        });
        if (!checkdata) {
            return res.send({
                success: false,
                message: "Error in get all chat contacts."
            });
        }
        return res.send({
            success: true,
            message: "Get all chat contacts",
            userContacts: checkdata
        });
    } catch (error) {
        //console.log(error)
        return res.send({
            success: false,
            message: error
        });
    }
}

exports.listAllChats = async (req, res) => {
    try {
        var checkdata = await Users_chat.find({
            chat_id: {
                $in: req.body.chat_id
            },
            status: 'Active'
        }).populate('sender_id recevier_id property_id');
        if (!checkdata) {
            return res.send({
                success: false,
                message: "Error in get all chat contacts."
            });
        }
        return res.send({
            success: true,
            message: "Get all chats by chat id",
            userChats: checkdata
        });
    } catch (error) {
        //console.log(error)
        return res.send({
            success: false,
            message: error
        });
    }
}

exports.getAllChatByUserId = async (req, res) => {
    if (!req.body.user_id) {
        return res.send({
            success: false,
            message: "Please send user id"
        });
    }
    try {
        // let checkHH = await Users_chat.find({$or:[{sender_id: req.body.user_id},{receiver_id : req.body.user_id}]})

        // let user_chat_data = await Users_chat.find({$or:[{sender_id: req.body.user_id},{recevier_id:req.boy.user_id}]}).populate('sender_id recevier_id')

        //.sort({      '_id': -1    })arg
        var checkdata = await Users_chat.find({
            $or: [{
                sender_id: req.body.user_id
            }, {
                recevier_id: req.body.user_id
            }],
            status: 'Active'
        }).populate('sender_id recevier_id');
        if (!checkdata) {
            return res.send({
                success: false,
                message: "Error in get all chat contacts."
            });
        }
        return res.send({
            success: true,
            message: "Get all chats by chat id",
            userChatData: checkdata
        });
    } catch (error) {
        //console.log("Error in get category phtots", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getDataByChatId = async (req, res) => {
    if (!req.body.chat_id) {
        return res.send({
            success: false,
            message: "Please Send chat Id"
        });
    }
    try {
        var checkdata = await Users_chat.find({
            chat_id: req.body.chat_id,
            status: 'Active'
        }).populate('sender_id recevier_id');
        if (!checkdata) {
            return res.send({
                success: false,
                message: "Error in get all chat contacts."
            });
        }
        return res.send({
            success: true,
            message: "Get all chats by chat id",
            userChatData: checkdata
        });
    } catch (error) {
        //console.log("Error in Get chat data by chat id", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.addNewfields = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    try {
        // await Renting_pbms_property.deleteMany({});
        // await Pbms.deleteMany({});
        // await Book_pbms_property.deleteMany({});
        // await Pbms.update({}, {
        //     $set: {
        //         "recevier_id.is_admin": false
        //     }
        // }, {
        //     multi: true
        // });
        await User.update({}, {
            $set: {
                claim_key: ""
            }
        }, {
            multi: true
        });
        // await CrowdFunding_sale.update({}, {
        //     $set: {
        //         fractional_share_choice_percentage_or_unit: "",
        //         fractional_share_text_percentage_or_unit: "",
        //         offering_Price_fractional_ownership: ""
        //     }
        // }, {
        //     multi: true
        // });
        // await Real_estate_sale.update({}, {
        //     $set: {
        //         fractional_share_choice_percentage_or_unit: "",
        //         fractional_share_text_percentage_or_unit: "",
        //         offering_Price_fractional_ownership: ""
        //     }
        // }, {
        //     multi: true
        // });
        // await yachts_sale.update({}, {
        //     $set: {
        //         fractional_share_choice_percentage_or_unit: "",
        //         fractional_share_text_percentage_or_unit: "",
        //         offering_Price_fractional_ownership: ""
        //     }
        // }, {
        //     multi: true
        // });
        return res.send({
            success: true,
            message: "New field added successfully."
        });
    } catch (error) {
        //console.log("User Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.updateFields1By1 = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    try {
        let getAllId = await User.find({}).select('_id');
        for (let ijk = 0; ijk < getAllId.length; ijk++) {
            let data = {
                claim_key: guidGenerator()
            }
            let updateDate = await User.findByIdAndUpdate(getAllId[ijk]._id, data);
            if (!updateDate) {
                return res.send({
                    success: false,
                    message: "Error in update all fields"
                });
            }
        }
        return res.send({
            success: true,
            message: "New field update successfully."
        });
    } catch (error) {
        //console.log("User Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.deleteUserPermanentInDB = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.body.username);
    //console.log("body reqparams user profile: ", req.body);
    try {
        await User.deleteOne({
            username: req.body.username,
        })
        return res.send({
            success: true,
            message: "User deleted successfully."
        });
    } catch (error) {
        //console.log("User Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.MakeColumnUnique = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    try {
        // await Users_chat.deleteMany({});
        // await Chat_ID.deleteMany({});
        await Pbms.createIndex({
            property_url: 1
        }, {
            unique: true
        })
        // await Aircraft_sale.update({}, {
        //     $set: {
        //         Sold_out: false,
        //         selling_price: null,
        //         selling_date: null
        //     }
        // }, {
        //     multi: true
        // });
        return res.send({
            success: true,
            message: "New field added successfully."
        });
    } catch (error) {
        //console.log("User Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getSenderMessage = async (msg) => {
    //console.log("Message in Controller file :  ", msg);
    let obj = {}
    if (msg.sender_id == "") {
        return obj = {
            success: false,
            message: "Please enter sender id."
        };
    }
    if (msg.recevier_id == "") {
        return obj = {
            success: false,
            message: "Please enter receiver id."
        };
    }
    if (msg.chat_id == "") {
        return obj = {
            success: false,
            message: "Please enter chat id."
        };
    }
    if (msg.chat_message == "") {
        return obj = {
            success: false,
            message: "Please enter chat message."
        };
    }
    try {
        var postD = {};
        if (msg.property_id != undefined && msg.property_id != "") {
            postD = {
                chat_id: msg.chat_id,
                property_id: msg.property_id,
                sender_id: msg.sender_id,
                recevier_id: msg.recevier_id,
                message: msg.chat_message,
                read: false,
            }
        } else {
            postD = {
                chat_id: msg.chat_id,
                sender_id: msg.sender_id,
                recevier_id: msg.recevier_id,
                message: msg.chat_message,
                read: false,
            }
        }
        var checkChatUser = await new Users_chat(postD).save();
        //console.log(checkChatUser, "checkChatUser")
        if (!checkChatUser) {
            return obj = {
                success: false,
                error: true,
                message: "Error in chat in user chat"
            };
        }
        // update Chat Id Table
        var updateDate = await Chat_ID.findOneAndUpdate({
            chat_id: msg.chat_id
        }, {
            $set: {
                updated_at: Date.now(),
                updated_by: msg.sender_id
            }
        });
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in update at chat id"
            });
        }
        return obj = {
            error: false,
            success: true,
            message: checkChatUser,
            sender_name: msg.sender_name
        };
    } catch (error) {
        //console.log("Error in chat user", error);
        return obj = {
            success: false,
            message: messages.ERROR
        };
    }
};

exports.wePoGetAllListingForWecownPbmsGroup = async (req, res) => {
    try {
        // for get wepo all listings
        let getData1Real = await Real_estate_sale.find({
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }, {
            _id: 1,
            'Tittle_Name': 1,
            'name': 1,
            'created_at': 1,
            "property_photos": {
                $slice: 1
            }
        }).sort({
            '_id': -1
        });
        let getData1Air = await Aircraft_sale.find({
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }, {
            _id: 1,
            'Tittle_Name': 1,
            'name': 1,
            'created_at': 1,
            "property_photos": {
                $slice: 1
            }
        }).sort({
            '_id': -1
        });
        let getData1Yach = await Yachts_sale.find({
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }, {
            _id: 1,
            'Tittle_Name': 1,
            'name': 1,
            'created_at': 1,
            "property_photos": {
                $slice: 1
            }
        }).sort({
            '_id': -1
        });
        let getDataCrowdfunding = await CrowdFunding_sale.find({
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }, {
            _id: 1,
            'Tittle_Name': 1,
            'name': 1,
            'created_at': 1,
            "property_photos": {
                $slice: 1
            }
        }).sort({
            '_id': -1
        });
        let getDataBusiness = await Business_sale.find({
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }, {
            _id: 1,
            'Tittle_Name': 1,
            'name': 1,
            'created_at': 1,
            "property_photos": {
                $slice: 1
            }
        }).sort({
            '_id': -1
        });
        let getDataCars = await Cars_and_rv_sale.find({
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }, {
            _id: 1,
            'Tittle_Name': 1,
            'name': 1,
            'created_at': 1,
            "property_photos": {
                $slice: 1
            }
        }).sort({
            '_id': -1
        });
        let getDataHorses = await Horses_livestock.find({
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }, {
            _id: 1,
            'Tittle_Name': 1,
            'name': 1,
            'created_at': 1,
            "property_photos": {
                $slice: 1
            }
        }).sort({
            '_id': -1
        });
        let getDataArtwork = await Artwork_sale.find({
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }, {
            _id: 1,
            'Tittle_Name': 1,
            'name': 1,
            'created_at': 1,
            "property_photos": {
                $slice: 1
            }
        }).sort({
            '_id': -1
        });
        let getDataCrypto = await Crypto_asset.find({
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }, {
            _id: 1,
            'Tittle_Name': 1,
            'name': 1,
            'created_at': 1,
            "property_photos": {
                $slice: 1
            }
        }).sort({
            '_id': -1
        });
        // let getData1Real = await Real_estate_sale.find({
        //     status: 'Active',
        //     listing_show_on_wepo: 'Yes'
        // }).sort({
        //     '_id': -1
        // }).select('Tittle_Name name');
        // let getData1Air = await Aircraft_sale.find({
        //     status: 'Active',
        //     listing_show_on_wepo: 'Yes'
        // }).sort({
        //     '_id': -1
        // }).select('Tittle_Name name');
        // let getData1Yach = await Yachts_sale.find({
        //     status: 'Active',
        //     listing_show_on_wepo: 'Yes'
        // }).sort({
        //     '_id': -1
        // }).select('Tittle_Name name');
        // let getDataCrowdfunding = await CrowdFunding_sale.find({
        //     status: 'Active',
        //     listing_show_on_wepo: 'Yes'
        // }).sort({
        //     '_id': -1
        // }).select('Tittle_Name name');
        var finalArray = getData1Real.concat(getData1Air, getData1Yach, getDataCrowdfunding, getDataBusiness, getDataCars, getDataHorses, getDataArtwork, getDataCrypto);
        //console.log("getData : ", finalArray);
        if (!finalArray) {
            return res.send({
                success: false,
                message: "Error in get all wepo all listing for wecoown pbms group create."
            });
        }
        finalArray.sort(function (a, b) {
            return new Date(b.created_at) - new Date(a.created_at);
        });
        return res.send({
            success: true,
            message: "get data of all listing for wecoown pbms group create.",
            getData: finalArray
        });
    } catch (error) {
        //console.log("Error in get all wepo all listing for wecoown pbms group create. : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getAllMyPortFolioDataOfwepo = async (req, res) => {
    //console.log("req.bodyyyy get user posts : ", req.body);
    if (!req.body.id) {
        return res.send({
            success: false,
            message: "Please enter post id"
        });
    }
    try {
        //created_by: 'WeCoOwn'
        let getData1Real = await Real_estate_sale.find({
            user_id: req.body.id,
            status: 'Active'
        }).sort({
            '_id': -1
        });
        let getData1Air = await Aircraft_sale.find({
            user_id: req.body.id,
            status: 'Active'
        }).sort({
            '_id': -1
        });
        let getData1Yach = await Yachts_sale.find({
            user_id: req.body.id,
            status: 'Active'
        }).sort({
            '_id': -1
        });
        let getDataCrowdFunding = await CrowdFunding_sale.find({
            user_id: req.body.id,
            status: 'Active'
        }).sort({
            '_id': -1
        });
        let getDataBusiness = await Business_sale.find({
            user_id: req.body.id,
            status: 'Active'
        }).sort({
            '_id': -1
        });
        let getDataCars = await Cars_and_rv_sale.find({
            user_id: req.body.id,
            status: 'Active'
        }).sort({
            '_id': -1
        });
        let getDataHorses = await Horses_livestock.find({
            user_id: req.body.id,
            status: 'Active'
        }).sort({
            '_id': -1
        });
        let getDataArtwork = await Artwork_sale.find({
            user_id: req.body.id,
            status: 'Active'
        }).sort({
            '_id': -1
        });
        let getDataCrypto = await Crypto_asset.find({
            user_id: req.body.id,
            status: 'Active'
        }).sort({
            '_id': -1
        });
        var finalArray = getData1Real.concat(getData1Air, getData1Yach, getDataCrowdFunding, getDataBusiness, getDataCars, getDataHorses, getDataArtwork, getDataCrypto);
        //console.log("getData : ", finalArray);
        if (!finalArray) {
            return res.send({
                success: false,
                message: "Error in get all wepo posting."
            });
        }
        finalArray.sort(function (a, b) {
            return new Date(b.created_at) - new Date(a.created_at);
        });
        return res.send({
            success: true,
            message: "get data of all posting wecown.",
            getData: finalArray
        });
    } catch (error) {
        //console.log("Error in get all wepo posting wecoown: ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};
// function getSenderMessage(msg) {
//   //console.log("Message in Controller file : ",msg);
// }

/*************************** WePropertyowners APi's********************* */
exports.getWePoPropertyType = async (req, res) => {
    try {
        var data = await WePo_property_type.find({}).sort('property_type');
        //console.log("all act ..: ", data);
        if (!data) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "All property list list",
            data: data,
        });
    } catch (error) {
        //console.log("Error in get all property type", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.setWePoPropertyType = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body);
    if (!req.body.property_type || req.body.property_type == "") {
        return res.send({
            success: false,
            message: "Please enter property type."
        });
    }
    try {
        new WePo_property_type(req.body).save(function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                response = {
                    success: false,
                    message: "Error in save property type."
                };
            } else {
                response = {
                    success: true,
                    message: "Your property type created successfully."
                }
            }
            res.send(response);
        });
    } catch (error) {
        //console.log("Error in save property type : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoSetSubPropertyType = async (req, res) => {
    //console.log("user bodyyyyyyyyyyyy : ", req.body);
    if (!req.body.property_type || req.body.property_type == "") {
        return res.send({
            success: false,
            message: "Please enter property type."
        });
    }
    if (!req.body.property_subtype || req.body.property_subtype == "") {
        return res.send({
            success: false,
            message: "Please enter property sub type."
        });
    }
    try {
        new WePo_sub_property_type(req.body).save(function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                response = {
                    success: false,
                    message: "Error in save sub property type."
                };
            } else {
                response = {
                    success: true,
                    message: "Your sub property type created successfully."
                }
            }
            res.send(response);
        });
    } catch (error) {
        //console.log("Error in save sub property type : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoGetSubPropertyType = async (req, res) => {
    //console.log("ffffffffffffffffffffffffffffffffff : ", req.body);
    if (!req.body.property_type || req.body.property_type == "") {
        return res.send({
            success: false,
            message: "Please enter property type."
        });
    }
    try {
        var data = await WePo_sub_property_type.find({
            property_type: req.body.property_type
        }).sort('property_subtype');
        //console.log("all actttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt ..: ", data);
        if (!data) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "All sub property list list",
            data: data,
        });
    } catch (error) {
        //console.log("Error in get all sub property type", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.setWePoPosting = async (req, res) => {
    //console.log("body reqparams we psoting: ", req.body);
    //console.log("Photos : ", req.files);
    if (!req.files) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (!req.body.uploadImageThrughAPK && !req.files) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.body.uploadImageThrughAPK == '[]' && req.files == {}) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    // if (req.files == "") {
    //     return res.send({
    //         success: false,
    //         message: "Please select property picture."
    //     });
    // }
    try {
        var progileImageArr = [];
        if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined' && req.body.uploadImageThrughAPK != '[]') {
            let imageArr = JSON.parse(req.body.uploadImageThrughAPK);
            for (let i = 0; i < imageArr.length; i++) {
                progileImageArr.push({
                    src: imageArr[i].src,
                    orgName: imageArr[i].orgName,
                })
            }
        } else if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        new WePo_posting(req.body).save(function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                response = {
                    success: false,
                    message: "Error in property posting."
                };
            } else {
                response = {
                    success: true,
                    message: "Your property post created successfully."
                }
            }
            res.send(response);
        });
    } catch (error) {
        //console.log("Error in posting in wepo : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePogetAllPosting = async (req, res) => {
    if (!req.body.purpose || req.body.purpose == "") {
        return res.send({
            success: false,
            message: "Please select purpose."
        });
    }
    try {
        let getData1Real = await Real_estate_sale.find({
            purpose: {
                $in: [req.body.purpose, "Both"]
            },
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }).sort({
            '_id': -1
        });
        let getData1Air = await Aircraft_sale.find({
            purpose: {
                $in: [req.body.purpose, "Both"]
            },
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }).sort({
            '_id': -1
        });
        let getData1Yach = await Yachts_sale.find({
            purpose: {
                $in: [req.body.purpose, "Both"]
            },
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }).sort({
            '_id': -1
        });
        let getDataCrowdfunding = await CrowdFunding_sale.find({
            purpose: {
                $in: [req.body.purpose, "Both"]
            },
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }).sort({
            '_id': -1
        });
        let getDataBusiness = await Business_sale.find({
            purpose: {
                $in: [req.body.purpose, "Both"]
            },
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }).sort({
            '_id': -1
        });
        let getDataCars = await Cars_and_rv_sale.find({
            purpose: {
                $in: [req.body.purpose, "Both"]
            },
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }).sort({
            '_id': -1
        });
        let getDataHorses = await Horses_livestock.find({
            purpose: {
                $in: [req.body.purpose, "Both"]
            },
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }).sort({
            '_id': -1
        });
        let getDataArtwork = await Artwork_sale.find({
            purpose: {
                $in: [req.body.purpose, "Both"]
            },
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }).sort({
            '_id': -1
        });

        let getDataCrypto = await Crypto_asset.find({
            purpose: {
                $in: [req.body.purpose, "Both"]
            },
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }).sort({
            '_id': -1
        });
        // let getData1 = await Office_listing_sale.find({
        //     status: 'Active'
        // }).sort({
        //     '_id': -1
        // });
        // let getData2 = await Industrial_listing_sale.find({
        //     status: 'Active'
        // }).sort({
        //     '_id': -1
        // });
        // let getData3 = await Retail_listing_sale.find({
        //     status: 'Active'
        // }).sort({
        //     '_id': -1
        // });
        // let getData4 = await Residential_listing_sale.find({
        //     status: 'Active'
        // }).sort({
        //     '_id': -1
        // });
        // let getData5 = await restaurant_listing_sale.find({
        //     status: 'Active'
        // }).sort({
        //     '_id': -1
        // });
        // let getData6 = await Hospitality_listing_sale.find({
        //     status: 'Active'
        // }).sort({
        //     '_id': -1
        // });
        // let getData7 = await Health_care_listing_sale.find({
        //     status: 'Active'
        // }).sort({
        //     '_id': -1
        // });
        // let getData8 = await Sport_listing_sale.find({
        //     status: 'Active'
        // }).sort({
        //     '_id': -1
        // });
        // let getData9 = await Land_listing_sale.find({
        //     status: 'Active'
        // }).sort({
        //     '_id': -1
        // });
        // let getData10 = await Multifamily_listing_sale.find({
        //     status: 'Active'
        // }).sort({
        //     '_id': -1
        // });
        // let getData11 = await Shopping_listing_sale.find({
        //     status: 'Active'
        // }).sort({
        //     '_id': -1
        // });
        // let getData12 = await Specaility_listing_sale.find({
        //     status: 'Active'
        // }).sort({
        //     '_id': -1
        // });
        var finalArray = getData1Real.concat(getData1Air, getData1Yach, getDataCrowdfunding, getDataBusiness, getDataCars, getDataHorses, getDataArtwork, getDataCrypto);
        //console.log("getData : ", finalArray);
        if (!finalArray) {
            return res.send({
                success: false,
                message: "Error in get all wepo posting."
            });
        }
        finalArray.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.created_at) - new Date(a.created_at);
        });
        return res.send({
            success: true,
            message: "get data of all posting.",
            getData: finalArray
        });
    } catch (error) {
        //console.log("Error in get all wepo posting : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePogetAllPostingByUserId = async (req, res) => {
    //console.log("req.bodyyyy get user posts : ", req.body);
    if (!req.body.id) {
        return res.send({
            success: false,
            message: "Please enter post id"
        });
    }
    try {
        let getData1Real = await Real_estate_sale.find({
            user_id: req.body.id,
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }).sort({
            '_id': -1
        });
        let getData1Air = await Aircraft_sale.find({
            user_id: req.body.id,
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }).sort({
            '_id': -1
        });
        let getData1Yach = await Yachts_sale.find({
            user_id: req.body.id,
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }).sort({
            '_id': -1
        });
        let getDataCrowdFunding = await CrowdFunding_sale.find({
            user_id: req.body.id,
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }).sort({
            '_id': -1
        });
        let getDataBusiness = await Business_sale.find({
            user_id: req.body.id,
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }).sort({
            '_id': -1
        });
        let getDataCars = await Cars_and_rv_sale.find({
            user_id: req.body.id,
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }).sort({
            '_id': -1
        });
        let getDataHorses = await Horses_livestock.find({
            user_id: req.body.id,
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }).sort({
            '_id': -1
        });
        let getDataArtwork = await Artwork_sale.find({
            user_id: req.body.id,
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }).sort({
            '_id': -1
        });
        let getDataCrypto = await Crypto_asset.find({
            user_id: req.body.id,
            status: 'Active',
            listing_show_on_wepo: 'Yes'
        }).sort({
            '_id': -1
        });
        // let getData1 = await Office_listing_sale.find({
        //     status: 'Active',
        //     user_id: req.body.id
        // }).sort({
        //     '_id': -1
        // });
        // let getData2 = await Industrial_listing_sale.find({
        //     status: 'Active',
        //     user_id: req.body.id
        // }).sort({
        //     '_id': -1
        // });
        // let getData3 = await Retail_listing_sale.find({
        //     status: 'Active',
        //     user_id: req.body.id
        // }).sort({
        //     '_id': -1
        // });
        // let getData4 = await Residential_listing_sale.find({
        //     status: 'Active',
        //     user_id: req.body.id
        // }).sort({
        //     '_id': -1
        // });
        // let getData5 = await restaurant_listing_sale.find({
        //     status: 'Active',
        //     user_id: req.body.id
        // }).sort({
        //     '_id': -1
        // });
        // let getData6 = await Hospitality_listing_sale.find({
        //     status: 'Active',
        //     user_id: req.body.id
        // }).sort({
        //     '_id': -1
        // });
        // let getData7 = await Health_care_listing_sale.find({
        //     status: 'Active',
        //     user_id: req.body.id
        // }).sort({
        //     '_id': -1
        // });
        // let getData8 = await Sport_listing_sale.find({
        //     status: 'Active',
        //     user_id: req.body.id
        // }).sort({
        //     '_id': -1
        // });
        // let getData9 = await Land_listing_sale.find({
        //     status: 'Active',
        //     user_id: req.body.id
        // }).sort({
        //     '_id': -1
        // });
        // let getData10 = await Multifamily_listing_sale.find({
        //     status: 'Active',
        //     user_id: req.body.id
        // }).sort({
        //     '_id': -1
        // });
        // let getData11 = await Shopping_listing_sale.find({
        //     status: 'Active',
        //     user_id: req.body.id
        // }).sort({
        //     '_id': -1
        // });
        // let getData12 = await Specaility_listing_sale.find({
        //     status: 'Active',
        //     user_id: req.body.id
        // }).sort({
        //     '_id': -1
        // });
        var finalArray = getData1Real.concat(getData1Air, getData1Yach, getDataCrowdFunding, getDataBusiness, getDataCars, getDataHorses, getDataArtwork, getDataCrypto);
        //console.log("getData : ", finalArray);
        if (!finalArray) {
            return res.send({
                success: false,
                message: "Error in get all wepo posting."
            });
        }
        finalArray.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.created_at) - new Date(a.created_at);
        });
        return res.send({
            success: true,
            message: "get data of all posting.",
            getData: finalArray
        });
    } catch (error) {
        //console.log("Error in get all wepo posting : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePogetPostingById = async (req, res) => {
    if (!req.body.id || req.body.id == "") {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    if (!req.body.name || req.body.name == "") {
        return res.send({
            success: false,
            message: "Please enter property type."
        });
    }
    try {
        var getData = [];
        if (req.body.name === 'Real Estate') {
            getData = await Real_estate_sale.find({
                _id: req.body.id
            });
        } else if (req.body.name === 'Yachts & Ships') {
            getData = await Yachts_sale.find({
                _id: req.body.id
            });
        } else if (req.body.name === 'Jets & Aircraft') {
            getData = await Aircraft_sale.find({
                _id: req.body.id
            });
        } else if (req.body.name === 'Crowdfunding Projects') {
            getData = await CrowdFunding_sale.find({
                _id: req.body.id
            });
        } else if (req.body.name === 'Business Properties') {
            getData = await Business_sale.find({
                _id: req.body.id
            });
        } else if (req.body.name === 'Cars & RVs') {
            getData = await Cars_and_rv_sale.find({
                _id: req.body.id
            });
        } else if (req.body.name === 'Horses & Live Stocks') {
            getData = await Horses_livestock.find({
                _id: req.body.id
            });
        } else if (req.body.name === 'Artworks & Antiques') {
            getData = await Artwork_sale.find({
                _id: req.body.id
            });
        } else if (req.body.name === 'Crypto-Assets') {
            getData = await Crypto_asset.find({
                _id: req.body.id
            });
        }

        if (req.body.name === 'Health Care') {
            getData = await Health_care_listing_sale.find({
                _id: req.body.id
            });
        } else if (req.body.name === 'Hospitality') {
            getData = await Hospitality_listing_sale.find({
                _id: req.body.id
            });
        } else if (req.body.name === 'Industrial') {
            getData = await Industrial_listing_sale.find({
                _id: req.body.id
            });
        } else if (req.body.name === 'Land') {
            getData = await Land_listing_sale.find({
                _id: req.body.id
            });
        } else if (req.body.name === 'Multifamily') {
            getData = await Multifamily_listing_sale.find({
                _id: req.body.id
            });
        } else if (req.body.name === 'Office') {
            getData = await Office_listing_sale.find({
                _id: req.body.id
            });
        } else if (req.body.name === 'Residential Income') {
            getData = await Residential_listing_sale.find({
                _id: req.body.id
            });
        } else if (req.body.name === 'Restaurant') {
            getData = await restaurant_listing_sale.find({
                _id: req.body.id
            });
        } else if (req.body.name === 'Retail') {
            getData = await Retail_listing_sale.find({
                _id: req.body.id
            });
        } else if (req.body.name === 'Shopping Center') {
            getData = await Shopping_listing_sale.find({
                _id: req.body.id
            });
        } else if (req.body.name === 'Specialty') {
            getData = await Specaility_listing_sale.find({
                _id: req.body.id
            });
        } else if (req.body.name === 'Sports & Entertainment') {
            getData = await Sport_listing_sale.find({
                _id: req.body.id
            });
        }
        //console.log("getData : ", getData);
        if (!getData) {
            return res.send({
                success: false,
                message: "Error in get all wepo posting."
            });
        }
        return res.send({
            success: true,
            message: "get data of all posting.",
            getData: getData
        });
    } catch (error) {
        //console.log("Error in get all wepo posting : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoGetSubCategoryListing = async (req, res) => {
    //console.log("get sub category req body : ", req.body);
    if (!req.body.property_type || req.body.property_type == "") {
        return res.send({
            success: false,
            message: "Please enter property type."
        });
    }
    if (!req.body.property_subtype || req.body.property_subtype == "") {
        return res.send({
            success: false,
            message: "Please enter property sub-type."
        });
    }
    try {
        var getData = [];
        if (req.body.property_type === 'Real Estate') {
            getData = await Real_estate_sale.find({
                property_subtype: req.body.property_subtype,
                status: 'Active',
                listing_show_on_wepo: 'Yes'
            });
        } else if (req.body.property_type === 'Yachts & Ships') {
            getData = await Yachts_sale.find({
                yachts_subtype: req.body.property_subtype,
                status: 'Active',
                listing_show_on_wepo: 'Yes'
            });
        } else if (req.body.property_type === 'Jets & Aircraft') {
            getData = await Aircraft_sale.find({
                Aircraft_subtype: req.body.property_subtype,
                status: 'Active',
                listing_show_on_wepo: 'Yes'
            });
        } else if (req.body.property_type === 'Crowdfunding Projects') {
            getData = await CrowdFunding_sale.find({
                CrowdFunding_subtype: req.body.property_subtype,
                status: 'Active',
                listing_show_on_wepo: 'Yes'
            });
        } else if (req.body.property_type === 'Artworks & Antiques') {
            getData = await Artwork_sale.find({
                Artwork_subtype: req.body.property_subtype,
                status: 'Active',
                listing_show_on_wepo: 'Yes'
            });
        } else if (req.body.property_type === 'Business Properties') {
            getData = await Business_sale.find({
                Business_subtype: req.body.property_subtype,
                status: 'Active',
                listing_show_on_wepo: 'Yes'
            });
        } else if (req.body.property_type === 'Cars & RVs') {
            getData = await Cars_and_rv_sale.find({
                Cars_Rv_subtype: req.body.property_subtype,
                status: 'Active',
                listing_show_on_wepo: 'Yes'
            });
        } else if (req.body.property_type === 'Crypto-Assets') {
            getData = await Crypto_asset.find({
                Crypto_Assets_subtype: req.body.property_subtype,
                status: 'Active',
                listing_show_on_wepo: 'Yes'
            });
        } else if (req.body.property_type === 'Horses & Live Stocks') {
            getData = await Horses_livestock.find({
                Horses_Livestocks_subtype: req.body.property_subtype,
                status: 'Active',
                listing_show_on_wepo: 'Yes'
            });
        }
        //console.log("getData : ", getData);
        if (!getData) {
            return res.send({
                success: false,
                message: "Error in get all wepo listing by category name."
            });
        }
        getData.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.created_at) - new Date(a.created_at);
        });
        return res.send({
            success: true,
            message: "get data of all wepo listing by category name.",
            getData: getData
        });
    } catch (error) {
        //console.log("Error in get all wepo listing by category name : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePodeletePosting = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please enter post id"
            });
        }
        let upadteStatus = {
            status: 'Inactive'
        }
        var updateDate = await WePo_posting.findByIdAndUpdate(req.body.id, upadteStatus);
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in delete post"
            });
        }
        return res.send({
            success: true,
            message: "Your post deleted successfully.",
        });
    } catch (error) {
        //console.log("Error in delete post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoUpdatePosting = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    // //console.log("Photos : ", req.files);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    try {
        progileImageArr = [];
        if (req.body.previous_images != undefined) {
            if (req.body.previous_images != '[]') {
                //console.log("prevuois image : ", req.body.previous_images);
                var preImg = JSON.parse(req.body.previous_images);
                //console.log("pre image parse : ", preImg);
                //console.log("pre image parse trrrrrrrrr : ", preImg[0].orgName);
                for (let jk = 0; jk < preImg.length; jk++) {
                    progileImageArr.push({
                        src: preImg[jk].src,
                        orgName: preImg[jk].orgName,
                    })
                }
                //console.log("after previous merge : ", progileImageArr);
            }
        }
        if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined' && req.body.uploadImageThrughAPK != '[]') {
            let imageArr = JSON.parse(req.body.uploadImageThrughAPK);
            for (let i = 0; i < imageArr.length; i++) {
                progileImageArr.push({
                    src: imageArr[i].src,
                    orgName: imageArr[i].orgName,
                })
            }
        } else if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        //console.log("req body photos : ", req.body.property_photos);
        // let profileData = {
        //     cover_pic: progileImageArr
        // }
        var updateData = await WePo_posting.findByIdAndUpdate(req.query.id, req.body);
        //console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your listing updated successfully."
        });
    } catch (error) {
        //console.log("User Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

// property type listing create
exports.wePoListingOffice = async (req, res) => {
    //console.log("body reqparams we psoting: ", req.body);
    //console.log("Photos : ", req.files);
    if (!req.files) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.files == "") {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    try {
        var progileImageArr = [];
        if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        new Office_listing_sale(req.body).save(function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                response = {
                    success: false,
                    message: "Error in property listing."
                };
            } else {
                response = {
                    success: true,
                    message: "Your property list created successfully."
                }
            }
            res.send(response);
        });
    } catch (error) {
        //console.log("Error in posting in wepo : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoListingIndustrial = async (req, res) => {
    //console.log("body reqparams we psoting: ", req.body);
    //console.log("Photos : ", req.files);
    if (!req.files) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.files == "") {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    try {
        var progileImageArr = [];
        if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        new Industrial_listing_sale(req.body).save(function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                response = {
                    success: false,
                    message: "Error in property listing."
                };
            } else {
                response = {
                    success: true,
                    message: "Your property list created successfully."
                }
            }
            res.send(response);
        });
    } catch (error) {
        //console.log("Error in posting in wepo : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoListingRetail = async (req, res) => {
    //console.log("body reqparams we psoting: ", req.body);
    //console.log("Photos : ", req.files);
    if (!req.files) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.files == "") {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    try {
        var progileImageArr = [];
        if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        new Retail_listing_sale(req.body).save(function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                response = {
                    success: false,
                    message: "Error in property listing."
                };
            } else {
                response = {
                    success: true,
                    message: "Your property list created successfully."
                }
            }
            res.send(response);
        });
    } catch (error) {
        //console.log("Error in posting in wepo : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoListingRestaurant = async (req, res) => {
    //console.log("body reqparams we psoting: ", req.body);
    //console.log("Photos : ", req.files);
    if (!req.files) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.files == "") {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    try {
        var progileImageArr = [];
        if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        new restaurant_listing_sale(req.body).save(function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                response = {
                    success: false,
                    message: "Error in property listing."
                };
            } else {
                response = {
                    success: true,
                    message: "Your property list created successfully."
                }
            }
            res.send(response);
        });
    } catch (error) {
        //console.log("Error in posting in wepo : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoListingShopping = async (req, res) => {
    //console.log("body reqparams we psoting: ", req.body);
    //console.log("Photos : ", req.files);
    if (!req.files) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.files == "") {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    try {
        var progileImageArr = [];
        if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        new Shopping_listing_sale(req.body).save(function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                response = {
                    success: false,
                    message: "Error in property listing."
                };
            } else {
                response = {
                    success: true,
                    message: "Your property list created successfully."
                }
            }
            res.send(response);
        });
    } catch (error) {
        //console.log("Error in posting in wepo : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoListingMultifamily = async (req, res) => {
    //console.log("body reqparams we psoting: ", req.body);
    //console.log("Photos : ", req.files);
    if (!req.files) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.files == "") {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    try {
        var progileImageArr = [];
        if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        new Multifamily_listing_sale(req.body).save(function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                response = {
                    success: false,
                    message: "Error in property listing."
                };
            } else {
                response = {
                    success: true,
                    message: "Your property list created successfully."
                }
            }
            res.send(response);
        });
    } catch (error) {
        //console.log("Error in posting in wepo : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoListingSpecaility = async (req, res) => {
    //console.log("body reqparams we psoting: ", req.body);
    //console.log("Photos : ", req.files);
    if (!req.files) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.files == "") {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    try {
        var progileImageArr = [];
        if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        new Specaility_listing_sale(req.body).save(function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                response = {
                    success: false,
                    message: "Error in property listing."
                };
            } else {
                response = {
                    success: true,
                    message: "Your property list created successfully."
                }
            }
            res.send(response);
        });
    } catch (error) {
        //console.log("Error in posting in wepo : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoListingHospitility = async (req, res) => {
    //console.log("body reqparams we psoting: ", req.body);
    //console.log("Photos : ", req.files);
    if (!req.files) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.files == "") {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    try {
        var progileImageArr = [];
        if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        new Hospitality_listing_sale(req.body).save(function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                response = {
                    success: false,
                    message: "Error in property listing."
                };
            } else {
                response = {
                    success: true,
                    message: "Your property list created successfully."
                }
            }
            res.send(response);
        });
    } catch (error) {
        //console.log("Error in posting in wepo : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoListingHealthCare = async (req, res) => {
    //console.log("body reqparams we psoting: ", req.body);
    //console.log("Photos : ", req.files);
    if (!req.files) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.files == "") {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    try {
        var progileImageArr = [];
        if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        new Health_care_listing_sale(req.body).save(function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                response = {
                    success: false,
                    message: "Error in property listing."
                };
            } else {
                response = {
                    success: true,
                    message: "Your property list created successfully."
                }
            }
            res.send(response);
        });
    } catch (error) {
        //console.log("Error in posting in wepo : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoListingSports = async (req, res) => {
    //console.log("body reqparams we psoting: ", req.body);
    //console.log("Photos : ", req.files);
    if (!req.files) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.files == "") {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    try {
        var progileImageArr = [];
        if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        new Sport_listing_sale(req.body).save(function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                response = {
                    success: false,
                    message: "Error in property listing."
                };
            } else {
                response = {
                    success: true,
                    message: "Your property list created successfully."
                }
            }
            res.send(response);
        });
    } catch (error) {
        //console.log("Error in posting in wepo : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoListingLand = async (req, res) => {
    //console.log("body reqparams we psoting: ", req.body);
    //console.log("Photos : ", req.files);
    if (!req.files) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.files == "") {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    try {
        var progileImageArr = [];
        if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        new Land_listing_sale(req.body).save(function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                response = {
                    success: false,
                    message: "Error in property listing."
                };
            } else {
                response = {
                    success: true,
                    message: "Your property list created successfully."
                }
            }
            res.send(response);
        });
    } catch (error) {
        //console.log("Error in posting in wepo : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoListingTResidential = async (req, res) => {
    //console.log("body reqparams we psoting: ", req.body);
    //console.log("Photos : ", req.files);
    if (!req.files) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.files == "") {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    try {
        var progileImageArr = [];
        if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        new Residential_listing_sale(req.body).save(function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                response = {
                    success: false,
                    message: "Error in property listing."
                };
            } else {
                response = {
                    success: true,
                    message: "Your property list created successfully."
                }
            }
            res.send(response);
        });
    } catch (error) {
        //console.log("Error in posting in wepo : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

// property type listing update
exports.wePoUpdateListingOffice = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddduuuuuuuuuuuuuuuuuu : ", req.query.id);
    // //console.log("body reqparams user profile: ", req.body);
    //console.log("Photos : ", req.files);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (req.body.previous_images == '[]' && req.files == undefined) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    try {
        progileImageArr = [];
        if (req.body.previous_images != undefined) {
            if (req.body.previous_images != '[]') {
                //console.log("prevuois image : ", req.body.previous_images);
                var preImg = JSON.parse(req.body.previous_images);
                //console.log("pre image parse : ", preImg);
                //console.log("pre image parse trrrrrrrrr : ", preImg[0].orgName);
                for (let jk = 0; jk < preImg.length; jk++) {
                    progileImageArr.push({
                        src: preImg[jk].src,
                        orgName: preImg[jk].orgName,
                    })
                }
                //console.log("after previous merge : ", progileImageArr);
            }
        }
        if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        //console.log("req body photos : ", req.body.property_photos);
        // let profileData = {
        //     cover_pic: progileImageArr
        // }
        var updateData = await Office_listing_sale.findByIdAndUpdate(req.query.id, req.body);
        //console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your listing updated successfully."
        });
    } catch (error) {
        //console.log("User Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoUpdateListingIndustrial = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    // //console.log("Photos : ", req.files);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (req.body.previous_images == '[]' && req.files == undefined) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    try {
        progileImageArr = [];
        if (req.body.previous_images != undefined) {
            if (req.body.previous_images != '[]') {
                //console.log("prevuois image : ", req.body.previous_images);
                var preImg = JSON.parse(req.body.previous_images);
                //console.log("pre image parse : ", preImg);
                //console.log("pre image parse trrrrrrrrr : ", preImg[0].orgName);
                for (let jk = 0; jk < preImg.length; jk++) {
                    progileImageArr.push({
                        src: preImg[jk].src,
                        orgName: preImg[jk].orgName,
                    })
                }
                //console.log("after previous merge : ", progileImageArr);
            }
        }
        if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        //console.log("req body photos : ", req.body.property_photos);
        // let profileData = {
        //     cover_pic: progileImageArr
        // }
        var updateData = await Industrial_listing_sale.findByIdAndUpdate(req.query.id, req.body);
        //console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your listing updated successfully."
        });
    } catch (error) {
        //console.log("User Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoUpdateListingRetail = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    // //console.log("Photos : ", req.files);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (req.body.previous_images == '[]' && req.files == undefined) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    try {
        progileImageArr = [];
        if (req.body.previous_images != undefined) {
            if (req.body.previous_images != '[]') {
                //console.log("prevuois image : ", req.body.previous_images);
                var preImg = JSON.parse(req.body.previous_images);
                //console.log("pre image parse : ", preImg);
                //console.log("pre image parse trrrrrrrrr : ", preImg[0].orgName);
                for (let jk = 0; jk < preImg.length; jk++) {
                    progileImageArr.push({
                        src: preImg[jk].src,
                        orgName: preImg[jk].orgName,
                    })
                }
                //console.log("after previous merge : ", progileImageArr);
            }
        }
        if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        //console.log("req body photos : ", req.body.property_photos);
        // let profileData = {
        //     cover_pic: progileImageArr
        // }
        var updateData = await Retail_listing_sale.findByIdAndUpdate(req.query.id, req.body);
        //console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your listing updated successfully."
        });
    } catch (error) {
        //console.log("User Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoUpdateListingRetaurant = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    // //console.log("Photos : ", req.files);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (req.body.previous_images == '[]' && req.files == undefined) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    try {
        progileImageArr = [];
        if (req.body.previous_images != undefined) {
            if (req.body.previous_images != '[]') {
                //console.log("prevuois image : ", req.body.previous_images);
                var preImg = JSON.parse(req.body.previous_images);
                //console.log("pre image parse : ", preImg);
                //console.log("pre image parse trrrrrrrrr : ", preImg[0].orgName);
                for (let jk = 0; jk < preImg.length; jk++) {
                    progileImageArr.push({
                        src: preImg[jk].src,
                        orgName: preImg[jk].orgName,
                    })
                }
                //console.log("after previous merge : ", progileImageArr);
            }
        }
        if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        //console.log("req body photos : ", req.body.property_photos);
        // let profileData = {
        //     cover_pic: progileImageArr
        // }
        var updateData = await restaurant_listing_sale.findByIdAndUpdate(req.query.id, req.body);
        //console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your listing updated successfully."
        });
    } catch (error) {
        //console.log("User Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoUpdateListingShopping = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    // //console.log("Photos : ", req.files);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (req.body.previous_images == '[]' && req.files == undefined) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    try {
        progileImageArr = [];
        if (req.body.previous_images != undefined) {
            if (req.body.previous_images != '[]') {
                //console.log("prevuois image : ", req.body.previous_images);
                var preImg = JSON.parse(req.body.previous_images);
                //console.log("pre image parse : ", preImg);
                //console.log("pre image parse trrrrrrrrr : ", preImg[0].orgName);
                for (let jk = 0; jk < preImg.length; jk++) {
                    progileImageArr.push({
                        src: preImg[jk].src,
                        orgName: preImg[jk].orgName,
                    })
                }
                //console.log("after previous merge : ", progileImageArr);
            }
        }
        if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        //console.log("req body photos : ", req.body.property_photos);
        // let profileData = {
        //     cover_pic: progileImageArr
        // }
        var updateData = await Shopping_listing_sale.findByIdAndUpdate(req.query.id, req.body);
        //console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your listing updated successfully."
        });
    } catch (error) {
        //console.log("User Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoUpdateListingMultifamily = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    // //console.log("Photos : ", req.files);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (req.body.previous_images == '[]' && req.files == undefined) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    try {
        progileImageArr = [];
        if (req.body.previous_images != undefined) {
            if (req.body.previous_images != '[]') {
                //console.log("prevuois image : ", req.body.previous_images);
                var preImg = JSON.parse(req.body.previous_images);
                //console.log("pre image parse : ", preImg);
                //console.log("pre image parse trrrrrrrrr : ", preImg[0].orgName);
                for (let jk = 0; jk < preImg.length; jk++) {
                    progileImageArr.push({
                        src: preImg[jk].src,
                        orgName: preImg[jk].orgName,
                    })
                }
                //console.log("after previous merge : ", progileImageArr);
            }
        }
        if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        //console.log("req body photos : ", req.body.property_photos);
        // let profileData = {
        //     cover_pic: progileImageArr
        // }
        var updateData = await Multifamily_listing_sale.findByIdAndUpdate(req.query.id, req.body);
        //console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your listing updated successfully."
        });
    } catch (error) {
        //console.log("User Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoUpdateListingSpecaility = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    // //console.log("Photos : ", req.files);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (req.body.previous_images == '[]' && req.files == undefined) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    try {
        progileImageArr = [];
        if (req.body.previous_images != undefined) {
            if (req.body.previous_images != '[]') {
                //console.log("prevuois image : ", req.body.previous_images);
                var preImg = JSON.parse(req.body.previous_images);
                //console.log("pre image parse : ", preImg);
                //console.log("pre image parse trrrrrrrrr : ", preImg[0].orgName);
                for (let jk = 0; jk < preImg.length; jk++) {
                    progileImageArr.push({
                        src: preImg[jk].src,
                        orgName: preImg[jk].orgName,
                    })
                }
                //console.log("after previous merge : ", progileImageArr);
            }
        }
        if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        //console.log("req body photos : ", req.body.property_photos);
        // let profileData = {
        //     cover_pic: progileImageArr
        // }
        var updateData = await Specaility_listing_sale.findByIdAndUpdate(req.query.id, req.body);
        //console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your listing updated successfully."
        });
    } catch (error) {
        //console.log("User Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoUpdateListingHospitility = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    // //console.log("Photos : ", req.files);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (req.body.previous_images == '[]' && req.files == undefined) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    try {
        progileImageArr = [];
        if (req.body.previous_images != undefined) {
            if (req.body.previous_images != '[]') {
                //console.log("prevuois image : ", req.body.previous_images);
                var preImg = JSON.parse(req.body.previous_images);
                //console.log("pre image parse : ", preImg);
                //console.log("pre image parse trrrrrrrrr : ", preImg[0].orgName);
                for (let jk = 0; jk < preImg.length; jk++) {
                    progileImageArr.push({
                        src: preImg[jk].src,
                        orgName: preImg[jk].orgName,
                    })
                }
                //console.log("after previous merge : ", progileImageArr);
            }
        }
        if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        //console.log("req body photos : ", req.body.property_photos);
        // let profileData = {
        //     cover_pic: progileImageArr
        // }
        var updateData = await Hospitality_listing_sale.findByIdAndUpdate(req.query.id, req.body);
        //console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your listing updated successfully."
        });
    } catch (error) {
        //console.log("User Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoUpdateListingHealthCare = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    // //console.log("Photos : ", req.files);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (req.body.previous_images == '[]' && req.files == undefined) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    try {
        progileImageArr = [];
        if (req.body.previous_images != undefined) {
            if (req.body.previous_images != '[]') {
                //console.log("prevuois image : ", req.body.previous_images);
                var preImg = JSON.parse(req.body.previous_images);
                //console.log("pre image parse : ", preImg);
                //console.log("pre image parse trrrrrrrrr : ", preImg[0].orgName);
                for (let jk = 0; jk < preImg.length; jk++) {
                    progileImageArr.push({
                        src: preImg[jk].src,
                        orgName: preImg[jk].orgName,
                    })
                }
                //console.log("after previous merge : ", progileImageArr);
            }
        }
        if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        //console.log("req body photos : ", req.body.property_photos);
        // let profileData = {
        //     cover_pic: progileImageArr
        // }
        var updateData = await Health_care_listing_sale.findByIdAndUpdate(req.query.id, req.body);
        //console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your listing updated successfully."
        });
    } catch (error) {
        //console.log("User Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoUpdateListingOSports = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    // //console.log("Photos : ", req.files);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (req.body.previous_images == '[]' && req.files == undefined) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    try {
        progileImageArr = [];
        if (req.body.previous_images != undefined) {
            if (req.body.previous_images != '[]') {
                //console.log("prevuois image : ", req.body.previous_images);
                var preImg = JSON.parse(req.body.previous_images);
                //console.log("pre image parse : ", preImg);
                //console.log("pre image parse trrrrrrrrr : ", preImg[0].orgName);
                for (let jk = 0; jk < preImg.length; jk++) {
                    progileImageArr.push({
                        src: preImg[jk].src,
                        orgName: preImg[jk].orgName,
                    })
                }
                //console.log("after previous merge : ", progileImageArr);
            }
        }
        if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        //console.log("req body photos : ", req.body.property_photos);
        // let profileData = {
        //     cover_pic: progileImageArr
        // }
        var updateData = await Sport_listing_sale.findByIdAndUpdate(req.query.id, req.body);
        //console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your listing updated successfully."
        });
    } catch (error) {
        //console.log("User Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoUpdateListingland = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    // //console.log("Photos : ", req.files);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (req.body.previous_images == '[]' && req.files == undefined) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    try {
        progileImageArr = [];
        if (req.body.previous_images != undefined) {
            if (req.body.previous_images != '[]') {
                //console.log("prevuois image : ", req.body.previous_images);
                var preImg = JSON.parse(req.body.previous_images);
                //console.log("pre image parse : ", preImg);
                //console.log("pre image parse trrrrrrrrr : ", preImg[0].orgName);
                for (let jk = 0; jk < preImg.length; jk++) {
                    progileImageArr.push({
                        src: preImg[jk].src,
                        orgName: preImg[jk].orgName,
                    })
                }
                //console.log("after previous merge : ", progileImageArr);
            }
        }
        if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        //console.log("req body photos : ", req.body.property_photos);
        // let profileData = {
        //     cover_pic: progileImageArr
        // }
        var updateData = await Land_listing_sale.findByIdAndUpdate(req.query.id, req.body);
        //console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your listing updated successfully."
        });
    } catch (error) {
        //console.log("User Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoUpdateListingResidential = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    // //console.log("Photos : ", req.files);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (req.body.previous_images == '[]' && req.files == undefined) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    try {
        progileImageArr = [];
        if (req.body.previous_images != undefined) {
            if (req.body.previous_images != '[]') {
                //console.log("prevuois image : ", req.body.previous_images);
                var preImg = JSON.parse(req.body.previous_images);
                //console.log("pre image parse : ", preImg);
                //console.log("pre image parse trrrrrrrrr : ", preImg[0].orgName);
                for (let jk = 0; jk < preImg.length; jk++) {
                    progileImageArr.push({
                        src: preImg[jk].src,
                        orgName: preImg[jk].orgName,
                    })
                }
                //console.log("after previous merge : ", progileImageArr);
            }
        }
        if (req.files != undefined) {
            req.files.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        //console.log("req body photos : ", req.body.property_photos);
        // let profileData = {
        //     cover_pic: progileImageArr
        // }
        var updateData = await Residential_listing_sale.findByIdAndUpdate(req.query.id, req.body);
        //console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your listing updated successfully."
        });
    } catch (error) {
        //console.log("User Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

// property type listing delete
exports.wePodeleteListingOffice = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please enter listing id"
            });
        }
        let upadteStatus = {
            status: 'Inactive'
        }
        var updateDate = await Office_listing_sale.findByIdAndUpdate(req.body.id, upadteStatus);
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in delete listing"
            });
        }
        return res.send({
            success: true,
            message: "Your listing deleted successfully.",
        });
    } catch (error) {
        //console.log("Error in delete post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePodeleteListingIndustrial = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please enter listing id"
            });
        }
        let upadteStatus = {
            status: 'Inactive'
        }
        var updateDate = await Industrial_listing_sale.findByIdAndUpdate(req.body.id, upadteStatus);
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in delete listing"
            });
        }
        return res.send({
            success: true,
            message: "Your listing deleted successfully.",
        });
    } catch (error) {
        //console.log("Error in delete post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePodeleteListingRetail = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please enter listing id"
            });
        }
        let upadteStatus = {
            status: 'Inactive'
        }
        var updateDate = await Retail_listing_sale.findByIdAndUpdate(req.body.id, upadteStatus);
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in delete listing"
            });
        }
        return res.send({
            success: true,
            message: "Your listing deleted successfully.",
        });
    } catch (error) {
        //console.log("Error in delete post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePodeleteListingRestaurant = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please enter listing id"
            });
        }
        let upadteStatus = {
            status: 'Inactive'
        }
        var updateDate = await restaurant_listing_sale.findByIdAndUpdate(req.body.id, upadteStatus);
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in delete listing"
            });
        }
        return res.send({
            success: true,
            message: "Your listing deleted successfully.",
        });
    } catch (error) {
        //console.log("Error in delete post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePodeleteListingShopping = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please enter listing id"
            });
        }
        let upadteStatus = {
            status: 'Inactive'
        }
        var updateDate = await Shopping_listing_sale.findByIdAndUpdate(req.body.id, upadteStatus);
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in delete listing"
            });
        }
        return res.send({
            success: true,
            message: "Your listing deleted successfully.",
        });
    } catch (error) {
        //console.log("Error in delete post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePodeleteListingMultifamily = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please enter listing id"
            });
        }
        let upadteStatus = {
            status: 'Inactive'
        }
        var updateDate = await Multifamily_listing_sale.findByIdAndUpdate(req.body.id, upadteStatus);
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in delete listing"
            });
        }
        return res.send({
            success: true,
            message: "Your listing deleted successfully.",
        });
    } catch (error) {
        //console.log("Error in delete post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePodeleteListingSpecaility = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please enter listing id"
            });
        }
        let upadteStatus = {
            status: 'Inactive'
        }
        var updateDate = await Specaility_listing_sale.findByIdAndUpdate(req.body.id, upadteStatus);
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in delete listing"
            });
        }
        return res.send({
            success: true,
            message: "Your listing deleted successfully.",
        });
    } catch (error) {
        //console.log("Error in delete post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePodeleteListingHospitility = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please enter listing id"
            });
        }
        let upadteStatus = {
            status: 'Inactive'
        }
        var updateDate = await Hospitality_listing_sale.findByIdAndUpdate(req.body.id, upadteStatus);
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in delete listing"
            });
        }
        return res.send({
            success: true,
            message: "Your listing deleted successfully.",
        });
    } catch (error) {
        //console.log("Error in delete post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePodeleteListingHealthCare = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please enter listing id"
            });
        }
        let upadteStatus = {
            status: 'Inactive'
        }
        var updateDate = await Health_care_listing_sale.findByIdAndUpdate(req.body.id, upadteStatus);
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in delete listing"
            });
        }
        return res.send({
            success: true,
            message: "Your listing deleted successfully.",
        });
    } catch (error) {
        //console.log("Error in delete post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePodeleteListingSports = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please enter listing id"
            });
        }
        let upadteStatus = {
            status: 'Inactive'
        }
        var updateDate = await sport_listing_sale.findByIdAndUpdate(req.body.id, upadteStatus);
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in delete listing"
            });
        }
        return res.send({
            success: true,
            message: "Your listing deleted successfully.",
        });
    } catch (error) {
        //console.log("Error in delete post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePodeleteListingLand = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please enter listing id"
            });
        }
        let upadteStatus = {
            status: 'Inactive'
        }
        var updateDate = await Land_listing_sale.findByIdAndUpdate(req.body.id, upadteStatus);
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in delete listing"
            });
        }
        return res.send({
            success: true,
            message: "Your listing deleted successfully.",
        });
    } catch (error) {
        //console.log("Error in delete post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePodeleteListingResidential = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please enter listing id"
            });
        }
        let upadteStatus = {
            status: 'Inactive'
        }
        var updateDate = await Residential_listing_sale.findByIdAndUpdate(req.body.id, upadteStatus);
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in delete listing"
            });
        }
        return res.send({
            success: true,
            message: "Your listing deleted successfully.",
        });
    } catch (error) {
        //console.log("Error in delete post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

// for find count user 25 listing condition
async function getUserTotalListingCount(getUserId) {
    let getDataRealCount = await Real_estate_sale.find({
        user_id: getUserId
    }).count();
    let getDataAircraftCount = await Aircraft_sale.find({
        user_id: getUserId
    }).count();
    let getDataYachtCount = await Yachts_sale.find({
        user_id: getUserId
    }).count();
    let getDataCrowdFundingCount = await CrowdFunding_sale.find({
        user_id: getUserId
    }).count();
    let getDataBusinessCount = await Business_sale.find({
        user_id: getUserId
    }).count();
    let getDataCarCount = await Cars_and_rv_sale.find({
        user_id: getUserId
    }).count();
    let getDataHorsesCount = await Horses_livestock.find({
        user_id: getUserId
    }).count();
    let getDataArtworkCount = await Artwork_sale.find({
        user_id: getUserId
    }).count();
    let getDataCryptoCount = await Crypto_asset.find({
        user_id: getUserId
    }).count();
    let getTotalUserListingCount = getDataRealCount + getDataAircraftCount + getDataYachtCount + getDataCrowdFundingCount + getDataBusinessCount +
        getDataCarCount + getDataHorsesCount + getDataArtworkCount + getDataCryptoCount;
    console.log("countttttttttttttttttttttt total listing of post : ", getTotalUserListingCount);
    console.log("countttttttttttttttttttttt total listing of post type: ", typeof (getTotalUserListingCount));
    return getTotalUserListingCount;
}

// real estate listing
exports.wePoListingRealEstate = async (req, res) => {
    console.log("body reqparams wepsoting real estate : ", req.body);
    //console.log("Photos : ", req.files);
    // if (!req.files.all_images) {
    //     return res.send({
    //         success: false,
    //         message: "Please select property picture."
    //     });
    // }
    if (!req.body.user_id || req.body.user_id == null || req.body.user_id == undefined || req.body.user_id == 'undefined') {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    if (!req.body.uploadImageThrughAPK && !req.files.all_images) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.body.uploadImageThrughAPK == '[]' && req.files.all_images == {}) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (!req.body.Tittle_Name || req.body.Tittle_Name == "") {
        return res.send({
            success: false,
            message: "Please enter title name."
        });
    }
    if (!req.body.property_type || req.body.property_type == "") {
        return res.send({
            success: false,
            message: "Please enter property type."
        });
    }
    if (!req.body.property_subtype || req.body.property_subtype == "") {
        return res.send({
            success: false,
            message: "Please select property sub-type."
        });
    }
    if (!req.body.purpose || req.body.purpose == "") {
        return res.send({
            success: false,
            message: "Please select purpose."
        });
    }
    if (!req.body.price || req.body.price == "") {
        return res.send({
            success: false,
            message: "Please enter price."
        });
    }
    if (!req.body.address_line1 || req.body.address_line1 == "") {
        return res.send({
            success: false,
            message: "Please enter address line 1."
        });
    }
    if (!req.body.country || req.body.country == "") {
        return res.send({
            success: false,
            message: "Please select country."
        });
    }
    if (!req.body.state || req.body.state == "") {
        return res.send({
            success: false,
            message: "Please select state."
        });
    }
    if (!req.body.city || req.body.city == "") {
        return res.send({
            success: false,
            message: "Please select city."
        });
    }
    if (!req.body.zipcode || req.body.zipcode == "") {
        return res.send({
            success: false,
            message: "Please enter zipcode."
        });
    }
    if (!req.body.created_by || req.body.created_by == "") {
        return res.send({
            success: false,
            message: "Please enter website name."
        });
    }
    if (!req.body.listing_show_on_wepo || req.body.listing_show_on_wepo == "") {
        return res.send({
            success: false,
            message: "Please enter this listing whether it will be shown on wepo or not."
        });
    }
    try {
        // for check is user of wepo or not
        if (req.body.created_by === 'WeCoOwn' && req.body.user_id != null) {
            if (req.body.listing_show_on_wepo === 'Yes') {
                let checkWePoMember = await User.findOne({
                    _id: req.body.user_id
                });
                if (checkWePoMember != null) {
                    for (let i = 0; i < checkWePoMember.role.length; i++) {
                        if (checkWePoMember.role[i] != '2') {
                            req.body.listing_show_on_wepo == 'No'
                        }
                    }
                } else {
                    req.body.listing_show_on_wepo == 'No'
                }
            }
        }
        var progileImageArr = [];
        if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined' && req.body.uploadImageThrughAPK != '[]') {
            let imageArr = JSON.parse(req.body.uploadImageThrughAPK);
            for (let i = 0; i < imageArr.length; i++) {
                progileImageArr.push({
                    src: imageArr[i].src,
                    orgName: imageArr[i].orgName,
                })
            }
        } else if (req.files.all_images != undefined) {
            req.files.all_images.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        //console.log("dddddd : ", req.body.property_photos);
        var getPdfFile = [];
        if (req.files.pdfFile != undefined) {
            req.files.pdfFile.forEach(element => {
                if (element.originalname.substring(element.originalname.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
                    return res.send({
                        success: false,
                        message: "Please select document in pdf format."
                    });
                } else {
                    getPdfFile.push({
                        src: 'uploads/' + element.filename,
                        orgName: element.originalname,
                    })
                }
            });
            req.body.pdf_doc = getPdfFile;
        }
        //console.log("tttttttttt : ", req.body.pdf_doc);
        // req.body.Nearby_Schools = [];
        let responseToUser = {};
        new Real_estate_sale(req.body).save(async function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                console.log("err : ", err);
                responseToUser = {
                    success: false,
                    message: "Error in property listing."
                };
                res.send(responseToUser);
            } else {
                // for find count user 25 listing condition                
                let getUserListingCount = await getUserTotalListingCount(req.body.user_id);
                if (25 > getUserListingCount) {
                    // update wcx reward token by add 2000      
                    let paymentForWcsToken = 0;
                    if (req.body.purpose === "No Ready") {
                        paymentForWcsToken = 2000;
                    } else {
                        paymentForWcsToken = 5000;
                    }
                    let updateWcxTokenIncrementBody = {
                        $inc: {
                            wcx_rewards_tokens: paymentForWcsToken
                        }
                    }
                    let updateWcxToeknData = await User.findByIdAndUpdate(req.body.user_id, updateWcxTokenIncrementBody);
                    //console.log("update data user: ", updateData)
                    if (!updateWcxToeknData) {
                        responseToUser = {
                            success: false,
                            message: "Error in property listing."
                        };
                        res.send(responseToUser);
                    }
                    // create new wcx history   
                    let dataForWcxToken = {
                        user_id: req.body.user_id,
                        date: Date.now(),
                        token_price: paymentForWcsToken,
                        event_name: 'Create listing'
                    }
                    new Wcx_rewards_tokens_history(dataForWcxToken).save(function (err, resultOfWcxToken) {
                        if (err) {
                            console.log("Error in create new wcx history  : ", err);
                            responseToUser = {
                                success: false,
                                message: "Error in property listing."
                            };
                        } else {
                            responseToUser = {
                                success: true,
                                message: "Your property list created successfully.",
                                Serial_Number: seeData.Serial_Number
                            }
                        }
                        res.send(responseToUser);
                    });
                } else {
                    responseToUser = {
                        success: true,
                        message: "Your property list created successfully.",
                        Serial_Number: seeData.Serial_Number
                    }
                    res.send(responseToUser);
                }
            }
        });
    } catch (error) {
        console.log("Error in posting in wepo : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoListingAircraft = async (req, res) => {
    //console.log("body reqparams we psoting: ", req.body);
    //console.log("Photos : ", req.files);
    // if (!req.files.all_images) {
    //     return res.send({
    //         success: false,
    //         message: "Please select property picture."
    //     });
    // }
    if (!req.body.user_id || req.body.user_id == null || req.body.user_id == undefined || req.body.user_id == 'undefined') {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    if (!req.body.uploadImageThrughAPK && !req.files.all_images) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.body.uploadImageThrughAPK == '[]' && req.files.all_images == {}) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (!req.body.Tittle_Name || req.body.Tittle_Name == "") {
        return res.send({
            success: false,
            message: "Please enter title name."
        });
    }
    if (!req.body.Aircraft_type || req.body.Aircraft_type == "") {
        return res.send({
            success: false,
            message: "Please select aircraft type."
        });
    }
    if (!req.body.Aircraft_subtype || req.body.Aircraft_subtype == "") {
        return res.send({
            success: false,
            message: "Please select aircraft sub-type."
        });
    }
    if (!req.body.purpose || req.body.purpose == "") {
        return res.send({
            success: false,
            message: "Please select purpose."
        });
    }
    if (!req.body.price || req.body.price == "") {
        return res.send({
            success: false,
            message: "Please enter price."
        });
    }
    if (!req.body.address_line1 || req.body.address_line1 == "") {
        return res.send({
            success: false,
            message: "Please enter address line 1."
        });
    }
    if (!req.body.country || req.body.country == "") {
        return res.send({
            success: false,
            message: "Please select country."
        });
    }
    if (!req.body.state || req.body.state == "") {
        return res.send({
            success: false,
            message: "Please select state."
        });
    }
    if (!req.body.city || req.body.city == "") {
        return res.send({
            success: false,
            message: "Please select city."
        });
    }
    if (!req.body.zipcode || req.body.zipcode == "") {
        return res.send({
            success: false,
            message: "Please enter zipcode."
        });
    }
    if (!req.body.created_by || req.body.created_by == "") {
        return res.send({
            success: false,
            message: "Please enter website name."
        });
    }
    if (!req.body.listing_show_on_wepo || req.body.listing_show_on_wepo == "") {
        return res.send({
            success: false,
            message: "Please enter this listing whether it will be shown on wepo or not."
        });
    }
    try {
        // for check is user of wepo or not
        if (req.body.created_by === 'WeCoOwn' && req.body.user_id != null) {
            if (req.body.listing_show_on_wepo === 'Yes') {
                let checkWePoMember = await User.findOne({
                    _id: req.body.user_id
                });
                if (checkWePoMember != null) {
                    for (let i = 0; i < checkWePoMember.role.length; i++) {
                        if (checkWePoMember.role[i] != '2') {
                            req.body.listing_show_on_wepo == 'No'
                        }
                    }
                } else {
                    req.body.listing_show_on_wepo == 'No'
                }
            }
        }
        var progileImageArr = [];
        if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined' && req.body.uploadImageThrughAPK != '[]') {
            let imageArr = JSON.parse(req.body.uploadImageThrughAPK);
            for (let i = 0; i < imageArr.length; i++) {
                progileImageArr.push({
                    src: imageArr[i].src,
                    orgName: imageArr[i].orgName,
                })
            }
        } else if (req.files.all_images != undefined) {
            req.files.all_images.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        var getPdfFile = [];
        if (req.files.pdfFile != undefined) {
            req.files.pdfFile.forEach(element => {
                if (element.originalname.substring(element.originalname.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
                    return res.send({
                        success: false,
                        message: "Please select document in pdf format."
                    });
                } else {
                    getPdfFile.push({
                        src: 'uploads/' + element.filename,
                        orgName: element.originalname,
                    })
                }
            });
            req.body.pdf_doc = getPdfFile;
        }
        let responseToUser = {};
        new Aircraft_sale(req.body).save(async function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                console.log("ERROR : ", err);
                responseToUser = {
                    success: false,
                    message: "Error in property listing."
                };
                res.send(responseToUser);
            } else {
                // for find count user 25 listing condition                
                let getUserListingCount = await getUserTotalListingCount(req.body.user_id);
                if (25 > getUserListingCount) {
                    // update wcx reward token by add 2000      
                    let paymentForWcsToken = 0;
                    if (req.body.purpose === "No Ready") {
                        paymentForWcsToken = 2000;
                    } else {
                        paymentForWcsToken = 5000;
                    }
                    let updateWcxTokenIncrementBody = {
                        $inc: {
                            wcx_rewards_tokens: paymentForWcsToken
                        }
                    }
                    let updateWcxToeknData = await User.findByIdAndUpdate(req.body.user_id, updateWcxTokenIncrementBody);
                    //console.log("update data user: ", updateData)
                    if (!updateWcxToeknData) {
                        responseToUser = {
                            success: false,
                            message: "Error in property listing."
                        };
                        res.send(responseToUser);
                    }
                    // create new wcx history   
                    let dataForWcxToken = {
                        user_id: req.body.user_id,
                        date: Date.now(),
                        token_price: paymentForWcsToken,
                        event_name: 'Create listing'
                    }
                    new Wcx_rewards_tokens_history(dataForWcxToken).save(function (err, resultOfWcxToken) {
                        //console.log("Error in create new wcx history  : ", err);
                        if (err) {
                            responseToUser = {
                                success: false,
                                message: "Error in property listing."
                            };
                        } else {
                            responseToUser = {
                                success: true,
                                message: "Your property list created successfully.",
                                Serial_Number: seeData.Serial_Number
                            }
                        }
                        res.send(responseToUser);
                    });
                } else {
                    responseToUser = {
                        success: true,
                        message: "Your property list created successfully.",
                        Serial_Number: seeData.Serial_Number
                    }
                    res.send(responseToUser);
                }
            }
        });
    } catch (error) {
        console.log("Error in posting in wepo : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoListingCrowdFunding = async (req, res) => {
    //console.log("body reqparams we psoting: ", req.body);
    //console.log("Photos : ", req.files);
    // if (!req.files.all_images) {
    //     return res.send({
    //         success: false,
    //         message: "Please select property picture."
    //     });
    // }
    if (!req.body.user_id || req.body.user_id == null || req.body.user_id == undefined || req.body.user_id == 'undefined') {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    if (!req.body.uploadImageThrughAPK && !req.files.all_images) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.body.uploadImageThrughAPK == '[]' && req.files.all_images == {}) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (!req.body.Tittle_Name || req.body.Tittle_Name == "") {
        return res.send({
            success: false,
            message: "Please enter title name."
        });
    }
    if (!req.body.CrowdFunding_type || req.body.CrowdFunding_type == "") {
        return res.send({
            success: false,
            message: "Please select crowdfunding type."
        });
    }
    if (!req.body.CrowdFunding_subtype || req.body.CrowdFunding_subtype == "") {
        return res.send({
            success: false,
            message: "Please select crowdfunding sub-type."
        });
    }
    if (!req.body.purpose || req.body.purpose == "") {
        return res.send({
            success: false,
            message: "Please select purpose."
        });
    }
    if (!req.body.price || req.body.price == "") {
        return res.send({
            success: false,
            message: "Please enter price."
        });
    }
    if (!req.body.address_line1 || req.body.address_line1 == "") {
        return res.send({
            success: false,
            message: "Please enter address line 1."
        });
    }
    if (!req.body.country || req.body.country == "") {
        return res.send({
            success: false,
            message: "Please select country."
        });
    }
    if (!req.body.state || req.body.state == "") {
        return res.send({
            success: false,
            message: "Please select state."
        });
    }
    if (!req.body.city || req.body.city == "") {
        return res.send({
            success: false,
            message: "Please select city."
        });
    }
    if (!req.body.zipcode || req.body.zipcode == "") {
        return res.send({
            success: false,
            message: "Please enter zipcode."
        });
    }
    if (!req.body.created_by || req.body.created_by == "") {
        return res.send({
            success: false,
            message: "Please enter website name."
        });
    }
    if (!req.body.listing_show_on_wepo || req.body.listing_show_on_wepo == "") {
        return res.send({
            success: false,
            message: "Please enter this listing whether it will be shown on wepo or not."
        });
    }
    try {
        // for check is user of wepo or not
        if (req.body.created_by === 'WeCoOwn' && req.body.user_id != null) {
            if (req.body.listing_show_on_wepo === 'Yes') {
                let checkWePoMember = await User.findOne({
                    _id: req.body.user_id
                });
                if (checkWePoMember != null) {
                    for (let i = 0; i < checkWePoMember.role.length; i++) {
                        if (checkWePoMember.role[i] != '2') {
                            req.body.listing_show_on_wepo == 'No'
                        }
                    }
                } else {
                    req.body.listing_show_on_wepo == 'No'
                }
            }
        }
        var progileImageArr = [];
        if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined' && req.body.uploadImageThrughAPK != '[]') {
            let imageArr = JSON.parse(req.body.uploadImageThrughAPK);
            for (let i = 0; i < imageArr.length; i++) {
                progileImageArr.push({
                    src: imageArr[i].src,
                    orgName: imageArr[i].orgName,
                })
            }
        } else if (req.files.all_images != undefined) {
            req.files.all_images.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        var getPdfFile = [];
        if (req.files.pdfFile != undefined) {
            req.files.pdfFile.forEach(element => {
                if (element.originalname.substring(element.originalname.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
                    return res.send({
                        success: false,
                        message: "Please select document in pdf format."
                    });
                } else {
                    getPdfFile.push({
                        src: 'uploads/' + element.filename,
                        orgName: element.originalname,
                    })
                }
            });
            req.body.pdf_doc = getPdfFile;
        }
        let responseToUser = {};
        new CrowdFunding_sale(req.body).save(async function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                console.log("ERROR : ", err);
                responseToUser = {
                    success: false,
                    message: "Error in property listing."
                };
                res.send(responseToUser);
            } else {
                // for find count user 25 listing condition                
                let getUserListingCount = await getUserTotalListingCount(req.body.user_id);
                if (25 > getUserListingCount) {
                    // update wcx reward token by add 2000       
                    let paymentForWcsToken = 0;
                    if (req.body.purpose === "No Ready") {
                        paymentForWcsToken = 2000;
                    } else {
                        paymentForWcsToken = 5000;
                    }
                    let updateWcxTokenIncrementBody = {
                        $inc: {
                            wcx_rewards_tokens: paymentForWcsToken
                        }
                    }
                    let updateWcxToeknData = await User.findByIdAndUpdate(req.body.user_id, updateWcxTokenIncrementBody);
                    //console.log("update data user: ", updateData)
                    if (!updateWcxToeknData) {
                        responseToUser = {
                            success: false,
                            message: "Error in property listing."
                        };
                        res.send(responseToUser);
                    }
                    // create new wcx history   
                    let dataForWcxToken = {
                        user_id: req.body.user_id,
                        date: Date.now(),
                        token_price: paymentForWcsToken,
                        event_name: 'Create listing'
                    }
                    new Wcx_rewards_tokens_history(dataForWcxToken).save(function (err, resultOfWcxToken) {
                        //console.log("Error in create new wcx history  : ", err);
                        if (err) {
                            responseToUser = {
                                success: false,
                                message: "Error in property listing."
                            };
                        } else {
                            responseToUser = {
                                success: true,
                                message: "Your property list created successfully.",
                                Serial_Number: seeData.Serial_Number
                            }
                        }
                        res.send(responseToUser);
                    });
                } else {
                    responseToUser = {
                        success: true,
                        message: "Your property list created successfully.",
                        Serial_Number: seeData.Serial_Number
                    }
                    res.send(responseToUser);
                }
            }
        });
    } catch (error) {
        console.log("Error in posting in wepo : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoListingBusiness = async (req, res) => {
    //console.log("body reqparams we psoting: ", req.body);
    //console.log("Photos : ", req.files);
    // if (!req.files.all_images) {
    //     return res.send({
    //         success: false,
    //         message: "Please select property picture."
    //     });
    // }
    if (!req.body.user_id || req.body.user_id == null || req.body.user_id == undefined || req.body.user_id == 'undefined') {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    if (!req.body.uploadImageThrughAPK && !req.files.all_images) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.body.uploadImageThrughAPK == '[]' && req.files.all_images == {}) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (!req.body.Tittle_Name || req.body.Tittle_Name == "") {
        return res.send({
            success: false,
            message: "Please enter title name."
        });
    }
    if (!req.body.Business_type || req.body.Business_type == "") {
        return res.send({
            success: false,
            message: "Please select business type."
        });
    }
    if (!req.body.Business_subtype || req.body.Business_subtype == "") {
        return res.send({
            success: false,
            message: "Please select business sub-type."
        });
    }
    if (!req.body.purpose || req.body.purpose == "") {
        return res.send({
            success: false,
            message: "Please select purpose."
        });
    }
    if (!req.body.price || req.body.price == "") {
        return res.send({
            success: false,
            message: "Please enter price."
        });
    }
    if (!req.body.address_line1 || req.body.address_line1 == "") {
        return res.send({
            success: false,
            message: "Please enter address line 1."
        });
    }
    if (!req.body.country || req.body.country == "") {
        return res.send({
            success: false,
            message: "Please select country."
        });
    }
    if (!req.body.state || req.body.state == "") {
        return res.send({
            success: false,
            message: "Please select state."
        });
    }
    if (!req.body.city || req.body.city == "") {
        return res.send({
            success: false,
            message: "Please select city."
        });
    }
    if (!req.body.zipcode || req.body.zipcode == "") {
        return res.send({
            success: false,
            message: "Please enter zipcode."
        });
    }
    if (!req.body.created_by || req.body.created_by == "") {
        return res.send({
            success: false,
            message: "Please enter website name."
        });
    }
    if (!req.body.listing_show_on_wepo || req.body.listing_show_on_wepo == "") {
        return res.send({
            success: false,
            message: "Please enter this listing whether it will be shown on wepo or not."
        });
    }
    try {
        // for check is user of wepo or not
        if (req.body.created_by === 'WeCoOwn' && req.body.user_id != null) {
            if (req.body.listing_show_on_wepo === 'Yes') {
                let checkWePoMember = await User.findOne({
                    _id: req.body.user_id
                });
                if (checkWePoMember != null) {
                    for (let i = 0; i < checkWePoMember.role.length; i++) {
                        if (checkWePoMember.role[i] != '2') {
                            req.body.listing_show_on_wepo == 'No'
                        }
                    }
                } else {
                    req.body.listing_show_on_wepo == 'No'
                }
            }
        }
        var progileImageArr = [];
        if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined' && req.body.uploadImageThrughAPK != '[]') {
            let imageArr = JSON.parse(req.body.uploadImageThrughAPK);
            for (let i = 0; i < imageArr.length; i++) {
                progileImageArr.push({
                    src: imageArr[i].src,
                    orgName: imageArr[i].orgName,
                })
            }
        } else if (req.files.all_images != undefined) {
            req.files.all_images.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        let getPdfFile = [];
        if (req.files.pdfFile != undefined) {
            req.files.pdfFile.forEach(element => {
                if (element.originalname.substring(element.originalname.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
                    return res.send({
                        success: false,
                        message: "Please select document in pdf format."
                    });
                } else {
                    getPdfFile.push({
                        src: 'uploads/' + element.filename,
                        orgName: element.originalname,
                    })
                }
            });
            req.body.pdf_doc = getPdfFile;
        }
        let getSaleFlayerPdfFile = [];
        if (req.files.sale_flyer_pdfFile != undefined) {
            req.files.sale_flyer_pdfFile.forEach(element => {
                if (element.originalname.substring(element.originalname.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
                    return res.send({
                        success: false,
                        message: "Please select sale flayer document in pdf format."
                    });
                } else {
                    getSaleFlayerPdfFile.push({
                        src: 'uploads/' + element.filename,
                        orgName: element.originalname,
                    })
                }
            });
            req.body.Sale_Flyer = getSaleFlayerPdfFile;
        }
        let responseToUser = {};
        new Business_sale(req.body).save(async function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                console.log("ERROR : ", err);
                responseToUser = {
                    success: false,
                    message: "Error in property listing."
                };
                res.send(responseToUser);
            } else {
                // for find count user 25 listing condition                
                let getUserListingCount = await getUserTotalListingCount(req.body.user_id);
                if (25 > getUserListingCount) {
                    // update wcx reward token by add 2000           
                    let paymentForWcsToken = 0;
                    if (req.body.purpose === "No Ready") {
                        paymentForWcsToken = 2000;
                    } else {
                        paymentForWcsToken = 5000;
                    }
                    let updateWcxTokenIncrementBody = {
                        $inc: {
                            wcx_rewards_tokens: paymentForWcsToken
                        }
                    }
                    let updateWcxToeknData = await User.findByIdAndUpdate(req.body.user_id, updateWcxTokenIncrementBody);
                    //console.log("update data user: ", updateData)
                    if (!updateWcxToeknData) {
                        responseToUser = {
                            success: false,
                            message: "Error in property listing."
                        };
                        res.send(responseToUser);
                    }
                    // create new wcx history   
                    let dataForWcxToken = {
                        user_id: req.body.user_id,
                        date: Date.now(),
                        token_price: paymentForWcsToken,
                        event_name: 'Create listing'
                    }
                    new Wcx_rewards_tokens_history(dataForWcxToken).save(function (err, resultOfWcxToken) {
                        //console.log("Error in create new wcx history  : ", err);
                        if (err) {
                            responseToUser = {
                                success: false,
                                message: "Error in property listing."
                            };
                        } else {
                            responseToUser = {
                                success: true,
                                message: "Your property list created successfully.",
                                Serial_Number: seeData.Serial_Number
                            }
                        }
                        res.send(responseToUser);
                    });
                } else {
                    responseToUser = {
                        success: true,
                        message: "Your property list created successfully.",
                        Serial_Number: seeData.Serial_Number
                    }
                    res.send(responseToUser);
                }
            }
        });
    } catch (error) {
        console.log("Error in posting in wepo : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoListingArtwork = async (req, res) => {
    //console.log("body reqparams we psoting: ", req.body);
    //console.log("Photos : ", req.files);
    // if (!req.files.all_images) {
    //     return res.send({
    //         success: false,
    //         message: "Please select property picture."
    //     });
    // }
    if (!req.body.user_id || req.body.user_id == null || req.body.user_id == undefined || req.body.user_id == 'undefined') {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    if (!req.body.uploadImageThrughAPK && !req.files.all_images) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.body.uploadImageThrughAPK == '[]' && req.files.all_images == {}) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (!req.body.Tittle_Name || req.body.Tittle_Name == "") {
        return res.send({
            success: false,
            message: "Please enter title name."
        });
    }
    if (!req.body.Artwork_type || req.body.Artwork_type == "") {
        return res.send({
            success: false,
            message: "Please select artwork type."
        });
    }
    if (!req.body.Artwork_subtype || req.body.Artwork_subtype == "") {
        return res.send({
            success: false,
            message: "Please select artwork sub-type."
        });
    }
    if (!req.body.purpose || req.body.purpose == "") {
        return res.send({
            success: false,
            message: "Please select purpose."
        });
    }
    if (!req.body.price || req.body.price == "") {
        return res.send({
            success: false,
            message: "Please enter price."
        });
    }
    if (!req.body.address_line1 || req.body.address_line1 == "") {
        return res.send({
            success: false,
            message: "Please enter address line 1."
        });
    }
    if (!req.body.country || req.body.country == "") {
        return res.send({
            success: false,
            message: "Please select country."
        });
    }
    if (!req.body.state || req.body.state == "") {
        return res.send({
            success: false,
            message: "Please select state."
        });
    }
    if (!req.body.city || req.body.city == "") {
        return res.send({
            success: false,
            message: "Please select city."
        });
    }
    if (!req.body.zipcode || req.body.zipcode == "") {
        return res.send({
            success: false,
            message: "Please enter zipcode."
        });
    }
    if (!req.body.created_by || req.body.created_by == "") {
        return res.send({
            success: false,
            message: "Please enter website name."
        });
    }
    if (!req.body.listing_show_on_wepo || req.body.listing_show_on_wepo == "") {
        return res.send({
            success: false,
            message: "Please enter this listing whether it will be shown on wepo or not."
        });
    }
    try {
        // for check is user of wepo or not
        if (req.body.created_by === 'WeCoOwn' && req.body.user_id != null) {
            if (req.body.listing_show_on_wepo === 'Yes') {
                let checkWePoMember = await User.findOne({
                    _id: req.body.user_id
                });
                if (checkWePoMember != null) {
                    for (let i = 0; i < checkWePoMember.role.length; i++) {
                        if (checkWePoMember.role[i] != '2') {
                            req.body.listing_show_on_wepo == 'No'
                        }
                    }
                } else {
                    req.body.listing_show_on_wepo == 'No'
                }
            }
        }
        var progileImageArr = [];
        if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined' && req.body.uploadImageThrughAPK != '[]') {
            let imageArr = JSON.parse(req.body.uploadImageThrughAPK);
            for (let i = 0; i < imageArr.length; i++) {
                progileImageArr.push({
                    src: imageArr[i].src,
                    orgName: imageArr[i].orgName,
                })
            }
        } else if (req.files.all_images != undefined) {
            req.files.all_images.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        var getPdfFile = [];
        if (req.files.pdfFile != undefined) {
            req.files.pdfFile.forEach(element => {
                if (element.originalname.substring(element.originalname.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
                    return res.send({
                        success: false,
                        message: "Please select document in pdf format."
                    });
                } else {
                    getPdfFile.push({
                        src: 'uploads/' + element.filename,
                        orgName: element.originalname,
                    })
                }
            });
            req.body.pdf_doc = getPdfFile;
        }
        let responseToUser = {};
        new Artwork_sale(req.body).save(async function (err, seeData) {
            //console.log("seeData : ", seeData);
            //console.log("err : ", err);
            if (err) {
                console.log("ERROR : ", err);
                responseToUser = {
                    success: false,
                    message: "Error in property listing."
                };
                res.send(responseToUser);
            } else {
                // for find count user 25 listing condition                
                let getUserListingCount = await getUserTotalListingCount(req.body.user_id);
                if (25 > getUserListingCount) {
                    // update wcx reward token by add 2000     
                    let paymentForWcsToken = 0;
                    if (req.body.purpose === "No Ready") {
                        paymentForWcsToken = 2000;
                    } else {
                        paymentForWcsToken = 5000;
                    }
                    let updateWcxTokenIncrementBody = {
                        $inc: {
                            wcx_rewards_tokens: paymentForWcsToken
                        }
                    }
                    let updateWcxToeknData = await User.findByIdAndUpdate(req.body.user_id, updateWcxTokenIncrementBody);
                    //console.log("update data user: ", updateData)
                    if (!updateWcxToeknData) {
                        responseToUser = {
                            success: false,
                            message: "Error in property listing."
                        };
                        res.send(responseToUser);
                    }
                    // create new wcx history   
                    let dataForWcxToken = {
                        user_id: req.body.user_id,
                        date: Date.now(),
                        token_price: paymentForWcsToken,
                        event_name: 'Create listing'
                    }
                    new Wcx_rewards_tokens_history(dataForWcxToken).save(function (err, resultOfWcxToken) {
                        //console.log("Error in create new wcx history  : ", err);
                        if (err) {
                            responseToUser = {
                                success: false,
                                message: "Error in property listing."
                            };
                        } else {
                            responseToUser = {
                                success: true,
                                message: "Your property list created successfully.",
                                Serial_Number: seeData.Serial_Number
                            }
                        }
                        res.send(responseToUser);
                    });
                } else {
                    responseToUser = {
                        success: true,
                        message: "Your property list created successfully.",
                        Serial_Number: seeData.Serial_Number
                    }
                    res.send(responseToUser);
                }
            }
        });
    } catch (error) {
        console.log("Error in create artwork posting in wepo : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};
exports.wePoListingYachts = async (req, res) => {
    //console.log("body reqparams we psoting: ", req.body);
    //console.log("Photos : ", req.files);
    // if (!req.files.all_images) {
    //     return res.send({
    //         success: false,
    //         message: "Please select property picture."
    //     });
    // }
    if (!req.body.user_id || req.body.user_id == null || req.body.user_id == undefined || req.body.user_id == 'undefined') {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    if (!req.body.uploadImageThrughAPK && !req.files.all_images) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.body.uploadImageThrughAPK == '[]' && req.files.all_images == {}) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (!req.body.Tittle_Name || req.body.Tittle_Name == "") {
        return res.send({
            success: false,
            message: "Please enter title name."
        });
    }
    if (!req.body.yachts_type || req.body.yachts_type == "") {
        return res.send({
            success: false,
            message: "Please enter yachts & ships type."
        });
    }
    if (!req.body.yachts_subtype || req.body.yachts_subtype == "") {
        return res.send({
            success: false,
            message: "Please select yachts & ships sub-type."
        });
    }
    if (!req.body.purpose || req.body.purpose == "") {
        return res.send({
            success: false,
            message: "Please select purpose."
        });
    }
    if (!req.body.price || req.body.price == "") {
        return res.send({
            success: false,
            message: "Please enter price."
        });
    }
    if (!req.body.address_line1 || req.body.address_line1 == "") {
        return res.send({
            success: false,
            message: "Please enter address line 1."
        });
    }
    if (!req.body.country || req.body.country == "") {
        return res.send({
            success: false,
            message: "Please select country."
        });
    }
    if (!req.body.state || req.body.state == "") {
        return res.send({
            success: false,
            message: "Please select state."
        });
    }
    if (!req.body.city || req.body.city == "") {
        return res.send({
            success: false,
            message: "Please select city."
        });
    }
    if (!req.body.zipcode || req.body.zipcode == "") {
        return res.send({
            success: false,
            message: "Please enter zipcode."
        });
    }
    if (!req.body.created_by || req.body.created_by == "") {
        return res.send({
            success: false,
            message: "Please enter website name."
        });
    }
    if (!req.body.listing_show_on_wepo || req.body.listing_show_on_wepo == "") {
        return res.send({
            success: false,
            message: "Please enter this listing whether it will be shown on wepo or not."
        });
    }
    try {
        // for check is user of wepo or not
        if (req.body.created_by === 'WeCoOwn' && req.body.user_id != null) {
            if (req.body.listing_show_on_wepo === 'Yes') {
                let checkWePoMember = await User.findOne({
                    _id: req.body.user_id
                });
                if (checkWePoMember != null) {
                    for (let i = 0; i < checkWePoMember.role.length; i++) {
                        if (checkWePoMember.role[i] != '2') {
                            req.body.listing_show_on_wepo == 'No'
                        }
                    }
                } else {
                    req.body.listing_show_on_wepo == 'No'
                }
            }
        }
        var progileImageArr = [];
        if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined' && req.body.uploadImageThrughAPK != '[]') {
            let imageArr = JSON.parse(req.body.uploadImageThrughAPK);
            for (let i = 0; i < imageArr.length; i++) {
                progileImageArr.push({
                    src: imageArr[i].src,
                    orgName: imageArr[i].orgName,
                })
            }
        } else if (req.files.all_images != undefined) {
            req.files.all_images.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        var getPdfFile = [];
        if (req.files.pdfFile != undefined) {
            req.files.pdfFile.forEach(element => {
                if (element.originalname.substring(element.originalname.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
                    return res.send({
                        success: false,
                        message: "Please select document in pdf format."
                    });
                } else {
                    getPdfFile.push({
                        src: 'uploads/' + element.filename,
                        orgName: element.originalname,
                    })
                }
            });
            req.body.pdf_doc = getPdfFile;
        }
        let responseToUser = {};
        new Yachts_sale(req.body).save(async function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                console.log("ERROR : ", err);
                responseToUser = {
                    success: false,
                    message: "Error in property listing."
                };
                res.send(responseToUser);
            } else {
                // for find count user 25 listing condition                
                let getUserListingCount = await getUserTotalListingCount(req.body.user_id);
                if (25 > getUserListingCount) {
                    // update wcx reward token by add 2000        
                    let paymentForWcsToken = 0;
                    if (req.body.purpose === "No Ready") {
                        paymentForWcsToken = 2000;
                    } else {
                        paymentForWcsToken = 5000;
                    }
                    let updateWcxTokenIncrementBody = {
                        $inc: {
                            wcx_rewards_tokens: paymentForWcsToken
                        }
                    }
                    let updateWcxToeknData = await User.findByIdAndUpdate(req.body.user_id, updateWcxTokenIncrementBody);
                    //console.log("update data user: ", updateData)
                    if (!updateWcxToeknData) {
                        responseToUser = {
                            success: false,
                            message: "Error in property listing."
                        };
                        res.send(responseToUser);
                    }
                    // create new wcx history   
                    let dataForWcxToken = {
                        user_id: req.body.user_id,
                        date: Date.now(),
                        token_price: paymentForWcsToken,
                        event_name: 'Create listing'
                    }
                    new Wcx_rewards_tokens_history(dataForWcxToken).save(function (err, resultOfWcxToken) {
                        //console.log("Error in create new wcx history  : ", err);
                        if (err) {
                            responseToUser = {
                                success: false,
                                message: "Error in property listing."
                            };
                        } else {
                            responseToUser = {
                                success: true,
                                message: "Your property list created successfully.",
                                Serial_Number: seeData.Serial_Number
                            }
                        }
                        res.send(responseToUser);
                    });
                } else {
                    responseToUser = {
                        success: true,
                        message: "Your property list created successfully.",
                        Serial_Number: seeData.Serial_Number
                    }
                    res.send(responseToUser);
                }
            }
        });
    } catch (error) {
        console.log("Error in posting in wepo : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoUpdateListingRealEstate = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    // //console.log("body reqparams user profile: ", req.body);
    ////console.log("Photossssssssssssssssssssssssss : ", req.files);
    // //console.log("Photossssssssssssssssssssssssss typeof: ", typeof(req.files));
    // //console.log("Photossssssssssssssssssssssssss typeof: ", req.files.length);
    // //console.log("Photossssssssssssssssssssssssss req.body.previous_images : ", req.body.previous_images);
    // //console.log("Photossssssssssssssssssssssssss req.body.previous_images : ", typeof(req.body.previous_images));
    //console.log("req.body.uploadImageThrughAPK : ", req.body.uploadImageThrughAPK);
    //console.log("req.files.all_images : ", req.files.all_images);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    // if (req.body.previous_images == '[]' && req.files.all_images.length == 0) {
    //     return res.send({
    //         success: false,
    //         message: "Please select property picture."
    //     });
    // }
    if (!req.body.previous_images && !req.files.all_images && !req.body.uploadImageThrughAPK) {
        //console.log("in 1st if");
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined') {
        if (req.body.previous_images == '[]' && req.body.uploadImageThrughAPK == '[]') {
            //console.log("in else if");
            return res.send({
                success: false,
                message: "Please select property picture."
            });
        }
    } else if (req.body.previous_images == '[]' && req.files.all_images == undefined) {
        //console.log("in 2nd if");
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (!req.body.Tittle_Name || req.body.Tittle_Name == "") {
        return res.send({
            success: false,
            message: "Please enter title name."
        });
    }
    if (!req.body.property_type || req.body.property_type == "") {
        return res.send({
            success: false,
            message: "Please enter property type."
        });
    }
    if (!req.body.property_subtype || req.body.property_subtype == "") {
        return res.send({
            success: false,
            message: "Please select property sub-type."
        });
    }
    if (!req.body.purpose || req.body.purpose == "") {
        return res.send({
            success: false,
            message: "Please select purpose."
        });
    }
    if (!req.body.price || req.body.price == "") {
        return res.send({
            success: false,
            message: "Please enter price."
        });
    }
    if (!req.body.address_line1 || req.body.address_line1 == "") {
        return res.send({
            success: false,
            message: "Please enter address line 1."
        });
    }
    if (!req.body.country || req.body.country == "") {
        return res.send({
            success: false,
            message: "Please select country."
        });
    }
    if (!req.body.state || req.body.state == "") {
        return res.send({
            success: false,
            message: "Please select state."
        });
    }
    if (!req.body.city || req.body.city == "") {
        return res.send({
            success: false,
            message: "Please select city."
        });
    }
    if (!req.body.zipcode || req.body.zipcode == "") {
        return res.send({
            success: false,
            message: "Please enter zipcode."
        });
    }
    try {
        progileImageArr = [];
        if (req.body.previous_images != undefined) {
            if (req.body.previous_images != '[]') {
                //console.log("prevuois image : ", req.body.previous_images);
                var preImg = JSON.parse(req.body.previous_images);
                //console.log("pre image parse : ", preImg);
                //console.log("pre image parse trrrrrrrrr : ", preImg[0].orgName);
                for (let jk = 0; jk < preImg.length; jk++) {
                    progileImageArr.push({
                        src: preImg[jk].src,
                        orgName: preImg[jk].orgName,
                    })
                }
                //console.log("after previous merge : ", progileImageArr);
            }
        }
        if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined' && req.body.uploadImageThrughAPK != '[]') {
            let imageArr = JSON.parse(req.body.uploadImageThrughAPK);
            for (let i = 0; i < imageArr.length; i++) {
                progileImageArr.push({
                    src: imageArr[i].src,
                    orgName: imageArr[i].orgName,
                })
            }
        } else if (req.files.all_images != undefined) {
            req.files.all_images.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        var getPdfFile = [];
        //console.log("previous pdf file : ", req.body.previous_pdf_file);
        if (req.files.pdfFile != undefined) {
            req.files.pdfFile.forEach(element => {
                if (element.originalname.substring(element.originalname.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
                    return res.send({
                        success: false,
                        message: "Please select document in pdf format."
                    });
                } else {
                    getPdfFile.push({
                        src: 'uploads/' + element.filename,
                        orgName: element.originalname,
                    })
                }
            });
            req.body.pdf_doc = getPdfFile;
            //console.log("profile_pic pic coverImageArr", progileImageArr);
            //console.log("profile_pic pic ", req.body.profile_pic);
        } else if (req.body.previous_pdf_file == '[]') {
            ////console.log("In eqal condition :",);
            req.body.pdf_doc = [];
        } else if (req.body.previous_pdf_file != '[]') {
            ////console.log("In not eqal condition :");
            delete req.body.pdf_doc;
        }

        //console.log("req body photos : ", req.body.property_photos);
        // let profileData = {
        //     cover_pic: progileImageArr
        // }
        var updateData = await Real_estate_sale.findByIdAndUpdate(req.query.id, req.body);
        console.log("update data listing: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your listing updated successfully."
        });
    } catch (error) {
        console.log("listing updated Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoUpdateListingYachts = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    // //console.log("body reqparams user profile: ", req.body);
    // //console.log("Photos : ", req.files);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (!req.body.previous_images && !req.files.all_images && !req.body.uploadImageThrughAPK) {
        //console.log("in 1st if");
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined') {
        if (req.body.previous_images == '[]' && req.body.uploadImageThrughAPK == '[]') {
            //console.log("in else if");
            return res.send({
                success: false,
                message: "Please select property picture."
            });
        }
    } else if (req.body.previous_images == '[]' && req.files.all_images == undefined) {
        //console.log("in 2nd if");
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (!req.body.Tittle_Name || req.body.Tittle_Name == "") {
        return res.send({
            success: false,
            message: "Please enter title name."
        });
    }
    if (!req.body.yachts_type || req.body.yachts_type == "") {
        return res.send({
            success: false,
            message: "Please enter yachts & ships type."
        });
    }
    if (!req.body.yachts_subtype || req.body.yachts_subtype == "") {
        return res.send({
            success: false,
            message: "Please select yachts & ships sub-type."
        });
    }
    if (!req.body.purpose || req.body.purpose == "") {
        return res.send({
            success: false,
            message: "Please select purpose."
        });
    }
    if (!req.body.price || req.body.price == "") {
        return res.send({
            success: false,
            message: "Please enter price."
        });
    }
    if (!req.body.address_line1 || req.body.address_line1 == "") {
        return res.send({
            success: false,
            message: "Please enter address line 1."
        });
    }
    if (!req.body.country || req.body.country == "") {
        return res.send({
            success: false,
            message: "Please select country."
        });
    }
    if (!req.body.state || req.body.state == "") {
        return res.send({
            success: false,
            message: "Please select state."
        });
    }
    if (!req.body.city || req.body.city == "") {
        return res.send({
            success: false,
            message: "Please select city."
        });
    }
    if (!req.body.zipcode || req.body.zipcode == "") {
        return res.send({
            success: false,
            message: "Please enter zipcode."
        });
    }
    try {
        progileImageArr = [];
        if (req.body.previous_images != undefined) {
            if (req.body.previous_images != '[]') {
                //console.log("prevuois image : ", req.body.previous_images);
                var preImg = JSON.parse(req.body.previous_images);
                //console.log("pre image parse : ", preImg);
                //console.log("pre image parse trrrrrrrrr : ", preImg[0].orgName);
                for (let jk = 0; jk < preImg.length; jk++) {
                    progileImageArr.push({
                        src: preImg[jk].src,
                        orgName: preImg[jk].orgName,
                    })
                }
                //console.log("after previous merge : ", progileImageArr);
            }
        }
        if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined' && req.body.uploadImageThrughAPK != '[]') {
            let imageArr = JSON.parse(req.body.uploadImageThrughAPK);
            for (let i = 0; i < imageArr.length; i++) {
                progileImageArr.push({
                    src: imageArr[i].src,
                    orgName: imageArr[i].orgName,
                })
            }
        } else if (req.files.all_images != undefined) {
            req.files.all_images.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        var getPdfFile = [];
        //console.log("previous pdf file : ", req.body.previous_pdf_file);
        if (req.files.pdfFile != undefined) {
            req.files.pdfFile.forEach(element => {
                if (element.originalname.substring(element.originalname.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
                    return res.send({
                        success: false,
                        message: "Please select document in pdf format."
                    });
                } else {
                    getPdfFile.push({
                        src: 'uploads/' + element.filename,
                        orgName: element.originalname,
                    })
                }
            });
            req.body.pdf_doc = getPdfFile;
            //console.log("profile_pic pic coverImageArr", progileImageArr);
            //console.log("profile_pic pic ", req.body.profile_pic);
        } else if (req.body.previous_pdf_file == '[]') {
            ////console.log("In eqal condition :",);
            req.body.pdf_doc = [];
        } else if (req.body.previous_pdf_file != '[]') {
            ////console.log("In not eqal condition :");
            delete req.body.pdf_doc;
        }
        //console.log("req body photos : ", req.body.property_photos);
        // let profileData = {
        //     cover_pic: progileImageArr
        // }
        var updateData = await Yachts_sale.findByIdAndUpdate(req.query.id, req.body);
        console.log("update listing user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your listing updated successfully."
        });
    } catch (error) {
        console.log("User listing Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoUpdateListingAircraft = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    // //console.log("body reqparams user profile: ", req.body);
    // //console.log("Photos : ", req.files);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (!req.body.previous_images && !req.files.all_images && !req.body.uploadImageThrughAPK) {
        //console.log("in 1st if");
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined') {
        if (req.body.previous_images == '[]' && req.body.uploadImageThrughAPK == '[]') {
            //console.log("in else if");
            return res.send({
                success: false,
                message: "Please select property picture."
            });
        }
    } else if (req.body.previous_images == '[]' && req.files.all_images == undefined) {
        //console.log("in 2nd if");
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (!req.body.Tittle_Name || req.body.Tittle_Name == "") {
        return res.send({
            success: false,
            message: "Please enter title name."
        });
    }
    if (!req.body.Aircraft_type || req.body.Aircraft_type == "") {
        return res.send({
            success: false,
            message: "Please select aircraft type."
        });
    }
    if (!req.body.Aircraft_subtype || req.body.Aircraft_subtype == "") {
        return res.send({
            success: false,
            message: "Please select aircraft sub-type."
        });
    }
    if (!req.body.purpose || req.body.purpose == "") {
        return res.send({
            success: false,
            message: "Please select purpose."
        });
    }
    if (!req.body.price || req.body.price == "") {
        return res.send({
            success: false,
            message: "Please enter price."
        });
    }
    if (!req.body.address_line1 || req.body.address_line1 == "") {
        return res.send({
            success: false,
            message: "Please enter address line 1."
        });
    }
    if (!req.body.country || req.body.country == "") {
        return res.send({
            success: false,
            message: "Please select country."
        });
    }
    if (!req.body.state || req.body.state == "") {
        return res.send({
            success: false,
            message: "Please select state."
        });
    }
    if (!req.body.city || req.body.city == "") {
        return res.send({
            success: false,
            message: "Please select city."
        });
    }
    if (!req.body.zipcode || req.body.zipcode == "") {
        return res.send({
            success: false,
            message: "Please enter zipcode."
        });
    }
    try {
        progileImageArr = [];
        if (req.body.previous_images != undefined) {
            if (req.body.previous_images != '[]') {
                //console.log("prevuois image : ", req.body.previous_images);
                var preImg = JSON.parse(req.body.previous_images);
                //console.log("pre image parse : ", preImg);
                //console.log("pre image parse trrrrrrrrr : ", preImg[0].orgName);
                for (let jk = 0; jk < preImg.length; jk++) {
                    progileImageArr.push({
                        src: preImg[jk].src,
                        orgName: preImg[jk].orgName,
                    })
                }
                //console.log("after previous merge : ", progileImageArr);
            }
        }
        if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined' && req.body.uploadImageThrughAPK != '[]') {
            let imageArr = JSON.parse(req.body.uploadImageThrughAPK);
            for (let i = 0; i < imageArr.length; i++) {
                progileImageArr.push({
                    src: imageArr[i].src,
                    orgName: imageArr[i].orgName,
                })
            }
        } else if (req.files.all_images != undefined) {
            req.files.all_images.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        var getPdfFile = [];
        //console.log("previous pdf file : ", req.body.previous_pdf_file);
        if (req.files.pdfFile != undefined) {
            req.files.pdfFile.forEach(element => {
                if (element.originalname.substring(element.originalname.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
                    return res.send({
                        success: false,
                        message: "Please select document in pdf format."
                    });
                } else {
                    getPdfFile.push({
                        src: 'uploads/' + element.filename,
                        orgName: element.originalname,
                    })
                }
            });
            req.body.pdf_doc = getPdfFile;
            //console.log("profile_pic pic coverImageArr", progileImageArr);
            //console.log("profile_pic pic ", req.body.profile_pic);
        } else if (req.body.previous_pdf_file == '[]') {
            ////console.log("In eqal condition :",);
            req.body.pdf_doc = [];
        } else if (req.body.previous_pdf_file != '[]') {
            ////console.log("In not eqal condition :");
            delete req.body.pdf_doc;
        }
        //console.log("req body photos : ", req.body.property_photos);
        // let profileData = {
        //     cover_pic: progileImageArr
        // }
        var updateData = await Aircraft_sale.findByIdAndUpdate(req.query.id, req.body);
        console.log("update listing user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your listing updated successfully."
        });
    } catch (error) {
        console.log("User listing Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoUpdateListingCrowdFunding = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    // //console.log("body reqparams user profile: ", req.body);
    // //console.log("Photos : ", req.files);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (!req.body.previous_images && !req.files.all_images && !req.body.uploadImageThrughAPK) {
        //console.log("in 1st if");
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined') {
        if (req.body.previous_images == '[]' && req.body.uploadImageThrughAPK == '[]') {
            //console.log("in else if");
            return res.send({
                success: false,
                message: "Please select property picture."
            });
        }
    } else if (req.body.previous_images == '[]' && req.files.all_images == undefined) {
        //console.log("in 2nd if");
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (!req.body.Tittle_Name || req.body.Tittle_Name == "") {
        return res.send({
            success: false,
            message: "Please enter title name."
        });
    }
    if (!req.body.CrowdFunding_type || req.body.CrowdFunding_type == "") {
        return res.send({
            success: false,
            message: "Please select crowdfunding type."
        });
    }
    if (!req.body.CrowdFunding_subtype || req.body.CrowdFunding_subtype == "") {
        return res.send({
            success: false,
            message: "Please select crowdfunding sub-type."
        });
    }
    if (!req.body.purpose || req.body.purpose == "") {
        return res.send({
            success: false,
            message: "Please select purpose."
        });
    }
    if (!req.body.price || req.body.price == "") {
        return res.send({
            success: false,
            message: "Please enter price."
        });
    }
    if (!req.body.address_line1 || req.body.address_line1 == "") {
        return res.send({
            success: false,
            message: "Please enter address line 1."
        });
    }
    if (!req.body.country || req.body.country == "") {
        return res.send({
            success: false,
            message: "Please select country."
        });
    }
    if (!req.body.state || req.body.state == "") {
        return res.send({
            success: false,
            message: "Please select state."
        });
    }
    if (!req.body.city || req.body.city == "") {
        return res.send({
            success: false,
            message: "Please select city."
        });
    }
    if (!req.body.zipcode || req.body.zipcode == "") {
        return res.send({
            success: false,
            message: "Please enter zipcode."
        });
    }
    try {
        progileImageArr = [];
        if (req.body.previous_images != undefined) {
            if (req.body.previous_images != '[]') {
                //console.log("prevuois image : ", req.body.previous_images);
                var preImg = JSON.parse(req.body.previous_images);
                //console.log("pre image parse : ", preImg);
                //console.log("pre image parse trrrrrrrrr : ", preImg[0].orgName);
                for (let jk = 0; jk < preImg.length; jk++) {
                    progileImageArr.push({
                        src: preImg[jk].src,
                        orgName: preImg[jk].orgName,
                    })
                }
                //console.log("after previous merge : ", progileImageArr);
            }
        }
        if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined' && req.body.uploadImageThrughAPK != '[]') {
            let imageArr = JSON.parse(req.body.uploadImageThrughAPK);
            for (let i = 0; i < imageArr.length; i++) {
                progileImageArr.push({
                    src: imageArr[i].src,
                    orgName: imageArr[i].orgName,
                })
            }
        } else if (req.files.all_images != undefined) {
            req.files.all_images.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        var getPdfFile = [];
        //console.log("previous pdf file : ", req.body.previous_pdf_file);
        if (req.files.pdfFile != undefined) {
            req.files.pdfFile.forEach(element => {
                if (element.originalname.substring(element.originalname.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
                    return res.send({
                        success: false,
                        message: "Please select document in pdf format."
                    });
                } else {
                    getPdfFile.push({
                        src: 'uploads/' + element.filename,
                        orgName: element.originalname,
                    })
                }
            });
            req.body.pdf_doc = getPdfFile;
            //console.log("profile_pic pic coverImageArr", progileImageArr);
            //console.log("profile_pic pic ", req.body.profile_pic);
        } else if (req.body.previous_pdf_file == '[]') {
            ////console.log("In eqal condition :",);
            req.body.pdf_doc = [];
        } else if (req.body.previous_pdf_file != '[]') {
            ////console.log("In not eqal condition :");
            delete req.body.pdf_doc;
        }
        //console.log("req body photos : ", req.body.property_photos);
        // let profileData = {
        //     cover_pic: progileImageArr
        // }
        var updateData = await CrowdFunding_sale.findByIdAndUpdate(req.query.id, req.body);
        console.log("update listing user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your listing updated successfully."
        });
    } catch (error) {
        console.log("User listing Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoUpdateListingBusiness = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    // //console.log("body reqparams user profile: ", req.body);
    // //console.log("Photos : ", req.files);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (!req.body.previous_images && !req.files.all_images && !req.body.uploadImageThrughAPK) {
        //console.log("in 1st if");
        return res.send({
            success: false,
            message: "Please select business picture."
        });
    }
    if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined') {
        if (req.body.previous_images == '[]' && req.body.uploadImageThrughAPK == '[]') {
            //console.log("in else if");
            return res.send({
                success: false,
                message: "Please select business picture."
            });
        }
    } else if (req.body.previous_images == '[]' && req.files.all_images == undefined) {
        //console.log("in 2nd if");
        return res.send({
            success: false,
            message: "Please select business picture."
        });
    }
    if (!req.body.Tittle_Name || req.body.Tittle_Name == "") {
        return res.send({
            success: false,
            message: "Please enter title name."
        });
    }
    if (!req.body.Business_type || req.body.Business_type == "") {
        return res.send({
            success: false,
            message: "Please select business type."
        });
    }
    if (!req.body.Business_subtype || req.body.Business_subtype == "") {
        return res.send({
            success: false,
            message: "Please select business sub-type."
        });
    }
    if (!req.body.purpose || req.body.purpose == "") {
        return res.send({
            success: false,
            message: "Please select purpose."
        });
    }
    if (!req.body.price || req.body.price == "") {
        return res.send({
            success: false,
            message: "Please enter price."
        });
    }
    if (!req.body.address_line1 || req.body.address_line1 == "") {
        return res.send({
            success: false,
            message: "Please enter address line 1."
        });
    }
    if (!req.body.country || req.body.country == "") {
        return res.send({
            success: false,
            message: "Please select country."
        });
    }
    if (!req.body.state || req.body.state == "") {
        return res.send({
            success: false,
            message: "Please select state."
        });
    }
    if (!req.body.city || req.body.city == "") {
        return res.send({
            success: false,
            message: "Please select city."
        });
    }
    if (!req.body.zipcode || req.body.zipcode == "") {
        return res.send({
            success: false,
            message: "Please enter zipcode."
        });
    }
    try {
        progileImageArr = [];
        if (req.body.previous_images != undefined) {
            if (req.body.previous_images != '[]') {
                //console.log("prevuois image : ", req.body.previous_images);
                var preImg = JSON.parse(req.body.previous_images);
                //console.log("pre image parse : ", preImg);
                //console.log("pre image parse trrrrrrrrr : ", preImg[0].orgName);
                for (let jk = 0; jk < preImg.length; jk++) {
                    progileImageArr.push({
                        src: preImg[jk].src,
                        orgName: preImg[jk].orgName,
                    })
                }
                //console.log("after previous merge : ", progileImageArr);
            }
        }
        if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined' && req.body.uploadImageThrughAPK != '[]') {
            let imageArr = JSON.parse(req.body.uploadImageThrughAPK);
            for (let i = 0; i < imageArr.length; i++) {
                progileImageArr.push({
                    src: imageArr[i].src,
                    orgName: imageArr[i].orgName,
                })
            }
        } else if (req.files.all_images != undefined) {
            req.files.all_images.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        var getPdfFile = [];
        //console.log("previous pdf file : ", req.body.previous_pdf_file);
        if (req.files.pdfFile != undefined) {
            req.files.pdfFile.forEach(element => {
                if (element.originalname.substring(element.originalname.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
                    return res.send({
                        success: false,
                        message: "Please select document in pdf format."
                    });
                } else {
                    getPdfFile.push({
                        src: 'uploads/' + element.filename,
                        orgName: element.originalname,
                    })
                }
            });
            req.body.pdf_doc = getPdfFile;
            //console.log("profile_pic pic coverImageArr", progileImageArr);
            //console.log("profile_pic pic ", req.body.profile_pic);
        } else if (req.body.previous_pdf_file == '[]') {
            ////console.log("In eqal condition :",);
            req.body.pdf_doc = [];
        } else if (req.body.previous_pdf_file != '[]') {
            ////console.log("In not eqal condition :");
            delete req.body.pdf_doc;
        }
        // for check previous sale flayer pdf file
        var getSaleFlayerPdfFile = [];
        if (req.files.sale_flyer_pdfFile != undefined) {
            req.files.sale_flyer_pdfFile.forEach(element => {
                if (element.originalname.substring(element.originalname.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
                    return res.send({
                        success: false,
                        message: "Please select sale flyer document in pdf format."
                    });
                } else {
                    getSaleFlayerPdfFile.push({
                        src: 'uploads/' + element.filename,
                        orgName: element.originalname,
                    })
                }
            });
            req.body.Sale_Flyer = getSaleFlayerPdfFile;
        } else if (req.body.previous_sale_flyer_pdf_file == '[]') {
            req.body.Sale_Flyer = [];
        } else if (req.body.previous_sale_flyer_pdf_file != '[]') {
            delete req.body.Sale_Flyer;
        }
        //console.log("req body photos : ", req.body.property_photos);
        // let profileData = {
        //     cover_pic: progileImageArr
        // }
        var updateData = await Business_sale.findByIdAndUpdate(req.query.id, req.body);
        console.log("update listing user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your listing updated successfully."
        });
    } catch (error) {
        console.log("User listing Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoUpdateListingArtwork = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    // //console.log("body reqparams user profile: ", req.body);
    // //console.log("Photos : ", req.files);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (!req.body.previous_images && !req.files.all_images && !req.body.uploadImageThrughAPK) {
        //console.log("in 1st if");
        return res.send({
            success: false,
            message: "Please select artwork picture."
        });
    }
    if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined') {
        if (req.body.previous_images == '[]' && req.body.uploadImageThrughAPK == '[]') {
            //console.log("in else if");
            return res.send({
                success: false,
                message: "Please select artwork picture."
            });
        }
    } else if (req.body.previous_images == '[]' && req.files.all_images == undefined) {
        //console.log("in 2nd if");
        return res.send({
            success: false,
            message: "Please select artwork picture."
        });
    }
    if (!req.body.Tittle_Name || req.body.Tittle_Name == "") {
        return res.send({
            success: false,
            message: "Please enter title name."
        });
    }
    if (!req.body.Artwork_type || req.body.Artwork_type == "") {
        return res.send({
            success: false,
            message: "Please select artwork type."
        });
    }
    if (!req.body.Artwork_subtype || req.body.Artwork_subtype == "") {
        return res.send({
            success: false,
            message: "Please select artwork sub-type."
        });
    }
    if (!req.body.purpose || req.body.purpose == "") {
        return res.send({
            success: false,
            message: "Please select purpose."
        });
    }
    if (!req.body.price || req.body.price == "") {
        return res.send({
            success: false,
            message: "Please enter price."
        });
    }
    if (!req.body.address_line1 || req.body.address_line1 == "") {
        return res.send({
            success: false,
            message: "Please enter address line 1."
        });
    }
    if (!req.body.country || req.body.country == "") {
        return res.send({
            success: false,
            message: "Please select country."
        });
    }
    if (!req.body.state || req.body.state == "") {
        return res.send({
            success: false,
            message: "Please select state."
        });
    }
    if (!req.body.city || req.body.city == "") {
        return res.send({
            success: false,
            message: "Please select city."
        });
    }
    if (!req.body.zipcode || req.body.zipcode == "") {
        return res.send({
            success: false,
            message: "Please enter zipcode."
        });
    }
    try {
        progileImageArr = [];
        if (req.body.previous_images != undefined) {
            if (req.body.previous_images != '[]') {
                //console.log("prevuois image : ", req.body.previous_images);
                var preImg = JSON.parse(req.body.previous_images);
                //console.log("pre image parse : ", preImg);
                //console.log("pre image parse trrrrrrrrr : ", preImg[0].orgName);
                for (let jk = 0; jk < preImg.length; jk++) {
                    progileImageArr.push({
                        src: preImg[jk].src,
                        orgName: preImg[jk].orgName,
                    })
                }
                //console.log("after previous merge : ", progileImageArr);
            }
        }
        if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined' && req.body.uploadImageThrughAPK != '[]') {
            let imageArr = JSON.parse(req.body.uploadImageThrughAPK);
            for (let i = 0; i < imageArr.length; i++) {
                progileImageArr.push({
                    src: imageArr[i].src,
                    orgName: imageArr[i].orgName,
                })
            }
        } else if (req.files.all_images != undefined) {
            req.files.all_images.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        var getPdfFile = [];
        //console.log("previous pdf file : ", req.body.previous_pdf_file);
        if (req.files.pdfFile != undefined) {
            req.files.pdfFile.forEach(element => {
                if (element.originalname.substring(element.originalname.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
                    return res.send({
                        success: false,
                        message: "Please select document in pdf format."
                    });
                } else {
                    getPdfFile.push({
                        src: 'uploads/' + element.filename,
                        orgName: element.originalname,
                    })
                }
            });
            req.body.pdf_doc = getPdfFile;
            //console.log("profile_pic pic coverImageArr", progileImageArr);
            //console.log("profile_pic pic ", req.body.profile_pic);
        } else if (req.body.previous_pdf_file == '[]') {
            ////console.log("In eqal condition :",);
            req.body.pdf_doc = [];
        } else if (req.body.previous_pdf_file != '[]') {
            ////console.log("In not eqal condition :");
            delete req.body.pdf_doc;
        }
        //console.log("req body photos : ", req.body.property_photos);
        // let profileData = {
        //     cover_pic: progileImageArr
        // }
        var updateData = await Artwork_sale.findByIdAndUpdate(req.query.id, req.body);
        console.log("update listing user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: "Error in update crowdfunding listing"
            });
        }
        return res.send({
            success: true,
            message: "Your listing updated successfully."
        });
    } catch (error) {
        console.log("User crowdfunding update Profile Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoUpdateListingCarsRv = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    // //console.log("body reqparams user profile: ", req.body);
    // //console.log("Photos : ", req.files);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (!req.body.previous_images && !req.files.all_images && !req.body.uploadImageThrughAPK) {
        //console.log("in 1st if");
        return res.send({
            success: false,
            message: "Please select car picture."
        });
    }
    if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined') {
        if (req.body.previous_images == '[]' && req.body.uploadImageThrughAPK == '[]') {
            //console.log("in else if");
            return res.send({
                success: false,
                message: "Please select car picture."
            });
        }
    } else if (req.body.previous_images == '[]' && req.files.all_images == undefined) {
        //console.log("in 2nd if");
        return res.send({
            success: false,
            message: "Please select car picture."
        });
    }
    if (!req.body.Tittle_Name || req.body.Tittle_Name == "") {
        return res.send({
            success: false,
            message: "Please enter title name."
        });
    }
    if (!req.body.Cars_Rv_type || req.body.Cars_Rv_type == "") {
        return res.send({
            success: false,
            message: "Please select car type."
        });
    }
    if (!req.body.Cars_Rv_subtype || req.body.Cars_Rv_subtype == "") {
        return res.send({
            success: false,
            message: "Please select car sub-type."
        });
    }
    if (!req.body.purpose || req.body.purpose == "") {
        return res.send({
            success: false,
            message: "Please select purpose."
        });
    }
    if (!req.body.price || req.body.price == "") {
        return res.send({
            success: false,
            message: "Please enter price."
        });
    }
    if (!req.body.address_line1 || req.body.address_line1 == "") {
        return res.send({
            success: false,
            message: "Please enter address line 1."
        });
    }
    if (!req.body.country || req.body.country == "") {
        return res.send({
            success: false,
            message: "Please select country."
        });
    }
    if (!req.body.state || req.body.state == "") {
        return res.send({
            success: false,
            message: "Please select state."
        });
    }
    if (!req.body.city || req.body.city == "") {
        return res.send({
            success: false,
            message: "Please select city."
        });
    }
    if (!req.body.zipcode || req.body.zipcode == "") {
        return res.send({
            success: false,
            message: "Please enter zipcode."
        });
    }
    try {
        progileImageArr = [];
        if (req.body.previous_images != undefined) {
            if (req.body.previous_images != '[]') {
                //console.log("prevuois image : ", req.body.previous_images);
                var preImg = JSON.parse(req.body.previous_images);
                //console.log("pre image parse : ", preImg);
                //console.log("pre image parse trrrrrrrrr : ", preImg[0].orgName);
                for (let jk = 0; jk < preImg.length; jk++) {
                    progileImageArr.push({
                        src: preImg[jk].src,
                        orgName: preImg[jk].orgName,
                    })
                }
                //console.log("after previous merge : ", progileImageArr);
            }
        }
        if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined' && req.body.uploadImageThrughAPK != '[]') {
            let imageArr = JSON.parse(req.body.uploadImageThrughAPK);
            for (let i = 0; i < imageArr.length; i++) {
                progileImageArr.push({
                    src: imageArr[i].src,
                    orgName: imageArr[i].orgName,
                })
            }
        } else if (req.files.all_images != undefined) {
            req.files.all_images.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        var getPdfFile = [];
        //console.log("previous pdf file : ", req.body.previous_pdf_file);
        if (req.files.pdfFile != undefined) {
            req.files.pdfFile.forEach(element => {
                if (element.originalname.substring(element.originalname.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
                    return res.send({
                        success: false,
                        message: "Please select document in pdf format."
                    });
                } else {
                    getPdfFile.push({
                        src: 'uploads/' + element.filename,
                        orgName: element.originalname,
                    })
                }
            });
            req.body.pdf_doc = getPdfFile;
            //console.log("profile_pic pic coverImageArr", progileImageArr);
            //console.log("profile_pic pic ", req.body.profile_pic);
        } else if (req.body.previous_pdf_file == '[]') {
            ////console.log("In eqal condition :",);
            req.body.pdf_doc = [];
        } else if (req.body.previous_pdf_file != '[]') {
            ////console.log("In not eqal condition :");
            delete req.body.pdf_doc;
        }
        //console.log("req body photos : ", req.body.property_photos);
        // let profileData = {
        //     cover_pic: progileImageArr
        // }
        var updateData = await Cars_and_rv_sale.findByIdAndUpdate(req.query.id, req.body);
        console.log("update listing user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your listing updated successfully."
        });
    } catch (error) {
        console.log("User listing Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoUpdateSoldOutListing = async (req, res) => {
    //console.log("in put sold out wepo listing : ", req.query.id);
    //console.log("body reqparams user profile: ", req.body);
    // //console.log("Photos : ", req.files);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (!req.body.property_type) {
        return res.send({
            success: false,
            message: "Please enter property type."
        });
    }
    if (req.body.Sold_out == undefined) {
        return res.send({
            success: false,
            message: "Please select sold out as true or false."
        });
    }
    if (req.body.Sold_out == true) {
        if (req.body.selling_price == "") {
            return res.send({
                success: false,
                message: "Please enter selling price."
            });
        }
    }
    try {
        let profileData = {
            Sold_out: req.body.Sold_out,
            selling_price: req.body.selling_price,
            selling_date: req.body.selling_date
        }
        if (req.body.property_type === 'Real Estate') {
            updateData = await Real_estate_sale.findByIdAndUpdate(req.query.id, profileData);
        } else if (req.body.property_type === 'Yachts & Ships') {
            updateData = await Yachts_sale.findByIdAndUpdate(req.query.id, profileData);
        } else if (req.body.property_type === 'Jets & Aircraft') {
            updateData = await Aircraft_sale.findByIdAndUpdate(req.query.id, profileData);
        } else if (req.body.property_type === 'Crowdfunding Projects') {
            updateData = await CrowdFunding_sale.findByIdAndUpdate(req.query.id, profileData);
        } else {
            return res.send({
                success: false,
                message: "Please enter property type."
            });
        }
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your listing updated successfully."
        });
        // if (req.body.property_type === 'Real Estate') {
        //     Real_estate_sale.findOneAndUpdate({
        //         _id: req.query.id
        //     }, {
        //         $set: profileData
        //     }, {
        //         new: true
        //     }, (err, doc) => {
        //         if (err) {
        //            //console.log("Error in sold out update in real estate listing", err);
        //             return res.send({
        //                 success: false,
        //                 error: err,
        //                 message: "Error in sold out update in real estate listing"
        //             });
        //         }
        //     });
        // } else if (req.body.property_type === 'Yachts & Ships') { 
        //     yachts_sale.findOneAndUpdate({
        //     _id: req.query.id
        // }, {
        //     $set: profileData
        // }, {
        //     new: true
        // }, (err, doc) => {
        //     if (err) {
        //        //console.log("Error in sold out update in yachts listing", err);
        //         return res.send({
        //             success: false,
        //             error: err,
        //             message: "Error in sold out update in yachts listing"
        //         });
        //     }
        // });
        // } else if (req.body.property_type === 'Jets & Aircraft') {
        //     Aircraft_sale.findOneAndUpdate({
        //         _id: req.query.id
        //     }, {
        //         $set: profileData
        //     }, {
        //         new: true
        //     }, (err, doc) => {
        //         if (err) {
        //            //console.log("Error in sold out update in aircraft listing", err);
        //             return res.send({
        //                 success: false,
        //                 error: err,
        //                 message: "Error in sold out update in aircraft listing"
        //             });
        //         }
        //     });
        // } else if (req.body.property_type === 'Crowdfunding Projects') {
        //     CrowdFunding_sale.findOneAndUpdate({
        //         _id: req.query.id
        //     }, {
        //         $set: profileData
        //     }, {
        //         new: true
        //     }, (err, doc) => {
        //         if (err) {
        //            //console.log("Error in sold out update in crowddunding listing", err);
        //             return res.send({
        //                 success: false,
        //                 error: err,
        //                 message: "Error in sold out update in crowddunding listing"
        //             });
        //         }
        //     });
        // }
    } catch (error) {
        //console.log("Error in sold out update in listing.", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePodeleteListingRealEstate = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please enter listing id"
            });
        }
        let upadteStatus = {
            status: 'Inactive'
        }
        var updateDate = await Real_estate_sale.findByIdAndUpdate(req.body.id, upadteStatus);
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in delete listing"
            });
        }
        return res.send({
            success: true,
            message: "Your listing deleted successfully.",
        });
    } catch (error) {
        //console.log("Error in delete post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePodeleteListingAircraft = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please enter listing id"
            });
        }
        let upadteStatus = {
            status: 'Inactive'
        }
        var updateDate = await Aircraft_sale.findByIdAndUpdate(req.body.id, upadteStatus);
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in delete listing"
            });
        }
        return res.send({
            success: true,
            message: "Your listing deleted successfully.",
        });
    } catch (error) {
        //console.log("Error in delete post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePodeleteListingYachts = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please enter listing id"
            });
        }
        let upadteStatus = {
            status: 'Inactive'
        }
        var updateDate = await Yachts_sale.findByIdAndUpdate(req.body.id, upadteStatus);
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in delete listing"
            });
        }
        return res.send({
            success: true,
            message: "Your listing deleted successfully.",
        });
    } catch (error) {
        //console.log("Error in delete post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePodeleteListingCrowdFunding = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please enter listing id"
            });
        }
        let upadteStatus = {
            status: 'Inactive'
        }
        var updateDate = await CrowdFunding_sale.findByIdAndUpdate(req.body.id, upadteStatus);
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in delete listing"
            });
        }
        return res.send({
            success: true,
            message: "Your listing deleted successfully.",
        });
    } catch (error) {
        //console.log("Error in delete post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePogetRealEsateCount = async (req, res) => {
    try {
        var updateDate = await Real_estate_sale.find({}).count();
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in get count"
            });
        }
        return res.send({
            success: true,
            message: "count for all real estate post successfully.",
            count: updateDate
        });
    } catch (error) {
        //console.log("Error in et for all real estate post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePogetAircraftCount = async (req, res) => {
    try {
        var updateDate = await Aircraft_sale.find({}).count();
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in get count"
            });
        }
        return res.send({
            success: true,
            message: "Count for all aircraft sale post successfully.",
            count: updateDate
        });
    } catch (error) {
        //console.log("Error in et for all Aircraft_sale post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePogetYachtsCount = async (req, res) => {
    try {
        var updateDate = await Yachts_sale.find({}).count();
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in get count"
            });
        }
        return res.send({
            success: true,
            message: "Count for all yachts sale post successfully.",
            count: updateDate
        });
    } catch (error) {
        //console.log("Error in et for all Yachts_sale post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePogetCrowdFundingCount = async (req, res) => {
    try {
        var updateDate = await CrowdFunding_sale.find({}).count();
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in get count"
            });
        }
        return res.send({
            success: true,
            message: "Count for all crowdfunding sale post successfully.",
            count: updateDate
        });
    } catch (error) {
        //console.log("Error in et for all CrowdFunding_sale post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoSerachForAllSaleAndLease = async (req, res) => {
    try {
        //console.log("search for category specific : ", req.body);
        var keyword = req.body.keyword;
        var purpose = req.body.purpose;
        var property = req.body.property_type;
        var subproperty = req.body.property_subtype;
        var countryName = req.body.country;
        var stateName = req.body.state;
        var cityName = req.body.city;
        var getData = [];
        let condition = {
            $and: []
        }
        if (keyword == '' && purpose == '' && property == '' && countryName == '' && stateName == '' && cityName == '') {
            condition['$and'].push({
                status: 'Active'
            })
        }
        // required conditions
        condition['$and'].push({
            status: 'Active'
        })
        /**filter by purpose */
        if (purpose != '') {
            if (purpose === 'Both') {
                condition['$and'].push({
                    purpose: {
                        $in: ['For Sale', 'For Lease', "Both"]
                    },
                })
            } else {
                condition['$and'].push({
                    purpose: {
                        $in: [purpose, "Both"]
                    }
                })
            }
        }
        /**filter by property_type */
        if (property != '') {
            if (property == 'Real Estate') {
                condition['$and'].push({
                    property_type: property,
                })
            } else if (property == 'Yachts & Ships') {
                condition['$and'].push({
                    yachts_type: property,
                })
            } else if (property == 'Jets & Aircraft') {
                condition['$and'].push({
                    Aircraft_type: property,
                })
            } else if (property == 'Crowdfunding Projects') {
                condition['$and'].push({
                    CrowdFunding_type: property,
                })
            }
        }
        /**filter by property_subtype */
        if (subproperty != '') {
            if (property == 'Real Estate') {
                condition['$and'].push({
                    property_subtype: subproperty,
                })
            } else if (property == 'Yachts & Ships') {
                condition['$and'].push({
                    yachts_subtype: subproperty,
                })
            } else if (property == 'Jets & Aircraft') {
                condition['$and'].push({
                    Aircraft_subtype: subproperty,
                })
            } else if (property == 'Crowdfunding Projects') {
                condition['$and'].push({
                    CrowdFunding_subtype: subproperty,
                })
            }
        }
        /**filter by country */
        if (countryName !== '') {
            condition['$and'].push({
                country: countryName
            })
        }
        /*start state search*/
        if (stateName != '') {
            condition['$and'].push({
                state: stateName,
            })
        }
        /*start city search*/
        if (cityName != '') {
            condition['$and'].push({
                city: cityName,
            })
        }
        if (keyword != "") {
            condition['$and'].push({
                $text: {
                    $search: keyword
                }
            })
        }
        getData = await Real_estate_sale.find(condition);
        let getData1 = await Aircraft_sale.find(condition);
        let getData2 = await Yachts_sale.find(condition);
        let getData3 = await CrowdFunding_sale.find(condition);
        var finalArray = getData.concat(getData1, getData2, getData3);
        //console.log("CHECK SEARCH FILTER DATA : ", finalArray);
        if (!finalArray) {
            return res.send({
                success: false,
                message: "Error in get Search Wepo posting."
            });
        }
        finalArray.sort(function (a, b) {
            return new Date(b.created_at) - new Date(a.created_at);
        });
        return res.send({
            success: true,
            message: "Search listing data",
            dataCount: finalArray.length,
            getData: finalArray,
        });
    } catch (error) {
        //console.log("Error in search listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

// upload image through mobile apk
exports.uploadImageMobileApk = async (req, res) => {
    ////console.log("mobile apk image upload bodyyyyyyyyyyyy : ", req.body);
    ////console.log("filesss : ", req.file);
    if (!req.file) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    try {
        var ImageArr = [];
        if (req.file != undefined) {
            ImageArr.push({
                src: 'uploads/' + req.file.filename,
                orgName: req.file.originalname,
            })
        }
        //console.log("update banner ad updated: ", updateData)
        if (ImageArr.length == 0) {
            return res.send({
                success: false,
                message: "No Image uploaded yet."
            });
        }
        return res.send({
            success: true,
            message: "Image uploaded successfully.",
            ImageArr: ImageArr
        });
    } catch (error) {
        //console.log("Error in image uploaded through mobile apk : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePogetBusinessCount = async (req, res) => {
    try {
        var updateDate = await Business_sale.find({}).count();
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in get count"
            });
        }
        return res.send({
            success: true,
            message: "Count for all business property post successfully.",
            count: updateDate
        });
    } catch (error) {
        //console.log("Error in et for all CrowdFunding_sale post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePogetArtworkCount = async (req, res) => {
    try {
        var updateDate = await Artwork_sale.find({}).count();
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in get count"
            });
        }
        return res.send({
            success: true,
            message: "Count for all artwork property post successfully.",
            count: updateDate
        });
    } catch (error) {
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePogetCarsRvCount = async (req, res) => {
    try {
        var updateDate = await Cars_and_rv_sale.find({}).count();
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in get count"
            });
        }
        return res.send({
            success: true,
            message: "Count for all artwork property post successfully.",
            count: updateDate
        });
    } catch (error) {
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoListingCarsRv = async (req, res) => {
    //console.log("body reqparams we psoting: ", req.body);
    //console.log("Photos : ", req.files);
    // if (!req.files.all_images) {
    //     return res.send({
    //         success: false,
    //         message: "Please select property picture."
    //     });
    // }
    if (!req.body.user_id || req.body.user_id == null || req.body.user_id == undefined || req.body.user_id == 'undefined') {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    if (!req.body.uploadImageThrughAPK && !req.files.all_images) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.body.uploadImageThrughAPK == '[]' && req.files.all_images == {}) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (!req.body.Tittle_Name || req.body.Tittle_Name == "") {
        return res.send({
            success: false,
            message: "Please enter title name."
        });
    }
    if (!req.body.Cars_Rv_type || req.body.Cars_Rv_type == "") {
        return res.send({
            success: false,
            message: "Please select Cars type."
        });
    }
    if (!req.body.Cars_Rv_subtype || req.body.Cars_Rv_subtype == "") {
        return res.send({
            success: false,
            message: "Please select Cars sub-type."
        });
    }
    if (!req.body.purpose || req.body.purpose == "") {
        return res.send({
            success: false,
            message: "Please select purpose."
        });
    }
    if (!req.body.price || req.body.price == "") {
        return res.send({
            success: false,
            message: "Please enter price."
        });
    }
    if (!req.body.address_line1 || req.body.address_line1 == "") {
        return res.send({
            success: false,
            message: "Please enter address line 1."
        });
    }
    if (!req.body.country || req.body.country == "") {
        return res.send({
            success: false,
            message: "Please select country."
        });
    }
    if (!req.body.state || req.body.state == "") {
        return res.send({
            success: false,
            message: "Please select state."
        });
    }
    if (!req.body.city || req.body.city == "") {
        return res.send({
            success: false,
            message: "Please select city."
        });
    }
    if (!req.body.zipcode || req.body.zipcode == "") {
        return res.send({
            success: false,
            message: "Please enter zipcode."
        });
    }
    if (!req.body.created_by || req.body.created_by == "") {
        return res.send({
            success: false,
            message: "Please enter website name."
        });
    }
    if (!req.body.listing_show_on_wepo || req.body.listing_show_on_wepo == "") {
        return res.send({
            success: false,
            message: "Please enter this listing whether it will be shown on wepo or not."
        });
    }
    try {
        // for check is user of wepo or not
        if (req.body.created_by === 'WeCoOwn' && req.body.user_id != null) {
            if (req.body.listing_show_on_wepo === 'Yes') {
                let checkWePoMember = await User.findOne({
                    _id: req.body.user_id
                });
                if (checkWePoMember != null) {
                    for (let i = 0; i < checkWePoMember.role.length; i++) {
                        if (checkWePoMember.role[i] != '2') {
                            req.body.listing_show_on_wepo == 'No'
                        }
                    }
                } else {
                    req.body.listing_show_on_wepo == 'No'
                }
            }
        }
        var progileImageArr = [];
        if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined' && req.body.uploadImageThrughAPK != '[]') {
            let imageArr = JSON.parse(req.body.uploadImageThrughAPK);
            for (let i = 0; i < imageArr.length; i++) {
                progileImageArr.push({
                    src: imageArr[i].src,
                    orgName: imageArr[i].orgName,
                })
            }
        } else if (req.files.all_images != undefined) {
            req.files.all_images.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        var getPdfFile = [];
        if (req.files.pdfFile != undefined) {
            req.files.pdfFile.forEach(element => {
                if (element.originalname.substring(element.originalname.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
                    return res.send({
                        success: false,
                        message: "Please select document in pdf format."
                    });
                } else {
                    getPdfFile.push({
                        src: 'uploads/' + element.filename,
                        orgName: element.originalname,
                    })
                }
            });
            req.body.pdf_doc = getPdfFile;
        }
        let responseToUser = {};
        new Cars_and_rv_sale(req.body).save(async function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                console.log("ERROR : ", err);
                responseToUser = {
                    success: false,
                    message: "Error in property listing."
                };
                res.send(responseToUser);
            } else {
                // for find count user 25 listing condition                
                let getUserListingCount = await getUserTotalListingCount(req.body.user_id);
                if (25 > getUserListingCount) {
                    // update wcx reward token by add 2000        
                    let paymentForWcsToken = 0;
                    if (req.body.purpose === "No Ready") {
                        paymentForWcsToken = 2000;
                    } else {
                        paymentForWcsToken = 5000;
                    }
                    let updateWcxTokenIncrementBody = {
                        $inc: {
                            wcx_rewards_tokens: paymentForWcsToken
                        }
                    }
                    let updateWcxToeknData = await User.findByIdAndUpdate(req.body.user_id, updateWcxTokenIncrementBody);
                    //console.log("update data user: ", updateData)
                    if (!updateWcxToeknData) {
                        responseToUser = {
                            success: false,
                            message: "Error in property listing."
                        };
                        res.send(responseToUser);
                    }
                    // create new wcx history   
                    let dataForWcxToken = {
                        user_id: req.body.user_id,
                        date: Date.now(),
                        token_price: paymentForWcsToken,
                        event_name: 'Create listing'
                    }
                    new Wcx_rewards_tokens_history(dataForWcxToken).save(function (err, resultOfWcxToken) {
                        //console.log("Error in create new wcx history  : ", err);
                        if (err) {
                            responseToUser = {
                                success: false,
                                message: "Error in property listing."
                            };
                        } else {
                            responseToUser = {
                                success: true,
                                message: "Your property list created successfully.",
                                Serial_Number: seeData.Serial_Number
                            }
                        }
                        res.send(responseToUser);
                    });
                } else {
                    responseToUser = {
                        success: true,
                        message: "Your property list created successfully.",
                        Serial_Number: seeData.Serial_Number
                    }
                    res.send(responseToUser);
                }

            }
        });
    } catch (error) {
        console.log("Error in posting in wepo : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoListingCrypto = async (req, res) => {
    //console.log("body reqparams we psoting: ", req.body);
    //console.log("Photos : ", req.files);
    // if (!req.files.all_images) {
    //     return res.send({
    //         success: false,
    //         message: "Please select property picture."
    //     });
    // }
    if (!req.body.user_id || req.body.user_id == null || req.body.user_id == undefined || req.body.user_id == 'undefined') {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    if (!req.body.uploadImageThrughAPK && !req.files.all_images) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.body.uploadImageThrughAPK == '[]' && req.files.all_images == {}) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (!req.body.Tittle_Name || req.body.Tittle_Name == "") {
        return res.send({
            success: false,
            message: "Please enter title name."
        });
    }
    if (!req.body.Crypto_Assets_type || req.body.Crypto_Assets_type == "") {
        return res.send({
            success: false,
            message: "Please select crypto type."
        });
    }
    if (!req.body.Crypto_Assets_subtype || req.body.Crypto_Assets_subtype == "") {
        return res.send({
            success: false,
            message: "Please select crypto sub-type."
        });
    }
    if (!req.body.purpose || req.body.purpose == "") {
        return res.send({
            success: false,
            message: "Please select purpose."
        });
    }
    if (!req.body.price || req.body.price == "") {
        return res.send({
            success: false,
            message: "Please enter price."
        });
    }
    if (!req.body.address_line1 || req.body.address_line1 == "") {
        return res.send({
            success: false,
            message: "Please enter address line 1."
        });
    }
    if (!req.body.country || req.body.country == "") {
        return res.send({
            success: false,
            message: "Please select country."
        });
    }
    if (!req.body.state || req.body.state == "") {
        return res.send({
            success: false,
            message: "Please select state."
        });
    }
    if (!req.body.city || req.body.city == "") {
        return res.send({
            success: false,
            message: "Please select city."
        });
    }
    if (!req.body.zipcode || req.body.zipcode == "") {
        return res.send({
            success: false,
            message: "Please enter zipcode."
        });
    }
    if (!req.body.created_by || req.body.created_by == "") {
        return res.send({
            success: false,
            message: "Please enter website name."
        });
    }
    if (!req.body.listing_show_on_wepo || req.body.listing_show_on_wepo == "") {
        return res.send({
            success: false,
            message: "Please enter this listing whether it will be shown on wepo or not."
        });
    }
    try {
        // for check is user of wepo or not
        if (req.body.created_by === 'WeCoOwn' && req.body.user_id != null) {
            if (req.body.listing_show_on_wepo === 'Yes') {
                let checkWePoMember = await User.findOne({
                    _id: req.body.user_id
                });
                if (checkWePoMember != null) {
                    for (let i = 0; i < checkWePoMember.role.length; i++) {
                        if (checkWePoMember.role[i] != '2') {
                            req.body.listing_show_on_wepo == 'No'
                        }
                    }
                } else {
                    req.body.listing_show_on_wepo == 'No'
                }
            }
        }
        var progileImageArr = [];
        if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined' && req.body.uploadImageThrughAPK != '[]') {
            let imageArr = JSON.parse(req.body.uploadImageThrughAPK);
            for (let i = 0; i < imageArr.length; i++) {
                progileImageArr.push({
                    src: imageArr[i].src,
                    orgName: imageArr[i].orgName,
                })
            }
        } else if (req.files.all_images != undefined) {
            req.files.all_images.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        var getPdfFile = [];
        if (req.files.pdfFile != undefined) {
            req.files.pdfFile.forEach(element => {
                if (element.originalname.substring(element.originalname.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
                    return res.send({
                        success: false,
                        message: "Please select document in pdf format."
                    });
                } else {
                    getPdfFile.push({
                        src: 'uploads/' + element.filename,
                        orgName: element.originalname,
                    })
                }
            });
            req.body.pdf_doc = getPdfFile;
        }
        let responseToUser = {};
        new Crypto_asset(req.body).save(async function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                console.log("ERROR : ", err);
                responseToUser = {
                    success: false,
                    message: "Error in property listing."
                };
                res.send(responseToUser);
            } else {
                // for find count user 25 listing condition                
                let getUserListingCount = await getUserTotalListingCount(req.body.user_id);
                if (25 > getUserListingCount) {
                    // update wcx reward token by add 2000     
                    let paymentForWcsToken = 0;
                    if (req.body.purpose === "No Ready") {
                        paymentForWcsToken = 2000;
                    } else {
                        paymentForWcsToken = 5000;
                    }
                    let updateWcxTokenIncrementBody = {
                        $inc: {
                            wcx_rewards_tokens: paymentForWcsToken
                        }
                    }
                    let updateWcxToeknData = await User.findByIdAndUpdate(req.body.user_id, updateWcxTokenIncrementBody);
                    //console.log("update data user: ", updateData)
                    if (!updateWcxToeknData) {
                        responseToUser = {
                            success: false,
                            message: "Error in property listing."
                        };
                        res.send(responseToUser);
                    }
                    // create new wcx history   
                    let dataForWcxToken = {
                        user_id: req.body.user_id,
                        date: Date.now(),
                        token_price: paymentForWcsToken,
                        event_name: 'Create listing'
                    }
                    new Wcx_rewards_tokens_history(dataForWcxToken).save(function (err, resultOfWcxToken) {
                        //console.log("Error in create new wcx history  : ", err);
                        if (err) {
                            responseToUser = {
                                success: false,
                                message: "Error in property listing."
                            };
                        } else {
                            responseToUser = {
                                success: true,
                                message: "Your property list created successfully.",
                                Serial_Number: seeData.Serial_Number
                            }
                        }
                        res.send(responseToUser);
                    });
                } else {
                    responseToUser = {
                        success: true,
                        message: "Your property list created successfully.",
                        Serial_Number: seeData.Serial_Number
                    }
                    res.send(responseToUser);
                }
            }
        });
    } catch (error) {
        console.log("Error in posting in wepo : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoListingHorsesLive = async (req, res) => {
    //console.log("body reqparams we psoting: ", req.body);
    //console.log("Photos : ", req.files);
    // if (!req.files.all_images) {
    //     return res.send({
    //         success: false,
    //         message: "Please select property picture."
    //     });
    // }
    if (!req.body.user_id || req.body.user_id == null || req.body.user_id == undefined || req.body.user_id == 'undefined') {
        return res.send({
            success: false,
            message: "Please enter user id."
        });
    }
    if (!req.body.uploadImageThrughAPK && !req.files.all_images) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (req.body.uploadImageThrughAPK == '[]' && req.files.all_images == {}) {
        return res.send({
            success: false,
            message: "Please select property picture."
        });
    }
    if (!req.body.Tittle_Name || req.body.Tittle_Name == "") {
        return res.send({
            success: false,
            message: "Please enter title name."
        });
    }
    if (!req.body.Horses_Livestocks_type || req.body.Horses_Livestocks_type == "") {
        return res.send({
            success: false,
            message: "Please select horses and livestock type."
        });
    }
    if (!req.body.Horses_Livestocks_subtype || req.body.Horses_Livestocks_subtype == "") {
        return res.send({
            success: false,
            message: "Please select horses and livestock sub-type."
        });
    }
    if (!req.body.purpose || req.body.purpose == "") {
        return res.send({
            success: false,
            message: "Please select purpose."
        });
    }
    if (!req.body.price || req.body.price == "") {
        return res.send({
            success: false,
            message: "Please enter price."
        });
    }
    if (!req.body.address_line1 || req.body.address_line1 == "") {
        return res.send({
            success: false,
            message: "Please enter address line 1."
        });
    }
    if (!req.body.country || req.body.country == "") {
        return res.send({
            success: false,
            message: "Please select country."
        });
    }
    if (!req.body.state || req.body.state == "") {
        return res.send({
            success: false,
            message: "Please select state."
        });
    }
    if (!req.body.city || req.body.city == "") {
        return res.send({
            success: false,
            message: "Please select city."
        });
    }
    if (!req.body.zipcode || req.body.zipcode == "") {
        return res.send({
            success: false,
            message: "Please enter zipcode."
        });
    }
    if (!req.body.created_by || req.body.created_by == "") {
        return res.send({
            success: false,
            message: "Please enter website name."
        });
    }
    if (!req.body.listing_show_on_wepo || req.body.listing_show_on_wepo == "") {
        return res.send({
            success: false,
            message: "Please enter this listing whether it will be shown on wepo or not."
        });
    }
    try {
        // for check is user of wepo or not
        if (req.body.created_by === 'WeCoOwn' && req.body.user_id != null) {
            if (req.body.listing_show_on_wepo === 'Yes') {
                let checkWePoMember = await User.findOne({
                    _id: req.body.user_id
                });
                if (checkWePoMember != null) {
                    for (let i = 0; i < checkWePoMember.role.length; i++) {
                        if (checkWePoMember.role[i] != '2') {
                            req.body.listing_show_on_wepo == 'No'
                        }
                    }
                } else {
                    req.body.listing_show_on_wepo == 'No'
                }
            }
        }
        var progileImageArr = [];
        if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined' && req.body.uploadImageThrughAPK != '[]') {
            let imageArr = JSON.parse(req.body.uploadImageThrughAPK);
            for (let i = 0; i < imageArr.length; i++) {
                progileImageArr.push({
                    src: imageArr[i].src,
                    orgName: imageArr[i].orgName,
                })
            }
        } else if (req.files.all_images != undefined) {
            req.files.all_images.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        var getPdfFile = [];
        if (req.files.pdfFile != undefined) {
            req.files.pdfFile.forEach(element => {
                if (element.originalname.substring(element.originalname.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
                    return res.send({
                        success: false,
                        message: "Please select document in pdf format."
                    });
                } else {
                    getPdfFile.push({
                        src: 'uploads/' + element.filename,
                        orgName: element.originalname,
                    })
                }
            });
            req.body.pdf_doc = getPdfFile;
        }
        let responseToUser = {};
        new Horses_livestock(req.body).save(async function (err, seeData) {
            //console.log("seeData : ", seeData);
            if (err) {
                console.log("ERROR : ", err);
                responseToUser = {
                    success: false,
                    message: "Error in property listing."
                };
                res.send(responseToUser);
            } else {
                // for find count user 25 listing condition                
                let getUserListingCount = await getUserTotalListingCount(req.body.user_id);
                if (25 > getUserListingCount) {
                    // update wcx reward token by add 2000     
                    let paymentForWcsToken = 0;
                    if (req.body.purpose === "No Ready") {
                        paymentForWcsToken = 2000;
                    } else {
                        paymentForWcsToken = 5000;
                    }
                    let updateWcxTokenIncrementBody = {
                        $inc: {
                            wcx_rewards_tokens: paymentForWcsToken
                        }
                    }
                    let updateWcxToeknData = await User.findByIdAndUpdate(req.body.user_id, updateWcxTokenIncrementBody);
                    //console.log("update data user: ", updateData)
                    if (!updateWcxToeknData) {
                        responseToUser = {
                            success: false,
                            message: "Error in property listing."
                        };
                        res.send(responseToUser);
                    }
                    // create new wcx history   
                    let dataForWcxToken = {
                        user_id: req.body.user_id,
                        date: Date.now(),
                        token_price: paymentForWcsToken,
                        event_name: 'Create listing'
                    }
                    new Wcx_rewards_tokens_history(dataForWcxToken).save(function (err, resultOfWcxToken) {
                        //console.log("Error in create new wcx history  : ", err);
                        if (err) {
                            responseToUser = {
                                success: false,
                                message: "Error in property listing."
                            };
                        } else {
                            responseToUser = {
                                success: true,
                                message: "Your property list created successfully.",
                                Serial_Number: seeData.Serial_Number
                            }
                        }
                        res.send(responseToUser);
                    });
                } else {
                    responseToUser = {
                        success: true,
                        message: "Your property list created successfully.",
                        Serial_Number: seeData.Serial_Number
                    }
                    res.send(responseToUser);
                }
            }
        });
    } catch (error) {
        console.log("Error in posting in wepo : ", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoUpdateListingCrypto = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    // //console.log("body reqparams user profile: ", req.body);
    // //console.log("Photos : ", req.files);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (!req.body.previous_images && !req.files.all_images && !req.body.uploadImageThrughAPK) {
        //console.log("in 1st if");
        return res.send({
            success: false,
            message: "Please select crypto asset picture."
        });
    }
    if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined') {
        if (req.body.previous_images == '[]' && req.body.uploadImageThrughAPK == '[]') {
            //console.log("in else if");
            return res.send({
                success: false,
                message: "Please select crypto asset picture."
            });
        }
    } else if (req.body.previous_images == '[]' && req.files.all_images == undefined) {
        //console.log("in 2nd if");
        return res.send({
            success: false,
            message: "Please select crypto asset picture."
        });
    }
    if (!req.body.Tittle_Name || req.body.Tittle_Name == "") {
        return res.send({
            success: false,
            message: "Please enter title name."
        });
    }
    if (!req.body.Crypto_Assets_type || req.body.Crypto_Assets_type == "") {
        return res.send({
            success: false,
            message: "Please select crypto asset type."
        });
    }
    if (!req.body.Crypto_Assets_subtype || req.body.Crypto_Assets_subtype == "") {
        return res.send({
            success: false,
            message: "Please select crypto asset sub-type."
        });
    }
    if (!req.body.purpose || req.body.purpose == "") {
        return res.send({
            success: false,
            message: "Please select purpose."
        });
    }
    if (!req.body.price || req.body.price == "") {
        return res.send({
            success: false,
            message: "Please enter price."
        });
    }
    if (!req.body.address_line1 || req.body.address_line1 == "") {
        return res.send({
            success: false,
            message: "Please enter address line 1."
        });
    }
    if (!req.body.country || req.body.country == "") {
        return res.send({
            success: false,
            message: "Please select country."
        });
    }
    if (!req.body.state || req.body.state == "") {
        return res.send({
            success: false,
            message: "Please select state."
        });
    }
    if (!req.body.city || req.body.city == "") {
        return res.send({
            success: false,
            message: "Please select city."
        });
    }
    if (!req.body.zipcode || req.body.zipcode == "") {
        return res.send({
            success: false,
            message: "Please enter zipcode."
        });
    }
    try {
        progileImageArr = [];
        if (req.body.previous_images != undefined) {
            if (req.body.previous_images != '[]') {
                //console.log("prevuois image : ", req.body.previous_images);
                var preImg = JSON.parse(req.body.previous_images);
                //console.log("pre image parse : ", preImg);
                //console.log("pre image parse trrrrrrrrr : ", preImg[0].orgName);
                for (let jk = 0; jk < preImg.length; jk++) {
                    progileImageArr.push({
                        src: preImg[jk].src,
                        orgName: preImg[jk].orgName,
                    })
                }
                //console.log("after previous merge : ", progileImageArr);
            }
        }
        if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined' && req.body.uploadImageThrughAPK != '[]') {
            let imageArr = JSON.parse(req.body.uploadImageThrughAPK);
            for (let i = 0; i < imageArr.length; i++) {
                progileImageArr.push({
                    src: imageArr[i].src,
                    orgName: imageArr[i].orgName,
                })
            }
        } else if (req.files.all_images != undefined) {
            req.files.all_images.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        var getPdfFile = [];
        //console.log("previous pdf file : ", req.body.previous_pdf_file);
        if (req.files.pdfFile != undefined) {
            req.files.pdfFile.forEach(element => {
                if (element.originalname.substring(element.originalname.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
                    return res.send({
                        success: false,
                        message: "Please select document in pdf format."
                    });
                } else {
                    getPdfFile.push({
                        src: 'uploads/' + element.filename,
                        orgName: element.originalname,
                    })
                }
            });
            req.body.pdf_doc = getPdfFile;
            //console.log("profile_pic pic coverImageArr", progileImageArr);
            //console.log("profile_pic pic ", req.body.profile_pic);
        } else if (req.body.previous_pdf_file == '[]') {
            ////console.log("In eqal condition :",);
            req.body.pdf_doc = [];
        } else if (req.body.previous_pdf_file != '[]') {
            ////console.log("In not eqal condition :");
            delete req.body.pdf_doc;
        }
        //console.log("req body photos : ", req.body.property_photos);
        // let profileData = {
        //     cover_pic: progileImageArr
        // }
        var updateData = await Crypto_asset.findByIdAndUpdate(req.query.id, req.body);
        console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your listing updated successfully."
        });
    } catch (error) {
        console.log("User listing Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePoUpdateListingHorsesLive = async (req, res) => {
    //console.log("in put user profile methodddddddddddddddd : ", req.query.id);
    // //console.log("body reqparams user profile: ", req.body);
    // //console.log("Photos : ", req.files);
    if (!req.query.id) {
        return res.send({
            success: false,
            message: "Please select user id."
        });
    }
    if (!req.body.previous_images && !req.files.all_images && !req.body.uploadImageThrughAPK) {
        //console.log("in 1st if");
        return res.send({
            success: false,
            message: "Please select horses and livestock picture."
        });
    }
    if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined') {
        if (req.body.previous_images == '[]' && req.body.uploadImageThrughAPK == '[]') {
            //console.log("in else if");
            return res.send({
                success: false,
                message: "Please select horses and livestock picture."
            });
        }
    } else if (req.body.previous_images == '[]' && req.files.all_images == undefined) {
        //console.log("in 2nd if");
        return res.send({
            success: false,
            message: "Please select horses and livestock picture."
        });
    }
    if (!req.body.Tittle_Name || req.body.Tittle_Name == "") {
        return res.send({
            success: false,
            message: "Please enter title name."
        });
    }
    if (!req.body.Horses_Livestocks_type || req.body.Horses_Livestocks_type == "") {
        return res.send({
            success: false,
            message: "Please select horses and livestock type."
        });
    }
    if (!req.body.Horses_Livestocks_subtype || req.body.Horses_Livestocks_subtype == "") {
        return res.send({
            success: false,
            message: "Please select horses and livestock sub-type."
        });
    }
    if (!req.body.purpose || req.body.purpose == "") {
        return res.send({
            success: false,
            message: "Please select purpose."
        });
    }
    if (!req.body.price || req.body.price == "") {
        return res.send({
            success: false,
            message: "Please enter price."
        });
    }
    if (!req.body.address_line1 || req.body.address_line1 == "") {
        return res.send({
            success: false,
            message: "Please enter address line 1."
        });
    }
    if (!req.body.country || req.body.country == "") {
        return res.send({
            success: false,
            message: "Please select country."
        });
    }
    if (!req.body.state || req.body.state == "") {
        return res.send({
            success: false,
            message: "Please select state."
        });
    }
    if (!req.body.city || req.body.city == "") {
        return res.send({
            success: false,
            message: "Please select city."
        });
    }
    if (!req.body.zipcode || req.body.zipcode == "") {
        return res.send({
            success: false,
            message: "Please enter zipcode."
        });
    }
    try {
        progileImageArr = [];
        if (req.body.previous_images != undefined) {
            if (req.body.previous_images != '[]') {
                //console.log("prevuois image : ", req.body.previous_images);
                var preImg = JSON.parse(req.body.previous_images);
                //console.log("pre image parse : ", preImg);
                //console.log("pre image parse trrrrrrrrr : ", preImg[0].orgName);
                for (let jk = 0; jk < preImg.length; jk++) {
                    progileImageArr.push({
                        src: preImg[jk].src,
                        orgName: preImg[jk].orgName,
                    })
                }
                //console.log("after previous merge : ", progileImageArr);
            }
        }
        if (req.body.uploadImageThrughAPK != undefined && req.body.uploadImageThrughAPK != 'undefined' && req.body.uploadImageThrughAPK != '[]') {
            let imageArr = JSON.parse(req.body.uploadImageThrughAPK);
            for (let i = 0; i < imageArr.length; i++) {
                progileImageArr.push({
                    src: imageArr[i].src,
                    orgName: imageArr[i].orgName,
                })
            }
        } else if (req.files.all_images != undefined) {
            req.files.all_images.forEach(element => {
                progileImageArr.push({
                    src: 'uploads/' + element.filename,
                    orgName: element.originalname,
                })
            });
        }
        req.body.property_photos = progileImageArr;
        var getPdfFile = [];
        //console.log("previous pdf file : ", req.body.previous_pdf_file);
        if (req.files.pdfFile != undefined) {
            req.files.pdfFile.forEach(element => {
                if (element.originalname.substring(element.originalname.lastIndexOf(".") + 1) != (("pdf") || ("PDF"))) {
                    return res.send({
                        success: false,
                        message: "Please select document in pdf format."
                    });
                } else {
                    getPdfFile.push({
                        src: 'uploads/' + element.filename,
                        orgName: element.originalname,
                    })
                }
            });
            req.body.pdf_doc = getPdfFile;
            //console.log("profile_pic pic coverImageArr", progileImageArr);
            //console.log("profile_pic pic ", req.body.profile_pic);
        } else if (req.body.previous_pdf_file == '[]') {
            ////console.log("In eqal condition :",);
            req.body.pdf_doc = [];
        } else if (req.body.previous_pdf_file != '[]') {
            ////console.log("In not eqal condition :");
            delete req.body.pdf_doc;
        }
        //console.log("req body photos : ", req.body.property_photos);
        // let profileData = {
        //     cover_pic: progileImageArr
        // }
        var updateData = await Horses_livestock.findByIdAndUpdate(req.query.id, req.body);
        console.log("update data user: ", updateData)
        if (!updateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "Your listing updated successfully."
        });
    } catch (error) {
        console.log("User listing Updated", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePogetCryptoCount = async (req, res) => {
    try {
        var updateDate = await Crypto_asset.find({}).count();
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in get count"
            });
        }
        return res.send({
            success: true,
            message: "Count for all crypto asset property post successfully.",
            count: updateDate
        });
    } catch (error) {
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePogetHorsesLiveCount = async (req, res) => {
    try {
        var updateDate = await Horses_livestock.find({}).count();
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in get count"
            });
        }
        return res.send({
            success: true,
            message: "Count for all horses and live stock property post successfully.",
            count: updateDate
        });
    } catch (error) {
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePodeleteListingBusiness = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please enter listing id"
            });
        }
        let upadteStatus = {
            status: 'Inactive'
        }
        var updateDate = await Business_sale.findByIdAndUpdate(req.body.id, upadteStatus);
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in delete listing"
            });
        }
        return res.send({
            success: true,
            message: "Your listing deleted successfully.",
        });
    } catch (error) {
        //console.log("Error in delete post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePodeleteListingCars = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please enter listing id"
            });
        }
        let upadteStatus = {
            status: 'Inactive'
        }
        var updateDate = await Cars_and_rv_sale.findByIdAndUpdate(req.body.id, upadteStatus);
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in delete listing"
            });
        }
        return res.send({
            success: true,
            message: "Your listing deleted successfully.",
        });
    } catch (error) {
        //console.log("Error in delete post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePodeleteListingArtwork = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please enter listing id"
            });
        }
        let upadteStatus = {
            status: 'Inactive'
        }
        var updateDate = await Artwork_sale.findByIdAndUpdate(req.body.id, upadteStatus);
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in delete listing"
            });
        }
        return res.send({
            success: true,
            message: "Your listing deleted successfully.",
        });
    } catch (error) {
        //console.log("Error in delete post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePodeleteListingHorses = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please enter listing id"
            });
        }
        let upadteStatus = {
            status: 'Inactive'
        }
        var updateDate = await Horses_livestock.findByIdAndUpdate(req.body.id, upadteStatus);
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in delete listing"
            });
        }
        return res.send({
            success: true,
            message: "Your listing deleted successfully.",
        });
    } catch (error) {
        //console.log("Error in delete post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.wePodeleteListingCrypto = async (req, res) => {
    try {
        //console.log("req.bodyyyy get user posts : ", req.body);
        if (!req.body.id) {
            return res.send({
                success: false,
                message: "Please enter listing id"
            });
        }
        let upadteStatus = {
            status: 'Inactive'
        }
        var updateDate = await Crypto_asset.findByIdAndUpdate(req.body.id, upadteStatus);
        if (!updateDate) {
            return res.send({
                success: false,
                message: "Error in delete listing"
            });
        }
        return res.send({
            success: true,
            message: "Your listing deleted successfully.",
        });
    } catch (error) {
        //console.log("Error in delete post listing", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

//Country State City Api

exports.getAllCountry = async (req, res) => {
    try {
        var countryData = await country.find({}).sort('name');
        //console.log("all country : ", countryData);
        let getIndex = findArrayIndex(countryData, 'name', 'United States');
        array_move(countryData, getIndex, 0)
        // for United states at 1 position
        function array_move(arr, old_index, new_index) {
            if (new_index >= arr.length) {
                var k = new_index - arr.length + 1;
                while (k--) {
                    arr.push(undefined);
                }
            }
            arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
            return arr;
        };

        function findArrayIndex(array, attr, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].name == value) {
                    return i;
                }
            }
            return -1;
        }
        if (!countryData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "All country list",
            countryData: countryData,
        });
    } catch (error) {
        //console.log("Error in category", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getStateByCountry = async (req, res) => {
    try {
        if (!req.body.country_code) {
            return res.send({
                success: false,
                message: "Please enter country code."
            });
        }
        var stateData = await state.find({
            country: req.body.country_code
        }).sort('region');
        if (!stateData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "State data",
            stateData: stateData
        });
    } catch (error) {
        //console.log("Error in all state data", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getCityByCountryAndState = async (req, res) => {
    try {
        if (!req.body.country_code) {
            return res.send({
                success: false,
                message: "Please enter country code."
            });
        }
        if (!req.body.region_iso_code) {
            return res.send({
                success: false,
                message: "Please enter state name."
            });
        }
        var cityData = await city.find({
            country: req.body.country_code,
            region: req.body.region_iso_code
        }).sort('city');
        if (!cityData) {
            return res.send({
                success: false,
                message: messages.ERROR
            });
        }
        return res.send({
            success: true,
            message: "City data",
            cityData: cityData
        });
    } catch (error) {
        //console.log("Error in all city data", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};


/* exports.postAllCountry = async (req, res) => {
    try {
        var checkCountryData = await country.find({});
        //console.log("all country : ", countryData);
        if (checkCountryData.length == 0) {
            const API_KEY = '00000000000000000000000000000000';
            //var cityCode = bodyCity[i].region;
            //'https://battuta.medunes.net/api/city/' + countryCode + '/search/?region=' + cityCode + '&key=' + API_KEY
            //var dataForm = [];
            request({
                url: 'https://battuta.medunes.net/api/country/all/?key=' + API_KEY,
                method: 'GET'
            }, function (err, resp, body) {
                //console.log("err : ", err);
                ////console.log("body : ",body);
                if (err) {
                    //console.log("Error",err);
                } else {
                    let dataForm = JSON.parse(resp.body);
                    //console.log(dataForm[0]);
                    for (let i = 0; i < dataForm.length; i++) {
                        dataFormFinal = {
                            name: dataForm[i].name,
                            code: dataForm[i].code,
                        }
                        new country(dataFormFinal).save(function (errorOfSaveData, seeData) {
                            //console.log("errorOfSaveData : ", errorOfSaveData);
                            //console.log("seeData : ", seeData);
                            if (errorOfSaveData) {
                                response = {
                                    success: false,
                                    message: "Error in country data save."
                                };
                                res.send(response);
                            }
                            //console.log("seeData : ", seeData.code);
                            //let countryCode = seeData.code;
                        });
                    }
                    return res.send({
                        success: true,
                        message: "Country data"
                    });
                }
            });
        } else {
            //country.drop();
            const API_KEY = '00000000000000000000000000000000';
            request({
                url: 'https://battuta.medunes.net/api/country/all/?key=' + API_KEY,
                method: 'GET'
            }, function (err, resp, body) {
                //console.log("err : ", err);
                ////console.log("body : ",body);
                if (err) {
                    //console.log("Error",err);
                } else {
                    let dataForm = JSON.parse(resp.body);
                    //console.log(dataForm[0]);
                    for (let i = 0; i < dataForm.length; i++) {
                        dataFormFinal = {
                            name: dataForm[i].name,
                            code: dataForm[i].code,
                        }
                        new country(dataFormFinal).save(function (errorOfSaveData, seeData) {
                            //console.log("errorOfSaveData : ", errorOfSaveData);
                            //console.log("seeData : ", seeData);
                            if (errorOfSaveData) {
                                response = {
                                    success: false,
                                    message: "Error in country data save."
                                };
                                res.send(response);
                            }
                            //console.log("seeData : ", seeData.code);
                            //let countryCode = seeData.code;
                        });
                    }
                    return res.send({
                        success: true,
                        message: "Country data"
                    });
                }
            });
        }

    } catch (error) {
       //console.log("Error in all data", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.postAllState = async (req, res) => {
    try {
        var getCountryData = await country.find({});
        //console.log("getCountryData : " + getCountryData);
        //console.log("getCountryData : " + getCountryData[0].code);
        //console.log("length of getCountryData : " + getCountryData.length);
        for (j = 0; j < getCountryData.length; j++) {
            //console.log("getCountryData : " + getCountryData[j].code);
            const API_KEY = '00000000000000000000000000000000';
            let countryCode = getCountryData[j].code;
            request({
                url: 'https://battuta.medunes.net/api/region/' + countryCode + '/all/?key=' + API_KEY,
                method: 'GET'
            }, function (err, resp, body) {
                //console.log("err : ", err);
                //console.log("res : ", res);
                //console.log("res : ", res.body);
                //console.log("body : ",body);
                if (err) {
                    //console.log("Error",err);
                } else {
                    let dataForm = JSON.parse(resp.body);
                    //console.log(dataForm[0]);
                    for (let i = 0; i < dataForm.length; i++) {
                       //console.log(dataForm[i]);
                        dataFormFinal = {
                            region: dataForm[i].region,
                            country: dataForm[i].country,
                            country_id: dataForm[i].country._id,
                        }
                        //console.log(dataFormFinal.region);
                        new state(dataFormFinal).save(function (errorOfSaveData, seeData) {
                            //console.log("errorOfSaveData : ", errorOfSaveData);
                            //console.log("seeData : ", seeData);
                            if (errorOfSaveData) {
                                response = {
                                    success: false,
                                    message: "Error in state data save."
                                };
                            }
                        });
                    }
                }
            });
        }
    } catch (error) {
       //console.log("Error in all data", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.postAllCities = async (req, res) => {
    try {
        var getStateData = await state.find({});
        //console.log("getStateData : " + getStateData);
        //console.log("getStateData : " + getStateData[0].code);
        //console.log("length of getStateData : " + getStateData.length);
        for (j = 0; j < getStateData.length; j++) {
            //console.log("getStateData : " + getStateData[j].code);
            const API_KEY = '00000000000000000000000000000000';
            let countryCode = getStateData[j].country;
            let stateCode = getStateData[j].region;
            request({
                url: 'https://battuta.medunes.net/api/city/'+ countryCode +'/search/?region=' + stateCode + '&key=' + API_KEY,
                method: 'GET'
            }, function (err, resp, body) {
                //console.log("err : ", err);
                //console.log("res : ", res);
                //console.log("res : ", res.body);
                //console.log("body : ",body);
                if (err) {
                    //console.log("Error",err);
                } else {
                    let dataForm = JSON.parse(resp.body);
                    //console.log(dataForm[0]);
                    for (let i = 0; i < dataForm.length; i++) {
                       //console.log(dataForm[i]);
                        dataFormFinal = {
                            city: dataForm[i].city,
                            region: dataForm[i].region,
                            country: dataForm[i].country,
                            region_id: dataForm[i].region_id._id,
                            country_id: dataForm[i].country._id,
                        }
                        //console.log(dataFormFinal.region);
                        new city(dataFormFinal).save(function (errorOfSaveData, seeData) {
                            //console.log("errorOfSaveData : ", errorOfSaveData);
                            //console.log("seeData : ", seeData);
                            if (errorOfSaveData) {
                                response = {
                                    success: false,
                                    message: "Error in city data save."
                                };
                            }
                        });
                    }
                }
            });
        }
    } catch (error) {
       //console.log("Error in all data", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
}; */

exports.getAllCountrySave = async (req, res) => {
    try {
        var dataForm = csc.getAllCountries();
        for (let i = 0; i < dataForm.length; i++) {
            dataFormFinal = {
                name: dataForm[i].name,
                code: dataForm[i].isoCode,
            }
            new country(dataFormFinal).save(function (errorOfSaveData, seeData) {
                if (errorOfSaveData) {
                    response = {
                        success: false,
                        message: "Error in country data save."
                    };
                    res.send(response);
                }
            });
        }
        return res.send({
            success: true,
            message: "All country list",
            dataForm: dataForm,
        });
    } catch (error) {
        //console.log("Error in save data", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getAllStateSave = async (req, res) => {
    try {
        var dataForm = csc.getAllStates();
        for (let i = 0; i < dataForm.length; i++) {
            dataFormFinal = {
                region: dataForm[i].name,
                country: dataForm[i].countryCode,
                isoCode: dataForm[i].isoCode,
            }
            //console.log(dataFormFinal);
            new state(dataFormFinal).save(function (errorOfSaveData, seeData) {
                if (errorOfSaveData) {
                    response = {
                        success: false,
                        message: "Error in state data save."
                    };
                }
            });
        }
        return res.send({
            success: true,
            message: "All state list",
            dataForm: dataForm,
        });
    } catch (error) {
        //console.log("Error in save data", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

exports.getAllCitiesSave = async (req, res) => {
    try {
        var dataForm = csc.getAllCities();
        //console.log(dataForm.length);
        for (let i = 0; i < dataForm.length; i++) {
            dataFormFinal = {
                region: dataForm[i].stateCode,
                country: dataForm[i].countryCode,
                city: dataForm[i].name,
            }
            //console.log(dataFormFinal);
            new city(dataFormFinal).save(function (errorOfSaveData, seeData) {
                if (errorOfSaveData) {
                    response = {
                        success: false,
                        message: "Error in city data save."
                    };
                }
            });
        }
        return res.send({
            success: true,
            message: "All city list",
            //dataForm: dataForm,
        });
    } catch (error) {
        //console.log("Error in save data", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};


// API for google translate starts from here

//const API_KEY = 'AIzaSyBqVZZr2P7-uWrN_3fGGqzLCciI7_2tY1E';
//const projectId = 'weco-wepo';
const translate = new Translate({
    projectId: 'weco-wepo',
    keyFilename: 'D:/SWAP/wecoown_node/weco-wepo-266b7727c800.json'
});
async function translateFunction(textFromWeb, targetLanguage, sourceLanguage) {
    let text = textFromWeb;
    let target = targetLanguage;
    let source = sourceLanguage;
    if (source && target != source){
        const [translation] = await translate.translate(text, target);
        //console.log(`Text: ${text}`);
        //console.log(`Translation: ${translation}`);
        return translation;
    } else {
        return text
    }
}

exports.translateApi = async (req, res) => {
    try {
        // The text to translate
        let textFromWeb = req.body.text;
        // The target language
        let targetLanguage = req.body.targetLanguage;
        let sourceLanguage = req.body.sourceLanguage;
        let translatedText = await translateFunction(textFromWeb, targetLanguage, sourceLanguage);
        if (!translatedText) {
            return res.send({
                success: false,
                message: "Translation failed."
            });
        }
        return res.send({
            success: true,
            message: "Translated successfully!",
            targetLanguage: targetLanguage,
            sourceLanguage: sourceLanguage,
            translatedText: translatedText
        });
    } catch (error) {
        console.log("Error in translation", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

/* async function translateFunctionString(textFromWeb, targetLanguage, sourceLanguage) {
    let TEXT = textFromWeb;
    let TARGET = targetLanguage;
    let SOURCE = sourceLanguage;
    if (SOURCE && TARGET != SOURCE){
        request({
            url: 'https://translation.googleapis.com/language/translate/v2?key=' + API_KEY + '&source=' + SOURCE + '&target=' + TARGET + '&q=' + escape(TEXT),
            method: 'GET'
        }, function (err, resp, body) {
            //console.log("err : ", err);
            //console.log("err : ", JSON.parse(err));
            //console.log("body : ",body);
            if (err) {
                //console.log("Error",err);
            } else {
                let dataForm = JSON.parse(resp.body);
                return dataForm
            }
        });
    } else {
        return TEXT
    }
}

exports.translateAPIString = async (req, res) => {
    try {
        // The text to translate
        let textFromWeb = 'Hello there! This is to test whether translation of string working or not';
        // The target language
        let targetLanguage = 'ru';
        let sourceLanguage = 'en';
        let translatedText = await translateFunctionString(textFromWeb, targetLanguage, sourceLanguage);
        if (!translatedText) {
            return res.send({
                success: false,
                message: "Translation failed."
            });
        }
        return res.send({
            success: true,
            message: "Translated successfully!",
            translatedText: translatedText
        });
    } catch (error) {
        console.log("Error in translation", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
}; */

exports.translateAPIString = async (req, res) => {
    try {
        const API_KEY = 'AIzaSyCQ8B_jTfW44Yz16gsc373HUCN15qlbMX0';
        let SOURCE = req.body.sourceLanguage;
        let TARGET = req.body.targetLanguage;
        let TEXT = req.body.text;
        if (SOURCE && TARGET != SOURCE){
            request({
                url: 'https://translation.googleapis.com/language/translate/v2?key=' + API_KEY + '&source=' + SOURCE + '&target=' + TARGET + '&q=' + escape(TEXT),
                method: 'GET'
            }, function (err, resp, body) {
                if (err) {
                    //console.log("Error",err);
                } else {
                    let dataForm = JSON.parse(resp.body);
                    return res.send({
                        success: true,
                        message: "Translation done successfully",
                        SourceLanguage:SOURCE,
                        TargetLanguage:TARGET,
                        dataForm: dataForm
                    });
                }
            });
        } else return res.send({
            success: true,
            message: "Translation done successfully",
            SourceLanguage:SOURCE,
            TargetLanguage:TARGET,
            dataForm: TEXT
        });
        
    } catch (error) {
        //console.log("Error in all data", error);
        return res.send({
            success: false,
            message: messages.ERROR
        });
    }
};

// * API for google translate ends here