var index = require('../controllers/index.controller');
var express = require('express');
var router = express.Router();
var multer = require('multer')
// var upload = multer({
//     dest: 'public/uploads/'
// })
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
var upload = multer({ storage: storage });
// wecoown api's

router.post('/user', index.setUser);
router.post('/setUserWithSocialLogin', index.setUserWithSocialLogin);
router.post('/getAllUserForAdmin', index.getAllUserForAdmin);
router.post('/makeUserAdmin', index.makeUserAdmin);
router.post('/updateUserRole', index.updateUserRole);
router.post('/login', index.setLoginUser);
router.post('/setLoginWithSocialLogin', index.setLoginWithSocialLogin);
router.post('/IsUserLoggedIn', index.IsUserLoggedIn);
router.post('/IsUserLoggedInMobile', index.IsUserLoggedInMobile);
router.post('/signOutUser', index.signOutUser);
router.post('/getUserById', index.getUserById);
router.put('/updateUserProfile', upload.fields([{
    name: 'profile_pic',
    maxCount: 1
}, {
    name: 'cover_pic',
    maxCount: 1
}]), index.putUserProfile);

router.put('/updateUserRolewhenWebsiteChange', index.updateUserRolewhenWebsiteChange);
router.put('/updateUserProfilePic', upload.single('all_images'), index.updateUserProfilePic);
router.put('/updateUserCoverPic', upload.single('all_images'), index.updateUserCoverPic);
router.put('/updateUserPortfolioPic', upload.single('all_images'), index.updateUserPortfolioPic);
router.put('/updateUserBio', index.updateUserBio);
router.put('/updateUserProfilePublic', index.updateUserProfilePublic);
router.put('/updateUserSocialLink', index.updateUserSocialLink);
router.put('/updateVendorInfo', index.updateVendorInfo);
router.put('/updateVendorInfoUntick', index.updateVendorInfoUntick);
router.post('/redeemUserClaimKey', index.redeemUserClaimKey);
router.post('/getOneUserClaimKeyHistory', index.getOneUserClaimKeyHistory);

// for advertisement
router.post('/setAdTest', index.setAdTest);
router.get('/getAdTest', index.getAdTest);
router.post('/getAllAd', index.getAllAd);
router.get('/getAllVendorAd', index.getAllVendorAd);
router.post('/getAllBannerAdByCategory', index.getAllBannerAdByCategory);
router.post('/getAllPosterAdByCategory', index.getAllPosterAdByCategory);
router.post('/getAllSidebarAdByCategory', index.getAllSidebarAdByCategory);
router.post('/getAdByIdAndName', index.getAdByIdAndName);
router.post('/updateStatusOfAds', index.updateStatusOfAds);
router.post('/getPosterAdGroupDataByUserId', index.getPosterAdGroupDataByUserId);
router.post('/setBannerAd', upload.single('all_images'), index.setBannerAd);
router.post('/setPosterAd', upload.single('all_images'), index.setPosterAd);
router.post('/setSidebarAd', upload.single('all_images'), index.setSidebarAd);
router.post('/setVendorType', index.setVendorType);
router.get('/getVendorType', index.getVendorType);
router.post('/setVendorPageListingAd', upload.single('all_images'), index.setVendorPageListingAd);
router.put('/updateBannerAds', upload.single('all_images'), index.updateBannerAds);
router.put('/updatePosterAds', upload.single('all_images'), index.updatePosterAds);
router.put('/updateSidebarAds', upload.single('all_images'), index.updateSidebarAds);
router.put('/updateVendorAds', upload.single('all_images'), index.updateVendorAds);
// router.put('/updateVendorAds', upload.single('all_images'), index.updateVendorAds);

