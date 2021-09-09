import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'recompose';
import SafeAnchor from '../SafeAnchor';
import Ripple from '../Ripple';
import { withStyleProps, getUnhandledProps, defaultProps, prefix, isOneOf } from '../utils';

var Button =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Button, _React$Component);

  function Button() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Button.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        active = _this$props.active,
        disabled = _this$props.disabled,
        loading = _this$props.loading,
        block = _this$props.block,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        appearance = _this$props.appearance,
        children = _this$props.children,
        ripple = _this$props.ripple,
        Component = _this$props.componentClass,
        props = _objectWithoutPropertiesLoose(_this$props, ["active", "disabled", "loading", "block", "className", "classPrefix", "appearance", "children", "ripple", "componentClass"]);

    var unhandled = getUnhandledProps(Button, props);
    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, addPrefix(appearance), className, (_classNames = {}, _classNames[addPrefix('active')] = active, _classNames[addPrefix('disabled')] = disabled, _classNames[addPrefix('loading')] = loading, _classNames[addPrefix('block')] = block, _classNames));
    var rippleElement = ripple && !isOneOf(appearance, ['link', 'ghost']) ? React.createElement(Ripple, null) : null;
    var spin = React.createElement("span", {
      className: addPrefix('spin')
    });

    if (Component === 'button') {
      if (unhandled.href) {
        return React.createElement(SafeAnchor, _extends({}, unhandled, {
          "aria-disabled": disabled,
          disabled: disabled,
          className: classes
        }), loading && spin, children, rippleElement);
      }

      unhandled.type = unhandled.type || 'button';
    }

    return React.createElement(Component, _extends({}, unhandled, {
      disabled: disabled,
      className: classes
    }), loading && spin, children, rippleElement);
  };

  return Button;
}(React.Component);

Button.propTypes = {
  appearance: PropTypes.oneOf(['default', 'primary', 'link', 'subtle', 'ghost']),
  active: PropTypes.bool,
  componentClass: PropTypes.elementType,
  children: PropTypes.node,
  block: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  ripple: PropTypes.bool
};
Button.defaultProps = {
  appearance: 'default',
  ripple: true
};
export default compose(withStyleProps({
  hasSize: true,
  hasColor: true
}), defaultProps({
  classPrefix: 'btn',
  componentClass: 'button'
}))(Button);