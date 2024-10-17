import React, { useState, useRef, useEffect } from 'react';
import PlayPauseButton from './PlayPauseButton.jsx';
import { useUtilContext } from './UtilContext.jsx';

function Util() {

  const { isExpanded, setIsExpanded,
          audioRef, isPlaying, setIsPlaying,
          timeLeft, setTimeLeft, currentTrack
   } = useUtilContext();
   
  const [isRunning, setIsRunning] = useState(false);
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

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      countdownIntervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      endSoundRef.current.play();
      setIsRunning(false);
    }
    return () => clearInterval(countdownIntervalRef.current);
  }, [isRunning, timeLeft, setTimeLeft]);

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
