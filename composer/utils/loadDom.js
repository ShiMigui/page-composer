const { JSDOM } = require('jsdom');
const fs = require('fs');

module.exports = (log = () => null) => {
    return function loadDom(path = '') {
        try {
            const content = fs.readFileSync(path, { encoding: 'utf-8' });
            const DOM = new JSDOM(content);
            log(`[loadDom.js] DOM was loaded: path: ${path}`);

            return DOM;
        }
        catch (e) {
            log(`[loadDom.js] DOM cannot be loaded: path: ${path}, error: ${e.message}`);
            throw e;
        }
    }
}