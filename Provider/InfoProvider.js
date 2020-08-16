import React, {useState, createContext} from 'react';

// Create Context Object
export const InfoContext = createContext();

// Create provider for components to consume and subscribe to changes
export const InfoProvider = (props) => {
  const [firstTimeOpen, setFirstTimeOpen] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [storeID, setStoreID] = useState('');
  // need to add much more information and filter settings!!!!S

  return (
    <InfoContext.Provider
      value={{
        firstTimeOpen,
        setFirstTimeOpen,
        storeName,
        setStoreName,
        storeID,
        setStoreID,
      }}>
      {props.children}
    </InfoContext.Provider>
  );
};
