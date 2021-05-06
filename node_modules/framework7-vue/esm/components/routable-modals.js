function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { ref, onMounted, onBeforeUnmount, onUpdated, toRaw, h } from 'vue';
import { f7events, f7routers, f7 } from '../shared/f7';
export default {
  name: 'f7-routable-modals',
  setup: function setup() {
    var elRef = ref(null);
    var modals = ref([]);
    var routerData = ref(null);
    onMounted(function () {
      routerData.value = {
        modals: modals,
        el: elRef.value,
        setModals: function setModals(newModals) {
          newModals.forEach(function (modal) {
            // eslint-disable-next-line
            modal.component = toRaw(modal.component);
          });
          modals.value = [].concat(newModals);
        }
      };
      f7routers.modals = routerData.value;
    });
    onUpdated(function () {
      if (!routerData.value || !f7) return;
      f7events.emit('modalsRouterDidUpdate', routerData.value);
    });
    onBeforeUnmount(function () {
      if (!routerData.value) return;
      f7routers.modals = null;
      routerData.value = null;
    });

    var getComponent = function getComponent(modal) {
      return toRaw(modal.component);
    };

    var getProps = function getProps(modal) {
      var modalComponent = modal.component,
          modalProps = modal.props;
      var keys = [];
      var passProps = {};
      if (modalComponent && modalComponent.props) keys = Object.keys(modalComponent.props);
      keys.forEach(function (key) {
        if (key in modalProps) passProps[key] = modalProps[key];
      });
      return passProps;
    };

    return function () {
      return h('div', {
        ref: elRef,
        class: 'framework7-modals'
      }, [].concat(modals.value.map(function (modal) {
        return h(getComponent(modal), _extends({
          key: modal.id
        }, getProps(modal)));
      })));
    };
  }
};