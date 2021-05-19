<template>
  <f7-page :page-content="false">
    <f7-navbar title="Tutee">
      <f7-subnavbar>
        <f7-segmented raised>
          <f7-button tab-link="#tutor-list" tab-link-active
            >Available Tutors</f7-button
          >
          <f7-button tab-link="#tab2">Tab 2</f7-button>
          <f7-button tab-link="#tab3">Tab 3</f7-button>
        </f7-segmented>
      </f7-subnavbar>
    </f7-navbar>
    <f7-tabs>
      <f7-tab id="tutor-list" tab-active class="page-content">
        <f7-row>
          <f7-block v-for="tutor in tutorList" :key="tutor.id">
            <f7-col width="col-66">
              <f7-card>
                <f7-card-header
                  >{{ tutor.firstName }} {{ tutor.lastName }}
                </f7-card-header>
                <f7-card-content>
                  <f7-col>
                    <f7-row>
                      Teaching: {{ tutor.profile.Background.Name }}
                    </f7-row>
                    <f7-row> GPA: {{ tutor.profile.Background.GPA }} </f7-row>
                    <f7-row>Email: {{tutor.email}}</f7-row>
                    <f7-row>Brief intro: {{tutor.profile.Description}}</f7-row>
                  </f7-col>
                </f7-card-content>
                <f7-card-footer>
                  
                  <f7-button style="margin-left:auto;" raised
                    ><span class="material-icons-outlined" @click="chatWith(tutor.id)">
                      forum
                    </span></f7-button
                  >
                </f7-card-footer>
              </f7-card>
            </f7-col>
          </f7-block>
        </f7-row>
      </f7-tab>
      <f7-tab id="chatbox" class="page-content">
        <f7-block> chatbox </f7-block>
      </f7-tab>

      <f7-tab id="tab3" class="page-content">
        <f7-block> Chưa biết/không nhớ để j :V </f7-block>
      </f7-tab>
    </f7-tabs>  
  </f7-page>

  
</template>

<script>
import share from "/modules/share";
import f7components from "/components/f7components";

export default {
  components: {
    ...f7components,
  },
  //data
  data() {
    return {
      //pseudo list
      tutorList: [
        {
          id: 5,
          firstName: "Tony",
          lastName: "Stark",
          userName: "tony_stark",
          email: "tony_stark@gmail.com",
          dob: "14-05-2001",
          profile: {
            Background: { Id: 2, GPA: 3.9, Name: "Intro to Computing" },
            Description: "I am handsome",
          },
        },
        {
          id: 2,
          firstName: "Karen",
          lastName: "",
          userName: "karen",
          email: "karen@gmail.com",
          dob: "15-05-2001",
          profile: {
            Background: { Id: 2, GPA: 3.9, Name: "AI" },
            Description: "I wanna see your manager",
          },
        },
        {
          id: 3,
          firstName: "Charles",
          lastName: "Jefferson",
          userName: "charles_jefferson",
          email: "charles_jefferson@gmail.com",
          dob: "16-05-2001",
          profile: {
            Background: { Id: 2, GPA: 3.9, Name: "Web App" },
            Description: "I am handsome",
          },
        },
        {
          id: 3,
          firstName: "Charles",
          lastName: "Jefferson",
          userName: "charles_jefferson",
          email: "charles_jefferson@gmail.com",
          dob: "16-05-2001",
          profile: {
            Background: { Id: 2, GPA: 3.9, Name: "Web App" },
            Description: "I am handsome",
          },
        },
        {
          id: 3,
          firstName: "Charles",
          lastName: "Jefferson",
          userName: "charles_jefferson",
          email: "charles_jefferson@gmail.com",
          dob: "16-05-2001",
          profile: {
            Background: { Id: 2, GPA: 3.9, Name: "Web App" },
            Description: "I am handsome",
          },
        },
        {
          id: 3,
          firstName: "Charles",
          lastName: "Jefferson",
          userName: "charles_jefferson",
          email: "charles_jefferson@gmail.com",
          dob: "16-05-2001",
          profile: {
            Background: { Id: 2, GPA: 3.9, Name: "Web App" },
            Description: "I am handsome",
          },
        },
        {
          id: 3,
          firstName: "Charles",
          lastName: "Jefferson",
          userName: "charles_jefferson",
          email: "charles_jefferson@gmail.com",
          dob: "16-05-2001",
          profile: {
            Background: { Id: 2, GPA: 3.9, Name: "Web App" },
            Description: "I am handsome",
          },
        },
      ],
    };
  },
  methods: {
    getTutorList() {},
  },
  chatWith(tutorId){

  }
};
</script>
