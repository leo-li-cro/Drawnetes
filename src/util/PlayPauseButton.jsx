import React from 'react';
import PauseButton from '../svg-components/PauseButton';
import PlayButton from '../svg-components/PlayButton';

const StartStop = ({isRunning}) => {
    if (isRunning)
        return <PauseButton />
    return <PlayButton />
}

export default StartStop;