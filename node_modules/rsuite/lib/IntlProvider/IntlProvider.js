"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.IntlGlobalContext = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _createContext = _interopRequireDefault(require("../utils/createContext"));

var IntlGlobalContext = (0, _createContext.default)(null);
exports.IntlGlobalContext = IntlGlobalContext;

var IntlProvider = function IntlProvider(_ref) {
  var locale = _ref.locale,
      rtl = _ref.rtl,
      children = _ref.children,
      formatDate = _ref.formatDate;
  return React.createElement(IntlGlobalContext.Provider, {
    value: (0, _extends2.default)({}, locale, {
      rtl: rtl,
      formatDate: formatDate
    })
  }, children);
};

var _default = IntlProvider;
exports.default = _default;