import React, {useState, createContext} from 'react';

// Create Context Object
export const InfoContext = createContext();

// Create provider for components to consume and subscribe to changes
export const InfoProvider = props => {
	const [welcomeScreenSeen, setwelcomeScreeenSeen] = useState(false);
	const [storeName, setStoreName] = useState('');
	const [storeID, setStoreID] = useState('');

	return(
		<InfoContext.Provider
			value={{
				welcomeScreenSeen, setwelcomeScreeenSeen,
				storeName, setStoreName,
				storeID, setStoreID
			}}
		>
			{props.children}
		</InfoContext.Provider>
	);
};
