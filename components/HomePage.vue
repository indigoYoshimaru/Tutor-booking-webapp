<template>
  <f7-page>
    <f7-navbar>     
      <f7-nav-title>TUHUB</f7-nav-title>
      <f7-nav-right>
        <f7-button panel-open="right"
          ><span class="material-icons">menu</span></f7-button
        >
      </f7-nav-right>      
    </f7-navbar>
    <!-- Page content -->
    <f7-block>
      <p>Here comes MAIN view page text</p>
      
    </f7-block>
    <!-- Button to open popup -->
    <f7-button popup-open="#my-popup">Open Popup</f7-button>
    <f7-list>
      <f7-list-item link="/login/" title="Login"></f7-list-item>
      <f7-list-item link="/register/" title="Register"> </f7-list-item>
      <f7-list-item link="/about/" title="About"></f7-list-item>
    </f7-list>
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
