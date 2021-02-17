const nodeFetch = require('node-fetch')
const stringSimilarity = require('string-similarity');
const FuzzySearch = require('fuzzy-search');
const allMedicines = fetch()

async function fetch() {
    const url = `https://hva-cmd-meesterproef-ai.now.sh/medicines`
    const response = await nodeFetch(url)
    const json = await response.json()
    return json
}

async function fetchOne(id) {
    const url = `https://hva-cmd-meesterproef-ai.now.sh/medicines/${id}`
    const response = await nodeFetch(url)
    const json = await response.json()
    return json
}

// find correct medicine by name
async function searchMedicine(value) {
    const medicines = await allMedicines
    const fuzzy = new FuzzySearch(medicines, ['name', 'registrationNumber'], { sort: true });
    const result = fuzzy.search(value);    
    return result
}

async function searchResultLimit(value) {
    const medicines = await fetch('?_limit=20')
    const fuzzy = new FuzzySearch(medicines, ['name']);
    const result = fuzzy.search(value);
    return result
}

// find one medicine by id
async function getMedicine(value) {
    const medicine = await fetchOne(value);
    return medicine
}

// find multiple medicines by id
async function getAllMedicines(value) {
    const medicines = await allMedicines
    const medicinesArray = medicines.filter(medicine => value.includes(medicine.id))
    return medicinesArray;
}

// find best match by name
async function getMedicineData(value) {
    const medicines = await allMedicines
    const rvgResults = regexComply(value)
    const medicineNames = medicines.map(medicine => medicine.name)
    const medicine = stringSimilarity.findBestMatch(value, medicineNames).bestMatch

    if (medicine.rating >= 0.4) {
        const medicineData = medicines.filter(meds => {
            return meds.name == medicine.target
        })
        return medicineData
    }
    if (rvgResults) {
        const rvgData = medicines.filter(meds => meds.registrationNumber.includes(rvgResults[1]))
        return rvgData
    }
    if (rvgResults == null) {
        const noValue = "No value found"
        return noValue
    }
}
function regexComply(stringResults) {
    const text = stringResults
    if (text) {
        const regex = /(rvg \d+(\.\d)*)|(eu \d+(\.\d)*)| (rvh \d+(\.\d)*)/gi
        const found = text.match(regex)
        return JSON.stringify(found).replace(/[\[\]"]+/g, "").split(' ')
    } else {
        console.log('nothing')
        return undefined
    }
}

module.exports = {
    getMedicineData,
    getMedicine,
    getAllMedicines,
    searchMedicine
}