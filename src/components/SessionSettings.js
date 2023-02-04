import React, {useCallback, useContext, useMemo, useState} from 'react';
import {AppContext} from "@/components/app";
import {Block, BlockTitle, Button, List, ListItem} from "framework7-react";
import {EXPANSION, TEAM} from "@/api/enum";
import {getBaseRoleCount, getCoreCount, isProperRoomSize, roleTraits, teamTraits} from "@/domain/roles";
import {gameApi} from "@/api/game";

export function SessionSettings(props) {
    const ctx = useContext(AppContext);
    const {room = {}, user, roomId} = ctx;

    const [module, setModule] = useState(room.type || EXPANSION.CLASSIC);
    const [roles, setRoles] = useState(room.roles || []);

    const rolesDescription = useMemo(() => Object.values(roleTraits)
            .filter(r => r.side && !r.base && !r.core && (!r.module || r.module === module))
            .sort(({side: side1}, {side: side2}) => side1 > side2 ? -1 : 0),
        [roles, module]);

    const baseCount = useMemo(() => {
        if (!room.members || !isProperRoomSize(room.members.length)) return {};
        const optional = getBaseRoleCount(roles, room.members.length);
        const core = getCoreCount(module, room.members.length);
        return {
            [TEAM.GOOD]: optional[TEAM.GOOD] - core[TEAM.GOOD],
            [TEAM.BAD]: optional[TEAM.BAD] - core[TEAM.BAD]
        }
    }, [room.members && room.members.length, roles.length, module]);

    const onModuleSelect = useCallback((e) => {
        setModule(e.target.value);
        setRoles([]);
    }, []);

    const onRoleToggle = useCallback((e) => {
        const id = e.target.value;
        if (roles.includes(id)) {
            setRoles(roles.filter(k => k !== id));
        } else {
            setRoles([...roles, id]);
        }
    }, [roles]);

    const onApply = useCallback(async () => {
        await gameApi.setRoles(roomId, roles, module);
        await gameApi.start(roomId);
    }, [roles, module, roomId]);

    return (
        <>
            <BlockTitle>Expansion module</BlockTitle>
            <List>
                <ListItem radio title="Classic" name="module" value={EXPANSION.CLASSIC} onChange={onModuleSelect}
                          checked={module === EXPANSION.CLASSIC}/>
                <ListItem radio title="Assassin" name="module" value={EXPANSION.ASSASSIN} onChange={onModuleSelect}
                          checked={module === EXPANSION.ASSASSIN}/>
                <ListItem radio title="Hunter" name="module" value={EXPANSION.HUNTER} onChange={onModuleSelect}
                          checked={module === EXPANSION.HUNTER}/>
            </List>
            {room.members && room.members.length >= 5 && <>
                <BlockTitle>Optional roles</BlockTitle>
                <List>
                    {rolesDescription.map(r =>
                        <ListItem checkbox key={r.id} disabled={!baseCount[r.side] && !roles.includes(r.id)}
                                  checked={roles.includes(r.id)} onChange={onRoleToggle} name="role" value={r.id}>
                            <span slot="title" className={`color-${teamTraits[r.side].color}`}>{r.title}</span>
                        </ListItem>)}
                </List>
                <Block>
                    <Button large fill onClick={onApply}>Start game</Button>
                </Block>
            </>}
            {room.members && room.members.length < 5 && <Block strong className="text-align-center">
                Need at least 5 people to start
            </Block>}

        </>
    )
}