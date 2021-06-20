import share from '../share'

async function getJson(route, params) {
    return await (await fetch(route, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })).json();

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
async function getUnverifiedTutorById(unverifiedTutorId) {
    let response = await getJson('/api/general/get-unverified-tutor-by-id', { unverifiedTutorId });

    if (response.error) {
        throw new Error(response.error)
    }

    return response.result;
}

async function loginAdmin(admin) {
    let response = await getJson('/api/admin/login', admin);

    if (response.error) {
        return response.error;
    }

    return response.result.message;

}

async function getAdminInfo() {
    share.currentUser = null;
    let response = await fetch('/api/admin/get-info');
    let data = await response.json();
    if (data.error) {
        throw new Error(data.error);
    }    
    share.currentUser = data.result;
}

async function createIssueResolution(resolution){
    let response = await getJson('/api/admin/create-issue-resolution', resolution);

    if (response.error) {
        return response.error;
    }

    return response.result;
}

async function getTuteeNameByContractId(contractId){    
    let contract = await getJson('/api/general/get-contract-by-id', contractId);
    let response = await getJson('/api/general/get-tutee-name-by-id', contract.tuteeId);

    if (response.error) {
        throw new Error(response.error)
    }

    return response.result;
}
async function getTutorNameByContractId(contractId){    
    let contract = await getJson('/api/general/get-contract-by-id', contractId);
    let response = await getJson('/api/general/get-tutee-name-by-id', contract.tutorId);

    if (response.error) {
        throw new Error(response.error)
    }

    return response.result;
}


export default {
    getJson,
    getUnverifiedTutors,
    verifyTutor,
    getUnverifiedTutorById,
    loginAdmin,
    getAdminInfo,
    createIssueResolution,
    getTuteeNameByContractId,
    getTutorNameByContractId
}