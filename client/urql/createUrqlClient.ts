import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";

import { cacheExchangeOpts } from "./cacheExchangeOpts";

export const createUrqlClient = (ssrExchange: any) => ({
  url: process.env.NEXT_PUBLIC_API_URL as string,
  fetchOptions: { credentials: "include" as const },
  exchanges: [
    dedupExchange,
    cacheExchange(cacheExchangeOpts),
    ssrExchange,
    fetchExchange,
  ],
});
