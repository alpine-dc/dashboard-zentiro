const router = require("express").Router();
const tnc = require("../controller/term_condition");
const ValidationMiddleware = require("../middlewares/auth.validation.middleware");

router.get("/tnc", [ValidationMiddleware.validLogin, tnc.tncPage]);
router.get("/tnc/create", [ValidationMiddleware.validLogin, tnc.getCreate]);
router.post("/tnc/create", [ValidationMiddleware.validLogin, tnc.createTnc]);
router.get("/tnc/detail/:id", [ValidationMiddleware.validLogin, tnc.detail]);
router.get("/tnc/edit/:id", [ValidationMiddleware.validLogin, tnc.edit]);
router.post("/tnc/edit/:id", [ValidationMiddleware.validLogin, tnc.update]);
router.post("/tnc/delete", [ValidationMiddleware.validLogin, tnc.delete]);

module.exports = router;
