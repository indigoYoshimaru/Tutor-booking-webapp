<template>
  <f7-page login-screen>
    <f7-navbar :transparent="true">
      <f7-icon ios="f7:house_fill"></f7-icon>
      <f7-nav-right :sliding="true">
        <f7-button panel-open="right"
          ><f7-icon ios="f7:square_list_fill"></f7-icon
        ></f7-button>
      </f7-nav-right>
    </f7-navbar>
    <f7-tab id="tutee-res" tab-active class="page-content">
      <f7-login-screen-title>Tutee Registration</f7-login-screen-title>
      <f7-list style="list-style-type: none" form>
        <f7-list-input
          label="First Name"
          floating-label
          type="text"
          placeholder="Your first name"
          pattern="(?:[a-zA-Z\s]+)"
          minlength="1"
          maxlength="50"
          validate="true"
          error-message="Your name must only include characters and spaces."
          :value="tuteeInfo.firstName"
          @input="tuteeInfo.firstName = $event.target.value"
        ></f7-list-input>
        <f7-list-input
          label="Last Name"
          floating-label
          type="text"
          placeholder="Your last name"
          pattern="(?:[a-zA-Z\s]+)"
          error-message="Your name must only include characters and spaces."
          validate="true"
          minlength="1"
          maxlength="50"
          :value="tuteeInfo.lastName"
          @input="tuteeInfo.lastName = $event.target.value"
        ></f7-list-input>
        <f7-list-input
          label="Email"
          floating-label
          validate="true"
          pattern="^(?:[a-z0-9]+(?:(?:[_\-\.])*[a-z0-9]+)*)@(?:[a-z0-9]+(?:(?:[_\-\.])*[a-z0-9]+)*)$"
          maxlength="50"
          type="email"
          placeholder="Your Email"
          :value="tuteeInfo.email"
          @input="tuteeInfo.email = $event.target.value"
        ></f7-list-input>
        <f7-list-input
          label="Username"
          floating-label
          type="text"
          placeholder="Your username"
          error-message="Username are in range of 3-50 characters, composed of letters, numbers, commas, and hyphens and must NOT start with numbers."
          pattern="^(?:[a-zA-Z\.\-_]+[[a-zA-Z\.\-_0-9]*)$"
          minlength="1"
          maxlength="50"
          validate="true"
          :value="tuteeInfo.username"
          @input="tuteeInfo.username = $event.target.value"
        ></f7-list-input>
        <f7-list-input
          label="Password"
          floating-label
          type="password"
          minlength="8"
          maxlength="16"
          validate="true"
          placeholder="Your password"
          pattern="^(?:[A-Za-z0-9%7E%60%21@%23%24%25%5E%26*%28%29%5C-_%3D+%5B%5C%5D%7B%7D%5C%7C%3B%3A%27%22%2C%3C%5C.%3E/%3F]+)"
          error-message="Password is in range of 8-16 characters, may be composed of letters, numbers, spaces, and any of the following characters: ~`!@#$%^&amp;*()\-_=+[\]{}\|;:'&quot;,&lt;\.&gt;/?."
          :value="tuteeInfo.password"
          @input="tuteeInfo.password = $event.target.value"
        ></f7-list-input>
        <!-- Password regex decoded: ^(?:[A-Za-z0-9~`!@#$%^&*()\-_=+[\]{}\|;:'",<\.>/?]+) -->
        <f7-list-input
          label="Confirm Password"
          floating-label
          type="password"
          minlength="8"
          maxlength="16"
          validate="true"
          placeholder="Re-enter your password"
          pattern="^(?:[A-Za-z0-9%7E%60%21@%23%24%25%5E%26*%28%29%5C-_%3D+%5B%5C%5D%7B%7D%5C%7C%3B%3A%27%22%2C%3C%5C.%3E/%3F]+)"
          :value="confirmedPassword"
          @blur="validatePassword()"
          @input="confirmedPassword = $event.target.value"
        ></f7-list-input>
        <f7-list-input
          label="Date of birth"
          floating-label
          type="date"
          placeholder="Date of birth."
          value="2000-01-01"
          @input="tuteeInfo.dateOfBirth = $event.target.value"
        ></f7-list-input>
      </f7-list>
      <f7-list>
        <f7-list-button @click="register()">Register</f7-list-button>
      </f7-list>
    </f7-tab>
  </f7-page>
</template>

<script>
import share from "/modules/share";
import { f7 } from "framework7-vue";
import f7components from "/components/f7components";
import service from "/modules/service";

let courses = await service.getCourses();

export default {
  components: {
    ...f7components,
  },
  props: {
    f7router: Object,
  },
  data() {
    return {
      courses: courses,
      confirmedPassword: "",
      tuteeInfo: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        dateOfBirth: "",
      },
    };
  },
  methods: {
    async register() {
      const currentInfo = this.tuteeInfo;
      if (this.validatePassword()) {
        if (this.validateForm(currentInfo)) {
          console.log(currentInfo);
          let result = await service.registerTutee(currentInfo);
          console.log(result);
          f7.dialog.alert(result, "Message", () => {
            this.f7router.navigate("/");
          });
        } else {
          f7.dialog.alert(
            "Please fill all fields before submitting!",
            "Warning"
          );
        }
      }
    },
    validatePassword() {
      let isMatched = true;
      if (this.confirmedPassword != this.tuteeInfo.password) {
        isMatched = false;
        f7.dialog.alert("Your passwords are not matched.", "Warning");
      }
      return isMatched;
    },
    validateForm(currentInfo) {
      var allFilled = false;
      if (
        currentInfo.firstName &&
        currentInfo.lastName &&
        currentInfo.username &&
        currentInfo.email &&
        currentInfo.password &&
        currentInfo.dateOfBirth
      ) {
        allFilled = true;
      }
      return allFilled;
    },
  },
};
</script>
