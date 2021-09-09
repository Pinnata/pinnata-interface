"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends4 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../utils");

var _ReactChildren = _interopRequireDefault(require("../utils/ReactChildren"));

var Carousel =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Carousel, _React$Component);

  function Carousel(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this._autoplayTimer = null;
    _this._key = (Math.random() * 1e18).toString(36).slice(0, 6);

    _this.handleAutoplay = function (nextActiveIndex) {
      var children = _this.props.children;
      var activeIndex = _this.state.activeIndex;

      _this.clearTimer();

      var count = _ReactChildren.default.count(children);

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

    var count = _ReactChildren.default.count(children);

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
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["componentClass", "children", "classPrefix", "className", "placement", "shape", "locale"]);
    var _this$state = this.state,
        activeIndex = _this$state.activeIndex,
        lastIndex = _this$state.lastIndex;
    var addPrefix = (0, _utils.prefix)(classPrefix);

    var count = _ReactChildren.default.count(children);

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
        style: (0, _extends4.default)({}, child.props.style, (_extends2 = {}, _extends2[lengthKey] = 100 / count + "%", _extends2)),
        className: (0, _classnames.default)(addPrefix('slider-item'), child.props.className)
      });
    });
    var classes = (0, _classnames.default)(className, classPrefix, addPrefix("placement-" + placement), addPrefix("shape-" + shape));
    var unhandled = (0, _utils.getUnhandledProps)(Carousel, rest);
    var positiveOrder = vertical || !(locale === null || locale === void 0 ? void 0 : locale.rtl);
    var sign = positiveOrder ? '-' : '';
    var activeRatio = "" + sign + 100 / count * activeIndex + "%";
    var sliderStyles = (_sliderStyles = {}, _sliderStyles[lengthKey] = count * 100 + "%", _sliderStyles.transform = vertical ? "translate3d(0, " + activeRatio + " ,0)" : "translate3d(" + activeRatio + ", 0 ,0)", _sliderStyles);
    var showMask = count > 1 && activeIndex === 0 && activeIndex !== lastIndex;
    return React.createElement(Component, (0, _extends4.default)({
      className: classes
    }, unhandled), React.createElement("div", {
      className: addPrefix('content')
    }, React.createElement("div", {
      className: addPrefix('slider'),
      style: sliderStyles
    }, items), showMask && React.createElement("div", {
      className: (0, _classnames.default)(addPrefix('slider-after'), (_classNames = {}, _classNames[addPrefix('slider-after-vertical')] = vertical, _classNames)),
      style: (_ref = {}, _ref[lengthKey] = '200%', _ref)
    }, [items[items.length - 1], items[0]].map(function (node) {
      var _extends3;

      return React.cloneElement(node, {
        key: node.key,
        style: (0, _extends4.default)({}, node.props.style, (_extends3 = {}, _extends3[lengthKey] = '50%', _extends3))
      });
    }))), React.createElement("div", {
      className: addPrefix('toolbar')
    }, React.createElement("ul", null, labels)));
  };

  return Carousel;
}(React.Component);

Carousel.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  componentClass: _propTypes.default.elementType,
  autoplay: _propTypes.default.bool,
  autoplayInterval: _propTypes.default.number,
  placement: _propTypes.default.oneOf(['top', 'bottom', 'left', 'right']),
  shape: _propTypes.default.oneOf(['dot', 'bar'])
};
Carousel.defaultProps = {
  autoplayInterval: 4000,
  placement: 'bottom',
  shape: 'dot',
  locale: {}
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'carousel',
  componentClass: 'div'
})(Carousel);

exports.default = _default;
module.exports = exports.default;