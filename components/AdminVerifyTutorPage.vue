<template>
  <f7-page>
    <f7-navbar title="Verify Tutor">
      <f7-nav-right :sliding="true">
        <f7-button panel-open="right"
          ><f7-icon ios="f7:square_list_fill"></f7-icon
        ></f7-button>
      </f7-nav-right>
    </f7-navbar>
  </f7-page>
</template>

<script>
import share from "/modules/share";
import { f7 } from "framework7-vue";
import f7components from "/components/f7components";
import service from "/modules/service";

let tutors = await service.getUnverifiedTutors();

export default {
  components: {
    ...f7components,
  },
  data() {
    return {
      tutors: tutors,
    };
  },
};
</script>
