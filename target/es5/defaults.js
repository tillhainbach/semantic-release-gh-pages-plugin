"use strict";
/** @module semantic-release-gh-pages-plugin */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PULL_TAGS_BRANCH = exports.DEFAULT_ENTERPRISE = exports.DEFAULT_MSG = exports.DEFAULT_DST = exports.DEFAULT_BASE_DIR = exports.DEFAULT_SRC = exports.DEFAULT_BRANCH = exports.PLUGIN_PATH = void 0;
exports.PLUGIN_PATH = '@qiwi/semantic-release-gh-pages-plugin';
exports.DEFAULT_BRANCH = 'gh-pages';
exports.DEFAULT_SRC = 'docs';
exports.DEFAULT_BASE_DIR = ".";
exports.DEFAULT_DST = '.';
exports.DEFAULT_MSG = 'docs updated <%= nextRelease.gitTag %>';
exports.DEFAULT_ENTERPRISE = false;
exports.DEFAULT_PULL_TAGS_BRANCH = 'master';
