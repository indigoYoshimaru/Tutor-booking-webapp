<template>
  <f7-page>
    <f7-navbar back-link="" title="Issue Resolution">
      <f7-nav-right :sliding="true">
        <f7-button panel-open="right"
          ><f7-icon ios="f7:square_list_fill"></f7-icon
        ></f7-button>
      </f7-nav-right>
    </f7-navbar>
    <f7-block>
      <f7-block-title>Return Percentage</f7-block-title>
      <f7-list media-list inset>
        <f7-list-item>
          <f7-list-input
            type="number"
            maxlength="200"
            placeholder="Enter return percentage"
            :value="resolution.returnPercentage"
            @input="resolution.returnPercentage = $event.target.value"
          />
        </f7-list-item>
      </f7-list>
      <f7-button fill round @click="resolveIssue()">Resovle</f7-button>
    </f7-block>
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
    f7router: Object,
    issueId: Number,
  },
  data() {
    return {  
      resolution:{
        issueId: this.issueId,
        returnPercentage: "",
      },            
    };
  },
  methods: {
    async resolveIssue() {
      var result = await service.createIssueResolution(this.resolution);
      console.log(result);
      await service.getAdminInfo();  
      f7.dialog.alert(result, "Message",() => {
        
        this.f7router.navigate(`/`);
      });
    },
  },
};
</script>
