const router = require("express").Router();
const bannerCms = require("../controller/banner");

// const multer = require("multer");
// const fs = require("fs");
// const slug = require("slug");
// const path_node = require("path");
const ValidationMiddleware = require("../middlewares/auth.validation.middleware");

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const path = `Public/product`;
//         fs.mkdirSync(path, { recursive: true });
//         return cb(null, path);
//     },
//     filename: (req, file, cb) => {
//         const id = req.params.user_id;
//         var fileoriginalname = file.originalname;
//         var filename = slug(fileoriginalname.split(".").slice(0, -1).join("."));
//         var filetype = path_node.extname(fileoriginalname);
//         cb(null, filename + Date.now() + filetype);
//     },
// });

// var upload = multer({ storage: storage });

router.get('/banner', [ValidationMiddleware.validLogin, bannerCms.bannerPage]);
router.get('/banner/upload', [ValidationMiddleware.validLogin, bannerCms.getCreate]);
router.post('/banner/upload', [ValidationMiddleware.validLogin, bannerCms.uploadBanner]);
router.get("/banner/edit/:id", [ValidationMiddleware.validLogin, bannerCms.findOne]);
router.post("/banner/edit/:id", [ValidationMiddleware.validLogin, bannerCms.updateBanner]);
router.post('/banner/delete', [ValidationMiddleware.validLogin, bannerCms.delete]);

module.exports = router;