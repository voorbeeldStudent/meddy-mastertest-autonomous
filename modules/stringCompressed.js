const getMeds = require('./api')



function textCompressed(medsName) {
    let name = medsName
    let splitStr = name.split(' ')[0]
    // let str = splitStr.substr(0, 30)
    return splitStr
}

module.exports = textCompressed

