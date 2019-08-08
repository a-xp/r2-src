import {appColors, EXPANSION, LOAYLTY, MISSION_OPT, TEAM} from "../api/enum";
import {TEXTS} from "@/domain/texts";

export const ROLES = {
    RESISTANCE: 'RESISTANCE',
    SPY: 'SPY',
    BODY_GUARD: 'BODY_GUARD',
    COMMANDER: 'COMMANDER',
    FALSE_COMMANDER: 'FALSE_COMMANDER',
    ASSASSIN: 'ASSASSIN',
    UNKNOWN: 'UNKNOWN',
    SPY_DEFECTOR: 'SPY_DEFECTOR',
    DEFECTOR: 'DEFECTOR',
    DEEP_COVER_SPY: 'DEEP_COVER_SPY',
    BLIND_SPY: 'BLIND_SPY',
    REVERSER: 'REVERSER',
    SPY_REVERSER: 'SPY_REVERSER',
    CHIEF: 'CHIEF',
    SPY_CHIEF: 'SPY_CHIEF',
    HUNTER: 'HUNTER',
    SPY_HUNTER: 'SPY_HUNTER',
    DUMMY_AGENT: 'DUMMY_AGENT',
    COORDINATOR: 'COORDINATOR',
    DEEP_AGENT: 'DEEP_AGENT',
    PRETENDER: 'PRETENDER'
};

export const ROLE_ACTION = {
    DEFECTOR: 'DEFECTOR',
    ASSASSIN: 'ASSASSIN',
    BLAME: 'BLAME',
    HUNTER: 'HUNTER'
};

export const roleTraits = {
    [ROLES.ASSASSIN]: {
        id: ROLES.ASSASSIN,
        side: TEAM.BAD,
        title: 'Assassin',
        info: 'Should name the Commander',
        core: true,
        description: TEXTS.assassinText,
        module: EXPANSION.ASSASSIN
    },
    [ROLES.FALSE_COMMANDER]: {
        id: ROLES.FALSE_COMMANDER,
        side: TEAM.BAD,
        title: 'False Commander',
        info: 'Appears as Commander',
        description: TEXTS.falseCommanderText,
        module: EXPANSION.ASSASSIN
    },
    [ROLES.SPY]: {id: ROLES.SPY, side: TEAM.BAD, title: 'Government spy', base: true, description: TEXTS.spyText},
    [ROLES.COMMANDER]: {
        id: ROLES.COMMANDER,
        side: TEAM.GOOD,
        title: 'Commander',
        core: true,
        info: 'Knows spies',
        description: TEXTS.commanderText,
        module: EXPANSION.ASSASSIN
    },
    [ROLES.BODY_GUARD]: {
        id: ROLES.BODY_GUARD,
        side: TEAM.GOOD,
        title: 'Bodyguard',
        info: 'Knows commanders',
        description: TEXTS.bodyguardText,
        module: EXPANSION.ASSASSIN
    },
    [ROLES.RESISTANCE]: {
        id: ROLES.RESISTANCE,
        side: TEAM.GOOD,
        title: 'Resistance',
        base: true,
        description: TEXTS.resistanceText
    },
    [ROLES.UNKNOWN]: {id: ROLES.UNKNOWN},
    [ROLES.SPY_DEFECTOR]: {
        id: ROLES.SPY_DEFECTOR,
        side: TEAM.BAD,
        title: 'Spy Defector',
        info: 'Might switch side',
        description: 'Spy counterpart of the Defector'
    },
    [ROLES.DEFECTOR]: {
        id: ROLES.DEFECTOR,
        side: TEAM.GOOD,
        title: 'Resistance Defector',
        info: 'Might switch side',
        description: TEXTS.defectorDescription
    },
    [ROLES.DEEP_COVER_SPY]: {
        id: ROLES.DEEP_COVER_SPY,
        side: TEAM.BAD,
        title: 'Deep cover Spy',
        info: 'Unknown to Commander',
        description: TEXTS.deepCoverText,
        module: EXPANSION.ASSASSIN
    },
    [ROLES.BLIND_SPY]: {
        id: ROLES.BLIND_SPY,
        side: TEAM.BAD,
        title: 'Blind Spy',
        info: 'Unknown to other spies',
        description: TEXTS.blindText
    },
    [ROLES.REVERSER]: {
        id: ROLES.REVERSER,
        side: TEAM.GOOD,
        title: 'Reverser',
        info: 'May play Reverse',
        description: TEXTS.reverserText
    },
    [ROLES.SPY_REVERSER]: {
        id: ROLES.SPY_REVERSER,
        side: TEAM.BAD,
        title: 'Spy Reverser',
        info: 'May play Reverse',
        description: TEXTS.spyReverser
    },
    [ROLES.CHIEF]: {
        id: ROLES.CHIEF,
        side: TEAM.GOOD,
        title: 'Resistance Chief',
        info: 'If Accused, Spies win',
        core: true,
        module: EXPANSION.HUNTER,
        description: TEXTS.chief
    },
    [ROLES.SPY_CHIEF]: {
        id: ROLES.SPY_CHIEF,
        side: TEAM.BAD,
        title: 'Spy Chief',
        info: 'If Accused, resistance wins',
        core: true,
        module: EXPANSION.HUNTER,
        description: TEXTS.spyChief
    },
    [ROLES.HUNTER]: {
        id: ROLES.HUNTER,
        side: TEAM.GOOD,
        title: 'Resistance Hunter',
        info: 'Should name the Spy Chief',
        core: true,
        module: EXPANSION.HUNTER,
        description: TEXTS.hunter
    },
    [ROLES.SPY_HUNTER]: {
        id: ROLES.SPY_HUNTER,
        side: TEAM.BAD,
        title: 'Spy Hunter',
        info: 'Should name the Resistance Chief',
        core: true,
        module: EXPANSION.HUNTER,
        description: TEXTS.spyHunter
    },
    [ROLES.DUMMY_AGENT]: {
        id: ROLES.DUMMY_AGENT,
        side: TEAM.GOOD,
        module: EXPANSION.HUNTER,
        title: 'Dummy Agent',
        info: 'Appears as the Chief',
        description: TEXTS.spyHunter
    },
    [ROLES.COORDINATOR]: {
        id: ROLES.COORDINATOR,
        side: TEAM.GOOD,
        title: 'Coordinator',
        module: EXPANSION.HUNTER,
        info: 'Known to Resistance chief',
        description: TEXTS.coordinator
    },
    [ROLES.DEEP_AGENT]: {
        id: ROLES.DEEP_AGENT,
        side: TEAM.BAD,
        title: 'Deep Agent',
        info: 'Does not know spies',
        description: TEXTS.deepAgent
    },
    [ROLES.PRETENDER]: {
        id: ROLES.PRETENDER,
        side: TEAM.GOOD,
        title: 'Pretender',
        info: 'Appears as the Deep Agent',
        description: TEXTS.pretender
    }
};

