import { CacheExchangeOpts } from "@urql/exchange-graphcache/dist/types/cacheExchange";

import { updateQueryWrapper } from "./updateQueryWrapper";
import {
  LoginMutation,
  MeQuery,
  MeDocument,
  LogoutMutation,
} from "../generated/graphql";

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
      },
      logout: (result, args, cache, info) => {
        updateQueryWrapper<LogoutMutation, MeQuery>(
          cache,
          result,
          { query: MeDocument },
          () => ({ me: null })
        );
      },
    },
  },
};
