const api = require('../modules/api')

module.exports = async (req, res) => {
    // if session exist show scanned history

    if(req.session.medicineScans) {
        const medicineIds = req.session.medicineScans;
        const history = await getHistory(medicineIds)
        res.render('index', { history })
    } else {
        req.session.medicineScans = [];
        res.render('index')
    }
}

async function getHistory(medicineScans){
    const medicineHistory = await api.getAllMedicines(medicineScans)
    return medicineHistory;
}