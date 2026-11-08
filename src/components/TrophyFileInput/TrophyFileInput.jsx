// stylesheets
import './TrophyFileInput.css';

// react
import { useState } from 'react';

// i18n
// import i18n from '../../i18n.js';

export default function TrophyFileInput(props) {
    const [filename, setFilename] = useState(null);

    function onDrop(e) {
        const file = e?.dataTransfer?.files?.[0];

        if (file) {
            setFilename(file.name);

            file.text()
                .then(props.onChange)
                .catch(console.error);
        }
    }

    return (
        <div className='trophy-file-input'>
            {/* <input type="file" id='trophy-file-input' className='trophy-file-input' accept='.txt'/> */}

            <div className='trophy-file-input-dropzone' onDrop={onDrop}>
                <p>{filename ?? 'Drop your file here (trophies.txt)'}</p>
            </div>
        </div>
    );
}
