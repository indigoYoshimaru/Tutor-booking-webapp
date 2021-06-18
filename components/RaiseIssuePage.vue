<template>
  <f7-page>
    <f7-navbar back-link="" title="Issue">
      <f7-nav-right :sliding="true">
        <f7-button panel-open="right"
          ><f7-icon ios="f7:square_list_fill"></f7-icon
        ></f7-button>
      </f7-nav-right>
    </f7-navbar>
    <f7-block>
      <f7-block-title>Issue Description</f7-block-title>
      <f7-list media-list inset>        
        <f7-list-item>
          <f7-list-input            
            type="textarea"
            maxlength="200"
            placeholder="Describe are issue under 200 words."
            :value="content"
            @input="content = $event.target.value"
          />
        </f7-list-item>
      </f7-list>
      <f7-button fill round @click="raiseIssue()">Raise Issue
      </f7-button>
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
    contractId: Number,
  },
  computed: {
    currentUser() {
      return share.currentUser;
    },
  },
  data() {
    return {
      isTutor: false,
      content: "",
    };
  },
  methods: {
    async raiseIssue() {   
      if (this.currentUser.role === "tutor") {
        this.isTutor = true;
      }
      var result = await service.raiseIssue(this.isTutor, this.contractId, this.content);
      f7.dialog.alert(result, "Message", () => {
        this.f7router.navigate(`/${this.currentUser.role}-main/`);
      });
    },
  },
};
</script>
