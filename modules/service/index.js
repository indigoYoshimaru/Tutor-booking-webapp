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

async function getTuteeInfo() {
    let response = await fetch('/api/tutee/get-info');
    let data = await response.json();
    if (data.error) {
        throw new Error(data.error);
    }
    return data.result;
}


export default {
    getJson,
    getTutors,
    getCourses,
    registerTutor,
    loginTutor,
    loginTutee,
    getTutorInfo,
    getTuteeInfo
}