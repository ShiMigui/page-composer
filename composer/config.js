const path = require('path');

const src = path.join(__dirname, '..', 'src/');

const htmcPath = path.join(src, 'htmcs/');
const pagePath = path.join(src, 'pages/');
const componentPath = path.join(src, 'components/');

function createGetPathFunction(defaultRoot) {
    /**
     * Gets the full path for a given file name.
     *
     * @param {string} [fileName=''] - The file name. If not provided, defaults to an empty string.
     * @returns {string} The full path combined from the default root directory and the file name.
    */
    return (fileName = '') => path.join(defaultRoot, fileName);
}

const getHtmcPath = createGetPathFunction(htmcPath);
const getPagePath = createGetPathFunction(pagePath);
const getComponentPath = createGetPathFunction(componentPath);

module.exports = {
    path: {
        src,
        htmcPath,
        pagePath,
        componentPath,
    },
    getHtmcPath,
    getPagePath,
    getComponentPath,
}