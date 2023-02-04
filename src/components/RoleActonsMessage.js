import React, {useCallback, useContext} from 'react';
import {Block, Button} from "framework7-react";
import {AppContext} from "@/components/app";
import {ROLES, roleTraits} from "@/domain/roles";
import {ACTIONS, OP_STATUS} from "@/api/enum";
import {gameApi} from "@/api/game";
import {ucase} from "@/api/utility";

export const RoleActionsMessage = React.memo(props => {
    const ctx = useContext(AppContext);
    const {room, user, roomId, mission} = ctx;

    const nextMission = useCallback(() => {
        gameApi.nextMission(roomId);
    }, [roomId]);

    const {type, members} = room;
    const nextAction = mission.nextAction;

    return <>
        {mission.status === OP_STATUS.PREPARE && room.defectorTurns.includes(mission.num)
        && <Block strong className="text-color-primary text-align-center">
            {(user.role === ROLES.SPY_DEFECTOR || user.role === ROLES.DEFECTOR) ?
                `Your ALLEGIANCE AND ROLE have changed. Now you are ${roleTraits[user.role].title}` :
                `Defectors changed their allegiance ${room.defectorTurns.filter(t => t <= mission.num).length} time`}
        </Block>}
        {nextAction === ACTIONS.ASSASSIN && <Block strong className="color-spies text-align-center">
            {memberByRole(members, ROLES.ASSASSIN)}, the assassin now has a chance to kill The Commander
        </Block>}
        {nextAction === ACTIONS.SPY_HUNTER && <Block strong className="color-spies text-align-center">
            {memberByRole(members, ROLES.SPY_HUNTER)}, the Spy-Hunter now has a chance to kill The Resistance Chief
        </Block>}
        {nextAction === ACTIONS.HUNTER && <Block strong className="color-resistance text-align-center">
            {memberByRole(members, ROLES.HUNTER)}, the Hunter now has a chance to kill The Spy Chief
        </Block>}
        {nextAction === ACTIONS.INVESTIGATOR && <Block strong className="text-align-center">
            {ucase(members[mission.investigator].login)} investigates mission result
        </Block>}
        {nextAction === ACTIONS.LEADER_INVESTIGATION && <Block strong className="text-align-center">
            {ucase(members[mission.leader].login)} investigates mission result
        </Block>}
        {nextAction === ACTIONS.NEXT_MISSION && user.host && <Block>
            <Button fill onClick={nextMission}>Next mission</Button>
        </Block>}
    </>
});

function memberByRole(members, role) {
    return ucase(members.find(m => m.role === role).login);
}
