import HomePage from '/components/admin/HomePage.vue'
import AboutPage from '/components/admin/AboutPage.vue'
import LoginPage from '/components/admin/LoginPage.vue'
import UnverifiedTutorsPage from '/components/admin/UnverifiedTutorsPage.vue'
import VerifyTutorPage from '/components/admin/VerifyTutorPage.vue'
import IssueResolutionPage from '/components/admin/IssueResolutionPage.vue'
import IssueListPage from '/components/admin/IssueListPage.vue'

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
    {
        path: "/resolve-issue/:issueId",
        component: IssueResolutionPage
    },
    {
        path: "/issue-list/",
        component: IssueListPage
    },
    
]