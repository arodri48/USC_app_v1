import React, {useState, createContext} from 'react';

// Create Context Object
export const InfoContext = createContext();

// Create provider for components to consume and subscribe to changes
export const InfoProvider = (props) => {
  const [storeName, setStoreName] = useState('');
  const [storeID, setStoreID] = useState('');
  const [stateLocation, setStateLocation] = useState('');
  const [bio, setBio] = useState('');
  const [price, setPrice] = useState('');
  const [website, setWebsite] = useState('');
  const [goodsType, setGoodsType] = useState('');
  const [image, setImage] = useState('');
  const [cause, setCause] = useState('');
  // need to add much more information and filter settings!!!!S

  return (
    <InfoContext.Provider
      value={{
        storeName,
        setStoreName,
        storeID,
        setStoreID,
          stateLocation,
          setStateLocation,
          bio,
          setBio,
          price,
          setPrice,
          website,
          setWebsite,
          goodsType,
          setGoodsType,
          image,
          setImage,
        cause,
        setCause
      }}>
      {props.children}
    </InfoContext.Provider>
  );
};
