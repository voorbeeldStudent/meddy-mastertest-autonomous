const api = require('../modules/api')

module.exports = async function (req, res) {
    if(req.query.medicine) {
        const medicine = await api.searchMedicine(req.query.medicine)
        res.render('search', {
            medicine
        })
    } else {
        res.render('search');
    }
}