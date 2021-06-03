import { reactive } from 'vue'
export default reactive({
    theme: 'ios',
    loggedIn: false,
    currentUser: {},
    otherContractUsers: {},
    otherChatUsers: {},
    colors: {
        OPEN: "green",
        WAITING: "blue",
        CLOSED: "black",
        REJECTED: "red"
    }
});



