<template>
  <f7-page id="tutor-res" no-toolbar no-swipeback login-screen>
    <f7-navbar back-link=""></f7-navbar>
    <f7-login-screen-title>Register</f7-login-screen-title>
    <f7-list form>
      <f7-list-input
        label="First Name"
        type="text"
        placeholder="Your first name"
        :value="username"
        @input="username = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        label="Username"
        type="text"
        placeholder="Your username"
        :value="username"
        @input="username = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        label="Password"
        type="password"
        placeholder="Your password"
        :value="password"
        @input="password = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        label="Confirm Password"
        type="password"
        placeholder="Re-enter your password"
        :value="confirmedPassword"
        @input="confirmedPassword = $event.target.value"
      ></f7-list-input>
      <f7-list-input label="Usertype"> </f7-list-input>
    </f7-list>
    <f7-list>
      <f7-list-button @click="signIn">Sign In</f7-list-button>
      <f7-block-footer
        >Some text about login information.<br />Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.</f7-block-footer
      >
    </f7-list>
  </f7-page>
</template>
<script>
import { f7 } from "framework7-vue";
import f7components from "/components/f7components";
export default {
  components: {
    ...f7components,
  },
  props: {
    f7router: Object,
  },
  data() {
    return {
      firstName:"",
      lastName:"",      
      username: "",
      password: "",
      email:"",
      confirmedPassword: "",
      dob:"",
      subject_gpa: [],
      description:""
    };
  },
  methods: {
    signIn() {
      const self = this;

      f7.dialog.alert(
        `Username: ${self.username}<br>
        Password: ${self.password}<br>
        Usertype: ${self.usertype}`,
        () => {
          self.f7router.back();
        }
      );
    },
  },
};
</script>


