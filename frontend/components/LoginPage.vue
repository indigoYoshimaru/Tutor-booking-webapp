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

      <f7-list-item>
        <span>Login as tutor?</span>
        <f7-toggle v-model:checked="isTutor" color="green"></f7-toggle>
      </f7-list-item>
    </f7-list>
    <f7-list>
      <f7-list-button @click="signIn">Sign In</f7-list-button>
      <!-- <f7-block-footer
        >Some text about login information.<br />Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.</f7-block-footer
      > -->
    </f7-list>
  </f7-page>
</template>
<script>
import share from "/modules/share";
import { f7 } from "framework7-vue";
import f7components from "/components/f7components";
import service from "/modules/service";

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

      isTutor: true,
    };
  },
  methods: {
    async signIn() {
      console.log(this.user);
      console.log(this.isTutor);
      if (share.gettingUserInfo) return;

      share.gettingUserInfo = true;
      let result;
      if (this.isTutor) {
        result = await service.loginTutor(this.user);
        //   share.loggedIn = true;
        //   share.currentUser = await service.getTutorInfo();
      } else {
        result = await service.loginTutee(this.user);
        //   share.loggedIn = true;
        //   share.currentUser = await service.getTuteeInfo();
      }
      // await service.updateContractInfo(share.currentUser.role);
      // await service.updateChatInfo(share.currentUser.role);

      // let result = this.isTutor
      //   ? await service.loginTutor(this.user)
      //   : await service.loginTutee(this.user);

      share.loggedIn = true;

      share.gettingUserInfo = false;

      await service.getCurrentUserInfo();

      f7.dialog.alert(result, () => {
        this.f7router.navigate(`/${share.currentUser.role}-main/`);
      });
    },
  },
};
</script>


      //   share.currentUser = await service.getTutorInfo();

      //   let currentUser = share.currentUser;
      //   let otherContractUsers = share.otherContractUsers;
      //   let otherChatUsers = share.otherChatUsers;
      //   console.log(share.currentUser);

      //   currentUser.chatroomMap = {};
      //   currentUser.contractMap = {};

      //   for (let contract of currentUser.contracts) {
      //     let user = await service.getTuteeNameById(contract.tuteeId);
      //     otherContractUsers[contract.tuteeId] = user;
      //     contract.tutor = share.currentUser;
      //     contract.tutee = share.otherContractUsers[contract.tuteeId];
      //     currentUser.contractMap[contract.id] = contract;
      //   }
      //   for (let chatroom of currentUser.chatrooms) {
      //     chatroom.messages = [];
      //     currentUser.chatroomMap[chatroom.id] = chatroom;
      //     let user = await service.getTuteeNameById(chatroom.tuteeId);
      //     otherChatUsers[chatroom.tuteeId] = user;
      //   }

      //   //share.currentUser.dateOfBirth = new Date(share.currentUser.dateOfBirth);
      //   f7.dialog.alert(result, () => {
      //     this.f7router.navigate("/tutor-main/");
      //   });
      // } else {
      //   let result = await service.loginTutee(this.user);
      //   share.loggedIn = true;
      //   share.currentUser = await service.getTuteeInfo();

      //   let currentUser = share.currentUser;
      //   let otherContractUsers = share.otherContractUsers;
      //   let otherChatUsers = share.otherChatUsers;
      //   console.log(share.currentUser);

      //   currentUser.chatroomMap = {};
      //   currentUser.contractMap = {};

      //   for (let contract of currentUser.contracts) {
      //     let user = await service.getTutorNameById(contract.tutorId);
      //     otherContractUsers[contract.tutorId] = user;
      //     contract.tutee = share.currentUser;
      //     contract.tutor = share.otherContractUsers[contract.tutorId];
      //     currentUser.contractMap[contract.id] = contract;
      //   }

      //   for (let chatroom of currentUser.chatrooms) {
      //     chatroom.messages = [];
      //     currentUser.chatroomMap[chatroom.id] = chatroom;
      //     let user = await service.getTutorNameById(chatroom.tutorId);
      //     otherChatUsers[chatroom.tutorId] = user;
      //     console.log(otherChatUsers[chatroom.tutorId]);
      //   }

      //   f7.dialog.alert(result, () => {
      //     this.f7router.navigate("/tutee-main/");
      //   });
      // } // temp else


