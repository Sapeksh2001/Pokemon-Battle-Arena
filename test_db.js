import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import fs from "fs";

const firebaseConfig = JSON.parse(fs.readFileSync('./src/firebase.js', 'utf-8').match(/const firebaseConfig = ({[\s\S]*?});/)[1]);
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Fetch a user's saves (just list out a few)
get(ref(db, 'users')).then(snap => {
    const users = snap.val();
    if (!users) { console.log('No users found'); process.exit(0); }
    for (const uid in users) {
        if (users[uid].saved_games) {
            console.log("User:", uid);
            const saves = users[uid].saved_games;
            for (const roomCode in saves) {
                console.log("Room:", roomCode);
                console.log("PokemonNames:", saves[roomCode].pokemonNames);
                console.log("Players:", saves[roomCode].snapshot.players.map(p => p.name));
                console.log("P1 active index:", saves[roomCode].snapshot.players[0].activePokemonIndex);
                console.log("P1 team names:", saves[roomCode].snapshot.players[0].team.map(p => p ? p.fullName : 'null'));
                console.log("P2 active index:", saves[roomCode].snapshot.players[1].activePokemonIndex);
                console.log("P2 team names:", saves[roomCode].snapshot.players[1].team.map(p => p ? p.fullName : 'null'));
            }
        }
    }
    process.exit(0);
}).catch(console.error);
