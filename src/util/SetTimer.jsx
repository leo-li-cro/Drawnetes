import React from 'react';

function SetTimer({ inputTime, setInputTime }) {

  const seconds = +inputTime % 60;
  const minutes = Math.floor(+inputTime / 60);

  const handleMinutesChange = (e) => {
    const value = e.target.value;
    if (value.length <= 2 && /^[0-9]*$/.test(value)) {
      setInputTime(+value * 60 + +seconds);
    }
  };

  const handleSecondsChange = (e) => {
    const value = e.target.value;
    if (value.length <= 2 && /^[0-9]*$/.test(value)) {
      setInputTime(+minutes * 60 + +value);
    }
  };

  return (
    <div className='text-3xl flex justify-center'>
      <input
        type="text"
        maxLength="2"
        inputMode="numeric"
        aria-label="Minutes input"
        value={minutes}
        onChange={handleMinutesChange}
        style={{
          width: '3rem',
          textAlign: 'center',
          fontSize: 'inherit',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
      <span style={{ margin: '0 0.5rem' }}>:</span>
      <input
        type="text"
        maxLength="2"
        inputMode="numeric"
        aria-label="Seconds input"
        value={seconds}
        onChange={handleSecondsChange}
        style={{
          width: '3rem',
          textAlign: 'center',
          fontSize: 'inherit',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
    </div>
  );
}

export default SetTimer;
