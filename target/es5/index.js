"use strict";
/** @module semantic-release-gh-pages-plugin */
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish = exports.verifyConditions = void 0;
var tslib_1 = require("tslib");
var aggregate_error_1 = (0, tslib_1.__importDefault)(require("aggregate-error"));
var lodash_1 = require("lodash");
var config_1 = require("./config");
var ghpages_1 = require("./ghpages");
var tpl_1 = require("./tpl");
(0, tslib_1.__exportStar)(require("./defaults"), exports);
var _config;
var verifyConditions = function (pluginConfig, context) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
    var logger, config, token, repo, ciBranch, docsBranch;
    return (0, tslib_1.__generator)(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = context.logger;
                return [4 /*yield*/, (0, config_1.resolveConfig)(pluginConfig, context, undefined, 'publish')];
            case 1:
                config = _a.sent();
                token = config.token, repo = config.repo, ciBranch = config.ciBranch, docsBranch = config.docsBranch;
                if (!docsBranch) {
                    logger.log("gh-pages [skipped]: 'docsBranch' is empty for ".concat(ciBranch));
                    return [2 /*return*/];
                }
                logger.log('verify gh-pages config');
                if (!token) {
                    throw new aggregate_error_1.default(['env.GH_TOKEN is required by gh-pages plugin']);
                }
                if (!repo) {
                    throw new aggregate_error_1.default(['package.json repository.url does not match github.com pattern']);
                }
                Object.assign(pluginConfig, config);
                _config = config;
                return [2 /*return*/];
        }
    });
}); };
exports.verifyConditions = verifyConditions;
var publish = function (pluginConfig, context) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
    var config, logger, env, cwd, msg, docsBranch, ciBranch, message, pushOpts;
    return (0, tslib_1.__generator)(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, config_1.resolveConfig)(pluginConfig, context, undefined, 'publish')];
            case 1:
                config = _a.sent();
                logger = context.logger, env = context.env, cwd = context.cwd;
                msg = config.msg, docsBranch = config.docsBranch, ciBranch = config.ciBranch;
                message = (0, tpl_1.render)(msg, context, logger);
                pushOpts = (0, tslib_1.__assign)((0, tslib_1.__assign)({}, config), { message: message, logger: logger, env: env, cwd: cwd });
                if (!docsBranch) {
                    logger.log("gh-pages [skipped]: 'docsBranch' is empty for ".concat(ciBranch));
                    return [2 /*return*/];
                }
                if (!!(0, lodash_1.isEqual)(_config, config)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, exports.verifyConditions)(pluginConfig, context)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                logger.log('Publishing docs via gh-pages');
                return [2 /*return*/, (0, ghpages_1.publish)(pushOpts)];
        }
    });
}); };
exports.publish = publish;
exports.default = {
    verifyConditions: exports.verifyConditions,
    publish: exports.publish
};
