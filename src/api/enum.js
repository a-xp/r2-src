export const STATUS = {
  NEW: 'NEW',
  STARTED: 'STARTED',
  FINISHED: 'FINISHED'
};

export const TEAM = {
  BAD: 'BAD',
  GOOD: 'GOOD',
  RANDOM: 'RANDOM'
};

export const EXPANSION = {
  CLASSIC: 'CLASSIC',
  ASSASSIN: 'ASSASSIN',
  HUNTER: 'HUNTER'
};

export const OP_STATUS = {
  PREPARE: 'PREPARE',
  VOTE: 'VOTE',
  PROGRESS: 'PROGRESS',
  INVESTIGATION: 'INVESTIGATION',
  REJECTED: 'REJECTED',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
    isTerminal(status) {
      return status === OP_STATUS.REJECTED || status === OP_STATUS.INVESTIGATION;
    },
    isLater(ref, cur){
      const refIndex = statusOrder.indexOf(ref);
      const curIndex = statusOrder.indexOf(cur);
      if(refIndex === -1) return false;
      if(curIndex === -1) return true;
      return curIndex > refIndex;
    }
};

export const OP_RESULT = {
    SUCCESS: 'SUCCESS',
    FAIL: 'FAIL',
};

const statusOrder = [OP_STATUS.PREPARE, OP_STATUS.VOTE, OP_STATUS.PROGRESS, OP_STATUS.INVESTIGATION];

export const VOTE = {
  YES: 'YES',
  NO: 'NO'
};

export const MISSION_OPT = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
  REVERSE: 'REVERSE',
  CHIEF_FAIL: 'CHIEF_FAIL'
};

export const missionStatusTitle = {
  [OP_STATUS.INVESTIGATION]: 'Investigation',
  [OP_STATUS.PROGRESS]: 'In progress',
  [OP_STATUS.REJECTED]: 'Rejected',
  [OP_STATUS.VOTE]: 'Team election',
  [OP_STATUS.PREPARE]: ''
};

export const ACTIONS = {
  ASSASSIN: 'ASSASSIN',
  HUNTER: 'HUNTER',
  SPY_HUNTER: 'SPY_HUNTER',
  DEEP_AGENT: 'DEEP_AGENT',
  INVESTIGATOR: 'INVESTIGATOR',
  NEXT_MISSION: 'NEXT_MISSION',
  LEADER_INVESTIGATION: 'LEADER_INVESTIGATION',
  KICK: 'KICK',
  IMPERSONATE: 'IMPERSONATE'
};

export const LOAYLTY = {
  CHIEF: 'CHIEF',
  SPY_CHIEF: 'SPY_CHIEF',
  RESISTANCE_CHIEF: 'RESISTANCE_CHIEF',
  RESISTANCE: 'RESISTANCE',
  SPY: 'SPY',
  NOT_CHIEF: 'NOT_CHIEF'
};

export const appColors = {
  spy: '#c40b15',
  resistance: "#55a5b0",
  success: "#00C851",
  warning: "#CC0000",
  neutral: '#ee957f'
};