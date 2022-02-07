"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anyDefined = exports.catchToSmth = void 0;
var catchToSmth = function (fn, smth) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            return fn.apply(void 0, args);
        }
        catch (_a) {
            return smth;
        }
    };
};
exports.catchToSmth = catchToSmth;
var anyDefined = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.find(function (item) { return typeof item !== 'undefined'; });
};
exports.anyDefined = anyDefined;
