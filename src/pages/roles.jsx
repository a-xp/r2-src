import React, {useContext, useMemo} from 'react';
import {Block, BlockTitle, Col, Navbar, NavTitle, Page, Row} from 'framework7-react';
import {AppContext} from "@/components/app";
import {EXPANSION, TEAM} from "@/api/enum";
import {RolesInfo} from "@/components/RolesInfo";
import {getRoomComposition, isProperRoomSize, roleTraits} from "@/domain/roles";
import "@/css/roles.scss";


export default props => {
    const ctx = useContext(AppContext);
    const {room = {}, user, roomId} = ctx;
    const {members = [], roles = [], type = EXPANSION.CLASSIC} = room;

    const composition = useMemo(() => getRoomComposition(members.length, type, roles)
            .reduce((res, role) => ({...res, [roleTraits[role].side]: [...res[roleTraits[role].side], role]}),
                {[TEAM.GOOD]: [], [TEAM.BAD]: []}),
        [members.length, type, roles && roles.length]);

    return (
        <Page>
            <Navbar>
                <NavTitle>ROLES</NavTitle>
            </Navbar>
            {isProperRoomSize(members.length) && <>
                <BlockTitle>TEAMS</BlockTitle>
                <Block strong>
                    <Row>
                        <Col>{composition[TEAM.BAD].map((r, i) => <p key={`${i} ${r}`}
                                                                     className="color-spies text-align-center">{roleTraits[r].title}</p>)}</Col>
                        <Col>{composition[TEAM.GOOD].map((r, i) => <p key={`${i} ${r}`}
                                                                      className="color-resistance text-align-center">{roleTraits[r].title}</p>)}</Col>
                    </Row>
                    <div className="vs">VS</div>
                </Block>
            </>}
            <RolesInfo/>
        </Page>
    )
}