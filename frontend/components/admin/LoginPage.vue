<template>
  <f7-page login-screen>
    <f7-navbar back-link="">
      <f7-nav-right :sliding="true">
        <f7-button panel-open="right"
          ><f7-icon ios="f7:square_list_fill"></f7-icon
        ></f7-button>
      </f7-nav-right>
    </f7-navbar>
    <f7-login-screen-title>Login</f7-login-screen-title>
    <f7-list style="list-style-type: none" form>
      <f7-list-input
        label="Username"
        floating-label
        type="text"
        placeholder="Your username"
        :value="user.username"
        @input="user.username = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        label="Password"
        floating-label
        type="password"
        placeholder="Your password"
        :value="user.password"
        @input="user.password = $event.target.value"
      ></f7-list-input>
    </f7-list>
    <f7-list>
      <f7-list-button inset @click="signIn">Sign In</f7-list-button>
      <!-- <f7-block-footer
        >Some text about login information.<br />Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.</f7-block-footer
      > -->
    </f7-list>
  </f7-page>
</template>
<script>
import share from "/modules/admin/share";
import { f7 } from "framework7-vue";
import f7components from "/components/f7components";
import service from "/modules/admin/service";

export default {
  components: {
    ...f7components,
  },
  props: {
    f7router: Object,
  },  
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async signIn() {
      // console.log(this.user);
      // console.log(this.isTutor);
      // if (share.gettingUserInfo) return;
      // share.gettingUserInfo = true;
      // let result;
      // if (this.isTutor) {
      //   result = await service.loginTutor(this.user);
      //   //   share.loggedIn = true;
      //   //   share.currentUser = await service.getTutorInfo();
      // } else {
      //   result = await service.loginTutee(this.user);
      //   //   share.loggedIn = true;
      //   //   share.currentUser = await service.getTuteeInfo();
      // }
      // // await service.updateContractInfo(share.currentUser.role);
      // // await service.updateChatInfo(share.currentUser.role);
      // // let result = this.isTutor
      // //   ? await service.loginTutor(this.user)
      // //   : await service.loginTutee(this.user);
      // share.loggedIn = true;
      // share.gettingUserInfo = false;
      // await service.getCurrentUserInfo();
      let result = await service.loginAdmin(this.user);
      console.log(result);
      if (result) {
        await service.getAdminInfo();  
        console.log(share.currentUser)      
        if (share.currentUser){          
          share.loggedIn = true;
          //share.issues = share.currentUser.issues; 
          console.log(share.currentUser.issues);
        } 
      }
      f7.dialog.alert(result, () => {
        this.f7router.navigate(`/`);
      });
    },
  },
};
</script>


