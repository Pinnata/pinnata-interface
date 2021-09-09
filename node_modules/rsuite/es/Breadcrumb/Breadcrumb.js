import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { setStatic } from 'recompose';
import BreadcrumbItem from './BreadcrumbItem';
import { defaultProps, prefix, getUnhandledProps } from '../utils';

var Breadcrumb =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Breadcrumb, _React$Component);

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
      return prefix(_this.props.classPrefix)(className);
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
      return [items[0], items[1], [React.createElement(BreadcrumbItem, {
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
        rest = _objectWithoutPropertiesLoose(_this$props2, ["classPrefix", "componentClass", "className", "children"]);

    var unhandledProps = getUnhandledProps(Breadcrumb, rest);
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

    return React.createElement(Component, _extends({}, unhandledProps, {
      role: "navigation",
      "aria-label": "breadcrumbs",
      className: classNames(classPrefix, className)
    }), this.getCollapseItems(items, total));
  };

  return Breadcrumb;
}(React.Component);

Breadcrumb.propTypes = {
  separator: PropTypes.node,
  componentClass: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  maxItems: PropTypes.number,
  onExpand: PropTypes.func
};
Breadcrumb.defaultProps = {
  separator: '/',
  maxItems: 5
};
var EnhancedBreadcrumb = defaultProps({
  classPrefix: 'breadcrumb',
  componentClass: 'ol'
})(Breadcrumb);
setStatic('Item', BreadcrumbItem)(EnhancedBreadcrumb);
export default EnhancedBreadcrumb;