// cohorts connection
router.post('/sendRequestForCohorts', index.sendRequestForCohorts);
router.post('/createUserCohortConnection', index.createUserCohortConnection);
router.post('/setAcceptRejectResponseToCohort', index.setAcceptRejectResponseToCohort);
router.post('/getAllCohortsByUserId', index.getAllCohortsByUserId);
router.post('/getOneUserHadCohortsOrNot', index.getOneUserHadCohortsOrNot);
router.post('/getAllPostingOfMeAndMyCohorts', index.getAllPostingOfMeAndMyCohorts);
router.post('/unfriendCohortUser', index.unfriendCohortUser);
router.post('/searchListCohortOfLoginUser', index.searchListCohortOfLoginUser);

// for post like comment
router.post('/postLikeComment', index.postLikeComment);
router.post('/getLikeOfPost', index.getLikeOfPost);
router.post('/getMediaLikeOfPost', index.getMediaLikeOfPost);
router.post('/getUserLikeData', index.getUserLikeData);
router.post('/unlikeUserPost', index.unlikeUserPost);
router.post('/getUserMediaLikeData', index.getUserMediaLikeData);
router.post('/unlikeUserMediaPost', index.unlikeUserMediaPost);

router.post('/userChangePassword', index.setUserChangePassword);
router.post('/forgetUserPassword', index.setForgetUserPassword);
router.post('/verifyOTPForgetUserPassword', index.setVerifyOTPForgetUserPassword);
router.post('/forgetUserPasswordUpdate', index.setForgetUserPasswordUpdate);
router.post('/forgetUsername', index.setForgetUsername);
router.post('/verifyEmailLink', index.setVerifyLink);

router.post('/contactUsMsg', index.setContactUsMsg);
router.post('/newsSubscribe', index.setNewsSubscribe);
router.post('/confirmNewsSubscribe', index.setConfirmNewsSubscribe);

router.get('/getAllCategory', index.getAllCategory);
router.post('/postCategory', upload.array('all_images'), index.setCategory);
router.post('/getCategoryByNameAndBuyer', index.getCategoryByNameAndBuyer);
router.post('/searchByCategoryName', index.setSearchByCategoryName);
router.post('/getUserPostByCategory', index.getUserPostByCategory);
router.post('/getUserAllPostById', index.getUserAllPostById);
router.post('/getUserAndCohortAllPostById', index.getUserAndCohortAllPostById);
router.post('/deleteUserPostByCategory', index.deleteUserPostByCategory);

// for get post by id
router.post('/getOnePostById', index.getOnePostById);

router.post('/setIAmBuyer', upload.fields([{
    name: 'all_images',
    maxCount: 10
}, {
    name: 'pdfFile',
    maxCount: 1
}]), index.setIAmBuyer);
// router.post('/setIAmBuyer', upload.array('all_images', 10), index.setIAmBuyer);
router.post('/showInterestEmail', index.setShowInterestEmail);
router.post('/showInterestFractionalListingEmail', index.showInterestFractionalListingEmail);

router.post('/uploadCategoryPhotos', upload.array('all_images', 10), index.setUploadCategoryPhotos);
router.post('/getCategoryPhotos', index.getCategoryPhotos);
router.post('/getUserAllPostPhotosById', index.getUserAllPostPhotosById);

router.post('/searchForBuyer', index.setSearchForBuyer);
router.get('/getAllBuyerData', index.getAllBuyerData);

