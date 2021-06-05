<template>
  <f7-page>
    <f7-navbar title="Message">
      <f7-nav-right :sliding="true">
        <f7-button panel-open="right"
          ><f7-icon ios="f7:square_list_fill"></f7-icon
        ></f7-button>
      </f7-nav-right>
    </f7-navbar>
    <f7-message
      v-for="message in chatRoomInfo.messages"
      :key="message.id"
      :type="message.type"
      :name="message.name"
      :avatar="message.avatar"
    >
      <template #text>
        <!-- eslint-disable-next-line -->
        <span v-if="message.content" v-html="message.content"></span>
      </template>
    </f7-message>
    <f7-message
      v-if="typingMessage"
      type="received"
      :typing="true"
      :first="true"
      :last="true"
      :tail="true"
      :header="`${typingMessage.name} is typing`"
      :avatar="typingMessage.avatar"
    ></f7-message>
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
      let chatRoomInfo = share.chatRoomInfo[this.chatroomId];

      if (!chatRoomInfo) {
        chatRoomInfo = { id: this.chatroomId };
        share.chatRoomInfo[this.chatroomId] = chatRoomInfo;
      }

      // if (this.currentUser.role == "tutor") {
      // chatRoomInfo.tutor = this.currentUser;
      chatRoomInfo.otherUser = share.otherChatUsers[this.otherUserId];
      chatRoomInfo.otherUser.id = this.otherUserId;
      // } else {
      //   chatRoomInfo.id.tutee = this.currentUser;
      //   chatRoomInfo.tutor = share.otherChatUsers[this.otherUserId];
      //   chatRoomInfo.tutor.id = this.otherUserId;
      // }
      service.getChatHistory(chatRoomInfo.id);
      for (var mess in chatRoomInfo.messages) {
        if (
          (mess.isTutor && this.currentUser.role == "tutor") ||
          (!mess.isTutor && this.currentUser.role == "tutee")
        ) {
          mess.type = "sent";
          mess.name =
            this.currentUser.firstName + " " + this.currentUser.lastName;
        } else {
          mess.type = "receiver";
          mess.name =
            chatRoomInfo.otherUser.firstName + " " + this.otherUser.lastName;
        }
      }

      share.chatRoomInfo = chatRoomInfo;
      return chatRoomInfo;
    },

    // chatMessage() {
    //   let chatMessage = share.chatMessage;
    //   for (var mess in chatMessage) {
    //     if (
    //       (mess.isTutor && this.currentUser.role == "tutor") ||
    //       (!mess.isTutor && this.currentUser.role == "tutee")
    //     ) {
    //       mess.type = "sent";
    //       mess.name =
    //         this.currentUser.firstName + " " + this.currentUser.lastName;
    //     } else {
    //       mess.type = "receiver";
    //       mess.name =
    //         chatRoomInfo.otherUser.firstName + " " + this.otherUser.lastName;
    //     }
    //   }
    //   return chatMessage;
    // },
  },
  data() {},
  methods: {},
};
</script>
