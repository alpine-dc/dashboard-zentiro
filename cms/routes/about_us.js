const router = require("express").Router();
const about = require("../controller/about_us");
const ValidationMiddleware = require("../middlewares/auth.validation.middleware");

router.get("/about-us", [ValidationMiddleware.validLogin, about.aboutPage]);
router.get("/about-us/create", [ValidationMiddleware.validLogin, about.getCreate]);
router.post("/about-us/create", [ValidationMiddleware.validLogin, about.createAbout]);
router.get("/about-us/detail/:id", [ValidationMiddleware.validLogin, about.detail]);
router.get("/about-us/edit/:id", [ValidationMiddleware.validLogin, about.edit]);
router.post("/about-us/edit/:id", [ValidationMiddleware.validLogin, about.update]);
router.post("/about-us/delete", [ValidationMiddleware.validLogin, about.delete]);

module.exports = router;
