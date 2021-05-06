"use strict";

exports.__esModule = true;
exports.useSmartSelect = void 0;

var _vue = require("vue");

var _f = require("./f7");

var _utils = require("./utils");

var useSmartSelect = function useSmartSelect(props, setInstance, getEl) {
  var f7SmartSelect;
  (0, _vue.onMounted)(function () {
    (0, _f.f7ready)(function () {
      if (props.smartSelect) {
        var ssParams = (0, _utils.extend)({
          el: getEl()
        }, props.smartSelectParams || {});
        f7SmartSelect = _f.f7.smartSelect.create(ssParams);
        setInstance(f7SmartSelect);
      }
    });
  });
  (0, _vue.onBeforeUnmount)(function () {
    if (f7SmartSelect && f7SmartSelect.destroy) {
      f7SmartSelect.destroy();
    }

    f7SmartSelect = null;
    setInstance(f7SmartSelect);
  });
};

exports.useSmartSelect = useSmartSelect;