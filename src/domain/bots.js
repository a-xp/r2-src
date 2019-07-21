import Sentencer from 'sentencer';
import {MISSION_OPT, TEAM, VOTE} from "../api/enum";
import {participantsCount} from "./missions";
import {roleTraits} from "./roles";

function vote(mebers, votes, resolution = VOTE.YES) {
    const result = {...votes};
    mebers.forEach( (m,i) => {
        if(m.bot && !result[i]){
            result[i] = resolution;
        }
    });
    return result;
}

function createBot() {
    const login = Sentencer.make('{{adjective}} {{noun}}');
    return {
        login: login[0].toUpperCase()+login.slice(1),
        prefSide: TEAM.RANDOM,
        bot: true
    }
}

function doMission(members, votes) {
    const result = {...votes};
    members.forEach( (m,i) => {
        if(m.bot && !result[i]){
            result[i] = roleTraits[m.role].side === TEAM.GOOD ? MISSION_OPT.SUCCESS : MISSION_OPT.FAIL;
        }
    });
    return result;
}

function proposeTeam(members, leader, missionNumber) {
    const participants = [];
    for(let i = 0;i<participantsCount[members.length][missionNumber];i++){
        let playerNum = leader + i;
        if(playerNum>=members.length){
            playerNum-=members.length;
        }
        participants.push(playerNum);
    }
    return participants;
}

export const bots = {vote, createBot, doMission, proposeTeam};