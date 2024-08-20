import React from 'react';
import AddIconButton from './AddIconButton.jsx';
import { useGlobalContext } from '../GlobalContext.jsx';

function DisplayIcons() {
  const { searchResults } = useGlobalContext();
  return (
    <div
    className='flex space-x-4 pt-3 bg-white rounded-lg'>
      {searchResults.map((iconName, index) => (
        <AddIconButton iconName={iconName} key={index} index={index}/>
      ))}
    </div>
  );
}

export default DisplayIcons;