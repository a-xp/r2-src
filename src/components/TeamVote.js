import React, {useCallback, useContext} from 'react';
import {Block, BlockTitle, Button, Col, List, ListItem, Row} from "framework7-react";
import {AppContext} from "@/components/app";
import {appColors, VOTE} from "@/api/enum";
import {gameApi} from "@/api/game";

export function TeamVote(props) {
    const ctx = useContext(AppContext);
    const {user, room, roomId, mission} = ctx;

    const approve = useCallback(() => {
        gameApi.voteTeam(roomId, user.num, VOTE.YES)
    }, [roomId, user.num]);

    const reject = useCallback(() => {
        gameApi.voteTeam(roomId, user.num, VOTE.NO)
    }, [roomId, user.num]);

    return (
        <>
            <BlockTitle>Team mebers</BlockTitle>
            <List simple-list>
                {mission.participants.map(num => <ListItem title={room.members[num].login} key={num}/>)}
            </List>

            {mission.vote[user.num] && <Block strong>
                You {mission.vote[user.num] === VOTE.YES ? 'approved' : 'rejected'} this team
            </Block>}
            {!mission.vote[user.num] && <Block strong>
                <Row>
                    <Col>
                        <Button color={appColors.success} iconF7="thumbs_up" onClick={approve}>Approve</Button>
                    </Col>
                    <Col>
                        <Button color={appColors.warning} iconF7="thumbs_down" onClick={reject}>Reject</Button>
                    </Col>
                </Row>
            </Block>}
        </>
    )
}