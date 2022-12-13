const router = require("express").Router();
const cat = require("../controller/category");
const ValidationMiddleware = require("../middlewares/auth.validation.middleware");

router.get("/category", [ValidationMiddleware.validLogin, cat.catPage]);
router.get("/category/create", [ValidationMiddleware.validLogin, cat.getCreate]);
router.post("/category/create", [ValidationMiddleware.validLogin, cat.createCat]);
router.get("/category/detail/:id", [ValidationMiddleware.validLogin, cat.detail]);
router.get("/category/edit/:id", [ValidationMiddleware.validLogin, cat.edit]);
router.post("/category/edit/:id", [ValidationMiddleware.validLogin, cat.update]);
router.post("/category/delete", [ValidationMiddleware.validLogin, cat.delete]);

module.exports = router;