export const teamTraits = {
    [TEAM.BAD]: {color: 'spies', title: 'The Spies', success: ['3 Missions fail', 'Commander named by the Assassin']},
    [TEAM.GOOD]: {
        color: 'resistance',
        title: 'The Resistance',
        success: ['3 Missions are completed successfully'],
        fail: ['Commander named by the Spies']
    }
};

export function assignRoles(playersPrefSide, optionalRoles, type) {
    const teams = splitTeams(playersPrefSide);
    const result = Array(playersPrefSide.length);
    const sides = {
        [TEAM.GOOD]: shuffle(teams[TEAM.GOOD]),
        [TEAM.BAD]: shuffle(teams[TEAM.BAD])
    };
    const roles = getRoomComposition(playersPrefSide.length, type, optionalRoles);
    roles.forEach(rid => {
        const pid = sides[roleTraits[rid].side].shift();
        result[pid] = rid;
    });
    return result;
}

function splitTeams(playersPrefSide) {
    const teams = playersPrefSide.reduce((result, side, i) => ({...result, [side]: [...result[side], i]}), {
        [TEAM.BAD]: [],
        [TEAM.GOOD]: [],
        [TEAM.RANDOM]: []
    });
    const players = [...shuffle(teams[TEAM.GOOD]), ...shuffle(teams[TEAM.RANDOM]), ...shuffle(teams[TEAM.BAD])];
    return {
        [TEAM.BAD]: players.slice(teamSize[players.length]),
        [TEAM.GOOD]: players.slice(0, teamSize[players.length])
    }
}


