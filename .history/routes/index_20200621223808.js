var express = require('express');
const upload = require('../utils/upload');
const { loadOriginals, saveOriginals } = require('../utils/data');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/originals', function(req, res, next) {
    const original = loadOriginals();
    res.render("originals", { images: original, path: '/images/originals/' });
})

router.post("/upload", ((req, res, next) => {
    upload(req, res, function(err) {
        if (err || !req.file) {
            return res.render("index", { error: "error" })
        }
        const original = loadOriginals();
        original.push({ filename: req.file.filename })
        saveOriginals(original);
        res.render("originals", { images: original, path: '/images/originals/' })
    })
}));

module.exports = router;