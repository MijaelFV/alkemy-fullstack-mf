const fs = require('fs');

const readDir = (folder = '', replace = '') => {
    return new Promise((resolve, reject) => {
        // LOAD MODELS
        const info = [];
        fs.readdirSync(folder).forEach((file) => {
            let extension = file.slice(-2, file.length)
            if (extension !== 'js') return;

            let filename = file.slice(0, -3);
            let name = filename.replace(replace, '');
            info.push({
                file,     // testCtrl.js
                filename, // testCtrl
                name,     // test
            })
        });
        resolve(info);
    })
}

module.exports = {
    readDir
}