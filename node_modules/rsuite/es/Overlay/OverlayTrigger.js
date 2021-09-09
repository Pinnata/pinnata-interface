import _extends from "@babel/runtime/helpers/esm/extends";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import get from 'lodash/get';
import pick from 'lodash/pick';
import isNil from 'lodash/isNil';
import { contains } from 'dom-lib';
import Overlay from './Overlay';
import createChainedFunction from '../utils/createChainedFunction';
import isOneOf from '../utils/isOneOf';
import getDOMNode from '../utils/getDOMNode';
import Portal from '../Portal';

function onMouseEventHandler(handler, event) {
  var target = event.currentTarget;
  var related = event.relatedTarget || get(event, ['nativeEvent', 'toElement']);

  if ((!related || related !== target) && !contains(target, related)) {
    handler(event);
  }
}

var OverlayTrigger =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(OverlayTrigger, _React$Component);

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
      return getDOMNode(_assertThisInitialized(_this));
    };

    _this.handleSpeakerMouseEnter = function () {
      _this.mouseEnteredToSpeaker = true;
    };

    _this.handleSpeakerMouseLeave = function () {
      var trigger = _this.props.trigger;
      _this.mouseEnteredToSpeaker = false;

      if (!isOneOf('click', trigger) && !isOneOf('active', trigger) && !isOneOf('contextMenu', trigger)) {
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
        _this.hideWithCheck(isNil(delayHide) ? delay : delayHide);
      } else {
        _this.show(isNil(delayShow) ? delay : delayShow);
      }
    };

    _this.preventDefault = function (event) {
      event.preventDefault();
    };

    _this.handleDelayedShow = function () {
      var _this$props2 = _this.props,
          delayShow = _this$props2.delayShow,
          enterable = _this$props2.enterable;
      var delay = isNil(delayShow) ? _this.props.delay : delayShow;

      if (!enterable) {
        return _this.show(delay);
      }

      _this.mouseEnteredToTrigger = true;

      if (!isNil(_this.delayHideTimer)) {
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
      var delay = isNil(delayHide) ? _this.props.delay : delayHide;

      if (!enterable) {
        _this.hide(delay);
      }

      _this.mouseEnteredToTrigger = false;

      if (!isNil(_this.delayShowTimer)) {
        clearTimeout(_this.delayShowTimer);
        _this.delayShowTimer = null;
        return;
      }

      if (!_this.state.isOverlayShown || !isNil(_this.delayHideTimer)) {
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

    var overlayProps = _extends({}, pick(this.props, Object.keys(Overlay.propTypes)), {
      show: typeof open === 'undefined' ? isOverlayShown : open,
      target: this.getOverlayTarget
    });

    if (isOneOf('click', trigger)) {
      overlayProps.onHide = createChainedFunction(this.hide, onHide);
    } else if (isOneOf('contextMenu', trigger)) {
      overlayProps.onHide = createChainedFunction(this.hide, onHide);
    } else if (isOneOf('active', trigger)) {
      overlayProps.onHide = createChainedFunction(this.hide, onHide);
    }

    var speakerProps = {
      placement: overlayProps.placement
    };

    if (trigger !== 'none') {
      speakerProps.onMouseEnter = this.handleSpeakerMouseEnter;
      speakerProps.onMouseLeave = this.handleSpeakerMouseLeave;
    }

    if (typeof speaker === 'function') {
      return React.createElement(Overlay, overlayProps, function (props, ref) {
        return speaker(_extends({}, props, {
          onClose: _this2.hide
        }), ref);
      });
    }

    return React.createElement(Overlay, overlayProps, React.cloneElement(speaker, speakerProps));
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
      onClick: createChainedFunction(triggerProps.onClick, onClick),
      'aria-describedby': get(speaker, ['props', 'id'])
    };

    if (!disabled) {
      if (isOneOf('click', trigger)) {
        props.onClick = createChainedFunction(this.toggleHideAndShow, props.onClick);
      }

      if (isOneOf('contextMenu', trigger)) {
        props.onContextMenu = createChainedFunction(this.preventDefault, this.toggleHideAndShow, triggerProps.onContextMenu, onContextMenu);
      }

      if (isOneOf('active', trigger)) {
        props.onClick = createChainedFunction(this.handleDelayedShow, props.onClick);
      }

      if (isOneOf('hover', trigger)) {
        props.onMouseOver = createChainedFunction(this.onMouseOverListener, triggerProps.onMouseOver, onMouseOver);
        props.onMouseOut = createChainedFunction(this.onMouseOutListener, triggerProps.onMouseOut, onMouseOut);
      }

      if (isOneOf('focus', trigger)) {
        props.onFocus = createChainedFunction(this.handleDelayedShow, triggerProps.onFocus, onFocus);
        props.onBlur = createChainedFunction(this.handleDelayedHide, triggerProps.onBlur, onBlur);
      }
    }

    return [React.cloneElement(triggerComponent, props), React.createElement(Portal, {
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
export default OverlayTrigger;