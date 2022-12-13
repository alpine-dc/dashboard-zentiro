const Models = require("../../models");

class AboutUs {
    static async aboutPage(req, res) {
        Models.about_us
        .findAll({
            order: [['createdAt', 'DESC']],
            raw: true,
        })
        .then((data) => {
            res.render("about-us", {
                results: data,
                title: "About Us",
                about_active: "active",
            });
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Some error occured while find About Us!");
            res.render("about-us", {
                title: "About Us",
                about_active: "active",
            });
        });
    }

    static async detail(req, res) {
        const id = req.params.id;

        Models.about_us
        .findByPk(req.params.id)
        .then((data) => {
            res.render("about-us/detail", {
                id: id,
                results: data.dataValues,
                title: "About Us",
                about_active: "active",
            });
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Error retrieving About Us with id=" + id);
            res.render("about-us/detail", {
                title: "About Us",
                about_active: "active",
            });
        });
    }

    static async getCreate(req, res) {
        var abouts = await Models.about_us.findAll({ raw: true });

        var data_default = {
            aboutUs: "",
        };

        res.render("about-us/create", {
            results: data_default,
            abouts: abouts,
            title: "About Us",
            about_active: "active",
        });
    }

    static createAbout(req, res) {
        Models.about_us
        .create({
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        .then((result) => {
            req.flash("msg_info", "About Us was created successfully.");
            res.redirect("/about-us");
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Some error occurred while creating the About Us!");
            res.redirect("/about-us");
        });
    }

    static edit(req, res) {
        const id = req.params.id;

        Models.about_us
        .findByPk(req.params.id)
        .then((data) => {
            res.render("about-us/edit", {
                id: id,
                results: data.dataValues,
                title: "About Us",
                about_active: "active",
            });
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Error retrieving About Us with id=" + id);
            res.render("about-us/edit", {
                title: "About Us",
                about_active: "active",
            });
        });
    }

    static update(req, res) {
        const id = req.params.id;

        Models.about_us
        .update({
            ...req.body,
            updatedAt: new Date()
        },{
            where: { id: id }
        })
        .then((result) => {
            if (result == 1) {
                req.flash("msg_info", `About Us was updated successfully`);
                res.redirect("/about-us");
            } else {
                req.flash("msg_error", `Cannot update About Us with id=${id}.`);
                res.redirect("/about-us");
            }
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Error updating About Us with id=" + id);
            res.redirect("/about-us");
        });
    }

    static delete(req, res) {
        const id = req.body.about_us_id;

        Models.about_us
        .destroy({
            where: {
                id: id,
            },
        })
        .then((result) => {
            if (result == 1) {
                req.flash("msg_info", "About Us was deleted successfully.");
                res.redirect("/about-us");
            } else {
                req.flash("msg_error", `Cannot delete About Us with id=${id}!`);
                res.redirect("/about-us");
            }
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Could not delete About Us with id=" + id);
            res.redirect("/about-us");
        });
    }
}

module.exports = AboutUs;