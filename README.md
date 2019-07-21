# Resistance companion app

### Features:

- Contains roles from the Assassin and Hunter expansions
- Contains a short description of the game rules
- Assignes roles to the players
- Replaces initial script by showing a role vision
- Calculates votes for team composition and a mission result
- Keeps the game score 

## Setup
- `npm install` - fetch the dependencies
- Create firestore credential configuration in src/api/cred.js. Example:

```
const firebaseCred = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN.firebaseio.com",
    databaseURL: "https://DB_DOMAIN.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "BACKET_ID.appspot.com",
    messagingSenderId: "CLIENT_ID"
};

export default firebaseCred;
```

## NPM Scripts

* `npm start` - run development server
* `npm run build-prod` - build web app for production
* `npm run build-dev` - build web app using development mode (faster build without minification and optimization)


