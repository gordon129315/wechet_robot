const qr = require('qr-image');
 

qrcodeToFile = function(qrcode, fileName) {
    let qr_png = qr.image(qrcode, { type: 'png' });
    qr_png.pipe(require('fs').createWriteStream(`./qr_images/${fileName}`));
}

test = () => {
    qrcodeToFile('acbdfdf', 'test.png');
}

// test();

module.exports = {
    qrcodeToFile
}