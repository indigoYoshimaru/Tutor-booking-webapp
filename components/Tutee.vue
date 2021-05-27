<template>
  <f7-page :page-content="false">
    <f7-navbar title="Tutee">
      <f7-subnavbar>
        <f7-segmented raised>
          <f7-button tab-link="#tutor-list" tab-link-active
            >Available Tutors</f7-button
          >
          <f7-button tab-link="#chatbox">Tab 2</f7-button>
          <f7-button tab-link="#tab3">Tab 3</f7-button>
        </f7-segmented>
      </f7-subnavbar>
    </f7-navbar>
    <f7-tabs>
      <f7-tab id="tutor-list" tab-active class="page-content">
        <f7-block class="page-grid">
          <f7-list style="list-style-type: none" form>
            <f7-row>
              <f7-col width="10"></f7-col>
              <f7-col width="30">
                <f7-list-input
                  outline
                  label="Name"
                  floating-label
                  type="text"
                  placeholder="Your name"
                  clear-button
              /></f7-col>
              <f7-col width="20"
                ><f7-list-input
                  outline
                  label="Subject filter"
                  floating-label
                  type="select"
                  clear-button
                >
                </f7-list-input>
              </f7-col>
              <f7-col width="10"
                ><f7-button raised style="margin-top: 20px"
                  ><span class="material-icons-outlined">
                    search
                  </span></f7-button
                ></f7-col
              >
              <f7-col width="10"></f7-col>
            </f7-row>
          </f7-list>
          <hr />
          <f7-row>
            <f7-col>
              <f7-row>
                <f7-block v-for="tutor in tutorList" :key="tutor.id">
                  <f7-col>
                    <f7-card outline>
                      <f7-card-header
                        >{{ tutor.firstName }} {{ tutor.lastName }}
                      </f7-card-header>
                      <f7-card-content>
                        <f7-col>
                          <f7-row>
                            Teaching: {{ tutor.profile.Background.Name }}
                          </f7-row>
                          <f7-row>
                            GPA: {{ tutor.profile.Background.GPA }}
                          </f7-row>
                          <f7-row>Email: {{ tutor.email }}</f7-row>
                          <f7-row
                            >Brief intro:
                            {{ tutor.profile.Description }}</f7-row
                          >
                        </f7-col>
                      </f7-card-content>
                      <f7-card-footer>
                        <f7-button style="margin-left: auto" raised
                          ><span
                            class="material-icons-outlined"
                            @click="chatWith(tutor.id)"
                          >
                            forum
                          </span></f7-button
                        >
                      </f7-card-footer>
                    </f7-card>
                  </f7-col>
                </f7-block>
              </f7-row>
            </f7-col>
          </f7-row>
        </f7-block>
      </f7-tab>
      <!-- chatbox -->
      <f7-tab id="chatbox" class="page-content">
        <f7-block>
          <f7-card>
            <f7-card-header>name-of-the-tutor</f7-card-header>
            <f7-card-content>
              <br />
              <f7-block
                v-for="message in messages"
                class="message"
                :class="{
                  'message-out': message.author === 'tutee',
                  'message-in': message.author == 'tutor',
                }"
              >
                {{ message.body }}
              </f7-block>
              <br /><br />
              <f7-list style="list-style-type: none" form>
                <f7-row no-gap style="margin-bottom: 20px">
                  <f7-col width="5"></f7-col>
                  <f7-col width="65">
                    <f7-list-input
                      outline
                      type="text"
                      placeholder="Type your message"
                      clear-button
                  /></f7-col>
                  <f7-col width="5">
                    <f7-button raised style="margin-top: 15px"
                      ><span class="material-icons-outlined">
                        send
                      </span></f7-button
                    >
                  </f7-col>
                  <f7-col width="15">
                    <f7-button raised style="margin-top: 15px"
                      >Create Contract</f7-button
                    >
                  </f7-col>
                  <f7-col width="5"></f7-col>
                </f7-row>
              </f7-list>
            </f7-card-content>
          </f7-card>
        </f7-block>
      </f7-tab>
      <!-- create contract -->
      <f7-tab id="tab3" class="page-content">
        <f7-block class="page-grid">
          <f7-block-title>Contract</f7-block-title>
          <f7-row>Tutee </f7-row>
          <f7-row>
            Name: {{ currentUser.firstName }}
            {{ currentUser.lastName }} Username: {{ currentUser.userName }}
          </f7-row>
          <f7-row>Tutor
          </f7-row>
          <f7-row>
            Name: {{ chosenTutor.firstName }}
            {{ chosenTutor.lastName }} Username: {{ chosenTutor.userName }}
          </f7-row>
        </f7-block>
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
  data() {
    return {
      //pseudo data
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
      currentUser: {
        id: "2",
        firstName: "Dupli",
        lastName: "Cate",
        userName: "duplicate",
        email: "duplicate@gmail.com",
        dob: "27-02-1998",
      },
      chosenTutor: {
        id: "2",
        firstName: "Karen",
        userName: "duplicate",
        email: "karen@gmail.com",
        dob: "28-01-2000",
      },
      //chat data
      outMessage: "",
      messages: [
        {
          body: "Welcome to the chat, I'm Bob!",
          author: "tutee",
        },
        {
          body: "Thank you Bob",
          author: "tutor",
        },
        {
          body: "Are you stupid, Bob?",
          author: "tutor",
        },
        {
          body: "You're most welcome",
          author: "tutee",
        },
        {
          body: "Let's make a deal",
          author: "tutee",
        },
        {
          body: "OK",
          author: "tutor",
        },
      ],
    };
  },
  methods: {
    getTutorList() {},
  },
  chatWith(tutorId) {},
};
</script>

<style scoped>
hr {
  border-color: #dcdcdc;
  background-color: #dcdcdc;
}
.message {
  width: 25%;
  padding: 1em;
  margin-bottom: 1em;
}
.message-out {
  background: #407fff;
  color: white;
  margin-left: 73%;
  border-radius: 25px 25px 0px 25px;
}
.message-in {
  background: #f1f0f0;
  color: black;
  margin-left: 2%;
  border-radius: 25px 25px 25px 0px;
}
.chat-inputs {
  display: flex;
  justify-content: space-between;
}
.page-grid {
  /* [class*="col"] */
  background: #fff;
  text-align: center;
  color: #000;
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
