

function ResourceType({toggleDropdown, isDropdownVisible}) {
    return (
        <>
        <button onClick={toggleDropdown} id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
        className="w-full text-white bg-blue-600 hover:bg-blue-500 font-medium rounded text-sm px-2 py-1 text-center inline-flex items-center justify-center"
        type="button">
                Pods
            <svg className="w-2.5 h-2.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
            </button>
            <div id="dropdown" className={`w-full z-10 ${ isDropdownVisible ? "" : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                </li>
                </ul>
            </div>
        </>
    );
}

export default ResourceType;