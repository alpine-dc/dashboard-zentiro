class Dashboard {
    static home(req, res) {
        res.render('home/index', {
            title: 'Home',
            home_active: 'active'
        });
    }
}

module.exports = Dashboard