const express = require('express');
const router = express.Router();
const testCont = require('../controllers/testController');

router.get('/', testCont.getTest);
router.post('/register', testCont.postTest);


module.exports = router;