import db from './firebase';
import {ACTIONS, EXPANSION, OP_STATUS, STATUS, TEAM} from "./enum";
import {
    assignRoles,
    getDefectorActions,
    getDefectorTurns,
    makeDefectorSwap,
    ROLE_ACTION, ROLES,
    roleTraits
} from "../domain/roles";
import {
    calcMissionStatus,
    calcVotesMajority,
    createMission, getNextMissionAction,
    getScore,
    participantsCount
} from "../domain/missions";
import {bots} from "../domain/bots";

function error(msg, code) {
    const err = Error(msg);
    err.code = code;
    return err;
}

async function create(login, prefSide) {
    const secret = makeSecret();
    const ref = await db.collection('rooms').add(
        {
            members: [
                {login, host: true, secret, prefSide}
            ],
            status: STATUS.NEW
        }
    );
    return {
        roomId: ref.id, secret, login
    };
}

async function join(id, login, prefSide) {
    const roomRef = db.collection('rooms').doc(id);
    const secret = makeSecret();
    await db.runTransaction(async transaction => {
        const roomDoc = await transaction.get(roomRef);
        if (!roomDoc.exists) {
            throw error("Room not found", 'room');
        }
        const room = roomDoc.data();
        if (room.members.some(m => m.login === login)) {
            throw error("Login is in use", 'login');
        }
        if (room.status !== STATUS.NEW) {
            throw error("The game has been started", 'room');
        }
        transaction.update(roomRef, {...room, members: [...room.members, {login, secret, prefSide}]});
    });
    return {
        roomId: id, login, secret
    };
}

async function addBot(roomId) {
    const roomRef = db.collection('rooms').doc(roomId);
    await db.runTransaction(async transaction => {
        const roomDoc = await transaction.get(roomRef);
        const room = roomDoc.data();
        if (room.status === STATUS.NEW && room.members.length < 11) {
            const bot = bots.createBot();
            transaction.update(roomRef, {...room, members: [...room.members, bot]});
        }
    });
}

async function login(cred) {
    const {roomId, login, secret} = cred;
    const roomRef = db.collection('rooms').doc(roomId);
    const room = await roomRef.get();
    if (room.exists) {
        const user = room.get('members').find(m => m.login === login && m.secret === secret);
        if (user) {
            return true;
        } else {
            return Promise.reject(Error('Invalid credentials'))
        }
    } else {
        return Promise.reject(Error('Room not found'))
    }
}

async function start(roomId) {
    const roomRef = db.collection('rooms').doc(roomId);
    await db.runTransaction(async transaction => {
        const roomDoc = await transaction.get(roomRef);
        const room = roomDoc.data();
        const {members, roles, type} = room;
        const numPlayers = members.length;
        if (numPlayers < 5 || numPlayers > 11) {
            throw new Error("Number of players should be between 5 and 11");
        }
        if (room.status === STATUS.NEW && room.type) {
            const membersRoles = assignRoles(members.map(m => m.prefSide), roles, type);
            const newMembers = members.map((m, i) => ({
                ...m,
                role: membersRoles[i],
                originalRole: membersRoles[i],
                num: i
            }));
            const defectorTurns = getDefectorTurns(newMembers);
            const mission = createMission(null, newMembers);
            const newRoom = {
                ...room,
                members: newMembers,
                status: STATUS.STARTED,
                missions: [mission],
                defectorTurns,
                score: {[TEAM.BAD]: 0, [TEAM.GOOD]: 0}
            };
            transaction.update(roomRef, newRoom);
        }
    });
}

async function end(roomId) {
    const roomRef = db.collection('rooms').doc(roomId);
    await db.runTransaction(async transaction => {
        const roomDoc = await transaction.get(roomRef);
        const room = roomDoc.data();
        transaction.update(roomRef, {...room, status: STATUS.FINISHED});
    })
}

async function kick(login, roomId) {
    const roomRef = db.collection('rooms').doc(roomId);
    await db.runTransaction(async transaction => {
        const roomDoc = await transaction.get(roomRef);
        const room = roomDoc.data();
        if (room.status === STATUS.NEW) {
            const kicked = room.members.find(m => m.login === login);
            if (kicked) {
                const newMembers = room.members.filter(m => m.login !== login);
                if (kicked.host && newMembers.length) {
                    newMembers[0].host = true;
                }
                transaction.update(roomRef, {...room, members: newMembers});
            }
        }
    })
}

async function setRoles(roomId, roles, type) {
    const roomRef = db.collection('rooms').doc(roomId);
    await db.runTransaction(async transaction => {
        const roomDoc = await transaction.get(roomRef);
        const room = roomDoc.data();
        if (room.status === STATUS.NEW) {
            return transaction.update(roomRef, {...room, roles, type});
        }
    });
}

