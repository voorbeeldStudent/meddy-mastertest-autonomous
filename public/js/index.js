console.log('welcome to the clientside')

// document query
const medsSection = document.querySelector('.index')
const scanBtn = document.querySelector('.upload')
const inputFile = document.querySelector('#file')
const loader = document.querySelector('.loading-state')
const placeHolder = document.querySelector('.place-holder')
const imgPlaceHolder = document.querySelector('.imageplaceholder')
const formContainer = document.querySelector('.form-container')
const nav = document.querySelector('nav')
const imgSrc = document.querySelector('.placeholder-check')
const inputBtn = document.querySelector('.inputfile')
const links = document.querySelectorAll('.search-list a')
const searchList = document.querySelector('.search-list')
const popUp = document.querySelector('.med-detail')
const popUpBtn = document.querySelector('.remove-popup')

window.addEventListener('scroll', e => {
    if (window.scrollY >= 45) {
        nav.children[0].childNodes[1].classList.add('scale-img')
        nav.classList.add('changeBg')
    } else {
        nav.children[0].childNodes[1].classList.remove('scale-img')
        nav.classList.remove('changeBg')
    }

})

const reader = new FileReader()
const previewImg = document.querySelector('.upload-image img')

reader.onload = e => {
    previewImg.src = e.target.result;
}
// https://medium.com/@KeithAlpichi/vanilla-js-building-an-image-selector-and-image-previewer-151cddc939e

if (inputFile) {
    inputFile.addEventListener('change', (e) => {
        console.log(inputFile)
        const img = e.target.files[0];
        changeActivityBtn()
        reader.readAsDataURL(img);
    })

    function changeActivityBtn() {
        if (inputFile.files.length <= 0) {
            scanBtn.disabled = true
            scanBtn.innerHTML = "selecteer een foto"
        } else {
            scanBtn.disabled = false
            scanBtn.classList.add('scanBtn-active')
            scanBtn.innerHTML = "scan mijn foto"
        }
    }

    changeActivityBtn()

    // scanBtn button starts loading
    scanBtn.addEventListener('click', (e) => {
        setTimeout(() => {
            loader.className += " show"
        }, 100)
    })

    if(medsSection) {
        // animation end after content reveal
        medsSection.addEventListener('load', () => {
            setTimeout(() => {
                loader.className += " show"
            }, 100)

        })
    
        if (medsSection.childElementCount >= 1) {
            medsSection.classList.replace('meds-result', 'meds-results')
            placeHolder.className += " container"
            imgPlaceHolder.children[1].style.display = "none"
        } else {
            formContainer.style.display = "none"
        }
    }
}
// api fetch
async function imageToText(image) {

    const worker = Tesseract.createWorker({
        logger: m => console.log(m)
    });
    Tesseract.setLogging(true);
    work();

    async function work() {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');

        // let result = await worker.detect(image);
        // console.log(result.data);

        result = await worker.recognize(image);
        console.log(result.data);

        //   await worker.terminate();
    }
    if (text) {
        console.log('yes')
    }
}

async function apiFetch() {
    const url = `https://hva-cmd-meesterproef-ai.now.sh/medicines`
    const response = await fetch(url)
    const json = await response.json()
    return json
}

async function getMedicineData(value) {
    const medicines = await apiFetch()
    const rvgResults = regexComply(value)
    const medicineNames = medicines.map(medicine => medicine.name)
    const medicine = stringSimilarity.findBestMatch(value, medicineNames).bestMatch
    if (rvgResults) {
        const rvgData = medicines.filter(meds => meds.registrationNumber.includes(rvgResults[1]))
        return rvgData
    }
    if (medicine) {
        const medicineData = medicines.filter(meds => meds.name == medicine.target)
        return medicineData
    } else {
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
    }

}

// medicine detail popup, generated server sided
async function popup(event) {
    const popup = document.querySelector('.popup')
    event.preventDefault();
    
    if (popup) {
        popup.remove();
    }

    const url = event.target.href.split('medicine/').join('')
    const response = await fetch(url);
    const medicine = await response.text();

    searchList.insertAdjacentHTML('afterend', medicine);
}

// links.forEach(link => {
//     link.addEventListener('click', popup)
// })