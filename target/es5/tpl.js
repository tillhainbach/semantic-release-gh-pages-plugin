"use strict";
/** @module semantic-release-gh-pages-plugin */
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = void 0;
var lodash_1 = require("lodash");
/**
 * @private
 */
var render = function (template, context, logger) {
    try {
        return (0, lodash_1.template)(template)(context);
    }
    catch (err) {
        logger.error('lodash.template render failure', err);
        return template;
    }
};
exports.render = render;
