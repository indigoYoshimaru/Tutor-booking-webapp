<template>
  <f7-app v-bind="app">
    <f7-panel right cover dark>
      <f7-view links-view=".view-main">
        <f7-page>
          <f7-navbar title="Menu">
            <f7-button panel-close
              ><f7-icon ios="f7:xmark_circle_fill"></f7-icon
            ></f7-button>
          </f7-navbar>
          <f7-list>
            <f7-list-item
              v-if="!currentUser"
              link="/login/"
              title="Login"
            ></f7-list-item>

            <f7-list-item link="/about/" title="About"></f7-list-item>
            <!-- <f7-list-item link="/tutee/" title="Test component"></f7-list-item> -->

            <f7-list-item
              v-if="!currentUser"
              link="/get-unverified-tutor/"
              title="Unverified Tutor"
            ></f7-list-item>
          </f7-list>
          <!-- </f7-page>
      </f7-view>
      <f7-view  links-view=".view-main">
        <f7-page>
          <f7-navbar title="Menu">
            <f7-button panel-close
              ><f7-icon ios="f7:xmark_circle_fill"></f7-icon
            ></f7-button>
          </f7-navbar> -->
        </f7-page>
      </f7-view>
    </f7-panel>

    <!-- Main view-->
    <!-- <f7-view v-if="!currentUser" main url="/"> </f7-view>
    <f7-view v-else main url="`/${currentUser.role}-main/`"> </f7-view> -->
    <f7-view main url="/"> </f7-view>

    <!-- Popup. All modals should be outside of Views -->
    <!-- <f7-popup id="my-popup">
      <f7-view>
        <f7-page>
          <f7-navbar title="Popup">
          
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>
            <p>Do you want to resgister as</p>
          </f7-block>
          <f7-block>
            <f7-col>
              <f7-row>
                <f7-button>Tutor</f7-button>
                <f7-button>Tutee</f7-button>
              </f7-row>
            </f7-col>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup> -->
  </f7-app>
</template>

<script>
import f7 from "framework7/lite-bundle";
import share from "/modules/share";
import routes from "/modules/admin/routes";

import f7components from "/components/f7components";

export default {
  components: {
    ...f7components,
  },
  props: {
    f7router: Object,
  },
  computed: {
    f7() {
      f7;
    },
  },

  data() {
    return {
      app: {
        theme: share.theme,
        routes,
      },
    };
  },
  methods: {
    navigate() {},
  },
};
</script>
