const api = require('../modules/api')

async function page (req, res) {
    console.log(req.params.id);
    const id = req.params.id;
    const medicine = await api.getMedicine(id);
    res.render('pages/medicineSearch', { medicine } )
}

async function partial (req, res) {
    console.log(req.params.id);
    const id = req.params.id;
    const medicine = await api.getMedicine(id);
    res.render('partials/medicine', { medicine } )
}

module.exports = {
    page,
    partial
}