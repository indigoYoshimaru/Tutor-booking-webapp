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

export default {
    getJson,
    getTutors
}