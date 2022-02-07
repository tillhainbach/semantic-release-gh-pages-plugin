"use strict";
/** @module semantic-release-gh-pages-plugin */
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveOptions = exports.resolveConfig = exports.reassembleRepoUrl = exports.getToken = exports.getUrlFromPackage = exports.getRepoUrl = exports.extractRepoToken = exports.extractRepoDomain = exports.extractRepoName = exports.GITIO_REPO_PATTERN = exports.DEFAULT_PULL_TAGS_BRANCH = exports.PLUGIN_PATH = exports.DEFAULT_ENTERPRISE = exports.DEFAULT_DST = exports.DEFAULT_MSG = exports.DEFAULT_SRC = exports.DEFAULT_BRANCH = exports.DEFAULT_BASE_DIR = void 0;
var tslib_1 = require("tslib");
var aggregate_error_1 = (0, tslib_1.__importDefault)(require("aggregate-error"));
var debug_1 = (0, tslib_1.__importDefault)(require("debug"));
var git_url_parse_1 = (0, tslib_1.__importDefault)(require("git-url-parse"));
var lodash_1 = require("lodash");
var read_pkg_1 = (0, tslib_1.__importDefault)(require("read-pkg"));
var then_request_1 = (0, tslib_1.__importDefault)(require("then-request"));
var defaults_1 = require("./defaults");
Object.defineProperty(exports, "DEFAULT_BASE_DIR", { enumerable: true, get: function () { return defaults_1.DEFAULT_BASE_DIR; } });
Object.defineProperty(exports, "DEFAULT_BRANCH", { enumerable: true, get: function () { return defaults_1.DEFAULT_BRANCH; } });
Object.defineProperty(exports, "DEFAULT_DST", { enumerable: true, get: function () { return defaults_1.DEFAULT_DST; } });
Object.defineProperty(exports, "DEFAULT_ENTERPRISE", { enumerable: true, get: function () { return defaults_1.DEFAULT_ENTERPRISE; } });
Object.defineProperty(exports, "DEFAULT_MSG", { enumerable: true, get: function () { return defaults_1.DEFAULT_MSG; } });
Object.defineProperty(exports, "DEFAULT_PULL_TAGS_BRANCH", { enumerable: true, get: function () { return defaults_1.DEFAULT_PULL_TAGS_BRANCH; } });
Object.defineProperty(exports, "DEFAULT_SRC", { enumerable: true, get: function () { return defaults_1.DEFAULT_SRC; } });
Object.defineProperty(exports, "PLUGIN_PATH", { enumerable: true, get: function () { return defaults_1.PLUGIN_PATH; } });
var util_1 = require("./util");
var debug = (0, debug_1.default)('semantic-release:gh-pages');
var gitUrlParse = (0, util_1.catchToSmth)(git_url_parse_1.default, {});
exports.GITIO_REPO_PATTERN = /^https:\/\/git\.io\/[\dA-Za-z-]+$/;
/**
 * @private
 */
var extractRepoName = function (repoUrl) {
    return gitUrlParse(repoUrl).full_name;
};
exports.extractRepoName = extractRepoName;
/**
 * @private
 */
var extractRepoDomain = function (repoUrl) {
    return gitUrlParse(repoUrl).resource;
};
exports.extractRepoDomain = extractRepoDomain;
/**
 * @private
 */
var extractRepoToken = function (repoUrl) {
    var repo = gitUrlParse(repoUrl);
    return repo.token || repo.user;
};
exports.extractRepoToken = extractRepoToken;
/**
 * @private
 */
var getRepoUrl = function (pluginConfig, context, enterprise) { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
    var env, urlFromEnv, urlFromStepOpts, urlFromOpts, urlFromPackage, reassemble, url, res;
    var _a;
    return (0, tslib_1.__generator)(this, function (_b) {
        switch (_b.label) {
            case 0:
                env = context.env;
                urlFromEnv = getRepoUrlFromEnv(env);
                urlFromStepOpts = pluginConfig.repositoryUrl;
                urlFromOpts = ((_a = context === null || context === void 0 ? void 0 : context.options) === null || _a === void 0 ? void 0 : _a.repositoryUrl) || '';
                urlFromPackage = (0, exports.getUrlFromPackage)();
                reassemble = !!urlFromStepOpts || !urlFromOpts;
                url = urlFromStepOpts || urlFromOpts || urlFromEnv || urlFromPackage;
                debug('getRepoUrl:');
                debug('urlFromEnv= %s', urlFromEnv);
                debug('urlFromStepOpts= %s', urlFromStepOpts);
                debug('urlFromOpts= %s', urlFromOpts);
                debug('urlFromPackage= %s', urlFromPackage);
                if (!exports.GITIO_REPO_PATTERN.test(url)) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, then_request_1.default)('GET', urlFromOpts, { followRedirects: false, timeout: 5000 })];
            case 1:
                res = _b.sent();
                url = res.headers.location;
                _b.label = 2;
            case 2:
                if (reassemble) {
                    url = (0, exports.reassembleRepoUrl)(url, context);
                }
                if (enterprise && (0, exports.extractRepoDomain)(url) === 'github.com') {
                    throw new aggregate_error_1.default(['repo refers to `github.com` but enterprise url is expected']);
                }
                return [2 /*return*/, url];
        }
    });
}); };
exports.getRepoUrl = getRepoUrl;
/**
 * @private
 */
