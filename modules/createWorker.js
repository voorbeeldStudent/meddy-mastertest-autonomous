const tesseract = require('node-tesseract-ocr');

async function imageToText(image) {
	const config = {
		lang: "eng",
		oem: 1,	
		psm: 3,
	}

	return tesseract.recognize(image, config)
		.then(text => text)
		.catch(error => {
			console.log(error.message)
		})
}

module.exports = imageToText