const { extname } = require('path');
const config = require('../config');
/**
 * Class representing a Component.
 * @param {Object} options - The options for the component.
 * @param {string} options.path - The path of the component.
 * @param {string} options.name - The name of the component.
*/
class Component {
    constructor({ path = '', name = '' }) {
        this.#path = '';
        this.#name = '';
        this.#literal = '';

        this.path = path;
        this.name = name;
    }

    #path = '';
    #name = '';
    #literal = '';

    get name() {
        return this.#name;
    }

    set name(value = '') {
        if (!value) {
            throw new Error('[Component.js] The name must not be null or empty!');
        }

        this.#name = value;
    }

    get path() {
        return this.#path;
    }

    set path(value = '') {
        if (!value) {
            throw new Error('[Component.js] The path must not be null or empty!');
        }

        if (!config.allowedExtensions.includes(extname(value))) {
            throw new Error(`[Component.js] The extension "${extname(value)}" is not allowed!`);
        }

        this.#path = value;
    }

    toString() {
        return `Component(${this.path}) ${this.name}${(this.#literal && `:\n${this.#literal}`)}`;
    }
};

module.exports = Component;