import { onMounted, onBeforeUnmount } from 'vue';
import { f7, f7ready } from './f7';
export var useTab = function useTab(elRef, emit) {
  var onTabShow = function onTabShow(el) {
    if (elRef.value !== el) return;
    emit('tab:show', el);
  };

  var onTabHide = function onTabHide(el) {
    if (elRef.value !== el) return;
    emit('tab:hide', el);
  };

  onMounted(function () {
    if (!elRef.value) return;
    f7ready(function () {
      f7.on('tabShow', onTabShow);
      f7.on('tabHide', onTabHide);
    });
  });
  onBeforeUnmount(function () {
    if (!f7) return;
    f7.off('tabShow', onTabShow);
    f7.off('tabHide', onTabHide);
  });
};