"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.listPickerDefaultProps = exports.pickerDefaultProps = exports.listPickerPropTypes = exports.pickerPropTypes = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _constants = require("../constants");

var _utils = require("../utils");

var _propTypes2 = require("../Animation/propTypes");

var pickerPropTypes = (0, _extends2.default)({}, _propTypes2.animationPropTypes, {
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  locale: _propTypes.default.object,
  appearance: _propTypes.default.oneOf(['default', 'subtle']),
  block: _propTypes.default.bool,
  containerPadding: _propTypes.default.number,
  container: _propTypes.default.any,
  disabled: _propTypes.default.bool,
  toggleComponentClass: _propTypes.default.elementType,
  menuClassName: _propTypes.default.string,
  menuStyle: _propTypes.default.object,
  placeholder: _propTypes.default.node,
  placement: _propTypes.default.oneOf(_constants.PLACEMENT),

  /**
   * Prevent floating element overflow
   */
  preventOverflow: _propTypes.default.bool,
  open: _propTypes.default.bool,
  defaultOpen: _propTypes.default.bool,
  cleanable: _propTypes.default.bool,
  renderExtraFooter: _propTypes.default.func,
  renderValue: _propTypes.default.func,
  positionRef: _utils.refType,
  onOpen: _propTypes.default.func,
  onClose: _propTypes.default.func,
  onClean: _propTypes.default.func,

  /** @deprecated Use `onClose` instead */
  onHide: _propTypes.default.func
});
exports.pickerPropTypes = pickerPropTypes;
var listPickerPropTypes = (0, _extends2.default)({}, pickerPropTypes, {
  data: _propTypes.default.array,
  valueKey: _propTypes.default.string,
  labelKey: _propTypes.default.string,
  childrenKey: _propTypes.default.string,
  disabledItemValues: _propTypes.default.array,
  value: _propTypes.default.any,
  defaultValue: _propTypes.default.any,
  onChange: _propTypes.default.func
});
exports.listPickerPropTypes = listPickerPropTypes;
var pickerDefaultProps = {
  cleanable: true,
  placement: 'bottomStart',
  appearance: 'default'
};
exports.pickerDefaultProps = pickerDefaultProps;
var listPickerDefaultProps = (0, _extends2.default)({}, pickerDefaultProps, {
  data: [],
  disabledItemValues: [],
  childrenKey: 'children',
  valueKey: 'value',
  labelKey: 'label'
});
exports.listPickerDefaultProps = listPickerDefaultProps;