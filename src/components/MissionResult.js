import React, {useContext} from 'react';
import {BlockTitle, Block, Row, Col} from "framework7-react";
import {AppContext} from "@/components/app";
import {appColors, MISSION_OPT} from "@/api/enum";
import {FirearmIcon} from "@/icons/FirearmIcon";
import {BrokenShieldIcon} from "@/icons/BrokenShieldIcon";
import {RefreshIcon} from "@/icons/RefreshIcon";

const ResultsDisplay = {
    [MISSION_OPT.SUCCESS]: <><FirearmIcon size={40} color={appColors.resistance}/> Success</>,
    [MISSION_OPT.CHIEF_FAIL]: <><BrokenShieldIcon size={40} color={appColors.spy}/> Chief Fail</>,
    [MISSION_OPT.FAIL]: <><BrokenShieldIcon size={40} color={appColors.spy}/> Fail</>,
    [MISSION_OPT.REVERSE]: <><RefreshIcon size={40} color={appColors.neutral}/> Reverse</>
};

export function MissionResult() {

    const ctx = useContext(AppContext);
    const {mission: {summary}} = ctx;

    const rows = [[]];
    Object.entries(summary).forEach( ([k, count]) => {
        for(let i = 0;i<count;i++) {
            if (rows[rows.length - 1].length >= 3) {
                rows.push([])
            }
            rows[rows.length - 1].push(k);
        }
    });

    while(rows[rows.length - 1].length < 3){
        rows[rows.length - 1].push(null);
    }

    return <>
            <Block>
                {rows.map( (row, ri) => <Row key={ri}>
                    {row.map((r, ci) => r ? <Col key={ci} className="elevation-4 result-card">
                        {ResultsDisplay[r]}
                    </Col> : <Col key={ci}/>)}
                </Row>)}
            </Block>
        </>

}