// stylesheets
import './AchievementList.css';

// react
import { useState, useEffect } from 'react';

// components
import Achievement from '../Achievement/Achievement.jsx';
import AchievementBar from '../AchievementBar/AchievementBar.jsx';

const isNonEmptyString = (s) => typeof s === 'string' && s.length > 0;

export default function AchievementList(props) {
    const [stateFilter, setStateFilter] = useState('all');
    const [nameFilter, setNameFilter] = useState('');

    const isUnlocked = (achievement) => achievement.unlockedAt instanceof Date;
    const isLocked = (achievement) => !achievement.unlockedAt && !achievement.secret;
    const isSecret = (achievement) => !achievement.unlockedAt && achievement.secret;
    const byName = (achievement) => !isNonEmptyString(nameFilter) || achievement.name.fr.toUpperCase().includes(nameFilter.toUpperCase());

    const [unlockedAchievements, setUnlockedAchievements] = useState(props.achievements.filter(isUnlocked));
    const [lockedAchievements, setLockedAchievements] = useState(props.achievements.filter(isLocked));
    const [secretAchievements, setSecretAchievements] = useState(props.achievements.filter(isSecret));

    const renderAchievement = (achievement) => <Achievement key={achievement.id} {...achievement}></Achievement>;

    useEffect(() => {
        setUnlockedAchievements(props.achievements.filter(isUnlocked).filter(byName));
        setLockedAchievements(props.achievements.filter(isLocked).filter(byName));
        setSecretAchievements(props.achievements.filter(isSecret).filter(byName));
    }, [stateFilter, nameFilter]);

    return (
        <div className='achievement-list'>
            <div className='achievement-list-header'>
                <AchievementBar unlocked={props.achievements.filter(isUnlocked).length} total={props.achievements.length}></AchievementBar>

                <select onChange={(e) => setStateFilter(e.target.value)}>
                    <option value="all" default>Tous les succès</option>
                    <hr />
                    <option value="unlocked">Succès débloqués</option>
                    <option value="locked">Succès verrouillés</option>
                </select>

                <input type='text' placeholder='Rechercher...' onChange={(e) => setNameFilter(e.target.value)}/>
            </div>

            <div className='achievement-list-body'>
                {(stateFilter !== 'locked') && (
                    <ul className='achievement-list'>
                        {unlockedAchievements.map(renderAchievement)}
                    </ul>
                )}

                {(stateFilter !== 'unlocked') && (<>
                    {(lockedAchievements.length > 0) && (<>
                        <p className='sublist-title'>succès verrouillés</p>

                        <ul className='achievement-list'>
                            {lockedAchievements.map(renderAchievement)}
                        </ul>
                    </>)}

                    {(secretAchievements.length > 0) && (<>
                            <p className='sublist-title'>succès masqués</p>

                            <ul className='achievement-list'>
                                {secretAchievements.map(renderAchievement)}
                            </ul>
                    </>)}
                </>)}
            </div>
        </div>
    );
}
