import React, {useContext, useMemo} from 'react';
import {AppContext} from "@/components/app";
import {AccordionContent, Block, BlockTitle, List, ListItem} from "framework7-react";
import {roleTraits, teamTraits} from "@/domain/roles";
import {EXPANSION} from "@/api/enum";


export function RolesInfo(props) {
    const ctx = useContext(AppContext);
    const {room = {}} = ctx;
    const {type = EXPANSION.CLASSIC, roles = []} = room;
    const roleDescriptions = useMemo(() => Object.values(roleTraits)
            .filter(r => r.side && (!r.module || r.module === type) && (r.core || r.base || roles.includes(r.id)))
            .sort((r1, r2) => r1.side > r2.side ? -1 : 0),
        [roles, type]);

    return (
        <>
            <BlockTitle>Roles description</BlockTitle>
            <List accordionList>
                {roleDescriptions.map(r => <ListItem color={teamTraits[r.side].color} key={r.id} accordionItem
                                                     title={r.title} cl>
                    <AccordionContent>
                        <Block>
                            <p>{r.description}</p>
                        </Block>
                    </AccordionContent>
                </ListItem>)}
            </List>
        </>
    )
}