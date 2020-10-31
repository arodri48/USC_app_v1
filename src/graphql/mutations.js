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
      cause
      PricePoint
      bio
      image
      featured
      listAll
      discountCode
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
      cause
      PricePoint
      bio
      image
      featured
      listAll
      discountCode
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
      cause
      PricePoint
      bio
      image
      featured
      listAll
      discountCode
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
      listAll
      createdAt
      updatedAt
      store {
        id
        goodsType
        storeName
        stateLocation
        website
        cause
        PricePoint
        bio
        image
        featured
        listAll
        discountCode
        createdAt
        updatedAt
      }
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
      listAll
      createdAt
      updatedAt
      store {
        id
        goodsType
        storeName
        stateLocation
        website
        cause
        PricePoint
        bio
        image
        featured
        listAll
        discountCode
        createdAt
        updatedAt
      }
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
      listAll
      createdAt
      updatedAt
      store {
        id
        goodsType
        storeName
        stateLocation
        website
        cause
        PricePoint
        bio
        image
        featured
        listAll
        discountCode
        createdAt
        updatedAt
      }
    }
  }
`;
export const createStoreShared = /* GraphQL */ `
  mutation CreateStoreShared(
    $input: CreateStoreSharedInput!
    $condition: ModelstoreSharedConditionInput
  ) {
    createStoreShared(input: $input, condition: $condition) {
      id
      storeID
      listAll
      createdAt
      updatedAt
      store {
        id
        goodsType
        storeName
        stateLocation
        website
        cause
        PricePoint
        bio
        image
        featured
        listAll
        discountCode
        createdAt
        updatedAt
      }
    }
  }
`;
export const updateStoreShared = /* GraphQL */ `
  mutation UpdateStoreShared(
    $input: UpdateStoreSharedInput!
    $condition: ModelstoreSharedConditionInput
  ) {
    updateStoreShared(input: $input, condition: $condition) {
      id
      storeID
      listAll
      createdAt
      updatedAt
      store {
        id
        goodsType
        storeName
        stateLocation
        website
        cause
        PricePoint
        bio
        image
        featured
        listAll
        discountCode
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteStoreShared = /* GraphQL */ `
  mutation DeleteStoreShared(
    $input: DeleteStoreSharedInput!
    $condition: ModelstoreSharedConditionInput
  ) {
    deleteStoreShared(input: $input, condition: $condition) {
      id
      storeID
      listAll
      createdAt
      updatedAt
      store {
        id
        goodsType
        storeName
        stateLocation
        website
        cause
        PricePoint
        bio
        image
        featured
        listAll
        discountCode
        createdAt
        updatedAt
      }
    }
  }
`;
export const createAppShared = /* GraphQL */ `
  mutation CreateAppShared(
    $input: CreateAppSharedInput!
    $condition: ModelappSharedConditionInput
  ) {
    createAppShared(input: $input, condition: $condition) {
      id
      listAll
      createdAt
      updatedAt
    }
  }
`;
export const updateAppShared = /* GraphQL */ `
  mutation UpdateAppShared(
    $input: UpdateAppSharedInput!
    $condition: ModelappSharedConditionInput
  ) {
    updateAppShared(input: $input, condition: $condition) {
      id
      listAll
      createdAt
      updatedAt
    }
  }
`;
export const deleteAppShared = /* GraphQL */ `
  mutation DeleteAppShared(
    $input: DeleteAppSharedInput!
    $condition: ModelappSharedConditionInput
  ) {
    deleteAppShared(input: $input, condition: $condition) {
      id
      listAll
      createdAt
      updatedAt
    }
  }
`;
