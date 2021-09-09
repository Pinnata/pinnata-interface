"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var React = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _format = _interopRequireDefault(require("date-fns/format"));

var _default2 = _interopRequireDefault(require("./locales/default"));

var _extendReactStatics = _interopRequireDefault(require("../utils/extendReactStatics"));

var _IntlProvider = require("./IntlProvider");

var mergeObject = function mergeObject(list) {
  return list.reduce(function (a, b) {
    a = (0, _extends2.default)({}, a, {}, b);
    return a;
  }, {});
};

function withLocale(combineKeys) {
  if (combineKeys === void 0) {
    combineKeys = [];
  }

  return function (BaseComponent) {
    var WithLocale = React.forwardRef(function (props, ref) {
      return React.createElement(_IntlProvider.IntlGlobalContext.Consumer, null, function (options) {
        var locale = mergeObject(combineKeys.map(function (key) {
          return (0, _get2.default)(options || _default2.default, "" + key);
        }));

        if (options && typeof options.rtl !== undefined) {
          locale.rtl = options.rtl;
        } else if (typeof window !== 'undefined' && (document.body.getAttribute('dir') || document.dir) === 'rtl') {
          locale.rtl = true;
        }

        locale.formatDate = (options === null || options === void 0 ? void 0 : options.formatDate) || _format.default;
        return React.createElement(BaseComponent, (0, _extends2.default)({
          ref: ref,
          locale: locale
        }, props));
      });
    });
    WithLocale.displayName = BaseComponent.displayName;
    (0, _extendReactStatics.default)(WithLocale, BaseComponent, ['defaultProps']);

    if (process.env.RUN_ENV === 'test') {
      return (0, _recompose.setDisplayName)((0, _recompose.wrapDisplayName)(BaseComponent, '__test__'))(WithLocale);
    }

    return (0, _recompose.setDisplayName)((0, _recompose.wrapDisplayName)(BaseComponent, 'withLocale'))(WithLocale);
  };
}

var _default = withLocale;
exports.default = _default;
module.exports = exports.default;