// stylesheets
import './AchievementList.css';

// react
import { useState, useEffect } from 'react';

// components
import Achievement from '../Achievement/Achievement.jsx';
import AchievementBar from '../AchievementBar/AchievementBar.jsx';

// i18n
import i18n from '../../i18n.js'

const isNonEmptyString = (s) => typeof s === 'string' && s.length > 0;

export default function AchievementList(props) {
    const [trigger, setTrigger] = useState(0);
    const [stateFilter, setStateFilter] = useState('all');
    const [nameFilter, setNameFilter] = useState('');

    const isUnlocked = (achievement) => achievement.unlockedAt instanceof Date;
    const isLocked = (achievement) => !achievement.unlockedAt && !achievement.secret;
    const isSecret = (achievement) => !achievement.unlockedAt && achievement.secret;
    const byName = (achievement) => !isNonEmptyString(nameFilter) || achievement.name[i18n.language].toUpperCase().includes(nameFilter.toUpperCase());

    const [unlockedAchievements, setUnlockedAchievements] = useState([]);
    const [lockedAchievements, setLockedAchievements] = useState([]);
    const [secretAchievements, setSecretAchievements] = useState([]);

    useEffect(() => {
        setUnlockedAchievements(props.achievements.filter(isUnlocked));
        setLockedAchievements(props.achievements.filter(isLocked));
        setSecretAchievements(props.achievements.filter(isSecret));
    }, [props.achievements]);

    const renderAchievement = (achievement) => <Achievement key={achievement.id} {...achievement}></Achievement>;

    useEffect(() => {
        setUnlockedAchievements(props.achievements.filter(isUnlocked).filter(byName));
        setLockedAchievements(props.achievements.filter(isLocked).filter(byName));
        setSecretAchievements(props.achievements.filter(isSecret).filter(byName));
    }, [stateFilter, nameFilter]);

    function handleLanguageChange(e) {
        i18n.changeLanguage(e.target.value);
        setTrigger(trigger + 1);
    }

    return (
        <div className='achievement-list'>
            <div className='achievement-list-header'>
                <AchievementBar unlocked={props.achievements.filter(isUnlocked).length} total={props.achievements.length}></AchievementBar>

                <div style={{ textAlign: 'right' }}>
                    <select onChange={handleLanguageChange} value={i18n.language}>
                        <option value="en">🇬🇧</option>
                        <option value="fr">🇫🇷</option>
                    </select>

                    <select onChange={(e) => setStateFilter(e.target.value)}>
                        <option value="all" default>{i18n.t('achievements.all')}</option>
                        <hr />
                        <option value="unlocked">{i18n.t('achievements.unlocked')}</option>
                        <option value="locked">{i18n.t('achievements.locked')}</option>
                    </select>

                    <input type='text' placeholder={i18n.t('input.text')} onChange={(e) => setNameFilter(e.target.value)}/>
                </div>
            </div>

            <div className='achievement-list-body'>
                {(stateFilter !== 'locked') && (
                    <ul className='achievement-list'>
                        {unlockedAchievements.map(renderAchievement)}
                    </ul>
                )}

                {(stateFilter !== 'unlocked') && (<>
                    {(lockedAchievements.length > 0) && (<>
                        <p className='sublist-title'>{i18n.t('achievements.locked').toUpperCase()}</p>

                        <ul className='achievement-list'>
                            {lockedAchievements.map(renderAchievement)}
                        </ul>
                    </>)}

                    {(secretAchievements.length > 0) && (<>
                            <p className='sublist-title'>{i18n.t('achievements.secret').toUpperCase()}</p>

                            <ul className='achievement-list'>
                                {secretAchievements.map(renderAchievement)}
                            </ul>
                    </>)}
                </>)}
            </div>
        </div>
    );
}
