const Models = require("../../models");

class Products {
    static async productPage(req, res) {
        Models.product
        .findAll({
            order: [['createdAt', 'DESC']],
            raw: true,
        })
        .then(async (data) => {
            const allData = [];
            for (const x of data) {
                const img = await Models.product_image.findAll({
                    where: {
                        product_id: x.id,
                    },
                    raw: true,
                });
                const cat = await Models.category.findOne({
                    where: {
                        id: x.category_id,
                    },
                    raw: true,
                })
                const temp = {
                    ...x,
                    cat,
                    img
                }
                allData.push(temp);
            }
            res.render("products", {
                results: allData,
                title: "Products",
                product_active: "active",
            });
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Some error occured while find Products!");
            res.render("products", {
                title: "Products",
                product_active: "active",
            });
        });
    }

    static async detail(req, res) {
        const id = req.params.id;

        Models.product
        .findByPk(req.params.id)
        .then(async (data) => {
            const allData = [];
            const img = await Models.product_image.findAll({
                where: {
                    product_id: data.dataValues.id,
                },
                raw: true,
            });
            const temp = {
                // data.dataValues,
                image: img,
            }
            allData.push(temp);
            res.render("products/detail", {
                id: id,
                results: data.dataValues,
                title: "Products",
                product_active: "active",
            });
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Error retrieving Products with id=" + id);
            res.render("products/detail", {
                title: "Products",
                product_active: "active",
            });
        });
    }

    static async getCreate(req, res) {
        var categories = await Models.category.findAll({ raw: true });

        var data_default = {
            category: "",
        };
        res.render("products/create", {
            results: data_default,
            category: categories,
            title: "Products",
            product_active: "active",
        });
    }

    static async createProduct(req, res) {
        const link = req.body.title.toLowerCase();
        const final = link.split(' ').join('-');
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        });
        const price = formatter.format(req.body.price);
        Models.product.create({
            title: req.body.title,
            description: req.body.description,
            category_id: req.body.category,
            permalink: final,
            price: price,
            image: req.body.image,
            views: 0,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        .then(async (data) => {
            // await Models.product_image.create({
            //     product_id: data.id,
            //     path: req.body.path,
            //     status: true,
            //     createdAt: new Date(),
            //     updatedAt: new Date()
            // });
            req.flash('msg_info', "Success Add New Product");
            res.redirect('/products');
        })
        .catch((err) => {
            req.flash('msg_error', err.message || "Failed To Add New Product.");
            res.redirect('/products');
        });
    }

    static async findOne(req, res) {
        const id = req.params.id;
        const categories = await Models.category.findAll({ raw: true });
        const img = await Models.product_image.findAll({
            where: {
                product_id: id,
            },
            raw: true,
        })
        Models.product
            .findByPk(req.params.id)
            .then((data) => {
                res.render("products/edit", {
                    id: id,
                    role: categories,
                    images: img,
                    results: data.dataValues,
                    title: "Product",
                    product_active: "active",
                });
            })
            .catch((err) => {
                req.flash("msg_error", err.message || "Error retrieving Product with id=" + id);
                res.render("products", {
                    title: "Product",
                    product_active: "active",
                });
            });
    }

    static async edit(req, res) {
        const id = req.params.id;
        var categories = await Models.category.findAll({ raw: true });

        Models.product
        .findByPk(req.params.id)
        .then(async (data) => {
            res.render("products/edit", {
                id: id,
                results: data.dataValues,
                category: categories,
                title: "Product",
                product_active: "active",
            });
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Error retrieving Product with id=" + id);
            res.render("products/edit", {
                title: "Products",
                product_active: "active",
            });
        });
    }

    static update(req, res) {
        const id = req.params.id;
        const link = req.body.title.toLowerCase();
        const final = link.split(' ').join('-');
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        });
        const price = formatter.format(req.body.price);

        Models.product
        .update({
            title: req.body.title,
            description: req.body.description,
            category_id: req.body.category,
            permalink: final,
            price: price,
            image: req.body.image,
            updatedAt: new Date()
        },{
            where: {
                id: id,
            },
        })
        .then((result) => {
            if (result == 1) {
                req.flash("msg_info", `Success updated Products.`);
                res.redirect("/products");
            } else {
                req.flash("msg_error", `Cannot update Products with id=${id}.`);
                res.redirect("/products");
            }
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Error updating Products with id=" + id);
            res.redirect("/products");
        });
    }

    static delete(req, res) {
        const id = req.body.product_id;

        Models.product
        .destroy({
            where: {
                id: id,
            },
        })
        .then((result) => {
            if (result == 1) {
                req.flash("msg_info", "Product was deleted successfully.");
                res.redirect("/products");
            } else {
                req.flash("msg_error", `Cannot delete Product with id=${id}!`);
                res.redirect("/products");
            }
        })
        .catch((err) => {
            req.flash("msg_error", err.message || "Could not delete Product with id=" + id);
            res.redirect("/products");
        });
    }
}

module.exports = Products;