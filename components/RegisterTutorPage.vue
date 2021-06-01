<template>
  <f7-page>
    <f7-navbar :transparent="true">
      <f7-icon ios="f7:house_fill"></f7-icon>
      <f7-nav-right :sliding="true">
        <f7-button panel-open="right"
          ><f7-icon ios="f7:menu"></f7-icon
        ></f7-button>
      </f7-nav-right>
    </f7-navbar>
    <f7-tab id="tutor-res" tab-active class="page-content">
      <f7-login-screen-title>Tutor Registration</f7-login-screen-title>
      <f7-list style="list-style-type: none" form>
        <f7-list-input
          label="First Name"
          floating-label
          type="text"
          placeholder="Your first name"
          info="Default validation"
          :value="tutorInfo.firstName"
          @input="tutorInfo.firstName = $event.target.value"
        ></f7-list-input>
        <f7-list-input
          label="Last Name"
          floating-label
          type="text"
          placeholder="Your last name"
          info="Default validation"
          :value="tutorInfo.lastName"
          @input="tutorInfo.lastName = $event.target.value"
        ></f7-list-input>
        <f7-list-input
          label="Email"
          floating-label
          type="email"
          placeholder="Your Email"
          info="Default e-mail validation"
          :value="tutorInfo.email"
          @input="tutorInfo.email = $event.target.value"
        ></f7-list-input>
        <f7-list-input
          label="Username"
          floating-label
          type="text"
          placeholder="Your username"
          info="Default validation"
          :value="tutorInfo.username"
          @input="tutorInfo.username = $event.target.value"
        ></f7-list-input>
        <f7-list-input
          label="Password"
          floating-label
          type="password"
          placeholder="Your password"
          info="Default validation"
          :value="tutorInfo.password"
          @input="tutorInfo.password = $event.target.value"
        ></f7-list-input>
        <f7-list-input
          label="Confirm Password"
          floating-label
          type="password"
          placeholder="Re-enter your password"
          :value="confirmedPassword"
          @input="confirmedPassword = $event.target.value"
        ></f7-list-input>
        <f7-list-input
          label="Date of birth"
          floating-label
          type="date"
          placeholder="Date of birth."
          value="2000-01-01"
          @input="tutorInfo.dateOfBirth = $event.target.value"
        ></f7-list-input>
      </f7-list>
      <!-- 
      <f7-list v-for="course in courses" :key="course.id">
        <f7-list-item checkbox title="course.name"></f7-list-item>
      </f7-list> -->
      <f7-list>
        <f7-list-item>
          <f7-button
            round
            fill
            @click="addField(input, tutorInfo.profile.background)"
            ><f7-icon f7="plus_square_fill"></f7-icon> Add more
            course</f7-button
          >
        </f7-list-item>

        <div
          v-for="(input, index) in tutorInfo.profile.background"
          :key="`pairInput-${index}`"
        >
          <f7-row no-gap>
            <f7-col>
              <f7-list-input
                label="Courses to teach"
                floating-label
                type="select"
                placeholder="Please choose the course you'd like to teach"
                v-model:value="input.cidx"
                @change="handleOnChange(input, parseInt($event.target.value))"
              >
                <option
                  v-for="(course, cidx) in courses"
                  :key="cidx"
                  :value="cidx"
                >
                  {{ course.name }}
                </option>
              </f7-list-input>
            </f7-col>
            <f7-col>
              <f7-list-input
                label="GPA"
                floating-label
                type="number"
                min="3.0"
                max="4.0"
                placeholder="Enter your GPA"
                v-model:value="input.GPA"
              >
              </f7-list-input>
            </f7-col>
            <f7-col>
              <f7-button
                v-show="tutorInfo.profile.background.length > 1"
                @click="removeField(index, tutorInfo.profile.background)"
                ><f7-icon f7="minus_circle"></f7-icon
              ></f7-button>
            </f7-col>
          </f7-row>
        </div>
        <f7-list-input
          label="Description"
          type="textarea"
          placeholder="Describe yourself (under 200 words)."
          maxlength="200"
          :value="tutorInfo.profile.description"
          @input="tutorInfo.profile.description = $event.target.value"
        ></f7-list-input>
      </f7-list>
      <f7-list>
        <f7-list-button @click="register">Register</f7-list-button>
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
      tutorInfo: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        dateOfBirth: "",
        profile: {
          background: [],
          description: "",
        },
      },
    };
  },
  methods: {
    async register() {
      // let res= await service.registerTutor(this.tutorInfo.firstName, this.tutorInfo.lastName, this.tutorInfo.username, this.tutorInfo.email, this.tutorInfo.password, this.tutorInfo.dateOfBirth, this.tutorInfo.profile);
      // console.log(res);
      const currentInfo = this.tutorInfo;

      for (let obj of currentInfo.profile.background) {
        delete obj.value;
        delete obj.cidx;
        obj = JSON.stringify(obj);
      }
      currentInfo.profile = JSON.stringify(currentInfo.profile);
      console.log(currentInfo);
      let result = await service.registerTutor(currentInfo);
      console.log(result);
      f7.dialog.alert(result, () => {
        this.f7router.navigate("/");
      });
    },
    addField(value, fieldType) {
      fieldType.push({ value: "" });
      console.log(fieldType);
    },
    removeField(index, fieldType) {
      fieldType.splice(index, 1);
    },
    handleOnChange(input, index) {
      input.id = this.courses[index].id;
      input.name = this.courses[index].name;
    },
  },
};
</script>
