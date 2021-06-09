import { reactive } from 'vue'
export default reactive({
    theme: 'ios',
    loggedIn: false,
    currentUser: {},
    selectedTutor: {},
    newContract: {
        tutorId: "",
        teachingHours: "",
        listOfTeachingDay: []
    },
    otherContractUsers: [],
    otherChatUsers: [],
    colors: {
        OPEN: "green",
        WAITING: "blue",
        CLOSED: "black",
        REJECTED: "red"
    },
    chatRoomInfo: {
        id: {
            otherUser: {},
            messages: []
        }
    }, // including chatroom Id and tutee/tutor info

    issues: [],
});



