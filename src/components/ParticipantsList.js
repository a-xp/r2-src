import React, {useContext, useCallback, useState} from 'react';
import {BlockTitle, Block, Card, CardContent, CardFooter, CardHeader, Button, List, ListItem} from "framework7-react";
import {AppContext} from "@/components/app";
import {participantsCount} from "@/domain/missions";
import {gameApi} from "@/api/game";
import {EXPANSION} from "@/api/enum";

export function ParticipantsList(props) {
    const ctx = useContext(AppContext);
    const {room, roomId, user, mission} = ctx;

    const [participants, setParticipants] = useState([]);
    const [stage, setStage] = useState(1);
    const [investigator, setInvestigator] = useState(-1);

    const onSelectOption = useCallback((e) => {
        const num = parseInt(e.target.value);
        if (participants.includes(num)) {
            setParticipants(participants.filter(n => n !== num));
        } else {
            if (participants.length < participantsCount[room.members.length][mission.num]) {
                setParticipants([...participants, num]);
            }
        }
    }, [participants]);

    const onSelectInvestigator = useCallback((e) => {
        setInvestigator(parseInt(e.target.value));
    }, [setInvestigator]);

    const onApplyParticipants = useCallback(() => {
        if (participants.length === participantsCount[room.members.length][mission.num]) {
            if(room.type === EXPANSION.HUNTER && mission.num!==5){
                setStage(2);
            }else{
                gameApi.proposeTeam(roomId, participants);
            }
        }
    }, [roomId, participants]);

    const onApplyInvestigator = useCallback((e) => {
        if(investigator!==-1){
            gameApi.proposeTeam(roomId, participants, investigator);
        }
    }, [roomId, investigator]);

    return (
        <>
            {stage === 1 && <>
                <BlockTitle>Choose {participantsCount[room.members.length][mission.num]} operatives</BlockTitle>
                <List>
                    {room.members.map(m => <ListItem checkbox title={m.login} name="participant" value={m.num}
                                                     key={m.num} onChange={onSelectOption}
                                                     checked={participants.includes(m.num)}></ListItem>)}
                </List>
                <Block>
                    <Button fill onClick={onApplyParticipants}>Propose Team</Button>
                </Block>
            </>}
            {stage === 2 && <>
                <BlockTitle>Choose investigator</BlockTitle>
                <List>
                    {room.members
                        .filter((m, i) => !participants.includes(i) && mission.leader !== i)
                        .map((m, i) => <ListItem radio title={m.login} name="investigator" value={m.num} key={m.num}
                                                 onChange={onSelectInvestigator}
                                                 checked={m.num === investigator}></ListItem>)}
                </List>
                <Block>
                    <Button fill onClick={onApplyInvestigator}>Propose Investigator</Button>
                </Block>
            </>}
        </>
    )
}