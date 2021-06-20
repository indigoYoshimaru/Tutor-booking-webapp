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
          <!-- <f7-list>
            <f7-list-item
              v-if="!currentUser"
              link="/login/"
              title="Login"
            ></f7-list-item>
            <f7-list-item
              v-if="!currentUser"
              link="/register-tutor/"
              title="Register Tutor"
            ></f7-list-item>
            <f7-list-item
              v-if="!currentUser"
              link="/register-tutee/"
              title="Register Tutee"
            ></f7-list-item>
            <f7-list-item
              v-if="currentUser && currentUser.role === 'tutor'"
              link="/tutor-main/"
              title="Main"
            ></f7-list-item>
            <f7-list-item
              v-if="currentUser && currentUser.role === 'tutee'"
              link="/tutee-main/"
              title="Main"
            ></f7-list-item>
          </f7-list> -->
          <f7-list>
            <f7-list-item
              v-if="!currentUser"
              link="/login/"
              title="Login"
            ></f7-list-item>
            <!-- <f7-list-item link="/register/" title="Register"></f7-list-item> -->
            <!-- <f7-list-item link="/about/" title="About"></f7-list-item> -->
            <!-- <f7-list-item link="/raise-issue/" title="Issue"></f7-list-item> -->
            <!-- <f7-list-item
              v-if="!gettingUserInfo"
              link="/tutor-list/"
              title="TestGetTutorList"
            ></f7-list-item> -->
            <f7-list-item
              v-if="!currentUser"
              link="/register-tutor/"
              title="Register Tutor"
            ></f7-list-item>
            <f7-list-item
              v-if="!currentUser"
              link="/register-tutee/"
              title="Register Tutee"
            ></f7-list-item>
            <!-- <f7-list-item
              v-if="!currentUser"
              link="/get-unverified-tutor/"
              title="Unverified Tutor"
            ></f7-list-item> -->
            <f7-list-item
              v-if="currentUser && currentUser.role === 'tutor'"
              link="/tutor-main/"
              title="Main"
            ></f7-list-item>
            <f7-list-item
              v-if="currentUser && currentUser.role === 'tutee'"
              link="/tutee-main/"
              title="Main"
            ></f7-list-item>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-panel>

    <f7-view main url="/"> </f7-view>

  </f7-app>
</template>

<script>
import f7 from "framework7/lite-bundle";
import share from "/modules/share";
import routes from "/modules/routes";
import service from "/modules/service";
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
    loggedIn() {
      return share.loggedIn;
    },
    currentUser() {
      console.log(share.currentUser);
      return share.currentUser;
    },
    gettingUserInfo() {
      return share.gettingUserInfo;
    },
    // mainUrl() {
    //   if (share.currentUser) {
    //     return `/${share.currentUser.role}-main/`;
    //   }
    //   return "/";
    // },
    jump() {
      if (this.currentUser) {
        this.f7router.navigate(`/${share.currentUser.role}-main/`);
      }
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
    navigate() {
      if (share.currentUser) {
        this.f7router.navigate(`/${share.currentUser.role}-main/`);
      }
    },
  },
  mounted() {
    service.getCurrentUserInfo();
  },
};
</script>
