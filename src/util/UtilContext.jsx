import React, { createContext, useState, useContext, useRef } from 'react';

const UtilContext = createContext();

export const useUtilContext = () => useContext(UtilContext);

export const UtilProvider = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState('lofi-for-a-dream.mp3');

    const [timeLeft, setTimeLeft] = useState(0);

    return (
        <UtilContext.Provider value={{
            isExpanded, setIsExpanded,
            audioRef, isPlaying, setIsPlaying,
            currentTrack, setCurrentTrack, timeLeft, setTimeLeft
        }}>
        {children}
        </UtilContext.Provider>
    );
};
