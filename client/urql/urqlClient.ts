import { cacheExchange } from "@urql/exchange-graphcache";
import { createClient, dedupExchange, fetchExchange } from "urql";

import { cacheExchangeOpts } from "./cacheExchangeOpts";

export const urqlClient = createClient({
  url: process.env.NEXT_PUBLIC_API_URL as string,
  fetchOptions: { credentials: "include" as const },
  exchanges: [
    dedupExchange,
    cacheExchange(cacheExchangeOpts),
    fetchExchange,
  ],
});
