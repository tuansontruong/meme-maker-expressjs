const multer = require("multer");
const path = require("path");

const pathToOriginal = path.join(__dirname, '../public/images/originals/')
const fs = require('fs');


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, pathToOriginal)
    },
    filename: function(req, file, cb) {
        fs.readdir(pathToOriginal, (err, files) => {
            for (let i = 0; i < files.length; i++) {

                if (files[i].split("-")[1] === file.originalname) {
                    return cb(new Error("Duplicated Image", null))
                }
            }
            const allow = ["image/jpg", "image/gif", "image/png", "image/jpeg"];
            if (!allow.includes(file.mimetype)) {
                return cb(new Error("file is not allowed", null))
            }
            cb(null, Date.now() + '-' + file.originalname)
        });


    }
})

var upload = multer({ storage: storage })

module.exports = upload;