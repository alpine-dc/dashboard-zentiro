const Models = require('../../models')
const bcrypt = require('bcrypt');

class admin {
    static loginPage(req, res) {
        res.render('auth/login', {
            title: 'Login',
            layout: false
        });
    }

    static login(req, res) {
        let user_id;
        let username;
        let role;
        Models.user
            .findOne({
                where: {
                    email: req.body.email,
                },
            })
            .then((data_user) => {
                if(!data_user) {
                    req.flash('msg_error', `Your Email not found!`);
                    res.redirect('/login');
                } else {
                    user_id = data_user.id;
                    username = data_user.name;
                    role = data_user.role;
					if(role.toLowerCase() == 'admin'){
						let isValid = bcrypt.compareSync(req.body.password, data_user.password)
						if(isValid) {
							req.session.loggedin = true;
							req.session.username = username;
							req.session.user_id = user_id;
							req.session.permissionLevel = role;
							res.redirect('/home');
						} else {
							req.flash('msg_error', `Your password is wrong`);
							res.redirect('/login');
						}
					}
					else{
						req.flash('msg_error', `Unauthorized`);
						res.redirect('/login');
					}
                }
            })
            .catch((err) => {
                req.flash('msg_error', err.message || "Some error occurred while login.");
                res.redirect('/login');
            })
    }

    static findAll(req, res) {
        Models.user
            .findAll({
                where :{
                    role: 'admin'
                },
                raw: true
            })
            .then((data) => {
                res.render('admin/index', {
                    results: data,
                    title: 'Admin',
                    admin_active: 'active',
                    configuration_active: 'active',
                    configuration_menu_open: 'menu-open'
                });
            })
            .catch((err) => {
                req.flash('msg_error', err.message || "Some error occured while find User Admin");
                res.render('admin/index', {
                    title: 'Admin',
                    admin_active: 'active',
                    configuration_active: 'active',
                    configuration_menu_open: 'menu-open'
                });
            })
    }

    static async getCreate(req, res) {
        var roles = await Models.Role.findAll({ raw: true });

        var data_default = {
            role: "",
        };

        res.render('admin/create', {
            results: data_default,
            roles: roles,
            title: 'Admin',
            admin_active: 'active',
            configuration_active: 'active',
            configuration_menu_open: 'menu-open'
        });
    }

