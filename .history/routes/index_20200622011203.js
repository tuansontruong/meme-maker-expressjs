var express = require('express');
const upload = require('../utils/upload');
const { loadOriginals, saveOriginals } = require('../utils/data');
var router = express.Router();
var Jimp = require('jimp');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/originals', function(req, res, next) {
    const original = loadOriginals();
    res.render("originals", { images: original, path: '/images/originals/' });
})


router.post("/upload", upload.single("fileupload"), ((req, res, next) => {
    if (!req.file) {
        return res.render("index", { error: "error" })
    }
    const original = loadOriginals();
    original.push({ filename: req.file.filename })
    saveOriginals(original);
    res.render("originals", { images: original, path: '/images/originals/' })

}));

router.post("/uploadMeme", ((req, res, next) => {
    let header = req.body.header;
    let footer = req.body.footer;
    console.log(req.body.imgSrc);
    //     Jimp.read('./path/to/image.jpg')
    //   .then(image => {
    //     // Do stuff with the image.
    //   })
    //   .catch(err => {
    //     // Handle an exception.
    //   });
}))

module.exports = router;