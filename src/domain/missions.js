import {ACTIONS, EXPANSION, MISSION_OPT, OP_RESULT, OP_STATUS, TEAM, VOTE} from "../api/enum";
import Sentencer from "sentencer";

export const participantsCount = {
    5: [2, 3, 2, 3, 3],
    6: [2, 3, 4, 3, 4],
    7: [2, 3, 3, 4, 4],
    8: [3, 4, 4, 5, 5],
    9: [3, 4, 4, 5, 5],
    10: [3, 4, 4, 5, 5],
    11: [3, 4, 4, 6, 5]
};

export function getScore(missions) {
    return missions.reduce((r, m) => {
        if (m.result === OP_RESULT.FAIL) return {...r, [TEAM.BAD]: 1 + r[TEAM.BAD]};
        if (m.result === OP_RESULT.SUCCESS) return {...r, [TEAM.GOOD]: 1 + r[TEAM.GOOD]};
        return r;
    }, {[TEAM.GOOD]: 0, [TEAM.BAD]: 0});
}

export function getNextLeader(lastId, numPlayers) {
    return lastId < numPlayers - 1 ? lastId + 1 : 0;
}

export function createMission(prev, members) {
    const num = prev ? (prev.status === OP_STATUS.REJECTED ? prev.num : prev.num + 1) : 0;
    const leader = prev ? getNextLeader(prev.leader, members.length) : Math.floor(Math.random() * members.length);
    const participants = []; //members[leader].bot ? bots.proposeTeam(members, leader, num) : [];
    const status = OP_STATUS.PREPARE; //members[leader].bot ? OP_STATUS.VOTE : OP_STATUS.PREPARE;

    return {num, leader, participants, vote: [], status, name: Sentencer.make('{{adjective}} {{noun}}')};
}

export function calcVotesMajority(votes, roomSize) {
    const summary = Object.values(votes).reduce((r, vote) => ({...r, [vote]: 1 + r[vote]}), {
        [VOTE.YES]: 0,
        [VOTE.NO]: 0
    });
    if (summary[VOTE.YES] + summary[VOTE.NO] === roomSize) {
        return summary[VOTE.YES] > summary[VOTE.NO] ? OP_STATUS.PROGRESS : OP_STATUS.REJECTED;
    } else {
        return false;
    }
}

function calcMissionVotes(votes, roomSize, missionNum) {
    const values = Object.values(votes);
    if (participantsCount[roomSize][missionNum] === values.length) {
        return values.reduce((r, v) => ({...r, [v]: 1 + (r[v] || 0)}), {});
    }
    return false;
}

export function missionFailRequirement(roomSize, missionNum) {
    return roomSize >= 7 && missionNum === 3 ? 2 : 1;
}

export function calcMissionStatus(perform, roomSize, missionNum) {
    const summary = calcMissionVotes(perform, roomSize, missionNum);
    if (summary) {
        const {[MISSION_OPT.FAIL]: fail = 0, [MISSION_OPT.CHIEF_FAIL]: chiefFail = 0, [MISSION_OPT.REVERSE]: reverse = 0} = summary;
        let result = fail + chiefFail >= missionFailRequirement(roomSize, missionNum) ? OP_RESULT.FAIL : OP_RESULT.SUCCESS;
        if (reverse === 1) result = result === OP_RESULT.FAIL ? OP_RESULT.SUCCESS : OP_RESULT.FAIL;
        return {perform, summary, status: OP_STATUS.INVESTIGATION, result}
    }
    return {perform};
}

export function getNextMissionAction(action, result, score, type) {
    if (type === EXPANSION.ASSASSIN) {
        if (score[TEAM.GOOD] >= 3) {
            return ACTIONS.ASSASSIN;
        }
    }
    if (type === EXPANSION.HUNTER) {
        if (score[TEAM.GOOD] >= 3) {
            return ACTIONS.HUNTER;
        }
        if (score[TEAM.BAD] >= 3) {
            return ACTIONS.SPY_HUNTER;
        }
        if (!action) {
            if (result === OP_RESULT.FAIL) {
                return ACTIONS.INVESTIGATOR;
            }
            if (result === OP_RESULT.SUCCESS) {
                return ACTIONS.LEADER_INVESTIGATION;
            }
        }
    }
    return ACTIONS.NEXT_MISSION;
}