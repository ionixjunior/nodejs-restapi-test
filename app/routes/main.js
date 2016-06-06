var express = require('express');
var router  = express.Router();

router.use(function (req, res, next) {
    console.log('REQUEST...');
    next();
});

module.exports = router;
