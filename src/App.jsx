// stylesheets
import './App.css'

// react
import { useState } from 'react'

// components
import AchievementList from './components/AchievementList/AchievementList.jsx'

// data
import bloodborneTrophies from './data/trophies.json';

function App() {
    const [count, setCount] = useState(0)

    const rawTrophiesFile = '21 1791835810\n' +
        '14 1791890781\n' +
        '29 1791891656\n' +
        '22 1792093150\n' +
        '31 1792093150\n' +
        '30 1792094802\n' +
        '23 1792242876\n' +
        '15 1792243616\n' +
        '16 1792266630\n' +
        '17 1792364788\n' +
        '18 1792451578\n' +
        '13 1792451759\n' +
        '25 1792458233\n' +
        '32 1792458233\n' +
        '19 1792589530\n' +
        '20 1792594807\n' +
        '2 1792610524\n' +
        '12 1792622476\n' +
        '9 1792622679\n' +
        '24 1792683847\n' +
        '11 1792689346\n' +
        '27 1792704787\n' +
        '10 1792705992\n' +
        '6 1792789974\n' +
        '7 1792791589\n' +
        '28 1792792196\n' +
        '33 1792792196\n' +
        '26 1792847363\n' +
        '36 1792957013\n' +
        '8 1792960206\n' +
        '38 1793122039\n' +
        '37 1793123363\n' +
        '35 1794069104\n';

    function parseRawTrophiesFile(rawFile) {
        const userTrophies = rawFile.split('\n').map((line) => {
            let [id, unlockedAt] = line.split(' ');

            return {
                id: Number(id),
                unlockedAt: new Date(unlockedAt * 1000)
            };
        });

        return bloodborneTrophies.trophies.map((trophy) => {
            trophy.unlockedAt = userTrophies.find((userTrophy) => userTrophy.id === trophy.id)?.unlockedAt;
            return trophy;
        });
    }

    return (
        <>
            <section id="input">
            </section>

            <AchievementList achievements={parseRawTrophiesFile(rawTrophiesFile)}></AchievementList>
        </>
    )
}

export default App
