function setCred(cred) {
    localStorage.setItem('cred', JSON.stringify(cred));
}

function clearCred() {
    localStorage.removeItem('cred');
}

function getCred(roomId) {
    const str = localStorage.getItem('cred');
    const cred = str ? JSON.parse(str) : null;
    if (cred && (!roomId || cred.roomId === roomId)) {
        return cred;
    }
}

export const credApi = {setCred, getCred, clearCred};