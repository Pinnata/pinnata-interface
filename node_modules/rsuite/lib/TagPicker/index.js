"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _recompose = require("recompose");

var _utils = require("../utils");

var _InputPicker = _interopRequireDefault(require("../InputPicker/InputPicker"));

var _withLocale = _interopRequireDefault(require("../IntlProvider/withLocale"));

var _default = (0, _recompose.compose)((0, _withLocale.default)(['Picker', 'InputPicker']), (0, _utils.defaultProps)({
  multi: true
}))(_InputPicker.default);

exports.default = _default;
module.exports = exports.default;