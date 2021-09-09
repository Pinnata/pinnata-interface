"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _IntlContext = _interopRequireDefault(require("./IntlContext"));

var _format = _interopRequireDefault(require("date-fns/format"));

function FormattedDate(_ref) {
  var date = _ref.date,
      formatStr = _ref.formatStr;
  return React.createElement(_IntlContext.default.Consumer, null, function (options) {
    var formatDate = (options === null || options === void 0 ? void 0 : options.formatDate) || _format.default;
    return formatDate(date, formatStr);
  });
}

var _default = FormattedDate;
exports.default = _default;
module.exports = exports.default;