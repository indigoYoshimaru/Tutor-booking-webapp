<template>
  <f7-app v-bind="app">
    <!-- Left Panel with "cover" effect -->
    <f7-panel left cover dark>
      <f7-view>
        <f7-page>
          <f7-navbar title="Left Panel"></f7-navbar>
          <f7-block>
            <p>Here comes the left panel text</p>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-panel>

    <!-- Right Panel with "reveal" effect -->
    <f7-panel right reveal>
      <f7-view>
        <f7-page>
          <f7-navbar title="Right Panel">
            <f7-nav-right>
              <f7-button panel-close>Close</f7-button>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>
            <p>Here comes the right panel text</p>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-panel>

    <!-- Main view-->
    <f7-view main url="/">
      
    </f7-view>

    <!-- Popup. All modals should be outside of Views -->
    <f7-popup id="my-popup">
      <f7-view>
        <f7-page>
          <f7-navbar title="Popup">
            <!-- Link to close popup -->
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>
            <p>Here comes popup text</p>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>
  </f7-app>
</template>

<script>
import share from "/modules/share";
import routes from "/modules/routes";

import f7components from "/components/f7components";

export default {
  components: {
    ...f7components,
  },
  data() {
    return {
      app: {
        theme: share.theme,
        routes
      }
    };
  },
};
</script>
