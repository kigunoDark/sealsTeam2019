var express = require('express');
var router = express.Router();
var gameControl = require('../controllers/gameController');

router.get('/friendFish', gameControl.getFishing);
router.get('/acceptFish', gameControl.getAcceptFishing);
router.get('/index', gameControl.getMenu);
router.post('/frend-fish',  gameControl.postFish);

module.exports =  router;