// for pbms
router.post('/setUserMembership', index.setUserMembership);
router.post('/checkAlreadyUserMembership', index.checkAlreadyUserMembership);
router.post('/getAllVerfiedUserForInvitation', index.getAllVerfiedUserForInvitation);
router.post('/createMyPbmsGroup', upload.array('all_images', 10), index.createMyPbmsGroup);
router.post('/getMyPbmsById', index.getMyPbmsById);
router.post('/getOnePbmsById', index.getOnePbmsById);
router.post('/updatePbmsInvitaionReadStatus', index.updatePbmsInvitaionReadStatus);
router.post('/AddMoreNewMemberInGroup', index.AddMoreNewMemberInGroup);
router.post('/deletedMemberInGroup', index.deletedMemberInGroup);
router.post('/deletedPbmsGroupById', index.deletedPbmsGroupById);
router.post('/memberLeaveTheGroup', index.memberLeaveTheGroup);
router.post('/sendRequestForBecomeAdminOfPbms', index.sendRequestForBecomeAdminOfPbms);
router.post('/ChangeStatusOfRequestForBecomeAdminOfPbms', index.ChangeStatusOfRequestForBecomeAdminOfPbms);
// booking pbms property
router.post('/bookPbmsProperty', index.bookPbmsProperty);
router.post('/getOnebookPbmsPropertyById', index.getOnebookPbmsPropertyById);
router.post('/getOnlyOnebookPbmsPropertyById', index.getOnlyOnebookPbmsPropertyById);
router.post('/updateStatusbookPbmsPropertyById', index.updateStatusbookPbmsPropertyById);
router.put('/updatebookPbmsPropertyById', index.updatebookPbmsPropertyById);
// renting pbms property
router.post('/rentingPbmsProperty',upload.single('all_images'), index.rentingPbmsProperty);
router.post('/getOneRentingPbmsPropertyById', index.getOneRentingPbmsPropertyById);
router.put('/updateRentingPbmsPropertyById', index.updateRentingPbmsPropertyById);
router.post('/getOnlyOneRentingPropertyData', index.getOnlyOneRentingPropertyData);
// Chartering pbms property
router.post('/createCharteringPbmsProperty', index.createCharteringPbmsProperty);
router.post('/getOnecharteringPbmsPropertyById', index.getOnecharteringPbmsPropertyById);
router.post('/updateStatusCharteringPbmsPropertyById', index.updateStatusCharteringPbmsPropertyById);
router.post('/getOnlyOneChateringPropertyData', index.getOnlyOneChateringPropertyData);
router.put('/updateChateringPbmsPropertyById', index.updateChateringPbmsPropertyById);
// managing cashflows
router.post('/createManagingCashflowsPbmsProperty', index.createManagingCashflowsPbmsProperty);
router.post('/getOneManagingCashflowsByPbmsPropertyId', index.getOneManagingCashflowsByPbmsPropertyId);
router.put('/updateMnanagingCashflowPbmsPropertyById', index.updateMnanagingCashflowPbmsPropertyById);

// api for fractional share listing
router.get('/getAllFractionalShareListing', index.getAllFractionalShareListing);

router.post('/sendInvitationForBookPost', index.sendInvitationForBookPost);
router.post('/sendRequestForBookPost', index.sendRequestForBookPost);
router.post('/getUserAllInvitationAndRequest', index.getUserAllInvitationAndRequest);
router.post('/getPostCoowners', index.getPostCoowners);

router.post('/createChatId', index.createChatId);
router.post('/chatMessage', index.chatMessage);
router.post('/deleteChatMessage', index.deleteChatMessage);
router.post('/editChatMessage', index.editChatMessage);
router.post('/getAllChatByUserId', index.getAllChatByUserId);
router.post('/getDataByChatId', index.getDataByChatId);

router.post('/showCountOfNotifications', index.showCountOfNotifications);
router.post('/getUserAllInvitationForPortfolio', index.getUserAllInvitationForPortfolio);
router.post('/setReadAtUserAllNotification', index.setReadAtUserAllNotification);
router.post('/listAllContacts', index.listAllContacts);

router.post('/listAllChats', index.listAllChats);

router.post('/markRead', index.markRead);

router.post('/searchForMembers', index.setSearchForMenebers);
router.post('/searchForMembersWithoutCurrentUser', index.searchForMembersWithoutCurrentUser);

router.post('/addNewfields', index.addNewfields);
router.post('/updateFields1By1', index.updateFields1By1);
router.post('/deleteUserPermanentInDB', index.deleteUserPermanentInDB);

