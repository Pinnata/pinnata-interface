import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import format from "date-fns/format";
import getDate from "date-fns/get_date";
import isAfter from "date-fns/is_after";
import isBefore from "date-fns/is_before";
import isSameDay from "date-fns/is_same_day";
import addDays from "date-fns/add_days";
import { getUnhandledProps, prefix, defaultProps } from '../../utils';
import IntlContext from '../../IntlProvider/IntlContext';
import { DATERANGE_DISABLED_TARGET } from '../../constants';

var TableRow =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TableRow, _React$Component);

  function TableRow() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
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

      var thisDate = addDays(weekendDate, i);
      var _selectValue = [selectedStartDate, selectedEndDate];
      var disabled = disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(thisDate, _selectValue, DATERANGE_DISABLED_TARGET.CALENDAR);
      var isToday = isSameDay(thisDate, new Date());
      var unSameMonth = !(inSameMonth === null || inSameMonth === void 0 ? void 0 : inSameMonth(thisDate));
      var isStartSelected = !unSameMonth && selectedStartDate && isSameDay(thisDate, selectedStartDate);
      var isEndSelected = !unSameMonth && selectedEndDate && isSameDay(thisDate, selectedEndDate);
      var isSelected = isStartSelected || isEndSelected;
      var inRange = false; // for Selected

      if (selectedStartDate && selectedEndDate) {
        if (isBefore(thisDate, selectedEndDate) && isAfter(thisDate, selectedStartDate)) {
          inRange = true;
        }

        if (isBefore(thisDate, selectedStartDate) && isAfter(thisDate, selectedEndDate)) {
          inRange = true;
        }
      } // for Hovering


      if (!isSelected && hoverEndDate && hoverStartDate) {
        if (!isAfter(thisDate, hoverEndDate) && !isBefore(thisDate, hoverStartDate)) {
          inRange = true;
        }

        if (!isAfter(thisDate, hoverStartDate) && !isBefore(thisDate, hoverEndDate)) {
          inRange = true;
        }
      }

      var classes = classNames(this.addPrefix('cell'), (_classNames = {}, _classNames[this.addPrefix('cell-un-same-month')] = unSameMonth, _classNames[this.addPrefix('cell-is-today')] = isToday, _classNames[this.addPrefix('cell-selected-start')] = isStartSelected, _classNames[this.addPrefix('cell-selected-end')] = isEndSelected, _classNames[this.addPrefix('cell-selected')] = isSelected, _classNames[this.addPrefix('cell-in-range')] = !unSameMonth && inRange, _classNames[this.addPrefix('cell-disabled')] = disabled, _classNames));
      var title = formatDate ? formatDate(thisDate, formatStr) : format(thisDate, formatStr);
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
      }, getDate(thisDate))));
    }

    return days;
  };

  _proto.renderWeekNumber = function renderWeekNumber() {
    return React.createElement("div", {
      className: this.addPrefix('cell-week-number')
    }, format(this.props.weekendDate, 'W'));
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        className = _this$props2.className,
        showWeekNumbers = _this$props2.showWeekNumbers,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["className", "showWeekNumbers"]);

    var classes = classNames(this.addPrefix('row'), className);
    var unhandled = getUnhandledProps(TableRow, rest);
    return React.createElement("div", _extends({}, unhandled, {
      className: classes
    }), showWeekNumbers && this.renderWeekNumber(), this.renderDays());
  };

  return TableRow;
}(React.Component);

TableRow.contextType = IntlContext;
TableRow.propTypes = {
  weekendDate: PropTypes.instanceOf(Date),
  selected: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  hoverValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  onSelect: PropTypes.func,
  disabledDate: PropTypes.func,
  inSameMonth: PropTypes.func,
  onMouseMove: PropTypes.func
};
TableRow.defaultProps = {
  selected: [],
  hoverValue: []
};
var enhance = defaultProps({
  classPrefix: 'calendar-table'
});
export default enhance(TableRow);