async function updateCurrentMission(roomId, mutator) {
    const roomRef = db.collection('rooms').doc(roomId);
    await db.runTransaction(async transaction => {
        const roomDoc = await transaction.get(roomRef);
        const room = roomDoc.data();
        if (room.status === STATUS.STARTED) {
            const mission = mutator(room.missions[room.missions.length - 1], room);
            transaction.update(roomRef, {
                ...room, missions: replaceLastMission(room.missions, mission)
            });
        }
    });
}

async function proposeTeam(roomId, participants, investigator = null) {
    await updateCurrentMission(roomId, (mission, room) => {
        const numParticipants = participantsCount[room.members.length][mission.num];
        if (numParticipants === participants.length) {
            return {...mission, status: OP_STATUS.VOTE, participants, investigator}
        } else {
            return mission;
        }
    })
}

async function voteTeam(roomId, playerNum, resolution) {
    await updateCurrentMission(roomId, (mission, room) => {
        if (!mission.vote[playerNum]) {
            let newVote = {...mission.vote, [playerNum]: resolution};
            if (room.members[playerNum].host) {
                newVote = bots.vote(room.members, newVote, resolution);
            }
            const result = calcVotesMajority(newVote, room.members.length);
            if (result) {
                return {...mission, status: result, vote: newVote, nextAction: result === OP_STATUS.REJECTED ? ACTIONS.NEXT_MISSION : null}
            } else {
                return {...mission, vote: newVote}
            }
        } else {
            return mission;
        }
    })
}

function makeSecret() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '');
}

function listenRoom(id, cb) {
    return db.collection('rooms').doc(id).onSnapshot(cb);
}

async function nextMission(roomId) {
    const roomRef = db.collection('rooms').doc(roomId);
    await db.runTransaction(async transaction => {
        const roomDoc = await transaction.get(roomRef);
        const room = roomDoc.data();
        if (room.status === STATUS.STARTED) {
            const score = getScore(room.missions);
            if (score[TEAM.GOOD] >= 3 || score[TEAM.BAD] >= 3) {
                transaction.update(roomRef, {
                    ...room,
                    score,
                    won: score[TEAM.GOOD] >= 3 ? TEAM.GOOD : TEAM.BAD,
                    status: STATUS.FINISHED
                });
                return;
            }
            const lastMission = room.missions[room.missions.length - 1];
            let members = room.members;
            if (lastMission.status !== OP_STATUS.REJECTED && room.defectorTurns.includes(lastMission.num + 1)) {
                members = makeDefectorSwap(members);
            }
            const mission = createMission(lastMission, members);
            transaction.update(roomRef, {...room, members, missions: [...room.missions, mission]});
        }
    });
}

async function performMission(roomId, userNum, resolution) {
    const roomRef = db.collection('rooms').doc(roomId);
    await db.runTransaction(async transaction => {
        const roomDoc = await transaction.get(roomRef);
        const room = roomDoc.data();
        if (room.status === STATUS.STARTED) {
            const mission = room.missions[room.missions.length - 1];
            const {perform = {}} = mission;
            perform[userNum] = resolution;
            const newMission = {...mission, ...calcMissionStatus(perform, room.members.length, mission.num)};
            const newMissions = replaceLastMission(room.missions, newMission);
            const score = getScore(newMissions);
            if(newMission.status === OP_STATUS.INVESTIGATION){
                newMission.nextAction = getNextMissionAction(null, newMission.result, score, room.type);
            }
            transaction.update(roomRef, {...room, score, missions: newMissions});
        }
    });
}

async function investigatorAction(roomId) {
    await updateCurrentMission(roomId, (mission, room) => {
        if(mission.nextAction === ACTIONS.INVESTIGATOR || mission.nextAction === ACTIONS.LEADER_INVESTIGATION){
            return {...mission, nextAction: ACTIONS.NEXT_MISSION};
        }else{
            return mission;
        }
    });
}

async function assassinAction(roomId, login) {
    const roomRef = db.collection('rooms').doc(roomId);
    await db.runTransaction(async transaction => {
        const roomDoc = await transaction.get(roomRef);
        const room = roomDoc.data();
        if (room.status === STATUS.STARTED) {
            const newMembers = room.members.map(m => {
                if (m.role === ROLES.ASSASSIN) {
                    return {...m, outed: true}
                } else {
                    return m;
                }
            });
            const lastMission = {...room.missions[room.missions.length - 1], nextAction: ACTIONS.NEXT_MISSION};
            const newMissions = replaceLastMission(room.missions, lastMission);
            const target = room.members.find(m => m.login === login);
            if (target.role === ROLES.COMMANDER) {
                transaction.update(roomRef, {
                    ...room,
                    status: STATUS.FINISHED,
                    won: TEAM.BAD,
                    members: newMembers,
                    missions: newMissions,
                    assassinSuccess: true
                });
            } else {
                transaction.update(roomRef, {...room, members: newMembers, missions: newMissions})
            }
        }
    });
}

