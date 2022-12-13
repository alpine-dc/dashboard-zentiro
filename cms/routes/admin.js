const express = require('express');
const router = express.Router();

const admin = require('../controller/admin');

// const multer = require('multer');
// const fs = require('fs');
// const slug = require('slug');
// const path_node = require('path');
const ValidationMiddleware = require('../middlewares/auth.validation.middleware');

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const path = `Public/File/CMS_Profile`
//         fs.mkdirSync(path, { recursive: true })
//         return cb(null, path)
//     },
//     filename: (req, file, cb) => {
//         const id = req.params.user_id
//         var fileoriginalname = file.originalname;
//         var filename = slug(fileoriginalname.split('.').slice(0, -1).join('.'));
//         var filetype = path_node.extname(fileoriginalname);
//         cb(null, `${filename}-cms_profile-` + Date.now() + '.jpg');
//     }
// });

// var upload = multer({ storage: storage });

/* GET home page. */
router.get('/login', [ValidationMiddleware.validLogin2, admin.loginPage]);
router.post('/login', [ValidationMiddleware.validLogin2, admin.login]);
router.get('/logout', admin.logout);
// router.get('/profile', [ValidationMiddleware.validLogin, admin.profile])

// router.post('/edit_profile/:id', [ValidationMiddleware.validLogin, upload.single('photo'), admin.updateProfile])
router.get('/admin/create', [ValidationMiddleware.validLogin, admin.getCreate]);
router.post('/admin', admin.createAdmin);
// router.post('/admin/create', [ValidationMiddleware.validLogin, upload.single('photo'),admin.create])
router.post('/admin/delete', [ValidationMiddleware.validLogin, admin.delete]);
router.get('/admin', [ValidationMiddleware.validLogin, admin.findAll]);
router.get('/admin/edit/:id', [ValidationMiddleware.validLogin, admin.findOne]);
router.get('/admin/changepassword/:id', [ValidationMiddleware.validLogin, admin.changePasswordPage]);
router.post('/admin/changepassword/:id', [ValidationMiddleware.validLogin, admin.changePasswordSpesific]);
// router.post('/admin/edit/:id', [ValidationMiddleware.validLogin, upload.single('photo'), admin.update])
router.get('/changepassword_profile', [ValidationMiddleware.validLogin, admin.changePassword]);
router.post('/changepassword_profile/:id', [ValidationMiddleware.validLogin, admin.updatePassword]);

module.exports = router;
