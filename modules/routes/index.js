import HomePage from '/components/HomePage.vue'
import AboutPage from '/components/AboutPage.vue'
import LoginPage from '/components/LoginPage.vue'
import RegisterPage from '/components/RegisterPage.vue'

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
  }
]