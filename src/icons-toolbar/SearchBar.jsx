import { useState } from 'react';
import { useGlobalContext } from '../GlobalContext';
import Fuse from 'fuse.js';
import iconMetadata from './icons-metadata/k8sIconMetadata';
import defaultIcons from './k8sDefaultIcons';

const icons = iconMetadata;
const options = {
    keys: ["name"],
    threshold: 0.5 // [0-1] lower threshold equates to more strict search
}

const fuse = new Fuse(icons, options);

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { setSearchResults } = useGlobalContext();

  const handleInputChange = (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);
    if (searchQuery.length > 0) {
        const results = fuse.search(searchQuery);
        const topFiveResults = results.length ? results.slice(0,5).map(result => result.item.name) : [];
        setSearchResults(topFiveResults);
    } else {
        setSearchResults(defaultIcons);
    }
  };

  return (
    <input
      className='bg-white border border-gray-300 text-gray-900 text-sm rounded block w-full p-2.5'
      type="text"
      placeholder="Search for icons..."
      value={query}
      onChange={handleInputChange}
    />
  );
};

export default SearchBar;
