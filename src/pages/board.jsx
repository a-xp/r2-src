import React, {useContext, useMemo} from 'react';
import {Page, BlockTitle, List, ListItem, Navbar, NavTitle, Block, Button} from 'framework7-react';
import {AppContext} from "@/components/app";
import {RolesInfo} from "@/components/RolesInfo";
import {STATUS} from "@/api/enum";
import {roomSizeInfo} from "@/domain/roles";
import '@/css/board.scss';
import {SessionSettings} from "@/components/SessionSettings";
import {Intro} from "@/components/Intro";
import {Mission} from "@/components/Mission";
import {Score} from "@/components/Score";
import {gameApi} from "@/api/game";

export default (props) => {
    const ctx = useContext(AppContext);
    const {room, user, roomId} = ctx;
    if(!room) return null;
    return (
        <Page classNames="theme-dark">
            <Navbar>
                <NavTitle>BOARD</NavTitle>
            </Navbar>
            {room.status === STATUS.NEW && <>
                {!user.host && <Intro/>}
                {user.host && <SessionSettings/>}
            </>}
            {room.status === STATUS.STARTED && <Mission/>}
            {room.status === STATUS.FINISHED && <Score/>}
        </Page>
    )
}