function shuffle(array) {
    const result = array.slice();
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

const teamSize = {
    5: 3, 6: 4, 7: 4, 8: 5, 9: 6, 10: 6, 11: 7
};

export function getRoleVision(ownRole, visionRole) {
    switch (ownRole) {
        case ROLES.SPY:
        case ROLES.FALSE_COMMANDER:
        case ROLES.ASSASSIN:
        case ROLES.DEEP_COVER_SPY:
        case ROLES.SPY_CHIEF:
        case ROLES.SPY_HUNTER:
        case ROLES.SPY_REVERSER:
            if (visionRole === ROLES.PRETENDER || visionRole === ROLES.DEEP_AGENT) return ROLES.DEEP_AGENT;
            return roleTraits[visionRole].side === TEAM.GOOD ? ROLES.RESISTANCE : visionRole;
        case ROLES.BODY_GUARD:
            return visionRole === ROLES.COMMANDER || visionRole === ROLES.FALSE_COMMANDER ? ROLES.COMMANDER : ROLES.UNKNOWN;
        case ROLES.COMMANDER:
            if (visionRole === ROLES.DEEP_COVER_SPY) return ROLES.RESISTANCE;
            return roleTraits[visionRole].side === TEAM.GOOD ? ROLES.RESISTANCE : ROLES.SPY;
        case ROLES.CHIEF:
            if (visionRole === ROLES.CHIEF || visionRole === ROLES.COORDINATOR) return visionRole;
            return ROLES.UNKNOWN;
        default:
            return ROLES.UNKNOWN;
    }
}

export function getDefectorActions(members) {
    const resistance = members.findIndex(m => m.role === ROLES.DEFECTOR);
    const spy = members.findIndex(m => m.role === ROLES.SPY_DEFECTOR);
    if (resistance !== -1 && spy !== -1) {
        const dice1 = dice(6) + 2;
        let dice2 = dice(6) + 2;
        if (dice1 === dice2) {
            dice2 = dice1 === 7 ? 6 : dice1 + 1;
        }
        return [
            {turn: Math.min(dice1, dice2), resistance, spy},
            {turn: Math.max(dice1, dice2), resistance: spy, spy: resistance}
        ]
    } else {
        return []
    }
}

export function getDefectorTurns(members) {
    if (members.filter(({role}) => role === ROLES.DEFECTOR || role === ROLES.SPY_DEFECTOR).length === 2) {
        const dice1 = dice(6) + 2;
        let dice2 = dice(6) + 2;
        if (dice1 === dice2) {
            dice2 = dice1 === 7 ? 6 : dice1 + 1;
        }
        return [Math.min(dice1, dice2), Math.max(dice1, dice2)];
    } else {
        return []
    }
}


function dice(n) {
    return Math.floor(Math.random() * n);
}

export function makeDefectorSwap(members) {
    return members.map(m => {
        if (m.role === ROLES.DEFECTOR) return {...m, role: ROLES.SPY_DEFECTOR};
        if (m.role === ROLES.SPY_DEFECTOR) return {...m, role: ROLES.DEFECTOR};
        return m;
    })
}

export function getMissionOptions(role, size) {
    if (role === ROLES.REVERSER || role === ROLES.SPY_REVERSER) {
        return [MISSION_OPT.REVERSE, MISSION_OPT.SUCCESS];
    }
    if(role === ROLES.SPY_CHIEF && size >= 7) {
        return [MISSION_OPT.CHIEF_FAIL, MISSION_OPT.SUCCESS];
    }
    if (roleTraits[role].side === TEAM.BAD) {
        return [MISSION_OPT.FAIL, MISSION_OPT.SUCCESS];
    }
    return [MISSION_OPT.SUCCESS];
}

export function roomSizeInfo(size) {
    if (size >= 5 && size <= 11) {
        return [teamSize[size], size - teamSize[size]];
    }
}

export function getRoomComposition(size, module, roles) {
    if (size < 5 || size > 11) return [];
    const result = [...getCoreRoles(module, size), ...roles];
    const baseCount = getBaseRoleCount(result, size);
    result.push(...Array(baseCount[TEAM.BAD]).fill(ROLES.SPY), ...Array(baseCount[TEAM.GOOD]).fill(ROLES.RESISTANCE));
    return result;
}

export function getBaseRoleCount(roles, size) {
    const count = roles.reduce((res, role) => ({
        ...res,
        [roleTraits[role].side]: res[roleTraits[role].side] + 1
    }), {[TEAM.BAD]: 0, [TEAM.GOOD]: 0});
    return {
        [TEAM.GOOD]: teamSize[size] - count[TEAM.GOOD],
        [TEAM.BAD]: size - teamSize[size] - count[TEAM.BAD]
    }
}

export function getCoreRoles(module, size) {
    if(module === EXPANSION.HUNTER){
        const result = [ROLES.SPY_CHIEF, ROLES.SPY_HUNTER, ROLES.HUNTER, ROLES.CHIEF];
        if(size>=8) result.push(ROLES.CHIEF);
        if(size>=10) result.push(ROLES.SPY_CHIEF);
        return result;
    } else {
        return Object.values(roleTraits).filter(r => r.core && r.module === module).map(r => r.id);
    }
}

export function getCoreCount(module, size) {
    return getCoreRoles(module, size).reduce((res, role) => ({...res, [roleTraits[role].side]: res[roleTraits[role].side] + 1}), {[TEAM.BAD]: 0, [TEAM.GOOD]: 0});
}

export function getInvestigationResult(role, size) {
    switch (role) {
        case ROLES.SPY_CHIEF: return size>=7 ? LOAYLTY.SPY_CHIEF : LOAYLTY.CHIEF;
        case ROLES.DUMMY_AGENT:
        case ROLES.CHIEF: return size>=7 ? LOAYLTY.RESISTANCE_CHIEF : LOAYLTY.CHIEF;
        default:
            return LOAYLTY.NOT_CHIEF;
    }
}

export function isProperRoomSize(size) {
    return size >= 5 && size <= 11;
}