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

var _format = _interopRequireDefault(require("date-fns/format"));

var _get_date = _interopRequireDefault(require("date-fns/get_date"));

var _is_after = _interopRequireDefault(require("date-fns/is_after"));

var _is_before = _interopRequireDefault(require("date-fns/is_before"));

var _is_same_day = _interopRequireDefault(require("date-fns/is_same_day"));

var _add_days = _interopRequireDefault(require("date-fns/add_days"));

var _utils = require("../../utils");

var _IntlContext = _interopRequireDefault(require("../../IntlProvider/IntlContext"));

var _constants = require("../../constants");

var TableRow =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(TableRow, _React$Component);

  function TableRow() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    return _this;
  }

  var _proto = TableRow.prototype;

  _proto.renderDays = function renderDays() {
    var _this$props = this.props,
        weekendDate = _this$props.weekendDate,
        disabledDate = _this$props.disabledDate,
        inSameMonth = _this$props.inSameMonth,
        selected = _this$props.selected,
        hoverValue = _this$props.hoverValue,
        onMouseMove = _this$props.onMouseMove,
        onSelect = _this$props.onSelect;

    var _ref = this.context || {},
        formatDate = _ref.formatDate,
        formattedDayPattern = _ref.formattedDayPattern,
        today = _ref.today;

    var formatStr = formattedDayPattern || 'YYYY-MM-DD';
    var days = [];
    var selectedStartDate = selected[0];
    var selectedEndDate = selected[1];
    var hoverStartDate = hoverValue[0] || null;
    var hoverEndDate = hoverValue[1] || null;

    for (var i = 0; i < 7; i += 1) {
      var _classNames;

      var thisDate = (0, _add_days.default)(weekendDate, i);
      var _selectValue = [selectedStartDate, selectedEndDate];
      var disabled = disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(thisDate, _selectValue, _constants.DATERANGE_DISABLED_TARGET.CALENDAR);
      var isToday = (0, _is_same_day.default)(thisDate, new Date());
      var unSameMonth = !(inSameMonth === null || inSameMonth === void 0 ? void 0 : inSameMonth(thisDate));
      var isStartSelected = !unSameMonth && selectedStartDate && (0, _is_same_day.default)(thisDate, selectedStartDate);
      var isEndSelected = !unSameMonth && selectedEndDate && (0, _is_same_day.default)(thisDate, selectedEndDate);
      var isSelected = isStartSelected || isEndSelected;
      var inRange = false; // for Selected

      if (selectedStartDate && selectedEndDate) {
        if ((0, _is_before.default)(thisDate, selectedEndDate) && (0, _is_after.default)(thisDate, selectedStartDate)) {
          inRange = true;
        }

        if ((0, _is_before.default)(thisDate, selectedStartDate) && (0, _is_after.default)(thisDate, selectedEndDate)) {
          inRange = true;
        }
      } // for Hovering


      if (!isSelected && hoverEndDate && hoverStartDate) {
        if (!(0, _is_after.default)(thisDate, hoverEndDate) && !(0, _is_before.default)(thisDate, hoverStartDate)) {
          inRange = true;
        }

        if (!(0, _is_after.default)(thisDate, hoverStartDate) && !(0, _is_before.default)(thisDate, hoverEndDate)) {
          inRange = true;
        }
      }

      var classes = (0, _classnames.default)(this.addPrefix('cell'), (_classNames = {}, _classNames[this.addPrefix('cell-un-same-month')] = unSameMonth, _classNames[this.addPrefix('cell-is-today')] = isToday, _classNames[this.addPrefix('cell-selected-start')] = isStartSelected, _classNames[this.addPrefix('cell-selected-end')] = isEndSelected, _classNames[this.addPrefix('cell-selected')] = isSelected, _classNames[this.addPrefix('cell-in-range')] = !unSameMonth && inRange, _classNames[this.addPrefix('cell-disabled')] = disabled, _classNames));
      var title = formatDate ? formatDate(thisDate, formatStr) : (0, _format.default)(thisDate, formatStr);
      days.push(React.createElement("div", {
        key: title,
        className: classes,
        role: "menu",
        tabIndex: -1,
        title: isToday ? title + " (" + today + ")" : title,
        onMouseEnter: !disabled && onMouseMove ? onMouseMove.bind(null, thisDate) : undefined,
        onClick: !disabled ? onSelect === null || onSelect === void 0 ? void 0 : onSelect.bind(null, thisDate) : undefined
      }, React.createElement("span", {
        className: this.addPrefix('cell-content')
      }, (0, _get_date.default)(thisDate))));
    }

    return days;
  };

  _proto.renderWeekNumber = function renderWeekNumber() {
    return React.createElement("div", {
      className: this.addPrefix('cell-week-number')
    }, (0, _format.default)(this.props.weekendDate, 'W'));
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        className = _this$props2.className,
        showWeekNumbers = _this$props2.showWeekNumbers,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["className", "showWeekNumbers"]);
    var classes = (0, _classnames.default)(this.addPrefix('row'), className);
    var unhandled = (0, _utils.getUnhandledProps)(TableRow, rest);
    return React.createElement("div", (0, _extends2.default)({}, unhandled, {
      className: classes
    }), showWeekNumbers && this.renderWeekNumber(), this.renderDays());
  };

  return TableRow;
}(React.Component);

TableRow.contextType = _IntlContext.default;
TableRow.propTypes = {
  weekendDate: _propTypes.default.instanceOf(Date),
  selected: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  hoverValue: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  onSelect: _propTypes.default.func,
  disabledDate: _propTypes.default.func,
  inSameMonth: _propTypes.default.func,
  onMouseMove: _propTypes.default.func
};
TableRow.defaultProps = {
  selected: [],
  hoverValue: []
};
var enhance = (0, _utils.defaultProps)({
  classPrefix: 'calendar-table'
});

var _default = enhance(TableRow);

exports.default = _default;
module.exports = exports.default;