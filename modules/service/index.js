import share from '../share'

let s = io();

async function getCurrentUserInfo() {

    if (share.gettingUserInfo)
        return;

    share.gettingUserInfo = true;

    let tutor, tutee = null;

    try {
        tutor = await getTutorInfo()
    } catch (exc) {

    }

    try {
        tutee = await getTuteeInfo()
    } catch (exc) {

    }

    share.currentUser = tutor || tutee;
    console.log('get current user info:', share.currentUser);

    if (share.currentUser) {
        initSocket(share.currentUser.token);
        await updateContractInfo(share.currentUser.role);
        await updateChatInfo(share.currentUser.role);
    }

    share.gettingUserInfo = false;
}

// await getCurrentUserInfo();

async function initSocket(token) {
    s = io();
    s.on('auth', console.log);
    s.on('error', console.log);
    s.on('server_chat_history', (id, messages) => {
        try {
            if (!share.currentUser.chatroomMap[id].initialized) {
                share.currentUser.chatroomMap[id].messages = messages;
                share.currentUser.chatroomMap[id].initialized = true;
            }
        } catch (exc) {

        }
    });
    s.on('server_message', (message) => {
        share.currentUser.chatroomMap[message.chatroomId].messages.push(message)
        // share.chatRoomInfo.messages.push(message); // error???
    });
    s.on('connect', () => {
        s.emit('client_token', token)
    });
}


async function getJson(route, params) {
    return await (await fetch(route, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })).json();

}

async function getTutors() {
    let response = await fetch('/api/general/get-tutors');
    let data = await response.json();
    if (data.error) {
        throw new Error(data.error);
    }
    return data.result;
}

async function getCourses() {
    let response = await fetch('/api/general/get-courses');
    let data = await response.json();
    if (data.error) {
        throw new Error(data.error);
    }
    return data.result;
}

async function registerTutor(tutor) {
    let response = await getJson('/api/tutor/register', tutor);
    console.log(response)

    if (response.error) {
        return response.error;
    }

    return "Your registration is successful." + response.result;
}

async function loginTutor(tutor) {
    let response = await getJson('/api/tutor/login', tutor);

    if (response.error) {
        return response.error;
    }

    return response.result.message;
}

async function loginTutee(tutee) {
    let response = await getJson('/api/tutee/login', tutee);

    if (response.error) {
        return response.error;
    }

    return response.result.message;
}

async function getTutorInfo() {
    let response = await fetch('/api/tutor/get-info');
    let data = await response.json();
    if (data.error) {
        throw new Error(data.error);
    }
    return data.result;
}

async function updateChatInfo(role) {
    let currentUser = share.currentUser;
    console.log(currentUser)
    let otherChatUsers = share.otherChatUsers;
    currentUser.chatroomMap = {};
    if (role == 'tutor') {
        for (let chatroom of currentUser.chatrooms) {
            chatroom.messages = [];
            currentUser.chatroomMap[chatroom.id] = chatroom;
            let user = await getTuteeNameById(chatroom.tuteeId);
            otherChatUsers[chatroom.tuteeId] = user;
        }
        return;
    }
    for (let chatroom of currentUser.chatrooms) {
        chatroom.messages = [];
        currentUser.chatroomMap[chatroom.id] = chatroom;
        let user = await getTutorNameById(chatroom.tutorId);
        otherChatUsers[chatroom.tutorId] = user;
        console.log(otherChatUsers[chatroom.tutorId]);
    }
    return

}

async function updateContractInfo(role) {
    let currentUser = share.currentUser;
    let otherContractUsers = share.otherContractUsers;
    currentUser.contractMap = {}
    if (role == 'tutor') {
        for (let contract of currentUser.contracts) {
            let user = await getTuteeNameById(contract.tuteeId);
            otherContractUsers[contract.tuteeId] = user;
            contract.tutor = share.currentUser;
            contract.tutee = share.otherContractUsers[contract.tuteeId];
            currentUser.contractMap[contract.id] = contract;
        }
        return;
    }
    for (let contract of currentUser.contracts) {
        let user = await getTutorNameById(contract.tutorId);
        otherContractUsers[contract.tutorId] = user;
        contract.tutee = share.currentUser;
        contract.tutor = share.otherContractUsers[contract.tutorId];
        currentUser.contractMap[contract.id] = contract;
    }
    return
}

