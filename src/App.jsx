// stylesheets
import './App.css'

// react
import { useEffect, useState } from 'react'

// components
import TrophyFileInput from './components/TrophyFileInput/TrophyFileInput.jsx';
import AchievementList from './components/AchievementList/AchievementList.jsx'

// data
import bloodborneTrophies from './data/trophies.json';

function App() {
    const [achievements, setAchievements] = useState(bloodborneTrophies.trophies);

    useEffect(() => {
        document.addEventListener("dragover", event => event.preventDefault());
        document.addEventListener("drop", event => event.preventDefault());
    }, []);

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
            <TrophyFileInput onChange={(trophyFile) => setAchievements(parseRawTrophiesFile(trophyFile))}></TrophyFileInput>
            <AchievementList achievements={achievements}></AchievementList>
        </>
    )
}

export default App
