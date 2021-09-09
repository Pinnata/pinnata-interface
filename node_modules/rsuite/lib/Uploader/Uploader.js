"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _recompose = require("recompose");

var _IntlContext = _interopRequireDefault(require("../IntlProvider/IntlContext"));

var _withLocale = _interopRequireDefault(require("../IntlProvider/withLocale"));

var _UploadFileItem = _interopRequireDefault(require("./UploadFileItem"));

var _UploadTrigger = _interopRequireDefault(require("./UploadTrigger"));

var _utils = require("../utils");

var _utils2 = require("./utils");

var Uploader =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Uploader, _React$Component);

  function Uploader(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.inputRef = void 0;

    _this.handleRemoveFile = function (fileKey) {
      var _this$props$onRemove, _this$props, _this$props$onChange, _this$props2;

      var fileList = _this.getFileList();

      var file = (0, _find2.default)(fileList, function (f) {
        return f.fileKey === fileKey;
      });
      var nextFileList = fileList.filter(function (f) {
        return f.fileKey !== fileKey;
      });

      if (_this.xhrs[file.fileKey] && _this.xhrs[file.fileKey].readyState !== 4) {
        _this.xhrs[file.fileKey].abort();
      }

      _this.setState({
        fileList: nextFileList
      });

      (_this$props$onRemove = (_this$props = _this.props).onRemove) === null || _this$props$onRemove === void 0 ? void 0 : _this$props$onRemove.call(_this$props, file);
      (_this$props$onChange = (_this$props2 = _this.props).onChange) === null || _this$props$onChange === void 0 ? void 0 : _this$props$onChange.call(_this$props2, nextFileList);

      _this.cleanInputValue();
    };

    _this.handleUploadTriggerChange = function (event) {
      var _this$props3 = _this.props,
          autoUpload = _this$props3.autoUpload,
          shouldQueueUpdate = _this$props3.shouldQueueUpdate,
          onChange = _this$props3.onChange;

      var fileList = _this.getFileList();

      var files = (0, _utils2.getFiles)(event);
      var newFileList = [];
      Array.from(files).forEach(function (file) {
        newFileList.push({
          blobFile: file,
          name: file.name,
          status: 'inited',
          fileKey: (0, _utils2.guid)()
        });
      });
      var nextFileList = [].concat(fileList, newFileList);
      var checkState = shouldQueueUpdate === null || shouldQueueUpdate === void 0 ? void 0 : shouldQueueUpdate(nextFileList, newFileList);

      var upload = function upload() {
        onChange === null || onChange === void 0 ? void 0 : onChange(nextFileList);

        _this.setState({
          fileList: nextFileList
        }, function () {
          autoUpload && _this.handleAjaxUpload();
        });
      };

      if (checkState instanceof Promise) {
        checkState.then(function (res) {
          if (res) {
            upload();
          }
        });
        return;
      } else if (checkState === false) {
        _this.cleanInputValue();

        return;
      }

      upload();
    };

    _this.handleAjaxUploadSuccess = function (file, response, event, xhr) {
      var nextFile = (0, _extends2.default)({}, file, {
        status: 'finished',
        progress: 100
      });

      _this.updateFileList(nextFile, function () {
        var _this$props$onSuccess, _this$props4;

        (_this$props$onSuccess = (_this$props4 = _this.props).onSuccess) === null || _this$props$onSuccess === void 0 ? void 0 : _this$props$onSuccess.call(_this$props4, response, nextFile, event, xhr);
      });
    };

    _this.handleAjaxUploadError = function (file, status, event, xhr) {
      var nextFile = (0, _extends2.default)({}, file, {
        status: 'error'
      });

      _this.updateFileList(nextFile, function () {
        var _this$props$onError, _this$props5;

        (_this$props$onError = (_this$props5 = _this.props).onError) === null || _this$props$onError === void 0 ? void 0 : _this$props$onError.call(_this$props5, status, nextFile, event, xhr);
      });
    };

    _this.handleAjaxUploadProgress = function (file, percent, event, xhr) {
      var nextFile = (0, _extends2.default)({}, file, {
        status: 'uploading',
        progress: percent
      });

      _this.updateFileList(nextFile, function () {
        var _this$props$onProgres, _this$props6;

        (_this$props$onProgres = (_this$props6 = _this.props).onProgress) === null || _this$props$onProgres === void 0 ? void 0 : _this$props$onProgres.call(_this$props6, percent, nextFile, event, xhr);
      });
    };

    _this.handleUploadFile = function (file) {
      var _this$props7 = _this.props,
          name = _this$props7.name,
          action = _this$props7.action,
          headers = _this$props7.headers,
          withCredentials = _this$props7.withCredentials,
          timeout = _this$props7.timeout,
          data = _this$props7.data,
          onUpload = _this$props7.onUpload;
      var xhr = (0, _utils.ajaxUpload)({
        name: name,
        timeout: timeout,
        headers: headers,
        data: data,
        withCredentials: withCredentials,
        file: file.blobFile,
        url: action,
        onError: _this.handleAjaxUploadError.bind((0, _assertThisInitialized2.default)(_this), file),
        onSuccess: _this.handleAjaxUploadSuccess.bind((0, _assertThisInitialized2.default)(_this), file),
        onProgress: _this.handleAjaxUploadProgress.bind((0, _assertThisInitialized2.default)(_this), file)
      });

      _this.updateFileList((0, _extends2.default)({}, file, {
        status: 'uploading'
      }));

      _this.xhrs[file.fileKey] = xhr;
      onUpload === null || onUpload === void 0 ? void 0 : onUpload(file);
    };

    _this.handleReupload = function (file) {
      var _this$props8 = _this.props,
          onReupload = _this$props8.onReupload,
          autoUpload = _this$props8.autoUpload;
      autoUpload && _this.handleUploadFile(file);
      onReupload === null || onReupload === void 0 ? void 0 : onReupload(file);
    };

    _this.createFile = function (file) {
      var fileKey = file.fileKey;
      return (0, _extends2.default)({}, file, {
        fileKey: fileKey || (0, _utils2.guid)(),
        progress: 0
      });
    };

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    _this.progressTimer = void 0;
    _this.xhrs = {};
    _this.uploadTrigger = null;
    var _props$defaultFileLis = props.defaultFileList,
        defaultFileList = _props$defaultFileLis === void 0 ? [] : _props$defaultFileLis;

    var _fileList = defaultFileList.map(_this.createFile);

    _this.state = {
      fileList: _fileList,
      fileMap: {}
    };
    _this.inputRef = React.createRef();
    return _this;
  } // public API


  var _proto = Uploader.prototype;

  _proto.start = function start(file) {
    if (file) {
      this.handleUploadFile(file);
      return;
    }

    this.handleAjaxUpload();
  };

  _proto.getFileList = function getFileList() {
    var fileList = this.props.fileList;
    var fileMap = this.state.fileMap;

    if (typeof fileList !== 'undefined') {
      return fileList.map(function (file) {
        return (0, _extends2.default)({}, file, {}, fileMap[file.fileKey]);
      });
    }

    return this.state.fileList;
  };

  _proto.cleanInputValue = function cleanInputValue() {
    if (this.inputRef.current) {
      this.inputRef.current.getInputInstance().value = '';
    }
  };

  _proto.handleAjaxUpload = function handleAjaxUpload() {
    var _this2 = this;

    var shouldUpload = this.props.shouldUpload;
    var fileList = this.getFileList();
    fileList.forEach(function (file) {
      var checkState = shouldUpload === null || shouldUpload === void 0 ? void 0 : shouldUpload(file);

      if (checkState instanceof Promise) {
        checkState.then(function (res) {
          if (res) {
            _this2.handleUploadFile(file);
          }
        });
        return;
      } else if (checkState === false) {
        return;
      }

      if (file.status === 'inited') {
        _this2.handleUploadFile(file);
      }
    });
    this.cleanInputValue();
  };

  _proto.updateFileList = function updateFileList(nextFile, callback) {
    var fileList = this.getFileList();
    var nextFileList = fileList.map(function (file) {
      return file.fileKey === nextFile.fileKey ? nextFile : file;
    });
    var nextState = {
      fileList: nextFileList
    };

    if (nextFile.progress) {
      var fileMap = this.state.fileMap;
      fileMap[nextFile.fileKey] = {
        progress: nextFile.progress,
        status: nextFile.status
      };
      nextState.fileMap = fileMap;
    }

    this.setState(nextState, callback);
  };

  _proto.renderFileItems = function renderFileItems() {
    var _this3 = this;

    var _this$props9 = this.props,
        disabledFileItem = _this$props9.disabledFileItem,
        listType = _this$props9.listType,
        onPreview = _this$props9.onPreview,
        maxPreviewFileSize = _this$props9.maxPreviewFileSize,
        renderFileInfo = _this$props9.renderFileInfo,
        removable = _this$props9.removable;
    var fileList = this.getFileList();
    return React.createElement("div", {
      key: "items",
      className: this.addPrefix('file-items')
    }, fileList.map(function (file, index) {
      return React.createElement(_UploadFileItem.default, {
        key: file.fileKey || index,
        file: file,
        maxPreviewFileSize: maxPreviewFileSize,
        listType: listType,
        disabled: disabledFileItem,
        onPreview: onPreview,
        onReupload: _this3.handleReupload,
        onCancel: _this3.handleRemoveFile,
        renderFileInfo: renderFileInfo,
        removable: removable
      });
    }));
  };

  _proto.renderUploadTrigger = function renderUploadTrigger() {
    var _this$props10 = this.props,
        name = _this$props10.name,
        multiple = _this$props10.multiple,
        disabled = _this$props10.disabled,
        accept = _this$props10.accept,
        children = _this$props10.children,
        toggleComponentClass = _this$props10.toggleComponentClass,
        draggable = _this$props10.draggable,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props10, ["name", "multiple", "disabled", "accept", "children", "toggleComponentClass", "draggable"]);
    var unhandled = (0, _utils.getUnhandledProps)(Uploader, rest);
    return React.createElement(_UploadTrigger.default, (0, _extends2.default)({}, unhandled, {
      name: name,
      key: "trigger",
      multiple: multiple,
      draggable: draggable,
      disabled: disabled,
      accept: accept,
      ref: this.inputRef,
      onChange: this.handleUploadTriggerChange,
      componentClass: toggleComponentClass
    }), children);
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props11 = this.props,
        classPrefix = _this$props11.classPrefix,
        className = _this$props11.className,
        listType = _this$props11.listType,
        fileListVisible = _this$props11.fileListVisible,
        locale = _this$props11.locale,
        style = _this$props11.style,
        draggable = _this$props11.draggable;
    var classes = (0, _classnames.default)(className, classPrefix, this.addPrefix(listType), (_classNames = {}, _classNames[this.addPrefix('draggable')] = draggable, _classNames));
    var renderList = [this.renderUploadTrigger()];

    if (fileListVisible) {
      renderList.push(this.renderFileItems());
    }

    if (listType === 'picture') {
      renderList.reverse();
    }

    return React.createElement(_IntlContext.default.Provider, {
      value: locale
    }, React.createElement("div", {
      className: classes,
      style: style
    }, renderList));
  };

  return Uploader;
}(React.Component);

