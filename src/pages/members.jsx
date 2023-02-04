import React, {useCallback, useContext, useLayoutEffect, useMemo, useState} from 'react';
import {
    Actions,
    ActionsButton,
    ActionsGroup,
    Block,
    Button,
    Fab,
    Icon,
    Link,
    List,
    ListItem,
    Navbar,
    NavLeft,
    NavRight,
    NavTitle,
    Page,
    Sheet
} from 'framework7-react';
import {AppContext} from "@/components/app";
import {getInvestigationResult, getRoleVision, ROLES, roleTraits} from "@/domain/roles";
import {roleIcons} from "@/icons/icons";
import {ACTIONS, LOAYLTY, OP_STATUS, STATUS} from "@/api/enum";
import {gameApi} from "@/api/game";
import '@/css/members.scss';

const actionsDef = {
    [ACTIONS.KICK]: {title: 'Kick', action: (m, ctx) => gameApi.kick(m.login, ctx.roomId), icon: 'thumbs_down'},
    [ACTIONS.IMPERSONATE]: {
        title: 'Impersonate',
        action: (m, ctx) => ctx.changeLogin(m.login),
        icon: 'enter_round',
        canApply: (m, user) => (m.bot && (user.host || user.bot)) || (m.host && user.bot)
    },
    [ACTIONS.ASSASSIN]: {
        title: 'Assassinate',
        action: (m, ctx) => gameApi.assassinAction(ctx.roomId, m.login),
        icon: 'bolt_fill'
    },
    [ACTIONS.DEEP_AGENT]: {
        title: 'Blame',
        action: (m, ctx) => gameApi.deepAgentAction(ctx.roomId, m.login),
        icon: 'hand_alt'
    },
    [ACTIONS.HUNTER]: {
        title: 'Accuse',
        action: (m, ctx) => gameApi.hunterAction(ctx.roomId, m.login),
        icon: 'bolt_fill'
    },
    [ACTIONS.SPY_HUNTER]: {
        title: 'Accuse',
        action: (m, ctx) => gameApi.spyHunterAction(ctx.roomId, m.login),
        icon: 'bolt_fill'
    },
    [ACTIONS.INVESTIGATOR]: {title: 'Investigate', action: (m, ctx, extra) => extra.investigate(m.login)},
};

const loyalties = {
    [LOAYLTY.NOT_CHIEF]: 'Is not a chief',
    [LOAYLTY.CHIEF]: 'Is a chief',
    [LOAYLTY.SPY_CHIEF]: 'Is the spy chief',
    [LOAYLTY.RESISTANCE_CHIEF]: 'Is the resistance chief'
};

