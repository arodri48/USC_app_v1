/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStore = /* GraphQL */ `
  query GetStore($id: ID!) {
    getStore(id: $id) {
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
      createdAt
      updatedAt
    }
  }
`;
export const listStores = /* GraphQL */ `
  query ListStores(
    $filter: ModelStoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStores(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUrlClicked = /* GraphQL */ `
  query GetUrlClicked($id: ID!) {
    getUrlClicked(id: $id) {
      id
      storeID
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUrlClickeds = /* GraphQL */ `
  query ListUrlClickeds(
    $filter: ModelurlClickedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUrlClickeds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        storeID
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const storesByCause = /* GraphQL */ `
  query StoresByCause(
    $cause: String
    $PricePoint: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    storesByCause(
      cause: $cause
      PricePoint: $PricePoint
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const storesByPrice = /* GraphQL */ `
  query StoresByPrice(
    $PricePoint: String
    $cause: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    storesByPrice(
      PricePoint: $PricePoint
      cause: $cause
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
