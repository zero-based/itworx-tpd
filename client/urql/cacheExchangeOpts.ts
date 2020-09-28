import { CacheExchangeOpts } from "@urql/exchange-graphcache/dist/types/cacheExchange";

import { updateQueryWrapper } from "./updateQueryWrapper";
import {
  LoginMutation,
  MeQuery,
  MeDocument,
  LogoutMutation,
  RoleQuery,
  RoleDocument,
} from "../graphql/types";

export const cacheExchangeOpts: CacheExchangeOpts = {
  updates: {
    Mutation: {
      login: (result, args, cache, info) => {
        updateQueryWrapper<LoginMutation, MeQuery>(
          cache,
          result,
          { query: MeDocument },
          (_result, _query) =>
            _result.login.data ? { me: _result.login.data } : _query
        );
        cache.invalidate({ __typename: "Query" }, "role");
      },
      logout: (result, args, cache, info) => {
        updateQueryWrapper<LogoutMutation, MeQuery>(
          cache,
          result,
          { query: MeDocument },
          () => ({ me: null })
        );
        updateQueryWrapper<LogoutMutation, RoleQuery>(
          cache,
          result,
          { query: RoleDocument },
          () => ({ role: null })
        );
      },
    },
  },
};
