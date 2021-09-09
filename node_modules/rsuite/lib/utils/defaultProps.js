"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _prefix = require("./prefix");

var _extendReactStatics = _interopRequireDefault(require("./extendReactStatics"));

function defaultProps(props) {
  var classPrefix = props.classPrefix,
      rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["classPrefix"]);
  return function (BaseComponent) {
    var DefaultProps = React.forwardRef(function (ownerProps, ref) {
      return React.createElement(BaseComponent, (0, _extends2.default)({
        ref: ref
      }, ownerProps));
    });
    DefaultProps.displayName = BaseComponent.displayName;
    DefaultProps.defaultProps = (0, _extends2.default)({}, BaseComponent.defaultProps, {}, rest, {
      classPrefix: classPrefix ? "" + (0, _prefix.getClassNamePrefix)() + classPrefix : undefined
    });
    (0, _extendReactStatics.default)(DefaultProps, BaseComponent);

    if (process.env.RUN_ENV === 'test') {
      return (0, _recompose.setDisplayName)((0, _recompose.wrapDisplayName)(BaseComponent, '__test__'))(DefaultProps);
    }

    return (0, _recompose.setDisplayName)((0, _recompose.wrapDisplayName)(BaseComponent, 'defaultProps'))(DefaultProps);
  };
}

var _default = defaultProps;
exports.default = _default;
module.exports = exports.default;