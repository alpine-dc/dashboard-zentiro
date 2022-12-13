const Models = require("../../models");

class TnC {
    static async tncPage(req, res) {
        Models.term_condition
        .findAll({
            order: [['createdAt', 'DESC']],
            raw: true,
        })
        .then((data) => {
            res.render("tnc", {
                results: data,
                title: "Term and Condition",
                tnc_active: "active",
            });
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Some error occured while find Term and Condition!");
            res.render("tnc", {
                title: "Term and Condition",
                tnc_active: "active",
            });
        });
    }

    static async detail(req, res) {
        const id = req.params.id;

        Models.term_condition
        .findByPk(req.params.id)
        .then((data) => {
            res.render("tnc/detail", {
                id: id,
                results: data.dataValues,
                title: "Term and Condition",
                tnc_active: "active",
            });
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Error retrieving Term and Condition with id=" + id);
            res.render("tnc/detail", {
                title: "Term and Condition",
                tnc_active: "active",
            });
        });
    }

    static async getCreate(req, res) {
        var tnc = await Models.term_condition.findAll({ raw: true });

        var data_default = {
            term: "",
        };

        res.render("tnc/create", {
            results: data_default,
            tnc: tnc,
            title: "Term and Condition",
            tnc_active: "active",
        });
    }

    static createTnc(req, res) {
        Models.term_condition
        .create({
            ...req.body,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        .then((result) => {
            req.flash("msg_info", "Term and Condition was created successfully.");
            res.redirect("/tnc");
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Some error occurred while creating the Term and Condition!");
            res.redirect("/tnc");
        });
    }

    static edit(req, res) {
        const id = req.params.id;

        Models.term_condition
        .findByPk(req.params.id)
        .then((data) => {
            res.render("tnc/edit", {
                id: id,
                results: data.dataValues,
                title: "Term and Condition",
                tnc_active: "active",
            });
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Error retrieving Term and Condition with id=" + id);
            res.render("tnc/edit", {
                title: "Term and Condition",
                user_active: "active",
            });
        });
    }

    static update(req, res) {
        const id = req.params.id;

        Models.term_condition
        .update({...req.body, modified_at: date}, {
        where: {
            id: id,
        },
        })
        .then((result) => {
            if (result == 1) {
                req.flash("msg_info", `Term and Condition was updated successfully`);
                res.redirect("/tnc");
            } else {
                req.flash("msg_error", `Cannot update Term and Condition with id=${id}.`);
                res.redirect("/tnc");
            }
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Error updating Term and Condition with id=" + id);
            res.redirect("/tnc");
        });
    }

    static delete(req, res) {
        const id = req.body.tnc_id;

        Models.term_condition
        .destroy({
            where: {
                id: id,
            },
        })
        .then((result) => {
            if (result == 1) {
                req.flash("msg_info", "Term and Condition was deleted successfully.");
                res.redirect("/tnc");
            } else {
                req.flash("msg_error", `Cannot delete Term and Condition with id=${id}!`);
                res.redirect("/tnc");
            }
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Could not delete Term and Condition with id=" + id);
            res.redirect("/tnc");
        });
    }
}

module.exports = TnC;
