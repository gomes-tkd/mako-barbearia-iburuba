const router = require("express").Router();
const GalleryController = require("../controller/GalleryController");

// middlewares
const verifyToken = require("../helpers/verify-token");
const { imageUpload } = require("../helpers/image-upload");

router.post("/postphotos", verifyToken, imageUpload.array("images"),GalleryController.postPhotos);
router.post("/postphoto", verifyToken, imageUpload.single("image"),GalleryController.postPhoto);
router.get("/:id", GalleryController.getPhotoById);

router.get("/", GalleryController.getAllGalleryPhotos);

module.exports = router;

