import { reactive } from 'vue'
export default reactive({
    theme: 'ios',
    loggedIn: false,    
    colors: {
        OPEN: "green",
        WAITING: "blue",        
        REJECTED: "red",
        RESOLVED: "black",
    },

    //issues: [],
    // temp for admin , update later
    unverifiedTutors: [],
    unverifiedTutor: {},

});