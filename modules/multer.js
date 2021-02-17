const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './tmp')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname.replace(/ /g, "_")}`)
    }
});
const upload = multer({
    storage: storage
}).single('scanmeds')

module.exports = upload