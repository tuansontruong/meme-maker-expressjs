var express = require('express');
const upload = require('../utils/upload');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Meme Generator' });
});

router.post("/upload", ((req, res, next) => {
    upload(req, res, function(err) {
        if (err) {
            res.send("not oke", err);
        }
        res.send("oke");
        // Everything went fine.
    })
}));

module.exports = router;