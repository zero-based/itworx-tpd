import { QueryInput, Cache } from "@urql/exchange-graphcache";

export function updateQueryWrapper<Result, Query>(
  cache: Cache,
  result: any,
  queryInput: QueryInput,
  updater: (_result: Result, _query: Query) => Query
) {
  return cache.updateQuery(
    queryInput,
    (data) => updater(result, data as any) as any
  );
}
