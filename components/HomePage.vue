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
    <!-- Page content -->

    <video autoplay muted loop id="background-vid">
      <source
        src="images/Don't Feed The Kois twice a course.mp4"
        type="video/mp4"
      />
    </video>
    <f7-block-title>ABOUT US</f7-block-title>
    <f7-block>Write something about us</f7-block>
    <f7-block class="grid-homepage">
      <f7-row>
        <f7-col width="33">
          <f7-block-title style="color: rgb(255, 212, 61); font-size: 30px"
            >Over 1000 tutees</f7-block-title
          >
          using our tutoring platform everyday
        </f7-col>
        <f7-col width="33">
          <f7-block-title style="color: rgb(255, 212, 61); font-size: 30px"
            >Over 500 tutors</f7-block-title
          >teaching at their best</f7-col
        >
        <f7-col width="33">
          <f7-block-title style="color: rgb(255, 212, 61); font-size: 30px"
            >Over 90% tutee</f7-block-title
          >
          report to have their marks improved by using TUHUB
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-block-title>JOIN US</f7-block-title>
    <!-- Button to open popup -->
    <!-- <f7-button popup-open="#my-popup">Open Popup</f7-button> -->
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
