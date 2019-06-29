const express = require('express');
const router = express.Router();

const landingControlMoks = require('../controllers/landingContMoks');





//My(MAKSIM) Test Code
router.get('/user',landingControlMoks.authentication);
router.get('/logout',landingControlMoks.logout);

router.get('/loginmoks',landingControlMoks.getLogin);
router.post('/loginmoks',landingControlMoks.postLogin);

router.get('/', landingControlMoks.getMoksLand);
router.post('/moks', landingControlMoks.postMoksland);

router.get('/moks/:name',landingControlMoks.getAvatar);

module.exports = router;