import HomePage from '/components/HomePage.vue'
import AboutPage from '/components/AboutPage.vue'
import LoginPage from '/components/LoginPage.vue'
import RegisterPage from '/components/RegisterPage.vue'
import Test from '/components/Tutee.vue'
import TestGetTutorList from '/components/TestGetTutorList.vue'
import RegisterTutorPage from '/components/RegisterTutorPage.vue'
import RegisterTuteePage from '/components/RegisterTuteePage.vue'
import TutorMainPage from '/components/TutorMainPage.vue'
import UnverifiedTutorPage from '/components/UnverifiedTutorPage.vue'
import AdminVerifyTutorPage from '/components/AdminVerifyTutorPage.vue'
import ChatPage from '/components/ChatPage.vue'
import TuteeMainPage from '/components/TuteeMainPage.vue'
import ContractPage from '/components/ContractPage.vue'
import CreateContractPage from '/components/CreateContractPage.vue'
import RaiseIssuePage from '/components/RaiseIssuePage.vue'

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
        path: '/register-tutor/',
        component: RegisterTutorPage,
    },
    {
        path: '/register-tutee/',
        component: RegisterTuteePage
    },
    {
        path: '/tutee/',
        component: Test,
    },
    {
        path: '/tutor-list/',
        component: TestGetTutorList,
    },
    {
        path: '/tutor-main/',
        component: TutorMainPage
    },

    {
        path: "/chat/:chatroomId/:otherUserId",
        component: ChatPage
    },
    {
        path: "/tutee-main/",
        component: TuteeMainPage
    },
    {
        path: "/contract/:contractId",
        component: ContractPage
    },
    {
        path: "/create-contract/:tutorId",
        component: CreateContractPage
    },
    {
        path: "/raise-issue/:contractId",
        component: RaiseIssuePage
    },

]