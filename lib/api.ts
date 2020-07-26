import { GraphQLClient } from "graphql-request";
import { getSdk } from "../generated/graphql";
import { localStorageTokenKey, apiEndpoint } from "../config";

export const getApiClient = () => {
  let authToken = undefined;

  try {
    authToken = localStorage.getItem(localStorageTokenKey);
  } catch (error) {}

  const headers = {
    authorization: authToken ? `Bearer ${authToken}` : undefined,
  };

  return getSdk(
    new GraphQLClient(apiEndpoint, {
      headers,
    })
  );
};
