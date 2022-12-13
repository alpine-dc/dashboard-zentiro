const jwtConvert = require('../helpers/jwtConvert');
const db = require('../../models');
const User = db.User;

exports.validLogin = (req, res, next) => {
    if (req.session.loggedin) {
        return next();
    } else {
        req.flash('msg_error', `Please login first`);
        res.redirect('/login');
    }
};

exports.validLogin2 = (req, res, next) => {
    if (req.session.loggedin) {
        res.redirect('/home');
    } else {
        return next();
    }
};

exports.validJWTNeeded = (req, res, next) => {
    if (req.headers.authorization) {
        try {
            let authorization = req.headers.authorization;
            req.jwt = jwtConvert.verify(authorization);
            return next();

        } catch (err) {
            return res.status(403).send({
                message: err
            });
        }
    } else {
        return res.status(401).send({
            message: "Unauthorized"
        });
    }
};

// public async getJWTPayload(accessToken: string): Promise<any> {
//     const isValid = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
//     return isValid;
// }

// public async parseBearerAuth(bearer: string): Promise<{ accessToken: string }> {
//     const authorization = bearer;

//     if (authorization && authorization.split(' ')[0] === 'Bearer') {
//         const accessToken = authorization.split(' ')[1];
//         if (accessToken) {
//             return { accessToken };
//         }
//     }

//     this.log.info('No credentials provided by the client');
//     return undefined;
// }

// public async getUserIdByJWTPayload(authorization: string): Promise<string | undefined> {
//     const credentials = await this.parseBearerAuth(authorization);
//     const payload = await this.getJWTPayload(credentials.accessToken);
//     const userIdKey = 'id';
//     return payload[userIdKey];
// }

// exports.getUserIdByJWTPayload = (req, res, next) => {
//     if (req.headers.authorization) {
//         try {
//             const auth = req.headers.authorization;

//             customer.findOne({
//                 where: {
//                     token: auth,
//                 },
//             })
//             .then((data) => {
//                 console.log(data);
//                 return data.id;
//             })
//             .catch((err) => {
//                 return err;
//             });
//         } catch (err) {
//             return res.status(403).send({
//                 message: err,
//             });
//         }
//     } else {
//         return res.status(401).send({
//             message: "Unauthorized"
//         });
// };

exports.getUserIdByJWTPayload = (req, res, next) => {
    // console.log(req);
    if (req) {
        // console.log('masuk')
        try {
            // let authorization = req;

            db.customers.findOne({
                where: {
                    token: req
                },
            })
                .then((data_user) => {
                    console.log(data_user.dataValues);
                    return data_user.dataValues.id;
                })
                .catch((err) => {
                    res.status(400).send({
                        message: err || "Some error occured login Users"
                    })
                })

        } catch (err) {
            console.log(err)
            return res.status(403).send({
                message: err
            });
        }
    } else {
        return res.status(401).send({
            message: "Unauthorized"
        });
    }
};

exports.validJWTNeededAndCheckUser = (req, res, next) => {
    if (req.headers.authorization) {
        try {
            let authorization = req.headers.authorization;

            db.customers.findOne({
                where: {
                    token: authorization
                },
            })
                .then((data_user) => {
                    if (!data_user) {
                        res.status(400).json({
                            message: 'Expired token'
                        })
                    } else {
                        req.jwt = jwtConvert.verify(authorization);
                        return next();
                    }
                })
                .catch((err) => {
                    res.status(400).send({
                        message: err || "Some error occured login Users"
                    })
                })

        } catch (err) {
            return res.status(403).send({
                message: err
            });
        }
    } else {
        return res.status(401).send({
            message: "Unauthorized"
        });
    }
};
exports.validJWTNeededAndCheckAdmin = (req, res, next) => {
    if (req.headers.authorization) {
        try {
            let authorization = req.headers.authorization;

            db.users.findOne({
                where: {
                    remember_token: authorization
                },
            })
                .then((data_user) => {
                    if (!data_user) {
                        res.status(400).json({
                            message: 'Expired token'
                        })
                    } else {
                        req.jwt = jwtConvert.verify(authorization);
                        return next();
                    }
                })
                .catch((err) => {
                    res.status(400).send({
                        message: err || "Some error occured login Users"
                    })
                })

        } catch (err) {
            return res.status(403).send({
                message: err
            });
        }
    } else {
        return res.status(401).send({
            message: "Unauthorized"
        });
    }
};

const ADMIN_PERMISSION = 3;

exports.minimumPermissionLevelRequired = (required_permission_level) => {
    return (req, res, next) => {
        let user_permission_level = parseInt(req.session.permissionLevel);
        if (user_permission_level >= required_permission_level) {
            return next();
        } else {
            req.flash('msg_error', "Invalid Permission, because user permission_level = " + user_permission_level + ", required minimum permission_level = " + required_permission_level);
            res.redirect('/login');
        }
    };
};

exports.PermissionLevelRequired = (required_permission_level) => {
    return (req, res, next) => {
        let user_permission_level = parseInt(req.session.permissionLevel);
        if (user_permission_level == required_permission_level) {
            return next();
        } else {
            req.flash('msg_error', "Invalid Permission, because user permission_level = " + user_permission_level + ", required minimum permission_level = " + required_permission_level);
            res.redirect('/login');
        }
    };
};

exports.MultiPermissionLevelRequiredOrAdmin = (required_permission_level) => {
    return (req, res, next) => {
        var ADMIN_PERMISSION = 3;
        let user_permission_level = parseInt(req.session.permissionLevel);

        var values = required_permission_level.split(',');
        var length = values.length;
        var check = 0;

        for (var i = 0; i < length; i++) {
            if (user_permission_level == values[i]) {
                check = 1;
            }
        }

        if (check == 1) {
            return next();
        } else {
            if (user_permission_level == ADMIN_PERMISSION) {
                return next();
            } else {
                req.flash('msg_error', "Invalid Permission, because user permission_level = " + user_permission_level + ", required minimum permission_level = " + required_permission_level);
                res.redirect('/login');
            }
        }
    };
};

exports.onlySameUserOrAdminCanDoThisAction = (req, res, next) => {
    let user_permission_level = parseInt(req.jwt.permissionLevel);
    let user_id = req.jwt.user_id;
    if (req.params.user_id == user_id || req.body.user_id == user_id) {
        return next();
    } else {
        if (user_permission_level >= ADMIN_PERMISSION) {
            return next();
        } else {
            return res.status(403).send({
                message: "Invalid Permission, Because only same User Or Admin can do this action"
            });
        }
    }

};

exports.sameUserCantDoThisAction = (req, res, next) => {
    let user_id = req.jwt.user_id;

    if (req.params.user_id !== user_id) {
        return next();
    } else {
        return res.status(400).send();
    }

};