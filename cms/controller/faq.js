const Models = require("../../models");

class Faq {
    static async faqPage(req, res) {
        Models.faq
        .findAll({
            order: [['createdAt', 'DESC']],
            raw: true,
        })
        .then((data) => {
            res.render("cms/faqs", {
                results: data,
                title: "FAQ",
                faq_active: "active",
            });
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Some error occured while find FAQ!");
            res.render("cms/faqs", {
                title: "FAQ",
                faq_active: "active",
            });
        });
    }

    static async detail(req, res) {
        const id = req.params.id;

        Models.faq
        .findByPk(req.params.id)
        .then((data) => {
            res.render("cms/faqs/detail", {
                id: id,
                results: data.dataValues,
                title: "FAQ",
                faq_active: "active",
            });
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Error retrieving FAQ with id=" + id);
            res.render("cms/faqs/detail", {
                title: "FAQ",
                faq_active: "active",
            });
        });
    }

    static async getCreate(req, res) {
        var faqs = await Models.faq.findAll({ raw: true });

        var data_default = {
            faq: "",
        };

        res.render("cms/faqs/create", {
            results: data_default,
            faqs: faqs,
            title: "FAQ",
            faq_active: "active",
        });
    }

    static createFaq(req, res) {
        var faq = req.body;

        Models.faq
        .create({
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        .then((result) => {
            req.flash("msg_info", "FAQ was created successfully.");
            res.redirect("/faqs");
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Some error occurred while creating the FAQ!");
            res.redirect("/faqs");
        });
    }

    static edit(req, res) {
        const id = req.params.id;

        Models.faq
        .findByPk(req.params.id)
        .then((data) => {
            res.render("cms/faqs/edit", {
                id: id,
                results: data.dataValues,
                title: "FAQ",
                faq_active: "active",
            });
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Error retrieving FAQ with id=" + id);
            res.render("cms/faqs/edit", {
                title: "FAQ",
                user_active: "active",
            });
        });
    }

    static update(req, res) {
        const id = req.params.id;

        Models.faq
        .update({
            ...req.body,
            modified_at: new Date()
        },{
        where: {
            id: id,
        },
        })
        .then((result) => {
            if (result == 1) {
                req.flash("msg_info", `FAQ was updated successfully`);
                res.redirect("/faqs");
            } else {
                req.flash("msg_error", `Cannot update FAQ with id=${id}.`);
                res.redirect("/faqs");
            }
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Error updating FAQ with id=" + id);
            res.redirect("/faqs");
        });
    }

    static delete(req, res) {
        const id = req.body.faq_id;

        Models.faq
        .destroy({
            where: {
                id: id,
            },
        })
        .then((result) => {
            if (result == 1) {
                req.flash("msg_info", "FAQ was deleted successfully.");
                res.redirect("/faqs");
            } else {
                req.flash("msg_error", `Cannot delete FAQ with id=${id}!`);
                res.redirect("/faqs");
            }
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Could not delete FAQ with id=" + id);
            res.redirect("/faqs");
        });
    }
}

module.exports = Faq;
