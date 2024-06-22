const multer = require("multer");
const path = require("path");

const regexFinalImageName = /\.(png|jpg|jpeg|svg)$/;

//destination to store the images
const imageStore = multer.diskStorage({
    destination: function (req, res, cb) {
        let folder = "";

        console.log(req.baseUrl);

        if (req.baseUrl.includes("user")) {
            folder = "user";
        } else if (req.baseUrl.includes("gallery")) {
            folder = "gallery";
        }

        cb(null, `public/images/${folder}`);
    },

    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() +
            String(Math.floor(Math.random() * 100)) +
            path.extname(file.originalname)
        );
    },
});

const imageUpload = multer({
    storage: imageStore,
    fileFilter(req, file, cb)  {
        if (!file.originalname.match(regexFinalImageName)) {
            return cb(new Error("Por favor, envie a imagem em um dos fomatos: PNG | JPG"));
        }

        // if no more filters, let's do it
        cb(undefined, true);
    }
});

module.exports = { imageUpload };
