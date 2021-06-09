<template>
  <f7-page>
    <f7-navbar back-link="" title="Select Tutor">
      <f7-nav-right :sliding="true"> </f7-nav-right>
    </f7-navbar>
    <!-- <f7-subnavbar :inner="false">
      <f7-searchbar
        search-container=".virtual-list"
        search-item="li"
        search-in="title"
      ></f7-searchbar>
    </f7-subnavbar>
    <f7-list class="searchbar-not-found">
      <f7-list-item title="No tutor found"></f7-list-item>
    </f7-list>
    <f7-list
      class="searchbar-found"
      medial-list
      virtual-list
      :virtual-list-params="{
        searchAll,
        renderExternal,
        height: 63,
      }"
    >
      <ul>
        <f7-list-item v-for="tutor in res" :key="tutor.id" media-item>
          <f7-card expandable>
            <f7-card-header text-color="black" class="display-block"
              >{{ tutor.firstName }} {{ tutor.lastName }}</f7-card-header
            >
            <small :style="{ opacity: 0.7 }" v-text="tutor.email"></small>
            <f7-card-content> </f7-card-content>
            <div class="card-content-padding">{{ tutor.background }}</div>
          </f7-card>
        </f7-list-item>
      </ul>
    </f7-list> -->
    <f7-list style="list-style-type: none" form>
      <f7-row>
        <f7-col width="10"></f7-col>
        <f7-col width="30">
          <f7-list-input
            outline
            label="Name"
            floating-label
            type="text"
            placeholder="Tutor name"
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
            ><span class="material-icons-outlined"> search </span></f7-button
          ></f7-col
        >
        <f7-col width="10"></f7-col>
      </f7-row>
    </f7-list>
    <hr />
    <f7-row>
      <f7-col>
        <f7-row>
          <f7-block v-for="tutor in res" :key="tutor.id">
            <f7-col>
              <f7-card outline>
                <f7-card-header
                  >{{ tutor.firstName }} {{ tutor.lastName }}
                </f7-card-header>
                <f7-card-content>
                  <f7-col>
                    <f7-row>
                      <f7-col>Teaching</f7-col><f7-col>GPA</f7-col>
                    </f7-row>
                    <f7-row
                      v-for="course in tutor.profile.background"
                      :key="course.id"
                    >
                      <f7-col>{{ course.name }}</f7-col>
                      <f7-col>{{ course.GPA }}</f7-col>
                    </f7-row>
                    <f7-row>Email: {{ tutor.email }}</f7-row>
                    <f7-row
                      >Brief intro: {{ tutor.profile.description }}</f7-row
                    >
                  </f7-col>
                </f7-card-content>
                <f7-card-footer>
                  <f7-button
                    style="margin-left: auto"
                    raised
                    @click="selectTutor(tutor)"
                    >Select</f7-button
                  >
                </f7-card-footer>
              </f7-card>
            </f7-col>
          </f7-block>
        </f7-row>
      </f7-col>
    </f7-row>
    <f7-block
      ><f7-button raised @click="createContract()">Select</f7-button>
    </f7-block>
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
    async selectTutor(tutor) {
      share.selectedTutor = tutor;
      f7.dialog.alert(share.selectedTutor.firstName, () => {
        this.f7router.navigate("/create-contract/");
      });
    },
  },
};
</script>