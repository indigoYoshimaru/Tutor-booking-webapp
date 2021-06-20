<template>
  <f7-page>
    <f7-navbar
      large
      title="Contact tutors to set date"
      back-link=""
    ></f7-navbar>

    <f7-block>
      <f7-row>
        <f7-col v-for="tutor in res" :key="tutor.id" width="30">
          <f7-card>
            <f7-card-header
              style="
                font-weight: bold;
                text-transform: uppercase;
                background-color: var(--f7-theme-color);
                color: white;
              "
            >
              {{ tutor.firstName }} {{ tutor.lastName }}
            </f7-card-header>
            <f7-card-content>
              <f7-list media-list inset>
                <f7-list-item>Email: {{ tutor.email }}</f7-list-item>
                <f7-list-item
                  >Brief intro: {{ tutor.profile.description }}</f7-list-item
                >
                <f7-list-item>
                  <f7-treeview-item label="Courses">
                    <f7-row>
                      <f7-col class="block-title"> Tutoring courses </f7-col>
                      <f7-col class="block-title">GPA</f7-col>
                    </f7-row>

                    <div
                      v-for="course in tutor.profile.background"
                      :key="course.id"
                    >
                      <f7-row>
                        <f7-col>{{ course.name }} </f7-col>
                        <f7-col>{{ course.GPA }} </f7-col>
                      </f7-row>
                    </div>
                  </f7-treeview-item>
                </f7-list-item>
              </f7-list>
              <!-- 
              <f7-col>
                <f7-row> <f7-col>Teaching</f7-col><f7-col>GPA</f7-col> </f7-row>
                <f7-row
                  v-for="course in tutor.profile.background"
                  :key="course.id"
                >
                  <f7-col>{{ course.name }}</f7-col>
                  <f7-col>{{ course.GPA }}</f7-col>
                </f7-row>
                <f7-row>Email: {{ tutor.email }}</f7-row>
                <f7-row>Brief intro: {{ tutor.profile.description }}</f7-row>
              </f7-col> -->
            </f7-card-content>
            <f7-card-footer>
              <f7-button
                round
                style="margin-left: auto"
                @click="contactTutor(tutor.id)"
                ><f7-icon f7="bolt_horizontal_circle_fill"></f7-icon
                ><span>Chat now!</span>
              </f7-button>
            </f7-card-footer>
          </f7-card>
        </f7-col>
      </f7-row>
    </f7-block>

    <!-- </f7-row>
      </f7-col>
    </f7-row> -->
  </f7-page>
</template>

<script>
import share from "/modules/share";
import f7components from "/components/f7components";
import service from "/modules/service";

let res = await service.getTutors();
console.log(res);
export default {
  components: {
    ...f7components,
  },
  props: {
    f7router: Object,
  },
  data() {
    return {
      res: res,
    };
  },
  methods: {
    async contactTutor(tutorId) {
      console.log(tutorId);
      let result = await service.contactTutor(tutorId);
      
      if (result) {
        await service.getCurrentUserInfo();
        let chatroom = result.chatroom;

        this.f7router.navigate(`/chat/${chatroom.id}/${chatroom.tutorId}`);
      }
    },
  },
};
</script>