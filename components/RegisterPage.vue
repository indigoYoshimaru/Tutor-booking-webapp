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

      <div v-for="(input, index) in subject_gpa" :key="`pairInput-${index}`">
        <f7-row no-gap>
          <f7-col>
            <f7-list-input
              label="Teaching"
              type="select"
              placeholder="Please chose"
              v-model="input.subject"
            >
              <option value="" disabled selected>Select subject</option>
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
              v-model="input.gpa"
            >
            </f7-list-input>
          </f7-col>
          <f7-col>
            <f7-button @click="addField(input, subject_gpa)"
              ><span class="material-icons">add</span></f7-button
            >
            <f7-button
              v-show="subject_gpa.length > 1"
              @click="removeField(index, subject_gpa)"
              ><span class="material-icons">remove</span></f7-button
            >
          </f7-col>
        </f7-row>
      </div>
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
      <!-- <f7-block-footer
        >Some text about login information.<br />Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.</f7-block-footer
      > -->
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
      subject_gpa: [
        {
          subjects: "",
          gpas: "",
        },
      ],
      description: "",
      phoneNumbers: [{ phone: "" }],
    };
  },
  methods: {
    register() {
      const self = this;
      f7.dialog.alert(
        `Firstname: ${self.firstName}<br>        
        Subjects: ${self.subject_gpa.subjects}
        GPAs: ${self.subject_gpa.gpas}<br>`,
        () => {
          self.f7router.back();
        }
      );
    },
    addField(value, fieldType) {
      fieldType.push({ value: "" });
      console.log(fieldType);
    },
    removeField(index, fieldType) {
      fieldType.splice(index, 1);
    },
  },
};
</script>


