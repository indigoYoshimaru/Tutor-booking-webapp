<template>
  <f7-page>
    <f7-navbar title="Awesome App"></f7-navbar>
    <!-- Page content -->
    <f7-block>
      <p>Here comes main view page text</p>
    </f7-block>
    <!-- Buttons to open panels -->
    <f7-row>
      <f7-col>
        <f7-button panel-open="left">Left Panel</f7-button>
      </f7-col>
      <f7-col>
        <f7-button panel-open="right">Right Panel</f7-button>
      </f7-col>
    </f7-row>
    <!-- Button to open popup -->
    <f7-button popup-open="#my-popup">Open Popup</f7-button>
    <f7-link href="/about/">About</f7-link>
  </f7-page>
</template>

<script>
import share from "/modules/share";
import f7components from "/components/f7components";

export default {
  components: {
    ...f7components,
  },
};
</script>
