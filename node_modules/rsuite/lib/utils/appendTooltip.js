"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = appendTooltip;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

var _Whisper = _interopRequireDefault(require("../Whisper"));

function appendTooltip(_ref) {
  var message = _ref.message,
      rest = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["message"]);
  return React.createElement(_Whisper.default, (0, _extends2.default)({
    speaker: React.createElement(_Tooltip.default, null, message)
  }, rest));
}

module.exports = exports.default;