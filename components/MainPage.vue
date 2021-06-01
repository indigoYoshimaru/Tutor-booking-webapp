
<template>
  <!-- this is the homepage after login  -->
  <f7-page>
    <f7-navbar title="Main Page" :transparent="true">
      <f7-icon ios="f7:house_fill"></f7-icon>
      <f7-nav-right :sliding="true">
        <f7-button panel-open="right"
          ><f7-icon ios="f7:square_list_fill"></f7-icon
        ></f7-button>
      </f7-nav-right>
    </f7-navbar>

    <f7-block-title class="block-title-strong block-title-large"
      >Profile</f7-block-title
    >
    <f7-card class="demo-facebook-card">
      <f7-card-header class="no-border">
        <div class="demo-facebook-avatar">
          <img
            src="https://cdn0.iconfinder.com/data/icons/animal-icons-flat/128/fox-512.png"
            width="35"
            height="35"
          />
        </div>
        <div class="demo-facebook-name">
          {{ currentUser.firstName }} {{ currentUser.lastName }}
        </div>
        <div class="demo-facebook-date">
          BirthDay: {{ currentUser.dateOfBirth }}
        </div>
      </f7-card-header>
      <f7-card-content :padding="false">
        <img
          src="https://cdn.framework7.io/placeholder/nature-1000x700-8.jpg"
          width="100%"
        />
      </f7-card-content>
      <f7-card-content v-if="currentUser.role === 'tutor'">
        <f7-row>
          <f7-col><div>Tutoring courses</div></f7-col>
          <f7-col><div>GPA</div></f7-col>
        </f7-row>
        <div v-for="course in currentUser.profile.background" :key="course.id">
          <f7-row>
            <f7-col>{{ course.name }} </f7-col>
            <f7-col>{{ course.GPA }} </f7-col>
          </f7-row>
        </div>
      </f7-card-content>
    </f7-card>

    <f7-block-title class="block-title-strong block-title-large"
      >Contract History</f7-block-title
    >
    <f7-card>
      <f7-card-content>
        <f7-list v-for="contract in currentUser.contracts" :key="contract.id">
          <f7-list-item link="#">{{ contract }}</f7-list-item>
        </f7-list>
      </f7-card-content>
    </f7-card>

    <f7-block-title class="block-title-strong block-title-large"
      >Chat sections</f7-block-title
    >
    <f7-card>
      <f7-card-content>
        <f7-list v-for="chatroom in currentUser.chatrooms" :key="chatroom.id">
          <f7-list-item link="#">{{ chatroom }}</f7-list-item>
        </f7-list>
      </f7-card-content>
    </f7-card>
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
  data() {
    return {
      currentUser: share.currentUser,
    };
  },
  methods: {
    formatted() {
      this.currentUser.dateOfBirth = new Date(this.currentUser.dateOfBirth);
    },
  },
};
</script>