const router = require("express").Router();
const prod = require("../controller/product");
const ValidationMiddleware = require("../middlewares/auth.validation.middleware");

router.get("/products", [ValidationMiddleware.validLogin, prod.productPage]);
router.get("/products/create", [ValidationMiddleware.validLogin, prod.getCreate]);
router.post("/products/create", [ValidationMiddleware.validLogin, prod.createProduct]);
router.get("/products/detail/:id", [ValidationMiddleware.validLogin, prod.detail]);
router.get("/products/edit/:id", [ValidationMiddleware.validLogin, prod.edit]);
router.post("/products/edit/:id", [ValidationMiddleware.validLogin, prod.update]);
router.post("/products/delete", [ValidationMiddleware.validLogin, prod.delete]);

module.exports = router;
