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
        BLM
        PricePoint
        COVID
        bio
        image
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
      nextToken
    }
  }
`;
