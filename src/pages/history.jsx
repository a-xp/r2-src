import React, {useContext} from 'react';
import {Navbar, NavTitle, Page, Block, ListItem, List, AccordionContent, BlockHeader, Icon, Chip} from "framework7-react";
import {Intro} from "@/components/Intro";
import {AppContext} from "@/components/app";
import {MISSION_OPT, OP_STATUS, STATUS, VOTE} from "@/api/enum";
import {ucase} from "@/api/utility";

const options = {
    [MISSION_OPT.SUCCESS]: {
        title: 'Success',
        color: 'green'
    },
    [MISSION_OPT.FAIL]: {
        title: 'Fail',
        color: 'red'
    },
    [MISSION_OPT.REVERSE]: {
        title: 'Reverse',
        color: 'blue'
    }
};


export default (props) => {
    const ctx = useContext(AppContext);
    const {room, user, roomId} = ctx;
    if(!room)return null;
    const members = room.members;

    return (
        <Page>
            <Navbar>
                <NavTitle>Turns</NavTitle>
            </Navbar>
            {room.status === STATUS.NEW && <Block strong>
                <p>Session is about to start...</p>
            </Block>}
            {room.status !== STATUS.NEW && <List accordionList>
                {room.missions.map((mission,i) => <ListItem accordionItem title={ucase(mission.name)} key={i}>
                    {mission.status === OP_STATUS.SUCCESS && <Icon slot="after" color="green" f7="check"/>}
                    {mission.status === OP_STATUS.REJECTED && <Icon slot="after" color="gray" f7="thumbs_down"/>}
                    {mission.status === OP_STATUS.FAIL && <Icon slot="after" color="red" f7="close"/>}
                        <AccordionContent>
                            <List>
                                {members.map((m,i) => (
                                    <ListItem key={i} title={m.login}>
                                        {i === mission.leader && <Icon slot="after" f7="star_fill" color="yellow"/>}
                                        {mission.participants.includes(i) && <Icon slot="after" f7="bolt_fill" color="blue"/>}
                                        {mission.status!== OP_STATUS.VOTE && mission.vote && mission.vote[i] === VOTE.YES && <Icon slot="after" f7="thumbs_up" color="green"/>}
                                        {mission.status!== OP_STATUS.VOTE && mission.vote && mission.vote[i] === VOTE.NO && <Icon slot="after" f7="thumbs_down" color="red"/>}
                                    </ListItem>
                                ))}
                            </List>
                            {mission.summary && <Block className="mission-result-chips">
                                {Object.entries(mission.summary).map(([k,v]) => v>0 && <Chip text={options[k].title} media={'' + v} key={k} color={options[k].color} />)}
                            </Block>}
                        </AccordionContent>
                </ListItem>)}
            </List>}
        </Page>
    )
}