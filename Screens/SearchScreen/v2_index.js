import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// Logic: When person presses on a button, it updates the reducer

// Hooks for filter options
export default function SearchScreen({navigation}) {
  function isEquivalent(a, b) {
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);
    const aPropLen = aProps.length;
    const bPropLen = bProps.length;
    if (aPropLen !== bPropLen) {
      return false;
    }
    let propName;
    for (let i = 0; i !== aPropLen; ++i) {
      propName = aProps[i];
      if (a[propName] !== b[propName]) {
        return false;
      }
    }
    return true;
  }

  function objectMap(object, mapFn) {
    return Object.keys(object).reduce(function (result, key) {
      result[key] = mapFn(key);
      return result;
    }, {});
  }

  const [filterOption, filterDispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'Self-Care':
          if (prevState.self_care) {
            return {
              ...prevState,
              self_care: false,
            };
          } else {
            return {
              ...prevState,
              self_care: true,
            };
          }
        case 'BLM':
          if (prevState.BLM) {
            return {
              ...prevState,
              BLM: false,
            };
          } else {
            return {
              ...prevState,
              BLM: true,
            };
          }
        case 'Mental Health':
          if (prevState.mental_health) {
            return {
              ...prevState,
              mental_health: false,
            };
          } else {
            return {
              ...prevState,
              mental_health: true,
            };
          }
        case 'Cancer':
          if (prevState.cancer) {
            return {
              ...prevState,
              cancer: false,
            };
          } else {
            return {
              ...prevState,
              cancer: true,
            };
          }
        case 'Woman Led':
          if (prevState.woman_led) {
            return {
              ...prevState,
              woman_led: false,
            };
          } else {
            return {
              ...prevState,
              woman_led: true,
            };
          }
        case 'CLEAR_ALL':
          //console.log('Really is clearing all');
          return objectMap(prevState, function (key) {
            return false;
          });

        default:
          return prevState;
      }
    },
    {
      BLM: false,
      mental_health: false,
      cancer: false,
      woman_led: false,
      self_care: false,
    },
  );
  const currentCauses = useRef({
    BLM: false,
    mental_health: false,
    cancer: false,
    woman_led: false,
    self_care: false,
  });
  const [filterApply, setFilterApply] = useState(false);
  function filterApplyfunc(){
      if (isEquivalent(currentCauses.current, filterOption)){
          if (filterApply){
              currentCauses.current = filterOption;
          }
          else{

          }
      }
  }
}
