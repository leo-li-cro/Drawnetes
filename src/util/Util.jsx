import React, { useState, useRef, useEffect } from 'react';
import PlayPauseButton from './PlayPauseButton.jsx';
import SetTimer from './SetTimer.jsx';
import { useUtilContext } from './UtilContext.jsx';

function Util() {
  const [isAudioExpanded, setIsAudioExpanded] = useState(false);
  const [isTimerExpanded, setIsTimerExpanded] = useState(false);

  const musicFiles = [
    'lofi-summer-rain.mp3',
    'lofi-good-night.mp3',
    'lofi-for-a-dream.mp3',
  ];

  // Audio
  const [volume, setVolume] = useState(0.5);

  const { isExpanded, setIsExpanded,
          audioRef, isPlaying, setIsPlaying,
          timeLeft, setTimeLeft, currentTrack, setCurrentTrack
   } = useUtilContext();

  //const audioRef = useRef(null);

  // Timer
  const [inputTime, setInputTime] = useState(0); 
  const [isRunning, setIsRunning] = useState(false); // Timer running state
  const countdownIntervalRef = useRef(null);
  const endSoundRef = useRef(new Audio('audio/alarm-ringtone.mp3'));

  const toggleAudio = () => {
    isPlaying ? pauseAudio() : playAudio();
  }

  const playAudio = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    audioRef.current.pause();
    setIsPlaying(false);
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
      if (isPlaying)
        playAudio();
    }
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      // Start countdown interval if running
      countdownIntervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      // Play sound when timer reaches zero
      endSoundRef.current.play();
      setIsRunning(false);
    }
    return () => clearInterval(countdownIntervalRef.current);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    isRunning ? pauseTimer() : startTimer();
  }

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const expand = () => {
    setIsExpanded(!isExpanded);
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setInputTime(value);
    }
  };

  const resetTimer = () => {
    if (inputTime > 0) {
      setTimeLeft(inputTime);
    }
  };

  const addOneMin = () => {
    setInputTime(+inputTime + 60);
  }

  return (
    <>
    <audio ref={audioRef} loop>
      <source src={`audio/${currentTrack}`} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
    <div className='w-auto px-2 h-14 bg-white border-2 border-x-pink-600 border-gray flex justify-center items-center rounded-3xl'>
      <button
      className='px-2 py-1 border border-pink-600 rounded-2xl'
      onClick={expand}
      >
        {currentTrack}
      </button>
      <div
      onClick={toggleAudio}
      className="mx-1 w-12 h-12 flex flex-row items-center gap-2 justify-center bg-pink-600 rounded-full shadow-lg hover:cursor-pointer hover:drop-shadow-xl hover:bg-pink-500 hover:scale-105"
      >
        <PlayPauseButton isRunning={isPlaying} />
      </div>
      <button
      className='px-2 py-1 border border-pink-600 rounded-2xl'
      onClick={expand}
      >
        Timer: {formatTime(timeLeft)}
      </button>
      <div
        onClick={toggleTimer}
        className="mx-1 w-12 h-12 flex flex-row items-center gap-2 justify-center bg-pink-600 rounded-full shadow-lg hover:cursor-pointer hover:drop-shadow-xl hover:bg-pink-500 hover:scale-105">
          <PlayPauseButton isRunning={isRunning} />
      </div>
    </div>
    </>
  );
}

export default Util;
