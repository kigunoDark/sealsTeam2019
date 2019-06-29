const express = require('express');
const router = express.Router();

const landingControlMoks = require('../controllers/landingContMoks');





//My(MAKSIM) Test Code
router.get('/user',landingControlMoks.authentication);
router.get('/logout',landingControlMoks.logout);
router.get('/loginmoks',landingControlMoks.getLogin);
router.get('/', landingControlMoks.getMoksLand);
router.get('/moks/:name',landingControlMoks.getAvatar);
router.get('/user-register', landingControlMoks.getReginster);

router.post('/loginmoks',landingControlMoks.postLogin);
router.post('/moks', landingControlMoks.postMoksland);


module.exports = router;