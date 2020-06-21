var express = require('express');
const upload = require('../utils/upload');
const { loadOriginals, saveOriginals } = require('../utils/data');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Meme Generator' });
});

router.post("/upload", ((req, res, next) => {
    upload(req, res, function(err) {
        if (err || !req.file) {
            res.send("not oke");
        }

        console.log(req.file);
        const original = loadOriginals();
        original.push({ filename: req.file.filename })
        saveOriginals(original)
        res.send("oke");
        // Everything went fine.
    })
}));

module.exports = router;