Uploader.propTypes = {
  action: _propTypes.default.string,
  accept: _propTypes.default.string,
  autoUpload: _propTypes.default.bool,
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  defaultFileList: _propTypes.default.array,
  fileList: _propTypes.default.array,
  data: _propTypes.default.object,
  multiple: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  disabledFileItem: _propTypes.default.bool,
  name: _propTypes.default.string,
  timeout: _propTypes.default.number,
  withCredentials: _propTypes.default.bool,
  headers: _propTypes.default.object,
  locale: _propTypes.default.object,
  listType: _propTypes.default.oneOf(['text', 'picture-text', 'picture']),
  shouldQueueUpdate: _propTypes.default.func,
  shouldUpload: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onUpload: _propTypes.default.func,
  onReupload: _propTypes.default.func,
  onPreview: _propTypes.default.func,
  onError: _propTypes.default.func,
  onSuccess: _propTypes.default.func,
  onProgress: _propTypes.default.func,
  onRemove: _propTypes.default.func,
  maxPreviewFileSize: _propTypes.default.number,
  style: _propTypes.default.object,
  toggleComponentClass: _propTypes.default.elementType,
  renderFileInfo: _propTypes.default.func,
  removable: _propTypes.default.bool,
  fileListVisible: _propTypes.default.bool,
  draggable: _propTypes.default.bool
};
Uploader.defaultProps = {
  autoUpload: true,
  timeout: 0,
  name: 'file',
  multiple: false,
  disabled: false,
  withCredentials: false,
  data: {},
  listType: 'text',
  removable: true,
  fileListVisible: true
};

var _default = (0, _recompose.compose)((0, _withLocale.default)(['Uploader']), (0, _utils.defaultProps)({
  classPrefix: 'uploader'
}))(Uploader);

exports.default = _default;
module.exports = exports.default;