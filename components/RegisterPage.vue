<template>
  <f7-page id="tutor-res" no-toolbar no-swipeback login-screen>
    <f7-navbar back-link=""></f7-navbar>
    <f7-login-screen-title>Tutor Register</f7-login-screen-title>
    <f7-list style="list-style-type: none" form>
      <f7-list-input
        label="First Name"
        type="text"
        placeholder="Your first name"
        :value="firstName"
        @input="firstName = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        label="Last Name"
        type="text"
        placeholder="Your last name"
        :value="lastName"
        @input="lastName = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        label="Email"
        type="email"
        placeholder="Your Email"
        :value="email"
        @input="email = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        label="Username"
        type="text"
        placeholder="Your username"
        :value="userName"
        @input="userName = $event.target.value"
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
      <f7-list-input
        label="D.O.B"
        type="date"
        placeholder="Your D.O.B."
        value="2000-01-01"
        @change="dob = $event.target.value"
      ></f7-list-input>
      <f7-block>
        <f7-row no-gap>
          <f7-col>
            <f7-list-input
              label="Teaching"
              type="select"
              placeholder="Please chose"
              @change="subjects = $event.target.value"
            >
              <option value="ai">AI</option>
              <option value="web">Web</option>
              <option value="probs">Probability</option>
            </f7-list-input>
          </f7-col>
          <f7-col>
            <f7-list-input
              label="GPA"
              type="number"
              min="0"
              max="100"
              placeholder="Enter your GPA"
              :value="gpas"
              @input="gpas = $event.target.value"
            ></f7-list-input>
          </f7-col>
        </f7-row>
      </f7-block>
      <f7-list-input
        label="Description"
        type="textarea"
        placeholder="Describe yourself (under 200 words)."
        maxlength="200"
        :value="description"
        @input="description = $event.target.value"
      ></f7-list-input>
    </f7-list>
    <f7-list>
      <f7-list-button @click="register">Register</f7-list-button>
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
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      email: "",
      confirmedPassword: "",
      dob: "",
      subjects: [],
      gpas: [],
      description: "",
    };
  },
  methods: {
    register() {
      const self = this;
      f7.dialog.alert(
        `Username: ${self.userName}<br>
        Password: ${self.password}<br>  
        D.O.B: ${self.dob}<br>      
        Subjects: ${self.subjects}
        GPAs: ${self.gpas}`,
        () => {
          self.f7router.back();
        }
      );
    },
  },
};
</script>


