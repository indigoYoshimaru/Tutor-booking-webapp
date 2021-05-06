import HomePage from '/components/HomePage.vue'
import AboutPage from '/components/AboutPage.vue'
import LoginPage from '/components/LoginPage.vue'

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
  }
]