export default (props) => {
    const ctx = useContext(AppContext) || {};
    const {room, user, roomId, mission = {}} = ctx;

    const addBot = useCallback(() => {
        gameApi.addBot(roomId);
    }, [roomId]);

    const investigate = useCallback((login) => {
        gameApi.investigatorAction(roomId);
        const loyalty = getInvestigationResult(room.members.find(m => m.login === login).role, room.members.size);
        setInvestResult({login, loyalty});
    }, [roomId, room && room.status, mission && mission.status, room && room.members.map(m => m.login).join()]);

    const onInvestClose = useCallback(() => {
        setInvestResult(null);
    });

    const [openedId, setOpenedId] = useState(null);
    const [investResult, setInvestResult] = useState(null);
    const [showSort, setShowSort] = useState(false);

    useLayoutEffect(() => {
        if (showSort && (!room || room.status != STATUS.NEW)) {
            setShowSort(false);
        }
    }, [room && room.status]);

    const possibleActions = useMemo(() => room && user && [
            (user.host || user.bot) && ACTIONS.IMPERSONATE,
            user.host && room.status === STATUS.NEW && ACTIONS.KICK,
            mission && user.role === ROLES.ASSASSIN && !user.outed && (mission.status === OP_STATUS.PREPARE || mission.nextAction === ACTIONS.ASSASSIN) && ACTIONS.ASSASSIN,
            mission && user.role === ROLES.DEEP_AGENT && !user.outed && mission.status === OP_STATUS.PREPARE && ACTIONS.DEEP_AGENT,
            user.role === ROLES.HUNTER && mission && mission.nextAction === ACTIONS.HUNTER && ACTIONS.HUNTER,
            user.role === ROLES.SPY_HUNTER && mission && mission.nextAction === ACTIONS.SPY_HUNTER && ACTIONS.SPY_HUNTER,
            mission && mission.nextAction === ACTIONS.INVESTIGATOR && user.num === mission.investigator && ACTIONS.INVESTIGATOR,
            mission && mission.nextAction === ACTIONS.LEADER_INVESTIGATION && user.num === mission.leader && ACTIONS.INVESTIGATOR
        ].filter(Boolean) || [],
        [mission && mission.status, user && user.login, user && user.outed, mission && mission.nextAction]);

    const actions = useMemo(() => {
        if (room && user) {
            return room.members
                .map((m, i) => m.login !== user.login && possibleActions
                    .map(id => ({...actionsDef[id], action: () => actionsDef[id].action(m, ctx, {investigate})}))
                    .filter(a => !a.canApply || a.canApply(m, user)))
                .map(a => a.length ? a : null);
        } else {
            return [];
        }
    }, [room && room.members.map(m => m.login).join(), possibleActions, investigate]);

    const vision = useMemo(() => {
        if (room) {
            return room.members.map((m, i) => {
                if (user && user.role) {
                    return user.login === m.login || m.outed || room.status === STATUS.FINISHED ? m.role : getRoleVision(user.role, m.originalRole);
                } else {
                    return ROLES.UNKNOWN;
                }
            });
        } else {
            return [];
        }
    }, [room && room.members.length, room && room.status, user && user.login, user && user.role]);

    const toggleReorder = useCallback(() => {
        setShowSort(!showSort);
    }, [showSort]);

    const onReorder = useCallback(({detail: {from, to}}) => {
        setShowSort(false);
        console.log(from, to);
        gameApi.reorder(roomId, from, to);
    });

    if (!room) return null;
    const {members, status} = room;

    return (
        <Page name="members">
            <Navbar>
                <NavLeft>
                    <Link iconF7="menu" panelOpen="left"></Link>
                </NavLeft>
                <NavTitle>MEMBERS</NavTitle>
                {room.status === STATUS.NEW && <NavRight>
                    <Link iconF7="sort_down" onClick={toggleReorder}></Link>
                </NavRight>}
            </Navbar>
            {members &&
            <List mediaList sortable className={`${showSort ? 'sortable-enabled' : ''}`} onSortableSort={onReorder}>
                {members.map((m, i) => {

                    const props = {
                        badge: m.login === user.login ? 'Me' : null,
                        link: !showSort && actions[i] && actions[i].length !== 1 ? '#' : null,
                        onClick: !showSort && actions[i] && actions[i].length !== 1 ? () => setOpenedId(i) : null,
                        subtitle: roleTraits[vision[i]].title,
                        title: m.login
                    };

                    return (<ListItem key={`${m.login} ${actions[i] && actions[i].length} ${vision[i]}`}
                                      badgeColor="var(--f7-theme-color)" {...props}>
                        {roleIcons[vision[i]]({slot: 'media', size: 40})}
                        {!showSort && actions[i] && actions[i].length === 1 &&
                        <Button slot="after" onClick={actions[i][0].action}><Icon f7={actions[i][0].icon}/></Button>}
                    </ListItem>)

                })}
            </List>}

            {status === STATUS.NEW && user && user.host &&
            <Fab position="right-bottom" slot="fixed" text="Add bot" color="green" onClick={addBot}>
                <Icon ios="f7:add" aurora="f7:add" md="material:add"></Icon>
            </Fab>}

            <Actions opened={openedId !== null} onActionsClosed={() => setOpenedId(null)}>
                <ActionsGroup>
                    {openedId !== null && actions[openedId] && actions[openedId].map(a => <ActionsButton bold
                                                                                                         onClick={a.action}
                                                                                                         key={a.title}>{a.title}</ActionsButton>)}
                    <ActionsButton color="red">Cancel</ActionsButton>
                </ActionsGroup>
            </Actions>

            <Sheet swipeToClose backdrop opened={investResult !== null} onSheetClosed={onInvestClose}
                   className="middle-aligned-sheet">
                {investResult && <Block string
                                        className={`invest-result ${investResult.loyalty === LOAYLTY.RESISTANCE_CHIEF ? 'color-resistance' : ''} ${investResult.loyalty === LOAYLTY.SPY_CHIEF ? 'color-spies' : ''}`}>
                    <p>{investResult.login}<br/>
                        {loyalties[investResult.loyalty]}</p>
                </Block>}
            </Sheet>

        </Page>
    )
}
