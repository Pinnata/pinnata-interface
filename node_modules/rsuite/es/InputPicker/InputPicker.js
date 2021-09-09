import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _isArray from "lodash/isArray";
import _isFunction from "lodash/isFunction";
import _isNil from "lodash/isNil";
import _omit from "lodash/omit";
import _pick from "lodash/pick";
import _remove from "lodash/remove";
import _clone from "lodash/clone";
import _isUndefined from "lodash/isUndefined";
import _get from "lodash/get";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getWidth } from 'dom-lib';
import shallowEqual from '../utils/shallowEqual';
import { filterNodesOfTree, findNodeOfTree } from '../utils/treeUtils';
import { defaultProps, prefix, getUnhandledProps, createChainedFunction, tplTransform, getDataGroupBy, mergeRefs } from '../utils';
import { DropdownMenuItem, DropdownMenuCheckItem, getToggleWrapperClassName, onMenuKeyDown, PickerToggle, MenuWrapper, PickerToggleTrigger, shouldDisplay as _shouldDisplay } from '../Picker';
import DropdownMenu, { dropdownMenuPropTypes } from '../Picker/DropdownMenu';
import InputAutosize from './InputAutosize';
import InputSearch from './InputSearch';
import Tag from '../Tag';
import { listPickerPropTypes, listPickerDefaultProps } from '../Picker/propTypes';

