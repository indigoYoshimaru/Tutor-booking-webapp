<template>
  <f7-page>
    <f7-navbar back-link="" title="New Contract">
      <f7-nav-right :sliding="true"> </f7-nav-right>
    </f7-navbar>
    <f7-block>
      <f7-block-title>Tutee</f7-block-title>
      <f7-list media-list inset>
        <f7-list-item
          v-bind:title="currentUser.firstName + ' ' + currentUser.lastName"
          v-bind:subtitle="'Birthday:' + currentUser.dateOfBirth"
        >
          <template #media>
            <img
              src="https://cdn0.iconfinder.com/data/icons/animal-icons-flat/128/fox-512.png"
              width="45"
            />
          </template>
        </f7-list-item>
      </f7-list>
    </f7-block>
    <f7-block>
      <f7-block-title>Tutor</f7-block-title>
      <f7-list media-list inset>
        <f7-list-item
          v-bind:title="selectedTutor.firstName + ' ' + selectedTutor.lastName"
          v-bind:subtitle="'Birthday:' + selectedTutor.dateOfBirth"
        >
          <template #media>
            <img
              src="https://cdn0.iconfinder.com/data/icons/animal-icons-flat/128/fox-512.png"
              width="45"
            />
          </template>
        </f7-list-item>
      </f7-list>
    </f7-block>
    <f7-block>
      <f7-block-title>Teaching hours</f7-block-title>
      <f7-list
        ><f7-list-input
          label="Teaching Hours"
          floating-label
          type="number"
          min="0.5"
          max="24"
          :value="contractInfo.teachingHours"
          @input="contractInfo.teachingHours = $event.target.value"
        >
        </f7-list-input>
      </f7-list>
    </f7-block>
    <f7-block>
      <f7-block-title>Teaching days</f7-block-title>
      <f7-list>
        <f7-list-input
          label="Chose teaching date"
          floating-label
          type="date"
          value="2021-01-01"
          @input="addField($event.target.value, contractInfo.listOfTeachingDay)"
        >          
        </f7-list-input>
      </f7-list>
      <f7-list>
        <f7-list-item
          v-for="(date, index) in contractInfo.listOfTeachingDay"
          :key="index"
          ><f7-row>
            <div>
              {{ date }}
            </div>
            <f7-button
              @click="removeField(index, contractInfo.listOfTeachingDay)"
              >Remove
            </f7-button>
          </f7-row>
        </f7-list-item>
      </f7-list>
    </f7-block>

    <f7-block style="padding: 0 40% 0 40%">
      <f7-button large fill @click="createContract()"
        >Create Contract</f7-button
      >
    </f7-block>
  </f7-page>
</template>

<script>
import share from "/modules/share";
import { f7 } from "framework7-vue";
import f7components from "/components/f7components";
import service from "/modules/service";

export default {
  components: {
    ...f7components,
  },
  props: {
    f7router: Object,
  },
  computed: {
    currentUser() {
      return share.currentUser;
    },
  },
  data() {
    return {
      selectedTutor: {},
      contractInfo: {
        tutorId: 17,
        teachingHours: "",
        listOfTeachingDay: [],
      },
    };
  },
  methods: {
    async createContract() {      
      let result = await service.createContract(this.contractInfo);
      f7.dialog.alert(result, "Message", () => {
        this.f7router.navigate("/tutee-main/");
      });
    },
    addField(value, fieldType) {
      fieldType.push(value);
    },
    removeField(index, fieldType) {
      fieldType.splice(index, 1);
    },
  },
};
</script>
