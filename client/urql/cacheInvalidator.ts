import { Cache } from "@urql/exchange-graphcache";

export const cacheInvalidator = (cache: Cache, fieldName: string) => {
  const fields = cache.inspectFields("Query");
  const infos = fields.filter((info) => info.fieldName === fieldName);
  infos.forEach((info) => {
    cache.invalidate("Query", fieldName, info.arguments || {});
  });
};