var getRepoUrlFromEnv = function (env) { return env.REPO_URL; };
/**
 * @private
 */
var getUrlFromPackage = function () {
    var _a;
    var pkg = read_pkg_1.default.sync();
    return String(((_a = pkg === null || pkg === void 0 ? void 0 : pkg.repository) === null || _a === void 0 ? void 0 : _a.url) || (pkg === null || pkg === void 0 ? void 0 : pkg.repository) || '');
};
exports.getUrlFromPackage = getUrlFromPackage;
/**
 * @private
 */
var getToken = function (env, repoUrl) { return env.GH_TOKEN || env.GITHUB_TOKEN || (0, exports.extractRepoToken)(repoUrl); };
exports.getToken = getToken;
/**
 * @private
 */
var reassembleRepoUrl = function (redirectedUrl, context) {
    var env = context.env;
    var repoName = (0, exports.extractRepoName)(redirectedUrl);
    var repoDomain = (0, exports.extractRepoDomain)(redirectedUrl);
    var token = (0, exports.getToken)(env, redirectedUrl);
    return "https://".concat(token, "@").concat(repoDomain, "/").concat(repoName, ".git");
};
exports.reassembleRepoUrl = reassembleRepoUrl;
/**
 * @private
 */
var resolveConfig = function (pluginConfig, context, path, step) {
    if (path === void 0) { path = defaults_1.PLUGIN_PATH; }
    return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
        var opts, branches, _a, branch, _b, dir, _c, msg, _d, src, _e, dst, add, dotfiles, enterprise, repo, ciBranch, docsBranch, pullTagsBranch, token;
        var _f, _g;
        return (0, tslib_1.__generator)(this, function (_h) {
            switch (_h.label) {
                case 0:
                    opts = (0, exports.resolveOptions)(pluginConfig, context, path, step);
                    branches = opts.branches, _a = opts.branch, branch = _a === void 0 ? defaults_1.DEFAULT_BRANCH : _a, _b = opts.dir, dir = _b === void 0 ? defaults_1.DEFAULT_BASE_DIR : _b, _c = opts.msg, msg = _c === void 0 ? defaults_1.DEFAULT_MSG : _c, _d = opts.src, src = _d === void 0 ? defaults_1.DEFAULT_SRC : _d, _e = opts.dst, dst = _e === void 0 ? defaults_1.DEFAULT_DST : _e, add = opts.add, dotfiles = opts.dotfiles;
                    enterprise = Boolean(opts.enterprise || pluginConfig.enterprise || defaults_1.DEFAULT_ENTERPRISE);
                    return [4 /*yield*/, (0, exports.getRepoUrl)(pluginConfig, context, enterprise)];
                case 1:
                    repo = _h.sent();
                    ciBranch = (_f = context === null || context === void 0 ? void 0 : context.branch) === null || _f === void 0 ? void 0 : _f.name;
                    docsBranch = branches ? (_g = branches.find(function (_a) {
                        var from = _a[0];
                        return from === ciBranch;
                    })) === null || _g === void 0 ? void 0 : _g[1] : branch;
                    pullTagsBranch = (0, util_1.anyDefined)(opts.pullTagsBranch, ciBranch, opts._branch, defaults_1.DEFAULT_PULL_TAGS_BRANCH);
                    token = (0, exports.getToken)(context.env, repo);
                    debug('resolveConfig args:');
                    debug('pluginConfig= %j', pluginConfig);
                    debug('path= %s', path);
                    debug('step= %s', step);
                    debug('ciBranch= %s', ciBranch);
                    debug('docsBranch= %s', docsBranch);
                    debug('pullTagsBranch= %s', pullTagsBranch);
                    return [2 /*return*/, {
                            dir: dir,
                            src: src,
                            dst: dst,
                            msg: msg,
                            ciBranch: ciBranch,
                            pullTagsBranch: pullTagsBranch,
                            docsBranch: docsBranch,
                            enterprise: enterprise,
                            repo: repo,
                            token: token,
                            add: add,
                            dotfiles: dotfiles,
                        }];
            }
        });
    });
};
exports.resolveConfig = resolveConfig;
/**
 * @private
 */
var resolveOptions = function (pluginConfig, context, path, step) {
    if (path === void 0) { path = defaults_1.PLUGIN_PATH; }
    var options = context.options;
    var base = (0, lodash_1.omit)(pluginConfig, 'branch', 'branches');
    var extra = step && options[step] && (0, lodash_1.castArray)(options[step])
        .map(function (config) {
        if (Array.isArray(config)) {
            var path_1 = config[0], opts = config[1];
            return (0, tslib_1.__assign)((0, tslib_1.__assign)({}, opts), { path: path_1 });
        }
        return config;
    })
        .find(function (config) { return (config === null || config === void 0 ? void 0 : config.path) === path; }) || {};
    return (0, tslib_1.__assign)((0, tslib_1.__assign)((0, tslib_1.__assign)({}, base), extra), { _branch: pluginConfig.branch });
};
exports.resolveOptions = resolveOptions;
