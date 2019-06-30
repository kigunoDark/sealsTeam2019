var express = require('express');
var router = express.Router();
var gameControl = require('../controllers/gameController');

router.get('/friendFish', gameControl.getFishing);
router.get('/acceptFish', gameControl.getAcceptFishing);
router.get('/password-lesson', gameControl.getPasswordLesson);
router.get('/fishing-lesson', gameControl.getFishingPageLesson);
router.get('/ciberlexa', gameControl.getMenu);
router.post('/frend-fish', gameControl.postFish);
router.post('/friendFish', gameControl.postFish);

router.get('/fishingQuestion', gameControl.getQuestion);
//test
router.get('/friend/:link', gameControl.getFishPage);

module.exports = router;
