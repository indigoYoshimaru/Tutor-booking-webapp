"use strict";

exports.__esModule = true;
exports.useTab = void 0;

var _vue = require("vue");

var _f = require("./f7");

var useTab = function useTab(elRef, emit) {
  var onTabShow = function onTabShow(el) {
    if (elRef.value !== el) return;
    emit('tab:show', el);
  };

  var onTabHide = function onTabHide(el) {
    if (elRef.value !== el) return;
    emit('tab:hide', el);
  };

  (0, _vue.onMounted)(function () {
    if (!elRef.value) return;
    (0, _f.f7ready)(function () {
      _f.f7.on('tabShow', onTabShow);

      _f.f7.on('tabHide', onTabHide);
    });
  });
  (0, _vue.onBeforeUnmount)(function () {
    if (!_f.f7) return;

    _f.f7.off('tabShow', onTabShow);

    _f.f7.off('tabHide', onTabHide);
  });
};

exports.useTab = useTab;