"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _get = _interopRequireDefault(require("lodash/get"));

var _pick = _interopRequireDefault(require("lodash/pick"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _domLib = require("dom-lib");

var _Overlay = _interopRequireDefault(require("./Overlay"));

var _createChainedFunction = _interopRequireDefault(require("../utils/createChainedFunction"));

var _isOneOf = _interopRequireDefault(require("../utils/isOneOf"));

var _getDOMNode = _interopRequireDefault(require("../utils/getDOMNode"));

var _Portal = _interopRequireDefault(require("../Portal"));

function onMouseEventHandler(handler, event) {
  var target = event.currentTarget;
  var related = event.relatedTarget || (0, _get.default)(event, ['nativeEvent', 'toElement']);

  if ((!related || related !== target) && !(0, _domLib.contains)(target, related)) {
    handler(event);
  }
}

var OverlayTrigger =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(OverlayTrigger, _React$Component);

  function OverlayTrigger(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.onMouseOverListener = void 0;
    _this.onMouseOutListener = void 0;
    _this.delayShowTimer = void 0;
    _this.delayHideTimer = void 0;
    _this.mouseEnteredToSpeaker = false;
    _this.mouseEnteredToTrigger = false;

    _this.getOverlayTarget = function () {
      return (0, _getDOMNode.default)((0, _assertThisInitialized2.default)(_this));
    };

    _this.handleSpeakerMouseEnter = function () {
      _this.mouseEnteredToSpeaker = true;
    };

    _this.handleSpeakerMouseLeave = function () {
      var trigger = _this.props.trigger;
      _this.mouseEnteredToSpeaker = false;

      if (!(0, _isOneOf.default)('click', trigger) && !(0, _isOneOf.default)('active', trigger) && !(0, _isOneOf.default)('contextMenu', trigger)) {
        _this.hideWithCheck();
      }
    };

    _this.open = function (delay) {
      _this.show(delay);
    };

    _this.close = function (delay) {
      _this.hide(delay);
    };

    _this.show = function (delay) {
      if (delay) {
        return _this.delayShowTimer = setTimeout(function () {
          _this.delayShowTimer = null;

          _this.setState({
            isOverlayShown: true
          });
        }, delay);
      }

      _this.setState({
        isOverlayShown: true
      });
    };

    _this.hide = function (delay) {
      if (delay) {
        return _this.delayHideTimer = setTimeout(function () {
          _this.delayHideTimer = null;

          _this.setState({
            isOverlayShown: false
          });
        }, delay);
      }

      _this.setState({
        isOverlayShown: false
      });
    };

    _this.hideWithCheck = function (delay) {
      if (!_this.mouseEnteredToSpeaker && !_this.mouseEnteredToTrigger) {
        _this.hide(delay);
      }
    };

    _this.toggleHideAndShow = function () {
      var _this$props = _this.props,
          delayShow = _this$props.delayShow,
          delay = _this$props.delay,
          delayHide = _this$props.delayHide;

      if (_this.state.isOverlayShown) {
        _this.hideWithCheck((0, _isNil.default)(delayHide) ? delay : delayHide);
      } else {
        _this.show((0, _isNil.default)(delayShow) ? delay : delayShow);
      }
    };

    _this.preventDefault = function (event) {
      event.preventDefault();
    };

    _this.handleDelayedShow = function () {
      var _this$props2 = _this.props,
          delayShow = _this$props2.delayShow,
          enterable = _this$props2.enterable;
      var delay = (0, _isNil.default)(delayShow) ? _this.props.delay : delayShow;

      if (!enterable) {
        return _this.show(delay);
      }

      _this.mouseEnteredToTrigger = true;

      if (!(0, _isNil.default)(_this.delayHideTimer)) {
        clearTimeout(_this.delayHideTimer);
        _this.delayHideTimer = null;
        return _this.show(delay);
      }

      if (_this.state.isOverlayShown) {
        return;
      }

      _this.show(delay);
    };

    _this.handleDelayedHide = function () {
      var _this$props3 = _this.props,
          delayHide = _this$props3.delayHide,
          enterable = _this$props3.enterable;
      var delay = (0, _isNil.default)(delayHide) ? _this.props.delay : delayHide;

      if (!enterable) {
        _this.hide(delay);
      }

      _this.mouseEnteredToTrigger = false;

      if (!(0, _isNil.default)(_this.delayShowTimer)) {
        clearTimeout(_this.delayShowTimer);
        _this.delayShowTimer = null;
        return;
      }

      if (!_this.state.isOverlayShown || !(0, _isNil.default)(_this.delayHideTimer)) {
        return;
      }

      if (!delay) {
        return _this.hideWithCheck();
      }

      _this.delayHideTimer = setTimeout(function () {
        if (_this.state.isOnSpeaker) {
          return;
        }

        clearTimeout(_this.delayHideTimer);
        _this.delayHideTimer = null;

        _this.hideWithCheck();
      }, delay);
    };

    if (props.trigger !== 'none') {
      _this.onMouseOverListener = function (e) {
        return onMouseEventHandler(_this.handleDelayedShow, e);
      };

      _this.onMouseOutListener = function (e) {
        return onMouseEventHandler(_this.handleDelayedHide, e);
      };
    }

    _this.state = {
      isOverlayShown: props.defaultOpen
    };
    return _this;
  }

  var _proto = OverlayTrigger.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.delayShowTimer);
    clearTimeout(this.delayHideTimer);
  };

  _proto.renderOverlay = function renderOverlay() {
    var _this2 = this;

    var _this$props4 = this.props,
        open = _this$props4.open,
        speaker = _this$props4.speaker,
        trigger = _this$props4.trigger,
        onHide = _this$props4.onHide;
    var isOverlayShown = this.state.isOverlayShown;
    var overlayProps = (0, _extends2.default)({}, (0, _pick.default)(this.props, Object.keys(_Overlay.default.propTypes)), {
      show: typeof open === 'undefined' ? isOverlayShown : open,
      target: this.getOverlayTarget
    });

    if ((0, _isOneOf.default)('click', trigger)) {
      overlayProps.onHide = (0, _createChainedFunction.default)(this.hide, onHide);
    } else if ((0, _isOneOf.default)('contextMenu', trigger)) {
      overlayProps.onHide = (0, _createChainedFunction.default)(this.hide, onHide);
    } else if ((0, _isOneOf.default)('active', trigger)) {
      overlayProps.onHide = (0, _createChainedFunction.default)(this.hide, onHide);
    }

    var speakerProps = {
      placement: overlayProps.placement
    };

    if (trigger !== 'none') {
      speakerProps.onMouseEnter = this.handleSpeakerMouseEnter;
      speakerProps.onMouseLeave = this.handleSpeakerMouseLeave;
    }

    if (typeof speaker === 'function') {
      return React.createElement(_Overlay.default, overlayProps, function (props, ref) {
        return speaker((0, _extends2.default)({}, props, {
          onClose: _this2.hide
        }), ref);
      });
    }

    return React.createElement(_Overlay.default, overlayProps, React.cloneElement(speaker, speakerProps));
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        children = _this$props5.children,
        speaker = _this$props5.speaker,
        onClick = _this$props5.onClick,
        onContextMenu = _this$props5.onContextMenu,
        trigger = _this$props5.trigger,
        onMouseOver = _this$props5.onMouseOver,
        onMouseOut = _this$props5.onMouseOut,
        onFocus = _this$props5.onFocus,
        onBlur = _this$props5.onBlur,
        disabled = _this$props5.disabled;
    var triggerComponent = React.Children.only(children);
    var triggerProps = triggerComponent.props;
    var props = {
      key: 'triggerComponent',
      onClick: (0, _createChainedFunction.default)(triggerProps.onClick, onClick),
      'aria-describedby': (0, _get.default)(speaker, ['props', 'id'])
    };

    if (!disabled) {
      if ((0, _isOneOf.default)('click', trigger)) {
        props.onClick = (0, _createChainedFunction.default)(this.toggleHideAndShow, props.onClick);
      }

      if ((0, _isOneOf.default)('contextMenu', trigger)) {
        props.onContextMenu = (0, _createChainedFunction.default)(this.preventDefault, this.toggleHideAndShow, triggerProps.onContextMenu, onContextMenu);
      }

      if ((0, _isOneOf.default)('active', trigger)) {
        props.onClick = (0, _createChainedFunction.default)(this.handleDelayedShow, props.onClick);
      }

      if ((0, _isOneOf.default)('hover', trigger)) {
        props.onMouseOver = (0, _createChainedFunction.default)(this.onMouseOverListener, triggerProps.onMouseOver, onMouseOver);
        props.onMouseOut = (0, _createChainedFunction.default)(this.onMouseOutListener, triggerProps.onMouseOut, onMouseOut);
      }

      if ((0, _isOneOf.default)('focus', trigger)) {
        props.onFocus = (0, _createChainedFunction.default)(this.handleDelayedShow, triggerProps.onFocus, onFocus);
        props.onBlur = (0, _createChainedFunction.default)(this.handleDelayedHide, triggerProps.onBlur, onBlur);
      }
    }

    return [React.cloneElement(triggerComponent, props), React.createElement(_Portal.default, {
      key: "portal"
    }, this.renderOverlay())];
  };

  return OverlayTrigger;
}(React.Component);

OverlayTrigger.defaultProps = {
  trigger: ['hover', 'focus'],
  delayHide: 200,
  placement: 'bottomStart',
  rootClose: true
};
var _default = OverlayTrigger;
exports.default = _default;
module.exports = exports.default;