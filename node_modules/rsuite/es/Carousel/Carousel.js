import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix, defaultProps, getUnhandledProps } from '../utils';
import ReactChildren from '../utils/ReactChildren';

var Carousel =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Carousel, _React$Component);

  function Carousel(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this._autoplayTimer = null;
    _this._key = (Math.random() * 1e18).toString(36).slice(0, 6);

    _this.handleAutoplay = function (nextActiveIndex) {
      var children = _this.props.children;
      var activeIndex = _this.state.activeIndex;

      _this.clearTimer();

      var count = ReactChildren.count(children);
      var nextIndex = nextActiveIndex !== null && nextActiveIndex !== void 0 ? nextActiveIndex : activeIndex + 1;

      _this.setState({
        activeIndex: nextIndex % count,
        lastIndex: nextActiveIndex == null ? activeIndex : nextIndex % count
      });

      _this.triggerAutoPlay();
    };

    _this.handleChange = function (event) {
      var activeIndex = +event.target.value;

      _this.handleAutoplay(activeIndex);
    };

    _this.state = {
      activeIndex: 0,
      lastIndex: 0
    };
    return _this;
  }

  var _proto = Carousel.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.triggerAutoPlay();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.triggerAutoPlay();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.clearTimer();
  };

  _proto.triggerAutoPlay = function triggerAutoPlay() {
    var _this$props = this.props,
        autoplay = _this$props.autoplay,
        autoplayInterval = _this$props.autoplayInterval,
        children = _this$props.children;
    var count = ReactChildren.count(children);

    if (!this._autoplayTimer && autoplay && count > 1) {
      this._autoplayTimer = setTimeout(this.handleAutoplay, autoplayInterval);
    }
  };

  _proto.clearTimer = function clearTimer() {
    clearTimeout(this._autoplayTimer);
    this._autoplayTimer = null;
  };

  _proto.render = function render() {
    var _this2 = this,
        _sliderStyles,
        _classNames,
        _ref;

    var _this$props2 = this.props,
        Component = _this$props2.componentClass,
        children = _this$props2.children,
        classPrefix = _this$props2.classPrefix,
        className = _this$props2.className,
        placement = _this$props2.placement,
        shape = _this$props2.shape,
        locale = _this$props2.locale,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["componentClass", "children", "classPrefix", "className", "placement", "shape", "locale"]);

    var _this$state = this.state,
        activeIndex = _this$state.activeIndex,
        lastIndex = _this$state.lastIndex;
    var addPrefix = prefix(classPrefix);
    var count = ReactChildren.count(children);
    var labels = [];
    var vertical = placement === 'left' || placement === 'right';
    var lengthKey = vertical ? 'height' : 'width';
    var items = React.Children.map(children, function (child, index) {
      var _extends2;

      if (!child) {
        return;
      }

      var inputKey = "indicator_" + _this2._key + "_" + index;
      labels.push(React.createElement("li", {
        key: "label" + index,
        className: addPrefix('label-wrapper')
      }, React.createElement("input", {
        name: inputKey,
        id: inputKey,
        type: "radio",
        onChange: _this2.handleChange,
        value: index,
        checked: activeIndex === index
      }), React.createElement("label", {
        htmlFor: inputKey,
        className: addPrefix('label')
      })));
      return React.cloneElement(child, {
        key: "slider-item" + index,
        style: _extends({}, child.props.style, (_extends2 = {}, _extends2[lengthKey] = 100 / count + "%", _extends2)),
        className: classNames(addPrefix('slider-item'), child.props.className)
      });
    });
    var classes = classNames(className, classPrefix, addPrefix("placement-" + placement), addPrefix("shape-" + shape));
    var unhandled = getUnhandledProps(Carousel, rest);
    var positiveOrder = vertical || !(locale === null || locale === void 0 ? void 0 : locale.rtl);
    var sign = positiveOrder ? '-' : '';
    var activeRatio = "" + sign + 100 / count * activeIndex + "%";
    var sliderStyles = (_sliderStyles = {}, _sliderStyles[lengthKey] = count * 100 + "%", _sliderStyles.transform = vertical ? "translate3d(0, " + activeRatio + " ,0)" : "translate3d(" + activeRatio + ", 0 ,0)", _sliderStyles);
    var showMask = count > 1 && activeIndex === 0 && activeIndex !== lastIndex;
    return React.createElement(Component, _extends({
      className: classes
    }, unhandled), React.createElement("div", {
      className: addPrefix('content')
    }, React.createElement("div", {
      className: addPrefix('slider'),
      style: sliderStyles
    }, items), showMask && React.createElement("div", {
      className: classNames(addPrefix('slider-after'), (_classNames = {}, _classNames[addPrefix('slider-after-vertical')] = vertical, _classNames)),
      style: (_ref = {}, _ref[lengthKey] = '200%', _ref)
    }, [items[items.length - 1], items[0]].map(function (node) {
      var _extends3;

      return React.cloneElement(node, {
        key: node.key,
        style: _extends({}, node.props.style, (_extends3 = {}, _extends3[lengthKey] = '50%', _extends3))
      });
    }))), React.createElement("div", {
      className: addPrefix('toolbar')
    }, React.createElement("ul", null, labels)));
  };

  return Carousel;
}(React.Component);

Carousel.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  componentClass: PropTypes.elementType,
  autoplay: PropTypes.bool,
  autoplayInterval: PropTypes.number,
  placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  shape: PropTypes.oneOf(['dot', 'bar'])
};
Carousel.defaultProps = {
  autoplayInterval: 4000,
  placement: 'bottom',
  shape: 'dot',
  locale: {}
};
export default defaultProps({
  classPrefix: 'carousel',
  componentClass: 'div'
})(Carousel);