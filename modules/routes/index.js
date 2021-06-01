import HomePage from '/components/HomePage.vue'
import AboutPage from '/components/AboutPage.vue'
import LoginPage from '/components/LoginPage.vue'
import RegisterPage from '/components/RegisterPage.vue'
import Test from '/components/Tutee.vue'
import TestGetTutorList from '/components/TestGetTutorList.vue'
import RegisterTutorPage from '/components/RegisterTutorPage.vue'
import RegisterTuteePage from '/components/RegisterTuteePage.vue'

export default [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/login/',
    component: LoginPage,
  },
  {
    path: '/register/',
    component: RegisterPage,
  },
  {
    path: '/register-tutor',
    component: RegisterTutorPage,
  },
  {
    path: '/register-tutee',
    component: RegisterTuteePage,
  },
  {
    path: '/tutee/',
    component: Test,
  },
  {
    path: '/tutor-list/',
    component: TestGetTutorList,
  }
]