var express = require('express');
const upload = require('../utils/upload');
const path = require("path");

const pathToMemes = path.join(__dirname, '../public')
const { loadOriginals, saveOriginals, loadMemes, saveMemes } = require('../utils/data');
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
    let img = req.body.imgSrc;
    Jimp.read(pathToMemes + img, (err, meme) => {
        let w = meme.bitmap.width;
        let h = meme.bitmap.height;
        if (err) return res.render("index", { error: err })
        Jimp.loadFont(Jimp.FONT_SANS_32_WHITE)
            .then(font => {
                meme.print(font, w / 2 - Jimp.measureText(font, header) / 2, 10, header);
                meme.print(font, w / 2 - Jimp.measureText(font, header) / 2, h - 50, footer)
                let name = Date.now() + '.png'
                meme.write('public/images/memes/' + name); // save
                const memes = loadMemes();
                memes.push({ filename: name })
                saveMemes(memes)
                console.log(memes);
                res.render("memes", { images: memes, path: '/images/memes/' })
            })

    });



}))

module.exports = router;