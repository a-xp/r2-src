import React, {useContext, useCallback} from 'react';
import {BlockTitle, Block, Card, CardContent, CardFooter, CardHeader, Button} from "framework7-react";
import {AppContext} from "@/components/app";
import {ucase} from '@/api/utility';
import {OP_RESULT, OP_STATUS} from "@/api/enum";
import {TeamVote} from "@/components/TeamVote";
import {gameApi} from "@/api/game";
import {ParticipantsList} from "@/components/ParticipantsList";
import {MissionVote} from "@/components/MissionVote";
import {ROLES, roleTraits} from "@/domain/roles";
import {missionFailRequirement} from "@/domain/missions";
import {RoleActionsMessage} from "@/components/RoleActonsMessage";


const statuses = {
  [OP_STATUS.PREPARE]: "Preparation",
  [OP_STATUS.VOTE]: "Team proposal",
  [OP_STATUS.PROGRESS]: "In progress",
  [OP_STATUS.REJECTED]: "Team rejected",
  [OP_STATUS.INVESTIGATION]: "Investigation"
};

const results = {
    [OP_RESULT.FAIL]: "Failed",
    [OP_RESULT.SUCCESS]: "Success"
};

const headerStyles = {background: 'url(static/tunnel1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: 150};

export function Mission(props) {
    const ctx = useContext(AppContext);
    const {room, user, roomId, mission} = ctx;

    return (
        <>
            <Card>
                <CardHeader className="no-border mission-header-bg" style={headerStyles}>
                    <p className="mission-desc">Mission - The {ucase(mission.name)}<br/>
                    Status - {statuses[mission.status]}
                    {mission.result && <><br/> Result - {results[mission.result]} </>}
                        <br/>Leader - {room.members[mission.leader].login}
                    {mission.participants.map((num,i) => (<span key={num}>
                        <br/>Operative {i+1} - {room.members[num].login}
                    </span>))}
                    {mission.status !== OP_STATUS.PREPARE && mission.investigator && <>
                            <br/><span>Investigator - {room.members[mission.investigator].login}</span>
                        </>}
                    {missionFailRequirement(room.members.length, mission.num)>1 && <>
                        <br/>Single failure is tolerated</>}
                    </p>
                </CardHeader>
            </Card>

            {mission.status === OP_STATUS.PREPARE && mission.leader === user.num && <ParticipantsList/>}
            {mission.status === OP_STATUS.VOTE && <TeamVote/>}
            {mission.status === OP_STATUS.PROGRESS && mission.participants.includes(user.num) && <MissionVote/>}
            <RoleActionsMessage/>
        </>
    )
}
