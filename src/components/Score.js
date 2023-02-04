import React, {useContext} from 'react';
import {Block, BlockFooter, BlockTitle, Col, Row} from "framework7-react";
import {AppContext} from "@/components/app";
import {TEAM} from "@/api/enum";

export function Score(props) {
    const ctx = useContext(AppContext);
    const {room} = ctx;

    return (
        <>
            <BlockTitle large
                        className="text-align-center">{room.won === TEAM.GOOD ? 'Resistance Won' : 'Spies Won'}</BlockTitle>
            <Block strong>
                <Row className="score">
                    <Col className="color-resistance">{room.score[TEAM.GOOD] || '0'}</Col>
                    <Col className="color-spies">{room.score[TEAM.BAD] || '0'}</Col>
                </Row>
            </Block>
            {room.assassinSuccess && <BlockFooter className="color-spies text-align-center">
                <p>Assassin was successful</p>
            </BlockFooter>}
        </>
    )
}