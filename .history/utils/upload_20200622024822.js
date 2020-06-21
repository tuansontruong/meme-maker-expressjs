const multer = require("multer");
const path = require("path");

const pathToOriginal = path.join(__dirname, '../public/images/originals/')
const fs = require('fs');


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, pathToOriginal)
    },
    filename: function(req, file, cb) {
        let duplicate = false;
        fs.readdir(pathToOriginal, (err, files) => {
            files.forEach(currentfile => {
                console.log(currentfile.split("-")[1] === file.originalname)
            });
        });
        if (duplicate) {
            return cb(new Error("Duplicated Image", null))
        }
        const allow = ["image/jpg", "image/gif", "image/png", "image/jpeg"];
        if (!allow.includes(file.mimetype)) {
            return cb(new Error("file is not allowed", null))
        }
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage })

module.exports = upload;