"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _recompose = require("recompose");

var _BreadcrumbItem = _interopRequireDefault(require("./BreadcrumbItem"));

var _utils = require("../utils");

var Breadcrumb =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Breadcrumb, _React$Component);

  function Breadcrumb() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      ellipsis: true
    };

    _this.addPrefix = function (className) {
      return (0, _utils.prefix)(_this.props.classPrefix)(className);
    };

    _this.handleClickEllipsis = function (event) {
      var _this$props$onExpand, _this$props;

      _this.setState({
        ellipsis: false
      });

      (_this$props$onExpand = (_this$props = _this.props).onExpand) === null || _this$props$onExpand === void 0 ? void 0 : _this$props$onExpand.call(_this$props, event);
    };

    return _this;
  }

  var _proto = Breadcrumb.prototype;

  _proto.getSeparatorNode = function getSeparatorNode(key) {
    return React.createElement("li", {
      key: key,
      className: this.addPrefix('separator')
    }, this.props.separator);
  };

  _proto.getCollapseItems = function getCollapseItems(items, total) {
    if (total > this.props.maxItems && total > 2 && this.state.ellipsis) {
      return [items[0], items[1], [React.createElement(_BreadcrumbItem.default, {
        key: "2",
        onClick: this.handleClickEllipsis
      }, React.createElement("span", null, "..."))], items[items.length - 2], items[items.length - 1]];
    }

    return items;
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        classPrefix = _this$props2.classPrefix,
        Component = _this$props2.componentClass,
        className = _this$props2.className,
        children = _this$props2.children,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["classPrefix", "componentClass", "className", "children"]);
    var unhandledProps = (0, _utils.getUnhandledProps)(Breadcrumb, rest);
    var total = React.Children.count(children);
    var items = [];

    if (total) {
      React.Children.forEach(children, function (item, index) {
        items.push(item);

        if (index < total - 1) {
          items.push(_this2.getSeparatorNode(index));
        }
      });
    }

    return React.createElement(Component, (0, _extends2.default)({}, unhandledProps, {
      role: "navigation",
      "aria-label": "breadcrumbs",
      className: (0, _classnames.default)(classPrefix, className)
    }), this.getCollapseItems(items, total));
  };

  return Breadcrumb;
}(React.Component);

Breadcrumb.propTypes = {
  separator: _propTypes.default.node,
  componentClass: _propTypes.default.elementType,
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  maxItems: _propTypes.default.number,
  onExpand: _propTypes.default.func
};
Breadcrumb.defaultProps = {
  separator: '/',
  maxItems: 5
};
var EnhancedBreadcrumb = (0, _utils.defaultProps)({
  classPrefix: 'breadcrumb',
  componentClass: 'ol'
})(Breadcrumb);
(0, _recompose.setStatic)('Item', _BreadcrumbItem.default)(EnhancedBreadcrumb);
var _default = EnhancedBreadcrumb;
exports.default = _default;
module.exports = exports.default;