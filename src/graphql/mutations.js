/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createStore = /* GraphQL */ `
  mutation CreateStore(
    $input: CreateStoreInput!
    $condition: ModelStoreConditionInput
  ) {
    createStore(input: $input, condition: $condition) {
      id
      goodsType
      storeName
      stateLocation
      website
      BLM
      PricePoint
      COVID
      bio
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateStore = /* GraphQL */ `
  mutation UpdateStore(
    $input: UpdateStoreInput!
    $condition: ModelStoreConditionInput
  ) {
    updateStore(input: $input, condition: $condition) {
      id
      goodsType
      storeName
      stateLocation
      website
      BLM
      PricePoint
      COVID
      bio
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteStore = /* GraphQL */ `
  mutation DeleteStore(
    $input: DeleteStoreInput!
    $condition: ModelStoreConditionInput
  ) {
    deleteStore(input: $input, condition: $condition) {
      id
      goodsType
      storeName
      stateLocation
      website
      BLM
      PricePoint
      COVID
      bio
      image
      createdAt
      updatedAt
    }
  }
`;
export const createUrlClicked = /* GraphQL */ `
  mutation CreateUrlClicked(
    $input: CreateUrlClickedInput!
    $condition: ModelurlClickedConditionInput
  ) {
    createUrlClicked(input: $input, condition: $condition) {
      id
      storeID
      store {
        id
        goodsType
        storeName
        stateLocation
        website
        BLM
        PricePoint
        COVID
        bio
        image
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUrlClicked = /* GraphQL */ `
  mutation UpdateUrlClicked(
    $input: UpdateUrlClickedInput!
    $condition: ModelurlClickedConditionInput
  ) {
    updateUrlClicked(input: $input, condition: $condition) {
      id
      storeID
      store {
        id
        goodsType
        storeName
        stateLocation
        website
        BLM
        PricePoint
        COVID
        bio
        image
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUrlClicked = /* GraphQL */ `
  mutation DeleteUrlClicked(
    $input: DeleteUrlClickedInput!
    $condition: ModelurlClickedConditionInput
  ) {
    deleteUrlClicked(input: $input, condition: $condition) {
      id
      storeID
      store {
        id
        goodsType
        storeName
        stateLocation
        website
        BLM
        PricePoint
        COVID
        bio
        image
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
