const defectorDescription = `At the beginning of the 3rd round and at the very
start of each subsequent round, flip one card from the Loyalty deck.
If the card is “No Change”, there is no change of allegiance and play
continues as normal.
If the “Switch Allegiance” card is drawn, the two Defector players secretly
switch their allegiances - The spy Defector is now resistance, and the
resistance Defector is now a spy. This switch applies to all aspects of game
play including victory conditions and rules regarding playing Mission
cards. They do not swap or show their Character cards.
It is possible that the Defectors will switch allegiance once, twice or even
not at all during a game.
`;

const assassinText = `If three missions are completed successfully, the Spies will have a
final opportunity to win the game by correctly naming which of the
Resistance players is the Commander. Without revealing any Character
cards, the Spies discuss and the player with the Assassin character card
will name on Resistance player as the Commander, If the named player
is the Commander, then the Spies win, If the Spies do not name the
Commander, the Resistance wins.
`;

const commanderText = `The Commander knows the Spies without the Spies knowing
him, but the Resistance only wins if the Commander remains undiscovered.`;

const bodyguardText = ` The Body Guard’s special power is knowledge of the Commander at the start of the game. Using the Body Guard’s knowledge wisely is key to protecting the Commander’s identity.`;

const spyText = `No special abilities. The Spies win if three Missions fail. The Spies win the game if five Mission Teams are rejected in a single round (5 consecutive failed Votes)`;

const resistanceText = `No special abilities. The Resistance wins if three Missions are successful. The Mission is successful only if all the Cards revealed are Mission Success cards. The Mission fails if one (or more) Mission Fail cards have been played.`;

const deepCoverText = `The Deep Cover spy’s identity is not revealed to the Commander at the start of the game.`;

const blindText = ` The Blind Spy does not reveal himself to the other spies, nor does he gain knowledge of the other spies at the start of the game.`;

const falseCommanderText = `The False Commander appears as the Commander to the Bodyguard.`;

const reverserText = `Reversers have the ability to change the results of any mission - in the hands of the resistance this can make a doomed mission succeed, or turn certain victory into defeat.`;

const spyReverser = `The spy Reverser may only play Success, or Reverse - he may not play Fail`;

const chief = `During the Team Assignment (before the Team Vote),
 the Leader gives the Investigator token to a player (other than himself) not on the Mission Team.
 If the mission is successful, the Leader will Investigate any player (other than himself).
 If the mission is a failure, the Investigator will Investigate any player (other then himself).
 The player under Investigation hands his Hunter Loyalty card to the Investigator. The resistance Chief must show the Chief
 (5 or 6 players) or resistance Chief (7 or more players) Loyalty card.`;

const spyChief = `Spy counterpart of the Chief. The spy Chief must show the Chief or spy Chief card to the Investigator`;

const spyHunter = `Immediately after the third failed mission the spy Hunter reveals themselves.
 The spy Hunter must Accuse another player of being the resistance Chief.
 If the Accused is the resistance Chief, the spies have won.
 If the Accused is not the resistance Chief, the mission results are reversed - the failure turns into a success.
 The spy Hunter can attempt to take down the resistance Chief
 and end the game early when the spy Chief fails a mission.
 If the Early End Game Accusation is incorrect it could result in the third successful Mission.
 In this case the normal Accusation rules apply - the resistance Hunter must Accuse the spy Chief to win,
 a false Accusation reverses the mission once again to be a failure.`;

const hunter = `Immediately after the third successful mission the resistance Hunter reveals themselves.
 The resistance Hunter must Accuse another player of being the spy Chief.
 If the Accused is the spy Chief, the resistance has won.
 If the Accused is not the spy Chief, the mission results are reversed - the success turns into failure.`;

const coordinator = `The resistance Chief(s) will know the resistance Coordinator at the beginning of
 the game and can use that knowledge to help build successful mission teams.
 If Investigated, the resistance Coordinator must show the Not a Chief Loyalty card.
 If the Coordinator is Accused by the spy Hunter, the spies win.`;

const dummyAgent = `If Investigated, the resistance Dummy Agent may show the Chief (5 or 6 players) 
 or resistance Chief Loyalty card (7 or more players).
 If Accused, the Accusation is false as the Dummy Agent is not the resistance Chief.`;

const deepAgent = `The Deep Agent doesn't know the other spies, but the other spies will know the Deep Agent.
 At any time during Team Building phase prior to voting, the Deep Agent may Blame the Pretender.
 If the Blamed is the Pretender, the Deep Agent and Pretender switch Character cards (and allegiances).
 Blame can only happen once in a game.`;

const pretender = `The Pretender appears as the Deep Agent to the other spies`;

export const TEXTS = {
    defectorDescription,
    commanderText,
    assassinText,
    bodyguardText,
    spyText,
    resistanceText,
    deepCoverText,
    blindText,
    falseCommanderText,
    reverserText,
    spyReverser,
    chief,
    spyChief,
    spyHunter,
    hunter,
    coordinator,
    dummyAgent,
    pretender,
    deepAgent
};

