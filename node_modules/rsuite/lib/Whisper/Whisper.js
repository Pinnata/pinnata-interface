"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.overlayProps = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _OverlayTrigger = _interopRequireDefault(require("../Overlay/OverlayTrigger"));

var _utils = require("../utils");

var _IntlContext = _interopRequireDefault(require("../IntlProvider/IntlContext"));

var overlayProps = ['placement', 'shouldUpdatePosition', 'arrowOffsetLeft', 'arrowOffsetTop', 'positionLeft', 'positionTop'];
exports.overlayProps = overlayProps;
var Whisper = React.forwardRef(function (props, ref) {
  var triggerRef = props.triggerRef,
      onOpen = props.onOpen,
      onClose = props.onClose,
      onEntered = props.onEntered,
      onExited = props.onExited,
      _props$placement = props.placement,
      placement = _props$placement === void 0 ? 'right' : _props$placement,
      preventOverflow = props.preventOverflow,
      rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["triggerRef", "onOpen", "onClose", "onEntered", "onExited", "placement", "preventOverflow"]);
  return React.createElement(_IntlContext.default.Consumer, null, function (context) {
    return React.createElement(_OverlayTrigger.default, (0, _extends2.default)({
      preventOverflow: preventOverflow,
      placement: (0, _utils.placementPolyfill)(placement, context === null || context === void 0 ? void 0 : context.rtl),
      onEntered: (0, _utils.createChainedFunction)(onOpen, onEntered),
      onExited: (0, _utils.createChainedFunction)(onClose, onExited),
      ref: (0, _utils.mergeRefs)(ref, triggerRef) // for test

    }, rest));
  });
});
Whisper.displayName = 'Whisper';
Whisper.propTypes = {
  triggerRef: _utils.refType,
  onOpen: _propTypes.default.func,
  onClose: _propTypes.default.func,
  onEntered: _propTypes.default.func,
  onExited: _propTypes.default.func,
  placement: _propTypes.default.string,

  /**
   * Prevent floating element overflow
   */
  preventOverflow: _propTypes.default.bool
};
var _default = Whisper;
exports.default = _default;