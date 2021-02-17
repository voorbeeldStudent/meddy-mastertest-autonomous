const imageToText = require('../modules/createWorker')
const api = require('../modules/api')

async function page (req, res) {
    if (req.file) {
        res.render('pages/uploadImage', { image: req.file.originalname })
    } else {
        res.render('pages/uploadImage');
    }
}

async function scan (req, res) {
    if (req.file) {
        // const image = "data:image/jpeg;base64," + req.file.buffer.toString('base64');
        // https://stackoverflow.com/questions/60450170/converting-objects-of-buffer-to-an-image

        const image = `./uploads/${req.file.originalname}`
        const text = await imageToText(image)        
        const meds = await api.getMedicineData(text)
        // add new medicine id to history
        if (req.session.medicineScans) {
            req.session.medicineScans.push(meds[0].id)
        }

        // text.length = for pictures without text
        // meds.rating = for pictures with text but rating smimmilarity is low
        if (text.length <= 3 || meds.rating <= 0.3) {
            res.render('pages/scan', {
                text: text,
                meds: meds,
                image: req.file.originalname
            })
        } else {
            res.render('pages/scan', {
                text: text,
                meds: meds[0],
                image: req.file.originalname
            })
        }

    } else {
        res.render('pages/scan')
    }
}

module.exports = {
    page,
    scan
}