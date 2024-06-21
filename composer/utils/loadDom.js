const { JSDOM } = require('jsdom');
const fs = require('fs');

module.exports = (log = () => null) => {
    return function loadDom(path = '') {
        const content = fs.readFileSync(path, { encoding: 'utf-8' });
        const DOM = new JSDOM(content);
        log(`[loadDom.js] DOM is loaded: path: ${path}`);
        
        return DOM;
    }
}