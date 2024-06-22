module.exports = (log = () => null) => {
    const processElement = require("./processElement")(log);
    const loadDom = require("./loadDom")(log);

    async function processFile(filePath = '') {
        try {
            const DOM = loadDom(filePath);
            const document = DOM.window.document;

            let promises = [
                ...Array.from(document.querySelectorAll('composer-literal')).map($el => processElement($el, true)),
                ...Array.from(document.querySelectorAll('composer-container')).map($el => processElement($el, false)),
            ];

            await Promise.all(promises);

            log(`[processFile.js] Processed... ${filePath}`);

            return DOM;
        }
        catch (e) {
            throw e;
        }
    }

    return processFile;
}