const router = require("express").Router();
const faq = require("../controller/faq");
const ValidationMiddleware = require("../middlewares/auth.validation.middleware");

router.get("/faqs", [ValidationMiddleware.validLogin, faq.faqPage]);
router.get("/faqs/create", [ValidationMiddleware.validLogin, faq.getCreate]);
router.post("/faqs/create", [ValidationMiddleware.validLogin, faq.createFaq]);
router.get("/faqs/detail/:id", [ValidationMiddleware.validLogin, faq.detail]);
router.get("/faqs/edit/:id", [ValidationMiddleware.validLogin, faq.edit]);
router.post("/faqs/edit/:id", [ValidationMiddleware.validLogin, faq.update]);
router.post("/faqs/delete", [ValidationMiddleware.validLogin, faq.delete]);

module.exports = router;
