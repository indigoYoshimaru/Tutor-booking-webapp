<template>
  <f7-page>
    <f7-navbar large title="Issues">
      <f7-nav-right :sliding="true">
        <!-- <f7-button panel-open="right"
          ><f7-icon ios="f7:square_list_fill"></f7-icon
        ></f7-button> -->
      </f7-nav-right>
    </f7-navbar>
    <f7-block>
      <f7-block-title large>Issues</f7-block-title>
      <f7-block-content>
        <f7-list
          media-list
          inset
          v-for="issue in currentUser.issues"
          :key="issue.id"
        >          
          <f7-list-item>
            <template #media>
              <f7-button
                fill
                large
                active
                v-bind:color="colors[issueStatus(issue)]"
                >{{ issueStatus(issue) }}</f7-button
              >
            </template>
            <f7-list-item
              v-bind:title="'Content'"
              v-bind:subtitle="issue.content"
            >
            </f7-list-item>

            <f7-list-item title="Raised by tutor" v-if="issue.isFromTutor">
            </f7-list-item>
            <f7-list-item title="Raised by tutee" v-else> </f7-list-item>
            <f7-list-item
              title="Regarding"
              
            >
            </f7-list-item>
            <f7-list-item
              title="Agreement by both parties"
              v-if="issue.tutorAgreement && issue.tuteeAgreement"
              subtitle="Yes"
            >
            </f7-list-item>
            <f7-list-item
              title="Agreement by both parties"
              v-else
              subtitle="Not yet"
            >
            </f7-list-item>
            <f7-list-item title="Return amount">
              <f7-gauge
                type="semicircle"
                :value="`${issue.returnPercentage / 100}`"
                :size="250"
                border-color="#2196f3"
                :border-width="10"
                :value-text="`${issue.returnPercentage}%`"
                :value-font-size="41"
                value-text-color="#2196f3"
                label-text="paid amount"
              ></f7-gauge>
            </f7-list-item>
            <f7-list-item v-if="!issue.returnPercentage">
              <f7-button fill round @click="navigateToResolve(issue.id)">
                Resolve
              </f7-button>
            </f7-list-item>
          </f7-list-item>
        </f7-list>
      </f7-block-content>
    </f7-block>
  </f7-page>
</template>

<script>
import service from "/modules/admin/service";
//import generalService from "/modules/service";
import share from "/modules/admin/share";
import { f7 } from "framework7-vue";
import f7components from "/components/f7components";

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
    colors() {
      return share.colors;
    },
    tutees(){
      
      return share.tutees;
    }
  },
  data() {
    return {
    }
  },
  methods: {
    issueStatus(issue) {
      if (issue.isOpen) {
        if (
          (issue.tutorAgreement == 0 || issue.tuteeAgreement == 0) &&
          issue.returnPercentage
        ) {
          return "WAITING";
        } else {
          return "OPEN";
        }
      } else {
        return "RESOLVED";
      }
    },
    navigateToResolve(issueId) {
      this.f7router.navigate(`/resolve-issue/${issueId}`);
    },
    getTutors() {
      let result = service.getTutorNameByContractId(contractId);
      return result.firstName + result.lastName;
    },
    async getTutees() {
      let issues= share.issues; 
      share.tutees={}
      for (issue of issues){ 
        let result = await service.getTuteeNameByContractId(issue.contractId);
        share.tutees[issue.id]=result.firstName + result.lastName;
      }
      console.log(share.tutees)
    },
  },
};
</script>
