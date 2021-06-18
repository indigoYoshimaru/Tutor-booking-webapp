import { reactive } from 'vue'
export default reactive({
    theme: 'ios',
    loggedIn: false,
    colors: {
        OPEN: "green",
        WAITING: "blue",
        CLOSED: "black",
        REJECTED: "red"
    },

    issues: [],
    // temp for admin , update later
    unverifiedTutors: [],
    unverifiedTutor: {},

});