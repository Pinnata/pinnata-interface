import * as React from 'react';
export default function createContext(defaultValue) {
  var context = {
    Provider: React.Fragment,
    Consumer: React.Fragment
  };
  var ReactContext = React.createContext ? /*#__PURE__*/React.createContext(defaultValue) : context;
  return ReactContext;
}