    static async createAdmin(req, res) {
        try {
            const salt = bcrypt.genSaltSync();

            var password = bcrypt.hashSync(req.body.password, salt);
            req.body.password = password;

            const createdUser = await Models.user.create({
                name: req.body.name,
                phone_number: req.body.phone,
                email: req.body.email,
                role: 'admin',
                password: req.body.password,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            res.status(201).send({ status: 'Success', data: createdUser });
        } catch (error) {
            console.log(error);
        }
    }

    static create(req, res) {
        // Validate request
        const salt = bcrypt.genSaltSync();

        var password = bcrypt.hashSync(req.body.password, salt);
        req.body.password = password;
        req.body.role = 'admin';
        if (!req.body.email) {
            req.flash('msg_error', `Email can not be empty`);
            res.render('admin/create', {
                title: 'Admin',
                results: req.body,
                admin_active: 'active',
                configuration_active: 'active',
                configuration_menu_open: 'menu-open'
            });
            return;
        }

        // Save admin in the database
        Models.user.create(req.body)
            .then((data) => {
                req.flash('msg_info', "Admin was created successfully");
                res.redirect('/admin');
            }).catch((err) => {
                req.flash('msg_error', err.message || "Some error occurred while creating the Admin.");
                res.redirect('/admin');
            });
    }

    static update(req, res) {
        const id = req.params.id;

        Models.user.update(req.body, {
            where: {
                id: id
            }
        }).then((result) => {
            if (result == 1) {
                if (id == req.session.user_id) {
                    req.session.username = req.body.username;
                }

                req.flash('msg_info', `User Admin was updated successfully`);
                res.redirect('/admin');
            } else {
                req.flash('msg_error', `Cannot update User Admin with id=${id}.`);
                res.redirect('/admin');
            }
        }).catch((err) => {
            req.flash('msg_error', err.message || "Error updating User Admin with id=" + id);
            res.redirect('/admin');
        });
    }

    static async findOne(req, res) {
        const id = req.params.id
        // const roles = await Models.Role.findAll({ raw: true })
        Models.user
            .findByPk(req.params.id)
            .then((data) => {
                res.render('admin/edit', {
                    id: id,
                    results: data.dataValues,
                    // roles: roles,
                    title: 'Admin',
                    admin_active: 'active',
                    configuration_active: 'active',
                    configuration_menu_open: 'menu-open'
                });
            }).catch((err) => {
                req.flash('msg_error', err.message || "Error retrieving User Admin with id=" + id);
                res.render('admin/edit', {
                    title: 'Admin',
                    admin_active: 'active',
                    configuration_active: 'active',
                    configuration_menu_open: 'menu-open'
                });
            });
    }

    static changePassword(req, res) {
        const id = req.session.user_id;
        Models.user
            .findByPk(id)
            .then((data) => {
                res.render('admin/changepassword_profile', {
                    id: id,
                    results: data.dataValues,
                    title: 'Change Password Profile',
                    profile_active: 'active'
                });
            }).catch((err) => {
                req.flash('msg_error', err.message || "Error retrieving User Admin with id=" + id);
                res.render('admin/changepassword_profile', {
                    title: 'Change Password Profile',
                    profile_active: 'active'
                });
            });
    }

    static updatePassword(req, res) {
        const id = req.params.id;

        // Validate request
        if (!req.body.new_password) {
            req.flash('msg_error', `new_password can not be empty`);
            res.render('admin/changepassword_profile', {
                id: id,
                results: req.body,
                title: 'Change Password Profile',
                profile_active: 'active'
            });
            return;
        }

        if (!req.body.confirm_password) {
            req.flash('msg_error', `Confirm password can not be empty`);
            res.render('admin/changepassword_profile', {
                id: id,
                results: req.body,
                title: 'Change Password Profile',
                profile_active: 'active'
            });
            return;
        }

        if (req.body.new_password != req.body.confirm_password) {
            req.flash('msg_error', `New password and confirmation password are not the same!`);
            res.render('admin/changepassword_profile', {
                id: id,
                results: req.body,
                title: 'Change Password Profile',
                profile_active: 'active'
            });
            return;
        }

        const salt = bcrypt.genSaltSync();
        var password = bcrypt.hashSync(req.body.new_password, salt);

        Models.user.update({
            password: password
        }, {
            where: {
                id: id
            }
        }).then((result) => {
            if (result == 1) {
                req.flash('msg_info', `Your Password was updated successfully`);
                res.redirect('/profile');
            } else {
                req.flash('msg_error', `Cannot update Your Password`);
                res.redirect('/profile');
            }
        }).catch((err) => {
            req.flash('msg_error', err.message || "Error updating User Admin with id=" + id);
            res.redirect('/profile');
        });
    }

    static changePasswordPage(req, res) {
        const id = req.params.id;

        Models.user.findByPk(id)
            .then((data) => {
                res.render('admin/changepassword', {
                    id: id,
                    results: data.dataValues,
                    title: 'Admin',
                    admin_active: 'active',
                    configuration_active: 'active',
                    configuration_menu_open: 'menu-open'
                });
            }).catch((err) => {
                req.flash('msg_error', err.message || "Error retrieving admin with id=" + id);
                res.render('admin/changepassword', {
                    title: 'Admin',
                    admin_active: 'active',
                    configuration_active: 'active',
                    configuration_menu_open: 'menu-open'
                });
            });
    }

    static changePasswordSpesific(req, res) {
        const id = req.params.id;

        // Validate request
        if (!req.body.new_password) {
            req.flash('msg_error', `new_password can not be empty`);
            res.redirect('/admin/changepassword/' + id);
            return;
        }

        if (!req.body.confirm_password) {
            req.flash('msg_error', `confirm_password can not be empty`);
            res.redirect('/admin/changepassword/' + id);
            return;
        }

        if (req.body.new_password != req.body.confirm_password) {
            req.flash('msg_error', `New password and confirmation password are not the same!`);
            res.redirect('/admin/changepassword/' + id);
            return;
        }

        const salt = bcrypt.genSaltSync();
        var password = bcrypt.hashSync(req.body.new_password, salt);

        Models.user.update({
            password: password
        }, {
            where: {
                id: id
            }
        }).then((result) => {
            if (result == 1) {
                req.flash('msg_info', `The Password was updated successfully`);
                res.redirect('/admin/edit/' + id);
            } else {
                req.flash('msg_error', `Cannot update Password`);
                res.redirect('/admin/edit/' + id);
            }
        }).catch((err) => {
            req.flash('msg_error', err.message || "Error updating User with id=" + id);
            res.redirect('/admin/edit/' + id);
        });
    }

    static delete(req, res) {
        const id = req.body.admin_id;

        Models.user.destroy({
            where: {
                id: id
            }
        }).then((result) => {
            if (result == 1) {
                req.flash('msg_info', "User Admin was deleted successfully");
                res.redirect('/admin');
            } else {
                req.flash('msg_error', `Cannot delete User Admin with id=${id}`);
                res.redirect('/admin');
            }
        }).catch((err) => {
            req.flash('msg_error', err.message || "Could not delete admin with id=" + id);
            res.redirect('/admin');
        });
    }

    static logout(req, res) {
        req.session.destroy();
        res.redirect('/login');
    }
}

module.exports = admin;