var InputPicker =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(InputPicker, _React$Component);

  InputPicker.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data && !shallowEqual(nextProps.data, prevState.data)) {
      return {
        data: nextProps.data,
        newData: [],
        focusItemValue: _get(nextProps, "data.0." + nextProps.valueKey)
      };
    }

    return null;
  };

  function InputPicker(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.menuContainerRef = void 0;
    _this.positionRef = void 0;
    _this.toggleWrapperRef = void 0;
    _this.toggleRef = void 0;
    _this.triggerRef = void 0;
    _this.inputRef = void 0;

    _this.getFocusableMenuItems = function () {
      var menuItems = _this.menuContainerRef.current.menuItems;

      if (!menuItems) {
        return [];
      }

      var items = Object.values(menuItems).map(function (item) {
        return item.props.getItemData();
      });
      return filterNodesOfTree(items, function (item) {
        return _this.shouldDisplay(item);
      });
    };

    _this.getToggleInstance = function () {
      return _this.toggleRef.current;
    };

    _this.focusNextMenuItem = function () {
      var valueKey = _this.props.valueKey;

      _this.findNode(function (items, index) {
        var focusItem = items[index + 1];

        if (!_isUndefined(focusItem)) {
          _this.setState({
            focusItemValue: focusItem[valueKey]
          });
        }
      });
    };

    _this.focusPrevMenuItem = function () {
      var valueKey = _this.props.valueKey;

      _this.findNode(function (items, index) {
        var focusItem = items[index - 1];

        if (!_isUndefined(focusItem)) {
          _this.setState({
            focusItemValue: focusItem[valueKey]
          });
        }
      });
    };

    _this.handleKeyDown = function (event) {
      if (!_this.menuContainerRef.current) {
        return;
      }

      var multi = _this.props.multi;
      onMenuKeyDown(event, {
        down: _this.focusNextMenuItem,
        up: _this.focusPrevMenuItem,
        enter: multi ? _this.selectFocusMenuCheckItem : _this.selectFocusMenuItem,
        esc: _this.handleCloseDropdown,
        del: multi ? _this.removeLastItem : _this.handleClean
      });
    };

    _this.handleClick = function () {
      _this.focusInput();
    };

    _this.selectFocusMenuItem = function (event) {
      var _this$state = _this.state,
          focusItemValue = _this$state.focusItemValue,
          searchKeyword = _this$state.searchKeyword;
      var _this$props = _this.props,
          valueKey = _this$props.valueKey,
          data = _this$props.data,
          disabledItemValues = _this$props.disabledItemValues;

      if (!focusItemValue || !data) {
        return;
      } // If the value is disabled in this option, it is returned.


      if (disabledItemValues === null || disabledItemValues === void 0 ? void 0 : disabledItemValues.some(function (item) {
        return item === focusItemValue;
      })) {
        return;
      } // Find active `MenuItem` by `value`


      var focusItem = findNodeOfTree(_this.getAllData(), function (item) {
        return shallowEqual(item[valueKey], focusItemValue);
      });

      if (!focusItem && focusItemValue === searchKeyword) {
        focusItem = _this.createOption(searchKeyword);
      }

      _this.setState({
        value: focusItemValue,
        searchKeyword: ''
      });

      _this.handleSelect(focusItemValue, focusItem, event);

      _this.handleChange(focusItemValue, event);

      _this.handleCloseDropdown();
    };

    _this.selectFocusMenuCheckItem = function (event) {
      var _this$props2 = _this.props,
          valueKey = _this$props2.valueKey,
          disabledItemValues = _this$props2.disabledItemValues;
      var focusItemValue = _this.state.focusItemValue;

      var value = _this.getValue();

      var data = _this.getAllData();

      if (!focusItemValue || !data) {
        return;
      } // If the value is disabled in this option, it is returned.


      if (disabledItemValues === null || disabledItemValues === void 0 ? void 0 : disabledItemValues.some(function (item) {
        return item === focusItemValue;
      })) {
        return;
      }

      if (!value.some(function (v) {
        return shallowEqual(v, focusItemValue);
      })) {
        value.push(focusItemValue);
      } else {
        _remove(value, function (itemVal) {
          return shallowEqual(itemVal, focusItemValue);
        });
      }

      var focusItem = data.find(function (item) {
        return shallowEqual(_get(item, valueKey), focusItemValue);
      });

      if (!focusItem) {
        focusItem = _this.createOption(focusItemValue);
      }

      _this.setState({
        value: value,
        searchKeyword: ''
      }, _this.updatePosition);

      _this.handleSelect(value, focusItem, event);

      _this.handleChange(value, event);
    };

    _this.handleItemSelect = function (value, item, event) {
      var nextState = {
        value: value,
        focusItemValue: value,
        searchKeyword: ''
      };

      _this.setState(nextState);

      _this.handleSelect(value, item, event);

      _this.handleChange(value, event);

      _this.handleCloseDropdown();
    };

    _this.handleCheckItemSelect = function (nextItemValue, item, event, checked) {
      var value = _this.getValue();

      if (checked) {
        value.push(nextItemValue);
      } else {
        _remove(value, function (itemVal) {
          return shallowEqual(itemVal, nextItemValue);
        });
      }

      var nextState = {
        value: value,
        searchKeyword: '',
        focusItemValue: nextItemValue
      };

      _this.setState(nextState, _this.updatePosition);

      _this.handleSelect(value, item, event);

      _this.handleChange(value, event);

      _this.focusInput();
    };

    _this.handleSelect = function (value, item, event) {
      var _this$props3 = _this.props,
          onSelect = _this$props3.onSelect,
          creatable = _this$props3.creatable;
      var newData = _this.state.newData;
      onSelect === null || onSelect === void 0 ? void 0 : onSelect(value, item, event);

      if (creatable && item.create) {
        delete item.create;

        _this.setState({
          newData: newData.concat(item)
        });
      }
    };

    _this.handleSearch = function (searchKeyword, event) {
      var _filteredData$;

      var _this$props4 = _this.props,
          onSearch = _this$props4.onSearch,
          valueKey = _this$props4.valueKey;
      var filteredData = filterNodesOfTree(_this.getAllData(), function (item) {
        return _this.shouldDisplay(item, searchKeyword);
      });
      var nextState = {
        searchKeyword: searchKeyword,
        focusItemValue: (filteredData === null || filteredData === void 0 ? void 0 : (_filteredData$ = filteredData[0]) === null || _filteredData$ === void 0 ? void 0 : _filteredData$[valueKey]) || searchKeyword
      };

      _this.setState(nextState, _this.updatePosition);

      onSearch === null || onSearch === void 0 ? void 0 : onSearch(searchKeyword, event);
    };

    _this.handleOpenDropdown = function () {
      var _this$triggerRef$curr, _this$triggerRef$curr2;

      (_this$triggerRef$curr = _this.triggerRef.current) === null || _this$triggerRef$curr === void 0 ? void 0 : (_this$triggerRef$curr2 = _this$triggerRef$curr.show) === null || _this$triggerRef$curr2 === void 0 ? void 0 : _this$triggerRef$curr2.call(_this$triggerRef$curr);
    };

    _this.handleCloseDropdown = function () {
      var _this$triggerRef$curr3, _this$triggerRef$curr4;

      (_this$triggerRef$curr3 = _this.triggerRef.current) === null || _this$triggerRef$curr3 === void 0 ? void 0 : (_this$triggerRef$curr4 = _this$triggerRef$curr3.hide) === null || _this$triggerRef$curr4 === void 0 ? void 0 : _this$triggerRef$curr4.call(_this$triggerRef$curr3);
    };

    _this.open = function () {
      var _this$handleOpenDropd, _this2;

      (_this$handleOpenDropd = (_this2 = _this).handleOpenDropdown) === null || _this$handleOpenDropd === void 0 ? void 0 : _this$handleOpenDropd.call(_this2);
    };

    _this.close = function () {
      var _this$handleCloseDrop, _this3;

      (_this$handleCloseDrop = (_this3 = _this).handleCloseDropdown) === null || _this$handleCloseDrop === void 0 ? void 0 : _this$handleCloseDrop.call(_this3);
    };

    _this.handleChange = function (value, event) {
      var _this$props$onChange, _this$props5;

      (_this$props$onChange = (_this$props5 = _this.props).onChange) === null || _this$props$onChange === void 0 ? void 0 : _this$props$onChange.call(_this$props5, value, event);
    };

    _this.handleClean = function (event) {
      var _this$props6 = _this.props,
          disabled = _this$props6.disabled,
          onClean = _this$props6.onClean;
      var searchKeyword = _this.state.searchKeyword;

      if (disabled || searchKeyword !== '') {
        return;
      }

      var nextState = {
        value: null,
        focusItemValue: null,
        searchKeyword: ''
      };

      _this.setState(nextState);

      _this.handleChange(null, event);

      _this.updatePosition();

      onClean === null || onClean === void 0 ? void 0 : onClean(event);
    };

    _this.handleEntered = function () {
      var _this$props$onOpen, _this$props7;

      (_this$props$onOpen = (_this$props7 = _this.props).onOpen) === null || _this$props$onOpen === void 0 ? void 0 : _this$props$onOpen.call(_this$props7);
    };

    _this.handleExited = function () {
      var _this$props8 = _this.props,
          onClose = _this$props8.onClose,
          multi = _this$props8.multi;

      var value = _this.getValue();

      onClose === null || onClose === void 0 ? void 0 : onClose();

      _this.setState({
        focusItemValue: multi ? _get(value, 0) : value,
        searchKeyword: ''
      });
    };

    _this.handleEnter = function () {
      _this.focusInput();

      _this.setState({
        open: true
      });
    };

    _this.handleExit = function () {
      _this.blurInput();

      _this.setState({
        open: false
      });
    };

    _this.handleRemoveItemByTag = function (tag, event) {
      event.stopPropagation();

      var value = _this.getValue();

      _remove(value, function (itemVal) {
        return shallowEqual(itemVal, tag);
      });

      _this.setState({
        value: value
      }, _this.updatePosition);

      _this.handleChange(value, event);
    };

    _this.handleInputFocus = function () {
      var _this$triggerRef$curr5;

      _this.setState({
        open: true
      });

      (_this$triggerRef$curr5 = _this.triggerRef.current) === null || _this$triggerRef$curr5 === void 0 ? void 0 : _this$triggerRef$curr5.show();
    };

    _this.removeLastItem = function (event) {
      var tagName = _get(event, 'target.tagName');

      if (tagName !== 'INPUT') {
        _this.focusInput();

        return;
      }

      if (tagName === 'INPUT' && _get(event, 'target.value')) {
        return;
      }

      var value = _this.getValue();

      value.pop();

      _this.setState({
        value: value
      }, _this.updatePosition);

      _this.handleChange(value, event);
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.renderMenuItem = function (label, item) {
      var _this$props9 = _this.props,
          locale = _this$props9.locale,
          renderMenuItem = _this$props9.renderMenuItem;
      var newLabel = item.create ? React.createElement("span", null, tplTransform(locale.createOption, label)) : label;
      return renderMenuItem ? renderMenuItem(newLabel, item) : newLabel;
    };

    var defaultValue = props.defaultValue,
        groupBy = props.groupBy,
        _valueKey = props.valueKey,
        labelKey = props.labelKey,
        defaultOpen = props.defaultOpen,
        _multi = props.multi,
        _data = props.data;

    var _value = _multi ? defaultValue || [] : defaultValue;

    var _focusItemValue = _multi ? _get(_value, 0) : defaultValue;

    _this.state = {
      data: _data,
      value: _value,
      focusItemValue: _focusItemValue,
      searchKeyword: '',
      newData: [],
      open: defaultOpen,
      maxWidth: 100
    };

    if (groupBy === _valueKey || groupBy === labelKey) {
      throw Error('`groupBy` can not be equal to `valueKey` and `labelKey`');
    }

    _this.menuContainerRef = React.createRef();
    _this.positionRef = React.createRef();
    _this.toggleWrapperRef = React.createRef();
    _this.toggleRef = React.createRef();
    _this.triggerRef = React.createRef();
    _this.inputRef = React.createRef();
    return _this;
  }

  var _proto = InputPicker.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.toggleWrapperRef.current) {
      var maxWidth = getWidth(this.toggleWrapperRef.current);
      this.setState({
        maxWidth: maxWidth
      });
    }
  };

  _proto.getValue = function getValue() {
    var _this$props10 = this.props,
        value = _this$props10.value,
        multi = _this$props10.multi;
    var nextValue = _isUndefined(value) ? this.state.value : value;

    if (multi) {
      return _clone(nextValue) || [];
    }

    return nextValue;
  };

  _proto.getAllData = function getAllData() {
    var data = this.props.data;
    var newData = this.state.newData;
    return [].concat(data, newData);
  };

  _proto.getAllDataAndCache = function getAllDataAndCache() {
    var cacheData = this.props.cacheData;
    var data = this.getAllData();
    return [].concat(data, cacheData);
  };

  _proto.getDateItem = function getDateItem(value) {
    var _this$props11 = this.props,
        placeholder = _this$props11.placeholder,
        valueKey = _this$props11.valueKey,
        labelKey = _this$props11.labelKey; // Find active `MenuItem` by `value`

    var activeItem = findNodeOfTree(this.getAllDataAndCache(), function (item) {
      return shallowEqual(item[valueKey], value);
    });
    var displayElement = placeholder;

    if (_get(activeItem, labelKey)) {
      displayElement = _get(activeItem, labelKey);
    }

    return {
      isValid: !!activeItem,
      activeItem: activeItem,
      displayElement: displayElement
    };
  };

  _proto.createOption = function createOption(value) {
    var _ref2;

    var _this$props12 = this.props,
        valueKey = _this$props12.valueKey,
        labelKey = _this$props12.labelKey,
        groupBy = _this$props12.groupBy,
        locale = _this$props12.locale;

    if (groupBy) {
      var _ref;

      return _ref = {
        create: true
      }, _ref[groupBy] = locale.newItem, _ref[valueKey] = value, _ref[labelKey] = value, _ref;
    }

    return _ref2 = {
      create: true
    }, _ref2[valueKey] = value, _ref2[labelKey] = value, _ref2;
  };

  _proto.focusInput = function focusInput() {
    var input = this.getInput();
    if (!input) return;
    input.focus();
  };

  _proto.blurInput = function blurInput() {
    var input = this.getInput();
    if (!input) return;
    input.blur();
  };

  _proto.getInput = function getInput() {
    var multi = this.props.multi;

    if (multi) {
      var _this$inputRef$curren, _this$inputRef$curren2;

      return (_this$inputRef$curren = this.inputRef.current) === null || _this$inputRef$curren === void 0 ? void 0 : (_this$inputRef$curren2 = _this$inputRef$curren.getInputInstance) === null || _this$inputRef$curren2 === void 0 ? void 0 : _this$inputRef$curren2.call(_this$inputRef$curren);
    }

    return this.inputRef.current;
  };

  /**
   * Index of keyword  in `label`
   * @param {node} label
   */
  _proto.shouldDisplay = function shouldDisplay(item, searchKeyword) {
    var _this$props13 = this.props,
        searchBy = _this$props13.searchBy,
        labelKey = _this$props13.labelKey;
    var label = item === null || item === void 0 ? void 0 : item[labelKey];
    var word = typeof searchKeyword === 'undefined' ? this.state.searchKeyword : searchKeyword;

    if (typeof searchBy === 'function') {
      return searchBy(word, label, item);
    }

    return _shouldDisplay(label, word);
  };

  _proto.findNode = function findNode(focus) {
    var items = this.getFocusableMenuItems();
    var valueKey = this.props.valueKey;
    var focusItemValue = this.state.focusItemValue;

    for (var i = 0; i < items.length; i += 1) {
      if (shallowEqual(focusItemValue, items[i][valueKey])) {
        focus(items, i);
        return;
      }
    }

    focus(items, -1);
  };

  _proto.updatePosition = function updatePosition() {
    var _this$positionRef$cur, _this$positionRef$cur2;

    (_this$positionRef$cur = this.positionRef.current) === null || _this$positionRef$cur === void 0 ? void 0 : (_this$positionRef$cur2 = _this$positionRef$cur.updatePosition) === null || _this$positionRef$cur2 === void 0 ? void 0 : _this$positionRef$cur2.call(_this$positionRef$cur, true);
  };

  _proto.renderDropdownMenu = function renderDropdownMenu() {
    var _this4 = this;

    var _this$props14 = this.props,
        groupBy = _this$props14.groupBy,
        locale = _this$props14.locale,
        renderMenu = _this$props14.renderMenu,
        renderExtraFooter = _this$props14.renderExtraFooter,
        menuClassName = _this$props14.menuClassName,
        menuStyle = _this$props14.menuStyle,
        menuAutoWidth = _this$props14.menuAutoWidth,
        creatable = _this$props14.creatable,
        valueKey = _this$props14.valueKey,
        multi = _this$props14.multi,
        sort = _this$props14.sort,
        virtualized = _this$props14.virtualized;
    var _this$state2 = this.state,
        focusItemValue = _this$state2.focusItemValue,
        searchKeyword = _this$state2.searchKeyword;
    var menuClassPrefix = this.addPrefix(multi ? 'check-menu' : 'select-menu');
    var classes = classNames(menuClassPrefix, menuClassName);
    var allData = this.getAllData();
    var filteredData = filterNodesOfTree(allData, function (item) {
      return _this4.shouldDisplay(item);
    });

    if (creatable && searchKeyword && !findNodeOfTree(allData, function (item) {
      return item[valueKey] === searchKeyword;
    })) {
      filteredData = [].concat(filteredData, [this.createOption(searchKeyword)]);
    } // Create a tree structure data when set `groupBy`


    if (groupBy) {
      filteredData = getDataGroupBy(filteredData, groupBy, sort);
    } else if (typeof sort === 'function') {
      filteredData = filteredData.sort(sort(false));
    }

    var menuProps = _pick(this.props, Object.keys(_omit(dropdownMenuPropTypes, ['className', 'style', 'classPrefix'])));

    var value = this.getValue();
    var menu = filteredData.length ? React.createElement(DropdownMenu, _extends({}, menuProps, {
      classPrefix: menuClassPrefix,
      dropdownMenuItemClassPrefix: multi ? undefined : menuClassPrefix + "-item",
      dropdownMenuItemComponentClass: multi ? DropdownMenuCheckItem : DropdownMenuItem,
      ref: this.menuContainerRef,
      activeItemValues: multi ? value : [value],
      focusItemValue: focusItemValue,
      data: filteredData,
      group: !_isUndefined(groupBy),
      onSelect: multi ? this.handleCheckItemSelect : this.handleItemSelect,
      renderMenuItem: this.renderMenuItem,
      virtualized: virtualized
    })) : React.createElement("div", {
      className: this.addPrefix('none')
    }, locale.noResultsText);
    return React.createElement(MenuWrapper, {
      autoWidth: menuAutoWidth,
      className: classes,
      style: menuStyle,
      getToggleInstance: this.getToggleInstance,
      onKeyDown: this.handleKeyDown
    }, renderMenu ? renderMenu(menu) : menu, renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };

  _proto.renderSingleValue = function renderSingleValue() {
    var _this$props15 = this.props,
        renderValue = _this$props15.renderValue,
        multi = _this$props15.multi,
        placeholder = _this$props15.placeholder;

    if (multi) {
      return {
        isValid: false,
        displayElement: placeholder
      };
    }

    var value = this.getValue();
    var dataItem = this.getDateItem(value);
    var displayElement = dataItem.displayElement;

    if (!_isNil(value) && _isFunction(renderValue)) {
      displayElement = renderValue(value, dataItem.activeItem, displayElement);
    }

    return {
      isValid: dataItem.isValid,
      displayElement: displayElement
    };
  };

  _proto.renderMultiValue = function renderMultiValue() {
    var _this5 = this;

    var _this$props16 = this.props,
        multi = _this$props16.multi,
        disabled = _this$props16.disabled,
        _this$props16$tagProp = _this$props16.tagProps,
        tagProps = _this$props16$tagProp === void 0 ? {} : _this$props16$tagProp,
        renderValue = _this$props16.renderValue,
        value = _this$props16.value;

    if (!multi) {
      return null;
    }

    var _tagProps$closable = tagProps.closable,
        closable = _tagProps$closable === void 0 ? true : _tagProps$closable,
        onClose = tagProps.onClose,
        tagRest = _objectWithoutPropertiesLoose(tagProps, ["closable", "onClose"]);

    var tags = this.getValue() || [];
    var items = [];
    var tagElements = tags.map(function (tag) {
      var _this5$getDateItem = _this5.getDateItem(tag),
          isValid = _this5$getDateItem.isValid,
          displayElement = _this5$getDateItem.displayElement,
          activeItem = _this5$getDateItem.activeItem;

      items.push(activeItem);

      if (!isValid) {
        return null;
      }

      return React.createElement(Tag, _extends({}, tagRest, {
        key: tag,
        closable: !disabled && closable,
        title: typeof displayElement === 'string' ? displayElement : undefined,
        onClose: createChainedFunction(_this5.handleRemoveItemByTag.bind(_this5, tag), onClose)
      }), displayElement);
    }).filter(function (item) {
      return item !== null;
    });

    if ((tags.length > 0 || !_isNil(value)) && _isFunction(renderValue)) {
      return renderValue(this.getValue(), items, tagElements);
    }

    return tagElements;
  };

  _proto.renderInputSearch = function renderInputSearch() {
    var _this$props17 = this.props,
        multi = _this$props17.multi,
        onBlur = _this$props17.onBlur,
        onFocus = _this$props17.onFocus,
        tabIndex = _this$props17.tabIndex;
    var props = {
      componentClass: 'input',
      inputRef: this.inputRef
    };

    if (multi) {
      props.componentClass = InputAutosize; // 52 = 55 (right padding)  - 2 (border) - 6 (left padding)

      props.inputStyle = {
        maxWidth: this.state.maxWidth - 63
      };
    }

    return React.createElement(InputSearch, _extends({}, props, {
      tabIndex: tabIndex,
      onChange: this.handleSearch,
      value: this.state.open ? this.state.searchKeyword : '',
      onBlur: onBlur,
      onFocus: createChainedFunction(this.handleInputFocus, onFocus)
    }));
  };

  _proto.render = function render() {
    var _getToggleWrapperClas;

    var _this$props18 = this.props,
        disabled = _this$props18.disabled,
        cleanable = _this$props18.cleanable,
        locale = _this$props18.locale,
        toggleComponentClass = _this$props18.toggleComponentClass,
        style = _this$props18.style,
        onEnter = _this$props18.onEnter,
        onEntered = _this$props18.onEntered,
        onExit = _this$props18.onExit,
        onExited = _this$props18.onExited,
        searchable = _this$props18.searchable,
        multi = _this$props18.multi,
        positionRef = _this$props18.positionRef,
        renderValue = _this$props18.renderValue,
        rest = _objectWithoutPropertiesLoose(_this$props18, ["disabled", "cleanable", "locale", "toggleComponentClass", "style", "onEnter", "onEntered", "onExit", "onExited", "searchable", "multi", "positionRef", "renderValue"]);

    var unhandled = getUnhandledProps(InputPicker, rest);

    var _this$renderSingleVal = this.renderSingleValue(),
        isValid = _this$renderSingleVal.isValid,
        displayElement = _this$renderSingleVal.displayElement;

    var tagElements = this.renderMultiValue();
    var value = this.getValue();
    /**
     * 1.Have a value and the value is valid.
     * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
     */

    var hasSingleValue = !_isNil(value) && _isFunction(renderValue) && !_isNil(displayElement);
    var hasMultiValue = _isArray(value) && value.length > 0 && _isFunction(renderValue) && !_isNil(tagElements);
    var hasValue = multi ? !!_get(tagElements, 'length') || hasMultiValue : isValid || hasSingleValue;
    var classes = getToggleWrapperClassName('input', this.addPrefix, this.props, hasValue, (_getToggleWrapperClas = {}, _getToggleWrapperClas[this.addPrefix('tag')] = multi, _getToggleWrapperClas[this.addPrefix('focused')] = this.state.open, _getToggleWrapperClas));
    var searching = !!this.state.searchKeyword && this.state.open;
    var displaySearchInput = searchable && !disabled;
    return React.createElement(PickerToggleTrigger, {
      pickerProps: this.props,
      ref: this.triggerRef,
      positionRef: mergeRefs(this.positionRef, positionRef),
      trigger: "active",
      onEnter: createChainedFunction(this.handleEnter, onEnter),
      onEntered: createChainedFunction(this.handleEntered, onEntered),
      onExit: createChainedFunction(this.handleExit, onExit),
      onExited: createChainedFunction(this.handleExited, onExited),
      speaker: this.renderDropdownMenu()
    }, React.createElement("div", {
      className: classes,
      style: style,
      onKeyDown: this.handleKeyDown,
      onClick: this.handleClick,
      ref: this.toggleWrapperRef
    }, React.createElement(PickerToggle, _extends({}, unhandled, {
      tabIndex: null,
      ref: this.toggleRef,
      componentClass: toggleComponentClass,
      onClean: this.handleClean,
      cleanable: cleanable && !disabled,
      hasValue: hasValue
    }), searching || multi && hasValue ? null : displayElement || locale.placeholder), React.createElement("div", {
      className: this.addPrefix('tag-wrapper')
    }, tagElements, displaySearchInput && this.renderInputSearch())));
  };

  return InputPicker;
}(React.Component);

InputPicker.propTypes = _extends({}, listPickerPropTypes, {
  cacheData: PropTypes.array,
  menuAutoWidth: PropTypes.bool,
  maxHeight: PropTypes.number,
  searchable: PropTypes.bool,
  creatable: PropTypes.bool,
  multi: PropTypes.bool,
  groupBy: PropTypes.any,
  sort: PropTypes.func,
  renderMenu: PropTypes.func,
  renderMenuItem: PropTypes.func,
  renderMenuGroup: PropTypes.func,
  onSelect: PropTypes.func,
  onGroupTitleClick: PropTypes.func,
  onSearch: PropTypes.func,
  virtualized: PropTypes.bool,
  searchBy: PropTypes.func,
  tagProps: PropTypes.object
});
InputPicker.defaultProps = _extends({}, listPickerDefaultProps, {
  cacheData: [],
  maxHeight: 320,
  locale: {
    placeholder: 'Select',
    noResultsText: 'No results found',
    newItem: 'New item',
    createOption: 'Create option "{0}"'
  },
  searchable: true,
  menuAutoWidth: true,
  virtualized: true
});
export default defaultProps({
  classPrefix: 'picker'
})(InputPicker);