router.post('/MakeColumnUnique', index.MakeColumnUnique);
router.get('/wePoGetAllListingForWecownPbmsGroup', index.wePoGetAllListingForWecownPbmsGroup);
router.post('/getAllMyPortFolioDataOfwepo', index.getAllMyPortFolioDataOfwepo);

// end wecoown api's

// start WePo APi's
router.post('/wePoPropertyType', index.setWePoPropertyType);
router.post('/wePoSetSubPropertyType', index.wePoSetSubPropertyType);
router.get('/wePoPropertyType', index.getWePoPropertyType);
router.post('/wePoGetSubPropertyType', index.wePoGetSubPropertyType);
router.post('/wePoPosting', upload.array('all_images', 10), index.setWePoPosting);
router.post('/wePodeletePosting', index.wePodeletePosting);
router.put('/wePoUpdatePosting', upload.array('all_images', 10), index.wePoUpdatePosting);
// for read and get listing
router.post('/wePogetPostingById', index.wePogetPostingById);
router.post('/wePogetAllPosting', index.wePogetAllPosting);
router.post('/wePogetAllPostingByUserId', index.wePogetAllPostingByUserId);
// property type listing for sale
router.post('/wePoListingOffice', upload.array('all_images', 10), index.wePoListingOffice);
router.post('/wePoListingIndustrial', upload.array('all_images', 10), index.wePoListingIndustrial);
router.post('/wePoListingRetail', upload.array('all_images', 10), index.wePoListingRetail);
router.post('/wePoListingRestaurant', upload.array('all_images', 10), index.wePoListingRestaurant);
router.post('/wePoListingShopping', upload.array('all_images', 10), index.wePoListingShopping);
router.post('/wePoListingMultifamily', upload.array('all_images', 10), index.wePoListingMultifamily);
router.post('/wePoListingSpecaility', upload.array('all_images', 10), index.wePoListingSpecaility);
router.post('/wePoListingHospitility', upload.array('all_images', 10), index.wePoListingHospitility);
router.post('/wePoListingHealthCare', upload.array('all_images', 10), index.wePoListingHealthCare);
router.post('/wePoListingSports', upload.array('all_images', 10), index.wePoListingSports);
router.post('/wePoListingLand', upload.array('all_images', 10), index.wePoListingLand);
router.post('/wePoListingTResidential', upload.array('all_images', 10), index.wePoListingTResidential);

router.put('/wePoUpdateListingOffice', upload.array('all_images', 10), index.wePoUpdateListingOffice);
router.put('/wePoUpdateListingIndustrial', upload.array('all_images', 10), index.wePoUpdateListingIndustrial);
router.put('/wePoUpdateListingRetail', upload.array('all_images', 10), index.wePoUpdateListingRetail);
router.put('/wePoUpdateListingRetaurant', upload.array('all_images', 10), index.wePoUpdateListingRetaurant);
router.put('/wePoUpdateListingShopping', upload.array('all_images', 10), index.wePoUpdateListingShopping);
router.put('/wePoUpdateListingMultifamily', upload.array('all_images', 10), index.wePoUpdateListingMultifamily);
router.put('/wePoUpdateListingSpecaility', upload.array('all_images', 10), index.wePoUpdateListingSpecaility);
router.put('/wePoUpdateListingHospitility', upload.array('all_images', 10), index.wePoUpdateListingHospitility);
router.put('/wePoUpdateListingHealthCare', upload.array('all_images', 10), index.wePoUpdateListingHealthCare);
router.put('/wePoUpdateListingOSports', upload.array('all_images', 10), index.wePoUpdateListingOSports);
router.put('/wePoUpdateListingland', upload.array('all_images', 10), index.wePoUpdateListingland);
router.put('/wePoUpdateListingResidential', upload.array('all_images', 10), index.wePoUpdateListingResidential);

