"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _recompose = require("recompose");

var _rsuiteTable = require("rsuite-table");

var _utils = require("../utils");

var _withLocale = _interopRequireDefault(require("../IntlProvider/withLocale"));

var _TablePagination = _interopRequireDefault(require("./TablePagination"));

var EnhancedLocaleTable = (0, _recompose.compose)((0, _withLocale.default)(['Table']), (0, _utils.defaultProps)({
  loadAnimation: true
}))(_rsuiteTable.Table);
(0, _recompose.setStatic)('Column', _rsuiteTable.Column)(EnhancedLocaleTable);
(0, _recompose.setStatic)('ColumnGroup', _rsuiteTable.ColumnGroup)(EnhancedLocaleTable);
(0, _recompose.setStatic)('Cell', _rsuiteTable.Cell)(EnhancedLocaleTable);
(0, _recompose.setStatic)('HeaderCell', _rsuiteTable.HeaderCell)(EnhancedLocaleTable);
(0, _recompose.setStatic)('Pagination', _TablePagination.default)(EnhancedLocaleTable);
var _default = EnhancedLocaleTable;
exports.default = _default;
module.exports = exports.default;