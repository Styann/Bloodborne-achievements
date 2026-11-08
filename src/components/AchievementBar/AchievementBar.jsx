// stylesheets
import './AchievementBar.css';

// i18n
import i18n from '../../i18n.js';

export default function AchievementBar(props) {
    const percentage = Math.floor(props.unlocked / props.total * 100);

    return (
        <div className='achievement-bar'>
            <div className='achievement-bar-icon-wrapper'></div>

            <div className='achievement-bar-data'>
                <div className='achievement-bar-header'>
                    {props.unlocked}/{props.total} {i18n.t('achievementBar.unlocked')} <span className='achievement-bar-header-percentage'>({percentage} %)</span>
                </div>

                <div className='achievement-bar-outer-bar'>
                    <div className='achievement-bar-inner-bar' style={{ width: percentage + '%' }}></div>
                </div>
            </div>
        </div>
    )
}