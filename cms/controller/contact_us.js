const Models = require('../../models');

class ContactUs {
    static findAll(req, res) {
        Models.contact_us
            .findAll({ raw: true })
            .then((data) => {
                res.render('cms/contact-us/index', {
                    results: data,
                    title: 'Contact Us',
                    contactus_active: 'Active',
                });
            })
            .catch((err) => {
                req.flash('msg_error', err.message || 'Some error occured while find Contact Us');
                res.render('cms/contact-us/index', {
                    title: 'Contact Us',
                    contactus_active: 'Active',
                });
            })
    }

    static updateStatus(req, res) {
        const id = req.body.id;

        Models.contact_us
            .update({
                status: 1,
            },{
                where: {
                    id: id,
                },
            })
            .then((result) => {
                if (result == 1) {
                    req.flash("msg_info", "Success to change status.");
                    res.redirect("/contact-us");
                } else {
                    req.flash("msg_error", "Cannot update the status!");
                    res.redirect("/contact-us");
                }
            })
            .catch((err) => {
                req.flash("msg_error", err.message || "Could not update status with id=" + id);
                res.redirect("/contact-us");
            });
        }
}

module.exports = ContactUs;