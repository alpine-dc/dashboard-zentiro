class Dashboard {
    static home(req, res) {
        res.render('cms/home/index', {
            title: 'Home',
            home_active: 'active'
        });
    }
}

module.exports = Dashboard