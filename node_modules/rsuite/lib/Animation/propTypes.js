"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.animationPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var animationPropTypes = {
  onEnter: _propTypes.default.func,
  onEntering: _propTypes.default.func,
  onEntered: _propTypes.default.func,
  onExit: _propTypes.default.func,
  onExiting: _propTypes.default.func,
  onExited: _propTypes.default.func
};
exports.animationPropTypes = animationPropTypes;