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

    <f7-block>
      <f7-block-title>Contract Content</f7-block-title>
      <f7-list media-list inset>
        <f7-list-item>
          <template #media>
            <f7-button
              fill
              large
              v-bind:color="colors[contractInfo.state]"
              active
            >
              {{ contractInfo.state }}
            </f7-button>
          </template>
        </f7-list-item>
        <f7-list-item title="Tutor"
          >{{ contractInfo.tutor.firstName }} {{ contractInfo.tutor.lastName }}
        </f7-list-item>
        <f7-list-item title="Tutee"
          >{{ contractInfo.tutee.firstName }}
          {{ contractInfo.tutee.lastName }}</f7-list-item
        >
        <f7-list-item title="Start Date"
          >{{ contractInfo.startDate }}
        </f7-list-item>
        <f7-list-item title="Close Date" v-if="contractInfo.closeDate"
          >{{ contractInfo.closeDate }}
        </f7-list-item>
        <f7-list-item title="Number of teaching hours"
          >{{ contractInfo.teachingHours }}
        </f7-list-item>

        <f7-list-item v-if="contractInfo.state === 'WAITING'">
          <f7-button fill round color="green">Accept</f7-button>
          <f7-button round outline color="red">Reject</f7-button>
        </f7-list-item>
        <f7-list-item v-if="contractInfo.state === 'OPEN'">
          <f7-button fill round>Request Close</f7-button>
          <f7-button outline round>Raise Issue</f7-button>
        </f7-list-item>
      </f7-list>
    </f7-block>
    <f7-block>
      <f7-block-title>Issues</f7-block-title>
      <f7-list media-list inset>
        <f7-list-item v-for="issue in issues" :key="issue.id">
          <template #media>
            <f7-button fill large v-if="issue.isOpen === 1" color="red"
              >OPEN</f7-button
            >
            <f7-button fill large v-else color="green">CLOSED</f7-button>
          </template>
          <f7-list-item title="Raised by" v-if="issue.isFromTutor">
            {{ contractInfo.tutor.firstName }}
            {{ contractInfo.tutor.lastName }}
          </f7-list-item>
          <f7-list-item title="Raised by" v-else>
            {{ contractInfo.tutee.firstName }}
            {{ contractInfo.tutee.lastName }}
          </f7-list-item>
          <f7-list-item title="Resolved by">
            {{ issue.admin.firstName }} {{ issue.admin.lastName }}
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
          <f7-button
            fill
            round
            v-if="currentUser.role === 'tutor' && issue.tutorAgreement === 0"
          >
            Confirm Resolution</f7-button
          >
          <f7-button
            fill
            round
            v-if="currentUser.role === 'tutee' && issue.tuteeAgreement === 0"
          >
            Confirm Resolution</f7-button
          >
        </f7-list-item>
      </f7-list>
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
    contractId: Number,
  },

  computed: {
    currentUser() {
      return share.currentUser;
    },
    contractInfo() {
      let contract = share.currentUser.contractMap[this.contractId];

      return contract;
    },
    colors() {
      return share.colors;
    },
    issues() {
      return share.issues ? share.issues : [];
    },
  },
  methods: {
    async getIssues() {
      let issues = await service.getIssueByContractId(this.contractId);
      console.log(issues);
      for (let issue of issues) {
        issue.admin = await service.getAdminNameById(issue.resolveAdminId);
      }
      share.issues = issues;
    },
  },
  mounted() {
    share.issues = null;

    this.getIssues();
  },
};
</script>
