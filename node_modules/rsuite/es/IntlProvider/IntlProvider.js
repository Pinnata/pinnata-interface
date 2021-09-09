import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import createContext from '../utils/createContext';
export var IntlGlobalContext = createContext(null);

var IntlProvider = function IntlProvider(_ref) {
  var locale = _ref.locale,
      rtl = _ref.rtl,
      children = _ref.children,
      formatDate = _ref.formatDate;
  return React.createElement(IntlGlobalContext.Provider, {
    value: _extends({}, locale, {
      rtl: rtl,
      formatDate: formatDate
    })
  }, children);
};

export default IntlProvider;