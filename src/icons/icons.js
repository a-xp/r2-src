import {ROLES} from "@/domain/roles";
import React from 'react';
import UnknownIcon from "@/icons/UnknownIcon";
import {SpyIcon} from "@/icons/SpyIcon";
import {ResistanceIcon} from "@/icons/ResistanceIcon";
import {CommanderIcon} from "@/icons/CommanderIcon";
import {AssassinIcon} from "@/icons/AssassinIcon";
import {BodyguardIcon} from "@/icons/BodyguardIcon";
import {appColors} from "@/api/enum";

export const roleIcons = {
    [ROLES.UNKNOWN]: props => <UnknownIcon {...props}/>,
    [ROLES.SPY]: props => <SpyIcon {...props}/>,
    [ROLES.DEFECTOR]:props => <ResistanceIcon {...props}/>,
    [ROLES.RESISTANCE]:props => <ResistanceIcon {...props}/>,
    [ROLES.SPY_DEFECTOR]:props => <SpyIcon {...props}/>,
    [ROLES.DEEP_COVER_SPY]:props => <SpyIcon {...props}/>,
    [ROLES.BLIND_SPY]:props => <SpyIcon {...props}/>,
    [ROLES.COMMANDER]:props => <CommanderIcon {...props}/>,
    [ROLES.ASSASSIN]:props => <AssassinIcon {...props}/>,
    [ROLES.BODY_GUARD]:props => <BodyguardIcon {...props}/>,
    [ROLES.FALSE_COMMANDER]:props => <CommanderIcon color={appColors.spy} {...props}/>,
    [ROLES.DEEP_AGENT]: props => <SpyIcon {...props}/>,
    [ROLES.PRETENDER]: props => <ResistanceIcon {...props}/>,
    [ROLES.COORDINATOR]: props => <ResistanceIcon {...props}/>,
    [ROLES.DUMMY_AGENT]: props => <ResistanceIcon {...props}/>,
    [ROLES.SPY_HUNTER]: props => <SpyIcon {...props}/>,
    [ROLES.HUNTER]: props => <ResistanceIcon {...props}/>,
    [ROLES.CHIEF]: props => <ResistanceIcon {...props}/>,
    [ROLES.SPY_CHIEF]: props => <SpyIcon {...props}/>,
    [ROLES.REVERSER]: props => <ResistanceIcon {...props}/>,
    [ROLES.SPY_REVERSER]: props => <SpyIcon {...props}/>,
};