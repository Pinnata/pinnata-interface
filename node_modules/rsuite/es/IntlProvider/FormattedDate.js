import * as React from 'react';
import IntlContext from './IntlContext';
import format from 'date-fns/format';

function FormattedDate(_ref) {
  var date = _ref.date,
      formatStr = _ref.formatStr;
  return React.createElement(IntlContext.Consumer, null, function (options) {
    var formatDate = (options === null || options === void 0 ? void 0 : options.formatDate) || format;
    return formatDate(date, formatStr);
  });
}

export default FormattedDate;