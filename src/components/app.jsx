import React from 'react';
import {
    App,
    Link,
    List,
    ListButton,
    ListInput,
    ListItem,
    LoginScreen,
    LoginScreenTitle,
    Navbar,
    Page,
    Panel,
    Statusbar,
    Toolbar,
    View,
    Views
} from 'framework7-react';

import appRoutes from "@/js/appRoutes";
import {copyStringToClipboard, getGameId} from "@/api/utility";
import {gameApi} from "@/api/game";
import {credApi} from "@/api/store";
import {STATUS, TEAM} from '@/api/enum';

export const AppContext = React.createContext();

class ResistanceApp extends React.Component {
    constructor() {
        super();

        this.state = {
            f7params: {
                name: 'resistance-app', // App name
                theme: 'auto', // Automatic theme detection
                routes: appRoutes,
            },
            roomId: getGameId(),
            login: '',
            side: TEAM.RANDOM,
            cred: null,
            errors: {},
            roomData: {}
        }
    }

    render() {
        const {errors = {}, roomId, login, roomData} = this.state;

        return (
            <App params={this.state.f7params}>
                <AppContext.Provider value={this.state.roomData}>
                    <Statusbar></Statusbar>

                    <Views tabs className="safe-areas">
                        <Toolbar tabbar labels bottom>
                            <Link tabLink="#view-members" tabLinkActive iconF7="persons" text="Members"/>
                            <Link tabLink="#view-board" iconF7="chat" text="Board"/>
                            <Link tabLink="#view-history" iconF7="book" text="Missions"/>
                            <Link tabLink="#view-roles" iconF7="help" text="Roles"/>
                        </Toolbar>

                        <View id="view-members" main tab tabActive url="/members/"/>

                        <View id="view-board" name="board" tab url="/board/"/>

                        <View id="view-history" name="history" tab url="/history/"/>

                        <View id="view-roles" name="roles" tab url="/roles/"/>

                    </Views>

                    <LoginScreen opened={!this.state.cred}>
                        <Page loginScreen>
                            {roomId && <>
                                <LoginScreenTitle>Join room</LoginScreenTitle>
                                <p className="room-number">ROOM ID: {roomId}</p>
                            </>}
                            {!roomId && <LoginScreenTitle>Create new room</LoginScreenTitle>}
                            <List form>
                                <ListInput ref="login" label="Your name" errorMessageForce={Boolean(errors.login)}
                                           type="text" placeholder="John Smith" value={login}
                                           onInput={e => this.setState({login: e.target.value})}>
                                    {errors.login && errors.login.map(e => <span slot="error-message"
                                                                                 key={e}>{e}</span>)}
                                </ListInput>
                                <ListItem radio value={TEAM.GOOD} name="side" title="Resistance"
                                          onChange={e => this.setState({side: e.target.value})}/>
                                <ListItem radio value={TEAM.BAD} name="side" title="Spies"
                                          onChange={e => this.setState({side: e.target.value})}/>
                                <ListItem radio value={TEAM.RANDOM} name="side" title="Random side" defaultChecked
                                          onChange={e => this.setState({side: e.target.value})}/>
                            </List>
                            {roomId && <List>
                                <ListButton onClick={() => this.login()}>Join</ListButton>
                                <ListButton color="gray" onClick={() => this.create()}>or Create new room</ListButton>
                            </List>}
                            {!roomId && <List>
                                <ListButton onClick={() => this.create()}>Create</ListButton>
                            </List>}
                        </Page>
                    </LoginScreen>

                    <Panel left cover themeDark>
                        <Page>
                            <Navbar title="Options"/>
                            <List>
                                <ListButton title="Leave room" onClick={() => this.logout()}/>
                                <ListButton title="Create new room" onClick={() => this.create()}/>
                                <ListButton title="Copy room link" onClick={() => this.copyLink()}/>
                            </List>
                        </Page>
                    </Panel>

                </AppContext.Provider>
            </App>
        )
    }

    addError(code = 'room', msg) {
        this.setState({errors: {[code]: [msg]}})
    }

    login() {
        this.setState({errors: {}});
        const {roomId, login, side} = this.state;
        const trimmedLogin = login.trim();
        if (!roomId) {
            this.addError('room', 'Please enter room ID');
            return;
        }
        if (!trimmedLogin) {
            this.addError('login', 'Please enter login');
            return;
        }
        gameApi.join(roomId, trimmedLogin, side).then(cred => {
            this.startListen(cred);
        }).catch(err => {
            console.error(err);
            this.addError(err.code, err.message);
        })
    }

    create() {
        const {login, side} = this.state;
        const trimmedLogin = login.trim();
        this.setState({errors: {}});
        if (!trimmedLogin) {
            this.addError('login', 'Please enter login');
            return;
        }
        gameApi.create(login, side).then(cred => {
            this.startListen(cred)
        }).catch(err => {
            this.addError(err.code, err.message);
        });
    }

    componentDidMount() {
        this.$f7ready((f7) => {
            setTimeout(() => this.tryLogin());
            this.refs.login.refs.inputEl.focus();
        });
    }

    componentWillUnmount() {
        if (this.removeListener) {
            this.removeListener();
            this.removeListener = null;
        }
    }

    startListen(cred) {
        credApi.setCred(cred);
        this.setState({login: cred.login, cred});
        this.removeListener = gameApi.listenRoom(cred.roomId, snapshot => {
            const room = snapshot.data();
            const login = this.state.login;
            this.setState({
                roomData: {
                    room,
                    roomId: cred.roomId,
                    user: room.members && room.members.find(m => m.login === login) || null,
                    mission: room.status === STATUS.STARTED ? room.missions[room.missions.length - 1] : null,
                    changeLogin: (login) => {
                        this.setState({
                            login,
                            roomData: {...this.state.roomData, user: room.members.find(m => m.login === login)}
                        })
                    }
                }
            })
        })
    }

    tryLogin() {
        const cred = credApi.getCred(getGameId());
        if (cred) {
            gameApi.login(cred).then(() => {
                this.startListen(cred);
            });
        }
    }

    logout() {
        credApi.clearCred();
        window.location = '';
    }

    copyLink() {
        const link = `${window.location.href.split('?')[0]}?${this.state.roomData.roomId}`;
        copyStringToClipboard(link);
    }
}

export default ResistanceApp;