<template>
  <f7-page no-toolbar no-swipeback login-screen>
    <f7-navbar back-link="">
      <f7-nav-title>Register</f7-nav-title>
      <f7-subnavbar>
        <f7-segmented raised>
          <f7-button tab-link="#tutor-res" tab-link-active
            >As Tutor</f7-button
          >
          <f7-button tab-link="#tutee-res">As Tutee</f7-button>
        </f7-segmented>
      </f7-subnavbar>
    </f7-navbar>
    <f7-tabs>
      <f7-tab id="tutor-res" tab-active class="page-content">
        <f7-login-screen-title>Tutor Register</f7-login-screen-title>
        <f7-list style="list-style-type: none" form>
          <f7-list-input
            label="First Name"
            floating-label
            type="text"
            placeholder="Your first name"
            :value="tutorInfo.firstName"
            @input="tutorInfo.firstName = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            label="Last Name"
            floating-label
            type="text"
            placeholder="Your last name"
            :value="tutorInfo.lastName"
            @input="tutorInfo.lastName = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            label="Email"
            floating-label
            type="email"
            placeholder="Your Email"
            :value="tutorInfo.email"
            @input="tutorInfo.email = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            label="Username"
            floating-label
            type="text"
            placeholder="Your username"
            :value="tutorInfo.userName"
            @input="tutorInfo.userName = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            label="Password"
            floating-label
            type="password"
            placeholder="Your password"
            :value="tutorInfo.password"
            @input="tutorInfo.password = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            label="Confirm Password"
            floating-label
            type="password"
            placeholder="Re-enter your password"
            :value="tutorInfo.confirmedPassword"
            @input="tutorInfo.confirmedPassword = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            label="D.O.B"
            floating-label
            type="date"
            placeholder="Your D.O.B."
            value="2000-01-01"
            @change="tutorInfo.dob = $event.target.value"
          ></f7-list-input>

          <div
            v-for="(input, index) in tutorInfo.subject_gpa"
            :key="`pairInput-${index}`"
          >
            <f7-row no-gap>
              <f7-col>
                <f7-list-input
                  label="Teaching"
                  floating-label
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
                  floating-label
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Enter your GPA"
                  v-model="input.gpa"
                >
                </f7-list-input>
              </f7-col>
              <f7-col>
                <f7-button @click="addField(input, tutorInfo.subject_gpa)"
                  ><span class="material-icons">add</span></f7-button
                >
                <f7-button
                  v-show="tutorInfo.subject_gpa.length > 1"
                  @click="removeField(index, tutorInfo.subject_gpa)"
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
          <f7-list-button @click="tutorRegister">Register</f7-list-button>
          <!-- <f7-block-footer
        >Some text about login information.<br />Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.</f7-block-footer
      > -->
        </f7-list>
      </f7-tab>
      <!-- Tutee Page -->
      <f7-tab id="tutee-res" class="page-content">
        <f7-login-screen-title>Tutee Register</f7-login-screen-title>
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
          <!-- <f7-block-footer
        >Some text about login information.<br />Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.</f7-block-footer
      > -->
        </f7-list>
      </f7-tab>
    </f7-tabs>
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
      tutorInfo: {
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
        description: ""       
      },
      tuteeInfo: {
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        email: "",
        confirmedPassword: "",
        dob: "",
      },
    };
  },
  methods: {
    tutorRegister() {
      const currentInfo = this.tutorInfo;
      f7.dialog.alert(
        `Firstname: ${currentInfo.firstName}<br>        
        Subjects: ${currentInfo.subject_gpa.subjects}<br>
        GPAs: ${currentInfo.subject_gpa.gpas}<br>`,
        () => {
          this.f7router.back();
        }
      );
    },
    tuteeRegister() {
      const currentInfo = this.tuteeInfo;
      f7.dialog.alert(
        `Firstname: ${currentInfo.firstName}<br>        
        Username: ${currentInfo.userName}<br>        
        `,
        () => {
          this.f7router.back();
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


