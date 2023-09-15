const express = require("express");
const multer = require("multer");
var zopfli = require('node-zopfli');
const fs = require('fs');

const upload = multer()
const app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.get('/', (req, res) => {
    res.render("upload")
})

app.post('/upload', upload.single('file'), function (req, res, next) {
    const file = req.file;

    const options = {
        verbose: false,
        verbose_more: false,
        numiterations: 15,
        blocksplitting: true,
        blocksplittinglast: false,
        blocksplittingmax: 15
    }

    fs.createReadStream(file.originalname)
    .pipe(zopfli.createGzip(options))
    .pipe(fs.createWriteStream(`${file.originalname}.gz`));

    res.redirect("/");
})

app.listen(port);

