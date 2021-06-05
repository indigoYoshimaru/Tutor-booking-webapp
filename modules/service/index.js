import share from '../share'

let s;



async function initSocket(token) {
    s = io();
    s.on('auth', console.log);
    s.on('error', console.log);
    s.on('server_message', (message) => {
        share.chatRoomInfo.messages.push(message); // error???
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
    initSocket(response.result.token);

    return response.result.message;
}

async function registerTutee(tutee) {
    let response = await getJson('/api/tutee/register', tutee);
    console.log(response)
    if (response.error) {
        return response.error;
    }

    return "Your registration is successful." + response.result;
}

async function loginTutee(tutee) {
    let response = await getJson('/api/tutee/login', tutee);

    if (response.error) {
        return response.error;
    }
    initSocket(response.result.token);
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

async function getUnverifiedTutors() {
    let response = await fetch('/api/general/get-unverified-tutor');
    let data = await response.json();
    if (data.error) {
        throw new Error(data.error);
    }
    return data.result;
}

async function verifyTutor(tutorId) {
    let response = await getJson('/api/admin/verify-tutor-registration', { tutorId });

    if (response.error) {
        return response.error;
    }

    return response.result;
}

async function chat(chatroomId, message) {
    s.emit('client_message', chatroomId, message);
}

async function getChatHistory(chatroomId) {
    s.emit('client_chat_history', chatroomId)
}


export default {
    getJson,
    getTutors,
    getCourses,
    registerTutor,
    registerTutee,
    loginTutor,
    loginTutee,
    getTutorInfo,
    getTuteeInfo,
    getTutorNameById,
    getTuteeNameById,
    getUnverifiedTutors,
    verifyTutor,
    getChatHistory,
    chat,
}