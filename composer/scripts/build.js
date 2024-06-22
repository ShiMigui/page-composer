const log = console.log;

const processFile = require('../utils/processFile')(log);
const config = require('../config');
const path = require('path');
const fs = require('fs');

const files = fs.readdirSync(config.paths.htmcPath, { recursive: true }).filter(f => config.validExtension(f).allowed);

files.forEach(async fileName => {
    const filePath = config.getHtmcPath(fileName);
    const pagePath = config.getPagePath(fileName);
    const pageDir = path.dirname(pagePath);

    try {
        const DOM = await processFile(filePath);

        fs.mkdirSync(pageDir, { recursive: true });

        fs.writeFileSync(pagePath, DOM.serialize());
    }
    catch (e) {
        log(`[build.js] Build error: ${e.message}`);
    }
})