import { dedupExchange, fetchExchange } from "urql";

export const createUrqlClient = (ssrExchange: any) => ({
  url: process.env.NEXT_PUBLIC_API_URL as string,
  fetchOptions: { credentials: "include" as const },
  exchanges: [dedupExchange, ssrExchange, fetchExchange],
});
