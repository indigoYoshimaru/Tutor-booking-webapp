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

    <video style="width: 100%; height: auto; object-fit: cover" autoplay loop>
      <source
        src="media/Don't Feed The Kois twice a course.mp4"
        type="video/mp4"
      />
    </video>
    <f7-block-title>ABOUT US</f7-block-title>

    <f7-row>
      <f7-col>
        <div style="margin: 0 0% 0 20%">
          <f7-card expandable :padding="false">
            <f7-card-content :padding="false">
              <div class="bg-color-deeppurple" :style="{ height: '300px' }">
                <f7-card-header text-color="white" class="display-block">
                  Over 1000 tutees
                  <small :style="{ opacity: 0.7 }"
                    >using our tutoring platform everyday</small
                  >
                </f7-card-header>
                <f7-link
                  card-close
                  color="white"
                  class="card-opened-fade-in"
                  :style="{
                    position: 'absolute',
                    right: '0%',
                    top: '0%',
                  }"
                  icon-f7="xmark_circle_fill"
                ></f7-link>
              </div>
              <div class="card-content-padding">write something here</div>
            </f7-card-content>
          </f7-card>
        </div>
      </f7-col>

      <f7-col>
        <div style="margin: 0 20% 0 0%">
          <f7-card expandable :padding="false">
            <f7-card-content :padding="false">
              <div class="bg-color-purple" :style="{ height: '300px' }">
                <f7-card-header text-color="white" class="display-block">
                  Over 500 tutors
                  <small :style="{ opacity: 0.7 }">working at their best</small>
                </f7-card-header>
                <f7-link
                  card-close
                  color="white"
                  class="card-opened-fade-in"
                  :style="{ position: 'absolute', top: '0%', right: '0%' }"
                  icon-f7="xmark_circle_fill"
                ></f7-link>
              </div>
              <div class="card-content-padding">
                <p>
                  Framework7 - is a free and open source HTML mobile framework
                  to develop hybrid mobile apps or web apps with iOS or Android
                  (Material) native look and feel. It is also an indispensable
                  prototyping apps tool to show working app prototype as soon as
                  possible in case you need to. Framework7 is created by
                  Vladimir Kharlampidi (iDangero.us).
                </p>
              </div>
            </f7-card-content>
          </f7-card>
        </div>
      </f7-col>
    </f7-row>

    <f7-row>
      <f7-col>
        <div style="margin: 0 0% 0 20%">
          <f7-card expandable :padding="false">
            <f7-card-content :padding="false">
              <div class="bg-color-teal" :style="{ height: '300px' }">
                <f7-card-header
                  text-color="white"
                  class="display-block"
                  style="position: 'absolute'"
                >
                  Over 90% tutee
                  <small :style="{ opacity: 0.7 }"
                    >reporting to have their marks improved by using
                    TUHUB</small
                  >
                </f7-card-header>
                <f7-link
                  card-close
                  color="white"
                  class="card-opened-fade-in"
                  :style="{ position: 'absolute', top: '0%', right: '0%' }"
                  icon-f7="xmark_circle_fill"
                ></f7-link>
              </div>
              <div class="card-content-padding">
                <p>
                  Framework7 - is a free and open source HTML mobile framework
                  to develop hybrid mobile apps or web apps with iOS or Android
                  (Material) native look and feel. It is also an indispensable
                  prototyping apps tool to show working app prototype as soon as
                  possible in case you need to. Framework7 is created by
                  Vladimir Kharlampidi (iDangero.us).
                </p>
              </div>
            </f7-card-content>
          </f7-card>
        </div>
      </f7-col>

      <f7-col>
        <div style="margin: 0 20% 0 0%">
          <f7-card expandable :padding="false">
            <f7-card-content :padding="false">
              <div class="bg-color-red" :style="{ height: '300px' }">
                <f7-card-header text-color="white" class="display-block">
                  And importantly
                  <small :style="{ opacity: 0.7 }"
                    >We are non-profit organization. 100% of payment will be
                    delivered to tutors.</small
                  >
                </f7-card-header>
                <f7-link
                  card-close
                  color="white"
                  class="card-opened-fade-in"
                  :style="{ position: 'absolute', top: '0%', right: '0%' }"
                  icon-f7="xmark_circle_fill"
                ></f7-link>
              </div>
              <div class="card-content-padding">
                <p>
                  We are non-profit organization. 100% of payment will be
                  delivered to tutors.
                </p>
              </div>
            </f7-card-content>
          </f7-card>
        </div>
      </f7-col>
    </f7-row>

    <f7-block-title>JOIN US</f7-block-title>
    <f7-row>
      <f7-col>
        <button class="col button button-large button-raised button-fill">
          Want to pass without pain?
        </button>
      </f7-col>

      <f7-col>
        <button class="col button button-large button-raised button-fill">
          Be part of our talented team
        </button>
      </f7-col>
    </f7-row>
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
