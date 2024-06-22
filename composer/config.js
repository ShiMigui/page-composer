const path = require('path');

const src = path.join(__dirname, '..', 'src/');

const htmcPath = path.join(src, 'htmc/');
const pagePath = path.join(src, 'page/');
const componentPath = path.join(src, 'component/');

function createGetPathFunction(defaultRoot) {
    /**
     * Gets the full path for a given file name.
     *
     * @param {string} [fileName=''] - The file name. If not provided, defaults to an empty string.
     * @returns {string} The full path combined from the default root directory and the file name.
    */
    return (fileName = '') => path.join(defaultRoot, fileName);
}

const obj = {
    paths: {
        src,
        htmcPath,
        pagePath,
        componentPath,
    },
    getHtmcPath: createGetPathFunction(htmcPath),
    getPagePath: createGetPathFunction(pagePath),
    getComponentPath: createGetPathFunction(componentPath),
    allowedExtensions: ['.html', '.php'],
    validExtension: () => ({ ext: '', allowed: false })
}

obj.validExtension = (fileName = '') => {
    let ext = path.extname(fileName);
    let allowed = obj.allowedExtensions.includes(ext);
    return { ext, allowed };
}

module.exports = obj;