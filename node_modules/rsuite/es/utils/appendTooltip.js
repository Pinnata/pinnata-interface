import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import Tooltip from '../Tooltip';
import Whisper from '../Whisper';
export default function appendTooltip(_ref) {
  var message = _ref.message,
      rest = _objectWithoutPropertiesLoose(_ref, ["message"]);

  return React.createElement(Whisper, _extends({
    speaker: React.createElement(Tooltip, null, message)
  }, rest));
}