import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from '../Overlay/OverlayTrigger';
import { createChainedFunction, placementPolyfill, refType, mergeRefs } from '../utils';
import IntlContext from '../IntlProvider/IntlContext';
export var overlayProps = ['placement', 'shouldUpdatePosition', 'arrowOffsetLeft', 'arrowOffsetTop', 'positionLeft', 'positionTop'];
var Whisper = React.forwardRef(function (props, ref) {
  var triggerRef = props.triggerRef,
      onOpen = props.onOpen,
      onClose = props.onClose,
      onEntered = props.onEntered,
      onExited = props.onExited,
      _props$placement = props.placement,
      placement = _props$placement === void 0 ? 'right' : _props$placement,
      preventOverflow = props.preventOverflow,
      rest = _objectWithoutPropertiesLoose(props, ["triggerRef", "onOpen", "onClose", "onEntered", "onExited", "placement", "preventOverflow"]);

  return React.createElement(IntlContext.Consumer, null, function (context) {
    return React.createElement(OverlayTrigger, _extends({
      preventOverflow: preventOverflow,
      placement: placementPolyfill(placement, context === null || context === void 0 ? void 0 : context.rtl),
      onEntered: createChainedFunction(onOpen, onEntered),
      onExited: createChainedFunction(onClose, onExited),
      ref: mergeRefs(ref, triggerRef) // for test

    }, rest));
  });
});
Whisper.displayName = 'Whisper';
Whisper.propTypes = {
  triggerRef: refType,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onEntered: PropTypes.func,
  onExited: PropTypes.func,
  placement: PropTypes.string,

  /**
   * Prevent floating element overflow
   */
  preventOverflow: PropTypes.bool
};
export default Whisper;