"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _recompose = require("recompose");

var _utils = require("../utils");

var _Drawer = _interopRequireDefault(require("./Drawer"));

var _ModalBody = _interopRequireDefault(require("../Modal/ModalBody"));

var _ModalHeader = _interopRequireDefault(require("../Modal/ModalHeader"));

var _ModalTitle = _interopRequireDefault(require("../Modal/ModalTitle"));

var _ModalFooter = _interopRequireDefault(require("../Modal/ModalFooter"));

var EnhancedBody = (0, _utils.defaultProps)({
  classPrefix: 'drawer-body'
})(_ModalBody.default);
(0, _recompose.setStatic)('Body', (0, _recompose.setDisplayName)('Body')(EnhancedBody))(_Drawer.default);
(0, _recompose.setStatic)('Header', (0, _utils.defaultProps)({
  classPrefix: 'drawer-header'
})(_ModalHeader.default))(_Drawer.default);
(0, _recompose.setStatic)('Title', (0, _utils.defaultProps)({
  classPrefix: 'drawer-title'
})(_ModalTitle.default))(_Drawer.default);
(0, _recompose.setStatic)('Footer', (0, _utils.defaultProps)({
  classPrefix: 'drawer-footer'
})(_ModalFooter.default))(_Drawer.default);
var _default = _Drawer.default;
exports.default = _default;
module.exports = exports.default;