const config = require('../config');
const fs = require('fs/promises');
/**
 * Class representing a Component.
 * @param {Object} options - The options for the component.
 * @param {string} options.path - The path of the component.
*/
class Component {
    #path = '';
    #literal = '';
    constructor({ path = '' }) {
        try {
            if (!path) {
                throw new Error('[Component.js] The path must not be null or empty!');
            }

            let { allowed, ext } = config.validExtension(path);
            if (!allowed) {
                throw new Error(`[Component.js] The extension "${ext}" is not allowed!`);
            }

            this.#path = path;
            this.#literal = fs.readFile(this.#path, { encoding: 'utf-8' }).then(text => {
                text = text.replace(/\n/g, '');
                text = text.replace(/>\s+/g, '>');
                text = text.replace(/\s{2,}/g, ' ');
                return text;
            });
        }
        catch (e) {
            throw e;
        }
    }

    get path() { return this.#path; }

    /**
     * Renders the component content, replacing placeholders with attribute values from $element.
     * @param {Element} $element The element containing attributes to replace placeholders.
     * @returns {Promise<string>} A promise that resolves to the rendered content of the component.
    */
    async render($element) {
        let literal = await this.#literal;

        let attributes = $element.attributes;

        return literal.replace(/{{(.*?)}}/g, (match, name) => {
            name = name.trim();
            let attributeValue = attributes[name];
            return attributeValue ? attributeValue.value : `[${name} not found]`;
        });
    }

    toString() {
        return `Component(${this.#path}) ${(this.#literal && `:\n${this.#literal}`)}`;
    }
};

module.exports = Component;