"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _remove2 = _interopRequireDefault(require("lodash/remove"));

var _clone2 = _interopRequireDefault(require("lodash/clone"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _domLib = require("dom-lib");

var _shallowEqual = _interopRequireDefault(require("../utils/shallowEqual"));

var _treeUtils = require("../utils/treeUtils");

var _utils = require("../utils");

var _Picker = require("../Picker");

var _DropdownMenu = _interopRequireWildcard(require("../Picker/DropdownMenu"));

var _InputAutosize = _interopRequireDefault(require("./InputAutosize"));

var _InputSearch = _interopRequireDefault(require("./InputSearch"));

var _Tag = _interopRequireDefault(require("../Tag"));

var _propTypes2 = require("../Picker/propTypes");

var InputPicker =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(InputPicker, _React$Component);

  InputPicker.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data && !(0, _shallowEqual.default)(nextProps.data, prevState.data)) {
      return {
        data: nextProps.data,
        newData: [],
        focusItemValue: (0, _get2.default)(nextProps, "data.0." + nextProps.valueKey)
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
      return (0, _treeUtils.filterNodesOfTree)(items, function (item) {
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

        if (!(0, _isUndefined2.default)(focusItem)) {
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

        if (!(0, _isUndefined2.default)(focusItem)) {
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
      (0, _Picker.onMenuKeyDown)(event, {
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


      var focusItem = (0, _treeUtils.findNodeOfTree)(_this.getAllData(), function (item) {
        return (0, _shallowEqual.default)(item[valueKey], focusItemValue);
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
        return (0, _shallowEqual.default)(v, focusItemValue);
      })) {
        value.push(focusItemValue);
      } else {
        (0, _remove2.default)(value, function (itemVal) {
          return (0, _shallowEqual.default)(itemVal, focusItemValue);
        });
      }

      var focusItem = data.find(function (item) {
        return (0, _shallowEqual.default)((0, _get2.default)(item, valueKey), focusItemValue);
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
        (0, _remove2.default)(value, function (itemVal) {
          return (0, _shallowEqual.default)(itemVal, nextItemValue);
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
      var filteredData = (0, _treeUtils.filterNodesOfTree)(_this.getAllData(), function (item) {
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
        focusItemValue: multi ? (0, _get2.default)(value, 0) : value,
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

      (0, _remove2.default)(value, function (itemVal) {
        return (0, _shallowEqual.default)(itemVal, tag);
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
      var tagName = (0, _get2.default)(event, 'target.tagName');

      if (tagName !== 'INPUT') {
        _this.focusInput();

        return;
      }

      if (tagName === 'INPUT' && (0, _get2.default)(event, 'target.value')) {
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
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    _this.renderMenuItem = function (label, item) {
      var _this$props9 = _this.props,
          locale = _this$props9.locale,
          renderMenuItem = _this$props9.renderMenuItem;
      var newLabel = item.create ? React.createElement("span", null, (0, _utils.tplTransform)(locale.createOption, label)) : label;
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

    var _focusItemValue = _multi ? (0, _get2.default)(_value, 0) : defaultValue;

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
      var maxWidth = (0, _domLib.getWidth)(this.toggleWrapperRef.current);
      this.setState({
        maxWidth: maxWidth
      });
    }
  };

  _proto.getValue = function getValue() {
    var _this$props10 = this.props,
        value = _this$props10.value,
        multi = _this$props10.multi;
    var nextValue = (0, _isUndefined2.default)(value) ? this.state.value : value;

    if (multi) {
      return (0, _clone2.default)(nextValue) || [];
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

    var activeItem = (0, _treeUtils.findNodeOfTree)(this.getAllDataAndCache(), function (item) {
      return (0, _shallowEqual.default)(item[valueKey], value);
    });
    var displayElement = placeholder;

    if ((0, _get2.default)(activeItem, labelKey)) {
      displayElement = (0, _get2.default)(activeItem, labelKey);
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

    return (0, _Picker.shouldDisplay)(label, word);
  };

  _proto.findNode = function findNode(focus) {
    var items = this.getFocusableMenuItems();
    var valueKey = this.props.valueKey;
    var focusItemValue = this.state.focusItemValue;

    for (var i = 0; i < items.length; i += 1) {
      if ((0, _shallowEqual.default)(focusItemValue, items[i][valueKey])) {
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
    var classes = (0, _classnames.default)(menuClassPrefix, menuClassName);
    var allData = this.getAllData();
    var filteredData = (0, _treeUtils.filterNodesOfTree)(allData, function (item) {
      return _this4.shouldDisplay(item);
    });

    if (creatable && searchKeyword && !(0, _treeUtils.findNodeOfTree)(allData, function (item) {
      return item[valueKey] === searchKeyword;
    })) {
      filteredData = [].concat(filteredData, [this.createOption(searchKeyword)]);
    } // Create a tree structure data when set `groupBy`


    if (groupBy) {
      filteredData = (0, _utils.getDataGroupBy)(filteredData, groupBy, sort);
    } else if (typeof sort === 'function') {
      filteredData = filteredData.sort(sort(false));
    }

    var menuProps = (0, _pick2.default)(this.props, Object.keys((0, _omit2.default)(_DropdownMenu.dropdownMenuPropTypes, ['className', 'style', 'classPrefix'])));
    var value = this.getValue();
    var menu = filteredData.length ? React.createElement(_DropdownMenu.default, (0, _extends2.default)({}, menuProps, {
      classPrefix: menuClassPrefix,
      dropdownMenuItemClassPrefix: multi ? undefined : menuClassPrefix + "-item",
      dropdownMenuItemComponentClass: multi ? _Picker.DropdownMenuCheckItem : _Picker.DropdownMenuItem,
      ref: this.menuContainerRef,
      activeItemValues: multi ? value : [value],
      focusItemValue: focusItemValue,
      data: filteredData,
      group: !(0, _isUndefined2.default)(groupBy),
      onSelect: multi ? this.handleCheckItemSelect : this.handleItemSelect,
      renderMenuItem: this.renderMenuItem,
      virtualized: virtualized
    })) : React.createElement("div", {
      className: this.addPrefix('none')
    }, locale.noResultsText);
    return React.createElement(_Picker.MenuWrapper, {
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

    if (!(0, _isNil2.default)(value) && (0, _isFunction2.default)(renderValue)) {
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
        tagRest = (0, _objectWithoutPropertiesLoose2.default)(tagProps, ["closable", "onClose"]);
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

      return React.createElement(_Tag.default, (0, _extends2.default)({}, tagRest, {
        key: tag,
        closable: !disabled && closable,
        title: typeof displayElement === 'string' ? displayElement : undefined,
        onClose: (0, _utils.createChainedFunction)(_this5.handleRemoveItemByTag.bind(_this5, tag), onClose)
      }), displayElement);
    }).filter(function (item) {
      return item !== null;
    });

    if ((tags.length > 0 || !(0, _isNil2.default)(value)) && (0, _isFunction2.default)(renderValue)) {
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
      props.componentClass = _InputAutosize.default; // 52 = 55 (right padding)  - 2 (border) - 6 (left padding)

      props.inputStyle = {
        maxWidth: this.state.maxWidth - 63
      };
    }

    return React.createElement(_InputSearch.default, (0, _extends2.default)({}, props, {
      tabIndex: tabIndex,
      onChange: this.handleSearch,
      value: this.state.open ? this.state.searchKeyword : '',
      onBlur: onBlur,
      onFocus: (0, _utils.createChainedFunction)(this.handleInputFocus, onFocus)
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
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props18, ["disabled", "cleanable", "locale", "toggleComponentClass", "style", "onEnter", "onEntered", "onExit", "onExited", "searchable", "multi", "positionRef", "renderValue"]);
    var unhandled = (0, _utils.getUnhandledProps)(InputPicker, rest);

    var _this$renderSingleVal = this.renderSingleValue(),
        isValid = _this$renderSingleVal.isValid,
        displayElement = _this$renderSingleVal.displayElement;

    var tagElements = this.renderMultiValue();
    var value = this.getValue();
    /**
     * 1.Have a value and the value is valid.
     * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
     */

    var hasSingleValue = !(0, _isNil2.default)(value) && (0, _isFunction2.default)(renderValue) && !(0, _isNil2.default)(displayElement);
    var hasMultiValue = (0, _isArray2.default)(value) && value.length > 0 && (0, _isFunction2.default)(renderValue) && !(0, _isNil2.default)(tagElements);
    var hasValue = multi ? !!(0, _get2.default)(tagElements, 'length') || hasMultiValue : isValid || hasSingleValue;
    var classes = (0, _Picker.getToggleWrapperClassName)('input', this.addPrefix, this.props, hasValue, (_getToggleWrapperClas = {}, _getToggleWrapperClas[this.addPrefix('tag')] = multi, _getToggleWrapperClas[this.addPrefix('focused')] = this.state.open, _getToggleWrapperClas));
    var searching = !!this.state.searchKeyword && this.state.open;
    var displaySearchInput = searchable && !disabled;
    return React.createElement(_Picker.PickerToggleTrigger, {
      pickerProps: this.props,
      ref: this.triggerRef,
      positionRef: (0, _utils.mergeRefs)(this.positionRef, positionRef),
      trigger: "active",
      onEnter: (0, _utils.createChainedFunction)(this.handleEnter, onEnter),
      onEntered: (0, _utils.createChainedFunction)(this.handleEntered, onEntered),
      onExit: (0, _utils.createChainedFunction)(this.handleExit, onExit),
      onExited: (0, _utils.createChainedFunction)(this.handleExited, onExited),
      speaker: this.renderDropdownMenu()
    }, React.createElement("div", {
      className: classes,
      style: style,
      onKeyDown: this.handleKeyDown,
      onClick: this.handleClick,
      ref: this.toggleWrapperRef
    }, React.createElement(_Picker.PickerToggle, (0, _extends2.default)({}, unhandled, {
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

InputPicker.propTypes = (0, _extends2.default)({}, _propTypes2.listPickerPropTypes, {
  cacheData: _propTypes.default.array,
  menuAutoWidth: _propTypes.default.bool,
  maxHeight: _propTypes.default.number,
  searchable: _propTypes.default.bool,
  creatable: _propTypes.default.bool,
  multi: _propTypes.default.bool,
  groupBy: _propTypes.default.any,
  sort: _propTypes.default.func,
  renderMenu: _propTypes.default.func,
  renderMenuItem: _propTypes.default.func,
  renderMenuGroup: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onGroupTitleClick: _propTypes.default.func,
  onSearch: _propTypes.default.func,
  virtualized: _propTypes.default.bool,
  searchBy: _propTypes.default.func,
  tagProps: _propTypes.default.object
});
InputPicker.defaultProps = (0, _extends2.default)({}, _propTypes2.listPickerDefaultProps, {
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

var _default = (0, _utils.defaultProps)({
  classPrefix: 'picker'
})(InputPicker);

exports.default = _default;
module.exports = exports.default;