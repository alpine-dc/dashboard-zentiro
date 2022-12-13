const Models = require("../../models");

class Category {
    static async catPage(req, res) {
        Models.category
        .findAll({
            order: [['createdAt', 'DESC']],
            raw: true,
        })
        .then((data) => {
            res.render("category", {
                results: data,
                title: "Category",
                category_active: "active",
            });
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Some error occured while find Category!");
            res.render("category", {
                title: "Category",
                category_active: "active",
            });
        });
    }

    static async detail(req, res) {
        const id = req.params.id;

        Models.category
        .findByPk(req.params.id)
        .then((data) => {
            res.render("category/detail", {
                id: id,
                results: data.dataValues,
                title: "Category",
                category_active: "active",
            });
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Error retrieving Category with id=" + id);
            res.render("category/detail", {
                title: "Category",
                category_active: "active",
            });
        });
    }

    static async getCreate(req, res) {
        var categories = await Models.category.findAll({ raw: true });

        var data_default = {
            category: "",
        };

        res.render("category/create", {
            results: data_default,
            categories: categories,
            title: "Category",
            category_active: "active",
        });
    }

    static createCat(req, res) {
        const link = req.body.name.toLowerCase();
        const final = link.split(' ').join('-');
        Models.category
        .create({
            name: req.body.name,
            image: req.body.image,
            permalink: final,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        .then((result) => {
            req.flash("msg_info", "Category was created successfully.");
            res.redirect("/category");
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Some error occurred while creating the Category!");
            res.redirect("/category");
        });
    }

    static edit(req, res) {
        const id = req.params.id;

        Models.category
        .findByPk(req.params.id)
        .then((data) => {
            res.render("category/edit", {
                id: id,
                results: data.dataValues,
                title: "Category",
                category_active: "active",
            });
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Error retrieving Category with id=" + id);
            res.render("category/edit", {
                title: "Category",
                user_active: "active",
            });
        });
    }

    static update(req, res) {
        const id = req.params.id;
        const link = req.body.name.toLowerCase();
        const final = link.split(' ').join('-');

        Models.category
        .update({
            name: req.body.name,
            image: req.body.image,
            permalink: final,
            updatedAt: new Date()
        },{
            where: { id: id }
        })
        .then((result) => {
            if (result == 1) {
                req.flash("msg_info", `Category was updated successfully`);
                res.redirect("/category");
            } else {
                req.flash("msg_error", `Cannot update Category with id=${id}.`);
                res.redirect("/category");
            }
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Error updating Category with id=" + id);
            res.redirect("/category");
        });
    }

    static delete(req, res) {
        const id = req.body.category_id;

        Models.category
        .destroy({
            where: {
                id: id,
            },
        })
        .then((result) => {
            if (result == 1) {
                req.flash("msg_info", "Category was deleted successfully.");
                res.redirect("/category");
            } else {
                req.flash("msg_error", `Cannot delete Category with id=${id}!`);
                res.redirect("/category");
            }
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Could not delete Category with id=" + id);
            res.redirect("/category");
        });
    }
}

module.exports = Category;