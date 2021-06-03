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
          pattern="(?:[a-zA-Z\s]+)"
          minlength="1"
          maxlength="50"
          validate="true"
          error-message="Your name must only include characters and spaces."
          :value="tutorInfo.firstName"
          @input="tutorInfo.firstName = $event.target.value"
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
          :value="tutorInfo.lastName"
          @input="tutorInfo.lastName = $event.target.value"
        ></f7-list-input>
        <f7-list-input
          label="Email"
          floating-label
          validate="true"
          pattern="^(?:[a-z0-9]+(?:(?:[_\-\.])*[a-z0-9]+)*)@(?:[a-z0-9]+(?:(?:[_\-\.])*[a-z0-9]+)*)$"
          maxlength="50"
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
          error-message="Username are in range of 3-50 characters, composed of letters, numbers, commas, and hyphens and must NOT start with numbers."
          pattern="^(?:[a-zA-Z\.\-_]+[[a-zA-Z\.\-_0-9]*)$"
          minlength="1"
          maxlength="50"
          validate="true"
          :value="tutorInfo.username"
          @input="tutorInfo.username = $event.target.value"
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
          :value="tutorInfo.password"
          @input="tutorInfo.password = $event.target.value"
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
                info="Range 3.0-4.0"
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
          placeholder="Describe yourself under 200 words (can leave empty)."
          maxlength="200"
          :value="tutorInfo.profile.description"
          @input="tutorInfo.profile.description = $event.target.value"
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
      if (this.validatePassword()) {
        if (this.validateForm(currentInfo)) {
          for (let obj of currentInfo.profile.background) {
            delete obj.value;
            delete obj.cidx;
            obj = JSON.stringify(obj);
          }
          currentInfo.profile = JSON.stringify(currentInfo.profile);
          console.log(currentInfo);
          let result = await service.registerTutor(currentInfo);
          console.log(result);
          f7.dialog.alert(
            result + "\nAnd check your email for account verification.", "Congrats",
            () => {
              this.f7router.navigate("/");
            }
          );
        } else {
          f7.dialog.alert("Please fill all fields and check if your GPA(s) are in range 3.0-4.0 before submitting!", "Warning");
        }
      }
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
    validatePassword() {
      let isMatched = true;
      if (this.confirmedPassword != this.tutorInfo.password) {
        isMatched = false;
        f7.dialog.alert("Your passwords are not matched", "Warning");
      }
      return isMatched;
    },
    /*
    validateGPA(background){
        for (let obj of background) {
          if ( parseInt(obj.GPA) > 4 || parseInt(obj.GPA) < 3.0) {
            f7.dialog.alert("Your GPA(s) must be in range 3.0-4.0");
            break;
          }
          // f7.dialog.alert(obj.name + obj.GPA + obj.id);
        }
    },
    */
    validateForm(currentInfo) {
      var allFilled = false;
      var validGPA = true;
      if (
        currentInfo.firstName &&
        currentInfo.lastName &&
        currentInfo.username &&
        currentInfo.email &&
        currentInfo.password &&
        currentInfo.profile.background.length > 0
      ) {
        for (let obj of currentInfo.profile.background) {
          if (obj.name && obj.GPA && obj.id) {
            allFilled = true;
          }
          if (parseInt(obj.GPA) > 4 || parseInt(obj.GPA) < 3.0){
            validGPA = false;
          }
          // f7.dialog.alert(obj.name + obj.GPA + obj.id);
        }
      }
      return allFilled&&validGPA;
    },
  },
};
</script>
