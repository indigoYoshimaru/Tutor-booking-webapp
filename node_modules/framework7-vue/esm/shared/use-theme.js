import { ref } from 'vue';
import { f7, f7ready, theme } from './f7';
export var useTheme = function useTheme() {
  var t = ref(f7 ? theme : null);

  if (!f7) {
    f7ready(function () {
      t.value = theme;
    });
  }

  return t;
};