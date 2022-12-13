const Models = require("../../models");

class Banner {
    static async bannerPage(req, res) {
        Models.banner.findAll({
            order: [['createdAt', 'DESC']],
            raw: true,
        })
        .then((data) => {
            res.render('banner', {
                results: data,
                title: 'Banner',
                banner_active: 'active',
            });
        })
        .catch((err) => {
            req.flash('msg_error', err.message || "Some error occured while find Banner!");
            res.render('banner', {
                title: "Banner",
                banner_active: "active",
            });
        });
    }

    static async getCreate(req, res) {
        var banners = await Models.banner.findAll({ raw: true });

        var data_default = {
            banner: "",
        };

        res.render("banner/create", {
            results: data_default,
            banners: banners,
            title: "Banner",
            banner_active: "active",
        });
    }

    static uploadBanner(req, res) {
        const link = req.body.title.toLowerCase();
        const final = link.split(' ').join('-');

        Models.banner.create({
            title: req.body.title,
            path: req.body.path,
            permalink: final,
            createdAt: new Date(),
            updatedAt: new Date(),
            status: 'active'
        })
        .then((data) => {
            req.flash('msg_info', 'Upload Banner was succesfully');
            res.redirect('/banner');
        }).catch((err) => {
            req.flash('msg_error', err.message || 'Some error occurred while upload banner.');
        });
    }

    static async findOne(req, res) {
        const id = req.params.id;
        Models.banner
        .findByPk(req.params.id)
        .then((data) => {
            res.render('banner/edit', {
                id: id,
                results: data.dataValues,
                title: "Banner",
                banner_active: "active",
            });
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Error retrieving Banner with id=" + id);
            res.render("banner/edit", {
                title: "Banner",
                banner_active: "active",
            });
        })
    }

    static updateBanner(req, res) {
        const id = req.params.id;
        const link = req.body.title.toLowerCase();
        const final = link.split(' ').join('-');

        Models.banner
            .update({
                title: req.body.title,
                path: req.body.path,
                permalink: final,
                updatedAt: new Date(),
            },{
            where: { id: id },
            })
            .then((result) => {
            if (result == 1) {
                req.flash("msg_info", `Banner was updated successfully.`);
                res.redirect("/banner");
            } else {
                req.flash("msg_error", `Cannot update Banner!`);
                res.redirect("/banner");
            }
            })
            .catch((err) => {
            req.flash("msg_error", err.message || "Error updating Banner!");
            res.redirect("/banner");
            });
    }

    static delete(req, res) {
        const id = req.body.banner_id;

        Models.banner
        .destroy({
            where: {
                id: id,
            }
        })
        .then((result) => {
        if (result == 1) {
            req.flash("msg_info", "Banner was deleted successfully.");
            res.redirect("/banner");
        } else {
            req.flash("msg_error", `Cannot delete Banner with id=${id}!`);
            res.redirect("/banner");
        }
        })
        .catch((err) => {
        req.flash("msg_error", err.message || "Could not delete Banner with id=" + id);
        res.redirect("/banner");
        });
    }
}

module.exports = Banner;