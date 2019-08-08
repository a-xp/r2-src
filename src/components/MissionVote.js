import React, {useContext, useCallback, useState} from 'react';
import {BlockTitle, Block, Card, CardContent, CardFooter, CardHeader, Button, List, ListItem, Col, Row} from "framework7-react";
import {AppContext} from "@/components/app";
import {appColors, MISSION_OPT} from "@/api/enum";
import {getMissionOptions} from "@/domain/roles";
import {gameApi} from "@/api/game";


const choice = {
    [MISSION_OPT.SUCCESS]: {
        title: 'Success',
        description: 'You decided to go for success',
        color: appColors.success,
        colorName: 'green'
    },
    [MISSION_OPT.FAIL]: {
        title: 'Fail',
        description: 'You decided to sabotage the mission',
        color: appColors.warning,
        colorName: 'red'
    },
    [MISSION_OPT.REVERSE]: {
        title: 'Reverse',
        description: 'You decided to reverse the result',
        color: appColors.neutral,
        colorName: 'blue'
    },
    [MISSION_OPT.CHIEF_FAIL]: {
        title: 'Chief fail',
        description: 'You decided to sabotage the mission',
        color: appColors.warning,
        colorName: 'red'
    }
};

export function MissionVote(props) {

    const ctx = useContext(AppContext);
    const {room, roomId, mission, user} = ctx;
    const perform = mission.perform || [];

    const onVote = useCallback((choice) => {
        gameApi.performMission(roomId, user.num, choice);
    }, [roomId, user.num]);

    return (
        <>
            {perform[user.num] && <Block strong>
                {<p style={{color: choice[perform[user.num]].color}}>{choice[perform[user.num]].description}</p>}
            </Block>}
            {!perform[user.num] && <Block strong>
                <Row>
                    {getMissionOptions(user.role, room.members.length).map(opt => (
                        <Col key={opt}>
                            <Button fill color={choice[opt].colorName} onClick={() => onVote(opt)}>{choice[opt].title}</Button>
                        </Col>
                    ))}
                </Row>
            </Block>}

        </>
    )

}