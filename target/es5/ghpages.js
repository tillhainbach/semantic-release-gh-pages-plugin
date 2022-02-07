"use strict";
/** @module semantic-release-gh-pages-plugin */
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish = exports._publish = exports.pushPages = exports.pullTags = exports.OK = void 0;
var tslib_1 = require("tslib");
var execa_1 = (0, tslib_1.__importDefault)(require("execa"));
var gh_pages_1 = require("gh-pages");
var queuefy_1 = require("queuefy");
/**
 * @private
 */
exports.OK = { status: 'OK' };
/**
 * @private
 */
var pullTags = function (opts) {
    if (opts.pullTagsBranch === '') {
        return Promise.resolve();
    }
    var repo = '' + opts.repo;
    var pullTagsBranch = '' + opts.pullTagsBranch;
    var execaOpts = {
        env: opts.env,
        cwd: opts.cwd
    };
    return (0, execa_1.default)('git', [
        'pull',
        '--tags',
        '--force',
        repo,
        pullTagsBranch
    ], execaOpts)
        .catch(console.log);
};
exports.pullTags = pullTags;
/**
 * @private
 */
var pushPages = function (opts) { return new Promise(function (resolve, reject) {
    var dir = opts.dir, logger = opts.logger;
    var ghpagesOpts = {
        repo: opts.repo,
        src: opts.src,
        branch: opts.docsBranch,
        dest: opts.dst,
        message: opts.message,
        add: opts.add,
        dotfiles: opts.dotfiles,
    };
    (0, gh_pages_1.publish)(dir, ghpagesOpts, function (err) {
        if (err) {
            logger.error('Publish docs failure', err);
            reject(err);
        }
        else {
            logger.log("Docs published successfully, branch=".concat(ghpagesOpts.branch, ", src=").concat(dir, "/").concat(ghpagesOpts.src, ", dst=").concat(ghpagesOpts.dest));
            resolve(exports.OK);
        }
    });
}); };
exports.pushPages = pushPages;
/**
 * @private
 */
var _publish = function (opts) {
    return (0, exports.pullTags)(opts)
        .then(function () { return (0, exports.pushPages)(opts); })
        .then(function (res) {
        (0, gh_pages_1.clean)();
        return res;
    });
};
exports._publish = _publish;
/**
 * @private
 */
exports.publish = (0, queuefy_1.queuefy)(exports._publish);
