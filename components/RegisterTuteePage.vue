<template>
  <f7-page>
    <f7-navbar back-link="">
      <f7-nav-right :sliding="true">
        <f7-button panel-open="right"
          ><f7-icon ios="f7:square_list_fill"></f7-icon
        ></f7-button>
      </f7-nav-right>
    </f7-navbar>
    <f7-login-screen-title>Tutee Registration</f7-login-screen-title>
    <f7-list style="list-style-type: none" form>
      <f7-list-input
        label="First Name"
        type="text"
        placeholder="Your first name"
        :value="tuteeInfo.firstName"
        @input="tuteeInfo.firstName = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        label="Last Name"
        type="text"
        placeholder="Your last name"
        :value="tuteeInfo.lastName"
        @input="tuteeInfo.lastName = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        label="Email"
        type="email"
        placeholder="Your Email"
        :value="tuteeInfo.email"
        @input="tuteeInfo.email = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        label="Username"
        type="text"
        placeholder="Your username"
        :value="tuteeInfo.userName"
        @input="tuteeInfo.userName = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        label="Password"
        type="password"
        placeholder="Your password"
        :value="tuteeInfo.password"
        @input="tuteeInfo.password = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        label="Confirm Password"
        type="password"
        placeholder="Re-enter your password"
        :value="tuteeInfo.confirmedPassword"
        @input="tuteeInfo.confirmedPassword = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        label="D.O.B"
        type="date"
        placeholder="Your D.O.B."
        value="2000-01-01"
        @change="tuteeInfo.dob = $event.target.value"
      ></f7-list-input>
    </f7-list>
    <f7-list>
      <f7-list-button @click="tuteeRegister">Register</f7-list-button>
    </f7-list>
  </f7-page>
</template>

<script>
import share from "/modules/share";
import f7components from "/components/f7components";

export default {
  components: {
    ...f7components,
  },
};
</script>
