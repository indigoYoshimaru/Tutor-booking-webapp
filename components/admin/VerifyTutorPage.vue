<template>
  <f7-page login-screen>
    <f7-navbar title="Unverified Tutor" back-link=""></f7-navbar>

    <f7-login-screen-title>
      {{ unverifiedTutor.firstName }}
      {{ unverifiedTutor.lastName }}</f7-login-screen-title
    >
    <f7-list style="list-style-type: none" form>
      <f7-list-item title="Date of birth">{{
        unverifiedTutor.dateOfBirth
      }}</f7-list-item>
      <f7-list-item title="Email"> {{ unverifiedTutor.email }}</f7-list-item>
      <f7-list-item title="Brief intro" v-if="unverifiedTutor.profile">
        {{ unverifiedTutor.profile.description }}</f7-list-item
      >
      <f7-list-item title="Teaching courses"></f7-list-item>
      <!-- <f7-list-button round fill @click="verifyTutor">Verify Tutor</f7-list-button> -->
    </f7-list>
    <f7-list v-if="unverifiedTutor.profile">
      <!-- <f7-list-item title="Teaching courses"></f7-list-item> -->
      <!-- <li>
          <ul>
            <f7-row>
              <f7-col class="block-title"> Tutoring courses </f7-col>
              <f7-col class="block-title">GPA</f7-col>
            </f7-row>

            <div
              v-for="course in unverifiedTutor.profile.background"
              :key="course.id"
            >
              <f7-row>
                <f7-col>{{ course.name }} </f7-col>
                <f7-col>{{ course.GPA }} </f7-col>
              </f7-row>
            </div>
          </ul>
        </li> -->

      <!-- <f7-row>
          <f7-col class="block-title"> Tutoring courses </f7-col>
          <f7-col class="block-title">GPA</f7-col>
        </f7-row> -->

      <!-- <f7-row>
            <f7-col class="block-title">
              <div style="text-align: left">Tutoring courses</div>
            </f7-col>
            <f7-col class="block-title">
              <div style="text-align: left">GPA</div>
            </f7-col>
            <f7-col class="block-title">GPA</f7-col> 
          </f7-row> -->
      <div
        v-for="course in unverifiedTutor.profile.background"
        :key="course.id"
      >
        <f7-row>
          <f7-col>
            <div style="text-align: center">{{ course.name }}</div>
          </f7-col>
          <f7-col>
            <div style="text-align: center">{{ course.GPA }}</div>
          </f7-col>
        </f7-row>
      </div>
    </f7-list>

    <f7-button @click="verifyTutor">Verify tutor</f7-button>
  </f7-page>
</template>

<script>
import share from "/modules/admin/share";
import { f7 } from "framework7-vue";
import f7components from "/components/f7components";
import service from "/modules/admin/service";

export default {
  components: {
    ...f7components,
  },

  props: {
    unverifiedTutorId: Number,
    f7router: Object,
  },

  computed: {
    unverifiedTutor() {
      console.log(share.unverifiedTutor);
      return share.unverifiedTutor;
    },
  },

  methods: {
    async getUnverifiedTutor() {
      let tutor = await service.getUnverifiedTutorById(this.unverifiedTutorId);
      share.unverifiedTutor = tutor;
    },

    async verifyTutor() {
      let result = await service.verifyTutor(this.unverifiedTutorId);

      f7.dialog.alert(result, () => {
        this.f7router.back();
      });
    },
  },
  mounted() {
    this.getUnverifiedTutor();
  },
};
</script>