async function deepAgentAction(roomId, login) {
    const roomRef = db.collection('rooms').doc(roomId);
    await db.runTransaction(async transaction => {
        const roomDoc = await transaction.get(roomRef);
        const room = roomDoc.data();
        const lastMission = room.missions[room.missions.length - 1];
        if (room.status === STATUS.STARTED && lastMission.status === OP_STATUS.PREPARE) {
            const target = room.members.find(m => m.login === login);
            const success = target.role === ROLES.PRETENDER;
            const newMembers = room.members.map(m => {
                if (m.role === ROLES.DEEP_AGENT) {
                    return {...m, outed: true, role: success ? ROLES.PRETENDER : ROLES.DEEP_AGENT}
                } else if (success && m.role === ROLES.PRETENDER) {
                    return {...m, outed: true, role: ROLES.DEEP_AGENT};
                } else {
                    return m;
                }
            });
            transaction.update(roomRef, {...room, members: newMembers})
        }
    });
}

async function hunterAction(roomId, login) {
    const roomRef = db.collection('rooms').doc(roomId);
    await db.runTransaction(async transaction => {
        const roomDoc = await transaction.get(roomRef);
        const room = roomDoc.data();
        const mission = room.missions[room.missions.length - 1];
        if (room.status === STATUS.STARTED && !room.won) {
            const target = room.members.find(m => m.login === login);
            if (target.role === ROLES.SPY_CHIEF) {
                transaction.update(roomRef, {...room, won: TEAM.GOOD, status: STATUS.FINISHED});
            } else {
                const newMembers = room.members.map(m => m.role === ROLES.HUNTER ? {...m, outed: true} : m);
                const newMission = {...mission, result: OP_STATUS.FAIL};
                const newMissions = replaceLastMission(room.missions, newMission);
                const score = getScore(newMissions);
                newMission.nextAction = getNextMissionAction(mission.nextAction, newMission.result, score, room.type);
                transaction.update(roomRef, {...room, members: newMembers, missions: newMissions, score});
            }
        }
    });
}

async function spyHunterAction(roomId, login) {
    const roomRef = db.collection('rooms').doc(roomId);
    await db.runTransaction(async transaction => {
        const roomDoc = await transaction.get(roomRef);
        const room = roomDoc.data();
        const mission = room.missions[room.missions.length - 1];
        if (room.status === STATUS.STARTED && !room.won) {
            const target = room.members.find(m => m.login === login);
            if (target.role === ROLES.CHIEF || target.role === ROLES.COORDINATOR) {
                transaction.update(roomRef, {...room, won: TEAM.BAD, status: STATUS.FINISHED});
            } else {
                const newMembers = room.members.map(m => m.role === ROLES.SPY_HUNTER ? {...m, outed: true} : m);
                const newMission = {...mission, result: OP_STATUS.SUCCESS};
                const newMissions = replaceLastMission(room.missions, newMission);
                const score = getScore(newMissions);
                newMission.nextAction = getNextMissionAction(mission.nextAction, newMission.result, score, room.type);
                transaction.update(roomRef, {...room, members: newMembers, missions: newMissions, score});
            }
        }
    });
}

function replaceLastMission(missions, lastMission) {
    return [...missions.slice(0, missions.length - 1), lastMission];
}

async function reorder(roomId, from, to) {
    const roomRef = db.collection('rooms').doc(roomId);
    await db.runTransaction(async transaction => {
        const roomDoc = await transaction.get(roomRef);
        const room = roomDoc.data();
        if(room.status === STATUS.NEW){
            const movedMember = room.members[from];
            const newMembers = [...room.members];
            newMembers.splice(to, 0, newMembers.splice(from, 1)[0]);
            console.log(newMembers);
            transaction.update(roomRef, {...room, members: newMembers});
        }
    });
}

export const gameApi = {
    create,
    join,
    listenRoom,
    login,
    start,
    end,
    kick,
    setRoles,
    nextMission,
    addBot,
    proposeTeam,
    voteTeam,
    performMission,
    assassinAction,
    deepAgentAction,
    hunterAction,
    spyHunterAction,
    investigatorAction,
    reorder
};