async function getTuteeInfo() {
    let response = await fetch('/api/tutee/get-info');
    let data = await response.json();
    if (data.error) {
        throw new Error(data.error);
    }
    return data.result;
}


async function getTuteeNameById(tuteeId) {
    let response = await getJson('/api/general/get-tutee-name-by-id', { tuteeId });

    if (response.error) {
        return response.error;
    }

    return response.result;
}

async function getTutorNameById(tutorId) {
    let response = await getJson('/api/general/get-tutor-name-by-id', { tutorId });

    if (response.error) {
        return response.error;
    }

    return response.result;
}



async function sendMessage(chatroomId, message) {
    s.emit('client_message', chatroomId, message);
}

async function getChatHistory(id, refresh) {
    try {
        if (refresh)
            share.currentUser.chatroomMap[id].initialized = false;

        s.emit('client_chat_history', id);
    } catch (exc) {

    }
}


async function getIssueByContractId(contractId) {
    let response = await getJson('/api/general/get-issue-by-contract-id', { contractId });

    if (response.error) {
        return [];
    }

    return response.result;
}

async function getAdminNameById(adminId) {
    let response = await getJson('/api/general/get-admin-name-by-id', { adminId });

    if (response.error) {
        return response.error;
    }

    return response.result;

}

async function acceptContract(contractId) {
    let response = await getJson('/api/tutor/accept-contract', { contractId });

    if (response.error) {
        return response.error;
    }

    return response.result;
}


async function rejectContract(contractId) {
    let response = await getJson('/api/tutor/reject-contract', { contractId });

    if (response.error) {
        return response.error;
    }

    return response.result;
}

async function raiseIssue(isTutor, contractId, content) {
    let response;

    if (isTutor) {
        response = await getJson('/api/tutor/raise-issue', { contractId, content });
    }
    else {
        response = await getJson('/api/tutee/raise-issue', { contractId, content });
    }


    if (response.error) {
        return response.error;
    }

    return response.result;

}

async function requestCloseContract(isTutor, contractId) {
    let response;

    if (isTutor) {
        response = await getJson('/api/tutor/request-close-contract', { contractId });
        share.currentUser = await getTutorInfo();
    }
    else {
        response = await getJson('/api/tutee/request-close-contract', { contractId });
        share.currentUser = await getTuteeInfo();
    }


    if (response.error) {
        return response.error;
    }

    return response.result;
}

async function createContract(contractInfo) {
    let response = await getJson('/api/tutee/create-contract', contractInfo);

    if (response.error) {
        return response.error;
    }

    return response.result;
}

async function confirmIssueResolution(isTutor, issueId) {
    let response;
    if (isTutor) {
        response = await getJson('/api/tutor/confirm-issue-resolution', { issueId })
    }
    else {
        response = await getJson('/api/tutee/confirm-issue-resolution', { issueId })

    }

    if (response.error) {
        return response.error;
    }

    return response.result;

}

async function contactTutor(tutorId) {
    let response = await getJson('/api/tutee/contact-tutor', { tutorId });

    if (response.error) {
        throw new Error(response.error)
    }

    return response.result;

}


export default {
    getJson,
    getTutors,
    getCourses,
    registerTutor,
    loginTutor,
    loginTutee,
    getTutorInfo,
    getTuteeInfo,
    getTutorNameById,
    getTuteeNameById,

    getChatHistory,
    sendMessage,
    getIssueByContractId,
    getAdminNameById,
    acceptContract,
    rejectContract,
    requestCloseContract,
    raiseIssue,
    updateChatInfo,
    updateContractInfo,
    getCurrentUserInfo,
    createContract,
    confirmIssueResolution,
    contactTutor,

}