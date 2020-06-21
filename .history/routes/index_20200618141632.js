var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Meme Generator' });
});

router.post("/upload", ((req, res, next) => {
            upload(req, res, function(err) {

                // Everything went fine.
            })
        })

        module.exports = router;