router.post('/wePodeleteListingOffice', index.wePodeleteListingOffice);
router.post('/wePodeleteListingIndustrial', index.wePodeleteListingIndustrial);
router.post('/wePodeleteListingRetail', index.wePodeleteListingRetail);
router.post('/wePodeleteListingRestaurant', index.wePodeleteListingRestaurant);
router.post('/wePodeleteListingShopping', index.wePodeleteListingShopping);
router.post('/wePodeleteListingMultifamily', index.wePodeleteListingMultifamily);
router.post('/wePodeleteListingSpecaility', index.wePodeleteListingSpecaility);
router.post('/wePodeleteListingHospitility', index.wePodeleteListingHospitility);
router.post('/wePodeleteListingHealthCare', index.wePodeleteListingHealthCare);
router.post('/wePodeleteListingSports', index.wePodeleteListingSports);
router.post('/wePodeleteListingLand', index.wePodeleteListingLand);
router.post('/wePodeleteListingResidential', index.wePodeleteListingResidential);

// for create, update and delete of real estate, aircraft and yachts form
router.post('/wePoListingRealEstate', upload.fields([{
    name: 'all_images',
    maxCount: 10
}, {
    name: 'pdfFile',
    maxCount: 1
}]), index.wePoListingRealEstate);
router.post('/wePoListingYachts', upload.fields([{
    name: 'all_images',
    maxCount: 10
}, {
    name: 'pdfFile',
    maxCount: 1
}]), index.wePoListingYachts);
router.post('/wePoListingAircraft', upload.fields([{
    name: 'all_images',
    maxCount: 10
}, {
    name: 'pdfFile',
    maxCount: 1
}]), index.wePoListingAircraft);
router.post('/wePoListingCrowdFunding', upload.fields([{
    name: 'all_images',
    maxCount: 10
}, {
    name: 'pdfFile',
    maxCount: 1
}]), index.wePoListingCrowdFunding);

router.post('/wePoListingBusiness', upload.fields([{
    name: 'all_images',
    maxCount: 10
}, {
    name: 'pdfFile',
    maxCount: 1
},{
    name: 'sale_flyer_pdfFile',
    maxCount: 1
}]), index.wePoListingBusiness);
router.post('/wePoListingArtwork', upload.fields([{
    name: 'all_images',
    maxCount: 10
}, {
    name: 'pdfFile',
    maxCount: 1
}]), index.wePoListingArtwork);
router.post('/wePoListingCarsRv', upload.fields([{
    name: 'all_images',
    maxCount: 10
}, {
    name: 'pdfFile',
    maxCount: 1
}]), index.wePoListingCarsRv);

router.post('/wePoListingCrypto', upload.fields([{
    name: 'all_images',
    maxCount: 10
}, {
    name: 'pdfFile',
    maxCount: 1
}]), index.wePoListingCrypto);

router.post('/wePoListingHorsesLive', upload.fields([{
    name: 'all_images',
    maxCount: 10
}, {
    name: 'pdfFile',
    maxCount: 1
}]), index.wePoListingHorsesLive);

router.put('/wePoUpdateListingRealEstate', upload.fields([{
    name: 'all_images',
    maxCount: 10
}, {
    name: 'pdfFile',
    maxCount: 1
}]), index.wePoUpdateListingRealEstate);
router.put('/wePoUpdateListingYachts', upload.fields([{
    name: 'all_images',
    maxCount: 10
}, {
    name: 'pdfFile',
    maxCount: 1
}]), index.wePoUpdateListingYachts);
router.put('/wePoUpdateListingAircraft', upload.fields([{
    name: 'all_images',
    maxCount: 10
}, {
    name: 'pdfFile',
    maxCount: 1
}]), index.wePoUpdateListingAircraft);
router.put('/wePoUpdateListingCrowdFunding', upload.fields([{
    name: 'all_images',
    maxCount: 10
}, {
    name: 'pdfFile',
    maxCount: 1
}]), index.wePoUpdateListingCrowdFunding);
router.put('/wePoUpdateListingBusiness', upload.fields([{
    name: 'all_images',
    maxCount: 10
}, {
    name: 'pdfFile',
    maxCount: 1
},{
    name: 'sale_flyer_pdfFile',
    maxCount: 1
}]), index.wePoUpdateListingBusiness);
router.put('/wePoUpdateListingArtwork', upload.fields([{
    name: 'all_images',
    maxCount: 10
}, {
    name: 'pdfFile',
    maxCount: 1
}]), index.wePoUpdateListingArtwork);
router.put('/wePoUpdateListingCarsRv', upload.fields([{
    name: 'all_images',
    maxCount: 10
}, {
    name: 'pdfFile',
    maxCount: 1
}]), index.wePoUpdateListingCarsRv);

