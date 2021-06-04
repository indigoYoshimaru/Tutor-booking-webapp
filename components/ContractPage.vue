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
        <f7-list-item title="Tutor"
          >{{ contractInfo.tutor.firstName }} {{ contractInfo.tutor.lastName }}

          <template #after>
            <f7-button
              fill
              large
              round
              v-bind:color="colors[contractInfo.state]"
              active
            >
              {{ contractInfo.state }}
            </f7-button>
          </template>
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
          >{{ contractInfo.teachingHour }}
        </f7-list-item>

        <f7-list-item></f7-list-item>
      </f7-list>
    </f7-block>
    <f7-block>
      <f7-block-title>Issues</f7-block-title>
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
    contractInfo() {
      let contract = share.currentUser.contracts[this.contractId];
      contract.tutor = share.currentUser;
      contract.tutee = share.otherContractUsers[contract.tuteeId];
      if (currentUser.role == "tutee") {
        contract.tutee = share.currentUser;
        contract.tutor = share.otherContractUsers[contract.tutorId];
      }
      return contract;
    },
    async issueInfo() {
      let issues = await service.getIssueByContractId(this.contractId);
      share.issues = issues;
      return issues;
    },
  },
};
</script>
