import { useState } from 'react';
import { useUtilContext } from './UtilContext.jsx';

import SetTimer from './SetTimer.jsx';

function SetUtil() {
    // Audio
    const [volume, setVolume] = useState(0.5);

    const { isExpanded, setIsExpanded,
            audioRef, isPlaying, setIsPlaying,
            timeLeft, setTimeLeft, currentTrack, setCurrentTrack
     } = useUtilContext();

    const musicFiles = [
        'lofi-summer-rain.mp3',
        'lofi-good-night.mp3',
        'lofi-for-a-dream.mp3',
    ];

    // Timer
    const [inputTime, setInputTime] = useState(0);

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
    };

    const handleTrackChange = (event) => {
        setCurrentTrack(event.target.value);
        if (audioRef.current) {
          audioRef.current.load();
          if (isPlaying)
            playAudio();
        }
    };

    const playAudio = () => {
        audioRef.current.play();
        setIsPlaying(true);
    };

    const addOneMin = () => {
        setInputTime(+inputTime + 60);
    }

    const resetTimer = () => {
        if (inputTime > 0) {
            setTimeLeft(inputTime);
        }
    };

    if (!isExpanded)
        return null;

    return (
        <div className='w-48 h-64 absolute top-16 right-0 gap-2 bg-white p-4 border-2 border-x-pink-600 flex flex-wrap justify-center items-center rounded-3xl'>
          <div>
          <label htmlFor="volumeSlider">Volume:</label>
          <input
            className=
            'w-full h-2 bg-pink-600 rounded-lg appearance-none cursor-pointer'
            id="volumeSlider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
  
        <div>
          <label htmlFor="trackSelect">Select Music: </label>
          <select
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
          id="trackSelect" value={currentTrack} onChange={handleTrackChange}>
            {musicFiles.map((track, index) => (
              <option key={index} value={track}>
                {track.replace('.mp3', '')}
              </option>
            ))}
          </select>
        </div>
        <SetTimer inputTime={inputTime} setInputTime={setInputTime} />
      <div className='flex justify-between space-y-2'>
        <button
        className='border text-black px-2 rounded-md m-2'
        onClick={addOneMin}>
          +1min
        </button>
        <button
        className='bg-pink-600 hover:bg-pink-500 text-white py-2 px-4 rounded-full m-2'
        onClick={resetTimer}>
          Set
        </button>
        </div>
        </div>
    );
}

export default SetUtil;