router.put('/wePoUpdateListingCrypto', upload.fields([{
    name: 'all_images',
    maxCount: 10
}, {
    name: 'pdfFile',
    maxCount: 1
}]), index.wePoUpdateListingCrypto);

router.put('/wePoUpdateListingHorsesLive', upload.fields([{
    name: 'all_images',
    maxCount: 10
}, {
    name: 'pdfFile',
    maxCount: 1
}]), index.wePoUpdateListingHorsesLive);

router.put('/wePoUpdateSoldOutListing', index.wePoUpdateSoldOutListing);

router.post('/wePodeleteListingRealEstate', index.wePodeleteListingRealEstate);
router.post('/wePodeleteListingAircraft', index.wePodeleteListingAircraft);
router.post('/wePodeleteListingYachts', index.wePodeleteListingYachts);
router.post('/wePodeleteListingCrowdFunding', index.wePodeleteListingCrowdFunding);
router.post('/wePodeleteListingBusiness', index.wePodeleteListingBusiness);
router.post('/wePodeleteListingCars', index.wePodeleteListingCars);
router.post('/wePodeleteListingArtwork', index.wePodeleteListingArtwork);
router.post('/wePodeleteListingHorses', index.wePodeleteListingHorses);
router.post('/wePodeleteListingCrypto', index.wePodeleteListingCrypto);

router.get('/wePogetRealEsateCount', index.wePogetRealEsateCount);
router.get('/wePogetAircraftCount', index.wePogetAircraftCount);
router.get('/wePogetYachtsCount', index.wePogetYachtsCount);
router.get('/wePogetCrowdFundingCount', index.wePogetCrowdFundingCount);
router.get('/wePogetBusinessCount', index.wePogetBusinessCount);
router.get('/wePogetArtworkCount', index.wePogetArtworkCount);
router.get('/wePogetCarsRvCount', index.wePogetCarsRvCount);
router.get('/wePogetCryptoCount', index.wePogetCryptoCount);
router.get('/wePogetHorsesLiveCount', index.wePogetHorsesLiveCount);

router.post('/wePoSerachForAllSaleAndLease', index.wePoSerachForAllSaleAndLease);
// for sub-type of listing categories
router.post('/wePoGetSubCategoryListing', index.wePoGetSubCategoryListing);
// create wecoown posting by wepo listing
router.post('/setIAmBuyerByWePo', index.setIAmBuyerByWePo);

// create image url for mobile apk
router.post('/uploadImageMobileApk', upload.single('all_images'), index.uploadImageMobileApk);

//Country State City Api fetch
router.get('/getAllCountry', index.getAllCountry);
router.post('/getStateByCountry', index.getStateByCountry);
router.post('/getCityByCountryAndState', index.getCityByCountryAndState);

//Country State City Api save
// router.post('/postAllCountry', index.postAllCountry);
// router.post('/postAllState', index.postAllState);
// router.post('/postAllCities', index.postAllCities);

router.get('/getAllCountrySave', index.getAllCountrySave);
router.get('/getAllStateSave', index.getAllStateSave);
router.get('/getAllCitiesSave', index.getAllCitiesSave);

//Api for translate
router.post('/wepo-translate', index.translateApi);
router.post('/wepo-translate-string', index.translateAPIString);

module.exports = router;