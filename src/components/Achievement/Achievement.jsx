// stylesheets
import './Achievement.css';

// i18n
import i18n from '../../i18n.js';

// assets
import SecretAchievement from '../../assets/secret-achievement.png';

/**
 * @format 'en' or 'fr'
 */
function formatUnlockedAt(unlockedAt, language = 'en') {
    const prefix = 'Débloqué le ';

    return prefix + unlockedAt.toLocaleString(language, {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
}

const trophiesAssets = import.meta.glob(
    '../../assets/trophies/*.png',
    {
        eager: true,
        import: 'default',
        query: '?url'
    }
);

export default function Achievement(props) {
    const state = (props.unlockedAt instanceof Date)
        ? 'unlocked'
        : (props.secret)
            ? 'secret'
            : 'locked';

    let cover = trophiesAssets[`../../assets/trophies/${props.id}.png`];
    let name = props.name[i18n.language];
    let description = props.description[i18n.language];

    if (state === 'secret') {
        cover = SecretAchievement;
        name = 'Succès masqué';
        description = "Les informations liées à ce succès ne seront révélées qu'une fois que vous l'aurez débloqué.";
    }

    return (
        <li className={`achievement ${state}`}>
            <div className='achievement-cover-wrapper'>
                <img className='achievement-cover' src={cover} alt={`achievement ${props.id}`}/>
            </div>

            <div className='achievement-data'>
                <div className='achievement-name'>{name}</div>
                <p className='achievement-description'>{description}</p>
                <p className='achievement-players-percentage'></p>
            </div>

            {(state === 'unlocked') && (
                <p className='achievement-unlocked-at'>{formatUnlockedAt(props.unlockedAt, i18n.language)}</p>
            )}
        </li>
    );
}
