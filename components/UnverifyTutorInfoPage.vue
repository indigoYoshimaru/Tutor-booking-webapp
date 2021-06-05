<template>
  <f7-page>
    <f7-navbar title="Page name"></f7-navbar>
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
};
</script>
