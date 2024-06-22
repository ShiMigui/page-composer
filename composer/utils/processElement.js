const Component = require("./Component");
const config = require("../config");
const path = require("path");
const fs = require("fs");

module.exports = (log = () => null) => {
    const componentPath = config.paths.componentPath;
    const componentFiles = fs.readdirSync(componentPath, { recursive: true })
        .filter(f => config.validExtension(f).allowed);
    const __components = {};

    function getRefPath($element) {
        let refPath;
        let { name, src } = $element.attributes;

        if (!!name) {
            name = name.value;
            let fileName = componentFiles.find(f => f.includes(name));

            if (!fileName) {
                throw new Error(`[processElement.js] File with "${name}" not found`);
            }

            refPath = path.join(componentPath, fileName);
        }
        else if (!!src) {
            src = src.value;
            refPath = config.getPagePath(src);
        }
        else {
            throw new Error(`[processElement.js] There are not key attributes to find component!`);
        }

        return refPath;
    }

    /**
     * Processes a specific element.
     * @param {Element} $element The element to process.
     * @param {boolean} [isLiteral=false] Indicates if the element is literal.
     * @returns {Promise<void>} A promise that resolves when processing is complete.
    */
    async function processElement($element, isLiteral = false) {
        let refPath, component;

        refPath = getRefPath($element);

        component = __components[refPath];
        if (!component) {
            __components[refPath] = new Component({ path: refPath });
            component = __components[refPath];
        }

        $element.innerHTML = await component.render($element);

        if (isLiteral) {
            const parent = $element.parentNode;

            while ($element.firstChild) {
                parent.insertBefore($element.firstChild, $element);
            }

            $element.remove();
        }

        log(`[processElement.js] processing component... ${refPath}`);
    }

    return processElement;
}