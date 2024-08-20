import React, { useRef, useState } from 'react';

const AudioPlayer = ({ isMinimized }) => {
  const musicFiles = [
    'lofi-summer-rain.mp3',
    'lofi-good-night.mp3',
    'lofi-for-a-dream.mp3',
  ];

  const [currentTrack, setCurrentTrack] = useState(musicFiles[0]);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  const playAudio = () => {
    audioRef.current.play();
  };

  const pauseAudio = () => {
    audioRef.current.pause();
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleTrackChange = (event) => {
    setCurrentTrack(event.target.value);
    if (audioRef.current) {
      audioRef.current.load();
    }
  };

  return (
    <div>
      <audio ref={audioRef} loop>
        <source src={`audio/${currentTrack}`} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      { !isMinimized && (
        <>
        <button
        className='bg-pink-600 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-full'
        onClick={playAudio}>Play</button>
        <button
        className='bg-pink-600 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-full'
        onClick={pauseAudio}>Pause</button>
  
        <div>
          <label htmlFor="volumeSlider">Volume: </label>
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
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          id="trackSelect" value={currentTrack} onChange={handleTrackChange}>
            {musicFiles.map((track, index) => (
              <option key={index} value={track}>
                {track.replace('.mp3', '')}
              </option>
            ))}
          </select>
        </div>
        </>
      ) }
    </div>
  );
};

export default AudioPlayer;
