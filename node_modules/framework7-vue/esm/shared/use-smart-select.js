import { onMounted, onBeforeUnmount } from 'vue';
import { f7ready, f7 } from './f7';
import { extend } from './utils';
export var useSmartSelect = function useSmartSelect(props, setInstance, getEl) {
  var f7SmartSelect;
  onMounted(function () {
    f7ready(function () {
      if (props.smartSelect) {
        var ssParams = extend({
          el: getEl()
        }, props.smartSelectParams || {});
        f7SmartSelect = f7.smartSelect.create(ssParams);
        setInstance(f7SmartSelect);
      }
    });
  });
  onBeforeUnmount(function () {
    if (f7SmartSelect && f7SmartSelect.destroy) {
      f7SmartSelect.destroy();
    }

    f7SmartSelect = null;
    setInstance(f7SmartSelect);
  });
};