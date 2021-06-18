import HomePage from '/components/admin/HomePage.vue'
import AboutPage from '/components/admin/AboutPage.vue'
import LoginPage from '/components/admin/LoginPage.vue'
import UnverifiedTutorsPage from '/components/admin/UnverifiedTutorsPage.vue'
import VerifyTutorPage from '/components/admin/VerifyTutorPage.vue'

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
        path: "/get-unverified-tutor/",
        component: UnverifiedTutorsPage
    },
    {
        path: "/verify-tutor/:unverifiedTutorId/",
        component: VerifyTutorPage
    },
]