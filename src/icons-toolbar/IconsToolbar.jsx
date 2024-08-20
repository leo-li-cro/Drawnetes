import SearchBar from './SearchBar.jsx';
import DisplayIcons from './DisplayIcons.jsx';

function IconsToolbar() {

  return (
      <div
      className='w-[500px] h-52 bg-white border-2 border-gray-300 rounded-3xl flex flex-col items-center justify-center p-4 shadow-lg'>
        <SearchBar />
        <DisplayIcons />
      </div>
  );
}

export default IconsToolbar;