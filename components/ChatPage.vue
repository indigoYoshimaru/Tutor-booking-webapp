<template>
  <f7-page>
    <f7-navbar
      back-link=""
      v-bind:title="otherUser.firstName + ' ' + otherUser.lastName"
    >
      <f7-nav-right :sliding="true">
        <f7-button panel-open="right"
          ><f7-icon ios="f7:square_list_fill"></f7-icon
        ></f7-button>
      </f7-nav-right>
    </f7-navbar>
    <f7-messagebar
      ref="messagebar"
      v-model:value="messageText"
      :placeholder="Message"
      :sheet-visible="sheetVisible"
    >
      <template #inner-end>
        <f7-link
          icon-ios="f7:paperplane_fill"
          icon-aurora="f7:arrow_up_circle_fill"
          icon-md="material:send"
          @click="sendMessage"
        />
      </template>
    </f7-messagebar>
    <f7-messages>
      <f7-message
        v-for="(message, index) in messages"
        :key="index"
        :type="message.type"
        :name="message.name"
        :avatar="message.avatar"
      >
        <template #text>
          <!-- eslint-disable-next-line -->
          <span v-if="message.content" v-html="message.content"></span>
        </template>
      </f7-message>
    </f7-messages>
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
    chatroomId: Number,
    otherUserId: Number,
  },
  computed: {
    currentUser() {
      return share.currentUser;
    },
    chatRoomInfo() {
      return share.currentUser.chatroomMap[this.chatroomId]
        ? share.currentUser.chatroomMap[this.chatroomId]
        : null;
      // share.chatRoomInfo.id = this.chatroomId;

      // let chatRoomInfo = share.chatRoomInfo[this.chatroomId];

      // if (!chatRoomInfo) {
      //   chatRoomInfo = { id: this.chatroomId, messages: [] };
      //   share.chatRoomInfo[this.chatroomId] = chatRoomInfo;
      // }

      // // if (this.currentUser.role == "tutor") {
      // // chatRoomInfo.tutor = this.currentUser;
      // chatRoomInfo.otherUser = share.otherChatUsers[this.otherUserId];
      // chatRoomInfo.otherUser.id = this.otherUserId;
      // // } else {
      // //   chatRoomInfo.id.tutee = this.currentUser;
      // //   chatRoomInfo.tutor = share.otherChatUsers[this.otherUserId];
      // //   chatRoomInfo.tutor.id = this.otherUserId;
      // // }
      // service.getChatHistory(chatRoomInfo.id);
      // for (var mess in chatRoomInfo.messages) {
      //   if (
      //     (mess.isTutor && this.currentUser.role == "tutor") ||
      //     (!mess.isTutor && this.currentUser.role == "tutee")
      //   ) {
      //     mess.type = "sent";
      //     mess.name =
      //       this.currentUser.firstName + " " + this.currentUser.lastName;
      //   } else {
      //     mess.type = "receiver";
      //     mess.name =
      //       chatRoomInfo.otherUser.firstName + " " + this.otherUser.lastName;
      //   }
      // }

      // share.chatRoomInfo = chatRoomInfo;
    },
    otherUser() {
      let otherUser = share.otherChatUsers[this.otherUserId];
      share.chatRoomInfo.otherUser = otherUser;
      return otherUser;
    },
    messages() {
      let chatRoomInfo = this.chatRoomInfo;

      if (!chatRoomInfo) return [];

      return chatRoomInfo.messages.map((mess) => {
        let result = {
          id: mess.id,
          name: "",
          type: "",
          content: mess.content,
        };

        result.type = "received";
        result.name = this.otherUser.firstName + " " + this.otherUser.lastName;
        // console.log(mess);
        // console.log(share.currentUser);
        if (
          (mess.isTutor && share.currentUser.role == "tutor") ||
          (!mess.isTutor && share.currentUser.role != "tutor")
        ) {
          result.type = "sent";
          result.name =
            this.currentUser.firstName + " " + this.currentUser.lastName;
        }

        // if (
        //   (mess.isTutor && this.currentUser.role == "tutor") ||
        //   (!mess.isTutor && this.currentUser.role == "tutee")
        // ) {
        //   result.type = "sent";
        //   result.name =
        //     this.currentUser.firstName + " " + this.currentUser.lastName;
        // } else {
        //   result.type = "received";
        //   result.name =
        //     chatRoomInfo.otherUser.firstName + " " + this.otherUser.lastName;
        // }
        // result.id = mess.id;
        // result.content = mess.content;
        return result;
      });
    },
  },
  data() {
    return {
      messageText: "",
    };
  },
  methods: {
    async sendMessage() {
      let text = this.messageText.replace(/\n/g, "<br>").trim();

      await service.sendMessage(this.chatroomId, text);
      this.messageText = "";
    },
  },

  mounted() {
    if (this.chatRoomInfo) service.getChatHistory(this.chatRoomInfo.id);
  },
};
</script>
